import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface Note {
  id: string;
  title: string;
  content: string | null;
  category: string;
  location: string | null;
  created_at: string;
}

export const useNotes = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    if (!user) {
      setNotes([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNotes(data as Note[]);
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as notas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (noteData: {
    title: string;
    content: string;
    category: string;
    location?: string;
  }) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from("notes")
        .insert({
          user_id: user.id,
          title: noteData.title,
          content: noteData.content,
          category: noteData.category,
          location: noteData.location || null,
        })
        .select()
        .single();

      if (error) throw error;
      setNotes((prev) => [data as Note, ...prev]);
      return data;
    } catch (error) {
      console.error("Error adding note:", error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a nota",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateNote = async (
    id: string,
    noteData: {
      title?: string;
      content?: string;
      category?: string;
      location?: string;
    }
  ) => {
    try {
      const { error } = await supabase
        .from("notes")
        .update(noteData)
        .eq("id", id);

      if (error) throw error;
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...noteData } : n))
      );
    } catch (error) {
      console.error("Error updating note:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a nota",
        variant: "destructive",
      });
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase.from("notes").delete().eq("id", id);

      if (error) throw error;
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "Erro",
        description: "Não foi possível deletar a nota",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [user]);

  return {
    notes,
    loading,
    addNote,
    updateNote,
    deleteNote,
    refetch: fetchNotes,
  };
};
