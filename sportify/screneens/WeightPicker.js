import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const WEIGHT_VALUES = Array.from({ length: 171 }, (_, i) => {
  const weight = (i + 30) * 0.5;
  return { label: `${weight} kg`, value: weight };
});

const WeightPicker = () => {
  const [selectedWeight, setSelectedWeight] = useState(null);
  const navigation = useNavigation();

  const route = useRoute();
  const{email}  = route.params;
  const handleWeightChange = (value) => {
    setSelectedWeight(value);
  };
  const handleNextButtonPress = () => {
    axios.post('http://10.0.2.2:3000/weight', {
      email: email,
      weight:selectedWeight 
    })
      .then(() => {
        
        navigation.navigate('SportGoalSelector',{email:email});
      })
      .catch((error) => {
        console.error('Error updating user height: ' + error);
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
        // onPress={() => onNext(selectedWeight)}
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
    backgroundColor: '#007',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  disabledButton: {
    opacity: 0.5
  }
});

export default WeightPicker;
