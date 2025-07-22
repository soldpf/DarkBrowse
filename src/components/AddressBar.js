import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import {Colors} from '../styles/Colors';
import {StorageService} from '../services/StorageService';
import {isSecureUrl, isOnionUrl} from '../utils/UrlUtils';

const AddressBar = ({url, onNavigate, loading}) => {
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [torEnabled, setTorEnabled] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setInputValue(url || '');
    }
  }, [url, isEditing]);

  useEffect(() => {
    checkTorStatus();
  }, []);

  const checkTorStatus = async () => {
    const enabled = await StorageService.getTorEnabled();
    setTorEnabled(enabled);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onNavigate(inputValue.trim());
      setIsEditing(false);
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
    setInputValue(url || '');
  };

  const handleBlur = () => {
    setIsEditing(false);
    setInputValue(url || '');
  };

  return (
    <View style={styles.container}>
      <View style={styles.addressBarContainer}>
        <View style={styles.securityIndicator}>
          {isOnionUrl(url) ? (
            <Text style={styles.onionText}>🧅</Text>
          ) : torEnabled ? (
            <Text style={styles.torText}>🔒</Text>
          ) : isSecureUrl(url) ? (
            <Text style={styles.secureText}>🔒</Text>
          ) : (
            <Text style={styles.insecureText}>⚠️</Text>
          )}
        </View>
        
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmit}
          placeholder="Enter URL or search..."
          placeholderTextColor={Colors.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          returnKeyType="go"
          selectTextOnFocus={true}
        />

        <View style={styles.actionContainer}>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <TouchableOpacity style={styles.goButton} onPress={handleSubmit}>
              <Text style={styles.goButtonText}>Go</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  addressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  securityIndicator: {
    marginRight: 8,
  },
  secureText: {
    fontSize: 16,
    color: Colors.secure,
  },
  insecureText: {
    fontSize: 16,
    color: Colors.insecure,
  },
  torText: {
    fontSize: 16,
    color: Colors.tor,
  },
  onionText: {
    fontSize: 16,
    color: Colors.onion,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 8,
  },
  actionContainer: {
    marginLeft: 8,
  },
  goButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  goButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default AddressBar;
