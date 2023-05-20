// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { Card } from 'react-native-elements';
// import {Button} from "native-base";
// import { useNavigation ,useRoute} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const CoachProfile = () => {

//   const navigation = useNavigation();
//  const route=useRoute();
//  const coach=route.params
// console.log('coach1',coach.coach);
//   const programs = [
//     {
//       id: 1,
//       title: 'Weight Loss',
//       description: 'This program is designed to help you lose weight and get in shape',
//       duration: 12,
//       image: 'https://source.unsplash.com/random/200x200',
//     },
//     {
//       id: 2,
//       title: 'Muscle Building',
//       description: 'This program is designed to help you build muscle mass and get stronger',
//       duration: 8,
//       image: 'https://source.unsplash.com/random/201x201',
//     },
//     {
//       id: 3,
//       title: 'Fitness Challenge',
//       description: 'This program is designed to push you to your limits and help you achieve your fitness goals',
//       duration: 6,
//       image: 'https://source.unsplash.com/random/202x202',
//     },
//   ];

//   const renderProgram = (program) => {
//     return (
//       <>
//         <Text style={styles.programTitle}>{program.title}</Text>
//         <Text style={styles.programDescription}>{program.description}</Text>
//         <TouchableOpacity style={styles.programButton}>
//           <Text style={styles.programButtonText}>Enroll</Text>
//         </TouchableOpacity>
//       </>
//     );
//   };

//   return (
 
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image source={{ uri: route.params.coach.user_img }} style={styles.avatar} />
//         <Text style={styles.name}>{route.params.coach.user_name}</Text>
//         <TouchableOpacity
//           style={styles.settings}
//           onPress={() => navigation.navigate('Chat',{receiver:coach.coach})}
//         >
//           <Icon name="comments" size={24} color="#fff" />
//         </TouchableOpacity>
//       </View>
//       <ScrollView>
//       <View style={styles.body}>
//         <Card containerStyle={styles.card}>
//           <View style={styles.cardHeader}>
//             <Icon name="trophy" size={24} color="#4286f4" />
//             <Text style={styles.cardTitle}>Biography</Text>
//           </View>
//           <View style={styles.cardBody}>
//             <View style={styles.achievement}>
//               <Icon name="check" size={24} color="#4286f4" />
//               <Text style={styles.achievementText}>Completed 10 workouts</Text>
//             </View>
//             <View style={styles.achievement}>
//               <Icon name="check" size={24} color="#4286f4" />
//               <Text style={styles.achievementText}>Burned 1000 calories</Text>
//             </View>
//             <View style={styles.achievement}>
//               <Icon name="check" size={24} color="#4286f4" />
//               <Text style={styles.achievementText}>Reached 10,000 steps in a day</Text>
//             </View>
//           </View>
//         </Card>

//         <Card containerStyle={styles.card}>
//           <View style={styles.cardHeader}>
//             <Icon name="heart" size={24} color="#4286f4" />
//             <Text style={styles.cardTitle}>Favorites</Text>
//           </View>
//           <View style={styles.cardBody}>
//             <TouchableOpacity style={styles.favorite}>
//             <Icon name="fas fa-dumbbell" size={24} color="#4286f4" />
//               <Text style={styles.favoriteText}>Full Body Workout</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.favorite}>
//               <Icon name="heartbeat" size={24} color="#4286f4" />
//               <Text style={styles.favoriteText}>Cardio Workout</Text>
//             </TouchableOpacity>
//           </View>
//         </Card>

//         <Card containerStyle={[styles.card, styles.programCard]}>
//           <View style={styles.cardHeader}>
//             <Icon name="graduation-cap" size={24} color="#4286f4" />
//             <Text style={styles.cardTitle}>Programs</Text>
//           </View>
//           <View style={styles.cardBody}>
//             {programs.map((program) => (
//               <TouchableOpacity style={styles.program} key={program.id}>
//                 <Image source={{ uri: program.image }} style={styles.programImage} />
//                 <View style={styles.programInfo}>
//                   <Text style={styles.programTitle}>{program.title}</Text>
//                   <Text style={styles.programDescription}>{program.description}</Text>
//                   <Text style={styles.programDuration}>{program.duration} weeks</Text>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </Card>
//       </View>
//       </ScrollView>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#4286f4',
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//   },
//   avatar: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     marginRight: 20,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   settings: {
//     marginLeft: 'auto',
//   },
//   body: {
//     flex: 1,
//     padding: 20,
//   },
//   card: {
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   cardBody: {
//     marginTop: 20,
//   },
//   achievement: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   achievementText: {
//     marginLeft: 10,
//   },
//   favorite: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   favoriteText: {
//     marginLeft: 10,
//   },
//   programCard: {
//     padding: 0,
//   },
//   program: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   programImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginRight: 20,
//   },
//   programInfo: {
//     flex: 1,
//   },
//   programTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   programDescription: {
//     fontSize: 16,
//     color: '#aaa',
//     marginBottom: 5,
//   },
//   programDuration: {
//     fontSize: 16,
//     color: '#aaa',
//   },
//   programButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#4286f4',
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   programButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default CoachProfile;
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { Button } from "native-base";
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CoachProfile = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const coach = route.params.coach;
console.log(coach,"the coach");
  const programs = [
    {
      id: 1,
      title: 'Weight Loss',
      description: 'This program is designed to help you lose weight and get in shape',
      duration: 12,
      image: 'https://source.unsplash.com/random/200x200',
    },
    // Rest of the programs
  ];

  const renderProgram = (program) => {
    return (
      <>
        <Image source={{ uri: program.image }} style={styles.programImage} />
        <View style={styles.programInfo}>
          <Text style={styles.programTitle}>{program.title}</Text>
          <Text style={styles.programDescription}>{program.description}</Text>
          <Text style={styles.programDuration}>{program.duration} weeks</Text>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
  <ScrollView>
    <View style={styles.header}>
      <Image source={{ uri: route.params.coach.user_img }} style={styles.profileImage} />
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{route.params.coach.user_name}</Text>
        <TouchableOpacity style={styles.messageButton} onPress={() => { console.log(coach,"rec") , navigation.navigate('Chat', { receiver: coach })}}>
          <Icon name="comments" size={20} color="#fff" />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.body}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>This is the description of the coach.</Text>
      </View>
      <View style={styles.exerciseContainer}>
        <View style={styles.exerciseItem}>
          {/* <Image source={require('exercise_image.jpg')} style={styles.exerciseImage} /> */}
          <Text style={styles.exerciseName}>Exercise 1</Text>
        </View>
        {/* Add more exercise items */}
      </View>
      <Card containerStyle={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="graduation-cap" size={24} color="#4286f4" />
          <Text style={styles.cardTitle}>Programs</Text>
        </View>
        <View style={styles.cardBody}>
          {programs.map((program) => (
            <TouchableOpacity style={styles.program} key={program.id}>
              {renderProgram(program)}
            </TouchableOpacity>
          ))}
        </View>
      </Card>
    </View>
  </ScrollView>
</View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
   profileImage: {
    width: '100%',
    aspectRatio: 1, // Ensures the image maintains a 1:1 aspect ratio
    borderRadius: 8, // Adjust the border radius to your preference
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  messageButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: 'bold',
  },
  body: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  exerciseContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  exerciseItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  exerciseImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  exerciseName: {
    marginTop: 4,
  },
  card: {
    borderRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4286f4',
  },
  program: {
    marginBottom: 16,
  },
  programImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  programInfo: {
    marginTop: 8,
  },
  programTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  programDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  programDuration: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
  },
});


export default CoachProfile;