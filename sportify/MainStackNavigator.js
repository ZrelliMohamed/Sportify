import React, { createContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator.js';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import CarteItems from './screens/store/CarteItems.js';
import Checkout from './screens/store/Checkout.js';
import {StripeProvider} from '@stripe/stripe-react-native'
import ConversationList from './screens/ConversationList.js'
import ChatBox from './screens/ChatBox.js'
import Exercises from './Coach Interface/Exercises.js';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProgramesConfirmation from './Coach Interface/ProgramesConfirmation.js';
import ProgramView from './Coach Interface/ProgramView.js';
import UserOrders from './screens/store/UserOrders.js';
const UserDataContext = createContext();
const CartContext = createContext();
const ToggleContext = createContext();
const ProgContext = createContext();

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const STRIPE_KEY='pk_test_51N81TcDhD2qNY2jv3WuG2om74vGFnwvzkWHjvlx2xSm7pqwZqHvRlxKWEGqOw4FPWfqFtYu6hmOGumWYS0qvtZGt00ey0kmgIm'
  const route = useRoute();
  const [userData, setUserData] = useState(route.params.userData);
  const [cart, setCart] = useState([]);
  const [toggle,setToggle] = useState(false)
  const retoggle= ()=>{
    setToggle(!toggle)
  }
  const navigation = useNavigation()
  const addtocart = (options) => {
    const [productId, value] = options;
    const index = cart.findIndex((item) => item[0] === productId);
    if (index === -1) {
      setCart([...cart, options]);
    } else {
      setCart([...cart.slice(0, index), options, ...cart.slice(index + 1)]);
    }
  };
    const [programes,setProgrames]=useState({})
    const [ProgToPurchase,setProgToPurchase]=useState(null)

    const setProPurchased =(option)=> {
      setProgToPurchase(option)
    }
   

  return (
    <StripeProvider publishableKey={STRIPE_KEY}>
      <ProgContext.Provider value={{ProgToPurchase,setProgToPurchase}}>
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <CartContext.Provider value={{ cart, setCart }}>
      <ToggleContext.Provider value={{ toggle, retoggle }}>
        <Stack.Navigator initialRouteName="BottomTabNavigator">
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: true, headerStyle: { backgroundColor: 'black', },headerTitleStyle: { fontSize: 20,fontWeight: 'bold', color: 'white'  } }}/>
          <Stack.Screen name="ProfileScreen" component={ProfileScreen}  options={{ headerShown: false }} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="ProgramView" component={ProgramView} />
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
        <Stack.Screen name="CoachProfile" component={CoachProfile} options={{headerShown:false}} initialParams={{setProPurchased:setProPurchased}}/>
        <Stack.Screen name="Chat" component={Chat} options={{headerShown:false}}/>
        <Stack.Screen name="Payment" component={Payment} options={{headerShown:false}}/>
        <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
        <Stack.Screen name="ConversationList" component={ConversationList} options={{headerShown:false}}/>
        <Stack.Screen name="ChatBox" component={ChatBox} options={{headerShown:false}}/>
        <Stack.Screen name="Exercises" component={Exercises} options={{headerTitle: 'Programe',
      headerRight: () => (
        <TouchableOpacity
        onPress={() => navigation.navigate('Confirmation')}
        style={{ marginRight: 16 }}
        >
          <Ionicons
            name="checkmark"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      ),  
    }} initialParams={{setProg:setProgrames}} />
       <Stack.Screen name="Confirmation" component={ProgramesConfirmation} options={{headerShown:true}} initialParams={{programes:programes}} />
        <Stack.Screen name="Orders" component={UserOrders}/>
        </Stack.Navigator>
        </ToggleContext.Provider>
      </CartContext.Provider>
    </UserDataContext.Provider>
      </ProgContext.Provider>
    </StripeProvider>
  );
};

export { UserDataContext, CartContext,ToggleContext,ProgContext};
export default MainStackNavigator;
