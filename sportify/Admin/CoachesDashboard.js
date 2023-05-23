import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';

const CoachesDashboard = () => {
  const [coachesData, setCoachesData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/users/coaches')
      .then(response => response.json())
      .then(data => {
        setCoachesData(data.coaches);
      })
      .catch(error => {
        console.error('Error retrieving coaches from server:', error);
      });
  }, [toggle]);

const handleCoachSubmit = async (values, { resetForm }) => {
  const image = values.user_img;
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'YOUR_UPLOAD_PRESET_NAME');

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'YOUR_API_KEY'
      },
      body: formData
    });

    const data = await response.json();

    // Once the image is uploaded, you can use the returned image URL to save the coach data to your server
    const coachData = {
      ...values,
      user_img: data.secure_url
    };

    fetch('http://localhost:3000/coaches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coachData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Coach added successfully:', data);
        resetForm();
        setToggle(!toggle);
      })
      .catch(error => {
        console.error('Error adding coach:', error);
      });

  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

  const handleCoachDelete = (coachId) => {
    fetch(`http://localhost:3000/coaches/${coachId}`, {
      method: 'DELETE'
    })
      .then(response => response.text())
      .then(data => {
        console.log('Coach deleted successfully:', data);
        setToggle(!toggle);
        setCoachesData(coachesData.filter((coach) => coach.User_Id !== coachId));
      })
      .catch(error => {
        console.error('Error deleting coach:', error);
      });
  };

  const handleCoachPress = (coachId) => {
    const coach = coachesData.find((coach) => coach.User_Id === coachId);
    setSelectedCoach(coach);
  };

  const handleCoachUpdate = (values) => {
    const filteredValues = Object.keys(values).reduce((acc, key) => {
      if (values[key] !== '' && values[key] != null && values[key] !== undefined) {
        acc[key] = values[key];
      }
      return acc;
    }, {});

    const updatedCoach = { ...selectedCoach, ...filteredValues };
    const updatedCoaches = coachesData.map((coach) =>
      coach.User_Id === selectedCoach.User_Id ? updatedCoach : coach);
    setCoachesData(updatedCoaches);
    setSelectedCoach(null);

    fetch(`http://localhost:3000/coaches/${selectedCoach.User_Id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCoach)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Coach updated successfully:', data);
        setToggle(!toggle);
      })
      .catch(error => {
        console.error('Error updating coach:', error);
      });
  };

  const renderCoachItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleCoachPress(item.User_Id)} style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.user_name}
            </Text>
            <Text style={styles.cardDescription}>{item.user_email}</Text>
          </View>
          <TouchableOpacity onPress={() => handleCoachDelete(item.User_Id)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete Coach</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {selectedCoach ? (
        <Formik initialValues={selectedCoach} onSubmit={handleCoachUpdate}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <Text style={styles.title}>Update Coach</Text>
              <TextInput defaultValue={selectedCoach.user_name} onChangeText={handleChange('user_name')} onBlur={handleBlur('user_name')} style={styles.input} />
              <TextInput defaultValue={selectedCoach.user_email} onChangeText={handleChange('user_email')} onBlur={handleBlur('user_email')} style={styles.input} />
              <TextInput defaultValue={selectedCoach.user_password} onChangeText={handleChange('user_password')} onBlur={handleBlur('user_password')} style={styles.input} />
              <TextInput defaultValue={selectedCoach.user_img} onChangeText={handleChange('user_img')} onBlur={handleBlur('user_img')} style={styles.input} />
              <TextInput defaultValue={selectedCoach.user_gender} onChangeText={handleChange('user_gender')} onBlur={handleBlur('user_gender')} style={styles.input} />
              <TextInput defaultValue={selectedCoach.user_preference} onChangeText={handleChange('user_preference')} onBlur={handleBlur('user_preference')} style={styles.input} />
              <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
                <Text style={styles.addButtonText}>Update Coach</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedCoach(null)} style={styles.addButton}>
                <Text style={styles.addButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      ) : (
        <>
          <Formik
            initialValues={{ user_name: '', user_email: '', user_password: '', user_img: '', user_gender: '', user_preference: '' }}
            onSubmit={handleCoachSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
                <Text style={styles.title}>Add Coach</Text>
                <TextInput placeholder="Name" onChangeText={handleChange('user_name')} onBlur={handleBlur('user_name')} style={styles.input} />
                <TextInput placeholder="Email" onChangeText={handleChange('user_email')} onBlur={handleBlur('user_email')} style={styles.input} />
                <TextInput placeholder="Password" onChangeText={handleChange('user_password')} onBlur={handleBlur('user_password')} style={styles.input} />
                <TextInput placeholder="Image URL" onChangeText={handleChange('user_img')} onBlur={handleBlur('user_img')} style={styles.input} />
                <TextInput placeholder="Gender" onChangeText={handleChange('user_gender')} onBlur={handleBlur('user_gender')} style={styles.input} />
                <TextInput placeholder="Preference" onChangeText={handleChange('user_preference')} onBlur={handleBlur('user_preference')} style={styles.input} />
                <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add Coach</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <FlatList
            data={coachesData}
            renderItem={renderCoachItem}
            keyExtractor={(item) => item.User_Id}
            style={styles.list}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center'
  },
  list: {
    marginTop: 20
  },
  cardContainer: {
    marginBottom: 10
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10
  },
  cardInfo: {
    flex: 1,
    marginRight: 10
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  cardDescription: {
    fontSize: 16,
    color: '#666'
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 4
  },
  deleteButtonText: {
    color: '#fff'
  }
});

export default CoachesDashboard;