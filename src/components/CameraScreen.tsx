import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Flashlight, FlashlightOff, Grid3X3, X, Check, Download, Loader2, Search, Copy, MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSightings } from "@/contexts/SightingsContext";

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
  const { addSighting, getCurrentLocation } = useSightings();
  const [activeMode, setActiveMode] = useState<'photo' | 'ocr' | 'ai'>('photo');
  const [flashOn, setFlashOn] = useState(false);
  const [gridOn, setGridOn] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isSavingToMap, setIsSavingToMap] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const currentMode = modes.find(m => m.id === activeMode)!;

  const startCamera = useCallback(async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: activeMode === 'photo' ? false : true,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
      
      setCameraActive(true);

      if (flashOn) {
        const track = mediaStream.getVideoTracks()[0];
        const capabilities = track.getCapabilities?.();
        if (capabilities && 'torch' in capabilities) {
          await track.applyConstraints({ advanced: [{ torch: true } as any] });
        }
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Não foi possível acessar a câmera. Verifique as permissões.');
    }
  }, [facingMode, flashOn, stream, activeMode]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  }, [stream]);

  const toggleFlash = async () => {
    const newFlashState = !flashOn;
    setFlashOn(newFlashState);
    
    if (stream) {
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities?.();
      if (capabilities && 'torch' in capabilities) {
        try {
          await track.applyConstraints({ advanced: [{ torch: newFlashState } as any] });
        } catch (error) {
          console.error('Flash not supported:', error);
          toast.error('Flash não suportado neste dispositivo');
        }
      }
    }
  };

  const flipCamera = useCallback(() => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  }, []);

  useEffect(() => {
    if (cameraActive) {
      startCamera();
    }
  }, [facingMode]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const analyzeImage = async (imageData: string, mode: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-image', {
        body: { image: imageData, mode }
      });

      if (error) throw error;

      setAnalysisResult(data.result);
      setShowResult(true);
      toast.success(mode === 'ocr' ? 'Texto extraído!' : 'Espécie identificada!');
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Erro ao analisar imagem. Tente novamente.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(imageData);
      stopCamera();
      
      if (activeMode === 'ocr' || activeMode === 'ai') {
        analyzeImage(imageData, activeMode);
      } else {
        toast.success('Foto capturada!');
      }
    }
  }, [facingMode, stopCamera, activeMode]);

  const startRecording = useCallback(() => {
    if (!stream) return;

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `bionatura-video-${new Date().toISOString().split('T')[0]}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Vídeo salvo!');
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
    toast.info('Gravando...');
  }, [stream]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const handleCapture = useCallback(() => {
    if (activeMode === 'photo' || activeMode === 'ocr' || activeMode === 'ai') {
      capturePhoto();
    }
  }, [activeMode, capturePhoto]);

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'gallery':
        fileInputRef.current?.click();
        break;
      case 'scan':
        setActiveMode('ocr');
        if (!cameraActive && !capturedImage) startCamera();
        toast.info('Modo OCR ativado. Capture uma imagem com texto.');
        break;
      case 'identify':
        setActiveMode('ai');
        if (!cameraActive && !capturedImage) startCamera();
        toast.info('Modo IA ativado. Capture uma espécie para identificar.');
        break;
      case 'record':
        if (!cameraActive) {
          startCamera();
        } else if (isRecording) {
          stopRecording();
        } else {
          startRecording();
        }
        break;
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setCapturedImage(imageData);
        stopCamera();
        
        if (activeMode === 'ocr' || activeMode === 'ai') {
          analyzeImage(imageData, activeMode);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const discardImage = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    setShowResult(false);
    startCamera();
  };

  const saveImage = () => {
    if (!capturedImage) return;
    
    const a = document.createElement('a');
    a.href = capturedImage;
    a.download = `bionatura-${activeMode}-${new Date().toISOString().split('T')[0]}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('Imagem salva!');
  };

  const copyResult = () => {
    if (analysisResult) {
      navigator.clipboard.writeText(analysisResult);
      toast.success('Texto copiado!');
    }
  };

  const reanalyze = () => {
    if (capturedImage) {
      analyzeImage(capturedImage, activeMode);
    }
  };

  // Extract species name from AI analysis result
  const extractSpeciesName = (result: string): string => {
    // Try to extract the first line or main identification
    const lines = result.split('\n').filter(l => l.trim());
    if (lines.length > 0) {
      // Remove common prefixes and get the species name
      let species = lines[0]
        .replace(/^(espécie:|identificação:|nome:|species:|name:)/i, '')
        .replace(/^\*+|\*+$/g, '')
        .trim();
      // Limit to reasonable length
      if (species.length > 50) {
        species = species.substring(0, 50) + '...';
      }
      return species || 'Espécie não identificada';
    }
    return 'Espécie não identificada';
  };

  const saveToMap = async () => {
    if (!analysisResult || !capturedImage) return;

    setIsSavingToMap(true);
    try {
      const location = await getCurrentLocation();
      
      if (!location) {
        setIsSavingToMap(false);
        return;
      }

      const speciesName = extractSpeciesName(analysisResult);
      
      addSighting({
        lat: location.lat,
        lng: location.lng,
        species: speciesName,
        observations: analysisResult,
        photo: capturedImage,
        source: 'camera',
      });

      setShowResult(false);
      setCapturedImage(null);
      setAnalysisResult(null);
      startCamera();
    } catch (error) {
      console.error('Error saving to map:', error);
      toast.error('Erro ao salvar no mapa');
    } finally {
      setIsSavingToMap(false);
    }
  };

  return (
    <div className="min-h-screen pb-28 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileSelect}
      />
      
      <canvas ref={canvasRef} className="hidden" />

      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-5 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />

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
              onClick={toggleFlash}
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

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-5 mt-2"
      >
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border border-white/10">
          {cameraActive && !capturedImage && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`absolute inset-0 w-full h-full object-cover ${
                facingMode === 'user' ? 'scale-x-[-1]' : ''
              }`}
            />
          )}

          {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {!cameraActive && !capturedImage && (
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startCamera}
                  className="px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full text-white font-semibold shadow-lg"
                >
                  Iniciar Câmera
                </motion.button>
              </div>
            </div>
          )}

          {isRecording && (
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-red-500 rounded-full"
            >
              <div className="w-3 h-3 bg-white rounded-full" />
              <span className="text-white text-sm font-medium">REC</span>
            </motion.div>
          )}

          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center"
            >
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-3" />
                <p className="text-white font-medium">
                  {activeMode === 'ocr' ? 'Extraindo texto...' : 'Identificando espécie...'}
                </p>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {gridOn && cameraActive && (
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

          {cameraActive && !capturedImage && (
            <div className="absolute inset-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-10 h-10 border-l-4 border-t-4 border-white rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-10 h-10 border-r-4 border-t-4 border-white rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-l-4 border-b-4 border-white rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-r-4 border-b-4 border-white rounded-br-xl" />
            </div>
          )}

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

          {capturedImage && !isAnalyzing && !showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={discardImage}
                className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg"
              >
                <X className="w-7 h-7 text-white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={saveImage}
                className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg"
              >
                <Download className="w-7 h-7 text-white" />
              </motion.button>
              {(activeMode === 'ocr' || activeMode === 'ai') && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => analyzeImage(capturedImage, activeMode)}
                  className="w-14 h-14 rounded-full bg-purple-500 flex items-center justify-center shadow-lg"
                >
                  <Search className="w-7 h-7 text-white" />
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Analysis Result Modal */}
      <AnimatePresence>
        {showResult && analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-t from-gray-900 via-gray-900 to-gray-900/95 rounded-t-3xl max-h-[70vh] overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {activeMode === 'ocr' ? '📝 Texto Extraído' : '🔍 Identificação'}
                </h3>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyResult}
                    className="p-2 bg-white/10 rounded-xl"
                  >
                    <Copy className="w-5 h-5 text-white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={reanalyze}
                    className="p-2 bg-white/10 rounded-xl"
                  >
                    <Search className="w-5 h-5 text-white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowResult(false)}
                    className="p-2 bg-white/10 rounded-xl"
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>
              <div className="overflow-y-auto max-h-[50vh] pr-2">
                <p className="text-white/90 whitespace-pre-wrap leading-relaxed">
                  {analysisResult}
                </p>
              </div>
              <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={discardImage}
                  className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl text-white font-semibold"
                >
                  Nova Foto
                </motion.button>
                {activeMode === 'ai' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={saveToMap}
                    disabled={isSavingToMap}
                    className="flex-1 py-3 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSavingToMap ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <MapPin className="w-5 h-5" />
                        Salvar no Mapa
                      </>
                    )}
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowResult(false);
                    toast.success('Resultado salvo!');
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white font-semibold"
                >
                  Concluir
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Camera Controls */}
      {!showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-5 mt-8"
        >
          <div className="flex items-center justify-center gap-10">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => fileInputRef.current?.click()}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30 flex items-center justify-center"
            >
              <span className="text-2xl">🖼️</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={cameraActive ? handleCapture : startCamera}
              disabled={!!capturedImage || isAnalyzing}
              className={`w-24 h-24 rounded-full bg-gradient-to-br ${currentMode.gradient} flex items-center justify-center shadow-2xl ${currentMode.shadowColor} ${capturedImage || isAnalyzing ? 'opacity-50' : ''}`}
            >
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border-4 border-white/40">
                <span className="text-3xl">{currentMode.icon}</span>
              </div>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                flipCamera();
                if (cameraActive) startCamera();
              }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-purple-500 shadow-lg shadow-fuchsia-500/30 flex items-center justify-center"
            >
              <RotateCcw className="w-7 h-7 text-white" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Mode Selector */}
      {!showResult && (
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
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                  <div className="relative z-10 text-3xl mb-1 drop-shadow-md text-center">
                    {mode.icon}
                  </div>
                  <p className="relative z-10 text-white font-semibold text-sm drop-shadow-md text-center">
                    {mode.label}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      {!showResult && (
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
                onClick={() => handleQuickAction(action.id)}
                className={`
                  relative overflow-hidden rounded-2xl p-3
                  bg-gradient-to-br ${action.gradient}
                  shadow-lg ${action.shadowColor}
                  transition-all duration-300
                  ${action.id === 'record' && isRecording ? 'ring-4 ring-red-400 animate-pulse' : ''}
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                <div className="relative z-10 text-2xl mb-1 drop-shadow-md text-center">
                  {action.icon}
                </div>
                <p className="relative z-10 text-white font-semibold text-xs drop-shadow-md text-center">
                  {action.id === 'record' && isRecording ? 'Parar' : action.label}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CameraScreen;
