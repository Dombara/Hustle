import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PackagesScreen = () => {
  const navigation = useNavigation();

  // Handle "Next" button press
  const handleNextPress = () => {
    navigation.navigate('trainer_ad'); 
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Our Gym Membership Packages</Text>

        {/* Weekly Package */}
        <View style={styles.packageCard}>
          {/* Weekly Icon */}
          <Image source={require('../assets/images/weekly.png')} style={styles.icon} />
          <Text style={styles.packageTitle}>Weekly Package</Text>
          <Text style={styles.packagePrice}>500/- per week</Text>
          <Text style={styles.packageDescription}>
            Perfect for beginners! Get access to all gym equipment and one group fitness class of your choice.
          </Text>
        </View>

        {/* Monthly Package */}
        <View style={styles.packageCard}>
          {/* Monthly Icon */}
          <Image source={require('../assets/images/monthly.png')} style={styles.icon} />
          <Text style={styles.packageTitle}>Monthly Package</Text>
          <Text style={styles.packagePrice}>1500/- per month</Text>
          <Text style={styles.packageDescription}>
            Enjoy full access to the gym, unlimited group fitness classes, and one personal training session.
          </Text>
        </View>

        {/* Annual Package */}
        <View style={styles.packageCard}>
          {/* Annual Icon */}
          <Image source={require('../assets/images/yearly.png')} style={styles.icon} />
          <Text style={styles.packageTitle}>Annual Package</Text>
          <Text style={styles.packagePrice}>9999/- per year</Text>
          <Text style={styles.packageDescription}>
             Includes unlimited gym access, all group classes, monthly personal training, and diet consultation.
          </Text>
        </View>
      </ScrollView>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    color: '#D7FF3E',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  packageCard: {
    backgroundColor: '#222',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    //width: '100',
    //height:'100',
    alignItems: 'center', // Center the content of the card
  },
  packageTitle: {
    fontSize: 25,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Align text to center
  },
  packagePrice: {
    fontSize: 20,
    color: '#D7FF3E',
    marginBottom: 20,
    textAlign: 'center', // Align text to center
  },
  packageDescription: {
    fontSize: 20,
    color: '#FFF',
    lineHeight: 22,
    textAlign: 'center', // Align text to center
  },
  icon: {
    width: 80,  // Set the width of the icon
    height: 80, // Set the height of the icon
    marginBottom: 15, // Add some space between the icon and the text
  },
  nextButton: {
   // backgroundColor: '#D7FF3E',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 15,
    position:'relative',
    bottom: 35, // Positioning the button at the bottom
    alignSelf: 'center', // Center the button horizontally
  },
  nextButtonText: {
    color: '#D7FF3E',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PackagesScreen;