import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Image, HStack, Box, Flex } from 'native-base';
import axios from 'axios';
import Rating from './store/Rating';
import { useNavigation } from '@react-navigation/native';
import { UserDataContext,ToggleContext } from '../MainStackNavigator';
import API_URL from '../screneens/var';
const ProductList = ({Search}) => {
  const { toggle, retoggle } = useContext(ToggleContext);
  const [products,setProducts]=useState([])
  const { userData } = useContext(UserDataContext);

  useEffect(() => {
    axios.get(`${API_URL}/products`)
    .then(response => {
      let filteredProducts = response.data;
      if (Search) {
        filteredProducts = filteredProducts.filter(product =>
          product.product_name.toLowerCase().includes(Search.toLowerCase())
        );
      }
      setProducts(filteredProducts);
    })
    .catch(error => {
      console.error('Error retrieving products from server:', error);
    });
  }, [toggle, Search]);
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
            <Pressable onPress={() => handlePress(product.product_id)}>
              <Image source={{ uri: product.product_image }} alt={product.product_name} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle} numberOfLines={1}>{product.product_name}</Text>
                <Text style={styles.cardDescription}>${product.product_price}</Text>
                <View style={styles.cardRating}>
                  <Rating value={product.rating} />
                  <Text style={styles.cardRatingText}>{product.num_reviews} reviews</Text>
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