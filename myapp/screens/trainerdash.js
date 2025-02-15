import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TrainerDashboard = ({ route }) => {
  const { userEmail } = route.params;
  const navigation = useNavigation();

  const handleManageMeals = async () => {
    try {
      await AsyncStorage.setItem('userEmail', userEmail); // Store user email in AsyncStorage
      navigation.navigate('add-meals', { userEmail });
    } catch (error) {
      console.error('Failed to save email in AsyncStorage', error);
    }
  };                                                                          

  const handleManageWorkouts = () => {
    navigation.navigate('add-workouts', { userEmail });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Trainer Dashboard</Text>
      <TouchableOpacity style={styles.button} onPress={handleManageMeals}>
        <Text style={styles.buttonText}>Manage Meals</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleManageWorkouts}>
        <Text style={styles.buttonText}>Manage Workouts</Text>
      </TouchableOpacity>
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
  heading: {
    fontSize: 24,
    color: '#D7FF3E',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#D7FF3E',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#222',
    fontSize: 18,
  },
});

export default TrainerDashboard;
