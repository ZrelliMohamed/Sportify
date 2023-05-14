import React, { createContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator.js';
import Store from './screens/store/Store.js';
import HomeScreen from './screens/HomeScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import CoachProfile from './screens/CoachProfile.js';
import CoachList from './screens/CoachList.js';
import SettingsScreen from './screens/SettingsScreen.js';
import SingleProduct from './screens/store/SingleProduct.js';
import CarteScreen from './screens/store/CarteScreen.js';
import WorkoutScreen from './screens/WorkoutScreen.js';
import ProgramScreen from './screens/ProgramScreen.js';
import ExerciceScreen from './screens/ExerciceScreen.js';
import FitScreen from './screens/FitScreen.js';
import Chat from './screens/Chat.js';
import Payment from './screens/Payment.js';
import RestScreen from './screens/RestScreen.js';
import { useRoute } from '@react-navigation/native';
import CarteItems from './screens/store/CarteItems.js';
import Checkout from './screens/store/Checkout.js';

const UserDataContext = createContext();
const CartContext = createContext();
const ToggleContext = createContext();

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const route = useRoute();
  const [userData, setUserData] = useState(route.params.userData);
  const [cart, setCart] = useState([]);
  const [toggle,setToggle] = useState(false)
  const retoggle= ()=>{
    setToggle(!toggle)
  }
  const addtocart = (options) => {
    const [productId, value] = options;
    const index = cart.findIndex((item) => item[0] === productId);
    if (index === -1) {
      setCart([...cart, options]);
    } else {
      setCart([...cart.slice(0, index), options, ...cart.slice(index + 1)]);
    }
  };
  console.log(cart,'inmain');
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <CartContext.Provider value={{ cart, setCart }}>
      <ToggleContext.Provider value={{ toggle, retoggle }}>
        <Stack.Navigator initialRouteName="BottomTabNavigator">
          <Stack.Screen name="Store" component={Store} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="SingleProduct" component={SingleProduct} options={{ headerShown: false }}
            initialParams={{ func: addtocart, cart: cart }}/>
          <Stack.Screen name="CarteScreen" component={CarteScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }}/>
          <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ProgramScreen" component={ProgramScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ExerciceScreen" component={ExerciceScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Fit"  component={FitScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Rest" component={RestScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CoachList" component={CoachList} options={{headerShown:false}}/>
        <Stack.Screen name="CoachProfile" component={CoachProfile} options={{headerShown:false}}/>
        <Stack.Screen name="Chat" component={Chat} options={{headerShown:false}}/>
        <Stack.Screen name="Payment" component={Payment} options={{headerShown:false}}/>
        <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
        </Stack.Navigator>
        </ToggleContext.Provider>
      </CartContext.Provider>
    </UserDataContext.Provider>
  );
};

export { UserDataContext, CartContext,ToggleContext};
export default MainStackNavigator;
