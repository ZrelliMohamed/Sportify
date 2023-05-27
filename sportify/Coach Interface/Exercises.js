import { Picker } from '@react-native-picker/picker';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useMemo,useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

const Exercises = ({route}) => {
    const rout = useRoute();
    const initialWeek = rout.params.week;
    const {updateWeek} = rout.params;
    const {setProg} = route.params
    console.log('3asfour',setProg);
    const days = Object.keys(initialWeek);
    
    const [selectedDay, setSelectedDay] = useState(days[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [week, setWeek] = useState(initialWeek);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [rerenderCount, setRerenderCount] = useState(0);
    useEffect(()=>{
        updateWeek(week)
        setProg(week)
    },[week])
    const exercises = useMemo(() => week[selectedDay], [selectedDay, week]);
  
    const renderItem = ({ item, index }) => {
      const isSelected = selectedExercises.includes(index);
      return (
        <TouchableOpacity style={[styles.exerciseContainer, isSelected && styles.selectedExercise]} onPress={() => handleExercisePress(index)}>
          <Image source={{ uri: item.image }} style={styles.exerciseImage} />
          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseName}>{item.exercice_name}</Text>
            <Text style={styles.exerciseSets}>{`Sets: ${item.sets}`}</Text>
          </View>
          {isSelected && <View style={styles.selectedIndicator} />}
        </TouchableOpacity>
      );
    };
  
    const renderSeparator = () => (
      <View style={styles.separator} />
    );
  
    const handlePrevPress = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setSelectedDay(days[currentIndex - 1]);
      }
    };
  
    const handleNextPress = () => {
      if (currentIndex < days.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedDay(days[currentIndex + 1]);
      }
    };
  
    const handleExercisePress = (exerciseIndex) => {
        if (selectedExercises.length === 2) {
          const exercises = [...week[selectedDay]];
          const [firstIndex, secondIndex] = selectedExercises;
          const temp = exercises[firstIndex];
          exercises[firstIndex] = exercises[secondIndex];
          exercises[secondIndex] = temp;
          setWeek((prevWeek) => ({
            ...prevWeek,
            [selectedDay]: exercises,
          }));
          setSelectedExercises([]);
        } else {
          setSelectedExercises((prevSelectedExercises) => [...prevSelectedExercises, exerciseIndex]);
        }
      };
      useEffect(() => {
        if (selectedExercises.length === 2) {
          const exercises = [...week[selectedDay]];
          const [firstIndex, secondIndex] = selectedExercises;
          const temp = exercises[firstIndex];
          exercises[firstIndex] = exercises[secondIndex];
          exercises[secondIndex] = temp;
          setWeek((prevWeek) => ({
            ...prevWeek,
            [selectedDay]: exercises,
          }));
          setSelectedExercises([]);
        }
      }, [selectedExercises, selectedDay, week]);
  console.log(week);
    return (
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedDay}
            onValueChange={(itemValue) => setSelectedDay(itemValue)}
            style={styles.picker}
          >
            {days.map((day, index) => (
              <Picker.Item key={index} label={day} value={day} />
            ))}
          </Picker>
        </View>
        <FlatList
          key={rerenderCount}
          data={exercises}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={(item, index) => `exercise_${index}`}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, currentIndex === 0 && styles.disabledButton]} onPress={handlePrevPress} disabled={currentIndex === 0}>
            <Text style={styles.buttonText}>{'Pres'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, currentIndex === days.length - 1 && styles.disabledButton]} onPress={handleNextPress} disabled={currentIndex === days.length - 1}>
            <Text style={styles.buttonText}>{'Next'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginBottom: 16,
  },
  picker: {
    height: 40,
    paddingHorizontal: 8,
  },
  exerciseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 8,
  },
  exerciseImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  exerciseSets: {
    fontSize: 14,
    color: '#666666',
  },
  selectedExercise: {
    backgroundColor: '#EFEFEF',
  },
  selectedIndicator: {
    width: 16,
    height: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginLeft: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#D0FD3E',
    fontWeight: 'bold', 
  },
});

export default Exercises;