# WF_Frontend_Implementation.md - Implementacja interfejsu użytkownika

## 1. Cel dokumentu

Celem jest opis implementacji frontend aplikacji NeuroAthlete, w tym komponentów, stron i interakcji użytkownika.

---

## 2. Technologia

- Framework: Next.js 14
- Styling: Tailwind CSS
- Komponenty: React

---

## 3. Struktura aplikacji

### Strony główne

1. **Strona główna (/)**  
   - Ekran powitalny  
   - Przycisk "Rozpocznij trening"  
   - Krótki opis aplikacji

2. **Trening (/training)**  
   - Ekran treningu refleksu  
   - Licznik czasu  
   - Instrukcje dla użytkownika

3. **Wyniki (/results)**  
   - Wyświetlanie wyniku  
   - Porównanie z poprzednimi  
   - Przycisk "Powtórz"

---

## 4. Komponenty kluczowe

### ReactionTest Component

- Bodziec wizualny (kolorowy kwadrat)  
- Obsługa kliknięć  
- Pomiar czasu reakcji

### Statistics Component

- Wykres postępów  
- Średni czas  
- Historia treningów

### Navigation Component

- Menu nawigacyjne  
- Responsywność

---

## 5. User Flow

1. Użytkownik otwiera stronę  
2. Wybiera trening  
3. Wykonuje zadanie  
4. Widzi wynik  
5. Może powtórzyć

---

## 6. Design Principles

- Minimalizm  
- Szybkość interakcji  
- Kolory sportowe (czerwony, niebieski)  
- Responsywność na urządzenia mobilne

---

## Podsumowanie

Frontend skupia się na prostocie i szybkości użytkowania.