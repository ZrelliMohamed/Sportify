
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import { Input, Button, Header, Icon } from 'react-native-elements';
import io from 'socket.io-client';
import _ from 'lodash';
import SERVER_URL from '../screneens/SERVER_URL'

const ChatBox = ({ userData, selectedUser, messages, setMessages, setSelectedUser,func }) => {
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState(null)
  const [debouncedMessage, setDebouncedMessage] = useState('')
  

  useEffect(() => {
    func(true)
    setSocket(io(SERVER_URL));
    axios.get(`${SERVER_URL}/api/chat/messages/${userData.User_Id}/${selectedUser.User_Id}`)
      .then(response => setMessages(response.data))
      .catch(error => console.error(error));
    return () => {
      socket && socket.disconnect();
      func(false)
    }
  }, [selectedUser, userData.User_Id,message]);
  useEffect(() => {
    if (socket && selectedUser) {
      socket.on('connect', () => {
        console.log('Connected to server');
      });
      socket.on('newMessage', (data) => {
        console.log('Message received:', data);
        setSelectedUser(prevSelectedUser => {
          if (prevSelectedUser.User_Id === data.sender_id || prevSelectedUser.User_Id === data.receiver_id) {
            // only update selected user state if the new message is from or to the current selected user
            return { ...prevSelectedUser };
          } else {
            return prevSelectedUser;
          }
        });
        axios.get(`${SERVER_URL}/api/chat/messages/${userData.User_Id}/${selectedUser.User_Id}`)
          .then(response => setMessages(response.data))
          .catch(error => console.error(error));
      });
    }
  }, [socket, selectedUser, userData.User_Id, setSelectedUser, messages]);
  
  
  

  useEffect(() => {
    const debouncedHandler = _.debounce(() => {
      setDebouncedMessage(message);
    }, 1000);
    debouncedHandler();
    return () => debouncedHandler.cancel();
  }, [message]);

  useEffect(() => {
    if (debouncedMessage) {
      console.log({
        sender_id: userData.User_Id,
        receiver_id: selectedUser.User_Id,
        message: debouncedMessage
      });
      axios.post(`${SERVER_URL}/api/chat/sendMessage`, {
        sender_id: userData.User_Id,
        receiver_id: selectedUser.User_Id,
        message: debouncedMessage
      })
        .then(response => {
          console.log('Message sent:', response.data);
          setMessage('');
          setDebouncedMessage('');
          axios.get(`${SERVER_URL}/api/chat/messages/${userData.User_Id}/${selectedUser.User_Id}`)
            .then(response => setMessages(response.data))
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
    }
  }, [debouncedMessage, selectedUser, userData.User_Id, setMessages ,messages]);

  const handleSendMessage = () => {
    if (debouncedMessage) {
      setDebouncedMessage('');
    } else {
      setDebouncedMessage(message);
    }
  };

  return (
    <>
      <Header
        leftComponent={<Icon name='arrow-back' color='#fff' onPress={() => setSelectedUser(null)} />}
        centerComponent={{ text: selectedUser.user_name, style: { color: '#fff', fontSize: 16, fontWeight:'bold'
      } }}
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
      {messages.map((message, index) => {
      return (
      <View key={index} style={{ padding: 10, alignSelf: message.sender_id === userData.User_Id ? 'flex-end' : 'flex-start' }}>
      <View style={{ backgroundColor: message.sender_id === userData.User_Id ? '#b2d8d8' : '#e5e5e5', borderRadius: 10, padding: 10 }}>
      <Text style={{ fontSize: 16 }}>{message.message}</Text>
      </View>
      </View>
      )
      })}
      </ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
      <Input
      placeholder='Type a message...'
      value={message}
      onChangeText={setMessage}
      containerStyle={{ flex: 1 }}
      inputContainerStyle={{ borderWidth: 1, borderRadius: 20, paddingHorizontal: 10 }}
      />
      <Icon
name="send"
type="material"
size={24}
onPress={handleSendMessage}
/>
      </View>
      </KeyboardAvoidingView>
      </>
      );
      };
      
      export default ChatBox;        
