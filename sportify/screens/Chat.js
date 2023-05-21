import React, { useState, useEffect, useContext } from 'react';
import { UserDataContext } from "../MainStackNavigator";
import { View, ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native'
import { ListItem, Input, Button , Header, Icon} from 'react-native-elements';

import SERVER_URL from '../screneens/SERVER_URL'
import io from 'socket.io-client';

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const { userData } = useContext(UserDataContext);
  const [socket, setSocket] = useState(null);
  const route = useRoute();
  const receiver = route.params?.receiver;


  useEffect(() => {
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);


  useEffect(() => {

    if (socket && receiver) {
      console.log('Connected to server');
      socket.on('newMessage', (data) => {
        console.log('Message received:', data);
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      axios
        .get(
          `${SERVER_URL}/api/chat/messages/${userData.User_Id}/${receiver.User_Id}`
        )
        .then((response) => setMessages(response.data))
        .catch((error) => console.error(error));
    }
  }, [socket, receiver, userData, receiver]);
  

  const handleSendMessage = () => {
    console.log({
      sender_id: userData.User_Id,
      receiver_id: receiver.User_Id,
      message: message,
    });
    axios
      .post(SERVER_URL+'/api/chat/sendMessage', {
        sender_id: userData.User_Id,
        receiver_id: receiver.User_Id,
        message: message,
      })
      .then((response) => {
        console.log('Message sent successfully:', response.data);
        setMessage('');
        console.log(response.data, 'dataaaaa');
        axios
          .get(
            `${SERVER_URL}/api/chat/messages/${userData.User_Id}/${receiver.User_Id}`
          )
          .then((response) => setMessages(response.data))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={0}
      behavior='padding'
    >
      <View style={{ flex: 1 }}>
        <Header
          centerComponent={{
            text: receiver.user_name,
            style: { color: '#fff', fontWeight: 'bold' },
          }}
        />
        <ScrollView style={{ flex: 1 }}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={{
                flexDirection:
                  message.sender_id === userData.User_Id
                    ? 'row-reverse'
                    : 'row',
              }}
            >
              <View
                style={{
                  backgroundColor:
                    message.sender_id === userData.User_Id
                      ? '#DCF8C5'
                      : '#fff',
                  borderRadius: 10,
                  padding: 10,
                  margin: 5,
                }}
              >
                <Text>{message.message}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <Input
          placeholder='Type your message here...'
          value={message}
          onChangeText={(text) => setMessage(text)}
          onSubmitEditing={handleSendMessage}
          rightIcon={
            <Button
              title='Send'
              onPress={handleSendMessage}
              disabled={!message}
            />
          }
        />
      </View>
    </KeyboardAvoidingView>
);
};

export default Chat;    
