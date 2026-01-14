import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themes = [
    { id: "light" as const, icon: Sun, label: "Claro" },
    { id: "dark" as const, icon: Moon, label: "Escuro" },
    { id: "system" as const, icon: Monitor, label: "Sistema" },
  ];

  return (
    <div className="flex gap-1 p-1 bg-muted/50 rounded-2xl">
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.id;
        
        return (
          <motion.button
            key={t.id}
            onClick={() => setTheme(t.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-xl transition-all ${
              isActive
                ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title={t.label}
          >
            <Icon className="w-4 h-4" />
          </motion.button>
        );
      })}
    </div>
  );
};
