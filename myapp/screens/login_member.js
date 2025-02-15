import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('memberToken');
    if (token) {
      navigation.replace('home');
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.151.94:4545/login-member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const token = data.token;
        const userEmail = email;

        if (!userEmail) {
          Alert.alert('Error', 'Email is undefined, please try again.');
          return;
        }

        await AsyncStorage.setItem('memberToken', token);
        await AsyncStorage.setItem('userEmail', userEmail);
        console.log('Stored email:', userEmail);

        Alert.alert('Success', 'Login successful');

        navigation.reset({
          index: 0,
          routes: [{ name: 'home' }],
        });
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>LOG IN</Text>
        <Text style={styles.label}>Member</Text>
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

export default LoginScreen;
  