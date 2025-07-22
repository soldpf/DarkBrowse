# Tor Privacy Browser for iOS

A complete privacy-focused React Native browser with Tor network integration, designed for iOS sideloading.

## Features

🔒 **Privacy-First Design**
- Dark mode interface optimized for privacy
- Tor network routing for anonymous browsing
- No tracking or analytics
- Local-only data storage

🌐 **Complete Browser Experience**
- Multi-tab browsing support
- Bookmark management
- Browsing history
- Privacy-focused search (DuckDuckGo default)
- Address bar with security indicators

⚙️ **Advanced Privacy Controls**
- Toggle Tor network on/off
- JavaScript control
- Cookie management
- Ad blocker settings
- Clear all data functionality

📱 **iOS Optimized**
- Native iOS interface
- Bottom tab navigation
- Proper permissions configuration
- iPhone and iPad support

## Building for iOS

### Option 1: GitHub Actions (Recommended)
1. Fork/clone this repository to GitHub
2. The included GitHub Action will automatically build .ipa files
3. Download from Actions tab
4. Sideload using AltStore or Sideloadly

### Option 2: Cloud Build Services
- **Codemagic**: Connect GitHub repo for automated builds
- **EAS Build**: Use Expo's build service
- **AppCenter**: Microsoft's mobile build service

### Option 3: Local macOS Build
```bash
# Install dependencies
npm install
cd ios && pod install && cd ..

# Build archive
./build-ios.sh
```

## Sideloading Instructions

### Using AltStore (Free)
1. Install AltStore on computer and iPhone
2. Drag .ipa file to AltStore
3. Install on device

### Using Sideloadly (Free)
1. Download Sideloadly
2. Connect iPhone via USB
3. Drag .ipa to Sideloadly
4. Enter Apple ID and install

### Using 3uTools (Free)
1. Install 3uTools
2. Connect iPhone
3. Apps → Install → Select .ipa

## Development

```bash
# Start development server
npx react-native start

# Run on iOS simulator (macOS only)
npx react-native run-ios

# Run on Android
npx react-native run-android
```

## Architecture

- **React Native**: Cross-platform mobile framework
- **React Navigation**: Tab and stack navigation
- **AsyncStorage**: Local data persistence
- **WebView**: Web content rendering
- **Context API**: Global state management

## Privacy Features

- **Tor Integration**: Routes traffic through Tor network
- **Ad Blocking**: Built-in advertisement blocking
- **No Telemetry**: Zero data collection or tracking
- **Local Storage**: All data stored locally on device
- **Secure Defaults**: HTTPS-first, JavaScript controls

## File Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Main app screens
├── navigation/     # Navigation configuration
├── services/       # Data and network services
├── styles/         # Theme and styling
├── utils/          # Utility functions
└── context/        # Global state management

ios/                # iOS-specific configuration
android/            # Android-specific configuration
```

## Legal Notice

This browser is designed for privacy protection and educational purposes. Users are responsible for compliance with local laws regarding Tor usage and web browsing.

## License

Open source - feel free to modify and distribute.