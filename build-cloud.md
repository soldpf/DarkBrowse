# Building iOS .ipa on Windows - Cloud Solutions

Since you're on Windows and want to convert this React Native Tor browser to .ipa, here are the best methods:

## Method 1: GitHub Actions (Free - Recommended)

The project already includes `.github/workflows/ios-build.yml` which will:
- Automatically build your app when you push to GitHub
- Create .ipa files using GitHub's macOS runners
- Upload the .ipa as downloadable artifacts

**Steps:**
1. Push this code to a GitHub repository
2. The GitHub Action will automatically run
3. Download the .ipa from the Actions tab
4. Sideload using AltStore, Sideloadly, or 3uTools

## Method 2: Codemagic (Free tier available)

1. Connect your GitHub repo to Codemagic
2. Configure iOS build workflow
3. Download generated .ipa file

## Method 3: EAS Build (Expo)

```bash
npm install -g @expo/cli
expo install
eas build --platform ios
```

## Method 4: Local with React Native CLI (Requires macOS VM)

If you set up a macOS virtual machine:
```bash
./build-ios.sh
```

## Sideloading the .ipa

Once you have the .ipa file:

### AltStore (Free)
1. Install AltStore on your computer
2. Install AltStore on your iPhone
3. Drag .ipa to AltStore to install

### Sideloadly (Free)
1. Download Sideloadly
2. Connect iPhone via USB
3. Drag .ipa file to Sideloadly
4. Enter Apple ID and install

### 3uTools (Free)
1. Install 3uTools
2. Connect iPhone
3. Go to Apps → Install → Select .ipa

## Features Ready for iOS

Your Tor browser includes:
- ✅ Dark mode privacy interface
- ✅ Tor network routing simulation
- ✅ Multi-tab browsing
- ✅ Bookmark management
- ✅ Browsing history
- ✅ Privacy settings panel
- ✅ iOS-optimized navigation
- ✅ Proper iOS bundle configuration

The app is already configured for iOS with proper bundle IDs, permissions, and interface settings.