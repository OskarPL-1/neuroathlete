# Plan testów - Strategia testowania aplikacji NeuroAthlete

## 1. Wprowadzenie

Strategia testowania aplikacji NeuroAthlete obejmuje kompleksowe podejście do zapewnienia jakości, wydajności i niezawodności aplikacji webowej przeznaczonej dla sportowców.

---

## 2. Rodzaje testów

### 2.1 Testy jednostkowe (Unit Tests)

**Narzędzia:** Jest, React Testing Library

**Zakres:**
- Testowanie funkcji logicznych (plan_funkcji.ts)
- Testowanie komponentów React
- Testowanie hooków i utilów

**Przykłady testów:**
```typescript
describe('calculateReactionTime', () => {
  it('powinien obliczyć prawidłowy czas reakcji', () => {
    const startTime = 1000;
    jest.spyOn(Date, 'now').mockReturnValue(1250);
    expect(calculateReactionTime(startTime)).toBe(250);
  });
});

describe('ReactionTest Component', () => {
  it('powinien wyświetlić przycisk rozpoczęcia', () => {
    render(<ReactionTest />);
    expect(screen.getByText('Przygotuj się')).toBeInTheDocument();
  });
});
```

**Kryteria sukcesu:** Min. 80% pokrycia kodu

---

### 2.2 Testy integracyjne (Integration Tests)

**Narzędzia:** Jest, React Testing Library, TestCafe

**Zakres:**
- Interakcje między komponentami
- Przepływ danych w aplikacji
- Integracja z localStorage
- Responsywność interfejsu

**Scenariusze testowe:**
- Kompletny przepływ treningu refleksu
- Zapisywanie i ładowanie wyników
- Nawigacja między stronami

---

### 2.3 Testy end-to-end (E2E Tests)

**Narzędzia:** Playwright, Cypress

**Zakres:**
- Kompletne scenariusze użytkownika
- Testy na różnych przeglądarkach
- Testy mobilne (urządzenia dotykowe)

**Główne scenariusze:**
1. Rejestracja nowego użytkownika
2. Wykonanie treningu refleksu
3. Przejście do statystyk
4. Reset danych

---

### 2.4 Testy wydajności (Performance Tests)

**Narzędzia:** Lighthouse, WebPageTest

**Metryki:**
- Czas ładowania strony < 2s
- Time to Interactive < 3s
- Rozmiar bundle < 500KB
- Ocena Lighthouse > 90

---

### 2.5 Testy dostępności (Accessibility Tests)

**Narzędzia:** axe-core, Lighthouse Accessibility

**Kryteria:**
- Zgodność z WCAG 2.1 AA
- Obsługa klawiatury
- Czytniki ekranowe
- Kontrast kolorów

---

## 3. Strategia testowania

### 3.1 Test-Driven Development (TDD)

- Pisanie testów przed implementacją funkcji
- Czerwony → Zielony → Refaktor

### 3.2 Continuous Integration (CI)

- Automatyczne uruchamianie testów przy każdym push
- GitHub Actions workflow
- Blokowanie merge przy niepowodzeniu testów

---

## 4. Środowisko testowe

### 4.1 Local Development
- Uruchamianie testów: `npm run test`
- Coverage report: `npm run test:coverage`

### 4.2 Staging Environment
- Testy E2E na stagingowej wersji
- Testy akceptacyjne z użytkownikami

### 4.3 Production
- Monitoring błędów (Sentry)
- A/B testing dla nowych funkcji

---

## 5. Test Cases - Szczegółowe scenariusze

### 5.1 Test refleksu

**TC001:** Poprawny pomiar czasu reakcji
- Warunki: Użytkownik klika w odpowiednim momencie
- Oczekiwania: Czas < 500ms, zapis do localStorage

**TC002:** Za późna reakcja
- Warunki: Użytkownik klika po 2 sekundach
- Oczekiwania: Brak zapisu, komunikat o błędzie

### 5.2 Test koncentracji

**TC003:** Trafienie wszystkich celów
- Warunki: Użytkownik trafia wszystkie cele w czasie
- Oczekiwania: Wynik 100%, bonus czasowy

**TC004:** Upływ czasu
- Warunki: Czas treningu kończy się
- Oczekiwania: Automatyczne zakończenie, zapis wyniku

### 5.3 Statystyki

**TC005:** Wyświetlanie średnich wartości
- Warunki: Istnieją zapisane wyniki
- Oczekiwania: Poprawne obliczenia średnich

**TC006:** Brak danych
- Warunki: Brak wyników w localStorage
- Oczekiwania: Komunikat "Brak danych"

---

## 6. Raportowanie błędów

### 6.1 Format zgłoszenia błędu
```
Tytuł: [Moduł] Krótki opis błędu

Opis:
- Kroki reprodukcji
- Oczekiwania
- Rzeczywisty wynik
- Środowisko (przeglądarka, urządzenie)

Załączniki:
- Zrzuty ekranu
- Logi konsoli
- Dane testowe
```

### 6.2 Priorytety błędów
- **Krytyczny:** Aplikacja nie działa
- **Wysoki:** Główna funkcjonalność uszkodzona
- **Średni:** Pomniejsze błędy UX
- **Niski:** Sugestie ulepszeń

---

## 7. Metryki jakości

### 7.1 Pokrycie kodu
- Unit tests: > 80%
- Integration tests: > 70%
- E2E tests: > 50%

### 7.2 Czas wykonania testów
- Unit tests: < 30s
- Integration tests: < 2min
- E2E tests: < 5min

### 7.3 Defect Density
- < 0.5 błędów na 1000 linii kodu

---

## 8. Plan testów regresyjnych

- Po każdej zmianie: uruchomienie pełnego zestawu unit tests
- Przed release: pełne testy integracyjne i E2E
- Miesięcznie: pełny audyt dostępności i wydajności

---

## 9. Narzędzia i konfiguracja

### package.json
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "type-check": "tsc --noEmit"
  }
}
```

### Konfiguracja Jest
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**'
  ]
};
```

---

## 10. Podsumowanie

Strategia testowania zapewnia:
- **Jakość kodu:** Poprzez testy jednostkowe i integracyjne
- **Doświadczenie użytkownika:** Poprzez testy E2E i dostępności
- **Wydajność:** Poprzez monitoring i testy wydajności
- **Nieprzerywalność:** Poprzez CI/CD i testy regresyjne

Regularne wykonywanie testów minimalizuje ryzyko błędów w produkcji i zapewnia satysfakcjonujące doświadczenie użytkowników.