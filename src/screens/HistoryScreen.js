import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import HistoryItem from '../components/HistoryItem';
import {StorageService} from '../services/StorageService';
import {Colors} from '../styles/Colors';

const HistoryScreen = ({navigation}) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const savedHistory = await StorageService.getHistory();
      setHistory(savedHistory);
    } catch (error) {
      Alert.alert('Error', 'Failed to load browsing history');
    }
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all browsing history?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await StorageService.clearHistory();
              setHistory([]);
            } catch (error) {
              Alert.alert('Error', 'Failed to clear history');
            }
          },
        },
      ]
    );
  };

  const handleDeleteHistoryItem = async (itemId) => {
    try {
      await StorageService.removeHistoryItem(itemId);
      setHistory(history.filter(item => item.id !== itemId));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete history item');
    }
  };

  const handleOpenHistoryItem = (item) => {
    // Navigate to browser with this URL
    navigation.navigate('Browser');
    // TODO: Implement URL navigation in browser
  };

  const renderHistoryItem = ({item}) => (
    <HistoryItem
      item={item}
      onPress={() => handleOpenHistoryItem(item)}
      onDelete={() => handleDeleteHistoryItem(item.id)}
    />
  );

  const groupHistoryByDate = () => {
    const grouped = {};
    history.forEach(item => {
      const date = new Date(item.timestamp).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });
    return grouped;
  };

  const renderHistorySection = () => {
    const grouped = groupHistoryByDate();
    const sections = Object.keys(grouped).map(date => ({
      title: date,
      data: grouped[date],
    }));

    return sections.map(section => (
      <View key={section.title}>
        <Text style={styles.sectionHeader}>{section.title}</Text>
        {section.data.map(item => (
          <HistoryItem
            key={item.id}
            item={item}
            onPress={() => handleOpenHistoryItem(item)}
            onDelete={() => handleDeleteHistoryItem(item.id)}
          />
        ))}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Browsing History</Text>
        {history.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClearHistory}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {history.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No browsing history</Text>
          <Text style={styles.emptyStateSubtext}>
            Your visited websites will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={[{key: 'sections'}]}
          renderItem={() => <View>{renderHistorySection()}</View>}
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
  clearButton: {
    backgroundColor: Colors.error,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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

export default HistoryScreen;
