import { MapPin, Leaf, Camera, FileText, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "map", icon: MapPin, label: "Mapa" },
  { id: "species", icon: Leaf, label: "Espécies" },
  { id: "camera", icon: Camera, label: "Câmera" },
  { id: "reports", icon: FileText, label: "Relatórios" },
  { id: "library", icon: BookOpen, label: "Biblioteca" },
];

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 glass-nav safe-bottom z-50"
    >
      <div className="flex items-center justify-around px-2 py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`nav-item relative ${isActive ? "active" : ""}`}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/15 rounded-2xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon 
                className={`w-5 h-5 relative z-10 transition-colors duration-300 ${
                  isActive ? "text-primary" : ""
                }`} 
              />
              <span className={`text-xs mt-1 font-medium relative z-10 ${
                isActive ? "text-primary" : ""
              }`}>
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNav;
