import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList,TouchableOpacity  } from 'react-native';
import { Input, HStack, Box, Flex, Heading, Image } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons'
import products from './data';
import Rating from './Rating';
import { useNavigation } from '@react-navigation/native';

const Store = () => {
  const navigation = useNavigation();
  const handlePress = (id) => {
    navigation.navigate('SingleProduct', { productId: id });
  };
  const handleToCart = () => {
    navigation.navigate('CarteScreen');
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('SingleProduct', { productId: item._id })}
    >
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.contentContainer}>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.rating}>
          <Rating value={item.rating} />
          <Text style={styles.ratingText}>({item.numReviews} reviews)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
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
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.productsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  contentContainer: {
    padding: 20,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
  },
});

export default Store;
