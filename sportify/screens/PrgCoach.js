import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import API_URL from '../screneens/var'
import { UserDataContext,ToggleContext } from '../MainStackNavigator'

const PrgCoach = () => {
  const { userData } = useContext(UserDataContext)
  const [programes, setPrograme] = useState([])
  const { toggle, retoggle} =useContext(ToggleContext)
  useEffect(async () => {
    const { data } = await axios.get(`${API_URL}/getcoachsProgBy/${userData.User_Id}`)
    setPrograme(data)
  }, [toggle])
  const [profile,setProfile]=useState([])
  console.log(profile);
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

  // Get unique programs by prg_id
  const uniquePrograms = [...new Map(programes.map((prog) => [prog.prg_id, prog])).values()];

  const handlePurchase = (prg_id) => {
    // Handle purchase of program with prg_id
    console.log(`Purchase program with ID ${prg_id}`);
  };

  // Display unique programs
  return (
    <View style={styles.container}>
      {uniquePrograms.map((prog) => (
        <View key={prog.prg_id} style={styles.programContainer}>
          <Image source={{ uri: prog.prg_img }} style={styles.programImage} />
          <View style={styles.programInfo}>
            <Text style={styles.programName}>{prog.prg_name}</Text>
            <Text style={styles.programPrice}>${prog.prg_price}</Text>
           {profile.user_type !== "coach"&& <TouchableOpacity style={styles.purchaseButton} onPress={() => handlePurchase(prog.prg_id)}>
              <Text style={styles.buttonText}>Purchase</Text>
            </TouchableOpacity>}
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  programContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  programImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  programInfo: {
    flex: 1,
  },
  programName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  programPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  purchaseButton: {
    backgroundColor: '#D0FD3E',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PrgCoach;