
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import API_URL from './var'
const SportGoalSelector = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const navigation = useNavigation();

  const route = useRoute();
  const{email}  = route.params;

  const handleGoalPress = (goal) => {
    setSelectedGoal(goal);
  }

  // const handleNextPress = () => {
  //   onNextPress(selectedGoal);
  // }
  const handleNextButtonPress = () => {
    fetch(`${API_URL}/goal`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        goal: selectedGoal
      })
    }) 
        .then(response => response.json())
        .then(res=>{
           alert('cong');
        navigation.navigate('MainStackNavigator',{userData: {User_Id:res}});

        })
    .catch(error => {
      console.log('Error updating user goal: ' + error);
    });
  };
  
  return (
    <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Select your sport goal:</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => handleGoalPress('gaining')} style={[styles.iconButton, selectedGoal === 'gaining' && styles.selectedIcon]}>
          <Ionicons name="ios-add" size={60} color="black" />
          <Text style={[styles.iconText, selectedGoal === 'gaining' && styles.selectedIconText]}>Gaining weight</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleGoalPress('losing')} style={[styles.iconButton, selectedGoal === 'losing' && styles.selectedIcon]}>
          <Ionicons name="ios-remove" size={60} color="black" />
          <Text style={[styles.iconText, selectedGoal === 'losing' && styles.selectedIconText]}>Losing weight</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleGoalPress('shredded')} style={[styles.iconButton, selectedGoal === 'shredded' && styles.selectedIcon]}>
          <Ionicons name="ios-barbell" size={60} color="black" />
          <Text style={[styles.iconText, selectedGoal === 'shredded' && styles.selectedIconText]}>Weight lifting</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleGoalPress('running')} style={[styles.iconButton, selectedGoal === 'running' && styles.selectedIcon]}>
          <Ionicons name="ios-walk" size={60} color="black" />
          <Text style={[styles.iconText, selectedGoal === 'running' && styles.selectedIconText]}>Running</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleGoalPress('protein')} style={[styles.iconButton, selectedGoal === 'protein' && styles.selectedIcon]}>
          <Ionicons name="ios-nutrition" size={60} color="black" />
          <Text style={[styles.iconText, selectedGoal === 'protein' && styles.selectedIconText]}>Protein</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity disabled={!selectedGoal}  style={[styles.nextButton, !selectedGoal && styles.disabledButton]}>
        <Text style={styles.nextButtonText} onPress={handleNextButtonPress}>Next</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  iconsContainer: {
    flexDirection: 'column',
    marginBottom: 30,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIcon: {
    borderColor: '#1E90FF',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#D0FD3E',
  },
  iconText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: 'gray',
  },
  selectedIconText: {
    color: '#1E90FF',
  },
  nextButton: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#D0FD3E',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default SportGoalSelector;
