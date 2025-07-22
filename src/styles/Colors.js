// Dark mode color palette for the Tor Privacy Browser

export const Colors = {
  // Primary brand colors
  primary: '#8B5CF6',      // Purple - main accent color
  primaryDark: '#7C3AED',  // Darker purple for active states
  primaryLight: '#A78BFA', // Lighter purple for hover states
  
  // Background colors
  background: '#0F0F23',   // Very dark blue/black - main background
  surface: '#1A1A2E',      // Dark blue/purple - cards and surfaces
  surfaceLight: '#16213E', // Slightly lighter surface
  
  // Text colors
  text: '#FFFFFF',         // White - primary text
  textSecondary: '#9CA3AF', // Light gray - secondary text
  textTertiary: '#6B7280', // Medium gray - tertiary text
  
  // Border and divider colors
  border: '#374151',       // Dark gray - borders and dividers
  borderLight: '#4B5563',  // Lighter gray - subtle borders
  
  // Status colors
  success: '#10B981',      // Green - success states
  warning: '#F59E0B',      // Orange - warning states
  error: '#EF4444',        // Red - error states and delete actions
  info: '#3B82F6',         // Blue - info states
  
  // Accent colors
  accent: '#06B6D4',       // Cyan - secondary accent
  accentDark: '#0891B2',   // Darker cyan
  
  // Special colors
  tor: '#7D4698',          // Tor purple
  onion: '#9333EA',        // Onion service indicator
  secure: '#059669',       // HTTPS secure indicator
  insecure: '#DC2626',     // HTTP insecure indicator
  
  // Transparent overlays
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  
  // Input and form colors
  inputBackground: '#1F2937',
  inputBorder: '#4B5563',
  inputFocus: '#8B5CF6',
  
  // Tab and navigation colors
  tabActive: '#8B5CF6',
  tabInactive: '#6B7280',
  navigationBackground: '#1A1A2E',
};

// Helper function to get color with opacity
export const getColorWithOpacity = (color, opacity) => {
  // Convert hex to rgba
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

// Color schemes for different contexts
export const ColorSchemes = {
  browser: {
    background: Colors.background,
    surface: Colors.surface,
    text: Colors.text,
    accent: Colors.primary,
  },
  
  settings: {
    background: Colors.background,
    surface: Colors.surface,
    text: Colors.text,
    accent: Colors.accent,
  },
  
  privacy: {
    background: Colors.background,
    surface: Colors.surface,
    text: Colors.text,
    accent: Colors.tor,
  },
};
