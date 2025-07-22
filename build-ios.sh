#!/bin/bash

# Tor Browser iOS Build Script for Windows (using WSL/Git Bash)
# This script builds the React Native app for iOS deployment

echo "🔒 Building Tor Privacy Browser for iOS..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 2: Install iOS dependencies (CocoaPods)
echo "🍎 Installing iOS dependencies..."
cd ios
pod install
cd ..

# Step 3: Build for iOS (requires macOS or cloud service)
echo "🔧 Building iOS archive..."
cd ios

# Build the archive
xcodebuild -workspace TorBrowser.xcworkspace \
           -scheme TorBrowser \
           -configuration Release \
           -destination generic/platform=iOS \
           -archivePath TorBrowser.xcarchive \
           archive

# Export to IPA
echo "📱 Exporting IPA file..."
xcodebuild -exportArchive \
           -archivePath TorBrowser.xcarchive \
           -exportPath . \
           -exportFormat ipa

echo "✅ Build complete! TorBrowser.ipa is ready for sideloading."
echo ""
echo "📋 To sideload on your iOS device:"
echo "   1. Use AltStore, Sideloadly, or 3uTools"
echo "   2. Install the TorBrowser.ipa file"
echo "   3. Trust the developer certificate in iOS Settings"
echo ""
echo "🔐 Features included:"
echo "   • Dark mode privacy interface"
echo "   • Tor network integration"
echo "   • Bookmark and history management"
echo "   • Multi-tab browsing"
echo "   • Privacy-focused settings"