import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {Colors} from '../styles/Colors';

const HistoryItem = ({item, onPress, onDelete}) => {
  const handleLongPress = () => {
    Alert.alert(
      'History Options',
      `Options for "${item.title}"`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', style: 'destructive', onPress: onDelete},
      ]
    );
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };

  const formatUrl = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return url;
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={handleLongPress}
      activeOpacity={0.7}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.url} numberOfLines={1}>
          {formatUrl(item.url)}
        </Text>
      </View>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  timeContainer: {
    width: 60,
    marginRight: 12,
  },
  timeText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  url: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  deleteButtonText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HistoryItem;
