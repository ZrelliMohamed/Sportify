import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Image, HStack, Box, Flex } from 'native-base';
import {FontAwesome5} from '@expo/vector-icons'
import products from './store/data';
import Rating from './store/Rating';
import { useNavigation } from '@react-navigation/native';
const ProductList = () => {
  const navigation = useNavigation();
  const handlePress = (id) => {
    navigation.navigate('SingleProduct',{ productId: id });
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {products.map((product) => (
        <View key={product._id} style={styles.cardContainer}>
          <View style={styles.card}>
            <Pressable onPress={() => handlePress(product._id)}>
              <Image source={{ uri: product.image }} alt={product.name} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle} numberOfLines={1}>{product.name}</Text>
                <Text style={styles.cardDescription}>${product.price}</Text>
                <View style={styles.cardRating}>
                  <Rating value={product.rating} />
                  <Text style={styles.cardRatingText}>{product.numReviews} reviews</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
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
    height: 300,
    marginRight: 10,
  },
  cardImage: {
    height: 200,
    width: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardInfo: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  cardRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardRatingText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666',
  },
});
export default ProductList;