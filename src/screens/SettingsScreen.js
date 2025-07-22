import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {StorageService} from '../services/StorageService';
import {TorService} from '../services/TorService';
import {Colors} from '../styles/Colors';

const SettingsScreen = () => {
  const [torEnabled, setTorEnabled] = useState(false);
  const [javascriptEnabled, setJavascriptEnabled] = useState(true);
  const [cookiesEnabled, setCookiesEnabled] = useState(false);
  const [adBlockEnabled, setAdBlockEnabled] = useState(true);
  const [torStatus, setTorStatus] = useState('Disconnected');

  useEffect(() => {
    loadSettings();
    checkTorStatus();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await StorageService.getSettings();
      setTorEnabled(settings.torEnabled || false);
      setJavascriptEnabled(settings.javascriptEnabled !== false);
      setCookiesEnabled(settings.cookiesEnabled || false);
      setAdBlockEnabled(settings.adBlockEnabled !== false);
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const checkTorStatus = async () => {
    try {
      const status = await TorService.getConnectionStatus();
      setTorStatus(status);
    } catch (error) {
      setTorStatus('Error');
    }
  };

  const handleTorToggle = async (value) => {
    try {
      setTorEnabled(value);
      await StorageService.saveSetting('torEnabled', value);
      
      if (value) {
        setTorStatus('Connecting...');
        const connected = await TorService.connect();
        setTorStatus(connected ? 'Connected' : 'Failed');
      } else {
        await TorService.disconnect();
        setTorStatus('Disconnected');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to toggle Tor connection');
      setTorEnabled(!value);
    }
  };

  const handleJavaScriptToggle = async (value) => {
    setJavascriptEnabled(value);
    await StorageService.saveSetting('javascriptEnabled', value);
  };

  const handleCookiesToggle = async (value) => {
    setCookiesEnabled(value);
    await StorageService.saveSetting('cookiesEnabled', value);
  };

  const handleAdBlockToggle = async (value) => {
    setAdBlockEnabled(value);
    await StorageService.saveSetting('adBlockEnabled', value);
  };

  const handleClearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will clear all browsing data including history, bookmarks, and settings. This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await StorageService.clearAllData();
              Alert.alert('Success', 'All data cleared successfully');
              loadSettings();
            } catch (error) {
              Alert.alert('Error', 'Failed to clear data');
            }
          },
        },
      ]
    );
  };

  const handleTestTorConnection = async () => {
    try {
      setTorStatus('Testing...');
      const isConnected = await TorService.testConnection();
      setTorStatus(isConnected ? 'Connected' : 'Failed');
      Alert.alert(
        'Connection Test',
        isConnected ? 'Tor connection is working!' : 'Tor connection failed'
      );
    } catch (error) {
      setTorStatus('Error');
      Alert.alert('Error', 'Failed to test Tor connection');
    }
  };

  const handleRenewCircuit = async () => {
    try {
      const renewed = await TorService.renewCircuit();
      if (renewed) {
        Alert.alert('Circuit Renewed', 'New Tor circuit has been established for better privacy');
      } else {
        Alert.alert('Error', 'Failed to renew circuit. Make sure Tor is connected.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to renew Tor circuit');
    }
  };

  const getStatusColor = () => {
    switch (torStatus) {
      case 'Connected':
        return Colors.success;
      case 'Connecting...':
      case 'Testing...':
        return Colors.warning;
      case 'Failed':
      case 'Error':
        return Colors.error;
      default:
        return Colors.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionHeader}>Privacy & Security</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Tor Network</Text>
            <Text style={styles.settingDescription}>
              Route traffic through Tor for maximum privacy
            </Text>
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>Status: </Text>
              <Text style={[styles.statusText, {color: getStatusColor()}]}>
                {torStatus}
              </Text>
            </View>
          </View>
          <Switch
            value={torEnabled}
            onValueChange={handleTorToggle}
            trackColor={{false: Colors.border, true: Colors.primary}}
            thumbColor={Colors.background}
          />
        </View>

        {torEnabled && (
          <View>
            <TouchableOpacity style={styles.testButton} onPress={handleTestTorConnection}>
              <Text style={styles.testButtonText}>Test Tor Connection</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.renewButton} onPress={handleRenewCircuit}>
              <Text style={styles.renewButtonText}>Renew Circuit</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>JavaScript</Text>
            <Text style={styles.settingDescription}>
              Enable JavaScript execution in websites
            </Text>
          </View>
          <Switch
            value={javascriptEnabled}
            onValueChange={handleJavaScriptToggle}
            trackColor={{false: Colors.border, true: Colors.primary}}
            thumbColor={Colors.background}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Cookies</Text>
            <Text style={styles.settingDescription}>
              Allow websites to store cookies
            </Text>
          </View>
          <Switch
            value={cookiesEnabled}
            onValueChange={handleCookiesToggle}
            trackColor={{false: Colors.border, true: Colors.primary}}
            thumbColor={Colors.background}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Ad Blocker</Text>
            <Text style={styles.settingDescription}>
              Block advertisements and trackers
            </Text>
          </View>
          <Switch
            value={adBlockEnabled}
            onValueChange={handleAdBlockToggle}
            trackColor={{false: Colors.border, true: Colors.primary}}
            thumbColor={Colors.background}
          />
        </View>

        <Text style={styles.sectionHeader}>Data Management</Text>

        <TouchableOpacity style={styles.dangerButton} onPress={handleClearAllData}>
          <Text style={styles.dangerButtonText}>Clear All Data</Text>
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>About</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Tor Privacy Browser</Text>
          <Text style={styles.infoSubtext}>Version 1.0.0</Text>
          <Text style={styles.infoSubtext}>
            A privacy-focused browser with Tor integration
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  testButton: {
    backgroundColor: Colors.accent,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  testButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  renewButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  renewButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  dangerButton: {
    backgroundColor: Colors.error,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  infoSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default SettingsScreen;
