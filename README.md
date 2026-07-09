<div align="center">

<img src="./assets/images/logo.png" width="96" height="96" alt="CleanAir Club logo" />

# CleanAir Club

**Turn everyday choices into cleaner air.**

A gamified mobile app that rewards you for greener commutes and eco-friendly habits — track your real-world impact, level up, and earn achievements along the way.

<br />

![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-0F9F59?style=flat-square)
![Expo](https://img.shields.io/badge/Expo-~51.0-000020?style=flat-square&logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.74-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/license-Private-lightgrey?style=flat-square)

</div>

---

## ✨ What it does

CleanAir Club makes low-carbon living feel like a game. Every walk, bike ride, metro trip, or sustainable habit you log turns into **XP**, moves you up through **50 levels**, and unlocks **achievements** — all while showing the tangible impact of your choices on air quality and CO₂.

- 🚶 **Log your actions** — walking, cycling, public transit, and everyday green habits
- 📈 **See your impact** — track CO₂ saved and cleaner-air contributions over time
- 🎮 **Level up** — climb a 50-level XP curve, from *Seedling* to the top ranks
- 🏆 **Earn achievements** — Early Bird, Pedal Master, and more
- 👥 **Go social** — compare progress and celebrate wins together
- 📊 **Stats & profile** — a personal dashboard of your clean-air journey

---

## 🧩 Tech Stack

| Layer | Tools |
| --- | --- |
| **Framework** | [Expo](https://expo.dev) (SDK 51), [React Native](https://reactnative.dev) 0.74 |
| **Language** | [TypeScript](https://www.typescriptlang.org) |
| **Styling** | [NativeWind](https://www.nativewind.dev) (Tailwind CSS) |
| **Navigation** | [React Navigation](https://reactnavigation.org) (native stack + bottom tabs) |
| **Backend** | [Convex](https://convex.dev) (auth & profiles) |
| **UI** | `react-native-svg`, `expo-linear-gradient`, Plus Jakarta Sans |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (LTS)
- The [Expo Go](https://expo.dev/go) app on your phone, or an iOS/Android simulator

### Install & run

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

Then scan the QR code with Expo Go, or launch a specific platform:

```bash
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

---

## 📁 Project Structure

```
project/
├── App.tsx                 # App entry — fonts, providers, navigation
├── app.json                # Expo configuration
├── assets/                 # Icons, splash, logo
├── convex/                 # Backend: auth, profiles, schema
└── src/
    ├── contexts/           # Auth, Impact & Commute-log state
    ├── navigation/         # Root, onboarding & main-tab navigators
    ├── screens/
    │   ├── onboarding/      # Welcome & setup flow
    │   ├── auth/            # Sign in
    │   └── main/            # Home, Log Action, Level, Impacts, Stats, Social, Profile…
    ├── data/               # Achievements
    ├── utils/              # Level/XP curve logic
    └── theme/              # Fonts
```

---

## 🌱 The Levels

XP scales along a smooth curve (`50 · L · (L−1)`) across **50 levels**, each with its own title — starting at **Seedling**, **Sprout**, **Bud**, **Bloom**, **Eco Friend**, and climbing from there. Small, consistent green choices add up.

---

<div align="center">

Made with 💚 for cleaner air.

</div>
