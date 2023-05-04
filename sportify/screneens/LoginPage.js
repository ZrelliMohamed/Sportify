// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import ForgetPassword from './ForgotPassword';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import Sign from './Sign'
// import API_URL from './var';
// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [data,setData] = useState([])
//   const [password, setPassword] = useState('');
//   const navigation = useNavigation();
//   const [showPassword, setShowPassword] = useState(false);

//   const goToAnotherScreen = () => {
//     navigation.navigate('Sign');
//   };
//   const handleLogin = () => {
//     console.log('enter');
//     fetch(`${API_URL}/loginn`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email, password })
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       setData(data);
//       navigation.navigate('MainStackNavigator');
//     })
//     .catch(error => console.error('Error logging in: ' + error));
//   };
  

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         required={true} 
//         onChangeText={setEmail}
//         autoCapitalize="none"
//         keyboardType="email-address"
//       />
//       <View style={styles.passwordContainer}>
//         <TextInput
//           style={styles.passwordInput}
//           placeholder="Password"
//           required={true} 
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry={!showPassword}
//         />
//         <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//           <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
//         <Text style={styles.forgotPassword}>Forgot Password?</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={goToAnotherScreen}>
//         <Text style={styles.buttonText}>create New account</Text>
//       </TouchableOpacity>
//     </View>
//   );
  
// };
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';
import ForgetPassword from './ForgotPassword';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Sign from './Sign';
import API_URL from './var';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const goToAnotherScreen = () => {
    navigation.navigate('Sign');
  };

  // const handleLogin = (values) => {
  //   console.log(values);
  //   fetch(`${API_URL}/loginn`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(values)
  //   })
  //   .then(response => {response.json()})
  //   .then(data => {
  //     console.log(data);
  //     navigation.navigate('MainStackNavigator');
  //   })
  //   .catch(error => console.error('Error logging in: ' + error));
  // };
  const handleLogin = (values) => {
    fetch(`${API_URL}/loginn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        navigation.navigate('MainStackNavigator');
      } else {
        alert('Invalid email or password');
      }
    })
    .catch(error => console.error('Error logging in: ' + error));
  };
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Please Add Your Email'),
    password: Yup.string().required('Please Add Your Password')
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={handleLogin}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {touched.email && errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
            </TouchableOpacity>
          </View>
          {touched.password && errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
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
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 40,
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  passwordInput: {
    flex: 1,
    marginRight: 8
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

