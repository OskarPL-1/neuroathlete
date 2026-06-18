export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      {/* Nagłówek */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">NeuroAthlete</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-600 hover:text-blue-600 font-medium">Strona główna</a>
            <a href="/reaction-test" className="text-gray-600 hover:text-blue-600 font-medium">Test refleksu</a>
            <a href="/focus-training" className="text-gray-600 hover:text-blue-600 font-medium">Trening koncentracji</a>
            <a href="/statistics" className="text-gray-600 hover:text-blue-600 font-medium">Statystyki</a>
          </nav>
        </div>
      </header>

      {/* Główna zawartość */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full text-center">
          {/* Główny tytuł */}
          <div className="mb-8">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
                Trening <span className="text-blue-600">refleksu</span>, <span className="text-green-600">koncentracji</span> i <span className="text-purple-600">pamięci</span>
              </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Rozwijaj swoje umiejętności poznawcze i poprawiaj wyniki w sportach walki.
              NeuroAthlete pomaga sportowcom osiągać lepsze rezultaty poprzez systematyczny trening.
            </p>
          </div>

          {/* Statystyki */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">⚡</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Szybkość reakcji</h3>
              <p className="text-gray-600">Popraw swój czas reakcji o nawet 20%</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">🎯</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Koncentracja</h3>
              <p className="text-gray-600">Trenuj skupienie uwagi w stresujących sytuacjach</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">🧠</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Pamięć</h3>
              <p className="text-gray-600">Rozwijaj pamięć wzrokową i zdolności zapamiętywania</p>
            </div>
          </div>

          {/* Przyciski akcji */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/reaction-test"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              🚀 Rozpocznij trening refleksu
            </a>
            <a
              href="/focus-training"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              🎯 Trening koncentracji
            </a>
            <a
              href="/memory-training"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              🧠 Trening pamięci
            </a>
          </div>

          {/* Dodatkowe informacje */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Dlaczego warto trenować z NeuroAthlete?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">✅ Dla sportowców</h4>
                <p className="text-gray-600">Dedykowane ćwiczenia dla taekwondo, MMA i innych sportów walki</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">✅ Bezpłatnie</h4>
                <p className="text-gray-600">Podstawowe treningi dostępne za darmo dla wszystkich użytkowników</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">✅ Prosto i szybko</h4>
                <p className="text-gray-600">Intuicyjny interfejs, treningi trwają zaledwie kilka minut</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">✅ Mierzalne efekty</h4>
                <p className="text-gray-600">Dokładne statystyki i śledzenie postępów w czasie</p>
              </div>
            </div>
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
