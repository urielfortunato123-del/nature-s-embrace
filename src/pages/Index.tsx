import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import HomeScreen from "@/components/HomeScreen";
import MapScreen from "@/components/MapScreen";
import SpeciesScreen from "@/components/SpeciesScreen";
import CameraScreen from "@/components/CameraScreen";
import ReportsScreen from "@/components/ReportsScreen";
import LibraryScreen from "@/components/LibraryScreen";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen onNavigate={handleNavigate} />;
      case "map":
        return <MapScreen />;
      case "species":
        return <SpeciesScreen />;
      case "camera":
        return <CameraScreen />;
      case "reports":
        return <ReportsScreen />;
      case "library":
        return <LibraryScreen />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      
      {activeTab !== "home" && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}
      
      {activeTab === "home" && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 glass-nav safe-bottom z-50"
        >
          <div className="flex items-center justify-around px-2 py-3">
            <button
              onClick={() => setActiveTab("map")}
              className="flex-1 text-center py-2"
            >
              <span className="text-sm font-medium text-muted-foreground">Iniciar Exploração →</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
