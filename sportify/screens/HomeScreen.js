import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Input, HStack, Box, ScrollView, Flex, Heading, Image } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import products from './store/data';
import Rating from './store/Rating';
import { useNavigation } from '@react-navigation/native';
import CoachList from './CoachList';
import ProductList from './ProductList';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handlePress = (id) => {
    navigation.navigate('SingleProduct', { productId: id });
  };

  const handleToCart = () => {
    navigation.navigate('CarteScreen');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.swiperContainer}>
  <HStack space={5} w="full" px={6} py={4} alignItems="center" safeAreaTop>
    <Input
      placeholder="Search For Products & Coaches ..."
      w="85%"
      bg="white"
      type="search"
      h={12}
      variant="filled"
      borderWidth={0}
      _focus={{ bg: "white" }}
      borderRadius={999}
      paddingLeft={3}
      InputLeftElement={
        <FontAwesome5 name="search" size={18} color="#ccc" ml={2} />
      }
    />
    <Pressable onPress={handleToCart}>
      <FontAwesome5 name="shopping-cart" size={24} color="#333" />
      <Box px={1} rounded="full" position="absolute" top={-13} left={2} bgColor="red.900" _text={{ color: "white", fontSize: '11px' }}>
                4
              </Box>
    </Pressable>
  </HStack>
</View>

        <View style={styles.productsContainer}>
          <Heading style={styles.productsTitle}>Products</Heading>
          <ProductList />
        </View>
        <View style={styles.coachesContainer}>
          <Heading style={styles.coachesTitle}>Coaches</Heading>
          <CoachList />
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
  swiperContainer: {
    height: 'auto',
  },
  productsContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  productsTitle: {
    marginBottom: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  coachesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  coachesTitle: {
    marginBottom: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
