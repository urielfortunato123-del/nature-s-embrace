import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSightings, Sighting } from "@/contexts/SightingsContext";
import { 
  ImageIcon, 
  MapPin, 
  Calendar, 
  Trash2, 
  X, 
  Camera as CameraIcon,
  Map,
  Search,
  Filter,
  ChevronDown,
  ZoomIn,
  Pencil,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type FilterType = "all" | "camera" | "map" | "with-photo";

const GalleryScreen = () => {
  const { sightings, removeSighting, updateSighting } = useSightings();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedSighting, setSelectedSighting] = useState<Sighting | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editSpecies, setEditSpecies] = useState("");
  const [editObservations, setEditObservations] = useState("");

  const filteredSightings = sightings
    .filter((s) => {
      // Search filter
      const matchesSearch = s.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.observations.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Type filter
      let matchesFilter = true;
      if (filter === "camera") matchesFilter = s.source === "camera";
      if (filter === "map") matchesFilter = s.source === "map" || !s.source;
      if (filter === "with-photo") matchesFilter = !!s.photo;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const handleDelete = (id: string) => {
    removeSighting(id);
    setDeleteConfirm(null);
    if (selectedSighting?.id === id) {
      setSelectedSighting(null);
    }
  };

  const startEditing = () => {
    if (selectedSighting) {
      setEditSpecies(selectedSighting.species);
      setEditObservations(selectedSighting.observations);
      setIsEditing(true);
    }
  };

  const saveEdits = () => {
    if (selectedSighting && editSpecies.trim()) {
      updateSighting(selectedSighting.id, {
        species: editSpecies.trim(),
        observations: editObservations.trim()
      });
      setSelectedSighting({
        ...selectedSighting,
        species: editSpecies.trim(),
        observations: editObservations.trim()
      });
      setIsEditing(false);
      toast.success("Registro atualizado!");
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    if (selectedSighting) {
      setEditSpecies(selectedSighting.species);
      setEditObservations(selectedSighting.observations);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR });
  };

  const getFilterLabel = () => {
    switch (filter) {
      case "camera": return "Da Câmera";
      case "map": return "Do Mapa";
      case "with-photo": return "Com Foto";
      default: return "Todos";
    }
  };

  const sightingsWithPhotos = sightings.filter(s => s.photo);
  const cameraSightings = sightings.filter(s => s.source === "camera");

  return (
    <div className="min-h-screen bg-background safe-top safe-bottom pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Galeria</h1>
                <p className="text-xs text-muted-foreground">
                  {sightings.length} registro{sightings.length !== 1 ? "s" : ""} • {sightingsWithPhotos.length} com foto
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar espécies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 bg-muted/50"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 gap-2">
                  <Filter className="w-4 h-4" />
                  {getFilterLabel()}
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter("all")}>
                  Todos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("camera")}>
                  <CameraIcon className="w-4 h-4 mr-2" /> Da Câmera
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("map")}>
                  <Map className="w-4 h-4 mr-2" /> Do Mapa
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("with-photo")}>
                  <ImageIcon className="w-4 h-4 mr-2" /> Com Foto
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          <Badge variant="secondary" className="shrink-0">
            📸 {cameraSightings.length} identificações
          </Badge>
          <Badge variant="secondary" className="shrink-0">
            🗺️ {sightings.length - cameraSightings.length} do mapa
          </Badge>
        </div>
      </div>

      {/* Gallery Grid */}
      <ScrollArea className="flex-1">
        {filteredSightings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <ImageIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchQuery || filter !== "all" ? "Nenhum resultado" : "Galeria vazia"}
            </h3>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              {searchQuery || filter !== "all" 
                ? "Tente ajustar os filtros ou termo de busca"
                : "Identifique espécies com a câmera ou adicione avistamentos no mapa para começar sua coleção!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 p-4">
            {filteredSightings.map((sighting, index) => (
              <motion.div
                key={sighting.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative aspect-square rounded-xl overflow-hidden bg-muted group cursor-pointer"
                onClick={() => setSelectedSighting(sighting)}
              >
                {sighting.photo ? (
                  <img
                    src={sighting.photo}
                    alt={sighting.species}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/20">
                    <span className="text-4xl">🦜</span>
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Source Badge */}
                <div className="absolute top-2 right-2">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      sighting.source === "camera" 
                        ? "bg-violet-500/90 text-white" 
                        : "bg-emerald-500/90 text-white"
                    }`}
                  >
                    {sighting.source === "camera" ? (
                      <CameraIcon className="w-3 h-3" />
                    ) : (
                      <MapPin className="w-3 h-3" />
                    )}
                  </Badge>
                </div>

                {/* Zoom indicator on hover */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-white font-semibold text-sm truncate">
                    {sighting.species}
                  </p>
                  <p className="text-white/70 text-xs">
                    {format(new Date(sighting.timestamp), "dd/MM/yyyy")}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSighting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col"
            onClick={() => setSelectedSighting(null)}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 safe-top">
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => {
                  setSelectedSighting(null);
                  setIsEditing(false);
                }}
              >
                <X className="w-6 h-6" />
              </Button>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={cancelEditing}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-green-400 hover:bg-green-500/20"
                      onClick={saveEdits}
                    >
                      <Check className="w-5 h-5" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditing();
                      }}
                    >
                      <Pencil className="w-5 h-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-400 hover:bg-red-500/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirm(selectedSighting.id);
                      }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Image */}
            <div 
              className="flex-1 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedSighting.photo ? (
                <img
                  src={selectedSighting.photo}
                  alt={selectedSighting.species}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : (
                <div className="w-48 h-48 rounded-2xl bg-muted/20 flex items-center justify-center">
                  <span className="text-8xl">🦜</span>
                </div>
              )}
            </div>

            {/* Info Panel */}
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="bg-background rounded-t-3xl p-6 safe-bottom"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-4" />
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {isEditing ? (
                    <Input
                      value={editSpecies}
                      onChange={(e) => setEditSpecies(e.target.value)}
                      className="text-xl font-bold mb-2"
                      placeholder="Nome da espécie"
                    />
                  ) : (
                    <h2 className="text-xl font-bold text-foreground">
                      {selectedSighting.species}
                    </h2>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant="secondary"
                      className={
                        selectedSighting.source === "camera" 
                          ? "bg-violet-500/20 text-violet-700 dark:text-violet-300" 
                          : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                      }
                    >
                      {selectedSighting.source === "camera" ? (
                        <>
                          <CameraIcon className="w-3 h-3 mr-1" />
                          IA Identificou
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3 h-3 mr-1" />
                          Registro Manual
                        </>
                      )}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{formatDate(selectedSighting.timestamp)}</span>
                </div>
                
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">
                    {selectedSighting.lat.toFixed(4)}, {selectedSighting.lng.toFixed(4)}
                  </span>
                </div>

                {isEditing ? (
                  <div className="mt-4">
                    <label className="text-sm text-muted-foreground mb-2 block">Observações</label>
                    <Textarea
                      value={editObservations}
                      onChange={(e) => setEditObservations(e.target.value)}
                      className="min-h-[100px]"
                      placeholder="Adicione observações sobre o avistamento..."
                    />
                  </div>
                ) : selectedSighting.observations ? (
                  <div className="mt-4 p-3 rounded-xl bg-muted/50">
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {selectedSighting.observations}
                    </p>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir registro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O avistamento será removido permanentemente da galeria e do mapa.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default GalleryScreen;
