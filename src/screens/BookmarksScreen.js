import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import BookmarkItem from '../components/BookmarkItem';
import {StorageService} from '../services/StorageService';
import {Colors} from '../styles/Colors';

const BookmarksScreen = ({navigation}) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBookmark, setNewBookmark] = useState({title: '', url: ''});

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const savedBookmarks = await StorageService.getBookmarks();
      setBookmarks(savedBookmarks);
    } catch (error) {
      Alert.alert('Error', 'Failed to load bookmarks');
    }
  };

  const handleDeleteBookmark = async (bookmarkId) => {
    try {
      await StorageService.removeBookmark(bookmarkId);
      setBookmarks(bookmarks.filter(b => b.id !== bookmarkId));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete bookmark');
    }
  };

  const handleOpenBookmark = (bookmark) => {
    // Navigate to browser with this URL
    navigation.navigate('Browser');
    // TODO: Implement URL navigation in browser
  };

  const handleAddBookmark = async () => {
    if (!newBookmark.title.trim() || !newBookmark.url.trim()) {
      Alert.alert('Error', 'Please enter both title and URL');
      return;
    }

    try {
      const bookmark = {
        id: Date.now().toString(),
        title: newBookmark.title.trim(),
        url: newBookmark.url.trim(),
        timestamp: Date.now(),
      };

      await StorageService.addBookmark(bookmark);
      setBookmarks([bookmark, ...bookmarks]);
      setNewBookmark({title: '', url: ''});
      setShowAddForm(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to add bookmark');
    }
  };

  const renderBookmark = ({item}) => (
    <BookmarkItem
      bookmark={item}
      onPress={() => handleOpenBookmark(item)}
      onDelete={() => handleDeleteBookmark(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookmarks</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddForm(!showAddForm)}>
          <Text style={styles.addButtonText}>
            {showAddForm ? 'Cancel' : '+ Add'}
          </Text>
        </TouchableOpacity>
      </View>

      {showAddForm && (
        <View style={styles.addForm}>
          <TextInput
            style={styles.input}
            placeholder="Bookmark title"
            placeholderTextColor={Colors.textSecondary}
            value={newBookmark.title}
            onChangeText={(text) => setNewBookmark({...newBookmark, title: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="URL"
            placeholderTextColor={Colors.textSecondary}
            value={newBookmark.url}
            onChangeText={(text) => setNewBookmark({...newBookmark, url: text})}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleAddBookmark}>
            <Text style={styles.saveButtonText}>Save Bookmark</Text>
          </TouchableOpacity>
        </View>
      )}

      {bookmarks.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No bookmarks yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Add your favorite websites to access them quickly
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          renderItem={renderBookmark}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  addForm: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  input: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    color: Colors.text,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default BookmarksScreen;
