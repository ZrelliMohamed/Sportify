import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import fitness from "../data/fitness";

const ExerciseScreen = () => {
  const navigation = useNavigation();
  const route = useRoute()
  console.log('********************************************',route.params.data);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Image style={styles.image} source={{ uri: "https://www.bluetens.com/img/ybc_blog/post/recuperation-active-musculation.jpg" }} />

        <Ionicons
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          name="arrow-back-outline"
          size={28}
          color="white"
        />

        {route.params.data.map((item, index) => (
          <Pressable
            style={styles.exerciseContainer}
            key={index}
          >
            <Image style={styles.exerciseImage} source={{ uri: item.exercice_image }} />

            <View style={styles.exerciseDetails}>
              <Text style={styles.exerciseName}>{item.exercice_name}</Text>

              <Text style={styles.exerciseSets}>x{item.sets}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <Pressable
        onPress={() =>
          navigation.navigate("Fit", {
            exercises: route.params.data,
          })
        }
        style={styles.startButton}
      >
        <Text style={styles.startButtonText}>START</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ExerciseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  image: {
    width: "100%",
    height: 170,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  exerciseContainer: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  exerciseImage: {
    width: 90,
    height: 90,
  },
  exerciseDetails: {
    marginLeft: 10,
  },
  exerciseName: {
    fontSize: 17,
    fontWeight: "bold",
    width: 170,
  },
  exerciseSets: {
    marginTop: 4,
    fontSize: 18,
    color: "gray",
  },
  startButton: {
    backgroundColor: "black",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 20,
    width: 120,
    borderRadius: 6,
  },
  startButtonText: {
    textAlign: "center",
    color: "#D0FD3E",
    fontSize: 13,
    fontWeight: "900",
  },
});