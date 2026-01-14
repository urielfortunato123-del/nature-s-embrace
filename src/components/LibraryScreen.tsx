import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Search, Globe, FileText, Leaf, Bird, Fish, Bug, Trees, Droplets, Scale, Shield, ChevronLeft, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { offlineLibrary, searchLibrary, filterByCategory, getLibraryStats, conservationStatus, LibraryItem } from "@/data/offlineLibrary";

const categories = [
  { id: "all", label: "Todos", icon: BookOpen },
  { id: "mamiferos", label: "Mamíferos", icon: Leaf },
  { id: "aves", label: "Aves", icon: Bird },
  { id: "repteis", label: "Répteis", icon: Leaf },
  { id: "anfibios", label: "Anfíbios", icon: Leaf },
  { id: "peixes", label: "Peixes", icon: Fish },
  { id: "insetos", label: "Insetos", icon: Bug },
  { id: "flora", label: "Flora", icon: Trees },
  { id: "biomas", label: "Biomas", icon: Trees },
  { id: "rios", label: "Rios", icon: Droplets },
  { id: "conservacao", label: "Conservação", icon: Shield },
  { id: "legislacao", label: "Legislação", icon: Scale },
];

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
    <div className="min-h-screen pb-24 safe-top">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 glass-nav px-4 py-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-display font-bold text-foreground">Biblioteca Offline</h1>
          <Badge variant="secondary" className="bg-nature/20 text-nature-dark">
            {stats.total} itens
          </Badge>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar fauna, flora, biomas..." 
            className="pl-10 bg-white/60 border-white/40 rounded-2xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 pb-2">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              const count = getCategoryCount(cat.id);
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.03 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap transition-all ${
                    cat.id === activeCategory
                      ? "bg-nature text-white shadow-soft" 
                      : "glass-card hover:shadow-soft"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{cat.label}</span>
                  <span className="text-xs opacity-70">({count})</span>
                </motion.button>
              );
            })}
          </div>
        </ScrollArea>
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-4 mt-4"
      >
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="glass-card rounded-3xl p-8 text-center">
              <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">Nenhum resultado encontrado</p>
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * Math.min(index, 10) }}
                className="glass-card rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedItem(item)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    {item.category === 'mamiferos' && <span className="text-2xl">🦁</span>}
                    {item.category === 'aves' && <span className="text-2xl">🦜</span>}
                    {item.category === 'repteis' && <span className="text-2xl">🐊</span>}
                    {item.category === 'anfibios' && <span className="text-2xl">🐸</span>}
                    {item.category === 'peixes' && <span className="text-2xl">🐟</span>}
                    {item.category === 'insetos' && <span className="text-2xl">🦋</span>}
                    {item.category === 'flora' && <span className="text-2xl">🌳</span>}
                    {item.category === 'biomas' && <span className="text-2xl">🏞️</span>}
                    {item.category === 'rios' && <span className="text-2xl">🌊</span>}
                    {item.category === 'conservacao' && <span className="text-2xl">🛡️</span>}
                    {item.category === 'legislacao' && <span className="text-2xl">⚖️</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-foreground">{item.title}</p>
                      {item.status && (
                        <Badge 
                          variant="outline" 
                          className="text-xs px-1.5 py-0"
                          style={{ 
                            borderColor: conservationStatus[item.status].color,
                            color: conservationStatus[item.status].color 
                          }}
                        >
                          {item.status}
                        </Badge>
                      )}
                    </div>
                    {item.scientificName && (
                      <p className="text-xs text-muted-foreground italic">{item.scientificName}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))
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
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-background rounded-t-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 glass-nav px-4 py-4 flex items-center gap-3">
                <Button size="icon" variant="ghost" onClick={() => setSelectedItem(null)}>
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                  <h2 className="font-display font-bold text-foreground">{selectedItem.title}</h2>
                  {selectedItem.scientificName && (
                    <p className="text-sm text-muted-foreground italic">{selectedItem.scientificName}</p>
                  )}
                </div>
                {selectedItem.status && (
                  <Badge 
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
              <ScrollArea className="h-[calc(85vh-80px)] px-4 pb-8">
                {/* Biomes */}
                {selectedItem.biome && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedItem.biome.map((b) => (
                      <Badge key={b} variant="secondary" className="bg-nature/10 text-nature-dark">
                        {b}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Content */}
                <div className="prose prose-sm max-w-none">
                  {selectedItem.content.split('\n\n').map((paragraph, i) => (
                    <div key={i} className="mb-4">
                      {paragraph.startsWith('**') ? (
                        <h3 className="font-bold text-foreground mb-2">
                          {paragraph.replace(/\*\*/g, '')}
                        </h3>
                      ) : paragraph.startsWith('- ') ? (
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {paragraph.split('\n').map((line, j) => (
                            <li key={j}>{line.replace('- ', '')}</li>
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
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LibraryScreen;
