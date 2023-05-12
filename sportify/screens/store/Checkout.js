import React, { useContext, useState } from 'react';
import { Box, Button, FormControl, Heading, HStack, Input, ScrollView, Spacer, Text } from 'native-base';
import API_URL from '../../screneens/var';
import { CartContext } from '../../MainStackNavigator';
const Checkout = () => {
    const {cart ,setCart} = useContext(CartContext)
    console.log(cart);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          address,
          cartItems,
        }),
      });

      if (response.ok) {
        setCart([]);
        alert('Checkout successful!');
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <Box>
      {/* <ScrollView px={5} showsVerticalScrollIndicator={false}>
        <Heading bold fontSize={20} mt={5} mb={3}>
          Checkout
        </Heading>

        <FormControl mb={3}>
          <FormControl.Label>Name</FormControl.Label>
          <Input placeholder="Enter your name" value={name} onChangeText={setName} />
        </FormControl>

        <FormControl mb={3}>
          <FormControl.Label>Email</FormControl.Label>
          <Input placeholder="Enter your email" value={email} onChangeText={setEmail} />
        </FormControl>

        <FormControl mb={3}>
          <FormControl.Label>Address</FormControl.Label>
          <Input placeholder="Enter your address" value={address} onChangeText={setAddress} />
        </FormControl>

        <Heading bold fontSize={18} mt={5} mb={3}>
          Order Summary
        </Heading>

        {cart.map((item) => (
          <HStack key={item[0]} space={2} my={3}>
            <Text fontSize={16}>
              {item[1]} x {item[2].product_name}
            </Text>
            <Spacer />
            <Text bold color={'black'} fontSize={16}>
              ${item[2].product_price * item[1]}
            </Text>
          </HStack>
        ))}

        <Button bg={'#7e9e1e'} color={'white'} m={10} borderRadius={100} onPress={handleSubmit}>
          PLACE ORDER
        </Button>
      </ScrollView> */}
    </Box>
  );
};

export default Checkout;
