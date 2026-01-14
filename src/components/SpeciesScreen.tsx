import { motion } from "framer-motion";
import { Search, Filter, Bird, Fish, Bug, Cat, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", label: "Todos", icon: null },
  { id: "birds", label: "Aves", icon: Bird },
  { id: "mammals", label: "Mamíferos", icon: Cat },
  { id: "fish", label: "Peixes", icon: Fish },
  { id: "insects", label: "Insetos", icon: Bug },
];

const SpeciesScreen = () => {
  return (
    <div className="min-h-screen pb-24 safe-top">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 glass-nav px-4 py-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-display font-bold text-foreground">Espécies</h1>
          <Button size="icon" variant="ghost" className="rounded-xl">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar espécie..." 
            className="pl-10 bg-white/60 border-white/40 rounded-2xl"
          />
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-4 mt-4"
      >
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  cat.id === "all" 
                    ? "bg-nature text-white shadow-nature" 
                    : "glass-card hover:shadow-soft"
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span className="text-sm font-medium">{cat.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Species Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-4 mt-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-foreground">Catálogo</h2>
          <span className="text-sm text-muted-foreground">0 espécies</span>
        </div>

        {/* Empty State */}
        <div className="glass-card rounded-3xl p-8">
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-sun/20 flex items-center justify-center"
            >
              <Bird className="w-10 h-10 text-sun" />
            </motion.div>
            <h3 className="font-bold text-foreground mb-2">Comece seu catálogo!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Registre as espécies que encontrar em campo
            </p>
            <Button className="btn-nature">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Espécie
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-4 mt-6"
      >
        <h2 className="font-display font-bold text-foreground mb-3">Dicas</h2>
        <div className="glass-card rounded-3xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/30 flex items-center justify-center flex-shrink-0">
              <Bug className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm">Identificação por foto</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Use a câmera para identificar espécies automaticamente com IA
              </p>
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

export default SpeciesScreen;
