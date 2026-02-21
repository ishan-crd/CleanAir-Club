import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type ImpactContextValue = {
  totalPoints: number;
  co2SavedKg: number;
  addImpact: (payload: { xp: number; co2Kg: number }) => void;
};

const ImpactContext = createContext<ImpactContextValue | null>(null);

export function ImpactProvider({ children }: { children: ReactNode }) {
  const [totalPoints, setTotalPoints] = useState(0);
  const [co2SavedKg, setCo2SavedKg] = useState(0);

  const addImpact = useCallback(({ xp, co2Kg }: { xp: number; co2Kg: number }) => {
    setTotalPoints((p) => p + xp);
    setCo2SavedKg((c) => Math.round((c + co2Kg) * 10) / 10);
  }, []);

  return (
    <ImpactContext.Provider value={{ totalPoints, co2SavedKg, addImpact }}>
      {children}
    </ImpactContext.Provider>
  );
}

export function useImpact() {
  const ctx = useContext(ImpactContext);
  if (!ctx) throw new Error('useImpact must be used inside ImpactProvider');
  return ctx;
}
