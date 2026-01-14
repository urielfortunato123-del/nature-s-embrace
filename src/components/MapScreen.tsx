import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Layers, Search, Plus, LocateFixed, Camera, X, Check, Image as ImageIcon, Wifi, WifiOff, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSightingsStorage, FaunaSighting } from "@/hooks/useSightingsStorage";

// Fix for default marker icons in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom marker icon with nature theme
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Wrapper component for map controls - must be child of MapContainer but renders a portal-like structure
function MapControls() {
  const map = useMap();
  const [locating, setLocating] = useState(false);
  const [currentLayer, setCurrentLayer] = useState<'street' | 'satellite' | 'terrain'>('street');

  const layers = {
    street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  };

  const handleLocate = () => {
    setLocating(true);
    map.locate({ setView: true, maxZoom: 16 });
    
    map.once("locationfound", (e) => {
      setLocating(false);
      L.marker(e.latlng, { icon: customIcon })
        .addTo(map)
        .bindPopup("Você está aqui! 📍")
        .openPopup();
    });

    map.once("locationerror", () => {
      setLocating(false);
      alert("Não foi possível obter sua localização");
    });
  };

  const cycleLayer = () => {
    const layerOrder: ('street' | 'satellite' | 'terrain')[] = ['street', 'satellite', 'terrain'];
    const currentIndex = layerOrder.indexOf(currentLayer);
    const nextLayer = layerOrder[(currentIndex + 1) % layerOrder.length];
    setCurrentLayer(nextLayer);
  };

  useEffect(() => {
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });
    
    L.tileLayer(layers[currentLayer], {
      attribution: currentLayer === 'satellite' 
        ? '&copy; Esri' 
        : currentLayer === 'terrain'
        ? '&copy; OpenTopoMap'
        : '&copy; OpenStreetMap contributors',
    }).addTo(map);
  }, [currentLayer, map]);

  // Use a container ref to position controls absolutely within the map
  const container = map.getContainer();
  
  useEffect(() => {
    // Create control container if it doesn't exist
    let controlContainer = container.querySelector('.custom-map-controls') as HTMLDivElement;
    if (!controlContainer) {
      controlContainer = document.createElement('div');
      controlContainer.className = 'custom-map-controls';
      controlContainer.style.cssText = 'position: absolute; right: 12px; top: 12px; z-index: 1000; display: flex; flex-direction: column; gap: 8px;';
      container.appendChild(controlContainer);
    }
    
    return () => {
      controlContainer?.remove();
    };
  }, [container]);

  return null;
}

// Click handler component
function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// Custom control component that renders inside map container
function CustomMapControls() {
  const map = useMap();
  const [locating, setLocating] = useState(false);
  const [currentLayer, setCurrentLayer] = useState<'street' | 'satellite' | 'terrain'>('street');
  const controlRef = useRef<HTMLDivElement>(null);

  const layers: Record<string, string> = {
    street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  };

  const handleLocate = () => {
    setLocating(true);
    map.locate({ setView: true, maxZoom: 16 });
    
    map.once("locationfound", (e) => {
      setLocating(false);
      L.marker(e.latlng, { icon: customIcon })
        .addTo(map)
        .bindPopup("Você está aqui! 📍")
        .openPopup();
    });

    map.once("locationerror", () => {
      setLocating(false);
      alert("Não foi possível obter sua localização");
    });
  };

  const cycleLayer = () => {
    const layerOrder: ('street' | 'satellite' | 'terrain')[] = ['street', 'satellite', 'terrain'];
    const currentIndex = layerOrder.indexOf(currentLayer);
    const nextLayer = layerOrder[(currentIndex + 1) % layerOrder.length];
    setCurrentLayer(nextLayer);
  };

  useEffect(() => {
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });
    
    L.tileLayer(layers[currentLayer], {
      attribution: currentLayer === 'satellite' 
        ? '&copy; Esri' 
        : currentLayer === 'terrain'
        ? '&copy; OpenTopoMap'
        : '&copy; OpenStreetMap contributors',
    }).addTo(map);
  }, [currentLayer, map]);

  // Append buttons to the map container to avoid context issues
  useEffect(() => {
    const container = map.getContainer();
    const controlDiv = controlRef.current;
    if (controlDiv && container) {
      container.appendChild(controlDiv);
    }
    return () => {
      if (controlDiv && controlDiv.parentNode) {
        controlDiv.parentNode.removeChild(controlDiv);
      }
    };
  }, [map]);

  return (
    <div 
      ref={controlRef}
      className="absolute right-3 top-3 flex flex-col gap-2 z-[1000]"
      style={{ position: 'absolute' }}
    >
      <Button 
        size="icon" 
        variant="secondary" 
        className="glass-card rounded-xl w-10 h-10"
        onClick={cycleLayer}
        title={`Camada: ${currentLayer}`}
      >
        <Layers className="w-4 h-4" />
      </Button>
      <Button 
        size="icon" 
        variant="secondary" 
        className="glass-card rounded-xl w-10 h-10"
        onClick={handleLocate}
        disabled={locating}
      >
        <LocateFixed className={`w-4 h-4 ${locating ? 'animate-pulse' : ''}`} />
      </Button>
    </div>
  );
}

const MapScreen = () => {
  const { 
    sightings, 
    isLoading, 
    isOnline, 
    pendingSync, 
    addSighting, 
    removeSighting, 
    syncSightings 
  } = useSightingsStorage();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [pendingLocation, setPendingLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [formData, setFormData] = useState({
    species: "",
    observations: "",
    photo: null as string | null,
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultCenter: [number, number] = [-14.235, -51.9253];

  const handleMapClick = (lat: number, lng: number) => {
    setPendingLocation({ lat, lng });
    setShowForm(true);
    setFormData({ species: "", observations: "", photo: null });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!pendingLocation || !formData.species.trim()) return;

    await addSighting({
      lat: pendingLocation.lat,
      lng: pendingLocation.lng,
      species: formData.species.trim(),
      observations: formData.observations.trim(),
      photo: formData.photo,
      timestamp: new Date(),
    });

    setShowForm(false);
    setPendingLocation(null);
    setFormData({ species: "", observations: "", photo: null });
  };

  const handleSync = async () => {
    setIsSyncing(true);
    await syncSightings();
    setIsSyncing(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setPendingLocation(null);
    setFormData({ species: "", observations: "", photo: null });
  };

  return (
    <div className="min-h-screen pb-24 safe-top">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-[1000] glass-nav px-4 py-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-display font-bold text-foreground">Mapa de Campo</h1>
          <div className="flex items-center gap-2">
            {/* Online/Offline Status */}
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
              isOnline ? 'bg-nature/20 text-nature-dark' : 'bg-destructive/20 text-destructive'
            }`}>
              {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              {isOnline ? 'Online' : 'Offline'}
            </div>
            
            {/* Sync Button */}
            {pendingSync > 0 && (
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-2 text-xs gap-1 rounded-full"
                onClick={handleSync}
                disabled={!isOnline || isSyncing}
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                {pendingSync}
              </Button>
            )}
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar localização..." 
            className="pl-10 bg-white/60 border-white/40 rounded-2xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative mx-4 mt-4 h-[50vh] rounded-3xl overflow-hidden shadow-lg"
      >
        <MapContainer
          center={defaultCenter}
          zoom={4}
          className="w-full h-full rounded-3xl"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Click handler */}
          <MapClickHandler onMapClick={handleMapClick} />
          
          {/* Render saved sightings */}
          {sightings.map((sighting) => (
            <Marker key={sighting.id} position={[sighting.lat, sighting.lng]} icon={customIcon}>
              <Popup>
                <div className="min-w-[200px]">
                  {sighting.photo && (
                    <img 
                      src={sighting.photo} 
                      alt={sighting.species}
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                  )}
                  <strong className="text-sm block">{sighting.species}</strong>
                  {sighting.observations && (
                    <p className="text-xs text-gray-600 mt-1">{sighting.observations}</p>
                  )}
                  <span className="text-xs text-gray-400 block mt-2">
                    📍 {sighting.lat.toFixed(4)}, {sighting.lng.toFixed(4)}
                  </span>
                  <span className="text-xs text-gray-400 block">
                    🕐 {sighting.timestamp.toLocaleString('pt-BR')}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Pending marker */}
          {pendingLocation && (
            <Marker position={[pendingLocation.lat, pendingLocation.lng]} icon={customIcon} />
          )}

          <CustomMapControls />
        </MapContainer>

        {/* Tap instruction */}
        <div className="absolute bottom-3 left-3 right-3 z-[1000] pointer-events-none">
          <div className="glass-card rounded-xl px-3 py-2 text-center">
            <p className="text-xs text-muted-foreground">
              👆 Toque no mapa para registrar avistamento
            </p>
          </div>
        </div>
      </motion.div>

      {/* Sighting Form Modal */}
      <AnimatePresence>
        {showForm && pendingLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/50 flex items-end justify-center p-4"
            onClick={handleCancel}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md glass-card rounded-3xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-lg text-foreground">
                  🦎 Novo Avistamento
                </h2>
                <Button size="icon" variant="ghost" onClick={handleCancel}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="text-xs text-muted-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                {pendingLocation.lat.toFixed(5)}, {pendingLocation.lng.toFixed(5)}
              </div>

              <div className="space-y-4">
                {/* Species Name */}
                <div className="space-y-2">
                  <Label htmlFor="species" className="text-foreground">
                    Nome da Espécie *
                  </Label>
                  <Input
                    id="species"
                    placeholder="Ex: Capivara, Tucano, Jaguatirica..."
                    value={formData.species}
                    onChange={(e) => setFormData(prev => ({ ...prev, species: e.target.value }))}
                    className="bg-white/60 border-white/40 rounded-xl"
                  />
                </div>

                {/* Photo Upload */}
                <div className="space-y-2">
                  <Label className="text-foreground">Foto do Avistamento</Label>
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
                        className="w-full h-32 object-cover rounded-xl"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 w-8 h-8 rounded-full"
                        onClick={() => setFormData(prev => ({ ...prev, photo: null }))}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full h-24 rounded-xl border-dashed border-2 flex flex-col gap-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="w-6 h-6 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Tirar foto ou escolher da galeria
                      </span>
                    </Button>
                  )}
                </div>

                {/* Observations */}
                <div className="space-y-2">
                  <Label htmlFor="observations" className="text-foreground">
                    Observações
                  </Label>
                  <Textarea
                    id="observations"
                    placeholder="Comportamento, habitat, quantidade de indivíduos..."
                    value={formData.observations}
                    onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
                    className="bg-white/60 border-white/40 rounded-xl min-h-[80px]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-xl"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="flex-1 rounded-xl bg-gradient-to-r from-nature to-nature-dark text-white"
                    onClick={handleSubmit}
                    disabled={!formData.species.trim()}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-4 mt-6"
      >
        <h2 className="font-display font-bold text-foreground mb-3">Ações Rápidas</h2>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="glass-card border-white/30 rounded-2xl h-auto py-4 flex flex-col gap-2"
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (pos) => handleMapClick(pos.coords.latitude, pos.coords.longitude),
                () => alert("Não foi possível obter localização")
              );
            }}
          >
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm">Registrar Aqui</span>
          </Button>
          <Button 
            variant="outline" 
            className="glass-card border-white/30 rounded-2xl h-auto py-4 flex flex-col gap-2"
          >
            <Navigation className="w-5 h-5 text-nature" />
            <span className="text-sm">Minha Posição</span>
          </Button>
        </div>
      </motion.div>

      {/* Recent Sightings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-4 mt-6"
      >
        <h2 className="font-display font-bold text-foreground mb-3">
          Avistamentos ({sightings.length})
        </h2>
        <div className="glass-card rounded-3xl p-4">
          {sightings.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Nenhum avistamento registrado</p>
                <p className="text-xs mt-1">Toque no mapa para adicionar</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {sightings.map((sighting) => (
                <div key={sighting.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/30 relative">
                  {/* Sync indicator */}
                  {!sighting.synced && (
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" title="Pendente de sincronização" />
                  )}
                  {sighting.photo ? (
                    <img
                      src={sighting.photo}
                      alt={sighting.species}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{sighting.species}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {sighting.observations || "Sem observações"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {sighting.timestamp.toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    onClick={() => removeSighting(sighting.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        className="floating-action"
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (pos) => handleMapClick(pos.coords.latitude, pos.coords.longitude),
            () => alert("Ative a localização para registrar avistamento")
          );
        }}
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default MapScreen;
