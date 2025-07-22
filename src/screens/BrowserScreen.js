import React, {useState, useRef, useContext} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import {WebView} from 'react-native-webview';
import AddressBar from '../components/AddressBar';
import {AppContext} from '../context/AppContext';
import {Colors} from '../styles/Colors';
import {validateUrl, formatUrl} from '../utils/UrlUtils';
import {StorageService} from '../services/StorageService';
import {TorService} from '../services/TorService';

const BrowserScreen = () => {
  const {currentTab, updateTab, addToHistory} = useContext(AppContext);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [loading, setLoading] = useState(false);
  const [torStatus, setTorStatus] = useState('Disconnected');
  const [currentCircuit, setCurrentCircuit] = useState(null);
  const webViewRef = useRef(null);

  const handleNavigate = async (url) => {
    try {
      const formattedUrl = formatUrl(url);
      if (!validateUrl(formattedUrl)) {
        Alert.alert('Invalid URL', 'Please enter a valid URL');
        return;
      }

      // Check if URL should be blocked
      if (TorService.isBlockedDomain(formattedUrl)) {
        Alert.alert('Blocked', 'This domain is blocked for privacy protection');
        return;
      }

      // Check if Tor is enabled and route through proxy
      const torEnabled = await StorageService.getTorEnabled();
      if (torEnabled) {
        setTorStatus('Connecting...');
        await TorService.ensureTorConnection();
        setTorStatus('Connected');
        setCurrentCircuit(TorService.getCurrentCircuit());
      }

      updateTab(currentTab.id, {url: formattedUrl});
      
      // Add to history
      addToHistory({
        url: formattedUrl,
        title: formattedUrl,
        timestamp: Date.now(),
      });
    } catch (error) {
      Alert.alert('Navigation Error', 'Failed to navigate to URL');
      setTorStatus('Error');
    }
  };

  const handleWebViewNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setLoading(navState.loading);

    if (navState.url !== currentTab.url) {
      updateTab(currentTab.id, {
        url: navState.url,
        title: navState.title || navState.url,
      });
    }
  };

  const handleRefresh = () => {
    webViewRef.current?.reload();
  };

  const handleGoBack = () => {
    if (canGoBack) {
      webViewRef.current?.goBack();
    }
  };

  const handleGoForward = () => {
    if (canGoForward) {
      webViewRef.current?.goForward();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AddressBar 
        url={currentTab.url}
        onNavigate={handleNavigate}
        loading={loading}
      />
      
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={[styles.navButton, !canGoBack && styles.disabledButton]}
          onPress={handleGoBack}
          disabled={!canGoBack}>
          <Text style={[styles.navButtonText, !canGoBack && styles.disabledText]}>
            ←
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.navButton, !canGoForward && styles.disabledButton]}
          onPress={handleGoForward}
          disabled={!canGoForward}>
          <Text style={[styles.navButtonText, !canGoForward && styles.disabledText]}>
            →
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={handleRefresh}>
          <Text style={styles.navButtonText}>↻</Text>
        </TouchableOpacity>

        {torStatus === 'Connected' && (
          <TouchableOpacity 
            style={styles.torButton} 
            onPress={() => TorService.renewCircuit()}>
            <Text style={styles.torButtonText}>🔒</Text>
          </TouchableOpacity>
        )}
      </View>

      {torStatus === 'Connected' && currentCircuit && (
        <View style={styles.circuitInfo}>
          <Text style={styles.circuitText}>
            🔒 Tor Circuit: {currentCircuit.entry} → {currentCircuit.middle} → {currentCircuit.exit}
          </Text>
        </View>
      )}

      <WebView
        ref={webViewRef}
        source={{uri: currentTab.url || 'about:blank'}}
        style={styles.webView}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        userAgent={torStatus === 'Connected' ? TorService.getWebViewUserAgent() : "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        bounces={false}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  navigationBar: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: Colors.background,
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledText: {
    color: Colors.textSecondary,
  },
  webView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  torButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 8,
    backgroundColor: Colors.tor,
    borderRadius: 8,
  },
  torButtonText: {
    fontSize: 16,
  },
  circuitInfo: {
    backgroundColor: Colors.tor,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  circuitText: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BrowserScreen;
