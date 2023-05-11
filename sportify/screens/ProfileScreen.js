import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation ,useRoute} from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { UserDataContext } from '../MainStackNavigator';
import { Accelerometer } from 'expo-sensors';
import API_URL from '../screneens/var'
import axios from 'axios';
import StepTracker from './useLocationAndSteps';

function ProfileScreen() {
  const { steps, calories } = StepTracker();
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [menuVisible, setMenuVisible] = useState(false);
  const [profile,setProfile]=useState([])
  // Access the email prop

  const { userData, setUserData } = useContext(UserDataContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${userData.User_Id}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    let subscription;
    if (isFocused) {
      subscription = Accelerometer.addListener(accelerometerData => {
        if (accelerometerData.y > 1.5) {
          setSteps(steps => steps + 1);
        }
      });
    }
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isFocused]);

  const handleEditProfile = () => {
    setMenuVisible(false);
    navigation.navigate('SettingsScreen',{profile:profile})
  };

  const handleChat = () => {
    setMenuVisible(false);
    navigation.navigate('Chat');
  };

  const handleLogout1 = () => {
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
          onPress: async () => {
            try {
              // TODO: Perform logout logic here
              // replace with your actual logout function
              navigation.navigate('LoginPage');
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleLogout = () => {
    setMenuVisible(false);
    handleLogout1();
  };

  const handleSocialMediaLink = url => {
    setMenuVisible(false);
    Linking.openURL(url);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="menu" type="material" color="#fff" size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <View style={{ width: 30 }} />
      </View>
      <View style={[styles.content, menuVisible && styles.contentCovered]}>
        {menuVisible && <TouchableOpacity style={styles.contentCover} onPress={toggleMenu} />}
        <Image source={{ uri: profile.user_img }} style={styles.profilePicture} />
        <View style={styles.card}>
          <Text style={styles.profileName}>{profile.user_name}</Text>
          <Text style={styles.program}>Fitness Program: {profile.user_preference}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.steps}>Steps Today: {steps}</Text>
          <Text style={styles.calories}>Calories Burned: {calories} kcal</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.info}>Height: {profile.user_height}</Text>
          <Text style={styles.info}>Weight: {profile.user_weight}</Text>
          <Text style={styles.info}>Goal: {profile.user_goal}</Text>
        </View>
      </View>
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
            <Icon name="user-circle" type="font-awesome" color="#fff" size={24} />
            <Text style={styles.menuText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleChat}>
            <Icon name="comments" type="font-awesome" color="#fff" size={24} />
            <Text style={styles.menuText}>Messenger</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Icon name="sign-out" type="font-awesome" color="#fff" size={24} />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
          <View style={styles.socialMedia}>
            <TouchableOpacity
              style={styles.socialMediaIcon}
              onPress={() => handleSocialMediaLink('https://www.facebook.com/profile.php?id=100085264825545')}
            >
              <Icon name="facebook" type="font-awesome" color="#fff" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialMediaIcon} onPress={() => handleSocialMediaLink('https://www.twitter.com')}>
              <Icon name="twitter" type="font-awesome" color="#fff" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialMediaIcon}
              onPress={() => handleSocialMediaLink('https://www.instagram.com/hajrivaliii/')}
            >
              <Icon name="instagram" type="font-awesome" color="#fff" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#008b8b',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  contentCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentCovered: {
    opacity: 0.5,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
    alignSelf: 'stretch',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  program: {
    fontSize: 16,
    marginBottom: 8,
  },
  steps: {
    fontSize: 16,
    marginBottom: 8,
  },
  calories: {
    fontSize: 16,
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  menu: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: '#008b8b',
    borderRadius: 5,
    padding: 8,
    zIndex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  menuText: {
    color: '#fff',
    marginLeft: 16,
    fontSize: 16,
  },
  socialMedia: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  socialMediaIcon: {
    marginHorizontal: 16,
  },
});

export default ProfileScreen;