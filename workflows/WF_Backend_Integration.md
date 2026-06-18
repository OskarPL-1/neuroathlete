# WF_Backend_Integration.md - Integracja backendu

## 1. Cel dokumentu

Celem jest opis integracji backendu dla aplikacji NeuroAthlete, włączając bazę danych i API.

---

## 2. MVP Approach

- Brak backendu początkowo  
- Dane przechowywane lokalnie (localStorage)  
- Prosta logika po stronie klienta

---

## 3. Post-MVP Backend

### Technologia: Firebase

- Firestore: baza danych  
- Authentication: logowanie użytkowników  
- Hosting: wdrażanie aplikacji

---

## 4. Kluczowe funkcjonalności

### Zapis wyników

- Przechowywanie historii treningów  
- Synchronizacja między urządzeniami

### Analityka

- Śledzenie użycia aplikacji  
- Metryki użytkowników

---

## 5. Architektura

- Frontend: Next.js  
- Backend: Firebase Functions (jeśli potrzebne)  
- Baza: Firestore

---

## 6. Bezpieczeństwo

- Autoryzacja użytkowników  
- Walidacja danych  
- Ochrona przed nadużyciami

---

## Podsumowanie

Backend jest opcjonalny w MVP, ale niezbędny dla skalowania.