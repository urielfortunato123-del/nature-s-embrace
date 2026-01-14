import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface Mission {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  created_at: string;
}

export const useMissions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMissions = async () => {
    if (!user) {
      setMissions([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("missions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMissions(data as Mission[]);
    } catch (error) {
      console.error("Error fetching missions:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as missões",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addMission = async (text: string, priority: "low" | "medium" | "high") => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from("missions")
        .insert({
          user_id: user.id,
          text,
          priority,
          completed: false,
        })
        .select()
        .single();

      if (error) throw error;
      setMissions((prev) => [data as Mission, ...prev]);
      return data;
    } catch (error) {
      console.error("Error adding mission:", error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a missão",
        variant: "destructive",
      });
      return null;
    }
  };

  const toggleMission = async (id: string) => {
    const mission = missions.find((m) => m.id === id);
    if (!mission) return;

    try {
      const { error } = await supabase
        .from("missions")
        .update({ completed: !mission.completed })
        .eq("id", id);

      if (error) throw error;
      setMissions((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, completed: !m.completed } : m
        )
      );
    } catch (error) {
      console.error("Error toggling mission:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a missão",
        variant: "destructive",
      });
    }
  };

  const deleteMission = async (id: string) => {
    try {
      const { error } = await supabase.from("missions").delete().eq("id", id);

      if (error) throw error;
      setMissions((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error deleting mission:", error);
      toast({
        title: "Erro",
        description: "Não foi possível deletar a missão",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchMissions();
  }, [user]);

  return {
    missions,
    loading,
    addMission,
    toggleMission,
    deleteMission,
    refetch: fetchMissions,
  };
};
