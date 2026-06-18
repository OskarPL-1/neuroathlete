# Plan stron aplikacji NeuroAthlete

## 1. Strona główna (/)

**Opis:** Główna strona powitalna aplikacji.

**Elementy:**
- Logo aplikacji
- Krótki opis funkcjonalności
- Przycisk "Rozpocznij trening"
- Nawigacja do innych sekcji

**Funkcjonalność:**
- Przekierowanie do treningu refleksu
- Linki do dokumentacji

**Design:**
- Centrowany layout
- Kolory sportowe (niebieski, zielony)
- Responsywność na urządzenia mobilne

---

## 2. Strona testu refleksu (/reaction-test)

**Opis:** Główny trening refleksu dla użytkowników.

**Elementy:**
- Instrukcje dla użytkownika
- Przycisk rozpoczęcia testu
- Wyświetlacz bodźca (kolorowy kwadrat)
- Licznik czasu reakcji
- Przycisk powtórzenia

**Funkcjonalność:**
- Pomiar czasu reakcji
- Zapis wyników w localStorage
- Animacje dla lepszego UX

**Design:**
- Prosty, skoncentrowany interfejs
- Duże elementy interaktywne
- Kolory zmieniające się podczas testu

---

## 3. Strona treningu koncentracji (/focus-training)

**Opis:** Trening umiejętności skupienia uwagi.

**Elementy:**
- Licznik czasu (30 sekund)
- Cele do kliknięcia na planszy
- Licznik punktów
- Przycisk rozpoczęcia treningu

**Funkcjonalność:**
- Generowanie losowych celów
- Obliczanie punktów za trafienia
- Licznik czasu z automatycznym zakończeniem

**Design:**
- Plansza gry z ruchomymi celami
- Animacje trafień
- Progress bar czasu

---

## 4. Strona statystyk (/statistics)

**Opis:** Wyświetlanie postępów użytkownika.

**Elementy:**
- Wykres średniego czasu reakcji
- Wykres wyników koncentracji
- Tabela historii treningów
- Statystyki podsumowujące

**Funkcjonalność:**
- Ładowanie danych z localStorage
- Obliczanie średnich wartości
- Filtrowanie wyników po dacie

**Design:**
- Karty z kluczowymi metrykami
- Tabela z historią
- Wykresy proste i czytelne

---

## 5. Strona ustawień (/settings) - przyszła funkcjonalność

**Opis:** Konfiguracja aplikacji.

**Elementy:**
- Przełącznik ciemnego trybu
- Ustawienia dźwięków
- Reset danych
- Informacje o aplikacji

**Funkcjonalność:**
- Zapisywanie preferencji w localStorage
- Reset wszystkich danych

---

## 6. Strona pomocy (/help) - przyszła funkcjonalność

**Opis:** Instrukcje i wskazówki dla użytkowników.

**Elementy:**
- FAQ
- Tutorial krok po kroku
- Kontakt

**Funkcjonalność:**
- Accordion z pytaniami
- Linki do zewnętrznych zasobów

---

## Struktura nawigacji

- Header z menu nawigacyjnym na każdej stronie
- Footer z linkami do pomocy i ustawień
- Breadcrumbs dla lepszej orientacji

---

## Responsywność

Wszystkie strony muszą być:
- Optymalizowane na urządzenia mobilne (pierwszeństwo)
- Funkcjonalne na tabletach
- Czytelne na desktopach

---

## Dostępność

- Obsługa klawiatury
- Czytniki ekranowe
- Kontrast kolorów
- Rozmiary czcionek dostosowane

---

## Podsumowanie

Strony aplikacji są proste i skoncentrowane na jednej funkcjonalności każda, co zapewnia łatwą nawigację i szybkie ładowanie.