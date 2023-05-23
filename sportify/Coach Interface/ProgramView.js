import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import API_URL from '../screneens/var';

const ProgramView = () => {
  const [program, setProgram] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const route = useRoute();
  const { prg_id } = route.params;
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_URL}/progexer/program-exercises/${prg_id}`)
      .then((res) => setProgram(res.data))
      .catch((err) => console.log(err));
  }, []);

  const uniqueDays = Array.from(new Set(program.map((item) => item.day)));

  const filteredProgram = program.filter(
    (item) => item.day === uniqueDays[currentDayIndex]
  );

  const handleNextDay = () => {
    if (currentDayIndex < uniqueDays.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  const handlePrevDay = () => {
   if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Picker
          selectedValue={selectedDay}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)}
        >
          <Picker.Item label="Select a day" value="" />
          {uniqueDays.map((day, index) => (
            <Picker.Item key={index} label={day} value={day} />
          ))}
        </Picker>
      </View>
      {selectedDay !== '' && (
        <View style={styles.body}>
          <View style={styles.dayHeader}>
            <TouchableOpacity
              style={styles.button}
              onPress={handlePrevDay}
              disabled={currentDayIndex === 0}
            >
              <Text style={styles.buttonText}>{"<"}</Text>
            </TouchableOpacity>
            <Text style={styles.dayTitle}>{uniqueDays[currentDayIndex]}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleNextDay}
              disabled={currentDayIndex === uniqueDays.length - 1}
            >
              <Text style={styles.buttonText}>{">"}</Text>
            </TouchableOpacity>
          </View>
          {filteredProgram.map((item, index)=> (
<View key={index} style={styles.exerciseContainer}>
<View style={styles.exerciseInfo}>
<Text style={styles.exerciseName}>
{item.exercice_name} ({item.sets} sets)
</Text>
</View>
<Image
source={{ uri: item.exercice_image }}
style={styles.exerciseImage}
/>
</View>
))}
</View>
)}
</ScrollView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#f7f7f7',
},
header: {
padding: 20,
paddingBottom: 10,
},
title: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 10,
},
picker: {
height: 50,
width: '100%',
backgroundColor: 'white',
borderRadius: 5,
borderWidth: 1,
borderColor: '#ccc',
},
body: {
padding: 20,
},
dayHeader: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
marginBottom: 20,
},
button: {
backgroundColor: '#D0FD3E',
borderRadius: 5,
paddingHorizontal: 10,
Vertical: 5,
},
buttonText: {
color: 'black',
fontWeight: 'bold',
fontSize: 18,
},
dayTitle: {
fontSize: 20,
fontWeight: 'bold',
},
exerciseContainer: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 20,
},
exerciseInfo: {
flex: 1,
},
exerciseName: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 5,
},
exerciseImage: {
width: 100,
height: 100,
borderRadius: 5,
marginLeft: 20,
},
});

export default ProgramView;