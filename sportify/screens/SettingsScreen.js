import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image ,Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import API_URL from '../screneens/var'
import { ScrollView } from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
const options = {
  title: 'Select Profile Picture',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const SettingScreen = () => {
  const route=useRoute()
  const profile=route.params
  const [username, setUsername] = useState(route.params.profile.user_name);
  const [email, setEmail] = useState(route.params.profile.user_email);
  const [password, setPassword] = useState(route.params.profile.user_password);
  const [weight, setWeight] = useState(route.params.profile.user_weight);
  const [height, setHeight] = useState(route.params.profile.user_heigth);
  const [preferences, setPreferences] = useState(route.params.profile.user_preference);
  const [profilePicture, setProfilePicture] = useState(route.params.profile.user_img);

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.cancelled) {
      const data = new FormData();
      data.append('file', {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      });
      data.append('api_key', '989539197932947');
      data.append('timestamp', Date.now() / 1000);
  
      // Add the Cloudinary signature generated on the backend
      const signature = await fetch('http://localhost:3000/cloudinarySignature')
        .then(response => response.json());
  
      data.append('signature', signature.signature);
      data.append('folder', 'assets');
  
      fetch('https://api.cloudinary.com/v1_1/dqjdflymg/image/upload', {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      })
        .then(response => response.json())
        .then(result => setProfilePicture(result.secure_url))
        .catch(error => console.log(error));
    } else {
      alert('You did not select any image.');
    }
  };


  const handleUpdateUser = () => {
    const updatedUser = {
      user_name: username,
      user_email: email,
      user_password: password,
      user_weight: weight,
      user_heigth: height,
      user_preference: preferences,
      user_img: profilePicture,
    };
  
    axios
      .patch(`${API_URL}/users/${route.params.profile.User_Id}`, updatedUser)
      .then(response => {
        console.log(response.data);
        // do something with the updated user data
        
        // Display an alert to indicate successful update
        Alert.alert("Success", "User information updated successfully!");
      })
      .catch(error => {
        console.log(error.response.data);
        // handle error
        
        // Display an alert to indicate the error
        Alert.alert("Error", "An error occurred while updating user information.");
      });
  };
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.profilePictureButton} onPress={handleImageUpload}>
            {profilePicture ? (
              <Image style={styles.profilePicture} source={{ uri: profile.user_img }} />
            ) : (
              <Text style={styles.profilePictureText}>Upload Profile Picture</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.username}>{profile.user_name}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} value={username} onChangeText={setUsername} />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>New Password (optional)</Text>
            <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              value={weight.toString()}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              value={height.toString()}
              onChangeText={setHeight}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Preferences</Text>
            <TextInput style={styles.input} value={preferences} onChangeText={setPreferences} />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleUpdateUser}>
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
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent:{
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  profilePictureButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ddd',
  },
  profilePictureText: {
    color: '#888',
    fontSize: 16,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginVertical: 20,
  },
  formGroup: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#6F9FD8',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default SettingScreen;
