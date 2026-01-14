import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import natureHeroBg from "@/assets/nature-hero-bg.png";

interface Mission {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

const priorityConfig = {
  low: { gradient: "from-emerald-400 to-green-500", shadow: "shadow-emerald-500/30", icon: "🌱" },
  medium: { gradient: "from-amber-400 to-orange-500", shadow: "shadow-amber-500/30", icon: "🔥" },
  high: { gradient: "from-rose-400 to-red-500", shadow: "shadow-rose-500/30", icon: "⚡" },
};

const quickMissions = [
  { id: "survey", label: "Levantamento", icon: "📋", gradient: "from-violet-400 to-purple-500", shadowColor: "shadow-violet-500/30" },
  { id: "monitoring", label: "Monitoramento", icon: "👁️", gradient: "from-sky-400 to-blue-500", shadowColor: "shadow-sky-500/30" },
  { id: "collection", label: "Coleta", icon: "🧪", gradient: "from-emerald-400 to-green-500", shadowColor: "shadow-emerald-500/30" },
  { id: "photo", label: "Fotografia", icon: "📷", gradient: "from-rose-400 to-pink-500", shadowColor: "shadow-rose-500/30" },
];

const MissionsScreen = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [newMission, setNewMission] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<"low" | "medium" | "high">("medium");

  const addMission = () => {
    if (!newMission.trim()) return;

    const mission: Mission = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: newMission.trim(),
      completed: false,
      priority: selectedPriority,
      createdAt: new Date(),
    };

    setMissions((prev) => [mission, ...prev]);
    setNewMission("");
  };

  const toggleMission = (id: string) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const deleteMission = (id: string) => {
    setMissions((prev) => prev.filter((m) => m.id !== id));
  };

  const completedCount = missions.filter((m) => m.completed).length;
  const pendingCount = missions.filter((m) => !m.completed).length;

  return (
    <div className="min-h-screen pb-28 relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img src={natureHeroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-5 pt-6 pb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                🎯 Missões
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Suas tarefas de campo</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-violet-400 to-purple-500 shadow-lg shadow-violet-500/30"
            >
              <span className="text-sm font-bold text-white">{pendingCount} pendentes</span>
            </motion.div>
          </div>

          {/* Add Mission */}
          <div className="flex gap-2">
            <Input
              placeholder="Nova missão..."
              value={newMission}
              onChange={(e) => setNewMission(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addMission()}
              className="flex-1 h-14 bg-white/90 dark:bg-card/90 backdrop-blur-md border-0 rounded-full shadow-lg text-base px-5"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addMission}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/30 flex items-center justify-center"
            >
              <Plus className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          {/* Priority Selector */}
          <div className="flex gap-2 mt-3">
            {(["low", "medium", "high"] as const).map((priority) => (
              <motion.button
                key={priority}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPriority(priority)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedPriority === priority
                    ? `bg-gradient-to-r ${priorityConfig[priority].gradient} text-white shadow-lg ${priorityConfig[priority].shadow}`
                    : "bg-white/70 dark:bg-card/70 text-foreground"
                }`}
              >
                {priorityConfig[priority].icon} {priority === "low" ? "Baixa" : priority === "medium" ? "Média" : "Alta"}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Quick Missions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-5 mb-6"
        >
          <h2 className="font-display font-bold text-lg text-foreground mb-3">Missões Rápidas</h2>
          <div className="grid grid-cols-4 gap-2">
            {quickMissions.map((mission, index) => (
              <motion.button
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNewMission(mission.label)}
                className={`relative overflow-hidden rounded-2xl p-3 bg-gradient-to-br ${mission.gradient} shadow-lg ${mission.shadowColor}`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                <div className="relative z-10 text-2xl mb-1 text-center">{mission.icon}</div>
                <p className="relative z-10 text-white font-semibold text-[10px] text-center truncate">{mission.label}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-5 mb-6"
        >
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
              <div className="relative z-10 flex items-center gap-3">
                <div className="text-3xl">⏳</div>
                <div>
                  <p className="text-2xl font-bold text-white">{pendingCount}</p>
                  <p className="text-xs text-white/80">Pendentes</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
              <div className="relative z-10 flex items-center gap-3">
                <div className="text-3xl">✅</div>
                <div>
                  <p className="text-2xl font-bold text-white">{completedCount}</p>
                  <p className="text-xs text-white/80">Concluídas</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Missions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-5"
        >
          <h2 className="font-display font-bold text-lg text-foreground mb-3">Minhas Missões</h2>

          {missions.length === 0 ? (
            <motion.div className="bg-white/70 dark:bg-card/70 backdrop-blur-xl rounded-3xl p-8 text-center shadow-xl border border-white/40 dark:border-border/40">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-24 h-24 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/30"
              >
                <span className="text-5xl">🎯</span>
              </motion.div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">Nenhuma missão</h3>
              <p className="text-sm text-muted-foreground">Adicione sua primeira missão de campo!</p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {missions.map((mission, index) => (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white/70 dark:bg-card/70 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/40 dark:border-border/40 ${
                    mission.completed ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleMission(mission.id)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        mission.completed
                          ? "bg-gradient-to-br from-emerald-400 to-green-500"
                          : `bg-gradient-to-br ${priorityConfig[mission.priority].gradient}`
                      } shadow-lg`}
                    >
                      {mission.completed ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-lg">{priorityConfig[mission.priority].icon}</span>
                      )}
                    </motion.button>
                    <div className="flex-1">
                      <p className={`font-semibold text-foreground ${mission.completed ? "line-through" : ""}`}>
                        {mission.text}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {mission.createdAt.toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteMission(mission.id)}
                      className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4 text-rose-500" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MissionsScreen;
