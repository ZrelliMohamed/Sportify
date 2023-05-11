import { View, Text ,Animated } from 'react-native'
import React, { useEffect, useState,useContext } from 'react'
import { useRoute } from '@react-navigation/native';
import { Box, ScrollView,Image, Heading, HStack, Center, Spacer,Button } from 'native-base';
import NumericInput from 'react-native-numeric-input'
import Icon from 'react-native-vector-icons/FontAwesome';
import Rating from './Rating';
import Review from './Review';
import axios from 'axios';
import API_URL from '../../screneens/var';
import { ToggleContext } from '../../MainStackNavigator';
const SingleProduct = () => {
  const { toggle, retoggle } = useContext(ToggleContext);
    const [product,setProduct] = useState({})
    const [value,setValue] = useState(1)
    const route = useRoute();
  const { productId } = route.params;
  const {func} = route.params;
  const URL =`${API_URL}/products/${productId}`
  useEffect(()=>{
    axios.get(URL).then((res)=>{
      setProduct(res.data)
      retoggle()
    })
    .catch((err)=>{console.log(err);})
    },[toggle])
    return (
      <Box >
        <ScrollView
        px={5} showsVerticalScrollIndicator={false}
        >
         <Image source={{uri:product.product_image}}
         alt='Image'
         h={300}
         mt={5}
         resizeMode='contain'
         />   
         <Heading bold fontSize={15} mb={2} mt={5} lineHeight={22}>
            {product.product_name}
        </Heading>
        <Rating value={product.rating}/>
        <HStack space={2}  my={5}>
        <NumericInput
  value={value}
  onChange={(newValue) => setValue(newValue)}
  totalWidth={120}
  totalHeight={40}
  iconSize={30}
  step={1}
  maxValue={15}
  minValue={1}
  rounded
  borderColor="#D1D5DB"
  textColor="#374151"
  iconStyle={{ color: '#374151' }}
  rightButtonBackgroundColor="#fff"
  leftButtonBackgroundColor="#fff"
>
  <Icon name="plus" size={20} color="#374151" />
  <Text>{value}</Text>
  <Icon name="minus" size={20} color="#374151" />
</NumericInput>
         <Spacer/>
        <Heading bold color={"black"} fontSize={19}>
            ${product.product_price}
        </Heading>
        </HStack> 
        <Text>
            {product.product_desc}
        </Text>
 <Button bg={"#7e9e1e"} color={"white"} m={10} borderRadius={100}
 onPress={()=>{func([productId,value])}}
 >
            ADD TO CART
            </Button>
            {/* Review */}
            <Review val={product.rating}  productId={productId}/>
        </ScrollView>
        
    </Box>
  )
}

export default SingleProduct

