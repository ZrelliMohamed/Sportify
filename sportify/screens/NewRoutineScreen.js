import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { UserDataContext } from '../MainStackNavigator';
import axios from 'axios';
import API_URL from '../screneens/var';
import ProgramCreation from '../Coach Interface/ProgramCreation';

const TodoItem = ({ title, onDelete }) => {


  return (
   <View style={styles.todoItem}>
      <Text style={styles.todoTitle}>{title}</Text>
      <TouchableOpacity onPress={onDelete}>
        <AntDesign name="delete" size={24} color="#ff6262" />
      </TouchableOpacity>
    </View> 
  );
};

const NewRoutineScreen = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [newTodoItem, setNewTodoItem] = useState('');
  const {userData} = useContext(UserDataContext)
  const [user,setUser]=useState(null)
  useEffect(()=>{
    axios.get(`${API_URL}/users/${userData.User_Id}`)
    .then(res=>setUser(res.data))
    .catch(err=>console.log(err))
  },[])
  const handleAddTodo = () => {
    if (newTodoItem.trim() !== '') {
      setTodoItems([...todoItems, newTodoItem]);
      setNewTodoItem('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodoItems = [...todoItems];
    newTodoItems.splice(index, 1);
    setTodoItems(newTodoItems);
  };

  return (
    user!==null && user.user_type==='user'? 
    <View style={styles.container}>
    <Text style={styles.title}> My Routine </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new item"
          value={newTodoItem}
          onChangeText={setNewTodoItem}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.listContainer}
        data={todoItems}
        renderItem={({ item, index }) => (
          <TodoItem title={item} onDelete={() => handleDeleteTodo(index)} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>: 
    <ProgramCreation/>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#D0FD3E',
    fontWeight: 'bold',
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewRoutineScreen;