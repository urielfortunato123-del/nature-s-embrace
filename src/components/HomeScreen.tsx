import { motion } from "framer-motion";
import { MapPin, Leaf, Camera, FileText, BookOpen, Sparkles } from "lucide-react";
import biologistAvatar from "@/assets/biologist-avatar.jpeg";

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
}

const features = [
  { id: "map", icon: MapPin, label: "Mapa", color: "bg-nature", description: "Explore localizações" },
  { id: "species", icon: Leaf, label: "Espécies", color: "bg-sun", description: "Catálogo de fauna" },
  { id: "camera", icon: Camera, label: "Câmera", color: "bg-primary", description: "Registre avistamentos" },
  { id: "reports", icon: FileText, label: "Relatórios", color: "bg-secondary", description: "Laudos técnicos" },
  { id: "library", icon: BookOpen, label: "Biblioteca", color: "bg-sky", description: "Material de estudo" },
];

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with avatar */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${biologistAvatar})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 pt-12 pb-24 safe-top">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-glow"
          >
            <img 
              src={biologistAvatar} 
              alt="Bióloga"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-display font-bold text-foreground mb-2"
          >
            BioNatura
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground font-medium flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-sun" />
            Sua companheira de campo
            <Sparkles className="w-4 h-4 text-sun" />
          </motion.p>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-3xl p-5 mb-8 text-center"
        >
          <p className="text-sm italic text-foreground/80 leading-relaxed">
            "Sempre olhei para a natureza como casa, e animais como obra de Deus. 
            Quando vejo a natureza, parece que estou olhando Deus diretamente."
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="w-8 h-0.5 bg-primary/40 rounded-full" />
            <Leaf className="w-4 h-4 text-nature" />
            <div className="w-8 h-0.5 bg-primary/40 rounded-full" />
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.button
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate(feature.id)}
                className="glass-card rounded-3xl p-5 text-left transition-all duration-300 hover:shadow-nature"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center mb-3 shadow-soft`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{feature.label}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-8 glass-card rounded-3xl p-5"
        >
          <h3 className="font-display font-bold text-foreground mb-4 text-center">Resumo do Campo</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-nature">0</p>
              <p className="text-xs text-muted-foreground">Registros</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-xs text-muted-foreground">Espécies</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-sun">0</p>
              <p className="text-xs text-muted-foreground">Relatórios</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeScreen;
