import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';


function Sign() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  

  const handleSignIn = async () => {
    try {
      console.log(username,password,email)
      
      const response = await axios.post('http://192.168.103.15:3000/register', {
        username: username,
        password: password,
        email: email,
        type:'user'
        
      });
      console.log(response);
      if (response.status === 200 ) {
        alert(`welcome  ${username}`)
        navigation.navigate('HeightPicker',{email:email});
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error signing in: ' + error);
      alert('Error signing in, please try again');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="NEXT"
        onPress={handleSignIn} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '100%'
  }
});

export default Sign;
