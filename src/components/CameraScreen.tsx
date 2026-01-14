import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Image, ScanLine, Zap, RotateCcw, Sparkles, X, FlashlightOff, Flashlight, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const CameraScreen = () => {
  const [activeMode, setActiveMode] = useState<'photo' | 'ocr' | 'ai'>('photo');
  const [flashOn, setFlashOn] = useState(false);
  const [gridOn, setGridOn] = useState(false);

  const modes = [
    { id: 'photo', label: 'Foto', icon: Camera, gradient: 'from-rose-400 to-pink-500' },
    { id: 'ocr', label: 'OCR', icon: ScanLine, gradient: 'from-violet-400 to-purple-500' },
    { id: 'ai', label: 'IA', icon: Zap, gradient: 'from-amber-400 to-orange-500' },
  ];

  return (
    <div className="min-h-screen pb-28 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-5 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-5 pt-6 pb-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
              📸 Câmera
            </h1>
            <p className="text-sm text-white/60 mt-1">Registre e identifique espécies</p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFlashOn(!flashOn)}
              className={`w-11 h-11 rounded-2xl backdrop-blur-xl flex items-center justify-center transition-all ${
                flashOn ? 'bg-amber-500 shadow-lg shadow-amber-500/30' : 'bg-white/10'
              }`}
            >
              {flashOn ? (
                <Flashlight className="w-5 h-5 text-white" />
              ) : (
                <FlashlightOff className="w-5 h-5 text-white/70" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGridOn(!gridOn)}
              className={`w-11 h-11 rounded-2xl backdrop-blur-xl flex items-center justify-center transition-all ${
                gridOn ? 'bg-white/30' : 'bg-white/10'
              }`}
            >
              <Grid3X3 className="w-5 h-5 text-white/70" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Camera Viewfinder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-5 mt-2"
      >
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border border-white/10">
          {/* Simulated Camera View */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="w-28 h-28 mx-auto mb-4 rounded-full border-4 border-dashed border-white/30 flex items-center justify-center"
              >
                <Camera className="w-14 h-14 text-white/40" />
              </motion.div>
              <p className="text-white/50 font-medium">Toque para capturar</p>
            </div>
          </div>

          {/* Grid Overlay */}
          <AnimatePresence>
            {gridOn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="border border-white/20" />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Focus Frame */}
          <div className="absolute inset-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-10 h-10 border-l-4 border-t-4 border-white rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-10 h-10 border-r-4 border-t-4 border-white rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-l-4 border-b-4 border-white rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-r-4 border-b-4 border-white rounded-br-xl" />
          </div>

          {/* Mode Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-1/2 -translate-x-1/2"
          >
            <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${modes.find(m => m.id === activeMode)?.gradient} shadow-lg`}>
              <span className="text-sm font-semibold text-white">
                {modes.find(m => m.id === activeMode)?.label}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Camera Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-5 mt-8"
      >
        <div className="flex items-center justify-center gap-10">
          {/* Gallery Button */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center"
          >
            <Image className="w-7 h-7 text-white/80" />
          </motion.button>

          {/* Capture Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className={`w-24 h-24 rounded-full bg-gradient-to-br ${modes.find(m => m.id === activeMode)?.gradient} flex items-center justify-center shadow-2xl`}
          >
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border-4 border-white/40">
              <Camera className="w-9 h-9 text-white" />
            </div>
          </motion.button>

          {/* Flip Camera */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center"
          >
            <RotateCcw className="w-7 h-7 text-white/80" />
          </motion.button>
        </div>
      </motion.div>

      {/* Mode Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-5 mt-8"
      >
        <div className="flex justify-center gap-3">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;
            return (
              <motion.button
                key={mode.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveMode(mode.id as typeof activeMode)}
                className={`relative flex flex-col items-center py-3 px-6 rounded-2xl transition-all ${
                  isActive ? '' : 'bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCameraMode"
                    className={`absolute inset-0 bg-gradient-to-r ${mode.gradient} rounded-2xl`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className={`w-6 h-6 mb-1 relative z-10 ${isActive ? 'text-white' : 'text-white/50'}`} />
                <span className={`text-xs font-semibold relative z-10 ${isActive ? 'text-white' : 'text-white/50'}`}>
                  {mode.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Captures */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-5 mt-8"
      >
        <h2 className="font-display font-bold text-white mb-4">Capturas Recentes</h2>
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-center py-4">
            <div className="text-center">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Image className="w-10 h-10 mx-auto mb-3 text-white/30" />
              </motion.div>
              <p className="text-sm text-white/50">Nenhuma captura ainda</p>
              <p className="text-xs text-white/30 mt-1">Suas fotos aparecerão aqui</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CameraScreen;
