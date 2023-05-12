import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import Rating from './store/Rating';
import axios from 'axios';
import API_URL from '../screneens/var'
import { useNavigation } from '@react-navigation/native';

const CoachList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [coaches, setCoaches] = useState([]);
const navigation=useNavigation()
  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/coaches`);
      setCoaches(response.data.coaches);
    } catch (error) {
      console.error('Error fetching coaches: ', error);
    }
  };

  const updateSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredCoaches = coaches.filter((coach) =>
    coach.user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateToProfile = (coach) => {
    console.log(coach,'sended');
    navigation.navigate('CoachProfile', { coach:coach });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigateToProfile(item)}>
      <View style={styles.shadow}>
        <Image source={{ uri: item.user_img }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.user_name}</Text>
          <Rating value={item.ratingValue} text={item.rating_text} />
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.goal}>
            {item.user_goal}
          </Text>
        </View>
        <View style={styles.rightIconLayout}>
          <FontAwesome name="arrow-right" size={18} color="#666" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search for a coach"
        onChangeText={updateSearch}
        value={searchQuery}
        inputStyle={styles.searchInput}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        searchIcon={<FontAwesome name="search" size={20} color="#666" />}
        clearIcon={<FontAwesome name="times" size={20} color="#666" />}
      />
      <FlatList data={filteredCoaches} renderItem={renderItem} keyExtractor={(item) => item.user_name} />
    </View>
  );
};
const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 40,
  },
  searchInput: {
    fontSize: 16,
    color: '#666',
  },


  item: {
    margin: 10,
  },
  shadow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  goal: {
    fontSize: 14,
    color: '#666',
  },
  rightIconLayout: {
    height: 24,
    width: 24,
    right: 9,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CoachList;