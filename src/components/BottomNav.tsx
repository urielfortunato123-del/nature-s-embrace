import { Home, Flag, FileEdit, Compass } from "lucide-react";
import { motion } from "framer-motion";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "home", icon: Home, label: "Início", gradient: "from-orange-400 to-amber-500" },
  { id: "missions", icon: Flag, label: "Missões", gradient: "from-pink-400 to-rose-500" },
  { id: "notes", icon: FileEdit, label: "Notas", gradient: "from-violet-400 to-purple-500" },
  { id: "navigate", icon: Compass, label: "Navegar", gradient: "from-blue-400 to-cyan-500" },
];

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 safe-bottom"
    >
      {/* Glassmorphism background */}
      <div className="mx-3 mb-3 rounded-2xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/50">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id || 
              (tab.id === 'home' && !['home', 'missions', 'notes', 'navigate'].includes(activeTab)) ||
              (tab.id === 'navigate' && activeTab === 'map');
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'navigate') {
                    onTabChange('map');
                  } else if (tab.id === 'home') {
                    onTabChange('home');
                  } else {
                    onTabChange(tab.id);
                  }
                }}
                className="relative flex flex-col items-center px-4 py-2 rounded-xl transition-all duration-300"
                whileTap={{ scale: 0.9 }}
              >
                {/* Active indicator background */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-xl opacity-20`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Icon container */}
                <div className={`
                  relative z-10 w-10 h-10 rounded-xl flex items-center justify-center mb-1
                  ${isActive 
                    ? `bg-gradient-to-br ${tab.gradient} shadow-lg` 
                    : 'bg-transparent'
                  }
                `}>
                  <Icon 
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-gray-500"
                    }`} 
                  />
                </div>
                
                {/* Label */}
                <span className={`text-xs font-medium relative z-10 transition-colors duration-300 ${
                  isActive ? "text-gray-800" : "text-gray-500"
                }`}>
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default BottomNav;
