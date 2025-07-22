import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Colors} from '../styles/Colors';

const TabBar = ({tabs, currentTabId, onTabPress, onCloseTab, onNewTab}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={styles.tabsContainer}
        showsHorizontalScrollIndicator={false}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              tab.id === currentTabId && styles.activeTab,
            ]}
            onPress={() => onTabPress(tab)}>
            <View style={styles.tabContent}>
              <Text
                style={[
                  styles.tabTitle,
                  tab.id === currentTabId && styles.activeTabTitle,
                ]}
                numberOfLines={1}>
                {tab.title || 'New Tab'}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => onCloseTab(tab.id)}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.newTabButton} onPress={onNewTab}>
        <Text style={styles.newTabButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tabsContainer: {
    flex: 1,
  },
  tab: {
    backgroundColor: Colors.background,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    minWidth: 120,
    maxWidth: 200,
  },
  activeTab: {
    backgroundColor: Colors.surface,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tabTitle: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 8,
  },
  activeTabTitle: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  newTabButton: {
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  newTabButtonText: {
    color: Colors.background,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TabBar;
