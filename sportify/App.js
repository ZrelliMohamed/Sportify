
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator.js';
import ProfileScreen from './screens/ProfileScreen.js';
import SettingsScreen from './screens/SettingsScreen';
import { NativeBaseProvider } from 'native-base';
import LoginPage from './screneens/LoginPage.js'
import ForgetPassword from './screneens/ForgotPassword.js';
import VerifyCodeForm from './screneens/VerifyCodeForm.js';
import ResetPasswordForm from './screneens/ResetPasswordForm.js'
import Sign from './screneens/Sign.js';
import HeightPicker from './screneens/HeightPicker.js'
import GenderPicker from './screneens/GenderPicker.js'
import WeightPicker from './screneens/WeightPicker.js'
import SportGoalSelector from './screneens/SportGoalSelector.js';
import HomeScreen from './screens/HomeScreen.js';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="VerifyCodeForm" component={VerifyCodeForm} />
        <Stack.Screen name="ResetPasswordForm" component={ResetPasswordForm} />
        <Stack.Screen name="Sign" component={Sign} />
        <Stack.Screen name="HeightPicker" component={HeightPicker} />
        <Stack.Screen name="GenderPicker" component={GenderPicker} />
        <Stack.Screen name="WeightPicker" component={WeightPicker} />
        <Stack.Screen name="SportGoalSelector" component={SportGoalSelector} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;
