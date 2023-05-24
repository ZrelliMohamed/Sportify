import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import API_URL from '../screneens/var';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const ProgramCreation = () => {
  const [exercises, setExercises] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [week, setWeek] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  console.log(week);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [formValues, setFormValues] = useState({ sets: '', day: 'Monday' });

  useEffect(() => {
    axios
      .get(`${API_URL}/exercices`)
      .then((res) => setExercises(res.data))
      .catch((err) => console.log(err));
  }, []);

  const navigation = useNavigation();

  const handleWeekPress = () => {
    navigation.navigate('Exercises', { week,updateWeek:setWeek });
  };

  const handleAddExercise = () => {
    const exercise = {
      exercice_id:selectedExercise.exercice_id,
      exercice_name: selectedExercise.exercice_name,
      image: selectedExercise.exercice_image,
      sets: parseInt(formValues.sets),
      day: formValues.day,
    };
   
    setWeek((prevWeek) => ({
      ...prevWeek,
      [formValues.day]: [...prevWeek[formValues.day], exercise],
    }));

    setSelectedExercise(null);
    setFormValues({ sets: '', day: 'Monday' });
  };

  const handleCancelExercise = () => {
    setSelectedExercise(null);
    setFormValues({ sets: '', day: 'Monday' });
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={styles.exerciseContainer}
        key={item.exercice_id}
        onPress={() => setSelectedExercise(item)}
      >
        <Image
          style={styles.exerciseImage}
          source={{ uri: item.exercice_image }}
        />
        <Text style={styles.exerciseName}>{item.exercice_name}</Text>
      </Pressable>
    );
  };

  const keyExtractor = (item) => item.exercice_id.toString();

  const filteredExercises = exercises.filter((item) =>
    item.exercice_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const isFormValid = formValues.sets !== '' && formValues.day !== '';
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search exercises..."
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity style={styles.weekIcon} onPress={handleWeekPress}>
          <Ionicons name="calendar-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {filteredExercises.length > 0 ? (
        <FlatList
          data={filteredExercises}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ padding: 10 }}
        />
      ) : (
        <Text style={styles.noResults}>No results found</Text>
      )}
      {selectedExercise && (
        <View style={styles.exerciseForm}>
          <Image
            style={styles.selectedExerciseImage}
            source={{ uri: selectedExercise.exercice_image }}
          />
          <Text style={styles.selectedExerciseName}>
            {selectedExercise.exercice_name}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Number of sets"
            keyboardType="numeric"
            onChangeText={(text) =>
              setFormValues({ ...formValues, sets: text })
            }
            value={formValues.sets}
          />
          <Picker
            style={styles.picker}
            selectedValue={formValues.day}
            onValueChange={(value) =>
              setFormValues({ ...formValues, day: value })
            }
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
          <View style={styles.buttonContainer}>
            <Pressable onPress={handleCancelExercise} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>X</Text>
            </Pressable>
            <Pressable
              onPress={handleAddExercise}
              style={[
                styles.addButton,
                { opacity: isFormValid ? 1 : 0.5, backgroundColor: isFormValid ? "#000000" : "#cccccc" },
              ]}
              disabled={!isFormValid}
            >
              <Ionicons name="add" size={24} color="#D0FD3E"  />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
  },
  searchBar: {
    width:'80%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  exerciseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  exerciseImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  exerciseName: {
    fontSize: 16,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 20,
  },
  exerciseForm: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  selectedExerciseImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  selectedExerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    borderRadius: 100,
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
    width:50
  },
  cancelButtonText: {
    color: '#D0FD3E',
    fontSize: 16,
  },
  addButton: {
    borderRadius: 100,
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
    width:50
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});
export default ProgramCreation