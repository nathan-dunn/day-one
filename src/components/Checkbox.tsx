import React from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type CheckboxProps = {
  color: string;
  complete: boolean;
  handleCheck: () => void;
};

export default function Checkbox({
  color,
  complete,
  handleCheck,
}: CheckboxProps) {
  return (
    <View style={[styles.checkbox]}>
      <TouchableHighlight onPress={handleCheck} underlayColor="transparent">
        <Feather
          name={complete ? 'check-circle' : 'circle'}
          size={30}
          color={color}
        />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  checkbox: {},
});
