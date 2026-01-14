import { motion } from "framer-motion";
import { Camera, Image, ScanLine, Zap, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const CameraScreen = () => {
  return (
    <div className="min-h-screen pb-24 safe-top">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 glass-nav px-4 py-4"
      >
        <h1 className="text-xl font-display font-bold text-foreground">Câmera</h1>
        <p className="text-sm text-muted-foreground">Registre e identifique espécies</p>
      </motion.div>

      {/* Camera Viewfinder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-4 mt-4"
      >
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-foreground/5 to-foreground/10">
          {/* Placeholder Camera View */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-dashed border-primary/30 flex items-center justify-center"
              >
                <Camera className="w-12 h-12 text-primary/50" />
              </motion.div>
              <p className="text-muted-foreground font-medium">Toque para capturar</p>
            </div>
          </div>

          {/* Scan Overlay */}
          <div className="absolute inset-8 border-2 border-white/30 rounded-2xl" />
          <div className="absolute top-8 left-8 w-8 h-8 border-l-4 border-t-4 border-primary rounded-tl-lg" />
          <div className="absolute top-8 right-8 w-8 h-8 border-r-4 border-t-4 border-primary rounded-tr-lg" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-l-4 border-b-4 border-primary rounded-bl-lg" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-r-4 border-b-4 border-primary rounded-br-lg" />
        </div>
      </motion.div>

      {/* Camera Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-4 mt-6"
      >
        <div className="flex items-center justify-center gap-8">
          <Button 
            size="icon" 
            variant="outline"
            className="w-14 h-14 rounded-full glass-card border-white/30"
          >
            <Image className="w-6 h-6" />
          </Button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-20 h-20 rounded-full gradient-sunset flex items-center justify-center shadow-glow"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </motion.button>

          <Button 
            size="icon" 
            variant="outline"
            className="w-14 h-14 rounded-full glass-card border-white/30"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>
        </div>
      </motion.div>

      {/* Modes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-4 mt-8"
      >
        <div className="flex justify-center gap-4">
          <Button 
            variant="ghost" 
            className="flex-col h-auto py-3 px-6 rounded-2xl bg-primary/10"
          >
            <Camera className="w-5 h-5 text-primary mb-1" />
            <span className="text-xs font-medium">Foto</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex-col h-auto py-3 px-6 rounded-2xl"
          >
            <ScanLine className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">OCR</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex-col h-auto py-3 px-6 rounded-2xl"
          >
            <Zap className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">IA</span>
          </Button>
        </div>
      </motion.div>

      {/* Recent Captures */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-4 mt-8"
      >
        <h2 className="font-display font-bold text-foreground mb-3">Capturas Recentes</h2>
        <div className="glass-card rounded-3xl p-4">
          <div className="flex items-center justify-center py-6 text-muted-foreground">
            <div className="text-center">
              <Image className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Nenhuma captura ainda</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CameraScreen;
