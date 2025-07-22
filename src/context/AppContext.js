import React, {createContext, useReducer, useEffect} from 'react';
import {StorageService} from '../services/StorageService';

// Initial state
const initialState = {
  tabs: [
    {
      id: '1',
      url: '',
      title: 'New Tab',
      timestamp: Date.now(),
    }
  ],
  currentTabId: '1',
  history: [],
  bookmarks: [],
  settings: {
    torEnabled: false,
    javascriptEnabled: true,
    cookiesEnabled: false,
    adBlockEnabled: true,
  },
};

// Action types
const ActionTypes = {
  SET_TABS: 'SET_TABS',
  CREATE_TAB: 'CREATE_TAB',
  CLOSE_TAB: 'CLOSE_TAB',
  UPDATE_TAB: 'UPDATE_TAB',
  SWITCH_TAB: 'SWITCH_TAB',
  ADD_TO_HISTORY: 'ADD_TO_HISTORY',
  SET_HISTORY: 'SET_HISTORY',
  ADD_BOOKMARK: 'ADD_BOOKMARK',
  REMOVE_BOOKMARK: 'REMOVE_BOOKMARK',
  SET_BOOKMARKS: 'SET_BOOKMARKS',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_TABS:
      return {
        ...state,
        tabs: action.payload,
      };

    case ActionTypes.CREATE_TAB:
      const newTab = {
        id: Date.now().toString(),
        url: '',
        title: 'New Tab',
        timestamp: Date.now(),
      };
      return {
        ...state,
        tabs: [...state.tabs, newTab],
        currentTabId: newTab.id,
      };

    case ActionTypes.CLOSE_TAB:
      const filteredTabs = state.tabs.filter(tab => tab.id !== action.payload);
      const remainingTabs = filteredTabs.length > 0 ? filteredTabs : [
        {
          id: Date.now().toString(),
          url: '',
          title: 'New Tab',
          timestamp: Date.now(),
        }
      ];
      
      let newCurrentTabId = state.currentTabId;
      if (state.currentTabId === action.payload) {
        newCurrentTabId = remainingTabs[0].id;
      }

      return {
        ...state,
        tabs: remainingTabs,
        currentTabId: newCurrentTabId,
      };

    case ActionTypes.UPDATE_TAB:
      return {
        ...state,
        tabs: state.tabs.map(tab =>
          tab.id === action.payload.id
            ? { ...tab, ...action.payload.updates, timestamp: Date.now() }
            : tab
        ),
      };

    case ActionTypes.SWITCH_TAB:
      return {
        ...state,
        currentTabId: action.payload,
      };

    case ActionTypes.ADD_TO_HISTORY:
      const newHistoryItem = {
        ...action.payload,
        id: Date.now().toString(),
      };
      
      // Remove duplicate entries and add new one at the beginning
      const filteredHistory = state.history.filter(
        item => item.url !== action.payload.url
      );
      
      return {
        ...state,
        history: [newHistoryItem, ...filteredHistory].slice(0, 1000), // Keep only last 1000 items
      };

    case ActionTypes.SET_HISTORY:
      return {
        ...state,
        history: action.payload,
      };

    case ActionTypes.ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: [action.payload, ...state.bookmarks],
      };

    case ActionTypes.REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== action.payload),
      };

    case ActionTypes.SET_BOOKMARKS:
      return {
        ...state,
        bookmarks: action.payload,
      };

    case ActionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };

    default:
      return state;
  }
};

// Create context
export const AppContext = createContext();

// Context provider component
export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from storage on app start
  useEffect(() => {
    loadStoredData();
  }, []);

  // Save tabs whenever they change
  useEffect(() => {
    StorageService.saveTabs(state.tabs);
  }, [state.tabs]);

  const loadStoredData = async () => {
    try {
      // Load tabs
      const storedTabs = await StorageService.getTabs();
      if (storedTabs.length > 0) {
        dispatch({ type: ActionTypes.SET_TABS, payload: storedTabs });
      }

      // Load history
      const storedHistory = await StorageService.getHistory();
      dispatch({ type: ActionTypes.SET_HISTORY, payload: storedHistory });

      // Load bookmarks
      const storedBookmarks = await StorageService.getBookmarks();
      dispatch({ type: ActionTypes.SET_BOOKMARKS, payload: storedBookmarks });

      // Load settings
      const storedSettings = await StorageService.getSettings();
      dispatch({ type: ActionTypes.UPDATE_SETTINGS, payload: storedSettings });
    } catch (error) {
      console.error('Failed to load stored data:', error);
    }
  };

  // Action creators
  const createTab = () => {
    dispatch({ type: ActionTypes.CREATE_TAB });
  };

  const closeTab = (tabId) => {
    dispatch({ type: ActionTypes.CLOSE_TAB, payload: tabId });
  };

  const updateTab = (tabId, updates) => {
    dispatch({ 
      type: ActionTypes.UPDATE_TAB, 
      payload: { id: tabId, updates } 
    });
  };

  const switchTab = (tabId) => {
    dispatch({ type: ActionTypes.SWITCH_TAB, payload: tabId });
  };

  const addToHistory = async (historyItem) => {
    dispatch({ type: ActionTypes.ADD_TO_HISTORY, payload: historyItem });
    // Also save to storage
    await StorageService.addToHistory(historyItem);
  };

  const addBookmark = async (bookmark) => {
    const bookmarkWithId = {
      ...bookmark,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    
    dispatch({ type: ActionTypes.ADD_BOOKMARK, payload: bookmarkWithId });
    // Also save to storage
    await StorageService.addBookmark(bookmarkWithId);
  };

  const removeBookmark = async (bookmarkId) => {
    dispatch({ type: ActionTypes.REMOVE_BOOKMARK, payload: bookmarkId });
    // Also remove from storage
    await StorageService.removeBookmark(bookmarkId);
  };

  const updateSettings = async (newSettings) => {
    dispatch({ type: ActionTypes.UPDATE_SETTINGS, payload: newSettings });
    // Save each setting individually
    for (const [key, value] of Object.entries(newSettings)) {
      await StorageService.saveSetting(key, value);
    }
  };

  // Get current tab
  const currentTab = state.tabs.find(tab => tab.id === state.currentTabId) || state.tabs[0];

  // Context value
  const contextValue = {
    // State
    tabs: state.tabs,
    currentTab,
    currentTabId: state.currentTabId,
    history: state.history,
    bookmarks: state.bookmarks,
    settings: state.settings,
    
    // Actions
    createTab,
    closeTab,
    updateTab,
    switchTab,
    addToHistory,
    addBookmark,
    removeBookmark,
    updateSettings,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
