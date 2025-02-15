import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure to install and link react-native-vector-icons

const WorkoutListScreen = () => {
  const [workouts, setWorkouts] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const navigation = useNavigation(); // Get navigation object

  // Fetch the user's email from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        if (email) {
          console.log("User email found:", email);
          setUserEmail(email);
        } else {
          console.log("No user email found in AsyncStorage");
          Alert.alert('Error', 'No user email found');
        }
      } catch (error) {
        console.error('Error fetching user email from AsyncStorage:', error);
      }
    };

    fetchUserEmail();
  }, []);

  // Fetch workouts when userEmail is available
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!userEmail) {
        console.log("No userEmail yet, skipping workout fetch.");
        return;
      }

      try {
        console.log("Fetching workouts for userEmail:", userEmail);
        const response = await fetch(`http://192.168.151.94:4545/workouts/${encodeURIComponent(userEmail)}`);
        const data = await response.json();

        if (response.ok) {
          console.log("Workouts data fetched:", data);
          setWorkouts(data);
        } else {
          console.error('Error fetching workouts:', data.message);
          Alert.alert('Error', data.message);
        }
      } catch (error) {
        console.error('Error fetching workouts:', error);
        Alert.alert('Error', 'Failed to fetch workouts');
      }
    };

    if (userEmail) {
      fetchWorkouts();
    }
  }, [userEmail]);

  // Function to render each workout item
  const renderWorkoutItem = ({ item }) => (
    <View style={styles.workoutCard}>
      <Text style={styles.workoutTitle}>{item.name}</Text>
      <Text style={styles.workoutDescription}>{item.description}</Text>
      <Text style={styles.workoutDuration}>Duration: {item.duration} mins</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#D7FF3E" />
      </TouchableOpacity>

      <Text style={styles.heading}>Workouts For This Week</Text>

      {workouts.length > 0 ? (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item._id}
          renderItem={renderWorkoutItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noWorkoutsText}>No workouts available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 27,
    color: '#D7FF3E',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  workoutCard: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  workoutTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  workoutDescription: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  workoutDuration: {
    color: '#D7FF3E',
    fontSize: 16,
  },
  noWorkoutsText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default WorkoutListScreen;
