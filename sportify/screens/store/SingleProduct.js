import { Text,Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, ScrollView,Image, Heading, HStack, Spacer,Button } from 'native-base';
import NumericInput from 'react-native-numeric-input'
import Rating from './Rating';
import Review from './Review';
import axios from 'axios';
import API_URL from '../../screneens/var';
const SingleProduct = () => {
  const navigation = useNavigation()
  const [toggle, setToggle] = useState(false)
    const [product,setProduct] = useState({})
    const [value,setValue] = useState(1)
    const route = useRoute();
    const {func} = route.params;
  const { productId } = route.params;
  const URL =`${API_URL}/products/${productId}`
  const SPtoggle=()=>{
    setToggle(!toggle)
  }
  useEffect(()=>{
    axios.get(URL).then((res)=>{
      setProduct(res.data)
    })
    .catch((err)=>{console.log(err);})
    },[toggle])
    const handlePurchase = () => {
      Alert.alert('Product Added', 'The product has been added to the cart.', [
        {
          text: 'Purchase',
          onPress: () => navigation.navigate('CarteScreen'),
        },
      ]);
    };
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
        {product.count_in_stock > 0 ? (
  <NumericInput
    value={value}
    totalWidth={140}
    totalHeight={30}
    onChange={(newValue) => setValue(newValue)}
    iconSize={25}
    step={1}
    maxValue={product.count_in_stock}
    minValue={1}
    borderColor="grey"
    rounded
    textColor={"black"}
    iconStyle={{ color: 'white' }}
    rightButtonBackgroundColor={"black"}
    leftButtonBackgroundColor={"black"}
  />
) : (
  <Text style={{ color: 'red', fontWeight: 'bold' }}>OUT OF STOCK</Text>
)}

         <Spacer/>
        <Heading bold color={"black"} fontSize={19}>
            ${product.product_price}
        </Heading>
        </HStack> 
        <Text>
            {product.product_desc}
        </Text>
        <Button
  bg={"#7e9e1e"}
  color={"white"}
  m={10}
  borderRadius={100}
  onPress={() => {
    handlePurchase();
    func([productId, value]);
  }}
  disabled={product.count_in_stock <= 0}
>
  {product.count_in_stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
</Button>

            {/* Review */}
            <Review val={product.rating}  productId={productId} SPtoggle={SPtoggle}/>
        </ScrollView>
        
    </Box>
  )
}

export default SingleProduct

