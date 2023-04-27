import React, { useState } from 'react';
import { Formik } from 'formik';
import { View, Text, Button, StyleSheet } from 'react-native';

function CreateProgram({ navigation }) {
const [exercises, setExercises] = useState([{ name: '', description: '' }]);

return (
<View style={styles.container}>
<Formik
initialValues={{
name: '',
description: '',
price: 0,
exercises
}}
onSubmit={values => {
fetch('https://your-api/programs', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(values)
});
navigation.goBack();
}}
>
{formik => (
<View>
<Text>Program Name:</Text>
<TextInput
{...formik.getFieldProps('name')}
/>
<Text>Description:</Text>
<TextInput
{...formik.getFieldProps('description')}
/>
<Text>Price:</Text>
<TextInput
{...formik.getFieldProps('price')}
/>


        <Text>Exercises:</Text> 
        {formik.values.exercises.map((exercise, index) => ( 
          <View key={index}> 
            <TextInput 
              {...formik.getFieldProps(`exercises.${index}.name`)} 
            /> 
            <TextInput 
              {...formik.getFieldProps(`exercises.${index}.description`)} 
            /> 
          </View> 
        ))} 
        
        <Button onPress={() => setExercises([...exercises, { name: '', description: '' }])} title="+ Add Exercise" /> 
        
        <Button type="submit" title="Submit" /> 
      </View> 
    )} 
  </Formik> 
</View> 
);
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 }
  });
  
  export default CreateProgram;