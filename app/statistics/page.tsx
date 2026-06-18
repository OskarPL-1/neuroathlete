'use client';

import { useState, useEffect } from 'react';
import { getReactionResults, getFocusResults, getMemoryResults, calculateUserStats, formatTime } from '../../implementation/plan_funkcji';

export default function Statistics() {
  const [reactionResults, setReactionResults] = useState<Array<{id: string; timestamp: number; reactionTime: number}>>([]);
  const [focusResults, setFocusResults] = useState<Array<{id: string; timestamp: number; score: number; duration: number}>>([]);
  const [memoryResults, setMemoryResults] = useState<Array<{id: string; timestamp: number; score: number; level: number; correctPairs: number; duration: number}>>([]);
  const [stats, setStats] = useState({
    averageReactionTime: 0,
    bestReactionTime: 0,
    totalSessions: 0,
    averageFocusScore: 0,
    bestFocusScore: 0,
    averageMemoryScore: 0,
    bestMemoryScore: 0
  });

  useEffect(() => {
    const reactionData = getReactionResults();
    const focusData = getFocusResults();
    const memoryData = getMemoryResults();
    const calculatedStats = calculateUserStats();
    
    setReactionResults(reactionData);
    setFocusResults(focusData);
    setMemoryResults(memoryData);
    setStats(calculatedStats);
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Nagłówek */}
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
            <a href="/memory-training" className="text-gray-600 hover:text-purple-600 font-medium">Trening pamięci</a>
            <a href="/statistics" className="text-blue-600 font-medium">Statystyki</a>
          </nav>
        </div>
      </header>

      {/* Główna zawartość */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Statystyki treningów</h1>
            <p className="text-lg text-gray-600">
              Przeglądaj swoje postępy i analizuj wyniki z treningów
            </p>
          </div>

          {/* Karty z podsumowaniem */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-sm text-gray-500 mb-1">Średni czas reakcji</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.averageReactionTime > 0 ? formatTime(stats.averageReactionTime) : '--'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-2">🎯</div>
              <p className="text-sm text-gray-500 mb-1">Średni wynik koncentracji</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.averageFocusScore > 0 ? `${stats.averageFocusScore}%` : '--'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-2">🧠</div>
              <p className="text-sm text-gray-500 mb-1">Średni wynik pamięci</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.averageMemoryScore > 0 ? `${stats.averageMemoryScore}%` : '--'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-sm text-gray-500 mb-1">Łączna sesji</p>
              <p className="text-2xl font-bold text-orange-600">{stats.totalSessions}</p>
            </div>
          </div>

          {/* Wykres czasu reakcji */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Historia testów refleksu</h2>
            {reactionResults.length > 0 ? (
              <div className="h-64">
                <div className="flex items-end justify-between h-48 border-b border-gray-200 pb-4">
                  {reactionResults.slice(-10).map((result, index) => (
                    <div key={result.id} className="flex flex-col items-center">
                      <div 
                        className="bg-blue-500 rounded-t w-8 transition-all duration-300 hover:bg-blue-600"
                        style={{ height: `${Math.min((result.reactionTime / 500) * 100, 100)}%` }}
                        title={`${formatTime(result.reactionTime)} - ${formatDate(result.timestamp)}`}
                      />
                      <span className="text-xs text-gray-500 mt-2">
                        {formatDate(result.timestamp).substring(0, 5)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 text-center mt-4">
                  Ostatnie 10 testów (niższa słupa = lepszy czas)
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Brak danych z testów refleksu</p>
                <a
                  href="/reaction-test"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Rozpocznij test refleksu
                </a>
              </div>
            )}
          </div>

          {/* Wykres wyników koncentracji */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Historia treningów koncentracji</h2>
            {focusResults.length > 0 ? (
              <div className="h-64">
                <div className="flex items-end justify-between h-48 border-b border-gray-200 pb-4">
                  {focusResults.slice(-10).map((result) => (
                    <div key={result.id} className="flex flex-col items-center">
                      <div 
                        className="bg-green-500 rounded-t w-8 transition-all duration-300 hover:bg-green-600"
                        style={{ height: `${result.score}%` }}
                        title={`${result.score}% - ${formatDate(result.timestamp)}`}
                      />
                      <span className="text-xs text-gray-500 mt-2">
                        {formatDate(result.timestamp).substring(0, 5)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 text-center mt-4">
                  Ostatnie 10 treningów (wyższa słupa = lepszy wynik)
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Brak danych z treningów koncentracji</p>
                <a
                  href="/focus-training"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Rozpocznij trening koncentracji
                </a>
              </div>
            )}
          </div>

          {/* Wykres wyników pamięci */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Historia treningów pamięci</h2>
            {memoryResults.length > 0 ? (
              <div className="h-64">
                <div className="flex items-end justify-between h-48 border-b border-gray-200 pb-4">
                  {memoryResults.slice(-10).map((result) => (
                    <div key={result.id} className="flex flex-col items-center">
                      <div 
                        className="bg-purple-500 rounded-t w-8 transition-all duration-300 hover:bg-purple-600"
                        style={{ height: `${result.score}%` }}
                        title={`${result.score}% - ${formatDate(result.timestamp)}`}
                      />
                      <span className="text-xs text-gray-500 mt-2">
                        {formatDate(result.timestamp).substring(0, 5)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 text-center mt-4">
                  Ostatnie 10 treningów (wyższa słupa = lepszy wynik)
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Brak danych z treningów pamięci</p>
                <a
                  href="/memory-training"
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Rozpocznij trening pamięci
                </a>
              </div>
            )}
          </div>

          {/* Tabela ze wszystkimi wynikami */}
          {(reactionResults.length > 0 || focusResults.length > 0) && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Szczegółowa historia</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Typ</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wynik</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[...reactionResults.map(r => ({ ...r, type: 'Refleks' })), 
                      ...focusResults.map(f => ({ ...f, type: 'Koncentracja' })),
                      ...memoryResults.map(m => ({ ...m, type: 'Pamięć' }))]
                      .sort((a: any, b: any) => b.timestamp - a.timestamp)
                      .slice(0, 20)
                      .map((result: any, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {formatDate(result.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            result.type === 'Refleks' ? 'bg-blue-100 text-blue-800' : 
                            result.type === 'Koncentracja' ? 'bg-green-100 text-green-800' : 
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {result.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {result.type === 'Refleks' 
                            ? formatTime(result.reactionTime)
                            : `${result.score}%`
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Przyciski akcji */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="/reaction-test"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-200"
            >
              → Test refleksu
            </a>
            <a
              href="/focus-training"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-200"
            >
              → Trening koncentracji
            </a>
            <a
              href="/memory-training"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-200"
            >
              → Trening pamięci
            </a>
          </div>
        </div>
      </main>

      {/* Stopka */}
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