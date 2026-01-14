import { motion } from "framer-motion";
import { Plus, Download, Share2, FolderOpen, FileText } from "lucide-react";
import natureHeroBg from "@/assets/nature-hero-bg.png";

const reportTypes = [
  { id: "field", label: "Relatório de Campo", icon: "📋", gradient: "from-emerald-400 to-green-500", shadowColor: "shadow-emerald-500/30" },
  { id: "technical", label: "Laudo Técnico", icon: "📄", gradient: "from-violet-400 to-purple-500", shadowColor: "shadow-violet-500/30" },
  { id: "monitoring", label: "Monitoramento", icon: "🌲", gradient: "from-sky-400 to-blue-500", shadowColor: "shadow-sky-500/30" },
  { id: "rescue", label: "Resgate de Fauna", icon: "🦎", gradient: "from-amber-400 to-orange-500", shadowColor: "shadow-amber-500/30" },
];

const quickActions = [
  { id: "export", label: "Exportar", icon: "📥", gradient: "from-violet-400 to-purple-500", shadowColor: "shadow-violet-500/30" },
  { id: "share", label: "Compartilhar", icon: "📤", gradient: "from-sky-400 to-blue-500", shadowColor: "shadow-sky-500/30" },
];

const templates = [
  { id: "ibama", label: "Relatório Padrão IBAMA", subtitle: "Modelo oficial para fiscalização", icon: "📋", gradient: "from-violet-400 to-purple-500" },
  { id: "fauna", label: "Laudo de Fauna", subtitle: "Avaliação ambiental completa", icon: "🌿", gradient: "from-emerald-400 to-green-500" },
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
              className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30 flex items-center justify-center"
            >
              <FolderOpen className="w-5 h-5 text-white" />
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
          <div className="grid grid-cols-2 gap-3">
            {reportTypes.map((type, index) => (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.08 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative overflow-hidden rounded-2xl p-4
                  bg-gradient-to-br ${type.gradient}
                  shadow-lg ${type.shadowColor}
                  transition-all duration-300 text-left
                `}
              >
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                
                {/* Icon */}
                <div className="relative z-10 text-4xl mb-2 drop-shadow-md">
                  {type.icon}
                </div>
                
                {/* Label */}
                <p className="relative z-10 text-white font-semibold text-sm drop-shadow-md">
                  {type.label}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="px-5 mt-6"
        >
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <motion.button 
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.08 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative overflow-hidden rounded-2xl p-4
                  bg-gradient-to-br ${action.gradient}
                  shadow-lg ${action.shadowColor}
                  transition-all duration-300
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <span className="text-2xl">{action.icon}</span>
                  <span className="font-semibold text-white">{action.label}</span>
                </div>
              </motion.button>
            ))}
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
                className="w-24 h-24 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/30"
              >
                <span className="text-5xl">📄</span>
              </motion.div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">Nenhum relatório</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                Crie seu primeiro relatório de campo para começar a documentar suas expedições
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/30"
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
          <div className="space-y-3">
            {templates.map((template, index) => (
              <motion.button
                key={template.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.08 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full relative overflow-hidden rounded-2xl p-4
                  bg-gradient-to-r ${template.gradient}
                  shadow-lg transition-all duration-300 text-left
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="text-3xl">{template.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{template.label}</p>
                    <p className="text-xs text-white/80">{template.subtitle}</p>
                  </div>
                  <span className="text-xl">✨</span>
                </div>
              </motion.button>
            ))}
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
        className="fixed bottom-28 right-5 w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white shadow-xl shadow-violet-500/30 z-50"
      >
        <Plus className="w-7 h-7" />
      </motion.button>
    </div>
  );
};

export default ReportsScreen;
