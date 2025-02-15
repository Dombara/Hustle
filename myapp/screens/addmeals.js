import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the Icon

const ManageMeals = () => {
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [mealTime, setMealTime] = useState({ hours: '12', minutes: '00' });
  const [isModalVisible, setModalVisible] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigation = useNavigation(); // Access the navigation prop

  // Fetch email from Async Storage
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        if (email) {
          setUserEmail(email);
          console.log(email);
        }
      } catch (error) {
        console.error('Failed to fetch email from Async Storage', error);
      }
    };

    fetchEmail();
  }, []);

  const handleAddMeal = () => {
    if (!mealName) {
      Alert.alert('Error', 'Please enter a meal name');
      return;
    }
    if (!calories || isNaN(calories) || Number(calories) < 0) {
      Alert.alert('Error', 'Please enter valid calories');
      return;
    }

    const formattedTime = new Date();
    formattedTime.setHours(mealTime.hours);
    formattedTime.setMinutes(mealTime.minutes);

    const newMeal = {
      name: mealName,
      calories: Number(calories),
      intakeTime: formattedTime.toISOString(),
      userEmail,
    };

    setMeals([...meals, newMeal]);
    setMealName('');
    setCalories('');
    setMealTime({ hours: '12', minutes: '00' });
    setModalVisible(false);
  };

  const handleSubmitAllMeals = async () => {
    if (meals.length === 0) {
      Alert.alert('Error', 'No meals to submit');
      return;
    }

    try {
      for (const meal of meals) {
        const response = await fetch('http://192.168.151.94:4545/add-meal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(meal),
        });

        if (!response.ok) {
          throw new Error('Failed to submit meal');
        }
      }

      Alert.alert('Success', 'All meals have been submitted!');
      setMeals([]);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while submitting meals');
      console.error(error);
    }
  };

  const MealCard = ({ meal }) => (
    <View style={styles.mealCard}>
      <Text style={styles.mealText}>{meal.name}</Text>
      <Text style={styles.timeText}>Time: {new Date(meal.intakeTime).toLocaleTimeString()}</Text>
      <Text style={styles.caloriesText}>Calories: {meal.calories}</Text>
    </View>
  );

  const updateTime = (type, value) => {
    let maxLimit = type === 'hours' ? 23 : 59;
    if (value > maxLimit) value = maxLimit;
    if (value < 0) value = 0;

    setMealTime(prevState => ({
      ...prevState,
      [type]: value.toString().padStart(2, '0')
    }));
  };

  return (
    <View style={styles.container}>
      {/* Back Button with Icon */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#D7FF3E" />
      </TouchableOpacity>

      <Text style={styles.heading}>Manage Meals</Text>

      <FlatList
        data={meals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <MealCard meal={item} />}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add Meal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.submitAllButton}
        onPress={handleSubmitAllMeals}
      >
        <Text style={styles.submitAllButtonText}>Submit All Meals</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Meal Name"
              value={mealName}
              onChangeText={setMealName}
            />

            <TextInput
              style={styles.input}
              placeholder="Calories"
              value={calories}
              keyboardType="numeric"
              onChangeText={setCalories}
            />

            <View style={styles.digitalClockContainer}>
              <TextInput
                style={styles.clockInput}
                value={mealTime.hours}
                keyboardType="numeric"
                onChangeText={(value) => updateTime('hours', parseInt(value))}
                maxLength={2}
              />
              <Text style={styles.colon}>:</Text>
              <TextInput
                style={styles.clockInput}
                value={mealTime.minutes}
                keyboardType="numeric"
                onChangeText={(value) => updateTime('minutes', parseInt(value))}
                maxLength={2}
              />
            </View>
            <Text style={styles.timeLabel}>Selected Time: {mealTime.hours}:{mealTime.minutes}</Text>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddMeal}
            >
              <Text style={styles.submitButtonText}>Add Meal</Text>
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
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  heading: {
    color: '#D7FF3E',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  mealCard: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  mealText: {
    fontSize: 30,
    color:'#fff'
  },
  timeText: {
    fontSize: 20,
    color: '#fff',
  },
  caloriesText: {
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
  digitalClockContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  clockInput: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    fontSize: 24,
    textAlign: 'center',
    width: 60,
  },
  colon: {
    fontSize: 24,
    paddingHorizontal: 5,
  },
  timeLabel: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
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

export default ManageMeals;
