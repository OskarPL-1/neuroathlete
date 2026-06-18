# WF_Deployment.md - Wdrażanie aplikacji

## 1. Cel dokumentu

Celem jest opis procesu wdrażania aplikacji NeuroAthlete do środowiska produkcyjnego.

---

## 2. Platforma hostingowa

- Vercel: dla Next.js aplikacji  
- Firebase Hosting: alternatywa

---

## 3. Proces deploymentu

1. Build aplikacji  
2. Testy automatyczne  
3. Wdrożenie na staging  
4. Testy manualne  
5. Wdrożenie produkcyjne

---

## 4. CI/CD

- GitHub Actions: automatyzacja  
- Automatyczne deploy po push do main

---

## 5. Monitorowanie

- Uptime monitoring  
- Error tracking (Sentry)  
- Analytics (Google Analytics)

---

## Podsumowanie

Deployment jest zautomatyzowany i bezpieczny.