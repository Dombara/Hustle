import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminPage = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Clear all tokens and user details
      Alert.alert('Success', 'Logged out successfully');
      navigation.reset({
        index: 0,
        routes: [{ name: 'login_admin' }], // Reset stack and navigate to login screen
      });
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header section with Greeting, Profile, and Logout Button */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome, Admin!</Text>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/man.png')} // Adjust the path as necessary
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main section with centered buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Manage Members</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('manage-trainers')}>
          <Text style={styles.buttonText}>Manage Trainers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Manage Schemes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  greeting: {
    fontSize: 28,
    color: '#D7FF3E',
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  logoutButton: {
    //backgroundColor: '#FF3E3E', // Red color for logout button
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#D7FF3E',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center buttons horizontally
  },
  button: {
    backgroundColor: '#D7FF3E',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: '50%', // Set button width to 50% of screen width
  },
  buttonText: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminPage;
