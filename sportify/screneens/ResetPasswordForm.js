import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from './LoginPage';


import API_URL from './var'
const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const route = useRoute();
  const { email} = route.params;
  const navigation = useNavigation();


console.log(email)
const handleResetPassword = async () => {
  if (newPassword !== confirmPassword) {
    Alert.alert('Error', 'Passwords do not match');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password: newPassword,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      Alert.alert('Success', 'Password updated successfully');
      navigation.navigate('LoginPage', { email });
    } else {
      Alert.alert('Error', data.message);
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Could not reset password. Please try again later.');
  }
};


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="New password"
        secureTextEntry={true}
        onChangeText={setNewPassword}
        value={newPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      <Button title="Reset password" onPress={handleResetPassword} />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
});

export default ResetPasswordForm;
