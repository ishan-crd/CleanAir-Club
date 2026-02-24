import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type LogPhase = 'idle' | 'tracking' | 'paused';

type CommuteLogState = {
  logPhase: LogPhase;
  startTimestamp: number | null;
  pausedAt: number | null;
  totalPauseMs: number;
  selectedTransportId: string | null;
};

type CommuteLogContextValue = {
  state: CommuteLogState;
  /** Current elapsed time in ms (excluding paused time). */
  getElapsedMs: () => number;
  startLog: (transportId: string) => void;
  pauseLog: () => void;
  continueLog: () => void;
  /** Stops the log, clears state, returns earned { xp, co2Kg }. */
  stopLog: (co2Kg: number) => { xp: number; co2Kg: number };
};

const initialState: CommuteLogState = {
  logPhase: 'idle',
  startTimestamp: null,
  pausedAt: null,
  totalPauseMs: 0,
  selectedTransportId: null,
};

const CommuteLogContext = createContext<CommuteLogContextValue | null>(null);

function randomXp(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function CommuteLogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CommuteLogState>(initialState);

  const getElapsedMs = useCallback(() => {
    if (state.logPhase === 'idle' || state.startTimestamp === null) return 0;
    if (state.logPhase === 'paused' && state.pausedAt !== null) {
      return state.pausedAt - state.startTimestamp - state.totalPauseMs;
    }
    const now = Date.now();
    const pauseTotal =
      state.pausedAt !== null ? state.totalPauseMs + (now - state.pausedAt) : state.totalPauseMs;
    return now - state.startTimestamp - pauseTotal;
  }, [state.logPhase, state.startTimestamp, state.pausedAt, state.totalPauseMs]);

  const startLog = useCallback((transportId: string) => {
    setState({
      logPhase: 'tracking',
      startTimestamp: Date.now(),
      pausedAt: null,
      totalPauseMs: 0,
      selectedTransportId: transportId,
    });
  }, []);

  const pauseLog = useCallback(() => {
    setState((prev) => {
      if (prev.logPhase !== 'tracking' || prev.startTimestamp === null) return prev;
      return {
        ...prev,
        logPhase: 'paused',
        pausedAt: Date.now(),
      };
    });
  }, []);

  const continueLog = useCallback(() => {
    setState((prev) => {
      if (prev.logPhase !== 'paused' || prev.pausedAt === null) return prev;
      return {
        ...prev,
        logPhase: 'tracking',
        totalPauseMs: prev.totalPauseMs + (Date.now() - prev.pausedAt),
        pausedAt: null,
      };
    });
  }, []);

  const stopLog = useCallback((co2Kg: number): { xp: number; co2Kg: number } => {
    const xp = randomXp(30, 80);
    setState(initialState);
    return { xp, co2Kg };
  }, []);

  return (
    <CommuteLogContext.Provider
      value={{ state, getElapsedMs, startLog, pauseLog, continueLog, stopLog }}
    >
      {children}
    </CommuteLogContext.Provider>
  );
}

export function useCommuteLog() {
  const ctx = useContext(CommuteLogContext);
  if (!ctx) throw new Error('useCommuteLog must be used inside CommuteLogProvider');
  return ctx;
}
