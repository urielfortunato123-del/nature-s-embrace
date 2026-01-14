import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Layers, Search, Plus, LocateFixed, X, Check, Wifi, WifiOff, RefreshCw, Compass } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSightingsStorage } from "@/hooks/useSightingsStorage";

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

interface MapEventsProps {
  onMapClick: (lat: number, lng: number) => void;
  onLocate: (lat: number, lng: number) => void;
}

// Combined map events handler - single component for all map interactions
function MapEvents({ onMapClick, onLocate }: MapEventsProps) {
  const map = useMap();
  
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });

  // Expose locate function globally
  (window as any).__mapLocate = () => {
    map.locate({ setView: true, maxZoom: 16 });
    
    map.once("locationfound", (e) => {
      onLocate(e.latlng.lat, e.latlng.lng);
    });

    map.once("locationerror", () => {
      alert("Não foi possível obter sua localização");
    });
  };
  
  return null;
}

const MapScreen = () => {
  const { 
    sightings, 
    isOnline, 
    pendingSync, 
    addSighting, 
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
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
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

  const handleLocateClick = () => {
    if ((window as any).__mapLocate) {
      (window as any).__mapLocate();
    }
  };

  return (
    <div className="min-h-screen pb-28 bg-gradient-to-b from-sky-50 to-emerald-50/50 relative">
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
            <p className="text-sm text-muted-foreground mt-1">Registre avistamentos</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold shadow-lg ${
                isOnline 
                  ? 'bg-gradient-to-r from-emerald-400 to-green-500 shadow-emerald-500/30 text-white' 
                  : 'bg-gradient-to-r from-rose-400 to-red-500 shadow-rose-500/30 text-white'
              }`}
            >
              {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
              {isOnline ? 'Online' : 'Offline'}
            </motion.div>
            
            {pendingSync > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30 text-white"
                onClick={handleSync}
                disabled={!isOnline || isSyncing}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                {pendingSync}
              </motion.button>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Buscar localização..." 
            className="pl-12 pr-4 h-14 bg-white/90 backdrop-blur-md border-0 rounded-full shadow-lg text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
      </motion.div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative mx-5 h-[55vh] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50"
      >
        <MapContainer
          center={defaultCenter}
          zoom={4}
          className="w-full h-full rounded-3xl"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEvents 
            onMapClick={handleMapClick} 
            onLocate={(lat, lng) => setUserLocation({ lat, lng })} 
          />
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
                </div>
              </Popup>
            </Marker>
          ))}
          {pendingLocation && (
            <Marker position={[pendingLocation.lat, pendingLocation.lng]} icon={customIcon} />
          )}
          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]} icon={customIcon}>
              <Popup>Você está aqui! 📍</Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Map Controls */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 z-[1000]">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 shadow-lg shadow-violet-500/30 flex items-center justify-center"
            title="Camadas"
          >
            <Layers className="w-5 h-5 text-white" />
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
                <p className="text-2xl font-bold text-white">{sightings.length}</p>
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
                <p className="text-2xl font-bold text-white">{new Set(sightings.map(s => s.species)).size}</p>
                <p className="text-xs text-white/80">Espécies</p>
              </div>
            </div>
          </motion.div>
        </div>
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
              className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-t-3xl p-6 shadow-2xl"
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
                <span>{pendingLocation.lat.toFixed(5)}, {pendingLocation.lng.toFixed(5)}</span>
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
                    onChange={(e) => setFormData(prev => ({ ...prev, species: e.target.value }))}
                    className="bg-white/80 border-white/40 rounded-xl h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground font-semibold">Foto do Avistamento</Label>
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
                      <img src={formData.photo} alt="Preview" className="w-full h-36 object-cover rounded-2xl" />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-red-500 text-white flex items-center justify-center shadow-lg"
                        onClick={() => setFormData(prev => ({ ...prev, photo: null }))}
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
                      <span className="text-sm text-muted-foreground font-medium">Adicionar foto</span>
                    </motion.button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observations" className="text-foreground font-semibold">Observações</Label>
                  <Textarea
                    id="observations"
                    placeholder="Comportamento, habitat, quantidade..."
                    value={formData.observations}
                    onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
                    className="bg-white/80 border-white/40 rounded-xl resize-none"
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

      {/* FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-28 right-5 w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white shadow-xl shadow-rose-500/30 z-50"
      >
        <Plus className="w-7 h-7" />
      </motion.button>
    </div>
  );
};

export default MapScreen;
