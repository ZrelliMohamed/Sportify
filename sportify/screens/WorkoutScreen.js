import { StyleSheet, Text, View, ScrollView, Image , TouchableOpacity} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { UserDataContext } from '../MainStackNavigator';
import API_URL from '../screneens/var';
import axios from 'axios';

const WorkoutScreen = () => {
  const { userData, setUserData } = useContext(UserDataContext)
  const navigation = useNavigation();
const [userProgrames,setUserProgrames]=useState([])
useEffect(()=>{
  axios.get(`${API_URL}/programes/UserBuy/${userData.User_Id}`)
  .then(res=>{setUserProgrames(res.data)})
  .catch(err=>console.log(err))
},[])

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Home Workout</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItemLeft}>
            <Text style={styles.statNumber}>{userProgrames.length}</Text>
            <Text style={styles.statLabel}>WORKOUTS</Text>
          </View>

          <View style={styles.statItemCenter}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>MINS</Text>
          </View>

          <View style={styles.statItemRight}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>kcal</Text>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: '90%', height: 120, marginTop: 20, borderRadius: 7 }}
              source={{ uri: "https://www.pngmart.com/files/4/Fitness-PNG-HD.png" }}
            />
          </View>
        </View>
      </View>
      {userProgrames.length ===0 && 
              <Text> NO Workout </Text>
      }
      {userProgrames.length > 0 &&
        userProgrames.map((Prog, i) =>{
        return(
          <TouchableOpacity onPress={()=>{
            navigation.navigate('ProgramScreen',{Prog_id:Prog.prg_id});
          }}
           key={i}>
            <View style={styles.logoContainer}>
              <Image style={styles.logoImage} source={{ uri: Prog.prg_img }} />
              <Text style={styles.programName}>{Prog.prg_name}</Text>
            </View>
          </TouchableOpacity>
        )})}

    </ScrollView>
  )
}

export default WorkoutScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#D0FD3E',
    margin: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: -40
  },
  statItemLeft: {
    alignItems: 'center',
    flex: 1,
  },
  statItemCenter: {
    alignItems: 'center',
    flex: 1,
  },
  statItemRight: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 17,
    color: 'white',
    marginTop: 6
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 500,
    height: 200,
    resizeMode: 'contain',
  },
  programName: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -10 }],
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D0FD3E',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    zIndex: 1,
  },
});