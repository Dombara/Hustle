import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import profileIcon from '../assets/images/man.png';
import dietIcon from '../assets/images/meals.png';
import exerciseIcon from '../assets/images/workout.png';
import gif1 from '../assets/images/e1.gif';
import gif2 from '../assets/images/e2.gif';
import gif3 from '../assets/images/e3.gif';
import gif4 from '../assets/images/e4.gif';
import gif5 from '../assets/images/e5.gif';
import gif6 from '../assets/images/e6.gif';
import gif7 from '../assets/images/e7.gif';
import gif8 from '../assets/images/e8.gif';
import gif9 from '../assets/images/e9.gif';
import gif10 from '../assets/images/e10.gif';

const gifs = [gif1, gif2, gif3, gif4, gif5, gif6, gif7, gif8, gif9, gif10];

const ExerciseTrackingScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const flatListRef = useRef(null);
  const index = useRef(0);
  const totalGifs = gifs.length;

  useEffect(() => {
    const intervalId = setInterval(() => {
      index.current = (index.current + 1) % totalGifs;
      flatListRef.current.scrollToIndex({
        index: index.current,
        animated: true,
      });
    }, 4000);

    return () => clearInterval(intervalId);
  }, [flatListRef]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'login_member' }],
      });
    } catch (error) {
      console.error('Error clearing token:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const ExerciseCard = ({ exercise }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <Text style={styles.setsText}>{exercise.sets.toString()}</Text>
    </TouchableOpacity>
  );

  const renderGifItem = ({ item }) => (
    <View style={styles.gifContainer}>
      <Image source={item} style={styles.gifImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hi, Member</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => navigation.navigate('member_profile')}>
            <Image source={profileIcon} style={styles.profileIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={gifs}
        renderItem={renderGifItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={Dimensions.get('window').width}
      />

      <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => navigation.navigate('meal-list')}>
          <Image source={dietIcon} style={styles.menuIcon} />
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={() => navigation.navigate('workout-list')}>
          <Image source={exerciseIcon} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ExerciseCard exercise={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.exerciseList}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.6,
    marginBottom: 10,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#D7FF3E',
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  logoutText: {
    fontSize: 20,
    color: '#D7FF3E',
    marginLeft: 15,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuIcon: {
    width: 70,
    height: 70,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#D7FF3E',
    marginHorizontal: 20,
  },
  exerciseList: {
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
    width: width * 0.9,
  },
  exerciseName: {
    fontSize: 16,
    color: '#D7FF3E',
    fontWeight: 'bold',
  },
  setsText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  gifContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gifImage: {
    width: width * 0.9,
    height: 200,
  },
});

export default ExerciseTrackingScreen;
