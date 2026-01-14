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
      case "navigate":
        return <MapScreen />;
      case "species":
        return <SpeciesScreen />;
      case "camera":
        return <CameraScreen />;
      case "reports":
        return <ReportsScreen />;
      case "library":
        return <LibraryScreen />;
      case "missions":
        return <ReportsScreen />; // Placeholder - will show reports as missions
      case "notes":
        return <ReportsScreen />; // Placeholder - will show notes
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
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
