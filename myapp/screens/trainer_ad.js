import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the back icon

// Importing images from assets folder
import trainer1Image from '../assets/images/trainer1.jpg'; // Replace with actual path
import trainer2Image from '../assets/images/trainer2.jpg'; // Replace with actual path
import trainer3Image from '../assets/images/trainer3.jpg'; // Replace with actual path

const trainers = [
  {
    id: '1',
    name: 'John Doe',
    description: 'Expert in weight training and bodybuilding with 10 years of experience.',
    image: trainer1Image,
  },
  {
    id: '2',
    name: 'Alex Johnson',
    description: 'Certified yoga instructor with a focus on flexibility and balance.',
    image: trainer2Image,
  },
  {
    id: '3',
    name: 'Jennifer Smith',
    description: 'Professional crossfit coach with expertise in endurance and strength.',
    image: trainer3Image,
  },
];

const TrainerCard = ({ trainer }) => {
  return (
    <View style={styles.card}>
      <Image source={trainer.image} style={styles.trainerImage} />
      <Text style={styles.trainerName}>{trainer.name}</Text>
      <Text style={styles.trainerDescription}>{trainer.description}</Text>
    </View>
  );
};

const TrainerSlider = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#D1E231" />
      </TouchableOpacity>

      {/* Heading */}
      <Text style={styles.heading}>Our Specialized Trainers</Text>

      <FlatList
        data={trainers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TrainerCard trainer={item} />}
        showsVerticalScrollIndicator={false}
      />

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('register')}
      >
        <Text style={styles.nextButtonText}>Let's get started.</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  heading: {
    fontSize: width > 600 ? 36 : 28, // Adjust font size based on screen width
    color: '#D1E231',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 60, // Adjust top margin to give space below the back button
  },
  card: {
    width: width * 0.9,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trainerImage: {
    width: width * 0.8,
    height: width * 0.8 * (4 / 3), // Maintain a 4:3 aspect ratio
    borderRadius: 20,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  trainerName: {
    fontSize: width > 600 ? 28 : 22,
    color: '#FFF',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  trainerDescription: {
    fontSize: width > 600 ? 22 : 18,
    color: '#DDD',
    textAlign: 'center',
  },
  nextButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#D1E231',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default TrainerSlider;
