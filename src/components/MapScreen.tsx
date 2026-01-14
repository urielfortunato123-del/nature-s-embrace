import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Layers, Search, Plus, LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

// Component to handle location
function LocationButton() {
  const map = useMap();
  const [locating, setLocating] = useState(false);

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

  return (
    <Button 
      size="icon" 
      variant="secondary" 
      className="glass-card rounded-xl w-10 h-10"
      onClick={handleLocate}
      disabled={locating}
    >
      <LocateFixed className={`w-4 h-4 ${locating ? 'animate-pulse' : ''}`} />
    </Button>
  );
}

// Layer switcher component
function LayerControl() {
  const map = useMap();
  const [currentLayer, setCurrentLayer] = useState<'street' | 'satellite' | 'terrain'>('street');

  const layers = {
    street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  };

  const cycleLayer = () => {
    const layerOrder: ('street' | 'satellite' | 'terrain')[] = ['street', 'satellite', 'terrain'];
    const currentIndex = layerOrder.indexOf(currentLayer);
    const nextLayer = layerOrder[(currentIndex + 1) % layerOrder.length];
    setCurrentLayer(nextLayer);
  };

  useEffect(() => {
    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });
    
    // Add new tile layer
    L.tileLayer(layers[currentLayer], {
      attribution: currentLayer === 'satellite' 
        ? '&copy; Esri' 
        : currentLayer === 'terrain'
        ? '&copy; OpenTopoMap'
        : '&copy; OpenStreetMap contributors',
    }).addTo(map);
  }, [currentLayer, map]);

  return (
    <Button 
      size="icon" 
      variant="secondary" 
      className="glass-card rounded-xl w-10 h-10"
      onClick={cycleLayer}
      title={`Camada: ${currentLayer}`}
    >
      <Layers className="w-4 h-4" />
    </Button>
  );
}

const MapScreen = () => {
  const [markers, setMarkers] = useState<{lat: number; lng: number; name: string}[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Default center (Brazil)
  const defaultCenter: [number, number] = [-14.235, -51.9253];

  const addMarker = (lat: number, lng: number) => {
    const name = `Local ${markers.length + 1}`;
    setMarkers([...markers, { lat, lng, name }]);
  };

  return (
    <div className="min-h-screen pb-24 safe-top">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-[1000] glass-nav px-4 py-4"
      >
        <h1 className="text-xl font-display font-bold text-foreground mb-3">Mapa de Campo</h1>
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
          
          {/* Render saved markers */}
          {markers.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lng]} icon={customIcon}>
              <Popup>
                <div className="text-center">
                  <strong>{marker.name}</strong>
                  <br />
                  <span className="text-xs text-gray-500">
                    {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Map Controls */}
          <div className="absolute right-3 top-3 flex flex-col gap-2 z-[1000]">
            <LayerControl />
            <LocationButton />
          </div>
        </MapContainer>
      </motion.div>

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
              // Get current map center as a demo marker
              const lat = -14.235 + (Math.random() - 0.5) * 10;
              const lng = -51.9253 + (Math.random() - 0.5) * 10;
              addMarker(lat, lng);
            }}
          >
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm">Marcar Local</span>
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

      {/* Recent Locations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-4 mt-6"
      >
        <h2 className="font-display font-bold text-foreground mb-3">Locais Marcados ({markers.length})</h2>
        <div className="glass-card rounded-3xl p-4">
          {markers.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Nenhum local registrado</p>
                <p className="text-xs mt-1">Clique em "Marcar Local" para adicionar</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {markers.map((marker, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-xl bg-white/30">
                  <MapPin className="w-4 h-4 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{marker.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
                    </p>
                  </div>
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
          const lat = -14.235 + (Math.random() - 0.5) * 10;
          const lng = -51.9253 + (Math.random() - 0.5) * 10;
          addMarker(lat, lng);
        }}
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default MapScreen;
