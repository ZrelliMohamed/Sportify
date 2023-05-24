import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Rating from './store/Rating';
import API_URL from '../screneens/var';
import axios from 'axios';
const HomeCoach = ({Search}) => {
  const [coaches, setCoaches] = useState([]);
  const navigation=useNavigation();
  useEffect(() => {
    fetchCoaches();
  }, [Search]);
  
  const fetchCoaches = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/coaches`);
      console.log(response.data);
      let fetchedCoaches = response.data.coaches;
      if (Search) {
        fetchedCoaches = fetchedCoaches.filter(coach =>
          coach.user_name.toLowerCase().includes(Search.toLowerCase())
          );
        }
        setCoaches(fetchedCoaches);
      } catch (error) {
        console.error('Error fetching coaches: ', error);
      }
    };
    
    console.log(coaches);
  const navigateToProfile = (coach) => {
    console.log(coach,'sended');
    navigation.navigate('CoachProfile', { coach:coach});
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {coaches.map((coach) => (
        <TouchableOpacity onPress={() => navigateToProfile(coach)}>
          <View key={coach.user_name} style={styles.cardContainer}>
            <View style={styles.card}>
              <View>
                <Image source={{ uri: coach.user_img }} style={styles.cardImage} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{coach.user_name.toUpperCase()}</Text>
                <View style={styles.ratingContainer}>
                  <Rating value={coach.User_preview} />
                </View>
                <Text style={styles.cardDescription} numberOfLines={2}>{coach.user_goal}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  cardContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    width: 200,
    height: 350,
    marginRight: 10,
  },
  cardImage: {
    height: 200,
    width: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 10,
  },
  ratingContainer: {
    marginHorizontal: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    marginHorizontal: 10,
    marginTop: 5,
    color: '#666',
  }
});
export default HomeCoach;