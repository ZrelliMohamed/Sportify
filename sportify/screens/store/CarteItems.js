import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Box, Button, Center, HStack, Image, VStack } from 'native-base'
import { SwipeListView } from 'react-native-swipe-list-view'
import products from './data'
import { FontAwesome } from '@expo/vector-icons'

const CarteItems = () => {
  const [data, setData] = useState(products.slice(0,2))

  const handleDelete = (id) => {
    const newData = data.filter((item) => item._id !== id)
    setData(newData)
  }

  const renderIterms = (data) => (
    <Pressable>
      <Box ml={6} mb={3}>
        <HStack alignItems="center" bg="white" shadow={1} rounded={10} overflow="hidden">
          <Center w="25%" bg="gray.100">
            <Image source={{ uri: data.item.image }} alt={data.item.name} w="full" h={24} resizeMode="contain" />
          </Center>
          <VStack w="60%" px={2} space={2}>
            <Text isTruncated color="black" bold FontSize={10}>
              {data.item.name}
            </Text>
            <Text style={{ color: 'gray', fontWeight: 'bold' }}>${data.item.price}</Text>
          </VStack>
          <Center>
            <Button bg={'#7e9e1e'}>5</Button>
          </Center>
        </HStack>
      </Box>
    </Pressable>
  )

  const renderHiddenItem = (data, rowMap) => (
    <Pressable
      onPress={() => {
        handleDelete(data.item._id)
        rowMap[data.item.key].closeRow()
      }}
      style={{ marginLeft: 'auto', height: '88%', width: 50, backgroundColor: 'red' }}>
      <Center style={{ alignItems: 'center', space: 2 }}>
        <FontAwesome name="trash" size={24} color={'white'} />
      </Center>
    </Pressable>
  )
console.log(data);
  return (
    <Box mr={6}>
      <SwipeListView
        rightOpenValue={-50}
        previewRowKey="0"
        previewOpenValue={-40}
        previewOpenDelay={3000}
        data={data}
        renderItem={renderIterms}
        renderHiddenItem={renderHiddenItem}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  )
}

export default CarteItems
