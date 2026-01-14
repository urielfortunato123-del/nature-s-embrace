import { motion } from "framer-motion";
import { FileText, Plus, Download, Share2, Calendar, Sparkles, FolderOpen, ClipboardList, AlertTriangle, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import natureHeroBg from "@/assets/nature-hero-bg.png";

const reportTypes = [
  { id: "field", label: "Relatório de Campo", icon: ClipboardList, gradient: "from-emerald-400 to-green-500" },
  { id: "technical", label: "Laudo Técnico", icon: FileText, gradient: "from-violet-400 to-purple-500" },
  { id: "monitoring", label: "Monitoramento", icon: TreePine, gradient: "from-sky-400 to-blue-500" },
  { id: "rescue", label: "Resgate de Fauna", icon: AlertTriangle, gradient: "from-amber-400 to-orange-500" },
];

const ReportsScreen = () => {
  return (
    <div className="min-h-screen pb-28 relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src={natureHeroBg} 
          alt="" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-5 pt-6 pb-4"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                📋 Relatórios
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Crie e gerencie seus documentos</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg flex items-center justify-center"
            >
              <FolderOpen className="w-5 h-5 text-foreground" />
            </motion.button>
          </div>
        </motion.div>

        {/* New Report Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-5"
        >
          <h2 className="font-display font-bold text-lg text-foreground mb-4">Novo Relatório</h2>
          <div className="grid grid-cols-2 gap-4">
            {reportTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 text-left shadow-lg border border-white/40 hover:shadow-xl transition-all"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${type.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-foreground block">{type.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="px-5 mt-6"
        >
          <div className="flex gap-3">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl h-14 flex items-center justify-center gap-2 shadow-lg"
            >
              <Download className="w-5 h-5 text-violet-500" />
              <span className="font-semibold text-foreground">Exportar</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl h-14 flex items-center justify-center gap-2 shadow-lg"
            >
              <Share2 className="w-5 h-5 text-sky-500" />
              <span className="font-semibold text-foreground">Compartilhar</span>
            </motion.button>
          </div>
        </motion.div>

        {/* My Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="px-5 mt-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg text-foreground">Meus Relatórios</h2>
            <span className="text-sm text-muted-foreground bg-white/60 backdrop-blur px-3 py-1 rounded-full">0 documentos</span>
          </div>

          {/* Empty State */}
          <motion.div 
            className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40"
            whileHover={{ scale: 1.01 }}
          >
            <div className="text-center">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-24 h-24 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg"
              >
                <FileText className="w-12 h-12 text-white" />
              </motion.div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">Nenhum relatório</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                Crie seu primeiro relatório de campo para começar a documentar suas expedições
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-semibold rounded-2xl shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Criar Relatório
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="px-5 mt-6 mb-4"
        >
          <h2 className="font-display font-bold text-lg text-foreground mb-4">Modelos</h2>
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 overflow-hidden">
            <motion.div 
              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              className="flex items-center gap-4 p-4 border-b border-white/30 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400/20 to-purple-500/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-violet-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Relatório Padrão IBAMA</p>
                <p className="text-xs text-muted-foreground">Modelo oficial para fiscalização</p>
              </div>
              <Sparkles className="w-5 h-5 text-amber-500" />
            </motion.div>
            <motion.div 
              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              className="flex items-center gap-4 p-4 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400/20 to-green-500/20 flex items-center justify-center">
                <TreePine className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Laudo de Fauna</p>
                <p className="text-xs text-muted-foreground">Avaliação ambiental completa</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-28 right-5 w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white shadow-xl z-50"
      >
        <Plus className="w-7 h-7" />
      </motion.button>
    </div>
  );
};

export default ReportsScreen;
