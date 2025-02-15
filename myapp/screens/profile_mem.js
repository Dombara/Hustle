import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import config from './config'; // Uncomment this if you are using config in your project

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const defaultImage = require('../assets/images/man.png'); // Ensure this path is correct

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Retrieve user information from AsyncStorage
        const userEmail = await AsyncStorage.getItem('userEmail');
        const token = await AsyncStorage.getItem('memberToken'); // Assuming you need this token later
        console.log('User Email:', userEmail);
        
        if (!userEmail) {
          throw new Error('User email not found in AsyncStorage');
        }

        // Fetch user profile details from backend
        const response = await fetch(`http://192.168.151.94:4545/users/${userEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Uncomment below if token is needed in the header
            // 'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const userdata = await response.json(); // Ensure this is the expected structure
        setUserData(userdata); // Correct the variable name here
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to load user profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#D7FF3E" />;
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No user data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={defaultImage} style={styles.profileImage} />
      <Text style={styles.name}>{userData.name}</Text>
      <Text style={styles.email}>Email: {userData.email}</Text>
      <Text style={styles.phone}>Phone: {userData.phone}</Text>
      <Text style={styles.address}>Address: {userData.address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: '#D7FF3E',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#fff',
  },
  phone: {
    fontSize: 18,
    color: '#fff',
  },
  address: {
    fontSize: 18,
    color: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default UserProfile;
