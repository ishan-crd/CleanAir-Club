import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type ImpactLogEntry = {
  id: string;
  label: string;
  xp: number;
  co2Kg: number;
  timestamp: number;
};

type ImpactContextValue = {
  totalPoints: number;
  co2SavedKg: number;
  logs: ImpactLogEntry[];
  addImpact: (payload: { xp: number; co2Kg: number; label: string }) => void;
};

const ImpactContext = createContext<ImpactContextValue | null>(null);

function makeLogId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ImpactProvider({ children }: { children: ReactNode }) {
  const [totalPoints, setTotalPoints] = useState(0);
  const [co2SavedKg, setCo2SavedKg] = useState(0);
  const [logs, setLogs] = useState<ImpactLogEntry[]>([]);

  const addImpact = useCallback(
    ({ xp, co2Kg, label }: { xp: number; co2Kg: number; label: string }) => {
      setTotalPoints((p) => p + xp);
      setCo2SavedKg((c) => Math.round((c + co2Kg) * 10) / 10);
      setLogs((prev) => [
        {
          id: makeLogId(),
          label,
          xp,
          co2Kg,
          timestamp: Date.now(),
        },
        ...prev,
      ]);
    },
    [],
  );

  return (
    <ImpactContext.Provider value={{ totalPoints, co2SavedKg, logs, addImpact }}>
      {children}
    </ImpactContext.Provider>
  );
}

export function useImpact() {
  const ctx = useContext(ImpactContext);
  if (!ctx) throw new Error('useImpact must be used inside ImpactProvider');
  return ctx;
}
