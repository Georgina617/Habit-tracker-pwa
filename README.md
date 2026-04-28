# 🚀 Habit Tracker PWA

A modern, offline-first Habit Tracker built with Next.js, TypeScript, and Tailwind CSS.
Track your daily habits, build streaks, and stay consistent — even without an internet connection.

---

## ✨ Features

- 🔐 Authentication (Signup & Login)
- ✅ Create, edit, and delete habits
- 🔁 Toggle daily completion
- 🔥 Streak tracking system
- 🔍 Search and filter habits
- 📅 Calendar view for activity tracking
- 💾 Local storage persistence
- 📱 Progressive Web App (PWA)
- 🌐 Offline support (dashboard works without internet)
- 🧪 Unit & Integration testing (Vitest + Testing Library)

---

## 🧠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State/Data:** LocalStorage
- **Testing:** Vitest + React Testing Library
- **PWA:** Service Worker + Manifest

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/georgina617/habit-tracker-pwa.git
cd habit-tracker-pwa
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## 🧪 Running Tests

```bash
npm run test
```

---

## 📱 PWA Support

This app is fully installable and works offline.

### Features:

- App can be installed on mobile/desktop
- Dashboard loads offline
- Cached assets via service worker
- Manifest for splash screen and icons

---

## 📴 Offline Capability

- Dashboard is cached and accessible without internet
- Habit data persists via LocalStorage
- Service Worker handles caching and fallback logic

---

## 📁 Project Structure

```bash
/src
  /app
  /components
    /auth
    /habits
    /shared
  /lib
  /types
/tests
/public
  /icons
  manifest.json
  sw.js
```

---

## 🧩 Key Functionality

- **Habit Completion Toggle**
- **Immutable Data Updates**
- **Streak Calculation Logic**
- **Protected Routes**
- **Search Filtering**

---

## ⚠️ Notes

- Service Worker is optimized for production use
- In development mode, caching for `_next` files is disabled
- Always test offline functionality using production build:

```bash
npm run build
npm run start
```

---

## 🚀 Deployment

You can deploy this app using:

- Vercel (recommended)
- Netlify
- GitHub Pages (with adaptation)

---

## 👤 Author

Built by **Georgina odusanya**

---

## 📄 License

This project is open-source and available under the MIT License.
