import React, { useState, useEffect, useContext } from 'react';
import { UserDataContext } from "../MainStackNavigator";
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import SERVER_URL from '../screneens/SERVER_URL';
import ChatBox from './ChatBox';

const ConversationList = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [searchText, setSearchText] = useState('')
  const [toggle,setToggle] = useState(false)
  const { userData } = useContext(UserDataContext)
  
  console.log(userData,"userData")
const toggler = (x) =>{
  setToggle(x)
}
  useEffect(() => {
    axios.get(`${SERVER_URL}/api/chat/conversations/${userData.User_Id}`)
      .then(response =>{console.log(response.data,"response"), setUsers(response.data)})
      .catch(error => console.error(error));
  }, [userData,messages]);

  const handleUserSelect = (user) => {
    axios.get(`${SERVER_URL}/api/chat/messages/${userData.User_Id}/${user.User_Id}`)
      .then(response => {
        setSelectedUser(user);
        setMessages(response.data);
      })
      .catch(error => console.error(error));
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text)
  }

  const filteredUsers = users.filter(user => user.user_name.toLowerCase().includes(searchText.toLowerCase()))
  
  return (
    <View style={styles.container}>
      { toggle === false ? 
   <View style={styles.searchContainer}>
   <Ionicons name="search-outline" size={24} color="gray" />
   <TextInput
     style={styles.searchInput}
     placeholder="Search by name"
     onChangeText={handleSearchTextChange}
     value={searchText}
   /> 
 </View>
       : null}
   
      {selectedUser ? (
        <ChatBox
          func= {toggler}
          userData={userData}
          selectedUser={selectedUser}
          messages={messages}
          setMessages={setMessages}
          setSelectedUser={setSelectedUser}
          selectedUserName={selectedUser.user_name}

        />
      ) : (
        <ScrollView>
          {filteredUsers.map((user, index) => (
            <View key={index} style={styles.userContainer}>
              <Text style={styles.userName} onPress={() => handleUserSelect(user)}>{user.user_name}</Text>
              <Text style={styles.lastMessage}>{user.last_message}</Text>
              <View style={styles.separator}></View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: 'gray',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#888',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginTop: 8,
    marginLeft: 24,
  },
});

export default ConversationList;
