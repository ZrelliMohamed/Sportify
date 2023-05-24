import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'native-base';
import { UserDataContext, ToggleContext } from '../MainStackNavigator';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import API_URL from '../screneens/var';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dqjdflymg/upload';
const CLOUDINARY_UPLOAD_PRESET = 'aloulou';

const ProgramesConfirmation = ({ route }) => {
  const { programes } = route.params;
  const { userData } = useContext(UserDataContext);
  const { toggle, retoggle } = useContext(ToggleContext);
  const [imageUrl, setImageUrl] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to upload an image.');
      }
    })();
  }, []);
  
  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      try {
        const formData = new FormData();
        formData.append('file', {
          uri: result.uri,
          type: 'image/jpg',
          name: 'image.jpg',
        });
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        
        const response = await fetch(CLOUDINARY_URL, {
          method: 'POST',
          body: formData,
        });
        
        const data = await response.json();
        setImageUrl(data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Program Confirmation</Text>
      <ScrollView>
        <Formik
          initialValues={{
            name: '',
            price: '',
            goal: ''
          }}
          onSubmit={async (values) => {
            try {
              console.log('Values:', { ...values, image: imageUrl });
          
              const res = await axios.post(`${API_URL}/programes`, {
                prg_img: imageUrl,
                prg_name: values.name,
                User_Id: userData.User_Id,
                prg_price: values.price,
                prg_goal: values.goal
              });
          
              console.log(res.data.insertId);
          
              const promises = [];
          
              for (const day of Object.keys(programes)) {
                for (const exercise of programes[day]) {
                  const promise = axios.post(`${API_URL}/progexer/program-exercises`, {
                    prg_id: res.data.insertId,
                    exercice_id: exercise.exercice_id,
                    sets: exercise.sets,
                    day: day
                  });
                  promises.push(promise);
                }
              }

              await Promise.all(promises);
              retoggle()
              Alert.alert(
                'Nice!',
                'Program Added Successfully',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.navigate('BottomTabNavigator', { screen: 'profile' });
                    }
                  }
                ]
              );
            } catch (error) {
              console.log(error);
            }
          }}
          
          validate={(values) => {
            const errors = {};
            if (!imageUrl) {
              errors.image = 'Required';
            }
            if (!values.name) {
              errors.name = 'Required';
            }
            if (!values.price) {
              errors.price = 'Required';
            }
            if (!values.goal) {
              errors.goal = 'Required';
            }
            return errors;
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Image:</Text>
                <Button title="Upload Image" onPress={handleImageUpload} />
                {imageUrl && <Image source={{ uri: imageUrl }} style={styles.previewImage} />}
                {errors.image && touched.image && <Text style={styles.error}>{errors.image}</Text>}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Program Name:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {errors.name && touched.name && <Text style={styles.error}>{errors.name}</Text>}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Program Price:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  value={values.price}
                  keyboardType="numeric"
                />
                {errors.price && touched.price && <Text style={styles.error}>{errors.price}</Text>}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Program Goal:</Text>
                <Picker
                  selectedValue={values.goal}
                  style={styles.picker}
                  onValueChange={handleChange('goal')}
                >
                  <Picker.Item label="Select a goal" value="" />
                  <Picker.Item label="Gaining" value="gaining" />
                  <Picker.Item label="Losing" value="losing" />
                  <Picker.Item label="Shredded" value="shredded" />
                  <Picker.Item label="Running" value="running" />
                  <Picker.Item label="Protein" value="protein" />
                </Picker>
                {errors.goal && touched.goal && <Text style={styles.error}>{errors.goal}</Text>}
              </View>
              <Button
                title="Submit"
                onPress={handleSubmit}
                disabled={!imageUrl || !!errors.name || !!errors.price || !!errors.goal}
                color="#000"
                style={styles.submitButton}
                accessibilityLabel="Submit program information"
              >
                <Text style={styles.submitText}>Submit</Text>
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  formGroup: {
    marginBottom: 10
  },
  label: {
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  error: {
    color: 'red'
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4
  },
  submitButton: {
    backgroundColor: '#D0FD3E'
  },
  submitText: {
    color: '#000'
  },
  previewContainer: {
    marginTop: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    padding: 10
  },
  previewLabel: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  previewImage: {
    width: 300,
    height: 400,
    backgroundColor: '#ccc',
    borderRadius: 4
  }
});

export default ProgramesConfirmation;
