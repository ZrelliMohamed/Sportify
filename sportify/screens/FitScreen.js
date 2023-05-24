import { StyleSheet, Text, View, SafeAreaView, Image, Pressable } from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FitnessContext } from "../Context";
import { AntDesign } from '@expo/vector-icons';
import fitnessData from "../data/fitness";

const FitScreen = () => {
  const route = useRoute();
  const data = route.params.exercises
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [workout, setWorkout] = useState(0);
  const [calories, setCalories] = useState(0);
  const [minutes, setMinutes] = useState(0);
const [i,setI]=useState(0)

  return (
    <SafeAreaView>
      <Image style={{ width: "100%", height: 370, marginTop:60 }} source={{ uri: data[i].exercice_image }} />

      <Text style={{ marginLeft: "auto", marginRight: "auto", marginTop: 30, fontSize: 30, fontWeight: "bold" }}>{data[i].exercice_name}</Text>

      <Text style={{ marginLeft: "auto", marginRight: "auto", marginTop: 40, fontSize: 38, fontWeight: "bold" }}>x{data[i].sets}</Text>

      {index + 1 >= data.length ? (
        <Pressable
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={{
            backgroundColor: "blue",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 20,
            padding: 10,
            width: 150,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, color: "white" }}>DONE</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {

            console.log(i,data.length-2);
            if(i+1>=data.length){
              navigation.navigate('ProgramScreen')
            }else{
              navigation.navigate('Rest')
              setI(i+1)
            }
            // navigation.navigate("Rest");
            setWorkout(workout + 1);
            setMinutes(minutes + 2.5);
            setCalories(calories + 6.3);
            setTimeout(() => {
              setIndex(index + 1);
            }, 25000);
          }}
          style={{
            backgroundColor: "black",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 20,
            padding: 10,
            width: 150,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, color: "#D0FD3E" }}>DONE</Text>
        </Pressable>
      )}

      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 50,
        }}
      >
        <Pressable
          disabled={i === 0}
          onPress={() => {
              setI(i-1)

            setTimeout(() => {
              setIndex(index - 1);
            }, 25000);
          }}
          style={{
            backgroundColor: "black",
            padding: 10,
            borderRadius: 20,
            marginHorizontal: 20,
            width: 100,
          }}
        >
          <Text style={{ color: "#D0FD3E", fontWeight: "bold", textAlign: "center" }}>PREV</Text>
        </Pressable>
        {index + 1 >= data.length ? (
          <Pressable
            onPress={() => {
              if(i+1>=data.length){
                navigation.navigate('ProgramScreen')
              }else{
  
                setI(i+1)
              }
            }}
            style={{
              backgroundColor: "black",
              padding: 10,
              borderRadius: 20,
              marginHorizontal: 20,
              width: 100,
            }}
          >
            <Text style={{ color: "#D0FD3E", fontWeight: "bold", textAlign: "center" }}>SKIP</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              if(i+1>=data.length){
                navigation.navigate('ProgramScreen')
              }else{
                navigation.navigate('Rest')
                setI(i+1)
              }
              setTimeout(() => {
                setIndex(index + 1);
              }, 25000);
            }}
            style={{
              backgroundColor: "black",
              padding: 10,
              borderRadius: 20,
              marginHorizontal: 20,
              width: 100,
            }}
          >
            <Text style={{ color: "#D0FD3E", fontWeight: "bold", textAlign: "center" }}>SKIP</Text>
          </Pressable>
        )}
      </Pressable>
      
    </SafeAreaView>
  );
};

export default function FitScreenWithContext() {
  return (
    <FitnessContext>
      <FitScreen />
    </FitnessContext>
  )
}

const styles = StyleSheet.create({});