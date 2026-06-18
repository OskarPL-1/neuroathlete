# NeuroAthlete - Trening umiejętności poznawczych dla sportowców

Aplikacja SaaS do rozwijania refleksu i koncentracji użytkowników, specjalnie skierowana do sportowców sportów walki (taekwondo, MMA).

## 🚀 Szybki start

```bash
# Instalacja zależności
npm install

# Uruchomienie w trybie deweloperskim
npm run dev

# Build produkcyjny
npm run build

# Uruchomienie serwera produkcyjnego
npm run start

# Testy
npm run test
npm run test:watch
npm run test:coverage
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## 📁 Struktura projektu

```
neuro-athlete/
├── app/                    # Strony Next.js App Router
│   ├── page.tsx           # Strona główna
│   ├── reaction-test/     # Test refleksu
│   ├── focus-training/    # Trening koncentracji
│   └── statistics/        # Statystyki użytkownika
├── implementation/        # Logika biznesowa
│   ├── plan_funkcji.ts    # Typy i funkcje
│   ├── plan_komponentow.tsx # Szablony komponentów
│   └── ...               # Plany stron i stylów
├── workflows/             # Dokumentacja procesowa
└── docs/                  # Analiza projektowa
```

## 🧪 Testy

Projekt używa **Jest** + **React Testing Library**.

### Konfiguracja
```
# Uruchom wszystkie testy
npm run test

# Testy z watch mode
npm run test:watch

# Pokrycie kodu
npm run test:coverage
```

### Przykładowe testy
```typescript
// tests/formatTime.test.ts
import { formatTime } from '../implementation/plan_funkcji';

describe('formatTime', () => {
  it('should format milliseconds correctly', () => {
    expect(formatTime(250)).toBe('250 ms');
  });

  it('should format seconds for long times', () => {
    expect(formatTime(1500)).toBe('1.50 s');
  });
});
```

## 🛠️ Technologie

- **Next.js 16** - Framework React
- **React 19** - Biblioteka UI
- **TypeScript** - Typowanie statyczne
- **Tailwind CSS 4** - Styling
- **Jest** - Testy jednostkowe
- **localStorage** - Przechowywanie danych (bez backendu w MVP)

## 📱 Responsywność

Aplikacja działa na:
- Desktop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

## 🎯 Funkcjonalności

### Test refleksu (/reaction-test)
- Losowy czas oczekiwania 1-5 sekund
- Pomiar czasu reakcji w ms
- Ocena wyniku (Wybitny/Dobry/Średni/Do poprawy)
- Zapis wyników do localStorage

### Trening koncentracji (/focus-training)
- Sterowanie klawiszami ⬆⬇ lub W/S
- 10 rund treningu
- Wykrywanie błędów
- Obliczanie wyniku punktowego
- Zapis wyników do localStorage

### Statystyki (/statistics)
- Średni czas reakcji
- Najlepszy wynik
- Wykresy postępów
- Historia treningów

## 🚀 Deployment

### Vercel (rekomendowane)
```bash
npm run build
# Import projektu w Vercelze lub użyj Vercel CLI
```

### Inne platformy
- Dowolny hosting Node.js
- Wymagane zmienne środowiskowe: brak (MVP)

## 👤 Autor
Oskar Wyszkowski - Kognitywistyka  
Projekt: Tworzenie aplikacji internetowych  
Data: 2026