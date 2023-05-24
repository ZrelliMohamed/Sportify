import { View, Text, Pressable } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { Box, Button, Center, HStack, Image, VStack } from 'native-base'
import { SwipeListView } from 'react-native-swipe-list-view'
import { FontAwesome } from '@expo/vector-icons'
import { CartContext } from '../../MainStackNavigator';
import API_URL from '../../screneens/var'
import axios from 'axios'

const CarteItems = ({ setTotale }) => {
  const [data, setData] = useState([])
  const { cart, setCart } = useContext(CartContext);
  
  const [updatedCart, setUpdatedCart] = useState(cart)
  const handleDelete = (id) => {
    const newData = data.filter((item) => item.product_id !== id)
    const newCart = updatedCart.filter((item) => item[0] !== id)
    setUpdatedCart(newCart);
    setCart(newCart)
    setData(newData)
  }

  const renderItem = (data) => {
    return (
      <Pressable>
        <Box ml={6} mb={3}>
          <HStack alignItems="center" bg="white" shadow={1} rounded={10} overflow="hidden">
            <Center w="25%" bg="gray.100">
              <Image source={{ uri: data.item.product_image }} alt={data.item.product_name} w="full" h={24} resizeMode="contain" />
            </Center>
            <VStack w="60%" px={2} space={2}>
              <Text isTruncated color="black" bold FontSize={10}>
                {data.item.product_name}
              </Text>
              <Text style={{ color: 'gray', fontWeight: 'bold' }}>${data.item.product_price}</Text>
            </VStack>
            <Center>
              <Button bg={'#7e9e1e'}>{data.item.QuantiteCommande}</Button>
            </Center>
          </HStack>
        </Box>
      </Pressable>
    )
  }

  const renderHiddenItem = (data, rowMap) => {
    return (
      <Pressable
        onPress={() => {
          handleDelete(data.item.product_id)
          rowMap[data.item.key].closeRow()
        }}
        style={{ marginLeft: 'auto', height: '88%', width: 50, backgroundColor: 'red' }}>
        <Center style={{ alignItems: 'center', space: 2 }}>
          <FontAwesome name="trash" size={24} color={'white'} />
        </Center>
      </Pressable>
    )
  }

 

  useEffect(() => {
    axios.post(`${API_URL}/products/ProductCart`, { cart: updatedCart }).then((res) => {
      const products = res.data.products;
      const productsWithTotal = products.map((product) => {
        const { product_price, QuantiteCommande } = product;
        const total = product_price * QuantiteCommande;
        return { ...product, total };
      });

      // Use reduce() method to calculate the grand total
      const grandTotal = productsWithTotal.reduce(
        (total, product) => total + product.total,
        0
      );
      setTotale(grandTotal);
      setData(products);
    })
      .catch((err) => console.log(err))
  }, [updatedCart])

  return (
    <Box mr={6}>
      <SwipeListView
        rightOpenValue={-50}
        previewRowKey="0"
        previewOpenValue={-40}
        previewOpenDelay={3000}
        data={data}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  )
}

export default CarteItems