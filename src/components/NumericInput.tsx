import React from 'react';
import { StyleSheet, TextInput, StyleProp, TextStyle } from 'react-native';

type NumericInputProps = {
  onChange: (number: number) => void;
  value?: number;
  style: StyleProp<TextStyle>;
};
export default function NumericInput({
  onChange,
  value,
  style,
}: NumericInputProps) {
  console.log('>>> value:', value);
  const handleTextChange = (text: string) => {
    // Convert the text to a number and pass it to the onChange function
    const numericValue = parseFloat(text); // or parseInt(text, 10) for integer values
    if (!isNaN(numericValue)) {
      // Check if it's a valid number
      onChange(numericValue);
    }
  };

  return (
    <TextInput
      style={style}
      onChangeText={handleTextChange}
      value={value ? value.toString() : undefined} // Convert number back to string for display
      placeholder="useless placeholder"
      keyboardType="numeric"
    />
  );
}
