import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { useContext } from 'react'
import { UserDataContext } from '../MainStackNavigator'
const Chat = () => {
  const {userData} = useContext(UserDataContext)
  const route = useRoute()
  const {receiver} = route.params
  console.log('1-receiver',receiver);
  console.log('2-sender',userData);
  return (
    <View>
      <Text>Chat</Text>
    </View>
  )
}

export default Chat