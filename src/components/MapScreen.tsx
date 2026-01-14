import { motion } from "framer-motion";
import { MapPin, Navigation, Layers, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MapScreen = () => {
  return (
    <div className="min-h-screen pb-24 safe-top">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 glass-nav px-4 py-4"
      >
        <h1 className="text-xl font-display font-bold text-foreground mb-3">Mapa de Campo</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar localização..." 
            className="pl-10 bg-white/60 border-white/40 rounded-2xl"
          />
        </div>
      </motion.div>

      {/* Map Placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative mx-4 mt-4 h-[50vh] rounded-3xl overflow-hidden bg-gradient-to-br from-nature/20 via-sky/20 to-nature/30"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-nature/20 flex items-center justify-center"
            >
              <MapPin className="w-8 h-8 text-nature" />
            </motion.div>
            <p className="text-muted-foreground font-medium">Mapa interativo</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Configure sua API de mapas</p>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <Button size="icon" variant="secondary" className="glass-card rounded-xl w-10 h-10">
            <Layers className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="secondary" className="glass-card rounded-xl w-10 h-10">
            <Navigation className="w-4 h-4" />
          </Button>
        </div>
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
        <h2 className="font-display font-bold text-foreground mb-3">Locais Recentes</h2>
        <div className="glass-card rounded-3xl p-4">
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Nenhum local registrado</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        className="floating-action"
        whileTap={{ scale: 0.9 }}
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default MapScreen;
