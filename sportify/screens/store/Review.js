import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Box, CheckIcon, FormControl, Heading, Select, VStack, TextArea, Button } from 'native-base';
import Rating from './Rating';
import Messsage from './Notification/Messsage'; 
import { UserDataContext} from '../../MainStackNavigator';
import axios from 'axios';
import API_URL from '../../screneens/var';

import {ToggleContext } from '../../MainStackNavigator';
const Review = ({ productId,SPtoggle }) => {
  
  const { toggle, retoggle } = useContext(ToggleContext);
     const { userData } = useContext(UserDataContext);

     const [rating, setRating] = useState(0);
     const [comment, setComment] = useState('');
     const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
     const selectRef = useRef(null);
     const textAreaRef = useRef(null);
  
     const [reviews, setReviews] = useState([]);
  
  
  
     const handleReview = () => {
       axios
         .post(`${API_URL}/review`, {
           product_id: productId,
           user_id: userData.User_Id,
           rating: rating,
           comment: comment,
         })
         .then((res) => {
           console.log(res.data);
           setRating(0);
           setComment('');
           setIsSubmitEnabled(false);
           selectRef.current.setValue(0);
           textAreaRef.current.clear();
         })
         .catch((err) => {
           console.log(err);
         });
     };
  
     useEffect(() => {
       setIsSubmitEnabled(rating !== 0 && comment !== '');
     }, [rating, comment]);
  
     useEffect(() => {
       axios(`${API_URL}/review/${productId}/${userData.User_Id}`)
         .then((res) => {setReviews(res.data)
          SPtoggle();
          retoggle();
        })
         .catch((err) => console.log(err));
     }, [rating]);
     /* ***Handel the review to let the user review the product only once*** */
     const [canRev,setCanRev]=useState(true)
     const filtered_data = reviews.filter(review => review.user_id === userData.User_Id);
       useEffect(()=>{
         if(filtered_data.length>0){
           setCanRev(false)
         }
       },[filtered_data])
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,  
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333'
    },
    reviewContainer: {
      backgroundColor: '#f5f5f5',
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
    },
    formLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#7e9e1e'
    },
    formControl: {
      backgroundColor: '#f5f5f5',
      borderColor: '#f5f5f5',
    },
    textArea: {
      height: 80,
      backgroundColor: '#f5f5f5',
    },
    submitButton: {
      backgroundColor: '#7e9e1e',
    }
  });
  
  return (<Box>
    <View style={styles.container}>
      <Heading style={styles.header}>
        REVIEW
      </Heading>
      {reviews.length === 0 ? (
        <Messsage color="gray" bg="#7e9e1e" size={10} children="NO REVIEWS" bold={5} />
      ) : (
        reviews.map((review) => (
          <View style={styles.reviewContainer} key={review.review_id}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={{ uri: review.user_img }} style={{ width: 50, height: 50, borderRadius: 50 }} />
              <View style={{ marginLeft: 10 }}>
                <Heading fontSize={15} color="black">
                  {review.user_name}
                </Heading>
                <Rating value={review.rating} />
                <Text my={2} mb={3} fontSize={10}>
                  {review.date}
                </Text>
                <Messsage color="black" bg="white" size={10} children={review.comment} />
              </View>
            </View>
          </View>
        ))
      )}
    </View>  
    <View style={styles.container}>
     {canRev===true && <Box><Heading style={styles.header}>
          REVIEW THIS PRODUCT
        </Heading>
        <VStack space={6}>
          <FormControl>
            <FormControl.Label style={styles.formLabel}>Rating</FormControl.Label>
            <Select
              selectedValue={rating}
              onValueChange={(value) => setRating(value)}
              style={styles.formControl} 
              ref={selectRef} 
              isReadOnly={true}
            >
               <Select.Item value={0} label="Select Rating" />
               <Select.Item value={1} label="1- Poor" />
               <Select.Item value={2} label="2- Fair" />
               <Select.Item value={3} label="3- Average" />
               <Select.Item value={4} label="4- Good" />
               <Select.Item value={5} label="5- Excellent" />
            </Select>
          </FormControl>
          <FormControl>
            <FormControl.Label style={styles.formLabel}>Comment</FormControl.Label>
            <TextArea
              style={styles.textArea}
              onChangeText={(text) => setComment(text)}
              value={comment}
              ref={textAreaRef}
            />
            <Button style={styles.submitButton} onPress={handleReview} isDisabled={!isSubmitEnabled}>
              Submit
            </Button>
          </FormControl> 
        </VStack> </Box>}
    </View></Box>
  );
};
 
export default Review;