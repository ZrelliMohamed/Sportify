import React, { useState,useEffect, useContext ,useRef} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Card,Rating as Rate } from 'react-native-elements'
import { Box, CheckIcon, FormControl, Heading, Select, VStack, TextArea, Button } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserDataContext,CartContext } from '../MainStackNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import API_URL from '../screneens/var'
import axios from 'axios';
import Rating from './store/Rating';
import Messsage from './store/Notification/Messsage';
const CoachProfile = ({route}) => {
  const {userData} = useContext(UserDataContext)
  const {cart, setCart} = useContext(CartContext)
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const textAreaRef = useRef(null);
  const [toggle,setToggle]=useState(false)
  const handleReview = () => {
    axios.post(`${API_URL}/reviewC`,{User_Id:userData.User_Id,
    coach_Id:coach.User_Id,
    message:comment,
    rating:rating}).then(res=>{setToggle(!toggle)
      textAreaRef.current.clear();
      setIsSubmitEnabled(false)
    }).catch((err)=>console.log(err))
   
  };
  const {setProPurchased} = route.params
  const [profile,setProfile]=useState([])
  const navigation = useNavigation();
  const rout = useRoute();
  const coach = rout.params.coach;
  const {func} = route.params;
  const [programes,setprograms]=useState([])
  useEffect(() => {
    setIsSubmitEnabled(rating !== null && comment !== '');
  }, [rating, comment]);
  useEffect(async () => {
    const { data } = await axios.get(`${API_URL}/getcoachsProgBy/${coach.User_Id}`)
    setprograms(data)
  }
    ,[])
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${API_URL}/users/${userData.User_Id}`);
          setProfile(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }, []);
    const uniquePrograms = [...new Map(programes.map((prog) => [prog.prg_id, prog])).values()];
    const handlePurchase = (prg_id,prg_name,User_Id) => {
      // Handle purchase of program with prg_id
      axios.post(`${API_URL}/orders/verify`,{  user_id:userData.User_Id,
      prg_name:prg_name,
      User_Id:User_Id}).then(res=>{
        if(res.data){
           console.log(`Purchase program with ID ${prg_id}`);
      setProPurchased(prg_id)
      Alert.alert('Programe Added', 'The Programe has been added to the cart.', [
        {
          text: 'Purchase',
          onPress: () => navigation.navigate('CarteScreen'),
        },
      ]);
        }else {
          Alert.alert('Programe '+prg_name, 'Youve already acquired this program..', [
            {
              text: 'ok',
            },
          ]);
        }


      })
      .catch(err=>{console.log(err);})
     
    };
    const handleRating = (value) => {
      setRating(value);
      console.log('Selected rating:', value);
    };

    // handling the reviews 
    const [reviewsuser,setReviwesUser]=useState('')
    useEffect(()=>{
      axios.get(`${API_URL}/reviewC`)
      .then(res=>{setReviwesUser(res.data)
      })
      .catch(err=>console.log(err))
    },[toggle])

  return (
    <View style={styles.container}>
  <ScrollView>
    <View style={styles.header}>
      <Image source={{ uri: route.params.coach.user_img }} style={styles.profileImage} />
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{route.params.coach.user_name.toUpperCase()}</Text>
      </View>
      <View margin={10}>
       <Rating value={coach.User_preview}/>
      </View>
        <TouchableOpacity style={styles.messageButton} onPress={() => {navigation.navigate('Chat', { receiver: coach })}}>
          <Icon name="comments" size={20} color="#fff" />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.body}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>This is the description of the coach.</Text>
      </View>
      <Card containerStyle={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="graduation-cap" size={24} color="#4286f4" />
          <Text style={styles.cardTitle}>Programs</Text>
        </View>
        <View style={styles.container2}>
      {uniquePrograms.map((prog) => (
        <View key={prog.prg_id} style={styles.programContainer2}>
          <Image source={{ uri: prog.prg_img }} style={styles.programImage} />
          <View style={styles.programInfo}>
            <Text style={styles.programName2}>{prog.prg_name}</Text>
            <Text>Goal :{prog.prg_goal}</Text>
            <Text style={styles.programPrice2}>${prog.prg_price}</Text>
           {profile.user_type !== "coach"&& <TouchableOpacity style={styles.purchaseButton2} onPress={() => handlePurchase(prog.prg_id,prog.prg_name,prog.User_Id)}>
              <Text style={styles.buttonText2}>Purchase</Text>
            </TouchableOpacity>}
          </View>
        </View>
      ))}
    </View>
      </Card>
      {reviewsuser.length ===0 ? (
        <View margin={10}>
        <Messsage color="white" bg="#7e9e1e" size={10} children="NO REVIEWS" bold={0} />
        </View>
      ) : (
        reviewsuser.map((review) => (
          <View style={styles.reviewContainer5} key={review.review_id}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={{ uri: review.user_img }} style={{ width: 50, height: 50, borderRadius: 50 }} />
              <View style={{ marginLeft: 10 }}>
                <Heading fontSize={15} color="black">
                  {review.user_name}
                </Heading>
                <Rating value={review.rating} />
                <Messsage color="black" bg="white" size={10} children={review.message} />
              </View>
            </View>
          </View>
        ))
      )}
      {profile.user_type !== "coach"&& <>
        <Box><Heading style={styles.header1}>
          REVIEW {route.params.coach.user_name.toUpperCase()}
        </Heading>
        <VStack space={6}>
          <FormControl>
            <FormControl.Label style={styles.formLabel1}>Rating</FormControl.Label>
            <Rate onFinishRating={handleRating}/>
          </FormControl>
          <FormControl>
            <FormControl.Label style={styles.formLabel1}>Comment</FormControl.Label>
            <TextArea
              style={styles.textArea1}
              onChangeText={(text) => setComment(text)}
              value={comment}
              ref={textAreaRef}
            />
            <Button style={styles.submitButton1} onPress={handleReview} isDisabled={!isSubmitEnabled}
            marginTop={10} 
            >
              Submit
            </Button>
          </FormControl> 
        </VStack> </Box></>
       }
    </View>
  </ScrollView>
</View>

  );
};


const styles = StyleSheet.create({
  reviewContainer5: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
   profileImage: {
    width: '100%',
    aspectRatio: 1, // Ensures the image maintains a 1:1 aspect ratio
    borderRadius: 8, // Adjust the border radius to your preference
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  messageButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: 'bold',
  },
  body: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  exerciseContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  exerciseItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  exerciseImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  exerciseName: {
    marginTop: 4,
  },
  card: {
    borderRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  program: {
    marginBottom: 16,
  },
  programImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight:10
  },
  programInfo: {
    marginTop: 8,
  },
  programTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  programDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  programDuration: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
  },
  container2: {
    flex: 1,
    padding: 10,
  },
  programContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  programImage2: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  programInfo2: {
    flex: 1,
  },
  programName2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  programPrice2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  purchaseButton2: {
    backgroundColor: '#D0FD3E',
    padding: 10,
    borderRadius: 5,
  },
  buttonText2: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formLabel1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7e9e1e'
  },
  formControl1: {
    backgroundColor: '#f5f5f5',
    borderColor: '#f5f5f5',
  },
  header1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  submitButton1: {
     backgroundColor: '#7e9e1e',
     tintColor:"red"
  }
});


export default CoachProfile;