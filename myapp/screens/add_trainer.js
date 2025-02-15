import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure react-native-vector-icons is installed
import config from './config';

const ManageTrainer = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await fetch('http://192.168.151.94:4545/trainers'); // Replace with your API endpoint
      const data = await response.json();

      if (response.ok) {
        setTrainers(data);
      } else {
        console.error('Error fetching trainers:', data.message);
      }
    } catch (error) {
      console.error('Error fetching trainers:', error);
    }
  };

  const handleAddTrainer = async () => {
    if (fullName === '' || phone === '' || email === '' || address === '' || password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
  
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.151.94:4545/add-trainer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          phone: phone,
          email: email,
          address: address,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert('Success', 'Trainer added successfully!');
        setFullName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setPassword('');
        setConfirmPassword('');
        setModalVisible(false);
        fetchTrainers();
      } else {
        Alert.alert('Error', data.message || 'Could not add trainer');
      }
    } catch (error) {
      console.error('Error adding trainer:', error);
      Alert.alert('Error', 'Something went wrong while adding the trainer');
    }
  };
  

  const handleDeleteTrainer = async (trainerEmail) => {
    try {
      const response = await fetch(`http://192.168.151.94:4545/trainers/${trainerEmail}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert('Success', 'Trainer deleted successfully');
        fetchTrainers();
      } else {
        const data = await response.json();
        console.error('Error deleting trainer:', data.message);
        Alert.alert('Error', 'Could not delete trainer');
      }
    } catch (error) {
      console.error('Error deleting trainer:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#D7FF3E" />
      </TouchableOpacity>

      <Text style={styles.heading}>Manage Trainers</Text>

      {/* List of Trainers */}
      <FlatList
        data={trainers}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <View style={styles.trainerCard}>
            <View style={styles.trainerInfo}>
              <Text style={styles.trainerText}>Name: {item.name}</Text>
              <Text style={styles.trainerText}>Email: {item.email}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTrainer(item.email)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Add Trainer Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add Trainer</Text>
      </TouchableOpacity>

      {/* Modal to Add Trainer */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
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

            <TouchableOpacity style={styles.submitButton} onPress={handleAddTrainer}>
              <Text style={styles.submitButtonText}>Add Trainer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 30,
    color: '#D7FF3E',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  trainerCard: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  trainerInfo: {
    flex: 1,
  },
  trainerText: {
    color: '#fff',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#D7FF3E',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#D7FF3E',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 30,
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#D7FF3E',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#D7FF3E',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ManageTrainer;
