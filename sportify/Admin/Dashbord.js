import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ProductsDashboard from './ProductsDashboard';
import CoachesDashboard from './CoachesDashboard';
import ExercisesDashboard from './ExercisesDashboard';
import { useNavigation } from '@react-navigation/native';
const AdminDashboard = () => {
  const [activeView, setActiveView] = useState('productsDashboard');

  const handleViewChange = (view) => {
    setActiveView(view);
  };
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Login');
    console.log("zzz");
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.title}>Fitness App</Text>
        <View style={styles.navbarRight}>
          <TouchableOpacity
            style={[styles.navbarButton, activeView === 'productsDashboard' ? styles.activeButton : null]}
            onPress={() => handleViewChange('productsDashboard')}
          >
            <Text style={styles.buttonText}>Products Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navbarButton, activeView === 'exercisesDashboard' ? styles.activeButton : null]}
            onPress={() => handleViewChange('exercisesDashboard')}
          >
            <Text style={styles.buttonText}>Exercises Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navbarButton, activeView === 'coachesDashboard' ? styles.activeButton : null]}
            onPress={() => handleViewChange('coachesDashboard')}
          >
            <Text style={styles.buttonText}>Coaches Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Render the selected view here */}
      {activeView === 'productsDashboard' && <ProductsDashboard />}
      {activeView === 'exercisesDashboard' && <ExercisesDashboard />}
      {activeView === 'coachesDashboard' && <CoachesDashboard />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    height: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  navbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarButton: {
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  activeButton: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    fontSize: 16,
  },
  logoutButton: {
    marginLeft: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#f00',
  },
});

export default AdminDashboard;