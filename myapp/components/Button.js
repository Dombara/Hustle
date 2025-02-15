import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ mode, onPress, children, style, labelStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, mode === 'contained' && styles.contained]}
      onPress={onPress}
    >
      <Text style={[styles.text, labelStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contained: {
    backgroundColor: '#C5FF00', // Neon color for 'contained' button
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
