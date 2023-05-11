import { View, Text } from 'react-native'
import React,{useContext, useState} from 'react'
import { Box, Button, Center, HStack, ScrollView } from 'native-base'
import CartEmpty from './CartEmpty'
import CarteItems from './CarteItems'
import { CartContext } from '../../MainStackNavigator';
const CarteScreen = () => {
  const { cart, setCart } = useContext(CartContext);
  const [total,setTotale]=useState(0)
  
  return (
    <Box flex={1} safeAreaTop bg={"gray.200"}>
        {/* Header */}
        <Center w="full" py={5}>
            <Text color="black" fontSize={20} bold>
                CART
            </Text>
        </Center>
      {/* If Carte is Empty display this component */}
     {cart.length ===0 ? <CartEmpty/> :
     <ScrollView showsVerticalScrollIndicator={false}>
      <CarteItems setTotale={setTotale}/>
      <Center mt={5}>
            <HStack style={{borderRadius:50,justifyContent:"space-between",backgroundColor:"white",shadowOffset:2}} w='90%' pl={5} h={45} alignItems={"center"}>
            <Text >TOTAL</Text>
            <Button borderRadius={50} px={10} bg='#7e9e1e'  >{`$${total}`}</Button>
            </HStack>
        </Center>
        <Button borderRadius={100} mt={15} bg='black' m={50} h={70}> CHECKOUT</Button>
      </ScrollView> 
     
      }
     

    </Box>
  )
}

export default CarteScreen