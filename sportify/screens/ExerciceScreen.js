import {StyleSheet,Text,View,SafeAreaView,Image,Pressable,ScrollView,} from "react-native";
import React ,{useContext} from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FitnessItems } from "../Context";
import { AntDesign } from '@expo/vector-icons';
import fitness from "../data/fitness";

const ExerciceScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white", marginTop: 50 }}
      >
        <Image
          style={{ width: "100%", height: 170 }}
          source={{ uri: fitness[0].image }}
        />

        <Ionicons
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 20, left: 20 }}
          name="arrow-back-outline"
          size={28}
          color="white"
        />

        {fitness[0].excersises.map((item, index) => {
          return (
          
          <Pressable
            style={{ margin: 10, flexDirection: "row", alignItems: "center" }}
            key={index}
          >
            <Image
              style={{ width: 90, height: 90 }}
              source={{ uri: item.image }}
            />

            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "bold",width:170, }}>
                {item.name}
              </Text>

              <Text style={{ marginTop: 4, fontSize: 18, color: "gray" }}>
                x{item.sets}
              </Text>
            </View>
          </Pressable>
        )})}
      </ScrollView>
      <Pressable
      onPress={() =>  {
        navigation.navigate("Fit",{
          excersises:fitness.excersises,                                       
      })
      }}
        style={{
          backgroundColor: "blue",
          padding: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginVertical: 20,
          width:120,
          borderRadius:6,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 13,
            fontWeight: "900",
          }}
        >
          START
        </Text>
      </Pressable>
    </>
  );
};

export default ExerciceScreen;

const styles = StyleSheet.create({});
