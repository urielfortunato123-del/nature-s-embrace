import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Search, ChevronLeft, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { offlineLibrary, searchLibrary, filterByCategory, getLibraryStats, conservationStatus, LibraryItem } from "@/data/offlineLibrary";
import natureHeroBg from "@/assets/nature-hero-bg.png";

const categories = [
  { id: "all", label: "Todos", icon: "📚", gradient: "from-violet-400 to-purple-500", shadowColor: "shadow-violet-500/30" },
  { id: "mamiferos", label: "Mamíferos", icon: "🦁", gradient: "from-amber-400 to-orange-500", shadowColor: "shadow-amber-500/30" },
  { id: "aves", label: "Aves", icon: "🦜", gradient: "from-sky-400 to-blue-500", shadowColor: "shadow-sky-500/30" },
  { id: "repteis", label: "Répteis", icon: "🐊", gradient: "from-lime-400 to-green-500", shadowColor: "shadow-lime-500/30" },
  { id: "anfibios", label: "Anfíbios", icon: "🐸", gradient: "from-emerald-400 to-teal-500", shadowColor: "shadow-emerald-500/30" },
  { id: "peixes", label: "Peixes", icon: "🐟", gradient: "from-cyan-400 to-blue-500", shadowColor: "shadow-cyan-500/30" },
  { id: "insetos", label: "Insetos", icon: "🦋", gradient: "from-yellow-400 to-amber-500", shadowColor: "shadow-yellow-500/30" },
  { id: "flora", label: "Flora", icon: "🌳", gradient: "from-green-400 to-emerald-500", shadowColor: "shadow-green-500/30" },
  { id: "biomas", label: "Biomas", icon: "🏞️", gradient: "from-teal-400 to-cyan-500", shadowColor: "shadow-teal-500/30" },
  { id: "rios", label: "Rios", icon: "🌊", gradient: "from-blue-400 to-indigo-500", shadowColor: "shadow-blue-500/30" },
  { id: "conservacao", label: "Conservação", icon: "🛡️", gradient: "from-rose-400 to-pink-500", shadowColor: "shadow-rose-500/30" },
  { id: "legislacao", label: "Legislação", icon: "⚖️", gradient: "from-slate-400 to-gray-500", shadowColor: "shadow-slate-500/30" },
];

const categoryEmojis: Record<string, string> = {
  mamiferos: "🦁",
  aves: "🦜",
  repteis: "🐊",
  anfibios: "🐸",
  peixes: "🐟",
  insetos: "🦋",
  flora: "🌳",
  biomas: "🏞️",
  rios: "🌊",
  conservacao: "🛡️",
  legislacao: "⚖️",
};

const LibraryScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);

  const stats = useMemo(() => getLibraryStats(), []);

  const filteredItems = useMemo(() => {
    let items = activeCategory === "all" ? offlineLibrary : filterByCategory(activeCategory);
    if (searchQuery.trim()) {
      items = searchLibrary(searchQuery);
      if (activeCategory !== "all") {
        items = items.filter(item => item.category === activeCategory);
      }
    }
    return items;
  }, [searchQuery, activeCategory]);

  const getCategoryCount = (catId: string) => {
    if (catId === "all") return stats.total;
    return stats.categories[catId] || 0;
  };

  return (
    <div className="min-h-screen pb-28 relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src={natureHeroBg} 
          alt="" 
          className="w-full h-full object-cover opacity-30"
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
                📚 Biblioteca
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Conhecimento offline</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/30"
            >
              <span className="text-sm font-bold text-white">{stats.total} itens</span>
            </motion.div>
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
              placeholder="Buscar fauna, flora, biomas..." 
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
          className="px-5 mb-4"
        >
          <div className="grid grid-cols-4 gap-2">
            {categories.slice(0, 8).map((cat, index) => {
              const count = getCategoryCount(cat.id);
              const isActive = activeCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.03 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    relative overflow-hidden rounded-2xl p-3
                    bg-gradient-to-br ${cat.gradient}
                    shadow-lg ${cat.shadowColor}
                    transition-all duration-300
                    ${isActive ? 'ring-4 ring-white/60' : ''}
                  `}
                >
                  {/* Glossy overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                  
                  {/* Icon */}
                  <div className="relative z-10 text-2xl mb-1 drop-shadow-md text-center">
                    {cat.icon}
                  </div>
                  
                  {/* Label */}
                  <p className="relative z-10 text-white font-semibold text-[10px] drop-shadow-md text-center truncate">
                    {cat.label}
                  </p>
                </motion.button>
              );
            })}
          </div>
          
          {/* Second row */}
          <div className="grid grid-cols-4 gap-2 mt-2">
            {categories.slice(8).map((cat, index) => {
              const count = getCategoryCount(cat.id);
              const isActive = activeCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.03 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    relative overflow-hidden rounded-2xl p-3
                    bg-gradient-to-br ${cat.gradient}
                    shadow-lg ${cat.shadowColor}
                    transition-all duration-300
                    ${isActive ? 'ring-4 ring-white/60' : ''}
                  `}
                >
                  {/* Glossy overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                  
                  {/* Icon */}
                  <div className="relative z-10 text-2xl mb-1 drop-shadow-md text-center">
                    {cat.icon}
                  </div>
                  
                  {/* Label */}
                  <p className="relative z-10 text-white font-semibold text-[10px] drop-shadow-md text-center truncate">
                    {cat.label}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-5"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold text-lg text-foreground">Resultados</h2>
            <span className="text-sm text-muted-foreground bg-white/60 backdrop-blur px-3 py-1 rounded-full">{filteredItems.length} itens</span>
          </div>
          
          <div className="space-y-3">
            {filteredItems.length === 0 ? (
              <motion.div 
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 text-center shadow-xl border border-white/40"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
              >
                <Search className="w-14 h-14 mx-auto mb-4 text-muted-foreground opacity-40" />
                <p className="text-lg font-semibold text-foreground mb-1">Nenhum resultado</p>
                <p className="text-sm text-muted-foreground">Tente buscar por outro termo</p>
              </motion.div>
            ) : (
              filteredItems.slice(0, 20).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * Math.min(index, 10) }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 cursor-pointer shadow-lg border border-white/40 hover:shadow-xl transition-all"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-2xl">{categoryEmojis[item.category] || "📄"}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-foreground">{item.title}</p>
                        {item.status && (
                          <Badge 
                            variant="outline" 
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ 
                              borderColor: conservationStatus[item.status].color,
                              color: conservationStatus[item.status].color,
                              backgroundColor: `${conservationStatus[item.status].color}15`
                            }}
                          >
                            {item.status}
                          </Badge>
                        )}
                      </div>
                      {item.scientificName && (
                        <p className="text-xs text-muted-foreground italic mt-0.5">{item.scientificName}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
            {filteredItems.length > 20 && (
              <p className="text-center text-sm text-muted-foreground py-4">
                Mostrando 20 de {filteredItems.length} resultados
              </p>
            )}
          </div>
        </motion.div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25 }}
                className="absolute bottom-0 left-0 right-0 max-h-[90vh] bg-background rounded-t-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white/90 backdrop-blur-xl px-5 py-4 flex items-center gap-3 border-b border-white/30">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedItem(null)}
                    className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <div className="flex-1">
                    <h2 className="font-display font-bold text-foreground text-lg">{selectedItem.title}</h2>
                    {selectedItem.scientificName && (
                      <p className="text-sm text-muted-foreground italic">{selectedItem.scientificName}</p>
                    )}
                  </div>
                  {selectedItem.status && (
                    <Badge 
                      className="rounded-full px-3"
                      style={{ 
                        backgroundColor: conservationStatus[selectedItem.status].color,
                        color: 'white' 
                      }}
                    >
                      {conservationStatus[selectedItem.status].label}
                    </Badge>
                  )}
                </div>

                {/* Modal Content */}
                <ScrollArea className="h-[calc(90vh-80px)] px-5 pb-8">
                  {/* Biomes */}
                  {selectedItem.biome && (
                    <div className="flex flex-wrap gap-2 my-4">
                      {selectedItem.biome.map((b) => (
                        <Badge key={b} className="bg-gradient-to-r from-emerald-400/20 to-green-500/20 text-emerald-700 border-emerald-300 rounded-full">
                          🌿 {b}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Content */}
                  <div className="prose prose-sm max-w-none mt-4">
                    {selectedItem.content.split('\n\n').map((paragraph, i) => (
                      <div key={i} className="mb-4">
                        {paragraph.startsWith('**') ? (
                          <h3 className="font-display font-bold text-foreground mb-2 text-lg">
                            {paragraph.replace(/\*\*/g, '')}
                          </h3>
                        ) : paragraph.startsWith('- ') ? (
                          <ul className="space-y-2 text-muted-foreground">
                            {paragraph.split('\n').map((line, j) => (
                              <li key={j} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{line.replace('- ', '')}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-muted-foreground leading-relaxed">{paragraph}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border">
                    {selectedItem.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs rounded-full px-3 py-1">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Download Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 py-4 bg-gradient-to-r from-violet-400 to-purple-500 text-white font-semibold rounded-2xl shadow-lg shadow-violet-500/30 flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Salvar para Offline
                  </motion.button>
                </ScrollArea>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LibraryScreen;
