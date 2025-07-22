import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import BrowserScreen from '../screens/BrowserScreen';
import TabsScreen from '../screens/TabsScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {Colors} from '../styles/Colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        headerShown: false,
      }}>
      <Tab.Screen 
        name="Browser" 
        component={BrowserScreen}
        options={{
          tabBarLabel: 'Browser',
          tabBarIcon: ({color}) => <span style={{color}}>🌐</span>,
        }}
      />
      <Tab.Screen 
        name="Tabs" 
        component={TabsScreen}
        options={{
          tabBarLabel: 'Tabs',
          tabBarIcon: ({color}) => <span style={{color}}>📋</span>,
        }}
      />
      <Tab.Screen 
        name="Bookmarks" 
        component={BookmarksScreen}
        options={{
          tabBarLabel: 'Bookmarks',
          tabBarIcon: ({color}) => <span style={{color}}>⭐</span>,
        }}
      />
      <Tab.Screen 
        name="History" 
        component={HistoryScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({color}) => <span style={{color}}>🕒</span>,
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => <span style={{color}}>⚙️</span>,
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: Colors.primary,
          background: Colors.background,
          card: Colors.surface,
          text: Colors.text,
          border: Colors.border,
          notification: Colors.accent,
        },
      }}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
