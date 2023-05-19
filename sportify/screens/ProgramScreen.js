import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WorkoutDay = ({ day, programs, isOpen, toggleOpen }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const togglePrograms = () => {
    toggleOpen(day);
    // Animate the program list
    Animated.timing(fadeAnim, {
      toValue: isOpen ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  

  const navigation = useNavigation();

  const handleProgramPress = (programId) => {
    navigation.navigate('ExerciceScreen', { programId: programId });
  };

  return (
    <ScrollView style={[styles.dayContainer, day === 'Monday' && styles.mondayContainer]}>
      <TouchableOpacity onPress={togglePrograms}>
        <Text style={styles.day}>{day}</Text>
      </TouchableOpacity>
      {isOpen && (
        <Animated.ScrollView style={[styles.programsContainer, { opacity: fadeAnim }]}>
          {programs.map((program) => (
            <TouchableOpacity key={program.id} onPress={() => handleProgramPress(program.id)}>
              <Text style={styles.program}>{program.name}</Text>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
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
  const [openDay, setOpenDay] = useState(null);
  const toggleOpen = (day) => {
    if (openDay === day) {
      setOpenDay(null);
    } else {
      setOpenDay(day);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.daysContainer}>
      {days.map((day) => (
        <WorkoutDay
          key={day.id}
          day={day.name}
          programs={day.programs}
          isOpen={openDay === day.name}
          toggleOpen={toggleOpen}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  daysContainer: {
    padding: 20,
    backgroundColor: '#D4D3DC',
    marginTop:40
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

export default DaysWithPrograms;