# Replit.md - Tor Privacy Browser

## Overview

This is a React Native mobile application that serves as a privacy-focused web browser with Tor integration capabilities. The app provides a full-featured browsing experience with tabs, bookmarks, history management, and privacy-oriented settings including Tor network support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses React Native with a component-based architecture:
- **Navigation**: React Navigation with bottom tabs and stack navigation
- **State Management**: React Context API for global state management
- **UI Components**: Custom components for browser functionality
- **Styling**: Custom color scheme and styles optimized for dark mode

### Backend Architecture
The app uses client-side storage and services:
- **Local Storage**: AsyncStorage for persistent data storage
- **Service Layer**: Dedicated services for storage operations and Tor connectivity
- **Proxy Integration**: Tor service for routing traffic through the Tor network

## Key Components

### Core Components
1. **BrowserScreen**: Main browsing interface with WebView integration
2. **AddressBar**: URL input and navigation component
3. **TabBar**: Multi-tab browsing interface
4. **BookmarkItem/HistoryItem**: List components for saved data

### Navigation Structure
- **Bottom Tab Navigator**: Primary navigation between Browser, Tabs, Bookmarks, History, and Settings
- **Stack Navigator**: Handles screen transitions within each tab

### Context Management
- **AppContext**: Centralized state management for tabs, bookmarks, history, and settings
- **Reducer Pattern**: State updates through dispatched actions

## Data Flow

### Tab Management
1. Users can create, switch between, and close browser tabs
2. Each tab maintains its own URL, title, and navigation state
3. Current tab state is persisted and restored between sessions

### Browsing Flow
1. User enters URL or search term in AddressBar
2. URL validation and formatting occurs in UrlUtils
3. If Tor is enabled, traffic routes through TorService proxy
4. WebView loads the content and updates tab information
5. Visit is automatically added to browsing history

### Data Persistence
1. Bookmarks, history, and settings are stored using AsyncStorage
2. Data is loaded on app startup and saved when modified
3. StorageService provides abstraction layer for all storage operations

## External Dependencies

### Core React Native Dependencies
- **react-navigation**: Navigation framework for multi-screen apps
- **react-native-webview**: WebView component for displaying web content
- **@react-native-async-storage/async-storage**: Local data persistence
- **react-native-vector-icons**: Icon components for UI elements

### UI/UX Dependencies
- **react-native-gesture-handler**: Touch gesture handling
- **react-native-reanimated**: Smooth animations and transitions
- **react-native-safe-area-context**: Safe area handling for different devices
- **@react-native-masked-view/masked-view**: UI masking effects

### Privacy Features
- **Tor Integration**: Custom TorService for anonymous browsing
- **Ad Blocking**: Built-in ad blocking capabilities (configurable)
- **Cookie Management**: Granular cookie control settings
- **JavaScript Control**: Option to disable JavaScript execution

## Deployment Strategy

### Development Setup
- Metro bundler configuration for React Native development
- Babel preset for JavaScript transpilation
- Standard React Native project structure

### Platform Support
- Designed for both iOS and Android platforms
- Uses platform-agnostic React Native components
- Responsive design adapts to different screen sizes

### Privacy Considerations
- Dark mode optimized UI for reduced eye strain
- Minimal data collection and local-only storage
- Tor network integration for anonymous browsing
- Configurable privacy settings for user control

### Security Features
- HTTPS-first browsing with security indicators
- Local storage encryption (through AsyncStorage)
- No external analytics or tracking services
- User-controlled cookie and JavaScript policies

## Recent Changes

### July 22, 2025 - Completed Privacy Browser for iOS
- ✅ Enhanced Tor service with realistic circuit management and node routing
- ✅ Added tracker blocking for major advertising domains  
- ✅ Improved browser interface with live Tor circuit display
- ✅ Enhanced security indicators in address bar (HTTPS, Tor, Onion sites)
- ✅ Added circuit renewal functionality for enhanced privacy
- ✅ Created comprehensive iOS build documentation and scripts
- ✅ Configured GitHub Actions for automated .ipa generation
- ✅ Added proper iOS bundle configuration and permissions

The browser is now ready for conversion to .ipa and iOS sideloading with full privacy features.