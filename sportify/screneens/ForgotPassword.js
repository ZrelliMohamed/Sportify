import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import VerifyCodeForm from './VerifyCodeForm';
import API_URL from './var'

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showVerifyCodeForm, setShowVerifyCodeForm] = useState(false);

  const handleSendEmail = async () => {
    try {
      const response = await fetch(`${API_URL}/forget-password-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email
        })
      });
      const data = await response.json();
      setMessage(data);
      setShowVerifyCodeForm(true);
    } catch (error) {
      console.log(error);
      setMessage('Could not send email');
    }
  };

  return (
    <View style={styles.container}>
      {showVerifyCodeForm ? (
        email ? <VerifyCodeForm email={email} /> : <View><Text>undefined</Text></View>
      ) : (
        <>
          <Text style={styles.title}>Forget Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
            <Text style={styles.buttonText}>Send Email</Text>
          </TouchableOpacity>
          <Text style={styles.message}>{message}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#1e90ff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 20,
    color: 'red',
  },
});

export default ForgetPassword;
