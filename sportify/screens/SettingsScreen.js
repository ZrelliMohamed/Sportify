import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { moderateScale } from 'react-native-size-matters';

import API_URL from '../screneens/var';
import CustomTextInput from '../components/CustomTextInput.js';
import CustomHeaderButton from '../components/CustomHeaderButton.js';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dqjdflymg/upload';
const CLOUDINARY_UPLOAD_PRESET = 'aloulou';

const options = {
  title: 'Select Profile Picture',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters'),
  weight: Yup.number().required('Weight is required'),
  height: Yup.number().required('Height is required'),
  preferences: Yup.string(),
});

const SettingScreen = () => {
  const route = useRoute();
  const profile = route.params.profile;
  const [profilePicture, setProfilePicture] = useState(profile.user_img);

  useEffect(() => {
    setProfilePicture(profile.user_img);
  }, [profile.user_img]);

  const handleImageUpload = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const data = new FormData();
      data.append('file', {
        uri: result.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: data,
      })
        .then(response => response.json())
        .then(result => setProfilePicture(result.secure_url))
        .catch(error => console.log(error));
    } else {
      alert('You did not select any image.');
    }
  }, []);

  const handleUpdateUser = useCallback(
    values => {
      const updatedUser = {
        user_name: values.username,
        user_email: values.email,
        user_password: values.password,
        user_weight: values.weight,
        user_heigth: values.height,
        user_preference: values.preferences,
        user_img: profilePicture,
      };

      axios
        .patch(`${API_URL}/users/${profile.User_Id}`, updatedUser)
        .then(response => {
          console.log(response.data);
          // do something with the updated user data

          // Display an alert to indicate successful update
          Alert.alert('Success', 'User information updated successfully!');
        })
        .catch(error => {
          console.log(error.response.data);
          // handle error

          // Display an alert to indicate the error
          Alert.alert('Error', 'An error occurred while updating user information.');
        });
    },
    [profile.User_Id, profilePicture],
  );

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
    validationSchema,
    initialValues: {
      username: profile.user_name,
      email: profile.user_email,
      password: '',
      weight: profile.user_weight.toString(),
      height: profile.user_heigth.toString(),
      preferences: profile.user_preference,
    },
    onSubmit: handleUpdateUser,
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.profilePictureButton} onPress={handleImageUpload}>
            {profilePicture ? (
              <Image style={styles.profilePicture} source={{ uri: profilePicture }} />
            ) : (
              <Text style={styles.profilePictureText}>Upload Profile Picture</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.username}>{profile.user_name}</Text>
        </View>

        <View style={styles.form}>
          <CustomTextInput
            label="Username"
            placeholder="Enter username"
            value={values.username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            error={touched.username && errors.username}
          />
          <CustomTextInput
            label="Email"
            placeholder="Enter email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={touched.email && errors.email}
          />
          <CustomTextInput
            label="New Password (optional)"
            placeholder="Enter new password"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            secureTextEntry
            error={touched.password && errors.password}
          />
          <CustomTextInput
            label="Weight (kg)"
            placeholder="Enter weight"
            value={values.weight}
            onChangeText={handleChange('weight')}
            onBlur={handleBlur('weight')}
            keyboardType="numeric"
            error={touched.weight && errors.weight}
          />
          <CustomTextInput
            label="Height (cm)"
            placeholder="Enter height"
            value={values.height}
            onChangeText={handleChange('height')}
            onBlur={handleBlur('height')}
            keyboardType="numeric"
            error={touched.height && errors.height}
          />
          <CustomTextInput
            label="Preferences"
            placeholder="Enter preferences"
            value={values.preferences}
            onChangeText={handleChange('preferences')}
            onBlur={handleBlur('preferences')}
            error={touched.preferences && errors.preferences}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8CBD0',
  },
  scrollViewContent: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(40),
  },
  header: {
    alignItems: 'center',
    marginTop: moderateScale(40),
    marginBottom: moderateScale(20),
  },
  profilePictureButton: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: moderateScale(75),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: moderateScale(3),
    borderColor: '#ddd',
  },
  profilePictureText: {
    color: '#888',
    fontSize: moderateScale(16),
  },
  profilePicture: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: moderateScale(75),
  },
  username: {
    marginTop: moderateScale(20),
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#444',
  },
  form: {
    marginTop: moderateScale(40),
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(5),
    marginTop: moderateScale(20),
  },
  buttonText: {
    color: '#D0FD3E',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: moderateScale(18),
  },
});

SettingScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Settings',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Menu"
        iconName="ios-menu"
        onPress={() => {
          navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  ),
});

export default SettingScreen;