import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Icon, Select } from 'native-base';
const HomeScreen = () => {
  const [language, setLanguage] = React.useState('key0');
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
      <Select
      placeholder="Mode of payment"
      selectedValue={language}
      width={150}
      onValueChange={(itemValue) => setLanguage(itemValue)}
    >
      <Select.Item label="Wallet" value="key0" />
      <Select.Item label="ATM Card" value="key1" />
      <Select.Item label="Debit Card" value="key2" />
      <Select.Item label="Credit Card" value="key3" />
      <Select.Item label="Net Banking" value="key4" />
    </Select>

    
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
