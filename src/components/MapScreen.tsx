import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Layers,
  Search,
  LocateFixed,
  X,
  Check,
  Wifi,
  WifiOff,
  Compass,
  Loader2,
  Download,
  FileJson,
  FileSpreadsheet,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Sighting {
  id: string;
  lat: number;
  lng: number;
  species: string;
  observations: string;
  photo: string | null;
  timestamp: string; // ISO string for localStorage serialization
}

const SIGHTINGS_STORAGE_KEY = "bionatura_map_sightings";

interface GeoSearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

type MapLayerType = "standard" | "satellite" | "terrain" | "dark";

interface MapLayer {
  id: MapLayerType;
  name: string;
  icon: string;
  url: string;
  attribution: string;
}

const mapLayers: MapLayer[] = [
  {
    id: "standard",
    name: "Padrão",
    icon: "🗺️",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap contributors",
  },
  {
    id: "satellite",
    name: "Satélite",
    icon: "🛰️",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "&copy; Esri",
  },
  {
    id: "terrain",
    name: "Terreno",
    icon: "🏔️",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenTopoMap contributors",
  },
  {
    id: "dark",
    name: "Escuro",
    icon: "🌙",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: "&copy; CartoDB",
  },
];

const MapScreen = () => {
  // Load sightings from localStorage on initial render
  const [sightings, setSightings] = useState<Sighting[]>(() => {
    try {
      const stored = localStorage.getItem(SIGHTINGS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as Sighting[];
      }
    } catch (error) {
      console.error("Error loading sightings from localStorage:", error);
    }
    return [];
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GeoSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showLayerPicker, setShowLayerPicker] = useState(false);
  const [currentLayer, setCurrentLayer] = useState<MapLayerType>("standard");
  const [pendingLocation, setPendingLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [formData, setFormData] = useState({
    species: "",
    observations: "",
    photo: null as string | null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const pendingMarkerRef = useRef<L.Marker | null>(null);

  const defaultCenter = useMemo(() => ({ lat: -14.235, lng: -51.9253 }), []);

  // Geocoding search with debounce
  const searchLocation = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5&countrycodes=br`
      );
      const data: GeoSearchResult[] = await response.json();
      setSearchResults(data);
      setShowResults(data.length > 0);
    } catch (error) {
      console.error("Geocoding error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Handle search input change with debounce
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchLocation(value);
    }, 400);
  };

  // Handle selecting a search result
  const handleSelectResult = (result: GeoSearchResult) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    const map = mapRef.current;
    if (map) {
      map.setView([lat, lng], 14, { animate: true });
    }

    setSearchQuery(result.display_name.split(",")[0]);
    setShowResults(false);
    setSearchResults([]);
  };

  // Save sightings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(SIGHTINGS_STORAGE_KEY, JSON.stringify(sightings));
    } catch (error) {
      console.error("Error saving sightings to localStorage:", error);
    }
  }, [sightings]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Init Leaflet map (vanilla) to avoid react-leaflet context runtime error
  useEffect(() => {
    if (!mapDivRef.current) return;
    if (mapRef.current) return;

    const map = L.map(mapDivRef.current, {
      zoomControl: false,
      attributionControl: true,
    }).setView([defaultCenter.lat, defaultCenter.lng], 4);

    const initialLayer = mapLayers.find((l) => l.id === currentLayer) || mapLayers[0];
    const tileLayer = L.tileLayer(initialLayer.url, {
      attribution: initialLayer.attribution,
    }).addTo(map);
    tileLayerRef.current = tileLayer;

    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;

    map.on("click", (e: L.LeafletMouseEvent) => {
      setPendingLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      setShowForm(true);
      setFormData({ species: "", observations: "", photo: null });
    });

    mapRef.current = map;

    return () => {
      map.off();
      map.remove();
      mapRef.current = null;
      tileLayerRef.current = null;
      markersLayerRef.current = null;
      pendingMarkerRef.current = null;
    };
  }, [defaultCenter]);

  // Change map layer when currentLayer changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const layer = mapLayers.find((l) => l.id === currentLayer);
    if (!layer) return;

    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    tileLayerRef.current = L.tileLayer(layer.url, {
      attribution: layer.attribution,
    }).addTo(map);
  }, [currentLayer]);

  // Render markers
  useEffect(() => {
    const markersLayer = markersLayerRef.current;
    if (!markersLayer) return;

    markersLayer.clearLayers();

    sightings.forEach((sighting) => {
      const marker = L.marker([sighting.lat, sighting.lng], { icon: customIcon });

      const photoHtml = sighting.photo
        ? `<img src="${sighting.photo}" alt="${escapeHtml(
            sighting.species
          )}" style="width:100%;height:96px;object-fit:cover;border-radius:10px;margin-bottom:8px;" />`
        : "";

      const obsHtml = sighting.observations
        ? `<p style="font-size:12px;color:#4b5563;margin-top:4px;">${escapeHtml(
            sighting.observations
          )}</p>`
        : "";

      const html = `
        <div style="min-width:200px">
          ${photoHtml}
          <strong style="font-size:14px;display:block">${escapeHtml(
            sighting.species
          )}</strong>
          ${obsHtml}
          <span style="font-size:12px;color:#9ca3af;display:block;margin-top:8px">📍 ${sighting.lat.toFixed(
            4
          )}, ${sighting.lng.toFixed(4)}</span>
        </div>
      `;

      marker.bindPopup(html);
      marker.addTo(markersLayer);
    });
  }, [sightings]);

  // Pending marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (pendingMarkerRef.current) {
      pendingMarkerRef.current.remove();
      pendingMarkerRef.current = null;
    }

    if (pendingLocation) {
      pendingMarkerRef.current = L.marker(
        [pendingLocation.lat, pendingLocation.lng],
        { icon: customIcon }
      ).addTo(map);
    }
  }, [pendingLocation]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, photo: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!pendingLocation || !formData.species.trim()) return;

    const newSighting: Sighting = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      lat: pendingLocation.lat,
      lng: pendingLocation.lng,
      species: formData.species.trim(),
      observations: formData.observations.trim(),
      photo: formData.photo,
      timestamp: new Date().toISOString(),
    };

    setSightings((prev) => [...prev, newSighting]);
    setShowForm(false);
    setPendingLocation(null);
    setFormData({ species: "", observations: "", photo: null });
  };

  const handleCancel = () => {
    setShowForm(false);
    setPendingLocation(null);
    setFormData({ species: "", observations: "", photo: null });
  };

  const handleLocateClick = () => {
    const map = mapRef.current;
    if (!map) return;

    map.locate({ setView: true, maxZoom: 16 });
  };

  const exportToJSON = () => {
    if (sightings.length === 0) return;

    const exportData = sightings.map(({ photo, ...rest }) => ({
      ...rest,
      hasPhoto: !!photo,
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bionatura-avistamentos-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    if (sightings.length === 0) return;

    const headers = ["ID", "Espécie", "Latitude", "Longitude", "Observações", "Data/Hora", "Tem Foto"];
    const rows = sightings.map((s) => [
      s.id,
      `"${s.species.replace(/"/g, '""')}"`,
      s.lat.toFixed(6),
      s.lng.toFixed(6),
      `"${(s.observations || "").replace(/"/g, '""')}"`,
      new Date(s.timestamp).toLocaleString("pt-BR"),
      s.photo ? "Sim" : "Não",
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bionatura-avistamentos-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen pb-28 bg-gradient-to-b from-sky-50 to-emerald-50/50 dark:from-background dark:to-background relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-6 pb-4 relative z-10"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              🗺️ Mapa de Campo
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Registre avistamentos
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold shadow-lg ${
              isOnline
                ? "bg-gradient-to-r from-emerald-400 to-green-500 shadow-emerald-500/30 text-white"
                : "bg-gradient-to-r from-rose-400 to-red-500 shadow-rose-500/30 text-white"
            }`}
          >
            {isOnline ? (
              <Wifi className="w-3.5 h-3.5" />
            ) : (
              <WifiOff className="w-3.5 h-3.5" />
            )}
            {isOnline ? "Online" : "Offline"}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
          {isSearching && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground animate-spin z-10" />
          )}
          <Input
            placeholder="Buscar localização..."
            className="pl-12 pr-12 h-14 bg-white/90 dark:bg-card/90 backdrop-blur-md border-0 rounded-full shadow-lg text-base"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => searchResults.length > 0 && setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {showResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden z-50 border border-white/40 dark:border-border/40"
              >
                {searchResults.map((result) => (
                  <motion.button
                    key={result.place_id}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                    onClick={() => handleSelectResult(result)}
                    className="w-full px-4 py-3 text-left flex items-start gap-3 border-b border-border/20 last:border-0"
                  >
                    <MapPin className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground line-clamp-2">
                      {result.display_name}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative mx-5 h-[55vh] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 dark:border-border/50"
      >
        <div ref={mapDivRef} className="w-full h-full rounded-3xl" />

        {/* Map Controls */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 z-[1000]">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowLayerPicker(!showLayerPicker)}
            className={`w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center ${
              showLayerPicker
                ? "bg-white dark:bg-card ring-2 ring-violet-500"
                : "bg-gradient-to-br from-violet-400 to-purple-500 shadow-violet-500/30"
            }`}
            title="Camadas"
          >
            <Layers className={`w-5 h-5 ${showLayerPicker ? "text-violet-500" : "text-white"}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/30 flex items-center justify-center"
            onClick={handleLocateClick}
          >
            <LocateFixed className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Layer Picker */}
        <AnimatePresence>
          {showLayerPicker && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-16 top-3 z-[1000] bg-white/95 dark:bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/40 dark:border-border/40"
            >
              <div className="p-2 space-y-1">
                {mapLayers.map((layer) => (
                  <motion.button
                    key={layer.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentLayer(layer.id);
                      setShowLayerPicker(false);
                    }}
                    className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
                      currentLayer === layer.id
                        ? "bg-gradient-to-r from-violet-400 to-purple-500 text-white shadow-lg"
                        : "hover:bg-muted/50 text-foreground"
                    }`}
                  >
                    <span className="text-xl">{layer.icon}</span>
                    <span className="font-medium text-sm">{layer.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tap instruction */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-4 left-4 right-4 z-[1000] pointer-events-none"
        >
          <div className="bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl px-4 py-3 text-center shadow-lg shadow-sky-500/30">
            <p className="text-sm text-white font-medium flex items-center justify-center gap-2">
              <Compass className="w-4 h-4" />
              Toque no mapa para registrar avistamento
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-5 mt-5"
      >
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="text-3xl">📍</div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {sightings.length}
                </p>
                <p className="text-xs text-white/80">Avistamentos</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="text-3xl">🦜</div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {new Set(sightings.map((s) => s.species)).size}
                </p>
                <p className="text-xs text-white/80">Espécies</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Export Buttons */}
        {sightings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-2 mt-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={exportToJSON}
              className="flex-1 py-3 px-4 bg-white/90 dark:bg-card/90 backdrop-blur-md rounded-2xl shadow-lg flex items-center justify-center gap-2 text-foreground font-medium border border-white/40 dark:border-border/40"
            >
              <FileJson className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Exportar JSON</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={exportToCSV}
              className="flex-1 py-3 px-4 bg-white/90 dark:bg-card/90 backdrop-blur-md rounded-2xl shadow-lg flex items-center justify-center gap-2 text-foreground font-medium border border-white/40 dark:border-border/40"
            >
              <FileSpreadsheet className="w-4 h-4 text-green-500" />
              <span className="text-sm">Exportar CSV</span>
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Sighting Form Modal */}
      <AnimatePresence>
        {showForm && pendingLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-end justify-center"
            onClick={handleCancel}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white/95 dark:bg-card/95 backdrop-blur-xl rounded-t-3xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
                  🦎 Novo Avistamento
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCancel}
                  className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5 bg-gradient-to-r from-sky-400/20 to-blue-500/20 rounded-xl px-3 py-2">
                <MapPin className="w-4 h-4 text-sky-500" />
                <span>
                  {pendingLocation.lat.toFixed(5)},
                  {" "}
                  {pendingLocation.lng.toFixed(5)}
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="species" className="text-foreground font-semibold">
                    Nome da Espécie *
                  </Label>
                  <Input
                    id="species"
                    placeholder="Ex: Capivara, Tucano, Jaguatirica..."
                    value={formData.species}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        species: e.target.value,
                      }))
                    }
                    className="bg-white/80 dark:bg-muted/50 border-white/40 dark:border-border/40 rounded-xl h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground font-semibold">
                    Foto do Avistamento
                  </Label>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />

                  {formData.photo ? (
                    <div className="relative">
                      <img
                        src={formData.photo}
                        alt="Preview"
                        className="w-full h-36 object-cover rounded-2xl"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-red-500 text-white flex items-center justify-center shadow-lg"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, photo: null }))
                        }
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-28 rounded-2xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-sky-400/10 to-blue-500/10"
                    >
                      <span className="text-3xl">📷</span>
                      <span className="text-sm text-muted-foreground font-medium">
                        Adicionar foto
                      </span>
                    </motion.button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observations" className="text-foreground font-semibold">
                    Observações
                  </Label>
                  <Textarea
                    id="observations"
                    placeholder="Comportamento, habitat, quantidade..."
                    value={formData.observations}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        observations: e.target.value,
                      }))
                    }
                    className="bg-white/80 dark:bg-muted/50 border-white/40 dark:border-border/40 rounded-xl resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancel}
                    className="flex-1 py-4 bg-muted/50 text-foreground font-semibold rounded-2xl"
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={!formData.species.trim()}
                    className="flex-1 py-4 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Check className="w-5 h-5" />
                    Salvar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default MapScreen;
