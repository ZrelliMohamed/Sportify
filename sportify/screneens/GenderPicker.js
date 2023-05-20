import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';

import API_URL from './var'
const GenderPicker = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const{email}  = route.params;
 
  const handleGenderSelect = (value) => {
    setSelectedGender(value);
  };

  const handleNextPress = () => {
    if (selectedGender) {
      onNext(selectedGender);
    }
  };
  const handleNextButtonPress = () => {
    fetch(`${API_URL}/gender`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        gender: selectedGender
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error updating user gender');
        }
      })
      .then(() => {
        navigation.navigate('WeightPicker', { email: email });
      })
      .catch(error => {
        console.error(error);
      });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your gender</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedGender === 'male' && styles.selectedButton
          ]}
          onPress={() => handleGenderSelect('male')}
        >
          <Icon name="mars" size={50} color="#fff" />
          <Text style={styles.nextButtonText}>male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedGender === 'female' && styles.selectedButton
          ]}
          onPress={() => handleGenderSelect('female')}
        >
          <Icon name="venus" size={50} color="#fff" />
          <Text style={styles.nextButtonText}>female</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        disabled={!selectedGender}
      >
        <Text style={styles.nextButtonText} onPress={handleNextButtonPress}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 60
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10
  },
  selectedButton: {
    backgroundColor: '#005cb2'
  },
  nextButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 320
  },
  nextButtonText: {
    color: '#D0FD3E',
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default GenderPicker;