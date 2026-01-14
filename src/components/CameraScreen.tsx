import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Image, ScanLine, Zap, RotateCcw, Flashlight, FlashlightOff, Grid3X3 } from "lucide-react";

const modes = [
  { id: 'photo', label: 'Foto', icon: '📷', gradient: 'from-rose-400 to-pink-500', shadowColor: 'shadow-rose-500/30' },
  { id: 'ocr', label: 'OCR', icon: '📝', gradient: 'from-violet-400 to-purple-500', shadowColor: 'shadow-violet-500/30' },
  { id: 'ai', label: 'IA', icon: '🤖', gradient: 'from-amber-400 to-orange-500', shadowColor: 'shadow-amber-500/30' },
];

const quickActions = [
  { id: 'gallery', label: 'Galeria', icon: '🖼️', gradient: 'from-cyan-400 to-blue-500', shadowColor: 'shadow-cyan-500/30' },
  { id: 'scan', label: 'Escanear', icon: '📄', gradient: 'from-emerald-400 to-green-500', shadowColor: 'shadow-emerald-500/30' },
  { id: 'identify', label: 'Identificar', icon: '🔍', gradient: 'from-fuchsia-400 to-purple-500', shadowColor: 'shadow-fuchsia-500/30' },
  { id: 'record', label: 'Gravar', icon: '🎥', gradient: 'from-red-400 to-rose-500', shadowColor: 'shadow-red-500/30' },
];

const CameraScreen = () => {
  const [activeMode, setActiveMode] = useState<'photo' | 'ocr' | 'ai'>('photo');
  const [flashOn, setFlashOn] = useState(false);
  const [gridOn, setGridOn] = useState(false);

  const currentMode = modes.find(m => m.id === activeMode)!;

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
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                flashOn 
                  ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30' 
                  : 'bg-white/10'
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
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                gridOn 
                  ? 'bg-gradient-to-br from-violet-400 to-purple-500 shadow-lg shadow-violet-500/30' 
                  : 'bg-white/10'
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
                <span className="text-5xl">{currentMode.icon}</span>
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
            <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${currentMode.gradient} shadow-lg ${currentMode.shadowColor}`}>
              <span className="text-sm font-semibold text-white">
                {currentMode.label}
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
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30 flex items-center justify-center"
          >
            <span className="text-2xl">🖼️</span>
          </motion.button>

          {/* Capture Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className={`w-24 h-24 rounded-full bg-gradient-to-br ${currentMode.gradient} flex items-center justify-center shadow-2xl ${currentMode.shadowColor}`}
          >
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border-4 border-white/40">
              <span className="text-3xl">{currentMode.icon}</span>
            </div>
          </motion.button>

          {/* Flip Camera */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-purple-500 shadow-lg shadow-fuchsia-500/30 flex items-center justify-center"
          >
            <RotateCcw className="w-7 h-7 text-white" />
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
        <div className="grid grid-cols-3 gap-3">
          {modes.map((mode, index) => {
            const isActive = activeMode === mode.id;
            return (
              <motion.button
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.08 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveMode(mode.id as typeof activeMode)}
                className={`
                  relative overflow-hidden rounded-2xl p-4
                  bg-gradient-to-br ${mode.gradient}
                  shadow-lg ${mode.shadowColor}
                  transition-all duration-300
                  ${isActive ? 'ring-4 ring-white/60' : 'opacity-70'}
                `}
              >
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                
                {/* Icon */}
                <div className="relative z-10 text-3xl mb-1 drop-shadow-md text-center">
                  {mode.icon}
                </div>
                
                {/* Label */}
                <p className="relative z-10 text-white font-semibold text-sm drop-shadow-md text-center">
                  {mode.label}
                </p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-5 mt-8"
      >
        <h2 className="font-display font-bold text-white mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative overflow-hidden rounded-2xl p-3
                bg-gradient-to-br ${action.gradient}
                shadow-lg ${action.shadowColor}
                transition-all duration-300
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
              <div className="relative z-10 text-2xl mb-1 drop-shadow-md text-center">
                {action.icon}
              </div>
              <p className="relative z-10 text-white font-semibold text-xs drop-shadow-md text-center">
                {action.label}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CameraScreen;
