// plan_funkcji.ts - Logika aplikacji NeuroAthlete
import { useState } from 'react';

// Typy danych
export interface ReactionResult {
  id: string;
  timestamp: number;
  reactionTime: number;
}

export interface FocusResult {
  id: string;
  timestamp: number;
  score: number;
  duration: number;
}

export interface MemoryResult {
  id: string;
  timestamp: number;
  score: number;
  level: number;
  correctPairs: number;
  duration: number;
}

export interface UserStats {
  averageReactionTime: number;
  bestReactionTime: number;
  totalSessions: number;
  averageFocusScore: number;
  bestFocusScore: number;
  averageMemoryScore: number;
  bestMemoryScore: number;
}

// Funkcje pomocnicze
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatTime = (milliseconds: number): string => {
  if (milliseconds < 1000) {
    return `${milliseconds} ms`;
  }
  return `${(milliseconds / 1000).toFixed(2)} s`;
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('pl-PL');
};

// Funkcje zarządzania danymi (localStorage)
export const saveReactionResult = (reactionTime: number): void => {
  if (typeof window === 'undefined') return;
  const result: ReactionResult = {
    id: generateId(),
    timestamp: Date.now(),
    reactionTime
  };

  const existingResults = getReactionResults();
  existingResults.push(result);
  localStorage.setItem('neuroAthlete_reactionResults', JSON.stringify(existingResults));
};

export const getReactionResults = (): ReactionResult[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('neuroAthlete_reactionResults');
  return stored ? JSON.parse(stored) : [];
};

export const saveFocusResult = (score: number, duration: number): void => {
  if (typeof window === 'undefined') return;
  const result: FocusResult = {
    id: generateId(),
    timestamp: Date.now(),
    score,
    duration
  };

  const existingResults = getFocusResults();
  existingResults.push(result);
  localStorage.setItem('neuroAthlete_focusResults', JSON.stringify(existingResults));
};

export const getFocusResults = (): FocusResult[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('neuroAthlete_focusResults');
  return stored ? JSON.parse(stored) : [];
};

// Funkcje obliczeń statystycznych
export const calculateUserStats = (): UserStats => {
  const reactionResults = getReactionResults();
  const focusResults = getFocusResults();
  const memoryResults = getMemoryResults();

  const averageReactionTime = reactionResults.length > 0
    ? reactionResults.reduce((sum, result) => sum + result.reactionTime, 0) / reactionResults.length
    : 0;

  const bestReactionTime = reactionResults.length > 0
    ? Math.min(...reactionResults.map(result => result.reactionTime))
    : 0;

  const averageFocusScore = focusResults.length > 0
    ? focusResults.reduce((sum, result) => sum + result.score, 0) / focusResults.length
    : 0;

  const bestFocusScore = focusResults.length > 0
    ? Math.max(...focusResults.map(result => result.score))
    : 0;

  const averageMemoryScore = memoryResults.length > 0
    ? memoryResults.reduce((sum, result) => sum + result.score, 0) / memoryResults.length
    : 0;

  const bestMemoryScore = memoryResults.length > 0
    ? Math.max(...memoryResults.map(result => result.score))
    : 0;

  return {
    averageReactionTime: Math.round(averageReactionTime),
    bestReactionTime,
    totalSessions: reactionResults.length + focusResults.length + memoryResults.length,
    averageFocusScore: Math.round(averageFocusScore),
    bestFocusScore,
    averageMemoryScore: Math.round(averageMemoryScore),
    bestMemoryScore
  };
};

// Funkcje treningu refleksu
export const startReactionTest = (): Promise<number> => {
  return new Promise((resolve) => {
    // Losowy czas oczekiwania 1-5 sekund
    const delay = Math.random() * 4000 + 1000;
    setTimeout(() => {
      const startTime = Date.now();
      resolve(startTime);
    }, delay);
  });
};

export const calculateReactionTime = (startTime: number): number => {
  return Date.now() - startTime;
};

export const evaluateReactionTime = (reactionTime: number): string => {
  if (reactionTime < 200) return 'Wybitny';
  if (reactionTime < 250) return 'Dobry';
  if (reactionTime < 300) return 'Średni';
  return 'Do poprawy';
};

// Funkcje treningu koncentracji
export const generateFocusTargets = (count: number = 5): Array<{id: string, x: number, y: number}> => {
  const targets = [];
  for (let i = 0; i < count; i++) {
    targets.push({
      id: generateId(),
      x: Math.random() * 300 + 50, // Zakres 50-350px
      y: Math.random() * 300 + 50
    });
  }
  return targets;
};

export const calculateFocusScore = (hits: number, totalTargets: number, timeLeft: number): number => {
  const accuracy = hits / totalTargets;
  const timeBonus = timeLeft / 30; // Maksymalnie 30 sekund
  return Math.round((accuracy * 100) + (timeBonus * 20));
};

// Funkcje walidacji
export const isValidReactionTime = (time: number): boolean => {
  return time > 0 && time < 2000; // Maksymalnie 2 sekundy
};

export const isValidFocusScore = (score: number): boolean => {
  return score >= 0 && score <= 120;
};

// Funkcje eksportu danych
export const exportUserData = (): string => {
  const reactionResults = getReactionResults();
  const focusResults = getFocusResults();
  const stats = calculateUserStats();

  const data = {
    exportedAt: Date.now(),
    stats,
    reactionResults,
    focusResults
  };

  return JSON.stringify(data, null, 2);
};

export const importUserData = (jsonData: string): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    const data = JSON.parse(jsonData);

    if (data.reactionResults) {
      localStorage.setItem('neuroAthlete_reactionResults', JSON.stringify(data.reactionResults));
    }

    if (data.focusResults) {
      localStorage.setItem('neuroAthlete_focusResults', JSON.stringify(data.focusResults));
    }

    return true;
  } catch (error) {
    console.error('Błąd importowania danych:', error);
    return false;
  }
};

export const resetAllData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('neuroAthlete_reactionResults');
  localStorage.removeItem('neuroAthlete_focusResults');
  localStorage.removeItem('neuroAthlete_memoryResults');
};

// Funkcje treningu pamięci
export const saveMemoryResult = (score: number, level: number, correctPairs: number, duration: number): void => {
  if (typeof window === 'undefined') return;
  const result: MemoryResult = {
    id: generateId(),
    timestamp: Date.now(),
    score,
    level,
    correctPairs,
    duration
  };
  const existingResults = getMemoryResults();
  existingResults.push(result);
  localStorage.setItem('neuroAthlete_memoryResults', JSON.stringify(existingResults));
};

export const getMemoryResults = (): MemoryResult[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('neuroAthlete_memoryResults');
  return stored ? JSON.parse(stored) : [];
};

export const generateMemoryGrid = (pairs: number = 6): Array<{id: string; emoji: string; revealed: boolean; matched: boolean}> => {
  const emojis = ['⚡', '🎯', '🧠', '💪', '🔥', '⭐', '🏆', '🎪', '💎', '🌈'];
  const selectedEmojis = emojis.slice(0, pairs);
  const cards = [...selectedEmojis.map(e => ({ id: generateId(), emoji: e, revealed: false, matched: false })), ...selectedEmojis.map(e => ({ id: generateId(), emoji: e, revealed: false, matched: false }))];
  return cards.sort(() => Math.random() - 0.5);
};

export const calculateMemoryScore = (pairs: number, attempts: number, duration: number): number => {
  const perfectAttempts = pairs;
  const efficiency = perfectAttempts / Math.max(attempts, perfectAttempts);
  const timeBonus = Math.max(0, 1 - duration / 120);
  return Math.round(Math.min(100, (efficiency * 70) + (timeBonus * 30)));
};

// Hook do zarządzania stanem aplikacji (przykład dla React)
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') return initialValue;
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Błąd ładowania ${key} z localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      if (typeof window === 'undefined') return;
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Błąd zapisywania ${key} do localStorage:`, error);
    }
  };

  return [storedValue, setValue] as const;
};