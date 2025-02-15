import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const SuccessScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SUCCESS!</Text>
      <Image style={styles.trophy} source={require('../assets/images/trophy.png')} />
      <Text style={styles.congrats}>Congratulations!</Text>
      <Text style={styles.congrats}>Welcome To Hustle Family.</Text>
      <View style={styles.button}>
        <Button title="GET STARTED" fontweight="bold" color="#E2F163" onPress={() => alert('Getting Started')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#141414' },
  title: { color: '#d4ff00', fontSize: 24, marginBottom: 30 },
  trophy: { width: 100, height: 100, marginBottom: 20 }, // You need to import a trophy image
  congrats: { color: '#fff', fontSize: 18, textAlign: 'center', marginVertical: 20 },
  button: { marginTop: 20, width: '10%' }
});

export default SuccessScreen;
