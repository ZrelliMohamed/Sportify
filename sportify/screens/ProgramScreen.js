import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const WorkoutDay = ({ day, programs }) => {
  const [showPrograms, setShowPrograms] = useState(false);

  const togglePrograms = () => {
    setShowPrograms(!showPrograms);
  };


  const navigation = useNavigation();

  const handleProgramPress = (programId) => {
    navigation.navigate('ExerciceScreen', { programId });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={togglePrograms}>
        <Text style={styles.day}>{day}</Text>
      </TouchableOpacity>

      {showPrograms && (
        <ScrollView style={styles.programsContainer}>
          {programs.map((program) => (
            <TouchableOpacity key={program.id} onPress={() => handleProgramPress(program.id)}>
              <Text style={styles.program}>{program.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </ScrollView>
  );
};

const DaysWithPrograms = ({ navigation }) => {
  const days = [
    { id: 1, name: 'Monday', programs: [{ id: 1, name: 'Program 1' }, { id: 2, name: 'Program 2' }] },
    { id: 2, name: 'Tuesday', programs: [{ id: 3, name: 'Program 3' }, { id: 4, name: 'Program 4' }] },
    { id: 3, name: 'Wednesday', programs: [{ id: 5, name: 'Program 5' }, { id: 6, name: 'Program 6' }] },
    { id: 4, name: 'Thursday', programs: [{ id: 7, name: 'Program 7' }, { id: 8, name: 'Program 8' }] },
    { id: 5, name: 'Friday', programs: [{ id: 9, name: 'Program 9' }, { id: 10, name: 'Program 10' }] },
    { id: 6, name: 'Saturday', programs: [{ id: 11, name: 'Program 11' }, { id: 12, name: 'Program 12' }] },
    { id: 7, name: 'Sunday', programs: [{ id: 13, name: 'Program 13' }, { id: 14, name: 'Program 14' }] },
  ];

  return (
    <ScrollView style={styles.daysContainer}>
      {days.map((day) => (
        <WorkoutDay key={day.id} day={day.name} programs={day.programs} navigation={navigation} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  daysContainer: {
    padding: 20,
  },
  
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  
  day: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  
  programsContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
  
  program: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default DaysWithPrograms;