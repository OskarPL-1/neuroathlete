// plan_komponentow.tsx - Szczegóły komponentów React dla aplikacji NeuroAthlete
'use client';
import { useState } from 'react';

// Komponent główny aplikacji - strona główna
export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">NeuroAthlete</h1>
      <p className="text-lg text-gray-600 mb-8">Trening refleksu i koncentracji dla sportowców</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Rozpocznij trening
      </button>
    </div>
  );
};

// Komponent treningu refleksu
export const ReactionTest = () => {
  // Stan komponentu
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);

  // Funkcja rozpoczynająca test
  const startTest = () => {
    setIsWaiting(true);
    setReactionTime(null);
    // Losowy czas oczekiwania 1-5 sekund
    const delay = Math.random() * 4000 + 1000;
    setTimeout(() => {
      setStartTime(Date.now());
      setIsWaiting(false);
    }, delay);
  };

  // Funkcja obsługująca kliknięcie
  const handleClick = () => {
    if (startTime) {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setStartTime(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-8">Test refleksu</h2>
      {!isWaiting && !reactionTime && (
        <button
          onClick={startTest}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          Przygotuj się i kliknij, gdy zmieni się kolor
        </button>
      )}
      {isWaiting && (
        <div className="w-32 h-32 bg-red-500 rounded-full animate-pulse"></div>
      )}
      {reactionTime && (
        <div className="text-center">
          <p className="text-xl mb-4">Twój czas reakcji: {reactionTime} ms</p>
          <button
            onClick={startTest}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Spróbuj ponownie
          </button>
        </div>
      )}
    </div>
  );
};

// Komponent treningu koncentracji
export const FocusTraining = () => {
  // Stan komponentu
  const [targets, setTargets] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  // Funkcja rozpoczynająca trening
  const startTraining = () => {
    setScore(0);
    setTimeLeft(30);
    generateTargets();
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Generowanie celów
  const generateTargets = () => {
    const newTargets = [];
    for (let i = 0; i < 5; i++) {
      newTargets.push({
        id: i,
        x: Math.random() * 300 + 50,
        y: Math.random() * 300 + 50
      });
    }
    setTargets(newTargets);
  };

  // Obsługa trafienia celu
  const hitTarget = (id: number) => {
    setTargets(prev => prev.filter(target => target.id !== id));
    setScore(prev => prev + 10);
    if (targets.length <= 1) {
      generateTargets();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Trening koncentracji</h2>
      <div className="mb-4">Czas: {timeLeft}s | Punkty: {score}</div>
      <button
        onClick={startTraining}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-8"
      >
        Rozpocznij trening
      </button>
      <div className="relative w-96 h-96 bg-white border-2 border-gray-300 rounded">
        {targets.map(target => (
          <button
            key={target.id}
            onClick={() => hitTarget(target.id)}
            className="absolute w-8 h-8 bg-blue-500 rounded-full"
            style={{ left: target.x, top: target.y }}
          />
        ))}
      </div>
    </div>
  );
};

// Komponent statystyk
export const Statistics = () => {
  // Przykładowe dane
  const [results, setResults] = useState([
    { date: '2024-01-01', reactionTime: 250, focusScore: 85 },
    { date: '2024-01-02', reactionTime: 230, focusScore: 90 },
    // ... więcej danych
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Statystyki treningów</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Średni czas reakcji</h3>
          <div className="text-3xl font-bold text-blue-600">
            {Math.round(results.reduce((sum, r) => sum + r.reactionTime, 0) / results.length)} ms
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Średni wynik koncentracji</h3>
          <div className="text-3xl font-bold text-green-600">
            {Math.round(results.reduce((sum, r) => sum + r.focusScore, 0) / results.length)}%
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Historia treningów</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Czas reakcji</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Koncentracja</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className="border-t">
                  <td className="px-6 py-4 whitespace-nowrap">{result.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{result.reactionTime} ms</td>
                  <td className="px-6 py-4 whitespace-nowrap">{result.focusScore}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Komponent nawigacji
export const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold">NeuroAthlete</div>
          <div className="space-x-4">
            <a href="/" className="text-gray-700 hover:text-blue-600">Strona główna</a>
            <a href="/reaction-test" className="text-gray-700 hover:text-blue-600">Test refleksu</a>
            <a href="/focus-training" className="text-gray-700 hover:text-blue-600">Trening koncentracji</a>
            <a href="/statistics" className="text-gray-700 hover:text-blue-600">Statystyki</a>
          </div>
        </div>
      </div>
    </nav>
  );
};