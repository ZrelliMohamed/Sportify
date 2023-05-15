import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';

const ExercisesDashboard = () => {
  const [exercisesData, setExercisesData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/exercices')
      .then(response => response.json())
      .then(data => {
        setExercisesData(data);
      })
      .catch(error => {
        console.error('Error retrieving exercises from server:', error);
      });
  }, [toggle]);

  const handleExerciseSubmit = (values, { resetForm }) => {
    fetch('http://localhost:3000/exercices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Exercise added successfully:', data);
        resetForm();
        setToggle(!toggle);
      })
      .catch(error => {
        console.error('Error adding exercise:', error);
      });
  };

  const handleExerciseDelete = (exerciseId) => {
    fetch(`http://localhost:3000/exercices/${exerciseId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Exercise deleted successfully:', data);
        setToggle(!toggle);
        setExercisesData(exercisesData.filter((exercise) => exercise.exercice_id !== exerciseId));
      })
      .catch(error => {
        console.error('Error deleting exercise:', error);
      });
  };

  const handleExercisePress = (exerciseId) => {
    const exercise = exercisesData.find((exercise) => exercise.exercice_id === exerciseId);
    setSelectedExercise(exercise);
  };

  const handleExerciseUpdate = (values) => {
    const filteredValues = Object.keys(values).reduce((acc, key) => {
      if (values[key] !== '' && values[key] != null && values[key] !== undefined) {
        acc[key] = values[key];
      }
      return acc;
    }, {});

    const updatedExercise = { ...selectedExercise, ...filteredValues };
    const updatedExercises = exercisesData.map((exercise) =>
      exercise.exercice_id === selectedExercise.exercice_id ? updatedExercise : exercise);
    setExercisesData(updatedExercises);
    setSelectedExercise(null);

    fetch(`http://localhost:3000/exercices/${selectedExercise.exercice_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedExercise)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Exercise updated successfully:', data);
        setToggle(!toggle);
      })
      .catch(error => {
        console.error('Error updating exercise:', error);
      });
  };

  const renderExerciseItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleExercisePress(item.exercice_id)} style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.exercice_name}
            </Text>
            <Text style={styles.cardDescription}>{item.exercice_description}</Text>
          </View>
          <TouchableOpacity onPress={() => handleExerciseDelete(item.exercice_id)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete Exercise</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {selectedExercise ? (
        <Formik initialValues={selectedExercise} onSubmit={handleExerciseUpdate}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <Text style={styles.title}>Update Exercise</Text>
              <TextInput defaultValue={selectedExercise.exercice_name} onChangeText={handleChange('exercice_name')} onBlur={handleBlur('exercice_name')} style={styles.input} />
              <TextInput defaultValue={selectedExercise.exercice_description} onChangeText={handleChange('exercice_description')} onBlur={handleBlur('exercice_description')} style={styles.input} />
              <TextInput defaultValue={selectedExercise.exercice_sets.toString()} onChangeText={handleChange('exercice_sets')} onBlur={handleBlur('exercice_sets')} style={styles.input} />
              <TextInput defaultValue={selectedExercise.exercice_calories} onChangeText={handleChange('exercice_calories')} onBlur={handleBlur('exercice_calories')} style={styles.input} />
              <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
                <Text style={styles.addButtonText}>Update Exercise</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedExercise(null)} style={styles.addButton}>
                <Text style={styles.addButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleExerciseDelete(selectedExercise.exercice_id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete Exercise</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      ) : (
        <>
          <Formik
            initialValues={{ exercice_image: '', exercice_name: '', exercice_description: '', exercice_sets: '', exercice_calories: '' }}
            onSubmit={handleExerciseSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
                <Text style={styles.title}>Add Exercise</Text>
                <TextInput placeholder="Image URL" onChangeText={handleChange('exercice_image')} onBlur={handleBlur('exercice_image')} style={styles.input} />
                <TextInput placeholder="Name" onChangeText={handleChange('exercice_name')} onBlur={handleBlur('exercice_name')} style={styles.input} />
                <TextInput placeholder="Description" onChangeText={handleChange('exercice_description')} onBlur={handleBlur('exercice_description')} style={styles.input} />
                <TextInput placeholder="Sets" onChangeText={handleChange('exercice_sets')} onBlur={handleBlur('exercice_sets')} style={styles.input} />
                <TextInput placeholder="Calories" onChangeText={handleChange('exercice_calories')} onBlur={handleBlur('exercice_calories')} style={styles.input} />
                <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add Exercise</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <FlatList data={exercisesData} renderItem={renderExerciseItem} keyExtractor={(item) => item.exercice_id.toString()} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10
  },
  addButtonText: {
    color: 'white'
  },
  cardContainer: {
    marginBottom: 10
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardInfo: {
    flex: 1
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  cardDescription: {
    fontSize: 14
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  deleteButtonText: {
    color: 'white'
  }
});

export default ExercisesDashboard;