import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from "./LoginPage"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Sign from './Sign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import ForgetPassword from './ForgotPassword';

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

export default function BottomNavigation() {
  
 
      
  return (
 <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Login" component={LoginPage} 
       options={{
                tabBarIcon: ({ color, size }) => (
                   <Ionicons name="log-in" color={color} size={size} />
                ),
              }} />
      <Tab.Screen name="sign" component={Sign} 
       options={{
                 tabBarIcon: ({ color, size }) => (
                   <Entypo name="add-user" color={color} size={size} />
                ),
              }} />
    </Tab.Navigator>
  </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});