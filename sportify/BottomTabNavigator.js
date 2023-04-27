import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Appbar, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
// Import your components or screens here
import HomeScreen from './screens/HomeScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import ProgressScreen from './screens/ProgressScreen';
import SettingsScreen from './screens/ProfileScreen';
import NewRoutineScreen from './screens/NewRoutineScreen.js';
const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  const { colors } = useTheme();
  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#D0FD3E',
          inactiveTintColor: 'black',
          style: {
            backgroundColor: 'white',
            borderTopColor: '#D0FD3E',
          },
          tabStyle: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          labelStyle: {
            fontSize: 12,
            margin: 0,
            paddingBottom: 5,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Workouts"
          component={WorkoutScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="fitness-outline" size={24} color={color} />
            ),
            tabBarLabel: 'Workouts',
          }}
        />
        <Tab.Screen
          name="NewRoutine"
          component={NewRoutineScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="add-circle-outline" size={32} color='#D0FD3E' />
            ),
            tabBarLabel: '',
            tabBarButton: ({ accessibilityRole, onPress, onLongPress }) => (
              <TouchableOpacity
                accessibilityRole={accessibilityRole}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  top: -25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#D0FD3E',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  borderWidth: 5,
                  borderColor: 'white',
                }}
              >
                <Ionicons name="add" size={24} color='white' />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Progress"
          component={ProgressScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="stats-chart-outline" size={24} color={color} />
            ),
            tabBarLabel: 'Progress',
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings-outline" size={24} color={color} />
            ),
            tabBarLabel: 'Settings',
          }}
        />
      </Tab.Navigator>
    </>
  );
};
export default BottomTabNavigator;