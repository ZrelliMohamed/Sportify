// import React from 'react';
// import { StyleSheet, View, Text, Image } from 'react-native';
// import AppIntroSlider from 'react-native-app-intro-slider';
// import { useNavigation } from '@react-navigation/native';
// // import SlideIntro from "./sliderintroapp";

// const slides = [
//   {
//     key: 'slide1',
//     title: 'Welcome to My App',
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     image: require('../assets/imag1.jpg'),
//     backgroundColor: '#1C2833',
//   },
//   {
//     key: 'slide2',
//     title: 'Discover New Features',
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     image: require('../assets/imag2.jpg'),
//     backgroundColor: '#1C2833',
//   },
//   {
//     key: 'slide3',
//     title: 'Get Started',
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     image: require('../assets/imag3.jpg'),
//     backgroundColor: '#1C2833',
//   },
//   {
//     key: 'slide4',
//     title: 'Learn More',
//     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     image: require('../assets/imag4.jpg'),
//     backgroundColor: '#1C2833',
//   }
// ];

// const AppIntro = () => {
//   const navigation = useNavigation()
//   const _renderItem = ({ item }) => {
    
//     return (
//       <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
//         <Image source={item.image} style={styles.image} />
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.text}>{item.text}</Text>
//       </View>
//     );
//   };

//   const _onDone = () => {
//     navigation.navigate('HomeScreen');
//   };

//   const _renderNextButton = () => {
//     return (
//       <View style={styles.buttonCircle}>
//         <Text style={styles.buttonText}>Next</Text>
//       </View>
//     );
//   };

//   const _renderDoneButton = () => {
//     return (
//       <View style={styles.buttonCircle}>
//         <Text style={styles.buttonText}>Done</Text>
//       </View>
//     );
//   };

//   return (
//     <AppIntroSlider
//       renderItem={_renderItem}
//       data={slides}
//       onDone={_onDone}
//       renderDoneButton={_renderDoneButton}
//       renderNextButton={_renderNextButton}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   slide: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     resizeMode: 'contain',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 32,
//     color:'orange'
//   },
//   text: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginHorizontal: 32,
//     marginTop: 16,
//     color:'white'
//   },
//   buttonCircle: {
//     width: 60,
//     height: 60,
//     backgroundColor: 'orange',
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default AppIntro;