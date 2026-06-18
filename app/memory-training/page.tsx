'use client';

import { useState, useEffect, useCallback } from 'react';
import { saveMemoryResult, getMemoryResults, generateMemoryGrid, calculateMemoryScore, formatTime } from '../../implementation/plan_funkcji';

type GamePhase = 'idle' | 'playing' | 'results';
type Difficulty = 'easy' | 'medium' | 'hard';

export default function MemoryTraining() {
  const [phase, setPhase] = useState<GamePhase>('idle');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [grid, setGrid] = useState<Array<{id: string; emoji: string; revealed: boolean; matched: boolean}>>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [duration, setDuration] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [totalPairs, setTotalPairs] = useState(6);

  const loadBest = useCallback(() => {
    const stored = localStorage.getItem('neuroAthlete_bestMemoryScore');
    if (stored) setBestScore(parseInt(stored, 10));
  }, []);

  useEffect(() => {
    loadBest();
  }, [loadBest]);

  const getPairsForDifficulty = (diff: Difficulty): number => {
    switch (diff) {
      case 'easy': return 4;
      case 'medium': return 6;
      case 'hard': return 8;
    }
  };

  const startGame = (diff: Difficulty) => {
    const pairs = getPairsForDifficulty(diff);
    setDifficulty(diff);
    setTotalPairs(pairs);
    const newGrid = generateMemoryGrid(pairs);
    setGrid(newGrid);
    setSelectedCards([]);
    setMatchedPairs(0);
    setAttempts(0);
    setStartTime(Date.now());
    setPhase('playing');
  };

  const handleCardClick = (cardId: string) => {
    if (phase !== 'playing') return;
    if (selectedCards.length >= 2) return;

    const card = grid.find(c => c.id === cardId);
    if (!card || card.revealed || card.matched) return;

    const newGrid = grid.map(c => c.id === cardId ? { ...c, revealed: true } : c);
    setGrid(newGrid);

    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setAttempts(prev => prev + 1);
      const [first, second] = newSelected;
      const firstCard = newGrid.find(c => c.id === first);
      const secondCard = newGrid.find(c => c.id === second);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        setTimeout(() => {
          setGrid(prev => prev.map(c => c.id === first || c.id === second ? { ...c, matched: true } : c));
          setMatchedPairs(prev => {
            const newMatched = prev + 1;
            if (newMatched === totalPairs) {
              const endTime = Date.now();
              const durationSec = (endTime - (startTime || endTime)) / 1000;
              const finalScore = calculateMemoryScore(totalPairs, attempts + 1, durationSec);
              setScore(finalScore);
              setDuration(durationSec);
              saveMemoryResult(finalScore, getPairsForDifficulty(difficulty), totalPairs, durationSec);
              if (bestScore === null || finalScore > bestScore) {
                localStorage.setItem('neuroAthlete_bestMemoryScore', finalScore.toString());
                setBestScore(finalScore);
              }
              setTimeout(() => setPhase('results'), 500);
            }
            return newMatched;
          });
          setSelectedCards([]);
        }, 400);
      } else {
        setTimeout(() => {
          setGrid(prev => prev.map(c => c.id === first || c.id === second ? { ...c, revealed: false } : c));
          setSelectedCards([]);
        }, 800);
      }
    }
  };

  const reset = () => {
    setPhase('idle');
    setSelectedCards([]);
    setMatchedPairs(0);
    setAttempts(0);
    setStartTime(null);
    setDuration(0);
    setScore(0);
    loadBest();
  };

  const getEvaluation = (score: number): { text: string; color: string } => {
    if (score >= 90) return { text: 'Wybitny!', color: 'text-green-600' };
    if (score >= 75) return { text: 'Dobry', color: 'text-blue-600' };
    if (score >= 60) return { text: 'Średni', color: 'text-yellow-600' };
    return { text: 'Do poprawy', color: 'text-red-600' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <head>
        <title>Trening pamięci - NeuroAthlete</title>
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
            <a href="/reaction-test" className="text-gray-600 hover:text-blue-600 font-medium">Test refleksu</a>
            <a href="/focus-training" className="text-gray-600 hover:text-blue-600 font-medium">Trening koncentracji</a>
            <a href="/memory-training" className="text-purple-600 font-medium">Trening pamięci</a>
            <a href="/statistics" className="text-gray-600 hover:text-blue-600 font-medium">Statystyki</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Trening pamięci</h1>
            <p className="text-lg text-gray-600">
              Odkrywaj pary kart i trenuj swoją pamięć. Znajdź wszystkie pary jak najszybciej!
            </p>
          </div>

          {phase === 'idle' && (
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center space-y-6">
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-purple-800 mb-4">Wybierz poziom trudności</h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => startGame('easy')}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                      Łatwy (4 pary)
                    </button>
                    <button
                      onClick={() => startGame('medium')}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                      Średni (6 par)
                    </button>
                    <button
                      onClick={() => startGame('hard')}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                      Trudny (8 par)
                    </button>
                  </div>
                </div>

                <div className="text-left space-y-2 text-gray-600">
                  <p>🔹 <strong>Łatwy:</strong> 4 pary kart - idealny na początek</p>
                  <p>🔹 <strong>Średni:</strong> 6 par kart - standardowy trening</p>
                  <p>🔹 <strong>Trudny:</strong> 8 par kart - dla zaawansowanych</p>
                </div>

                {bestScore !== null && (
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Twój najlepszy wynik</p>
                    <p className="text-2xl font-bold text-purple-600">{bestScore}%</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {(phase === 'playing' || phase === 'results') && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-600">Postęp: </span>
                    <span className="font-bold text-purple-600">{matchedPairs}/{totalPairs} par</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Próby: </span>
                    <span className="font-bold text-blue-600">{attempts}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Poziom: </span>
                    <span className="font-bold text-green-600">
                      {difficulty === 'easy' ? 'Łatwy' : difficulty === 'medium' ? 'Średni' : 'Trudny'}
                    </span>
                  </div>
                </div>
              </div>

              {phase === 'playing' && (
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div
                    className="grid gap-3 mx-auto"
                    style={{
                      gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(totalPairs * 2))}, minmax(0, 1fr))`,
                      maxWidth: '500px'
                    }}
                  >
                    {grid.map((card) => (
                      <button
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        disabled={card.revealed || card.matched}
                        className={`
                          aspect-square text-4xl font-bold rounded-lg transition-all duration-300
                          ${card.revealed || card.matched
                            ? 'bg-purple-100 border-2 border-purple-300 transform scale-105'
                            : 'bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 transform hover:scale-105 shadow-md'
                          }
                          ${card.matched ? 'opacity-60' : ''}
                        `}
                        style={{
                          cursor: card.revealed || card.matched ? 'default' : 'pointer'
                        }}
                      >
                        {card.revealed || card.matched ? (
                          <span className="text-purple-800">{card.emoji}</span>
                        ) : (
                          <span className="text-white text-2xl">?</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {phase === 'results' && (
                <div className="bg-white rounded-2xl p-8 shadow-lg text-center space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Wyniki</h2>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">Wynik</p>
                      <p className="text-2xl font-bold text-purple-600">{score}%</p>
                      <p className={`text-sm font-medium ${getEvaluation(score).color}`}>
                        {getEvaluation(score).text}
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">Czas</p>
                      <p className="text-2xl font-bold text-blue-600">{formatTime(duration * 1000)}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">Najlepszy</p>
                      <p className="text-2xl font-bold text-green-600">
                        {bestScore !== null ? `${bestScore}%` : '--'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600">
                      Pełne pary: <span className="font-bold text-gray-800">{totalPairs}</span> | 
                      Próby: <span className="font-bold text-gray-800">{attempts}</span> |
                      Poziom: <span className="font-bold text-gray-800">
                        {difficulty === 'easy' ? 'Łatwy' : difficulty === 'medium' ? 'Średni' : 'Trudny'}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={reset}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                      Wybierz poziom
                    </button>
                    <button
                      onClick={() => startGame(difficulty)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                      Powtórz
                    </button>
                    <a
                      href="/statistics"
                      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-200"
                    >
                      Statystyki
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 NeuroAthlete. Aplikacja do treningu umiejętności poznawczych dla sportowców.
          </p>
        </div>
      </footer>
    </div>
  );
}
