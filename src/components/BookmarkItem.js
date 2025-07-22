import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {Colors} from '../styles/Colors';

const BookmarkItem = ({bookmark, onPress, onDelete}) => {
  const handleLongPress = () => {
    Alert.alert(
      'Bookmark Options',
      `Options for "${bookmark.title}"`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', style: 'destructive', onPress: onDelete},
      ]
    );
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
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🔖</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {bookmark.title}
        </Text>
        <Text style={styles.url} numberOfLines={1}>
          {formatUrl(bookmark.url)}
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
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
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

export default BookmarkItem;
