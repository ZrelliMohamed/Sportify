import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native';
import coaches from './coachs';
import Rating from './store/Rating';

const CoachList = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {coaches.map((coach) => (
        <View key={coach.user_name} style={styles.cardContainer}>
          <View style={styles.card}>
            <View>
              <Image source={{ uri: coach.user_img }} style={styles.cardImage} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{coach.user_name}</Text>
              <View style={styles.ratingContainer}>
                <Rating value={coach.ratingValue} />
              </View>
              <Text style={styles.cardDescription} numberOfLines={2}>{coach.user_goal}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  cardContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    width: 200,
    height: 350,
    marginRight: 10,
  },
  cardImage: {
    height: 200,
    width: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 10,
  },
  ratingContainer: {
    marginHorizontal: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    marginHorizontal: 10,
    marginTop: 5,
    color: '#666',
  }
});

export default CoachList;
