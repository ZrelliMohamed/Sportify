
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './screneens/LoginPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Sign from './screneens/Sign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import ForgetPassword from './screneens/ForgotPassword';
import BottomNavigation from './screneens/BottomNavigation';

function Login() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login</Text>
    </View>
  );
}
function SignUp() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SignUp</Text>
    </View>
  );
}
const Tab = createBottomTabNavigator();

  <BottomNavigation/>

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator.js';
import ProfileScreen from './screens/ProfileScreen.js';
import SettingsScreen from './screens/SettingsScreen';
import { NativeBaseProvider } from 'native-base';

const Stack = createNativeStackNavigator();

<BottomNavigation/>
const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BottomNavigation">
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
          <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>

  );
};
export default App;