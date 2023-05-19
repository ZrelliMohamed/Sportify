import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const HEIGHT_VALUES = [
  { label: '1 m', value: '1' },
  { label: '1.1 m', value: '1.1' },
  { label: '1.2 m', value: '1.2' },
  { label: '1.3 m', value: '1.3' },
  { label: '1.4 m', value: '1.4' },
  { label: '1.5 m', value: '1.5' },
  { label: '1.6 m', value: '1.6' },
  { label: '1.7 m', value: '1.7' },
  { label: '1.8 m', value: '1.8' },
  { label: '1.9 m', value: '1.9' },
  { label: '2.0 m', value: '2.0' },
  { label: '2.1 m', value: '2.1' },
  { label: '2.2 m', value: '2.2' },
  { label: '2.3 m', value: '2.3' },
  { label: '2.4 m', value: '2.4' },
  { label: '2.5 m', value: '2.5' },
  { label: '2.6 m', value: '2.6' },
  { label: '2.7 m', value: '2.7' },
  { label: '2.8 m', value: '2.8' },
  { label: '2.9 m', value: '2.9' },
  { label: '3.0 m', value: '3.0' }
];
import API_URL from './var'
const HeightPicker = () => {
  const [selectedHeight, setSelectedHeight] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
 const{email}  = route.params;
  console.log(email)
  const handleHeightChange = (value) => {
    setSelectedHeight(value);
  };
console.log(selectedHeight)
const handleNextButtonPress = () => {
  fetch(`${API_URL}/updateHeight`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      height: selectedHeight
    })
  })
  .then(response => {
    console.log(response);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error updating user height');
    }
  })
  .then(data => {
  
    if (data.error) {
      throw new Error(data.error);
    } else {
      navigation.navigate('GenderPicker', { email: email });
    }
  })
  .catch(error => {
    console.error('here',error);
  });
};



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Height</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedHeight}
        onValueChange={handleHeightChange}
      >
        <Picker.Item label="Select height" value={null} />
        {HEIGHT_VALUES.map(({ label, value }) => (
          <Picker.Item key={value} label={label} value={value} />
        ))}
      </Picker>
      <TouchableOpacity
        style={[styles.button, !selectedHeight && styles.disabledButton]}
        onPress={handleNextButtonPress}
        disabled={!selectedHeight}
      >
        <Text style={styles.buttonText}>Next</Text>
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
    marginBottom: 20
  },
  picker: {
    width: '100%'
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 390
    },
    buttonText: {
    color: '#D0FD3E',
    fontWeight: 'bold',
    fontSize: 18
    }
    });
    
    
    
    
    
    
    


export default HeightPicker;
