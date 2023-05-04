import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator.js';
import ProfileScreen from './screens/ProfileScreen.js';
import SettingsScreen from './screens/SettingsScreen';
import WorkoutScreen from './screens/WorkoutScreen.js';
import NewRoutineScreen from './screens/Chat.js';
import { NativeBaseProvider } from 'native-base';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BottomTabNavigator">
          <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen
        name="WorkoutScreen"
        component={WorkoutScreen}
      />
       <Stack.Screen
        name="NewRoutineScreen" 
        component={NewRoutineScreen}
      />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;