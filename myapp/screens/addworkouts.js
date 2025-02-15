import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing the icon
import config from './config';

const ManageWorkouts = ({ navigation }) => { // Add navigation prop
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState('Push-Up');
  const [reps, setReps] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Fetch email from Async Storage
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        if (email) {
          setUserEmail(email);
        }
      } catch (error) {
        console.error('Failed to fetch email from Async Storage', error);
      }
    };

    fetchEmail();
  }, []);

  const workoutOptions = [
    'Push-Up',
    'Squat',
    'Lunge',
    'Plank',
    'Burpee',
    'Jumping Jack',
  ];

  const handleAddWorkout = () => {
    if (!reps || isNaN(reps) || Number(reps) < 1) {
      Alert.alert('Error', 'Please enter valid repetitions');
      return;
    }

    setWorkouts([...workouts, { name: selectedWorkout, reps: Number(reps), userEmail, date }]);
    setSelectedWorkout('Push-Up');
    setReps('');
    setModalVisible(false);
  };

  const handleSubmitAll = async () => {
    if (workouts.length === 0) {
      Alert.alert('Error', 'Please add at least one workout before submitting');
      return;
    }

    try {
      for (const workout of workouts) {
        const response = await fetch('http://192.168.151.94:4545/add-workout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(workout),
        });

        if (!response.ok) {
          throw new Error('Failed to submit workout');
        }
      }

      Alert.alert('Success', 'All workouts have been submitted!');
      setWorkouts([]);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while submitting workouts');
      console.error(error);
    }
  };

  const WorkoutCard = ({ workout }) => (
    <View style={styles.workoutCard}>
      <Text style={styles.workoutText}>{workout.name}</Text>
      <Text style={styles.repsText}>Reps: {workout.reps}</Text>
      <Text style={styles.dateText}>Date: {workout.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color="#D7FF3E" />
        </TouchableOpacity>
        <Text style={styles.heading}>Manage Workouts</Text>
      </View>

      <FlatList
        data={workouts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <WorkoutCard workout={item} />}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitAllButton} onPress={handleSubmitAll}>
        <Text style={styles.submitAllButtonText}>Submit All Workouts</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={selectedWorkout}
              onValueChange={(itemValue) => setSelectedWorkout(itemValue)}
              style={styles.picker}
            >
              {workoutOptions.map((workout) => (
                <Picker.Item key={workout} label={workout} value={workout} />
              ))}
            </Picker>

            <TextInput
              style={styles.input}
              placeholder="Reps"
              value={reps}
              keyboardType="numeric"
              onChangeText={setReps}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleAddWorkout}>
              <Text style={styles.submitButtonText}>Add Workout</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    color: '#D7FF3E',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
    textAlign: 'center',
  },
  workoutCard: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  workoutText: {
    color: '#fff',
    fontSize: 30,
  },
  repsText: {
    fontSize: 20,
    color: '#fff',
  },
  dateText: {
    fontSize: 20,
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#D7FF3E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitAllButton: {
    backgroundColor: '#D7FF3E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitAllButtonText: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#D7FF3E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#D7FF3E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ManageWorkouts;
