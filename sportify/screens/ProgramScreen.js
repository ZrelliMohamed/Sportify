import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import API_URL from '../screneens/var';

const ProgramScreen = () => {
  const route = useRoute();
  const [Prog, setProg] = useState([]);
  const [days,setday]=useState([])
  useEffect(() => {
    axios.get(`${API_URL}/exercice/${route.params.Prog_id}`)
      .then(res => setProg(res.data))
      .catch(err => console.log(err));
  }, []);

  const navigation = useNavigation();

  useEffect(()=> {
  setday(Prog.map(obj => Object.keys(obj)[0]))
  },[Prog])
  return (
    <ScrollView contentContainerStyle={styles.daysContainer}>
      {Prog.map((day,i) => (
        <ScrollView
          key={i}
          style={[styles.dayContainer, day.name === 'Monday' && styles.mondayContainer]}
       >
          <TouchableOpacity onPress={() =>{
            console.log(Prog[i][days[i]]);
            navigation.navigate('ExerciceScreen',{data:Prog[i][days[i]]});
            }}>
            <Text style={styles.day}>{days[i]}</Text>
          </TouchableOpacity>
        </ScrollView>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  daysContainer: {
    padding: 20,
    backgroundColor: '#D4D3DC',
    marginTop: 40,
  },
  dayContainer: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#B8CBD0',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
  },
  mondayContainer: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
  },
  day: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  programsContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
  program: {
    fontSize: 16,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#B8CBD0',
    borderRadius: 10,
    textAlign: 'center',
  },
});

export default ProgramScreen;
