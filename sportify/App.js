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
import HeightPicker from './screneens/HeightPicker.js'
import GenderPicker from './screneens/GenderPicker.js'
import WeightPicker from './screneens/WeightPicker.js'
import SportGoalSelector from './screneens/SportGoalSelector.js'
import HomeScreen from './screens/HomeScreen.js'
import Dashbord from './Admin/Dashbord.js';
import Appp from './Admin/Appp.js';
import Login from './Admin/Login.js';
import Checkout from './screens/store/Checkout.js';
import ChangePassword from './screens/ChangePassword.js';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginPage">
          <Stack.Screen name="LoginPage" component={LoginPage}  options={{ headerShown: false }}/>
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="VerifyCodeForm" component={VerifyCodeForm} />
          <Stack.Screen name="ResetPasswordForm" component={ResetPasswordForm} />
          <Stack.Screen name="Sign" component={Sign} options={{ headerShown: false }}/>
          <Stack.Screen name="HeightPicker" component={HeightPicker}  options={{headerShown: true, headerStyle: { backgroundColor: 'black', },headerTitleStyle: { fontSize: 20,fontWeight: 'bold', color: 'white'  } }}/>
          <Stack.Screen name="GenderPicker" component={GenderPicker} options={{headerShown: true, headerStyle: { backgroundColor: 'black', },headerTitleStyle: { fontSize: 20,fontWeight: 'bold', color: 'white'  } }}/>
          <Stack.Screen name="WeightPicker" component={WeightPicker}  options={{headerShown: true, headerStyle: { backgroundColor: 'black', },headerTitleStyle: { fontSize: 20,fontWeight: 'bold', color: 'white'  } }}/>
          <Stack.Screen name="SportGoalSelector" component={SportGoalSelector} options={{headerShown: true, headerStyle: { backgroundColor: 'black', },headerTitleStyle: { fontSize: 20,fontWeight: 'bold', color: 'white'  } }}/>
          <Stack.Screen name="HomeScreen" component={HomeScreen}  />
          <Stack.Screen name="MainStackNavigator" component={MainStackNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Admin" component={Dashbord} options={{ headerShown: false }} />
          <Stack.Screen name="AdminLogin" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="AdminApp" component={Appp} options={{ headerShown: false }} />
          <Stack.Screen name='Checkout' component={Checkout} options={{ headerShown: false }}/>
          <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;










