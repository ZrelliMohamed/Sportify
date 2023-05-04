import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './screneens/LoginPage.js';
import ForgetPassword from './screneens/ForgotPassword.js';
import VerifyCodeForm from './screneens/VerifyCodeForm.js';
import ResetPasswordForm from './screneens/ResetPasswordForm.js';
import Sign from './screneens/Sign.js';
import { NativeBaseProvider } from 'native-base';
import MainStackNavigator from './MainStackNavigator.js';

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
          <Stack.Screen name="MainStackNavigator" component={MainStackNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
