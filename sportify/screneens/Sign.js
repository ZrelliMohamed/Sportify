import React, { useState } from 'react';
import {View,Text,TextInput,Button,StyleSheet,Image,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API_URL from './var';

const logo = require('./pngwing.com.png');
const backgroundImage = require('./equipement-sport.jpg');

function Sign() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleSignIn = async () => {
    try {
      console.log(username, password, email);

      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          type: 'user',
        }),
      });

      console.log('here', response);
      if (response.status === 200) {
        alert(`Welcome ${username}!`);
        navigation.navigate('HeightPicker', { email: email });
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error signing in: ', error.message);
      alert('Error signing in, please try again');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={backgroundImage} style={[styles.backgroundImage, { transform: [{ scale: 1 }] }]} />
        <View style={styles.logoContainer}>
          <Image source={logo} style={{...[styles.logo],  flex: 1 }} />
          <View style={[styles.formContainer, { width: '80%', position: 'absolute', top: 150 , marginTop:90}]}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor={"black"}
              value={username}
              onChangeText={setUsername}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={"black"}
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Enter your password"
              placeholderTextColor={"black"}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <Button title="SIGN UP" onPress={handleSignIn} color='black'  style={styles.buttonText}/>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Log in here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
    opacity: 0.5,
    zIndex: -1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    position: 'relative',

  },
  logo: {
    width: 150,
    height: 150,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    opacity:0.8
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  passwordInput: {
    width: '100%',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 16,
  },
  footerLink: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#000',
    color: '#D0FD3E',
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  }
});

export default Sign;