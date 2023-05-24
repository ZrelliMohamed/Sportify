import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import { Ionicons,FontAwesome,MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
// Import your components or screens here
import HomeScreen from './screens/HomeScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import CoachList from './screens/CoachList';
import ProfileScreen from './screens/ProfileScreen';
import NewRoutineScreen from './screens/NewRoutineScreen.js';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {

  const { colors } = useTheme();
  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#7e9e1e',
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
              <Ionicons name="home" size={24} color="black" />
            ),
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Workouts"
          component={WorkoutScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="fitness-center" size={24} color="black" />
            ),
            tabBarLabel: 'Workouts',
          }}
        />
        <Tab.Screen
          name="NewRoutine"
          component={NewRoutineScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="add-circle-outline" size={32} color='Black' />
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
                  borderColor: '#ffffff',
                }}
              >
                <MaterialIcons name="create" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Coachs"
          component={CoachList}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="users" size={24} color="black" />
            ),
            tabBarLabel:"Coachs",
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color="black" />
            ),
            tabBarLabel: 'Profile',
          }}
        />
      </Tab.Navigator>
    </>
  );
};
export default BottomTabNavigator;