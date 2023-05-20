import React, { useState,useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import { Button } from "native-base";
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserDataContext,CartContext } from '../MainStackNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import API_URL from '../screneens/var'
import axios from 'axios';
const CoachProfile = ({route}) => {
  const {userData} = useContext(UserDataContext)
  const {cart, setCart} = useContext(CartContext)

  const {setProPurchased} = route.params
  const [profile,setProfile]=useState([])
  const navigation = useNavigation();
  const rout = useRoute();
  const coach = rout.params.coach;
  const {func} = route.params;
console.log(coach.User_Id,"the coach");
  const [programes,setprograms]=useState([])

  useEffect(async () => {
    const { data } = await axios.get(`${API_URL}/getcoachsProgBy/${coach.User_Id}`)
    setprograms(data)
  }
    ,[])
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
    const uniquePrograms = [...new Map(programes.map((prog) => [prog.prg_id, prog])).values()];
    const handlePurchase = (prg_id) => {
      // Handle purchase of program with prg_id
      console.log(`Purchase program with ID ${prg_id}`);
      setProPurchased(prg_id)
      Alert.alert('Product Added', 'The Programe has been added to the cart.', [
        {
          text: 'Purchase',
          onPress: () => navigation.navigate('CarteScreen'),
        },
      ]);
    };

  return (
    <View style={styles.container}>
  <ScrollView>
    <View style={styles.header}>
      <Image source={{ uri: route.params.coach.user_img }} style={styles.profileImage} />
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{route.params.coach.user_name}</Text>
        <TouchableOpacity style={styles.messageButton} onPress={() => { console.log(coach,"rec") , navigation.navigate('Chat', { receiver: coach })}}>
          <Icon name="comments" size={20} color="#fff" />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.body}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>This is the description of the coach.</Text>
      </View>
      <Card containerStyle={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="graduation-cap" size={24} color="#4286f4" />
          <Text style={styles.cardTitle}>Programs</Text>
        </View>
        <View style={styles.container2}>
      {uniquePrograms.map((prog) => (
        <View key={prog.prg_id} style={styles.programContainer2}>
          <Image source={{ uri: prog.prg_img }} style={styles.programImage} />
          <View style={styles.programInfo}>
            <Text style={styles.programName2}>{prog.prg_name}</Text>
            <Text>Goal :{prog.prg_goal}</Text>
            <Text style={styles.programPrice2}>${prog.prg_price}</Text>
           {profile.user_type !== "coach"&& <TouchableOpacity style={styles.purchaseButton2} onPress={() => handlePurchase(prog.prg_id)}>
              <Text style={styles.buttonText2}>Purchase</Text>
            </TouchableOpacity>}
   
          </View>
        </View>
      ))}
    </View>
      </Card>
    </View>
  </ScrollView>
</View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
   profileImage: {
    width: '100%',
    aspectRatio: 1, // Ensures the image maintains a 1:1 aspect ratio
    borderRadius: 8, // Adjust the border radius to your preference
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  messageButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: 'bold',
  },
  body: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  exerciseContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  exerciseItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  exerciseImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  exerciseName: {
    marginTop: 4,
  },
  card: {
    borderRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  program: {
    marginBottom: 16,
  },
  programImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  programInfo: {
    marginTop: 8,
  },
  programTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  programDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  programDuration: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
  },
  container2: {
    flex: 1,
    padding: 10,
  },
  programContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  programImage2: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  programInfo2: {
    flex: 1,
  },
  programName2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  programPrice2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  purchaseButton2: {
    backgroundColor: '#D0FD3E',
    padding: 10,
    borderRadius: 5,
  },
  buttonText2: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default CoachProfile;