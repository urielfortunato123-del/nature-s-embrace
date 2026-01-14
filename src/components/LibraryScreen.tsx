import { motion } from "framer-motion";
import { BookOpen, Download, Wifi, WifiOff, Search, Globe, FileText, Video, Headphones } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", label: "Todos", count: 0 },
  { id: "articles", label: "Artigos", count: 0, icon: FileText },
  { id: "guides", label: "Guias", count: 0, icon: BookOpen },
  { id: "videos", label: "Vídeos", count: 0, icon: Video },
  { id: "podcasts", label: "Podcasts", count: 0, icon: Headphones },
];

const LibraryScreen = () => {
  return (
    <div className="min-h-screen pb-24 safe-top">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 glass-nav px-4 py-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-display font-bold text-foreground">Biblioteca</h1>
          <div className="flex items-center gap-2 text-sm text-nature">
            <Wifi className="w-4 h-4" />
            <span>Online</span>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar material..." 
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
          {categories.map((cat, index) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                cat.id === "all" 
                  ? "bg-sky text-white shadow-soft" 
                  : "glass-card hover:shadow-soft"
              }`}
            >
              <span className="text-sm font-medium">{cat.label}</span>
              <span className="text-xs opacity-70">{cat.count}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Web Browser Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-4 mt-6"
      >
        <h2 className="font-display font-bold text-foreground mb-3">Navegador Web</h2>
        <div className="glass-card rounded-3xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Digite a URL ou pesquise..." 
                className="pl-10 bg-muted/50 border-transparent rounded-xl"
              />
            </div>
            <Button size="icon" className="bg-nature hover:bg-nature/90 rounded-xl">
              <Search className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {["Google", "Wikipedia", "iNaturalist", "IBAMA"].map((site) => (
              <Button
                key={site}
                variant="ghost"
                className="h-auto py-3 flex-col gap-1 rounded-xl hover:bg-muted/50"
              >
                <div className="w-8 h-8 rounded-lg bg-sky/20 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-sky" />
                </div>
                <span className="text-xs">{site}</span>
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Downloaded Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-4 mt-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-foreground">Offline</h2>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <WifiOff className="w-3 h-3" />
            <span>0 arquivos</span>
          </div>
        </div>

        {/* Empty State */}
        <div className="glass-card rounded-3xl p-8">
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-sky/20 flex items-center justify-center"
            >
              <Download className="w-10 h-10 text-sky" />
            </motion.div>
            <h3 className="font-bold text-foreground mb-2">Biblioteca vazia</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Baixe materiais para acessar offline
            </p>
            <Button className="btn-nature">
              <Globe className="w-4 h-4 mr-2" />
              Explorar Conteúdo
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Recommended */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-4 mt-6"
      >
        <h2 className="font-display font-bold text-foreground mb-3">Recomendados</h2>
        <div className="space-y-3">
          <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-nature/20 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-nature" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm truncate">Guia de Aves do Brasil</p>
              <p className="text-xs text-muted-foreground">WikiAves • PDF</p>
            </div>
            <Button size="icon" variant="ghost" className="rounded-xl">
              <Download className="w-4 h-4" />
            </Button>
          </div>
          <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-sun/20 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-sun" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm truncate">Manual de Resgate de Fauna</p>
              <p className="text-xs text-muted-foreground">IBAMA • PDF</p>
            </div>
            <Button size="icon" variant="ghost" className="rounded-xl">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LibraryScreen;
