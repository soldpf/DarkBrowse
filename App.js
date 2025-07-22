import React from 'react';
import {StatusBar} from 'react-native';
import {AppContextProvider} from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import {Colors} from './src/styles/Colors';

const App = () => {
  return (
    <AppContextProvider>
      <StatusBar 
        backgroundColor={Colors.background} 
        barStyle="light-content" 
        translucent={false}
      />
      <AppNavigator />
    </AppContextProvider>
  );
};

export default App;
