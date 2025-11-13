# 🚀 Complete Expo Setup Guide
## Build iOS & Android Apps with React Native

---

## 📋 Quick Start (5 Minutes)

```bash
# 1. Install Expo CLI globally
npm install -g expo-cli

# 2. Create new Expo project
npx create-expo-app@latest navaneethan-mobile --template
cd navaneethan-mobile

# 3. Install core dependencies
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install @supabase/supabase-js @expo/vector-icons

# 4. Start development server
npm start

# 5. Run on device/emulator
# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Press 'w' for Web
```

---

## 📦 Installation & Setup

### Step 1: Install Expo CLI

```bash
# Global installation
npm install -g expo-cli

# Verify installation
expo --version
```

### Step 2: Create New Project

```bash
# Option A: Using create-expo-app (recommended)
npx create-expo-app@latest navaneethan-mobile --template
cd navaneethan-mobile

# Option B: Using Expo CLI
expo init navaneethan-mobile --template blank-typescript
cd navaneethan-mobile

# Option C: Clone and upgrade from web project
cd navaneethan-mobile
npm install expo@latest
```

### Step 3: Install Dependencies

```bash
npm install

# Navigation
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

# Backend (Supabase)
npm install @supabase/supabase-js

# Icons
npm install @expo/vector-icons

# UI/Utilities
npm install zustand axios dotenv
npm install @react-native-async-storage/async-storage

# For Android
npx expo install expo-dev-client
```

### Step 4: Verify Installation

```bash
npm start
# Should show:
# ├─ Expo CLI is running
# ├─ Local:   exp://localhost:19000
# ├─ Network: exp://192.168.x.x:19000
```

---

## 🔧 Configuration Files

### File 1: `app.json` (Main Configuration)

```json
{
  "expo": {
    "name": "Navaneethan Editor",
    "slug": "navaneethan-editor-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1a1a1a"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTabletMode": true,
      "bundleIdentifier": "com.navaneethan.editor",
      "usesNonExemptEncryption": false,
      "infoPlist": {
        "NSCameraUsageDescription": "This app does not use the camera.",
        "NSMicrophoneUsageDescription": "This app does not use the microphone."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#1a1a1a"
      },
      "package": "com.navaneethan.editor",
      "permissions": ["INTERNET", "ACCESS_NETWORK_STATE"]
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "backgroundColor": "#1a1a1a"
    },
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "Allow $(PRODUCT_NAME) to access your photos.",
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera."
        }
      ]
    ],
    "scheme": "navaneethan"
  }
}
```

### File 2: `tsconfig.json`

```json
{
  "extends": "expo/tsconfig",
  "compilerOptions": {
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  }
}
```

### File 3: `eas.json` (Build Configuration)

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview2": {
      "android": {
        "buildType": "aab"
      }
    },
    "preview3": {
      "ios": "internal"
    },
    "production": {
      "ios": {
        "image": "latest"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-email@example.com",
        "ascAppId": "123456789",
        "appleTeamId": "ABC123XYZ"
      },
      "android": {
        "serviceAccount": "./android-keystore.json",
        "track": "production"
      }
    }
  }
}
```

### File 4: `.env`

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
EXPO_PUBLIC_APP_ENV=development
```

### File 5: `.env.production`

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
EXPO_PUBLIC_APP_ENV=production
```

---

## 🎯 Development Commands

### Start Development Server

```bash
# Start with default settings
npm start

# Start without clearing cache
npm start -- --no-clear

# Start with specific port
npm start -- --port 19000

# Start in tunnel mode (for LAN without same network)
npm start -- --tunnel

# Start in LAN mode (local network)
npm start -- --lan

# Start in localhost mode (USB only)
npm start -- --localhost
```

### Run on Emulators/Simulators

```bash
# iOS Simulator (macOS only)
npm run ios
# Or press 'i' in Expo CLI

# Android Emulator (all platforms)
npm run android
# Or press 'a' in Expo CLI

# Web Browser
npm run web
# Or press 'w' in Expo CLI

# Open in Expo Go app (requires app on phone)
# Scan QR code with Expo Go or Camera app
```

### Install Expo Go App

```bash
# iOS: Search "Expo Go" on App Store
# Android: Search "Expo Go" on Google Play
# Or use these direct links:
# iOS: https://apps.apple.com/app/expo-go/id1223794974
# Android: https://play.google.com/store/apps/details?id=host.exp.exponent
```

---

## 🏗️ Project Structure

```bash
# Create folder structure
mkdir -p src/app/{auth,tabs,admin}
mkdir -p src/shared/{api,context,components,types,data,styles}
mkdir -p src/assets/{images,fonts}
mkdir -p assets

# Directory structure
navaneethan-mobile/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login.tsx
│   │   │   ├── signup.tsx
│   │   │   └── forgot-password.tsx
│   │   ├── tabs/
│   │   │   ├── portfolio.tsx
│   │   │   ├── pricing.tsx
│   │   │   ├── contact.tsx
│   │   │   └── dashboard.tsx
│   │   ├── admin/
│   │   │   └── enquiries.tsx
│   │   └── _layout.tsx
│   ├── shared/
│   │   ├── api/
│   │   │   └── index.ts
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── components/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── data/
│   │   │   ├── profileData.ts
│   │   │   └── portfolioData.ts
│   │   └── styles/
│   │       └── theme.ts
│   ├── assets/
│   │   ├── images/
│   │   └── fonts/
│   ├── App.tsx
│   └── index.tsx
├── assets/
│   ├── icon.png (192x192)
│   ├── splash.png (1284x2778)
│   ├── adaptive-icon.png (108x108)
│   └── favicon.png (32x32)
├── .env
├── .env.production
├── .gitignore
├── app.json
├── eas.json
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🚀 Build Commands

### Setup EAS (Expo Application Service)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Verify login
eas whoami
```

### Android Build

```bash
# Build APK (testing)
eas build --platform android --type apk

# Build AAB (Google Play production)
eas build --platform android --type app-bundle

# Build with specific profile
eas build --platform android --profile production

# Submit to Google Play
eas submit --platform android

# Monitor build
eas build:list
eas build:view <BUILD_ID>
```

### iOS Build (macOS only)

```bash
# Build for simulator
eas build --platform ios --type simulator

# Build for device (Ad Hoc)
eas build --platform ios --type ad-hoc

# Build for App Store
eas build --platform ios --type app-store

# Submit to App Store
eas submit --platform ios

# Monitor build
eas build:list
eas build:view <BUILD_ID>
```

### Web Build

```bash
# Build for web
expo export --platform web

# Output: web-build/

# Deploy to Vercel
vercel deploy web-build

# Deploy to Netlify
netlify deploy --dir=web-build --prod
```

---

## 📱 Device Testing

### Test on Physical Device

```bash
# 1. Install Expo Go app on your phone
# iOS App Store or Android Google Play

# 2. Make sure phone and computer are on same network

# 3. Start development server
npm start

# 4. Scan QR code with:
# iOS: Built-in Camera app
# Android: Expo Go app's "Scan QR code" button

# 5. App opens in Expo Go app

# 6. Hot reload: Save file and app reloads
```

### Test on iOS Simulator (macOS)

```bash
# Prerequisites
xcode-select --install
brew install watchman

# Start simulator
open -a Simulator

# Run app
npm run ios
# Or press 'i' in Expo CLI

# Debug: Cmd+D for menu
# Shake phone to open dev menu
```

### Test on Android Emulator

```bash
# Prerequisites
# 1. Install Android Studio from: https://developer.android.com/studio
# 2. Open Android Studio
# 3. Create Virtual Device (AVD)

# Start emulator from Android Studio or CLI
emulator -avd Pixel_4_API_30

# Run app
npm run android
# Or press 'a' in Expo CLI

# Debug: Shake device or press Ctrl+M for menu
```

---

## 🔐 Environment & Secrets

### Secure Storage for Secrets

```bash
npm install expo-secure-store
npm install react-native-dotenv
```

### Usage in Code

```typescript
// src/shared/api/index.ts
import * as SecureStore from 'expo-secure-store';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Store sensitive token
await SecureStore.setItemAsync('authToken', token);

// Retrieve sensitive token
const token = await SecureStore.getItemAsync('authToken');

// Delete sensitive token
await SecureStore.deleteItemAsync('authToken');
```

---

## 🐛 Debugging

### Development Menu

```
iOS: Cmd + D (Simulator) or Shake (Device)
Android: Ctrl + M (Emulator) or Shake (Device)
```

Menu options:
- Reload JavaScript
- Open Debugger
- Enable/Disable Fast Refresh
- Show Performance Monitor
- Toggle Element Inspector

### Console Logging

```typescript
// These work on physical device in Expo Go
console.log('Regular log');
console.warn('Warning');
console.error('Error');

// View logs
npm start
# Logs appear in terminal
```

### Debugging Tools

```bash
# React Native Debugger
npm install -g react-native-debugger

# Open debugger
react-native-debugger

# In app, press Cmd+D (iOS) or Ctrl+M (Android)
# Select "Open Debugger"
```

---

## 📦 Publishing to App Stores

### Google Play Setup

```bash
# 1. Create Google Play Developer account
# Visit: https://play.google.com/console/

# 2. Create new app
# Fill in app details

# 3. Generate signing key
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias

# 4. Update eas.json with keystore
# 5. Build and submit
eas build --platform android --type app-bundle
eas submit --platform android
```

### App Store Setup (iOS - macOS only)

```bash
# 1. Create Apple Developer account
# Visit: https://developer.apple.com/

# 2. Create App ID in Apple Developer Portal

# 3. Get Team ID
# Account settings → Certificates, Identifiers & Profiles

# 4. Update eas.json with Apple info

# 5. Build and submit
eas build --platform ios --type app-store
eas submit --platform ios
```

---

## 🎨 Assets & Icons

### Generate Assets

```bash
# Install tool
npm install -g @bacons/create-expo-app

# Generate icons and splashscreen
npx create-expo-app --name "Navaneethan Editor"

# Or use online tool:
# https://www.appicon.co/
# Upload 1024x1024 PNG
# Download all sizes
```

### Asset Sizes

```
iOS:
- App Icon: 1024x1024 (all sizes generated)
- Splash: 1284x2778 (iPhone XS Max)

Android:
- App Icon: 192x192 (mdpi)
- Adaptive Icon Foreground: 108x108
- Splash: 1080x2280
- Keyline Safe Area: 72px from edges

Web:
- Favicon: 32x32 (or multiple sizes)
```

### Place Assets

```bash
# Copy to assets folder
assets/
├── icon.png (1024x1024)
├── splash.png (1284x2778)
├── adaptive-icon.png (108x108)
└── favicon.png (32x32)
```

---

## 📝 npm Scripts

### Update `package.json`

```json
{
  "scripts": {
    "start": "expo start",
    "dev": "expo start --clear",
    "ios": "expo run:ios",
    "android": "expo run:android",
    "web": "expo export --platform web",
    "web:serve": "expo start --web",
    "eject": "expo prebuild",
    "test": "jest",
    "lint": "eslint .",
    "build:android": "eas build --platform android",
    "build:ios": "eas build --platform ios",
    "build:all": "eas build --platform android --platform ios",
    "submit:android": "eas submit --platform android",
    "submit:ios": "eas submit --platform ios",
    "prebuild": "expo prebuild --clean",
    "prebuild:android": "expo prebuild --platform android --clean",
    "prebuild:ios": "expo prebuild --platform ios --clean"
  }
}
```

### Run Scripts

```bash
npm start          # Development
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run web        # Web browser
npm run build:android    # Build for Google Play
npm run build:ios        # Build for App Store
npm run submit:android   # Submit to Google Play
npm run submit:ios       # Submit to App Store
npm run build:all        # Build both platforms
```

---

## ✅ Deployment Checklist

### Before Building

- [ ] Update version in `app.json`
- [ ] Update app name in `app.json`
- [ ] Add app icon (1024x1024)
- [ ] Add splash screen
- [ ] Create app bundle identifier
- [ ] Update bundle ID in `app.json`
- [ ] Test on iOS simulator
- [ ] Test on Android emulator
- [ ] Test on physical devices
- [ ] Run build lint/type check

### Android Deployment

- [ ] Create Google Play Developer account ($25)
- [ ] Create app on Google Play Console
- [ ] Generate signing key
- [ ] Configure `eas.json`
- [ ] Build APK/AAB
- [ ] Test APK on device
- [ ] Create store listing
- [ ] Add screenshots
- [ ] Add description
- [ ] Submit for review

### iOS Deployment

- [ ] Create Apple Developer account ($99/year)
- [ ] Create App ID
- [ ] Create certificates
- [ ] Create provisioning profiles
- [ ] Configure `eas.json`
- [ ] Build for App Store
- [ ] Create App Store listing
- [ ] Add screenshots
- [ ] Add description
- [ ] Request review

---

## 🆘 Troubleshooting

### Clear Cache

```bash
# Clear Expo cache
expo start --clear

# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules
npm install

# Reset Watchman (macOS)
watchman watch-del-all
```

### Fix Port Issues

```bash
# If port 19000 is in use
npm start -- --port 19001

# Or kill process using port
# macOS/Linux: lsof -i :19000
# Windows: netstat -ano | findstr :19000
```

### Module Not Found

```bash
# Reinstall specific package
npm install @react-navigation/native

# Or reinstall all
rm -rf node_modules
npm install
```

### iOS Simulator Issues (macOS)

```bash
# Reset simulator
xcrun simctl erase all

# Rebuild
npm run ios

# Or kill and restart Simulator
killall "Simulator"
open -a Simulator
```

### Android Emulator Issues

```bash
# Restart emulator from Android Studio

# Or reset emulator
emulator -avd Pixel_4_API_30 -wipe-data

# Check emulator list
emulator -list-avds
```

---

## 📚 Resources

- **Expo Docs**: https://docs.expo.dev/
- **React Native**: https://reactnative.dev/
- **EAS CLI**: https://docs.expo.dev/eas-update/introduction/
- **Supabase React Native**: https://supabase.com/docs/guides/auth/native-mobile-deep-linking
- **Navigation**: https://reactnavigation.org/
- **App Store Connect**: https://appstoreconnect.apple.com/
- **Google Play Console**: https://play.google.com/console/

---

## 🎯 Next Steps

1. **Install Expo CLI** - `npm install -g expo-cli`
2. **Create project** - `npx create-expo-app@latest navaneethan-mobile --template`
3. **Install dependencies** - Follow Step 3 above
4. **Setup environment** - Create `.env` with Supabase keys
5. **Create screens** - Copy code from web version
6. **Test locally** - Run on simulator/device
7. **Build** - Use EAS to build for app stores
8. **Deploy** - Submit to Google Play & App Store

---

**Questions?** Check the Troubleshooting section or visit Expo Docs! 🚀
