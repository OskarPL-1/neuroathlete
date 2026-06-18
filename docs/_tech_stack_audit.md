# Tech Stack Audit – NeuroAthlete

## 1. Cel dokumentu

Celem jest wybór odpowiedniego stosu technologicznego (tech stack) dla aplikacji NeuroAthlete, uwzględniając:

- szybkość developmentu  
- prostotę  
- skalowalność  
- koszty  

---

## 2. Założenia techniczne

Projekt MVP powinien być:

- prosty do wdrożenia  
- możliwy do stworzenia przez 1 osobę  
- tani w utrzymaniu  
- łatwy do rozbudowy  

---

## 3. Typ aplikacji

👉 Aplikacja mobilna (cross-platform)

Powód:
- użytkownicy (sportowcy) korzystają głównie z telefonu  
- szybki dostęp do treningu  
- możliwość użycia w dowolnym miejscu  

---

## 4. Frontend (Mobile)

### Opcja wybrana: React Native

**Dlaczego:**

- jeden kod na Android + iOS  
- szybki development  
- duża społeczność  
- dużo gotowych bibliotek  

**Alternatywy:**

| Technologia | Powód odrzucenia |
|------------|-----------------|
| Flutter | większy próg wejścia |
| Native (Swift/Kotlin) | zbyt czasochłonne |

---

## 5. Backend

### MVP: brak backendu (local-first)

**Dlaczego:**

- brak logowania  
- brak kont użytkowników  
- dane przechowywane lokalnie  

👉 minimalizacja złożoności

---

### Post-MVP: Firebase

**Funkcje:**

- autoryzacja użytkowników  
- baza danych  
- analytics  

**Dlaczego Firebase:**

- szybkie wdrożenie  
- brak zarządzania serwerem  
- skalowalność  

---

## 6. Baza danych

### MVP:

- local storage (AsyncStorage)

### Post-MVP:

- Firebase Firestore  

---

## 7. UI / UX

### Narzędzia:

- Figma (projektowanie)  

### Założenia:

- minimalizm  
- szybkie interakcje  
- brak zbędnych ekranów  

---

## 8. Integracje

### MVP:

- brak integracji zewnętrznych  

### Post-MVP:

- Apple Health / Google Fit  
- wearables (np. smartwatch)

---

## 9. Analityka

### MVP:

- podstawowa (np. liczba sesji)

### Post-MVP:

- Firebase Analytics  
- śledzenie zachowań użytkownika  

---

## 10. Hosting / Deployment

### MVP:

- brak (aplikacja lokalna)

### Post-MVP:

- Firebase / Vercel (backend)

---

## 11. Architektura (MVP)

👉 Prosta architektura:

- UI (React Native)
- logika aplikacji
- lokalne dane

---

## 12. Ryzyka techniczne

- brak doświadczenia w React Native  
- problemy z wydajnością  
- brak skalowalności MVP  

---

## 13. Koszty

### MVP:

- praktycznie 0 zł  

### Post-MVP:

- Firebase (free tier → płatne przy wzroście)

---

## 14. Skalowalność

System można łatwo rozbudować o:

- backend  
- AI  
- multiplayer  

---

## 15. Wniosek

Wybrany stack:

👉 React Native + local storage + (docelowo Firebase)

Spełnia:

- wymagania MVP  
- szybki development  
- niskie koszty  

---

## Podsumowanie

Tech stack został dobrany zgodnie z zasadą:

👉 „najprostsze rozwiązanie, które działa”

co minimalizuje ryzyko i przyspiesza development