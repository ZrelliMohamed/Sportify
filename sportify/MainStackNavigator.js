import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator.js';
import Store from './screens/store/Store.js';
import HomeScreen from './screens/HomeScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import SettingsScreen from './screens/SettingsScreen.js';
import SingleProduct from './screens/store/SingleProduct.js';
import CarteScreen from './screens/store/CarteScreen.js';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabNavigator">
      <Stack.Screen name="Store" component={Store} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="SingleProduct" component={SingleProduct} options={{ headerShown: false }} />
      <Stack.Screen name="CarteScreen" component={CarteScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
