import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Bird, Fish, Bug, Cat, Plus, Leaf, Sparkles, X, Camera, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import natureHeroBg from "@/assets/nature-hero-bg.png";

const categories = [
  { id: "all", label: "Todos", icon: Sparkles, gradient: "from-violet-400 to-purple-500" },
  { id: "birds", label: "Aves", icon: Bird, gradient: "from-sky-400 to-blue-500" },
  { id: "mammals", label: "Mamíferos", icon: Cat, gradient: "from-amber-400 to-orange-500" },
  { id: "fish", label: "Peixes", icon: Fish, gradient: "from-cyan-400 to-teal-500" },
  { id: "insects", label: "Insetos", icon: Bug, gradient: "from-lime-400 to-green-500" },
  { id: "plants", label: "Plantas", icon: Leaf, gradient: "from-emerald-400 to-green-600" },
];

const SpeciesScreen = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen pb-28 relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src={natureHeroBg} 
          alt="" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-5 pt-6 pb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                🦎 Espécies
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Catálogo de fauna e flora</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg flex items-center justify-center"
            >
              <Filter className="w-5 h-5 text-foreground" />
            </motion.button>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <Input 
              placeholder="Buscar espécie..." 
              className="pl-16 pr-4 h-14 bg-white/80 backdrop-blur-xl border-white/40 rounded-2xl text-base shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-5 mb-6"
        >
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative flex items-center gap-2 px-4 py-3 rounded-2xl whitespace-nowrap transition-all ${
                    isActive 
                      ? "text-white shadow-lg" 
                      : "bg-white/70 backdrop-blur-xl text-foreground shadow-md"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryBg"
                      className={`absolute inset-0 bg-gradient-to-r ${cat.gradient} rounded-2xl`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`w-5 h-5 relative z-10 ${isActive ? "text-white" : ""}`} />
                  <span className="text-sm font-semibold relative z-10">{cat.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Species Grid - Empty State */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg text-foreground">Catálogo</h2>
            <span className="text-sm text-muted-foreground bg-white/60 backdrop-blur px-3 py-1 rounded-full">0 espécies</span>
          </div>

          <motion.div 
            className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40"
            whileHover={{ scale: 1.01 }}
          >
            <div className="text-center">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  y: [0, -5, 0]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-24 h-24 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg"
              >
                <Bird className="w-12 h-12 text-white" />
              </motion.div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">Comece seu catálogo!</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                Registre as espécies que encontrar em suas expedições de campo
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-semibold rounded-2xl shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Adicionar Espécie
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-5 mt-6"
        >
          <h2 className="font-display font-bold text-lg text-foreground mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/40 text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center mb-3 shadow-md">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <p className="font-semibold text-foreground">Identificar com IA</p>
              <p className="text-xs text-muted-foreground mt-1">Use a câmera</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/40 text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mb-3 shadow-md">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <p className="font-semibold text-foreground">Favoritas</p>
              <p className="text-xs text-muted-foreground mt-1">Suas espécies</p>
            </motion.button>
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="px-5 mt-6 mb-4"
        >
          <div className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-4 border border-violet-200/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">Dica: Identificação por foto</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Use a câmera para identificar espécies automaticamente com inteligência artificial
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-28 right-5 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white shadow-xl z-50"
      >
        <Plus className="w-7 h-7" />
      </motion.button>
    </div>
  );
};

export default SpeciesScreen;
