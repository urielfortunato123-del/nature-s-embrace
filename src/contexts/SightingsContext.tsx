import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export interface Sighting {
  id: string;
  lat: number;
  lng: number;
  species: string;
  observations: string;
  photo: string | null;
  timestamp: string;
  source?: 'map' | 'camera';
}

interface SightingsContextType {
  sightings: Sighting[];
  addSighting: (sighting: Omit<Sighting, 'id' | 'timestamp'>) => void;
  removeSighting: (id: string) => void;
  updateSighting: (id: string, updates: Partial<Pick<Sighting, 'species' | 'observations'>>) => void;
  getCurrentLocation: () => Promise<{ lat: number; lng: number } | null>;
}

const SIGHTINGS_STORAGE_KEY = "bionatura_map_sightings";

const SightingsContext = createContext<SightingsContextType | undefined>(undefined);

export const useSightings = () => {
  const context = useContext(SightingsContext);
  if (!context) {
    throw new Error("useSightings must be used within a SightingsProvider");
  }
  return context;
};

export const SightingsProvider = ({ children }: { children: ReactNode }) => {
  const [sightings, setSightings] = useState<Sighting[]>(() => {
    try {
      const stored = localStorage.getItem(SIGHTINGS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as Sighting[];
      }
    } catch (error) {
      console.error("Error loading sightings from localStorage:", error);
    }
    return [];
  });

  // Save sightings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(SIGHTINGS_STORAGE_KEY, JSON.stringify(sightings));
    } catch (error) {
      console.error("Error saving sightings to localStorage:", error);
    }
  }, [sightings]);

  const addSighting = useCallback((sightingData: Omit<Sighting, 'id' | 'timestamp'>) => {
    const newSighting: Sighting = {
      ...sightingData,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };

    setSightings((prev) => [...prev, newSighting]);
    toast.success(`Avistamento de "${sightingData.species}" registrado!`);
  }, []);

  const removeSighting = useCallback((id: string) => {
    setSightings((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const updateSighting = useCallback((id: string, updates: Partial<Pick<Sighting, 'species' | 'observations'>>) => {
    setSightings((prev) => prev.map((s) => 
      s.id === id ? { ...s, ...updates } : s
    ));
  }, []);

  const getCurrentLocation = useCallback((): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        toast.error("Geolocalização não suportada neste dispositivo");
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error("Não foi possível obter sua localização");
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    });
  }, []);

  return (
    <SightingsContext.Provider value={{ sightings, addSighting, removeSighting, updateSighting, getCurrentLocation }}>
      {children}
    </SightingsContext.Provider>
  );
};
