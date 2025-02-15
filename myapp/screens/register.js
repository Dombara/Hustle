import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import config from './config';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const handleSubmit = async () => {
   
    // Validation logic
    if (fullName === '' || phone === '' || email === '' || address === '' || password === '' || confirmPassword === '') {
      alert('Please fill in all fields');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(phone)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://192.168.151.94:4545/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:fullName,
          email,
          phone,
          address,
          password,
        }),
      });

      if (response.ok) {
        alert('User added successfully!');
        let tempmail=email;
        
        setFullName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setPassword('');
        setConfirmPassword('');
        navigation.navigate('register2',{mail:tempmail})
      } else {
        alert('Failed to add user');
      }
    } catch (error) {
      alert('Failed to add user');
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>CREATE YOUR ACCOUNT</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          keyboardType="phone-pad"
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('login_member')}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

//REGISTER STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    color: '#D7FF3E',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#222', 
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    color: '#000',
  },
  signUpButton: {
    backgroundColor: '#D7FF3E',
    paddingVertical: 10,  // Reduced padding
    paddingHorizontal: 50, // Added paddingHorizontal to control the width
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',  // This centers the button horizontally
    marginTop: 10,
  },
  signUpButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    backgroundColor: 'transparent', // Ensure transparency for no white bar
  },
  loginLink: {
    color: '#D7FF3E',
    fontWeight: 'bold',
  },
});
export default Register;
