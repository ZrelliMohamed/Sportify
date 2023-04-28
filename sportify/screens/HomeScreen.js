import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import Swiper from 'react-native-swiper';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <Swiper>
          <View style={styles.slide}>
            <Text>Slide 1</Text>
          </View>
          <View style={styles.slide}>
          <Image 
           source={require('../assets/1.jpg')}/>
            <Text>Slide 2</Text>
          </View>
          <View style={styles.slide}>
            <Text>Slide 3</Text>
          </View>
        </Swiper>
      </View>
      <View style={styles.contentContainer}>
        <Text>b9iyet il 5edma</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  swiperContainer: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
