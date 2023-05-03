import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Input, HStack, Box, ScrollView, Flex, Heading,Image } from 'native-base';
import {FontAwesome5} from '@expo/vector-icons'
import products from './store/data';
import Rating from './store/Rating';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const handlePress = (id) => {
    navigation.navigate('SingleProduct',{ productId: id });
  };
  const handleToCart = () => {
    navigation.navigate('CarteScreen');
  };
  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
      <HStack space={5} w="full" px={6} bg={'black'} py={4} alignItems="center" safeAreaTop >
      <Input placeholder='Search For Product ...' w='85%' bg='white' type='seach' h={12}
      variant="filled"
      borderWidth={0} _focus={{
        bg:"white",
      }}/>
      <Pressable ml={3}
     onPress={handleToCart}
      >
      <FontAwesome5 name="shopping-basket" size={24} color='white' />
      <Box px={1} rounded="full" position='absolute' top={-13} left={2} bgColor='red.900' _text={{
        color:"white",
        fontSize:'11px'
      }}>4</Box>
      </Pressable>
      </HStack>
      <ScrollView flex={1} horizontal showsHorizontalScrollIndicator={false} >
      <Flex flexWrap="wrap" direction='row' justifyContent={'space-between'} px={6} m={3}>
  {products.map((product)=>
    <Pressable 
    onPress={ () => {
      navigation.navigate('SingleProduct',{ productId:product._id});
    }}
    marginLeft={12}
      key={product._id} 
      w={'60%'} 
      bgColor='white' 
      rounded='md' 
      shadow={2} 
      overflow='hidden' 
      borderRadius={8}
      borderWidth={1}
      borderColor="gray.100"
      _pressed={{
        opacity: 0.6
      }}
     backgroundColor={"black"}
    >
      <Image source={{uri:product.image}} alt={product.name} h={32} w='full' resizeMode='contain' borderTopRadius={8}/>
      <Box  px={4} pt={3}>
        <Heading size={'sm'} bold mb={2} style={{color:'white'}}>
          ${product.price}
        </Heading>
        <Text fontSize="sm" style={{color:'white'}} lineHeight={5} >
          {product.name}
        </Text>
        <Rating value={product.rating}/>
      </Box>
    </Pressable>
  )}

</Flex>
        </ScrollView>
      </View>
      <View style={styles.contentContainer}>
        <Text>b9iyet il 5edma</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  swiperContainer: {
    height:'60%',
    backgroundColor: '#7e9e1e', // for visualization purposes only
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
