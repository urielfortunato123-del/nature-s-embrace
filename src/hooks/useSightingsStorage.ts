import { useState, useEffect, useCallback } from "react";

export interface FaunaSighting {
  id: string;
  lat: number;
  lng: number;
  species: string;
  observations: string;
  photo: string | null;
  timestamp: Date;
  synced: boolean;
}

const DB_NAME = "BioNaturaDB";
const DB_VERSION = 1;
const STORE_NAME = "sightings";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("synced", "synced", { unique: false });
        store.createIndex("timestamp", "timestamp", { unique: false });
      }
    };
  });
}

async function getAllSightings(): Promise<FaunaSighting[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const sightings = request.result.map((s: any) => ({
        ...s,
        timestamp: new Date(s.timestamp),
      }));
      // Sort by timestamp descending
      sightings.sort((a: FaunaSighting, b: FaunaSighting) => 
        b.timestamp.getTime() - a.timestamp.getTime()
      );
      resolve(sightings);
    };
  });
}

async function saveSighting(sighting: FaunaSighting): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({
      ...sighting,
      timestamp: sighting.timestamp.toISOString(),
    });

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

async function deleteSighting(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

async function getUnsyncedSightings(): Promise<FaunaSighting[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const sightings = request.result
        .filter((s: any) => s.synced === false)
        .map((s: any) => ({
          ...s,
          timestamp: new Date(s.timestamp),
        }));
      resolve(sightings);
    };
  });
}

async function markAsSynced(ids: string[]): Promise<void> {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  for (const id of ids) {
    const getRequest = store.get(id);
    getRequest.onsuccess = () => {
      const sighting = getRequest.result;
      if (sighting) {
        sighting.synced = true;
        store.put(sighting);
      }
    };
  }

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export function useSightingsStorage() {
  const [sightings, setSightings] = useState<FaunaSighting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState(0);

  // Load sightings on mount
  useEffect(() => {
    const loadSightings = async () => {
      try {
        const data = await getAllSightings();
        setSightings(data);
        const unsynced = await getUnsyncedSightings();
        setPendingSync(unsynced.length);
      } catch (error) {
        console.error("Error loading sightings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSightings();
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Trigger sync when coming back online
      syncSightings();
    };
    
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Add new sighting
  const addSighting = useCallback(async (
    data: Omit<FaunaSighting, "id" | "synced">
  ): Promise<FaunaSighting> => {
    const newSighting: FaunaSighting = {
      ...data,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      synced: false,
    };

    await saveSighting(newSighting);
    setSightings((prev) => [newSighting, ...prev]);
    setPendingSync((prev) => prev + 1);

    // Try to sync immediately if online
    if (navigator.onLine) {
      syncSightings();
    }

    return newSighting;
  }, []);

  // Delete sighting
  const removeSighting = useCallback(async (id: string): Promise<void> => {
    await deleteSighting(id);
    setSightings((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // Update sighting
  const updateSighting = useCallback(async (
    id: string,
    updates: Partial<Omit<FaunaSighting, "id">>
  ): Promise<void> => {
    const existing = sightings.find((s) => s.id === id);
    if (!existing) return;

    const updated: FaunaSighting = {
      ...existing,
      ...updates,
      synced: false,
    };

    await saveSighting(updated);
    setSightings((prev) =>
      prev.map((s) => (s.id === id ? updated : s))
    );
  }, [sightings]);

  // Sync sightings (placeholder for future backend sync)
  const syncSightings = useCallback(async (): Promise<void> => {
    if (!navigator.onLine) return;

    try {
      const unsynced = await getUnsyncedSightings();
      
      if (unsynced.length === 0) {
        setPendingSync(0);
        return;
      }

      // TODO: When backend is connected, sync to server here
      // For now, just mark as synced locally
      console.log(`Syncing ${unsynced.length} sightings...`);
      
      // Simulate successful sync
      await markAsSynced(unsynced.map((s) => s.id));
      
      // Update local state
      setSightings((prev) =>
        prev.map((s) => ({
          ...s,
          synced: true,
        }))
      );
      
      setPendingSync(0);
      console.log("Sync completed!");
    } catch (error) {
      console.error("Sync failed:", error);
    }
  }, []);

  return {
    sightings,
    isLoading,
    isOnline,
    pendingSync,
    addSighting,
    removeSighting,
    updateSighting,
    syncSightings,
  };
}
