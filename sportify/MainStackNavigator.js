import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator.js';
import Store from './screens/store/Store.js';
import HomeScreen from './screens/HomeScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import SettingsScreen from './screens/SettingsScreen.js';
import SingleProduct from './screens/store/SingleProduct.js';
import CarteScreen from './screens/store/CarteScreen.js';
import WorkoutScreen from './screens/WorkoutScreen.js';
import ProgramScreen from './screens/ProgramScreen.js';
import ExerciceScreen from './screens/ExerciceScreen.js';
import FitScreen from './screens/FitScreen.js';
import RestScreen from './screens/RestScreen.js';

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
      <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} options={{headerShown:false}}/>
          <Stack.Screen name="ProgramScreen" component={ProgramScreen} options={{headerShown:false}}/>
          <Stack.Screen name="ExerciceScreen" component={ExerciceScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Fit" component={FitScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Rest" component={RestScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
