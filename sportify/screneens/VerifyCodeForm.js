import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, Alert, Animated, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API_URL from './var';

const VerifyCodeForm = ({ email }) => {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [isCodeCorrect, setIsCodeCorrect] = useState(true);
  const navigation = useNavigation();
  const inputRefs = useRef([]);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Verify the code when digits contains 6 digits
    if (digits.join('').length === 6) {
      handleVerifyCode();
    }
  }, [digits]);

  const handleDigitChange = (index, digit) => {
    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);
    setIsCodeCorrect(true); // reset color and border
    // Move the focus to the next or previous input element
    if (digit !== '' && index < digits.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (digit === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyCode = async () => {
    const code = digits.join('');
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
        setIsCodeCorrect(true);
        navigation.navigate('ResetPasswordForm', { email: email });
      } else {
        setIsCodeCorrect(false);
        Animated.sequence([
          Animated.timing(animatedValue, { toValue: 10, duration: 100, useNativeDriver: true }),
          Animated.timing(animatedValue, { toValue: -10, duration: 100, useNativeDriver: true }),
          Animated.timing(animatedValue, { toValue: 0, duration: 100, useNativeDriver: true })
        ]).start();
  
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not verify code. Please try again later.');
    }
  };

  const animatedStyle = {
    transform: [{ translateX: animatedValue }]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.codeInputLabel}>Please enter the verification code sent to your email:</Text>
      <View style={[styles.codeBox, !isCodeCorrect && styles.wrongCodeBox]}>
        <View style={styles.codeBoxInner}>
          <TextInput
            style={[styles.codeInput, { marginRight: 10 }]}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(digit) => handleDigitChange(0, digit)}
            onSubmitEditing={() => handleDigitChange(1, '')}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleDigitChange(0, '');
              }
            }}
            autoFocus={true}
            ref={(ref) => {
              inputRefs.current[0] = ref;
            }}
            value={digits[0]}
          />
          <TextInput
            style={styles.codeInput}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(digit) => handleDigitChange(1, digit)}
            onSubmitEditing={() => handleDigitChange(2, '')}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleDigitChange(1, '');
              }
            }}
            ref={(ref) => {
              inputRefs.current[1] = ref;
            }}
            value={digits[1]}
          />
          <TextInput
            style={styles.codeInput}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(digit) => handleDigitChange(2, digit)}
            onSubmitEditing={() => handleDigitChange(3, '')}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleDigitChange(2, '');
              }
            }}
            ref={(ref) => {
              inputRefs.current[2] = ref;
            }}
            value={digits[2]}
          />
          <TextInput
            style={styles.codeInput}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(digit) => handleDigitChange(3, digit)}
            onSubmitEditing={() => handleDigitChange(4, '')}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleDigitChange(3, '');
              }
            }}
            ref={(ref) => {
              inputRefs.current[3] = ref;
            }}
            value={digits[3]}
          />
          <TextInput
            style={styles.codeInput}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(digit) => handleDigitChange(4, digit)}
            onSubmitEditing={() => handleDigitChange(5, '')}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleDigitChange(4, '');
              }
            }}
            ref={(ref) => {
              inputRefs.current[4] = ref;
            }}
            value={digits[4]}
          />
          <TextInput
            style={styles.codeInput}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(digit) => handleDigitChange(5, digit)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleDigitChange(5, '');
              }
            }}
            ref={(ref) => {
              inputRefs.current[5] = ref;
            }}
            value={digits[5]}
          />
        </View>
      </View>
      {!isCodeCorrect && (
        <View style={styles.wrongCodeContainer}>
          <Text style={styles.wrongCodeText}>Wrong code, please check again</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  codeInputLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    shadowColor: '#ccc', // default shadow color
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  wrongCodeBox: {
    borderColor: 'red',
    shadowColor: 'red', // change shadow color to red when code is wrong
  },
  codeBoxInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeInput: {
    width: 48, // increase width to accommodate larger font size
    height: 48, // increase height
    textAlign: 'center',
    fontSize: 24, // increase font size
    borderWidth: 0, // remove border
  },
  wrongCodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  wrongCodeText: {
    color: 'red',
  },
});

export default VerifyCodeForm;