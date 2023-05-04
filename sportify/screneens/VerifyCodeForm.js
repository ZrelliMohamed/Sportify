import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import ResetPasswordForm from './ResetPasswordForm';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import API_URL from './var'
const VerifyCodeForm = ({ email }) => {
  const [code, setCode] = useState('');
  const navigation = useNavigation();

  const handleVerifyCode = async () => {
    try {
      const response = await fetch(`${API_URL}/verify-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          code
        })
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Code verified successfully');
        navigation.navigate('ResetPasswordForm', { email:email });
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not verify code. Please try again later.');
    }
  };
  
  

  return (
    <View>
      <TextInput
        placeholder="Verification code"
        keyboardType="numeric"
        onChangeText={setCode}
        value={code}
      />
      <Button title="Verify code" onPress={handleVerifyCode} />
      {/* <ResetPasswordForm email={email}  /> */}

    </View>
  );
};

export default VerifyCodeForm;
