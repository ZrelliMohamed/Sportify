import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity , onNext} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';


const WEIGHT_VALUES = Array.from({ length: 171 }, (_, i) => {
  const weight = (i + 30) * 0.5;
  return { label: `${weight} kg`, value: weight };
});
import API_URL from './var'
const WeightPicker = () => {
  const [selectedWeight, setSelectedWeight] = useState(null);
  const navigation = useNavigation();

  const route = useRoute();
  const{email}  = route.params;
  const handleWeightChange = (value) => {
    setSelectedWeight(value);
  };
  const handleNextButtonPress = () => {
    fetch(`${API_URL}/weight`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        weight: selectedWeight
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error updating user weight');
        }
      })
      .then(() => {
        navigation.navigate('SportGoalSelector', { email: email });
      })
      .catch(error => {
        console.error(error);
      });
  };
  

  return (
    <View style={styles.container}>
      <Icon name="balance-scale" size={80} color="#007" style={styles.icon} />
      <Text style={styles.title}>Select your weight</Text>
      <Picker
        selectedValue={selectedWeight}
        onValueChange={handleWeightChange}
        style={styles.picker}
      >
        <Picker.Item label="Select weight" value={null} />
        {WEIGHT_VALUES.map(({ label, value }) => (
          <Picker.Item key={value} label={label} value={value} />
        ))}
      </Picker>
      <TouchableOpacity
        style={[styles.button, !selectedWeight && styles.disabledButton]}
        disabled={!selectedWeight}
      >
        <Text style={styles.buttonText} onPress={handleNextButtonPress}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  icon: {
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  picker: {
    width: '100%',
    marginBottom: 20
  },
  button: {
    marginTop:300 ,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    color: '#D0FD3E',
    fontSize: 18,
    fontWeight: 'bold'
  },
  disabledButton: {
    opacity: 0.5
  }
});

export default WeightPicker;
