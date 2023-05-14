import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Dashboard from './Dashbord';

const Stack = createStackNavigator();

const Appp = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Sportify' }}
      />
      <Stack.Screen
        name="AdminDashboard"
        component={Dashboard}
        options={{ title: 'Sportify Admin Dashboard' }}
      />
    </Stack.Navigator>
  );
};

export default Appp;