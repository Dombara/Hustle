import React from 'react';
import { View, TextInput as RNTextInput, Text, StyleSheet } from 'react-native';

const TextInput = ({ label, mode, value, onChangeText, secureTextEntry, keyboardType, style }) => {
  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={[styles.input, mode === 'outlined' && styles.outlined]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#C5FF00', // Neon-like green color for the label
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  outlined: {
    borderColor: '#3A3471', // Deep purple border for outlined input
  },
});

export default TextInput;
