import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Box, CheckIcon, FormControl, Heading, Select, VStack,TextArea, Button } from 'native-base'
import Rating from './Rating'
import Messsage from './Notification/Messsage'
const Review = () => {
    const [rating,setRating]=useState(0)
  return (
    <Box>
      <Heading bold fontSize={15} mb={2}>
        REVIEW
      </Heading>
      {/* if There is No Review */}
      <Messsage color="gray" bg='#7e9e1e' size={10} children={"NO REVIEW"} bold={5}/>
      {/* Review */}
      <Box p={3} bg="#7e9e1e" mt={5} rounded={5}>
      <Heading  fontSize={15} color='black'>
        User Doe
      </Heading>
      <Rating value={4}/>
      <Text my={2} mb={3} fontSize={10}>Jan 12 2022</Text>
      <Messsage color="black" bg='white' size={10} children={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget nulla ac velit pretium pulvinar a at urna. Sed bibendum, nibh sit amet malesuada accumsan, ipsum leo aliquam neque, vel suscipit augue felis nec mauris. "} />
      </Box>
      <Box mt={6}>
      <Heading  fontSize={15} color='black' mb={4} bold >
        REVIEW THIS PRODUCT
      </Heading>
      <VStack space={6}>
      <FormControl>
      <FormControl.Label _text={{
        color:"black",
        fontSize:'12px',
        fontWeight:'bold'
      }}>
        Rating
      </FormControl.Label>
      <Select bg='#7e9e1e'  borderWidth={0} rounded={5} py={3} placeholder='Choose Reveiw' placeholderTextColor="black" color="white"
      _selectedItem={{
        bg:"white",
        endIcon:<CheckIcon size={5}/>
      }}
      selectedValue={rating}
      onValueChange={(e)=>{setRating(e)}}
      >
        <Select.Item value={1} label='1- Poor'/>
        <Select.Item value={2} label='2- Fair'/>
        <Select.Item value={3} label='3- Good'/>

        </Select>
      </FormControl>
      <FormControl>
      <FormControl.Label _text={{
        color:"black",
        fontSize:'12px',
        fontWeight:'bold'
      }}>
        Comment
      </FormControl.Label>
      <TextArea h={24} w='full' placeholder='This Product is good ...' placeholderTextColor="black" borderWidth={0} bg='#7e9e1e' py={2} _focus={{
        bg: '#7e9e1e'
      }}></TextArea>
      <Button bg='#7e9e1e' mt={10} mb={10} borderRadius={100}> Submit</Button>
      </FormControl>


      </VStack>
      </Box>
    </Box>
  )
}

export default Review