'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocalStorage, saveFocusResult, getFocusResults, formatTime } from '../../implementation/plan_funkcji';

type Phase = 'idle' | 'playing' | 'result';
type Direction = 'up' | 'down';

type Target = {
  position: number;
  direction: Direction;
};

export default function FocusTraining() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [target, setTarget] = useState<Target | null>(null);
  const [round, setRound] = useState(1);
  const totalRounds = 10;
  const [errors, setErrors] = useState(0);
  const [bestScore, setBestScore] = useLocalStorage<number | null>('neuroAthlete_bestFocusScore', null);
  const [results, setResults] = useLocalStorage<Array<{id: string; timestamp: number; score: number; duration: number}>>('neuroAthlete_focusResults', []);

  const phaseRef = useRef(phase);
  const targetRef = useRef(target);
  const roundRef = useRef(round);
  const errorsRef = useRef(errors);
  const bestScoreRef = useRef(bestScore);
  const setResultsRef = useRef(setResults);
  const setBestScoreRef = useRef(setBestScore);
  const setPhaseRef = useRef(setPhase);
  const setRoundRef = useRef(setRound);
  const setErrorsRef = useRef(setErrors);
  const setTargetRef = useRef(setTarget);

  phaseRef.current = phase;
  targetRef.current = target;
  roundRef.current = round;
  errorsRef.current = errors;
  bestScoreRef.current = bestScore;
  setResultsRef.current = setResults;
  setBestScoreRef.current = setBestScore;
  setPhaseRef.current = setPhase;
  setRoundRef.current = setRound;
  setErrorsRef.current = setErrors;
  setTargetRef.current = setTarget;

  const spawnTarget = () => {
    const direction = Math.random() < 0.5 ? 'up' : 'down';
    const offset = direction === 'up' ? -15 : 11;
    setTarget({ position: offset, direction });
    targetRef.current = { position: offset, direction };
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (phaseRef.current !== 'playing' || !targetRef.current) return;

      const moveUp = e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W';
      const moveDown = e.key === 'ArrowDown' || e.key === 's' || e.key === 'S';
      const move = moveUp ? -1 : moveDown ? 1 : 0;
      if (move === 0) return;

      const currentTarget = targetRef.current;
      const correct = currentTarget.direction === 'up' ? -1 : 1;
      const tolerance = 2;
      const newPos = currentTarget.position + move;
      const absDistance = Math.abs(currentTarget.position);
      const veryClose = absDistance <= tolerance + Math.abs(move);
      const overCorrect = (correct === -1 && newPos <= 0) || (correct === 1 && newPos >= 0);

      const currentRound = roundRef.current;
      const currentErrors = errorsRef.current;

      if (veryClose && overCorrect) {
        const nextRound = currentRound + 1;
        if (nextRound > totalRounds) {
          const score = Math.max(100 - currentErrors * 10, 0);
          setPhaseRef.current('result');
          setResultsRef.current(prev => [...prev, { id: Date.now().toString(), timestamp: Date.now(), score, duration: 0 }]);
          if (bestScoreRef.current === null || score > bestScoreRef.current) setBestScoreRef.current(score);
        } else {
          setRoundRef.current(nextRound);
          roundRef.current = nextRound;
          spawnTarget();
        }
      } else {
        const nextErrors = currentErrors + 1;
        setErrorsRef.current(nextErrors);
        errorsRef.current = nextErrors;
        const nextRound = currentRound + 1;
        if (nextRound > totalRounds) {
          const score = Math.max(100 - nextErrors * 10, 0);
          setPhaseRef.current('result');
          setResultsRef.current(prev => [...prev, { id: Date.now().toString(), timestamp: Date.now(), score, duration: 0 }]);
          if (bestScoreRef.current === null || score > bestScoreRef.current) setBestScoreRef.current(score);
        } else {
          setRoundRef.current(nextRound);
          roundRef.current = nextRound;
          spawnTarget();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const startPractice = () => {
    setPhase('playing');
    setRound(1);
    setErrors(0);
    phaseRef.current = 'playing';
    roundRef.current = 1;
    errorsRef.current = 0;
    spawnTarget();
  };

  const startTest = () => {
    setPhase('playing');
    setRound(1);
    setErrors(0);
    phaseRef.current = 'playing';
    roundRef.current = 1;
    errorsRef.current = 0;
    spawnTarget();
  };

  const reset = () => {
    setPhase('idle');
    setRound(1);
    setErrors(0);
    setTarget(null);
    phaseRef.current = 'idle';
    roundRef.current = 1;
    errorsRef.current = 0;
    targetRef.current = null;
  };

  const score = Math.max(100 - errors * 10, 0);
  const guideY = 50;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <head>
        <title>Trening koncentracji - NeuroAthlete</title>
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
            <a href="/focus-training" className="text-blue-600 font-medium">Trening koncentracji</a>
            <a href="/memory-training" className="text-gray-600 hover:text-purple-600 font-medium">Trening pamięci</a>
            <a href="/statistics" className="text-gray-600 hover:text-blue-600 font-medium">Statystyki</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Trening koncentracji</h1>
            <p className="text-lg text-gray-600">
              Dopasuj ruch obiektu do kierunku strzałki. Używaj klawiszy \u2191/\u2193 lub W/S.
            </p>
          </div>

          {phase === 'idle' && (
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center space-y-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">Jak to działa?</h3>
                  <div className="text-gray-700 space-y-2">
                    <p>Strza\u0142ka pokazuje kierunek, w kt\u00f3ry obiekt powinien przej\u015b\u0107.</p>
                    <p>Naciskaj \u2191 lub W aby przesun\u0105\u0107 w g\u00f3r\u0119, \u2193 lub S aby przesun\u0105\u0107 w d\u00f3\u0142.</p>
                    <p>Wykonuj ruch dok\u0142adnie w momencie dotkni\u0119cia linii przeszkody.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={startPractice}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Trening pr\u00f3bny
                  </button>
                  <button
                    onClick={startTest}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Rozpocznij test
                  </button>
                </div>
              </div>
            </div>
          )}

          {phase === 'playing' && target && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-600">Runda: </span>
                    <span className="font-bold text-blue-600">{round}/{totalRounds}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Błędy: </span>
                    <span className={`font-bold ${errors > 3 ? 'text-red-600' : 'text-green-600'}`}>{errors}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg relative" style={{ height: '300px' }}>
                <svg
                  viewBox="0 0 200 300"
                  className="w-full h-full"
                  style={{ maxWidth: '330px', margin: '0 auto', display: 'block' }}
                >
                  <line x1="100" y1="20" x2="100" y2="280" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="6,4" />
                  <line x1="20" y1="150" x2="180" y2="150" stroke="#e5e7eb" strokeWidth="0.5" />
                  <text x="185" y="154" fontSize="9" fill="#9ca3af">0</text>
                  <text x="185" y="250" fontSize="9" fill="#9ca3af">↑</text>

                  <line x1={100 - 5} y1={guideY} x2={100 + 5} y2={guideY} stroke="#ef4444" strokeWidth="2" />
                  <text x="100" y={guideY - 8} fontSize="10" fill="#ef4444" textAnchor="middle">STREFA</text>

                  {Math.abs(target.position ?? 0) <= 2 && (
                    <text x="100" y={guideY + 20} fontSize="10" fill="#ef4444" textAnchor="middle">TERAZ!</text>
                  )}

                  {target && (
                    <circle cx={100 + target.position} cy={guideY} r={4} fill={target.direction === 'up' ? '#3b82f6' : '#ef4444'} />
                  )}
                </svg>

                <p className="text-center text-gray-500 text-sm mt-2">
                  Użyj \u2191/\u2193 lub W/S do poruszania obiektem
                </p>
              </div>
            </div>
          )}

          {phase === 'result' && (
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Wyniki testu</h2>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Wynik</p>
                  <p className="text-2xl font-bold text-blue-600">{score}%</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Błędy</p>
                  <p className="text-2xl font-bold text-red-600">{errors}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Najlepszy</p>
                  <p className="text-2xl font-bold text-green-600">
                    {bestScore !== null ? `${bestScore}%` : '--'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={reset}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Powtórz test
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
