import { View, Text } from 'react-native'
import React from 'react'
import { Box, Button, Center } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
const CartEmpty = () => {
  const navigation = useNavigation()
  return (
    <Box flex={1} px={4}>
        <Center h='90%'>
        <Center w={200} h={200} bg="white" rounded="full">
        <FontAwesome name='shopping-basket' size={64} color="#7e9e1e" />
            </Center>
      <Text  style={{color:"#7e9e1e"}}  bold mt={5}>CART IS EMPTY</Text>
        </Center>
  
    </Box>
  )
}

export default CartEmpty