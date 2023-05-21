import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, FormControl, Heading, HStack, Input, ScrollView, Spacer, Text } from 'native-base';
import API_URL from '../../screneens/var';
import { CartContext,UserDataContext } from '../../MainStackNavigator';
import {useStripe} from '@stripe/stripe-react-native'
import axios from 'axios';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Checkout = () => {
  const {initPaymentSheet,presentPaymentSheet}= useStripe()
  const { cart, setCart } = useContext(CartContext);
  const { userData } = useContext(UserDataContext);
  const [ItemtoBuy, setItemToBuy] = useState([]);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation()
  const onCheckout = async()=>{
    const response = await axios.post(`${API_URL}/payments/intents`,{amount:Math.floor(total*100)})
      const initResponse =await initPaymentSheet({
        merchantDisplayName:'Sportify',
        paymentIntentClientSecret:response.data.paymentIntent
      })
      if (initResponse.error){
        console.log(initResponse.error);
        Alert.alert('Something went Wrong')
        return ;
      }
      await presentPaymentSheet()
      setCart([])
       axios.post(`${API_URL}/orders/addorderTo/${userData.User_Id}`,ItemtoBuy).then((res)=>console.log(res))
       .catch(err=>console.log(err))
       navigation.navigate('ProfileScreen')

  }
  console.log(userData);
  useEffect(() => {
    axios
      .post(`${API_URL}/products/ProductCart`, { cart: cart })
      .then((res) => {
        setItemToBuy(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let orderTotal = 0;
    for (const item of ItemtoBuy) {
      orderTotal += item.product_price * item.QuantiteCommande;
    }
    setTotal(orderTotal);
  }, [ItemtoBuy]);
  return (
    <ScrollView>
      <Box padding={4}>
        <Heading size="md" mb={4}>
          Checkout
        </Heading>
        {ItemtoBuy.length > 0 &&
          ItemtoBuy.map((item, index) => (
            <Box
              key={index}
              borderWidth={1}
              borderRadius="md"
              borderColor="gray.200"
              padding={4}
              marginBottom={4}
            >
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                {item.product_name}
              </Text>
              <Text fontSize="lg" fontWeight="bold" color="green.500">
                $ {item.product_price}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Quantity: {item.QuantiteCommande}
              </Text>
            </Box>
          ))}
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Total: $ {total}
        </Text>
        <Button colorScheme="blue" onPress={()=>onCheckout()}>Place Order</Button>
      </Box>
    </ScrollView>
  );
};

export default Checkout;
