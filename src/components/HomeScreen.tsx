import { motion } from "framer-motion";
import { MapPin, Leaf, Camera, FileText, ScanText, Download, Search, Mic, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import biologistAvatar from "@/assets/biologist-avatar.jpeg";
import natureHeroBg from "@/assets/nature-hero-bg.png";

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
}

const features = [
  { 
    id: "map", 
    icon: "🗺️", 
    label: "Mapa", 
    gradient: "from-pink-400 to-rose-500",
    shadowColor: "shadow-pink-500/30"
  },
  { 
    id: "species", 
    icon: "🦜", 
    label: "Espécies", 
    gradient: "from-fuchsia-400 to-purple-500",
    shadowColor: "shadow-purple-500/30"
  },
  { 
    id: "camera", 
    icon: "📷", 
    label: "Câmera", 
    gradient: "from-rose-400 to-pink-500",
    shadowColor: "shadow-rose-500/30"
  },
  { 
    id: "gallery", 
    icon: "🖼️", 
    label: "Galeria", 
    gradient: "from-violet-400 to-purple-500",
    shadowColor: "shadow-violet-500/30"
  },
  { 
    id: "reports", 
    icon: "📋", 
    label: "Relatórios", 
    gradient: "from-amber-400 to-orange-500",
    shadowColor: "shadow-amber-500/30"
  },
  { 
    id: "library", 
    icon: "📂", 
    label: "Downloads", 
    gradient: "from-yellow-400 to-amber-500",
    shadowColor: "shadow-yellow-500/30"
  },
];

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={natureHeroBg} 
          alt="Natureza"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col safe-top">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pt-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <h1 className="text-2xl font-display font-bold text-white drop-shadow-lg">
              Vida & Natureza
            </h1>
            <span className="text-2xl">🌿</span>
          </div>
          <Button 
            size="icon" 
            variant="ghost" 
            className="text-white/80 hover:text-white hover:bg-white/20"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Avatar and Welcome */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 flex flex-col items-center justify-center px-4 -mt-8"
        >
          {/* Avatar Circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
            className="relative mb-4"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/80 shadow-2xl">
              <img 
                src={biologistAvatar} 
                alt="Giovanna Quézia"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2 text-2xl"
            >
              🦋
            </motion.div>
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-1 -left-2 text-xl"
            >
              🌸
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/90 text-sm font-medium drop-shadow-md mb-6"
          >
            Olá, Giovanna Quézia! 🌺
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-6 mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Buscar..." 
              className="pl-12 pr-12 h-12 bg-white/90 backdrop-blur-md border-0 rounded-full shadow-lg text-foreground placeholder:text-muted-foreground"
            />
            <Button 
              size="icon" 
              variant="ghost" 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Mic className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="px-4 pb-28"
        >
          <div className="grid grid-cols-3 gap-3">
            {features.map((feature, index) => (
              <motion.button
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.08 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(feature.id)}
                className={`
                  relative overflow-hidden rounded-2xl p-4
                  bg-gradient-to-br ${feature.gradient}
                  shadow-lg ${feature.shadowColor}
                  transition-all duration-300
                `}
              >
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                
                {/* Icon */}
                <div className="relative z-10 text-4xl mb-2 drop-shadow-md">
                  {feature.icon}
                </div>
                
                {/* Label */}
                <p className="relative z-10 text-white font-semibold text-sm drop-shadow-md">
                  {feature.label}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeScreen;
