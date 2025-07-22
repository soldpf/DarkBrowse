import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
} from 'react-native';
import {AppContext} from '../context/AppContext';
import {Colors} from '../styles/Colors';

const TabsScreen = ({navigation}) => {
  const {tabs, currentTab, createTab, closeTab, switchTab} = useContext(AppContext);

  const handleTabPress = (tab) => {
    switchTab(tab.id);
    navigation.navigate('Browser');
  };

  const handleCloseTab = (tabId) => {
    if (tabs.length === 1) {
      Alert.alert('Cannot Close', 'You must have at least one tab open');
      return;
    }
    closeTab(tabId);
  };

  const handleNewTab = () => {
    createTab();
    navigation.navigate('Browser');
  };

  const renderTab = ({item}) => {
    const isActive = item.id === currentTab?.id;
    
    return (
      <View style={[styles.tabItem, isActive && styles.activeTab]}>
        <TouchableOpacity
          style={styles.tabContent}
          onPress={() => handleTabPress(item)}>
          <Text style={[styles.tabTitle, isActive && styles.activeTabTitle]} numberOfLines={1}>
            {item.title || 'New Tab'}
          </Text>
          <Text style={[styles.tabUrl, isActive && styles.activeTabUrl]} numberOfLines={1}>
            {item.url || 'about:blank'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => handleCloseTab(item.id)}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tabs ({tabs.length})</Text>
        <TouchableOpacity style={styles.newTabButton} onPress={handleNewTab}>
          <Text style={styles.newTabButtonText}>+ New Tab</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tabs}
        renderItem={renderTab}
        keyExtractor={(item) => item.id}
        style={styles.tabsList}
        showsVerticalScrollIndicator={false}
      />
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
  newTabButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  newTabButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  tabsList: {
    flex: 1,
    padding: 16,
  },
  tabItem: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeTab: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryDark,
  },
  tabContent: {
    flex: 1,
  },
  tabTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  activeTabTitle: {
    color: Colors.primary,
  },
  tabUrl: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  activeTabUrl: {
    color: Colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  closeButtonText: {
    color: Colors.background,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TabsScreen;
