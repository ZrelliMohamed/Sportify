import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import ResetPasswordForm from './ResetPasswordForm';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const VerifyCodeForm = ({ email }) => {
  const [code, setCode] = useState('');
  const navigation = useNavigation();

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post('http://192.168.103.15:3000/verify-code', {
        email,
        code
      });
      if (response.status === 200) {
        Alert.alert('Success', 'Code verified successfully');
        navigation.navigate('ResetPasswordForm', { email:email });

      } else {
        Alert.alert('Error', response.data.message);
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
