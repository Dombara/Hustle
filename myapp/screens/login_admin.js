import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation } from 'expo-router';
import config from './config';

const LoginAdminScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkLoginStatus(); // Check if the admin is already logged in
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('adminToken'); // Check for 'adminToken'
    if (token) {
      navigation.replace('admin-homescreen'); // If token exists, navigate to home screen
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.151.94:4545/login-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password to the server
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const token = data.token;
        await AsyncStorage.setItem('adminToken', token); // Store the token with 'adminToken' key
  
        Alert.alert('Success', 'Login successful');
  
        // Reset the navigation stack and navigate to the admin home screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'admin-homescreen' }],
        });
      } else {
        Alert.alert('Error', data.message); // Show error message if login fails
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.'); // Handle any other errors
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}> LOG IN </Text>
        <Text style={styles.label}>Admin</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  card: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    color: '#D7FF3E',
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: '60%',
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 15,
    width: '50%',
  },
  button: {
    backgroundColor: '#D7FF3E',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default LoginAdminScreen;

