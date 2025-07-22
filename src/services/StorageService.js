import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  // Keys for different data types
  static KEYS = {
    BOOKMARKS: 'bookmarks',
    HISTORY: 'browsing_history',
    SETTINGS: 'app_settings',
    TABS: 'browser_tabs',
  };

  // Bookmarks management
  async getBookmarks() {
    try {
      const bookmarks = await AsyncStorage.getItem(StorageService.KEYS.BOOKMARKS);
      return bookmarks ? JSON.parse(bookmarks) : [];
    } catch (error) {
      console.error('Failed to get bookmarks:', error);
      return [];
    }
  }

  async addBookmark(bookmark) {
    try {
      const bookmarks = await this.getBookmarks();
      const updatedBookmarks = [bookmark, ...bookmarks];
      await AsyncStorage.setItem(
        StorageService.KEYS.BOOKMARKS,
        JSON.stringify(updatedBookmarks)
      );
      return true;
    } catch (error) {
      console.error('Failed to add bookmark:', error);
      return false;
    }
  }

  async removeBookmark(bookmarkId) {
    try {
      const bookmarks = await this.getBookmarks();
      const updatedBookmarks = bookmarks.filter(b => b.id !== bookmarkId);
      await AsyncStorage.setItem(
        StorageService.KEYS.BOOKMARKS,
        JSON.stringify(updatedBookmarks)
      );
      return true;
    } catch (error) {
      console.error('Failed to remove bookmark:', error);
      return false;
    }
  }

  // History management
  async getHistory() {
    try {
      const history = await AsyncStorage.getItem(StorageService.KEYS.HISTORY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Failed to get history:', error);
      return [];
    }
  }

  async addToHistory(historyItem) {
    try {
      const history = await this.getHistory();
      
      // Remove duplicate entries for the same URL
      const filteredHistory = history.filter(item => item.url !== historyItem.url);
      
      // Add new entry at the beginning
      const updatedHistory = [
        {...historyItem, id: Date.now().toString()},
        ...filteredHistory
      ];
      
      // Keep only last 1000 entries
      const trimmedHistory = updatedHistory.slice(0, 1000);
      
      await AsyncStorage.setItem(
        StorageService.KEYS.HISTORY,
        JSON.stringify(trimmedHistory)
      );
      return true;
    } catch (error) {
      console.error('Failed to add to history:', error);
      return false;
    }
  }

  async removeHistoryItem(itemId) {
    try {
      const history = await this.getHistory();
      const updatedHistory = history.filter(item => item.id !== itemId);
      await AsyncStorage.setItem(
        StorageService.KEYS.HISTORY,
        JSON.stringify(updatedHistory)
      );
      return true;
    } catch (error) {
      console.error('Failed to remove history item:', error);
      return false;
    }
  }

  async clearHistory() {
    try {
      await AsyncStorage.setItem(StorageService.KEYS.HISTORY, JSON.stringify([]));
      return true;
    } catch (error) {
      console.error('Failed to clear history:', error);
      return false;
    }
  }

  // Settings management
  async getSettings() {
    try {
      const settings = await AsyncStorage.getItem(StorageService.KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : {
        torEnabled: false,
        javascriptEnabled: true,
        cookiesEnabled: false,
        adBlockEnabled: true,
      };
    } catch (error) {
      console.error('Failed to get settings:', error);
      return {};
    }
  }

  async saveSetting(key, value) {
    try {
      const settings = await this.getSettings();
      settings[key] = value;
      await AsyncStorage.setItem(
        StorageService.KEYS.SETTINGS,
        JSON.stringify(settings)
      );
      return true;
    } catch (error) {
      console.error('Failed to save setting:', error);
      return false;
    }
  }

  async getTorEnabled() {
    try {
      const settings = await this.getSettings();
      return settings.torEnabled || false;
    } catch (error) {
      return false;
    }
  }

  // Tabs management
  async getTabs() {
    try {
      const tabs = await AsyncStorage.getItem(StorageService.KEYS.TABS);
      return tabs ? JSON.parse(tabs) : [];
    } catch (error) {
      console.error('Failed to get tabs:', error);
      return [];
    }
  }

  async saveTabs(tabs) {
    try {
      await AsyncStorage.setItem(
        StorageService.KEYS.TABS,
        JSON.stringify(tabs)
      );
      return true;
    } catch (error) {
      console.error('Failed to save tabs:', error);
      return false;
    }
  }

  // Clear all data
  async clearAllData() {
    try {
      await AsyncStorage.multiRemove([
        StorageService.KEYS.BOOKMARKS,
        StorageService.KEYS.HISTORY,
        StorageService.KEYS.SETTINGS,
        StorageService.KEYS.TABS,
      ]);
      return true;
    } catch (error) {
      console.error('Failed to clear all data:', error);
      return false;
    }
  }
}

export const StorageService = new StorageService();
