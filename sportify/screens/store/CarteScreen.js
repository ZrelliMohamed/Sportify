import { View, Text } from 'react-native'
import React,{useContext, useEffect, useState} from 'react'
import { Box, Button, Center, HStack, ScrollView } from 'native-base'
import CartEmpty from './CartEmpty'
import CarteItems from './CarteItems'
import { CartContext,ProgContext } from '../../MainStackNavigator';
import { useNavigation } from '@react-navigation/native'
import ProgrameItemShop from '../../Coach Interface/ProgrameItemShop'
const CarteScreen = () => {
  const { cart, setCart } = useContext(CartContext);
  const { ProgToPurchase,setProgToPurchase } = useContext(ProgContext);
  console.log('here',ProgToPurchase);
  const [total,setTotale]=useState(0)
  const [progPrice,setProgPrice]=useState(0)
  const navigation =useNavigation()
  useEffect(()=>{
    setTotale(total+progPrice)
  },[progPrice])
  console.log('1-',total);
  console.log('2-',progPrice);
  return (
    <Box flex={1} safeAreaTop bg={"gray.200"}>
        {/* Header */}
        <Center w="full" py={5}>
        </Center>
      {/* If Carte is Empty display this component */}
     {cart.length ===0 && ProgToPurchase===null ? <CartEmpty/> :
     <ScrollView showsVerticalScrollIndicator={false}>
      {cart.length !==0 && <CarteItems setTotale={setTotale}/>}
      {ProgToPurchase!==null && <ProgrameItemShop setTotale={setProgPrice}/> }
      <Center mt={5}>
            <HStack style={{borderRadius:50,justifyContent:"space-between",backgroundColor:"white",shadowOffset:2}} w='90%' pl={5} h={45} alignItems={"center"}>
            <Text >TOTAL</Text>
            <Button borderRadius={50} px={10} bg='#7e9e1e'  >{`$${total}`}</Button>
            </HStack>
        </Center>
        
        <Button borderRadius={100} mt={15} bg='black' m={50} h={70}
        onPress={()=>{navigation.navigate("Checkout")}}
        > CHECKOUT</Button>
      </ScrollView> 
     
      }
     

    </Box>
  )
}

export default CarteScreen