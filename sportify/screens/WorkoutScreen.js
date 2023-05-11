import { StyleSheet, Text, View, ScrollView, Image , TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import ProgramScreen from './ProgramScreen'


const WorkoutScreen = () => {

  const navigation = useNavigation();

  const goToAnotherComponent = () => {
    navigation.navigate('ProgramScreen');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Home Workout</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItemLeft}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>WORKOUTS</Text>
          </View>

          <View style={styles.statItemCenter}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>MINS</Text>
          </View>

          <View style={styles.statItemRight}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>kcal</Text>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: '90%', height: 120, marginTop: 20, borderRadius: 7 }}
              source={{ uri: "https://media3.giphy.com/media/xvGatK16b9D3nakfcD/giphy.gif" }}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={goToAnotherComponent}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={{uri:'https://e7.pngegg.com/pngimages/722/236/png-clipart-kangaroo-exercise-dietary-supplement-muscle-food-gym-couple-kangaroo-exercise.png'}}
        />
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToAnotherComponent}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={{uri:'https://pngimg.com/d/yoga_PNG60.png'}}
        />
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToAnotherComponent}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={{uri:'https://e7.pngegg.com/pngimages/299/457/png-clipart-treadmill-physical-fitness-elliptical-trainers-exercise-equipment-fitness-gallery-treadmill-miscellaneous-running.png'}}
        />
      </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default WorkoutScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CD853F',
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    margin: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: -40
  },
  statItemLeft: {
    alignItems: 'center',
    flex: 1,
  },
  statItemCenter: {
    alignItems: 'center',
    flex: 1,
  },
  statItemRight: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 17,
    color: 'black',
    opacity: 0.2,
    marginTop: 6
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 500,
    height: 200,
    resizeMode: 'contain',
  }
});