'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocalStorage, getReactionResults, formatTime } from '../../implementation/plan_funkcji';

type Phase = 'idle' | 'waiting' | 'ready' | 'result';

export default function ReactionTest() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [best, setBest] = useLocalStorage<number | null>('neuroAthlete_bestReactionTime', null);
  const [results, setResults] = useLocalStorage<Array<{id: string; timestamp: number; reactionTime: number}>>('neuroAthlete_reactionResults', []);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const readyTimeRef = useRef<number | null>(null);

  const totalAttempts = results.length;
  const averageTime = results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.reactionTime, 0) / results.length) : 0;

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const startTest = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setReactionTime(null);
    readyTimeRef.current = null;
    setPhase('waiting');

    const delay = 1000 + Math.random() * 4000;
    timerRef.current = setTimeout(() => {
      readyTimeRef.current = Date.now();
      setPhase('ready');
    }, delay);
  };

  const handleClick = () => {
    if (phase === 'idle') {
      startTest();
      return;
    }

    if (phase === 'waiting') {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setPhase('idle');
      alert('Za wcześnie! Poczekaj na zielony kolor.');
      return;
    }

    if (phase === 'ready' && readyTimeRef.current) {
      const time = Date.now() - readyTimeRef.current;
      setReactionTime(time);
      setPhase('result');

      setResults(prev => {
        const next = [...prev, { id: Date.now().toString(), timestamp: Date.now(), reactionTime: time }];
        return next.slice(-50);
      });

      if (best === null || time < best) setBest(time);
    }
  };

  const getEvaluation = (time: number): { text: string; color: string } => {
    if (time < 200) return { text: 'Wybitny!', color: 'text-green-700' };
    if (time < 250) return { text: 'Dobry', color: 'text-blue-700' };
    if (time < 300) return { text: 'Średni', color: 'text-yellow-700' };
    return { text: 'Do poprawy', color: 'text-red-700' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <head>
        <title>Test refleksu - NeuroAthlete</title>
      </head>

      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <a href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600">NeuroAthlete</a>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-600 hover:text-blue-600 font-medium">Strona główna</a>
            <a href="/reaction-test" className="text-blue-600 font-medium">Test refleksu</a>
            <a href="/focus-training" className="text-gray-600 hover:text-blue-600 font-medium">Trening koncentracji</a>
            <a href="/memory-training" className="text-gray-600 hover:text-purple-600 font-medium">Trening pamięci</a>
            <a href="/statistics" className="text-gray-600 hover:text-blue-600 font-medium">Statystyki</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Test refleksu</h1>
            <p className="text-lg text-gray-600">
              Zmierz swój czas reakcji. Kliknij w pole, poczekaj na zmiane na zielony i kliknij jak najszybciej!
            </p>
          </div>

          {best !== null && (
            <div className="bg-white rounded-lg p-4 mb-6 shadow-md text-center">
              <p className="text-sm text-gray-500 mb-1">Twój najlepszy wynik</p>
              <p className="text-2xl font-bold text-blue-600">{formatTime(best)}</p>
            </div>
          )}

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col items-center space-y-8">
              <div className="text-center">
                {phase === 'idle' && (
                  <div>
                    <p className="text-lg font-medium text-gray-700 mb-4">
                      Kliknij w pole poniżej, aby rozpoczac test
                    </p>
                    <button
                      onClick={startTest}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Przygotuj sie i kliknij
                    </button>
                  </div>
                )}

                {phase === 'waiting' && (
                  <div>
                    <p className="text-lg font-medium text-gray-700 mb-4">
                      Czekaj na zmiane koloru...
                    </p>
                    <div
                      className="w-32 h-32 bg-red-500 rounded-full animate-pulse cursor-pointer mx-auto shadow-lg"
                      onClick={handleClick}
                    />
                    <p className="text-sm text-gray-500 mt-4">
                      Kliknij tutaj po polaczeniu z zielonym kolorem
                    </p>
                  </div>
                )}

                {phase === 'ready' && (
                  <div>
                    <p className="text-lg font-medium text-gray-700 mb-4">
                      KLIKNIJ TERAZ!
                    </p>
                    <div
                      className="w-32 h-32 bg-green-500 rounded-full cursor-pointer mx-auto shadow-lg"
                      onClick={handleClick}
                    />
                  </div>
                )}

                {phase === 'result' && reactionTime !== null && (
                  <div className="text-center space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Twój czas reakcji</p>
                      <p className="text-4xl font-bold text-gray-800 mb-2">
                        {formatTime(reactionTime)}
                      </p>
                      <p className={`text-xl font-semibold ${getEvaluation(reactionTime).color}`}>
                        {getEvaluation(reactionTime).text}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={startTest}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                      >
                        Sprobuj ponownie
                      </button>
                      <a
                        href="/statistics"
                        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-200"
                      >
                        Zobacz statystyki
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 rounded-lg p-6 w-full">
                <h3 className="font-semibold text-blue-800 mb-2">Porady do treningu</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>Skup sie na polu i badz gotowy do natychmiastowej reakcji</li>
                  <li>Trenuj regularnie, aby poprawic swoje wyniki</li>
                  <li>Dobry czas reakcji to mniej niz 250 ms</li>
                  <li>Wybitny wynik to mniej niz 200 ms</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white rounded-lg p-4 shadow-md text-center">
              <p className="text-sm text-gray-500">Sredni czas</p>
              <p className="text-2xl font-bold text-blue-600">
                {averageTime > 0 ? formatTime(averageTime) : '--'}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md text-center">
              <p className="text-sm text-gray-500">Liczba prob</p>
              <p className="text-2xl font-bold text-green-600">{totalAttempts}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md text-center">
              <p className="text-sm text-gray-500">Najlepszy</p>
              <p className="text-2xl font-bold text-purple-600">
                {best !== null ? formatTime(best) : '--'}
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 NeuroAthlete. Aplikacja do treningu umiejetnosci poznawczych dla sportowcow.
          </p>
        </div>
      </footer>
    </div>
  );
}
