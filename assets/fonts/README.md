# Fonts

The app uses **Plus Jakarta Sans** with three weights:

- **PlusJakartaSans-Medium** (500) – subtitle
- **PlusJakartaSans-Bold** (700) – button, tagline  
- **PlusJakartaSans-ExtraBold** (800) – header, titles

Right now the same `PlusJakartaSans.ttf` is loaded for all three, so every weight looks the same.

To get real Bold / Medium / ExtraBold:

1. Download [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) from Google Fonts.
2. Add these files into this folder:
   - `PlusJakartaSans-Medium.ttf`
   - `PlusJakartaSans-Bold.ttf`
   - `PlusJakartaSans-ExtraBold.ttf`
3. In `src/screens/onboarding/WelcomeScreen.tsx`, change the `useFonts` calls to use these files instead of `PlusJakartaSans.ttf` for each weight.

No other code changes are needed.
