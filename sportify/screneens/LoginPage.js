import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ForgetPassword from './ForgotPassword';

 // import the ForgetPassword component

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Make a POST request to the login endpoint with the email and password
    fetch('http://localhost:3000/loginn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        // Save the JWT to local storage and navigate to the home screen
        const { token } = data;
        localStorage.setItem('token', token);
        navigation.navigate('Home');
      })
      .catch(error => console.error('Error logging in: ' + error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  input: {
    width: '80%',
    height: 40,
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  forgotPassword: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 8
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    marginTop: 16
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default LoginScreen;
