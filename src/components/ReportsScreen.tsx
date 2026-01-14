import { motion } from "framer-motion";
import { FileText, Plus, Download, Share2, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const reportTypes = [
  { id: "field", label: "Relatório de Campo", color: "bg-nature" },
  { id: "technical", label: "Laudo Técnico", color: "bg-primary" },
  { id: "monitoring", label: "Monitoramento", color: "bg-sky" },
  { id: "rescue", label: "Resgate de Fauna", color: "bg-sun" },
];

const ReportsScreen = () => {
  return (
    <div className="min-h-screen pb-24 safe-top">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 glass-nav px-4 py-4"
      >
        <h1 className="text-xl font-display font-bold text-foreground">Relatórios</h1>
        <p className="text-sm text-muted-foreground">Crie e gerencie seus documentos</p>
      </motion.div>

      {/* Report Types */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="px-4 mt-4"
      >
        <h2 className="font-display font-bold text-foreground mb-3">Novo Relatório</h2>
        <div className="grid grid-cols-2 gap-3">
          {reportTypes.map((type, index) => (
            <motion.button
              key={type.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card rounded-2xl p-4 text-left hover:shadow-nature transition-all"
            >
              <div className={`w-10 h-10 ${type.color} rounded-xl flex items-center justify-center mb-3`}>
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">{type.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-4 mt-6"
      >
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 glass-card border-white/30 rounded-2xl h-12"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 glass-card border-white/30 rounded-2xl h-12"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
        </div>
      </motion.div>

      {/* My Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-4 mt-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-foreground">Meus Relatórios</h2>
          <span className="text-sm text-muted-foreground">0 documentos</span>
        </div>

        {/* Empty State */}
        <div className="glass-card rounded-3xl p-8">
          <div className="text-center">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center"
            >
              <FileText className="w-10 h-10 text-secondary" />
            </motion.div>
            <h3 className="font-bold text-foreground mb-2">Nenhum relatório</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Crie seu primeiro relatório de campo
            </p>
            <Button className="btn-nature">
              <Plus className="w-4 h-4 mr-2" />
              Criar Relatório
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="px-4 mt-6"
      >
        <h2 className="font-display font-bold text-foreground mb-3">Modelos</h2>
        <div className="glass-card rounded-3xl p-4 space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">Relatório Padrão IBAMA</p>
              <p className="text-xs text-muted-foreground">Modelo oficial</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-nature/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-nature" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">Laudo de Fauna</p>
              <p className="text-xs text-muted-foreground">Avaliação ambiental</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        className="floating-action"
        whileTap={{ scale: 0.9 }}
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default ReportsScreen;
