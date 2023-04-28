// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';
// import axios from 'axios';

// const SettingsScreen = ({ user, setUser }) => {
//   const [name, setName] = useState(user.name);
//   const [email, setEmail] = useState(user.email);
//   const [phone, setPhone] = useState(user.phone);

//   useEffect(() => {
//     setName(user.name);
//     setEmail(user.email);
//     setPhone(user.phone);
//   }, [user]);

//   const handleSave = async () => {
//     try {
//       const updatedUser = { ...user, name, email, phone };
//       const response = await axios.put(`/users/${user.id}`, updatedUser);
//       setUser(response.data);
//       console.log('User data saved!');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <View>
//       <Text>Name:</Text>
//       <TextInput value={name} onChangeText={setName} />
//       <Text>Email:</Text>
//       <TextInput value={email} onChangeText={setEmail} />
//       <Text>Phone:</Text>
//       <TextInput value={phone} onChangeText={setPhone} />
//       <Button title="Save" onPress={handleSave} />
//     </View>
//   );
// };

// export default SettingsScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const SettingsScreen = () => {
  const [user, setUser] = useState({
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
  });
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  }, [user]);

  const handleSave = async () => {
    try {
      const updatedUser = { ...user, name, email, phone };
      const response = await axios.put(`/users/${user.id}`, updatedUser);
      setUser(response.data);
      console.log('User data saved!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={setName} />
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Phone:</Text>
      <TextInput value={phone} onChangeText={setPhone} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default SettingsScreen;