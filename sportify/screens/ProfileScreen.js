import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.headerTitle}>Profile</Text>
        <Ionicons name="settings" size={24} color="white" />
      </View>
      <View style={styles.userInfoContainer}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          style={styles.userImage}
        />
        <Text style={styles.userName}>John Doe</Text>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>120</Text>
          <Text style={styles.statTitle}>Workouts</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>35</Text>
          <Text style={styles.statTitle}>Friends</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>85</Text>
          <Text style={styles.statTitle}>Followers</Text>
        </View>
      </View>
      <View style={styles.recentActivityContainer}>
        <Text style={styles.recentActivityTitle}>Recent Activity</Text>
        <View style={styles.recentActivity}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/17.jpg' }}
            style={styles.recentActivityUserImage}
          />
          <Text style={styles.recentActivityText}>Liked your workout</Text>
        </View>
        <View style={styles.recentActivity}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/18.jpg' }}
            style={styles.recentActivityUserImage}
          />
          <Text style={styles.recentActivityText}>Commented on your workout</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editProfileButton: {
    backgroundColor: '#D0FD3E',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  editProfileButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
})
export default ProfileScreen