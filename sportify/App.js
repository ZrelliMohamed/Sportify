import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator.js';
import ProfileScreen from './screens/ProfileScreen.js';
import SettingsScreen from './screens/SettingsScreen';
import { NativeBaseProvider } from 'native-base';
import WorkoutScreen from './screens/WorkoutScreen.js';
import ProgramScreen from './screens/ProgramScreen.js';
import ExerciceScreen from './screens/ExerciceScreen.js';
import FitScreen from './screens/FitScreen.js';
import RestScreen from './screens/RestScreen.js';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BottomTabNavigator">
          <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown:false}}/>
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown:false}}/>
          <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} options={{headerShown:false}}/>
          <Stack.Screen name="ProgramScreen" component={ProgramScreen} options={{headerShown:false}}/>
          <Stack.Screen name="ExerciceScreen" component={ExerciceScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Fit" component={FitScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Rest" component={RestScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;