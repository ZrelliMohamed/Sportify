import { View, Text, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Center, HStack, Image, VStack } from 'native-base'
import { SwipeListView } from 'react-native-swipe-list-view'
import { FontAwesome } from '@expo/vector-icons'
import { ProgContext } from '../MainStackNavigator'
import axios from 'axios'
import API_URL from '../screneens/var'
const ProgrameItemShop = ({setTotale}) => {
const {ProgToPurchase,setProgToPurchase} =useContext(ProgContext)
const [progtoBuy,setProgtoBuy]=useState([])

useEffect(()=>{
    axios.get(`${API_URL}/programes/${ProgToPurchase}`)
    .then(res=>{setProgtoBuy(res.data)
        setTotale(res.data[0].prg_price)
    })
    .catch(err=>console.log(err))
    
},[])
const handleDelete = (id) => {
    setProgToPurchase(null)
}

const renderItem = (data) => {
    return (
      <Pressable>
        <Box ml={6} mb={3}>
          <HStack alignItems="center" bg="white" shadow={1} rounded={10} overflow="hidden">
            <Center w="25%" bg="gray.100">
              <Image source={{ uri: data.item.prg_img }} alt={data.item.prg_name} w="full" h={24} resizeMode="contain" />
            </Center>
            <VStack w="60%" px={2} space={2}>
              <Text isTruncated color="black" bold FontSize={10}>
                {data.item.prg_name}
              </Text>
              <Text style={{ color: 'gray', fontWeight: 'bold' }}>${data.item.prg_price}</Text>
            </VStack>
            <Center>
              <Button bg={'#7e9e1e'}>{1}</Button>
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
          handleDelete(data.item.prg_id)
          rowMap[data.item.key].closeRow()
        }}
        style={{ marginLeft: 'auto', height: '88%', width: 50, backgroundColor: 'red' }}>
        <Center style={{ alignItems: 'center', space: 2 }}>
          <FontAwesome name="trash" size={24} color={'white'} />
        </Center>
      </Pressable>
    )
  }

console.log(progtoBuy);
  return (
    <Box mr={6}>
      <SwipeListView
        rightOpenValue={-50}
        previewRowKey="0"
        previewOpenValue={-40}
        previewOpenDelay={3000}
        data={progtoBuy}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  )
}

export default ProgrameItemShop