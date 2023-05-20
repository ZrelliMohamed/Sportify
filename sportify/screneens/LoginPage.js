import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Animated,
  Easing,
  Dimensions,
  KeyboardAvoidingView 
} from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';
import ForgetPassword from './ForgotPassword';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Sign from './Sign';
import API_URL from './var';

const { width, height } = Dimensions.get('window');
const logo = require('./pngwing.com.png');
const backgroundImage = require('./equipement-sport.jpg');

const LoginScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [logoAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(logoAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        setShowForm(true);
        Animated.timing(logoAnimation, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
      }, 5000);
    });
  }, []);

  const goToAnotherScreen = () => {
    navigation.navigate('Sign');
  };
  const handleLogin = (values) => {
    fetch(`${API_URL}/loginn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('here',data);
        if (data.token) {
          navigation.navigate('MainStackNavigator',{ userData: data });
        } else {
          alert('Invalid email or password');
        }
      })
      .catch((error) => console.error('Error logging in: ' + error));
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Please Add Your Email'),
    password: Yup.string().required('Please Add Your Password'),
  });

  const logoTranslateY = logoAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-height / 3, 0],
  });

  const backgroundImageScale = logoAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <KeyboardAvoidingView  style={{ flex: 1 }}>
    <View style={styles.container}>
      <Image source={backgroundImage} style={[styles.backgroundImage, { transform: [{ scale: 1 }] }]} />
      
      {showForm ? (
        <>
        <View style={styles.logoContainer}>
        <Image source={logo} style={{...[styles.logo],flex:1}} />
      </View>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleLogin}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={[styles.formContainer, { width: width * 0.8 , marginTop:130}]}>
              <Text style={styles.title}>Sportify</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={'black'}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <Ionicons
                  name="mail-outline"
                  size={24}
                  color="black"
                  style={styles.inputIcon}
                />
              </View>
              {touched.email && errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={'black'}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="black"
                    style={styles.inputIcon}
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
              <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={goToAnotherScreen}>
                <Text style={styles.buttonText}>Create New Account</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        </>
      ) : (
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ translateY: logoTranslateY }],
            },
          ]}
        >
          <Animated.Image source={logo} style={[styles.logo, { opacity: logoAnimation }]} />
        </Animated.View>
      )}
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    position: 'absolute',
    top: 100,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
    opacity:0.7
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'repeat',
    opacity: 0.6,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 8,
  },
  inputIcon: {
    marginRight: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  forgotPassword: {
    color: 'black',
    textDecorationLine: 'underline',
    marginTop: 8,
  },

  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
  },
  buttonText: {
    color: '#D0FD3E',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
});
export default LoginScreen;