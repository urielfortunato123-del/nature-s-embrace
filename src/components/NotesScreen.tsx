import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Calendar, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNotes } from "@/hooks/useNotes";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import natureHeroBg from "@/assets/nature-hero-bg.png";

const categories = [
  { id: "observation", label: "Observação", icon: "👁️", gradient: "from-sky-400 to-blue-500" },
  { id: "species", label: "Espécie", icon: "🦜", gradient: "from-amber-400 to-orange-500" },
  { id: "location", label: "Local", icon: "📍", gradient: "from-emerald-400 to-green-500" },
  { id: "idea", label: "Ideia", icon: "💡", gradient: "from-violet-400 to-purple-500" },
];

const noteColors = [
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-green-500",
  "from-sky-400 to-blue-500",
  "from-violet-400 to-purple-500",
  "from-fuchsia-400 to-pink-500",
];

const NotesScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { notes, loading, addNote, updateNote, deleteNote } = useNotes();
  const [showForm, setShowForm] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "observation",
    location: "",
  });

  const handleAddNote = async () => {
    if (!formData.title.trim() && !formData.content.trim()) return;
    if (!user) {
      navigate("/auth");
      return;
    }

    setSaving(true);
    await addNote({
      title: formData.title.trim() || "Nota rápida",
      content: formData.content.trim(),
      category: formData.category,
      location: formData.location.trim() || undefined,
    });
    resetForm();
    setSaving(false);
  };

  const handleUpdateNote = async () => {
    if (!editingNoteId) return;

    setSaving(true);
    await updateNote(editingNoteId, {
      title: formData.title,
      content: formData.content,
      category: formData.category,
      location: formData.location || undefined,
    });
    resetForm();
    setSaving(false);
  };

  const openEdit = (note: { id: string; title: string; content: string | null; category: string; location: string | null }) => {
    setEditingNoteId(note.id);
    setFormData({
      title: note.title,
      content: note.content || "",
      category: note.category,
      location: note.location || "",
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingNoteId(null);
    setFormData({ title: "", content: "", category: "observation", location: "" });
  };

  const getNoteColor = (index: number) => noteColors[index % noteColors.length];

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
                📝 Notas
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Anotações de campo</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30"
            >
              <span className="text-sm font-bold text-white">{notes.length} notas</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-5 mb-6"
        >
          <div className="grid grid-cols-4 gap-2">
            {categories.map((cat, index) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (!user) {
                    navigate("/auth");
                    return;
                  }
                  setFormData((prev) => ({ ...prev, category: cat.id }));
                  setShowForm(true);
                }}
                className={`relative overflow-hidden rounded-2xl p-3 bg-gradient-to-br ${cat.gradient} shadow-lg`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                <div className="relative z-10 text-2xl mb-1 text-center">{cat.icon}</div>
                <p className="relative z-10 text-white font-semibold text-[10px] text-center truncate">{cat.label}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Notes Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-5"
        >
          <h2 className="font-display font-bold text-lg text-foreground mb-3">Minhas Notas</h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : !user ? (
            <motion.div className="bg-white/70 dark:bg-card/70 backdrop-blur-xl rounded-3xl p-8 text-center shadow-xl border border-white/40 dark:border-border/40">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-24 h-24 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30"
              >
                <span className="text-5xl">🔐</span>
              </motion.div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">Faça login</h3>
              <p className="text-sm text-muted-foreground mb-6">Entre para salvar suas notas na nuvem</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/auth")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/30"
              >
                Entrar
              </motion.button>
            </motion.div>
          ) : notes.length === 0 ? (
            <motion.div className="bg-white/70 dark:bg-card/70 backdrop-blur-xl rounded-3xl p-8 text-center shadow-xl border border-white/40 dark:border-border/40">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-24 h-24 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30"
              >
                <span className="text-5xl">📝</span>
              </motion.div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">Nenhuma nota</h3>
              <p className="text-sm text-muted-foreground mb-6">Comece a registrar suas observações!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/30"
              >
                <Plus className="w-5 h-5" />
                Nova Nota
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {notes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className={`relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br ${getNoteColor(index)} shadow-lg min-h-[140px] cursor-pointer`}
                  onClick={() => openEdit(note)}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-lg">{categories.find((c) => c.id === note.category)?.icon}</span>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNote(note.id);
                        }}
                        className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center"
                      >
                        <X className="w-3 h-3 text-white" />
                      </motion.button>
                    </div>
                    <h3 className="font-bold text-white text-sm mb-1 line-clamp-1">{note.title}</h3>
                    <p className="text-white/80 text-xs line-clamp-3">{note.content}</p>
                    <div className="flex items-center gap-1 mt-2 text-white/60 text-[10px]">
                      <Calendar className="w-3 h-3" />
                      {new Date(note.created_at).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Add/Edit Note Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-end justify-center"
            onClick={resetForm}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white/95 dark:bg-card/95 backdrop-blur-xl rounded-t-3xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
                  {editingNoteId ? "✏️ Editar Nota" : "📝 Nova Nota"}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={resetForm}
                  className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Category Selector */}
              <div className="flex gap-2 mb-4">
                {categories.map((cat) => (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData((prev) => ({ ...prev, category: cat.id }))}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                      formData.category === cat.id
                        ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg`
                        : "bg-muted/50 text-foreground"
                    }`}
                  >
                    {cat.icon}
                  </motion.button>
                ))}
              </div>

              <div className="space-y-4">
                <Input
                  placeholder="Título da nota..."
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="bg-white/80 dark:bg-muted/50 border-white/40 dark:border-border/40 rounded-xl h-12"
                />

                <Textarea
                  placeholder="Escreva suas observações..."
                  value={formData.content}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  className="bg-white/80 dark:bg-muted/50 border-white/40 dark:border-border/40 rounded-xl resize-none min-h-[120px]"
                />

                <Input
                  placeholder="📍 Local (opcional)"
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  className="bg-white/80 dark:bg-muted/50 border-white/40 dark:border-border/40 rounded-xl h-12"
                />

                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetForm}
                    className="flex-1 py-4 bg-muted/50 text-foreground font-semibold rounded-2xl"
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={editingNoteId ? handleUpdateNote : handleAddNote}
                    disabled={saving}
                    className="flex-1 py-4 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/30 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : editingNoteId ? (
                      "Atualizar"
                    ) : (
                      "Salvar"
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      {user && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowForm(true)}
          className="fixed bottom-28 right-5 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-xl shadow-amber-500/30 z-50"
        >
          <Plus className="w-7 h-7" />
        </motion.button>
      )}
    </div>
  );
};

export default NotesScreen;
