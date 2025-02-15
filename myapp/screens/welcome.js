//WELCOME madhe ha code ghaal


import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    // Start the fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1, // Animate to opacity: 1
      duration: 5000, // Duration of animation
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [fadeAnim]);

  const handleSubmit = async () => {
    navigation.navigate('welcome2');
  };

  return (
    <TouchableOpacity style={styles.touchable} onPress={handleSubmit}>
      <ImageBackground 
        source={require('../assets/images/hp1.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover" // Ensure the image covers the whole area
      >
        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>WELCOME TO HUSTLE</Text>
        </Animated.View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1, // Ensures the background covers the entire screen
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    width: '100%', // Full width of the screen
    height: '100%', // Full height of the screen
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: '#D7FF3E', // Bright green color
    fontWeight: 'bold',
  },
});

export default HomeScreen;