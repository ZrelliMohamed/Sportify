import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { Box, ScrollView,Image, Heading, HStack, Center, Spacer,Button } from 'native-base';
import NumericInput from 'react-native-numeric-input'
import products from './data';
import Rating from './Rating';
import Review from './Review';
const SingleProduct = () => {
    const [value,setValue] = useState(0)
    const route = useRoute();
  const { productId } = route.params;
  const product = products.find(product => product._id === productId);
  return (
    <Box safeArea flex={1} bg={'white'}>
        <ScrollView
        px={5} showsVerticalScrollIndicator={false}
        >
         <Image source={{uri:product.image}}
         alt='Image'
         h={300}
         mt={5}
         resizeMode='contain'
         />   
         <Heading bold fontSize={15} mb={2} mt={5} lineHeight={22}>
            {product.name}
        </Heading>
        <Rating value={product.rating}/>
        <HStack space={2}  my={5}>
        <NumericInput value={value} totalWidth={140} totalHeight={30}
        iconSize={25}
        step={1}
        maxValue={15}
        minValue={0}
        borderColor="grey"
        rounded
        textColor={"black"}
        iconStyle={{color:'white'}}
        rightButtonBackgroundColor={"black"}
        leftButtonBackgroundColor={"black"}
        />
         <Spacer/>
        <Heading bold color={"black"} fontSize={19}>
            ${product.price}
        </Heading>
        </HStack> 
        <Text>
            {product.description}
            sdfgsdqgdsfg sdsg sfdgfsdg sdg sdfgsdfgsd fgsdf sdg sdfg gdsgsdf gsdf gfdsg 
            sdfgsdqgdsfg sdsg sfdgfsdg sdg sdfgsdfgsd fgsdf sdg sdfg gdsgsdf gsdf gfdsg 
            sdfgsdqgdsfg sdsg sfdgfsdg sdg sdfgsdfgsd fgsdf sdg sdfg gdsgsdf gsdf gfdsg 
            sdfgsdqgdsfg sdsg sfdgfsdg sdg sdfgsdfgsd fgsdf sdg sdfg gdsgsdf gsdf gfdsg 
            sdfgsdqgdsfg sdsg sfdgfsdg sdg sdfgsdfgsd fgsdf sdg sdfg gdsgsdf gsdf gfdsg 
            
        </Text>
 <Button bg={"#7e9e1e"} color={"white"} m={10} borderRadius={100}>
            ADD TO CART
            </Button>
            {/* Review */}
            <Review val={product.rating}/>
        </ScrollView>
        
    </Box>
  )
}

export default SingleProduct


{/* <>
      <Text></Text>
    </> */}