import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default App;