import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Use for dropdowns
import { useNavigation } from 'expo-router';
import config from './config';

const Register2 = ({ route }) => {
  const { mail } = route.params; // Correct access to route params
  const navigation = useNavigation();
  const [gender, setGender] = useState('M'); // Default selection for gender
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('');
  const [physicalLevel, setPhysicalLevel] = useState('');
  const [plan, setPlan] = useState('');
  const [trainers, setTrainers] = useState([]); // State to store list of trainers
  const [selectedTrainer, setSelectedTrainer] = useState(''); // Selected trainer

  // Fetch available trainers from API
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch('http://192.168.151.94:4545/trainers');  
        const data = await response.json();
        setTrainers(data);  
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };

    fetchTrainers();
  }, []);

  const handleSubmit = async () => {
    if (!mail || !gender || !weight || !height || !goal || !physicalLevel || !plan || !selectedTrainer) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
  
    try {
      // First, save the user details
      const userDetailsResponse = await fetch('http://192.168.151.94:4545/add-user-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mail,
          gender,
          weight,
          height,
          goal,
          physicalLevel,
          plan,
          trainer: selectedTrainer,
        }),
      });
  
      if (!userDetailsResponse.ok) {
        Alert.alert('Error', 'Failed to register user details');
        return;
      }
  
      // Second, map the user to the selected trainer
      const mappingResponse = await fetch('http://192.168.151.94:4545/add-user-trainer-mapping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: mail,
          trainerEmail: selectedTrainer,
        }),
      });
  
      if (mappingResponse.ok) {
        Alert.alert('Success', 'User registered successfully!');
        navigation.navigate('login_member');
      } else {
        Alert.alert('Error', 'Failed to map user to trainer');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>LETS GET PERSONAL!</Text>

      <View style={styles.formContainer}>
        {/* Gender selection */}
        <View style={styles.genderContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[styles.radioButton, gender === 'M' && styles.selectedButton]}
              onPress={() => setGender('M')}
            >
              <Text style={styles.radioText}>M</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, gender === 'F' && styles.selectedButton]}
              onPress={() => setGender('F')}
            >
              <Text style={styles.radioText}>F</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, gender === 'O' && styles.selectedButton]}
              onPress={() => setGender('O')}
            >
              <Text style={styles.radioText}>O</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weight Input */}
        <TextInput
          style={styles.input}
          placeholder="Weight (in KG)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />

        {/* Height Input */}
        <TextInput
          style={styles.input}
          placeholder="Height (in CM)"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

        {/* Goal Dropdown */}
        <Picker
          selectedValue={goal}
          onValueChange={(itemValue) => setGoal(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Goal" value="" />
          <Picker.Item label="Lose Weight" value="lose_weight" />
          <Picker.Item label="Build Muscle" value="build_muscle" />
          <Picker.Item label="Maintain Weight" value="maintain_weight" />
        </Picker>

        {/* Physical Level Dropdown */}
        <Picker
          selectedValue={physicalLevel}
          onValueChange={(itemValue) => setPhysicalLevel(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Physical Level" />
          <Picker.Item label="Beginner" value="beginner" />
          <Picker.Item label="Intermediate" value="intermediate" />
          <Picker.Item label="Advanced" value="advanced" />
        </Picker>

        {/* Plan Dropdown */}
        <Picker
          selectedValue={plan}
          onValueChange={(itemValue) => setPlan(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Plan"  />
          <Picker.Item label="Plan A" value="plan_a" />
          <Picker.Item label="Plan B" value="plan_b" />
          <Picker.Item label="Plan C" value="plan_c" />
        </Picker>

        {/* Trainer Dropdown */}
        <Picker
  selectedValue={selectedTrainer}
  onValueChange={(itemValue) => setSelectedTrainer(itemValue)}
  style={styles.picker}
>
  <Picker.Item label="Select Trainer"  />
  {trainers.map((trainer) => (
    <Picker.Item key={trainer.email} label={trainer.name} value={trainer.email} />
  ))}
</Picker>


        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
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
  heading: {
    fontSize: 24,
    color: '#D7FF3E',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#222',
    borderRadius: 15,
    padding: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#D7FF3E',
  },
  radioText: {
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    color: '#000',
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  submitButton: {
    backgroundColor: '#D7FF3E',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Register2;