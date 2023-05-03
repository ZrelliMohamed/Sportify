import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator.js';
import ProfileScreen from './screens/ProfileScreen.js';
import SettingsScreen from './screens/SettingsScreen';
import { NativeBaseProvider } from 'native-base';
import SingleProduct from './screens/store/SingleProduct.js';
import CarteScreen from './screens/store/CarteScreen.js';
import Store from './screens/store/Store.js';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BottomTabNavigator">
          <Stack.Screen name="Store" component={Store} />
          <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="SingleProduct" component={SingleProduct}  options={{ headerShown: false }}  />
          <Stack.Screen name="CarteScreen" component={CarteScreen}  options={{ headerShown: false }}  />
        
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;