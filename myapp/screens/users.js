import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import config from './config';

const UsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [trainerEmail, setTrainerEmail] = useState(''); // Trainer email state
  const navigation = useNavigation();

  useEffect(() => {
    fetchTrainerEmail();
  }, []);

  const fetchTrainerEmail = async () => {
    const email = await AsyncStorage.getItem('trainerEmail'); // Retrieve trainer email from AsyncStorage
    setTrainerEmail(email);
    fetchUsers(email); // Fetch users for this trainer
  };

  const fetchUsers = async (email) => {
    try {
      const response = await fetch(`http://192.168.151.94:4545/trainedusers/${email}`);
      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      } else {
        console.error('Error fetching users:', data.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserPress = (email) => {
    navigation.navigate('trainerdash', { userEmail: email });
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Clear all items from AsyncStorage
      Alert.alert('Logout', 'You have been logged out successfully.');

      // Reset the navigation stack and navigate to the login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'login_trainer' }], // Change to the correct name of your login screen
      });
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Something went wrong during logout. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Users Trained by {trainerEmail}</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleUserPress(item.email)}>
            <View style={styles.userCard}>
              <Text style={styles.userText}>Name: {item.name}</Text>
              <Text style={styles.userText}>Email: {item.email}</Text>
              <Text style={styles.userText}>Phone: {item.phone}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    color: '#D7FF3E',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  userCard: {
    backgroundColor: 'black',
    padding: 10,
    //borderBlockColor: '#D7FF3E',
    width:'100%',
    //borderBlockStartColor:'#D7FF3E',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
  },
  userText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#D7FF3E',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UsersScreen;
