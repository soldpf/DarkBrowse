import {StyleSheet} from 'react-native';
import {Colors} from './Colors';

export const GlobalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  surface: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  
  // Typography styles
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  
  body: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  
  bodySecondary: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  
  caption: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  
  // Button styles
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonSecondaryText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  buttonDanger: {
    backgroundColor: Colors.error,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonDangerText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Input styles
  input: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
  },
  
  inputFocused: {
    borderColor: Colors.inputFocus,
    borderWidth: 2,
  },
  
  // List styles
  listItem: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  
  listItemLast: {
    borderBottomWidth: 0,
  },
  
  // Card styles
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: Colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Navigation styles
  headerStyle: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  
  headerTitleStyle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  tabBarStyle: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  
  // Utility styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  spaceBetween: {
    justifyContent: 'space-between',
  },
  
  flex1: {
    flex: 1,
  },
  
  // Margin and padding utilities
  mt8: {marginTop: 8},
  mt16: {marginTop: 16},
  mt24: {marginTop: 24},
  
  mb8: {marginBottom: 8},
  mb16: {marginBottom: 16},
  mb24: {marginBottom: 24},
  
  ml8: {marginLeft: 8},
  ml16: {marginLeft: 16},
  
  mr8: {marginRight: 8},
  mr16: {marginRight: 16},
  
  p8: {padding: 8},
  p16: {padding: 16},
  p24: {padding: 24},
  
  px8: {paddingHorizontal: 8},
  px16: {paddingHorizontal: 16},
  
  py8: {paddingVertical: 8},
  py16: {paddingVertical: 16},
  
  // Border radius utilities
  rounded: {borderRadius: 8},
  roundedLarge: {borderRadius: 12},
  roundedFull: {borderRadius: 999},
  
  // Shadow utilities
  shadow: {
    shadowColor: Colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  shadowLarge: {
    shadowColor: Colors.text,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
});

// Animation styles
export const AnimationStyles = {
  fadeIn: {
    opacity: 0,
  },
  
  fadeInVisible: {
    opacity: 1,
  },
  
  slideUp: {
    transform: [{translateY: 50}],
    opacity: 0,
  },
  
  slideUpVisible: {
    transform: [{translateY: 0}],
    opacity: 1,
  },
};

// Layout constants
export const Layout = {
  window: {
    width: 0, // Will be set by Dimensions
    height: 0, // Will be set by Dimensions
  },
  
  tabBarHeight: 80,
  headerHeight: 56,
  addressBarHeight: 60,
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
};
