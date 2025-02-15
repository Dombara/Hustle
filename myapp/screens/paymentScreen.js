import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import { useNavigation } from 'expo-router';

const PaymentScreen = () => {


  const navigation=useNavigation();

  const handleSubmit = async  () => {
    navigation.navigate('successScreen');
  }










  return (
    <View style={styles.container}>
      <Text style={styles.title}>PAYMENT</Text>
      <View style={styles.cardContainer}>
        <TextInput style={styles.input} placeholder="Card number" keyboardType="numeric" />
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.halfInput]} placeholder="MM / YY" keyboardType="numeric" />
          <TextInput style={[styles.input, styles.halfInput]} placeholder="CVV" keyboardType="numeric" />
        </View>
        <TextInput style={styles.input} placeholder="Country" />
        <TextInput style={styles.input} placeholder="Postal code" keyboardType="numeric" />
      </View>
      <View style={styles.button}>
        <Button title="Pay" color="#d4ff00" borderRadius="50" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#141414' },
  title: { color: '#d4ff00', fontSize: 24, marginBottom: 30 },
  cardContainer: { backgroundColor: '#5b49a0', padding: 20, borderRadius: 20, width: '80%' },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginVertical: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { width: '40%' },
  button: { marginTop: 20, width: '20%' }
});

export default PaymentScreen;
