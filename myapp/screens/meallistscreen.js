import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure to install and link react-native-vector-icons

const MealListScreen = () => {
  const [meals, setMeals] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const navigation = useNavigation(); // Get navigation object

  // Fetch the user email from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        if (email) {
          console.log("User email found:", email); // Debugging log
          setUserEmail(email); // Set the email in the state
        } else {
          console.log("No user email found in AsyncStorage");
          Alert.alert('Error', 'No user email found');
        }
      } catch (error) {
        console.error('Error fetching user email from AsyncStorage:', error);
      }
    };

    fetchUserEmail(); // Fetch the email as soon as the component mounts
  }, []);

  // Fetch meals when userEmail is available
  useEffect(() => {
    const fetchMeals = async () => {
      if (!userEmail) {
        console.log("No userEmail yet, skipping meal fetch."); // Avoid making API call without valid email
        return;
      }

      try {
        console.log("Fetching meals for userEmail:", userEmail); // Debugging log
        const response = await fetch(`http://192.168.151.94:4545/meals/${encodeURIComponent(userEmail)}`); // Changed to use path parameter
        const data = await response.json();

        if (response.ok) {
          console.log("Meals data fetched:", data); // Debugging log
          setMeals(data); // Set meals in state
        } else {
          console.error('Error fetching meals:', data.message);
          Alert.alert('Error', data.message);
        }
      } catch (error) {
        console.error('Error fetching meals:', error);
        Alert.alert('Error', 'Failed to fetch meals');
      }
    };

    if (userEmail) {
      fetchMeals(); // Only fetch meals if userEmail is available
    }
  }, [userEmail]);

  // Function to render each meal item
  const renderMealItem = ({ item }) => (
    <View style={styles.mealCard}>
      <Text style={styles.mealTitle}>{item.name}</Text>
      <Text style={styles.mealDescription}>{item.description}</Text>
      <Text style={styles.mealCalories}>Calories: {item.calories}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#D7FF3E" />
      </TouchableOpacity>

      <Text style={styles.heading}> Meals For Today</Text>

      {meals.length > 0 ? (
        <FlatList
          data={meals}
          keyExtractor={(item) => item._id}
          renderItem={renderMealItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noMealsText}>No meals available</Text>
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
  mealCard: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  mealTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mealDescription: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },
  mealCalories: {
    color: '#D7FF3E',
    fontSize: 16,
  },
  noMealsText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default MealListScreen;
