import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Bird, Fish, Bug, Cat, Plus, Leaf, Sparkles, Camera, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import natureHeroBg from "@/assets/nature-hero-bg.png";

const categories = [
  { id: "all", label: "Todos", icon: "✨", gradient: "from-violet-400 to-purple-500", shadowColor: "shadow-violet-500/30" },
  { id: "birds", label: "Aves", icon: "🦜", gradient: "from-sky-400 to-blue-500", shadowColor: "shadow-sky-500/30" },
  { id: "mammals", label: "Mamíferos", icon: "🦁", gradient: "from-amber-400 to-orange-500", shadowColor: "shadow-amber-500/30" },
  { id: "fish", label: "Peixes", icon: "🐟", gradient: "from-cyan-400 to-teal-500", shadowColor: "shadow-cyan-500/30" },
  { id: "insects", label: "Insetos", icon: "🦋", gradient: "from-lime-400 to-green-500", shadowColor: "shadow-lime-500/30" },
  { id: "plants", label: "Plantas", icon: "🌿", gradient: "from-emerald-400 to-green-600", shadowColor: "shadow-emerald-500/30" },
];

const quickActions = [
  { id: "camera", label: "Identificar com IA", subtitle: "Use a câmera", icon: "📷", gradient: "from-sky-400 to-blue-500", shadowColor: "shadow-sky-500/30" },
  { id: "favorites", label: "Favoritas", subtitle: "Suas espécies", icon: "💜", gradient: "from-rose-400 to-pink-500", shadowColor: "shadow-rose-500/30" },
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
              className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 shadow-lg shadow-violet-500/30 flex items-center justify-center"
            >
              <Filter className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Buscar espécie..." 
              className="pl-12 pr-4 h-14 bg-white/90 backdrop-blur-md border-0 rounded-full shadow-lg text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-5 mb-6"
        >
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat, index) => {
              const isActive = activeCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    relative overflow-hidden rounded-2xl p-4
                    bg-gradient-to-br ${cat.gradient}
                    shadow-lg ${cat.shadowColor}
                    transition-all duration-300
                    ${isActive ? 'ring-4 ring-white/60' : ''}
                  `}
                >
                  {/* Glossy overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                  
                  {/* Icon */}
                  <div className="relative z-10 text-3xl mb-2 drop-shadow-md">
                    {cat.icon}
                  </div>
                  
                  {/* Label */}
                  <p className="relative z-10 text-white font-semibold text-xs drop-shadow-md">
                    {cat.label}
                  </p>
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
                className="w-24 h-24 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30"
              >
                <span className="text-5xl">🦜</span>
              </motion.div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">Comece seu catálogo!</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                Registre as espécies que encontrar em suas expedições de campo
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/30"
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
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.08 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative overflow-hidden rounded-2xl p-4
                  bg-gradient-to-br ${action.gradient}
                  shadow-lg ${action.shadowColor}
                  transition-all duration-300 text-left
                `}
              >
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                
                {/* Icon */}
                <div className="relative z-10 text-3xl mb-2 drop-shadow-md">
                  {action.icon}
                </div>
                
                {/* Label */}
                <p className="relative z-10 text-white font-semibold text-sm drop-shadow-md">
                  {action.label}
                </p>
                <p className="relative z-10 text-white/80 text-xs drop-shadow-md">
                  {action.subtitle}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="px-5 mt-6 mb-4"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-r from-violet-500/90 to-purple-500/90 shadow-lg shadow-violet-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent" />
            <div className="flex items-start gap-3 relative z-10">
              <div className="text-2xl">✨</div>
              <div>
                <h4 className="font-semibold text-white text-sm">Dica: Identificação por foto</h4>
                <p className="text-xs text-white/80 mt-1">
                  Use a câmera para identificar espécies automaticamente com inteligência artificial
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-28 right-5 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/30 z-50"
      >
        <Plus className="w-7 h-7" />
      </motion.button>
    </div>
  );
};

export default SpeciesScreen;
