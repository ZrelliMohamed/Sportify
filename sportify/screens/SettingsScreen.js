import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const SettingsScreen = ({ navigation, route }) => {
  // '
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [userType, setUserType] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('');
  const [preference, setPreference] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleSelectPicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePicture(result.uri);
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('profilePicture', {
      uri: profilePicture,
      type: 'image/jpeg',
      name: 'profilePicture.jpg',
    });
    data.append('username', username);
    data.append('email', email);
    data.append('password', password);
    data.append('userType', userType);
    data.append('height', height);
    data.append('gender', gender);
    data.append('weight', weight);
    data.append('goal', goal);
    data.append('preference', preference);

    try {
      const response = await axios.post(`http://localhost:3000/users/${id}`, data);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile.');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            // TODO: Perform logout logic here
            navigation.navigate('Login');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.profilePictureContainer} onPress={handleSelectPicture}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        ) : (
          <Text style={styles.profilePicturePlaceholder}>Tap to add profile picture</Text>
        )}
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry={true} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Height</Text>
        <TextInput style={styles.input} value={height} onChangeText={setHeight} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Gender</Text>
        <TextInput style={styles.input} value={gender} onChangeText={setGender} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Weight</Text>
        <TextInput style={styles.input} value={weight} onChangeText={setWeight} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Goal</Text>
        <TextInput style={styles.input} value={goal} onChangeText={setGoal} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Preference</Text>
        <TextInput style={styles.input} value={preference} onChangeText={setPreference} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
  },
  profilePictureContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#eee',
    marginBottom: 20,
    overflow: 'hidden',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  profilePicturePlaceholder: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    padding: 30,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;