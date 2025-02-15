import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const HomePage2 = () => {
  const navigation = useNavigation();

  const handleOptionPress = (option) => {
    switch (option) {
      case 'login_admin':
      case 'login_trainer':
      case 'login_member':
      case 'schemes':
        navigation.navigate(option);
        break;
    }
  };

  return (
    <ImageBackground source={require('../assets/images/hp2.jpg')} style={styles.container} resizeMode="cover">
      <View style={styles.contentContainer}>
        <Text style={styles.title}>WHO ARE YOU?</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleOptionPress('login_admin')}>
          <Text style={styles.option}>ADMIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOptionPress('login_trainer')}>
          <Text style={styles.option}>TRAINER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOptionPress('login_member')}>
          <Text style={styles.option}>MEMBER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOptionPress('schemes')}>
          <Text style={styles.option}>NON-MEMBER</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
    borderRadius: 10,
    width: width * 0.9, // 90% of screen width
  },
  title: {
    fontSize: width > 600 ? 36 : 28, // Adjust font size based on screen width
    color: '#D7FF3E',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for buttons
    borderRadius: 5,
    paddingVertical: height * 0.02, // Vertical padding based on screen height
    paddingHorizontal: width * 0.25, // Horizontal padding based on screen width
    alignItems: 'center',
    marginVertical: 10,
  },
  option: {
    fontSize: width > 600 ? 24 : 20, // Adjust text size based on screen width
    color: '#D7FF3E',
  },
});

export default HomePage2;
