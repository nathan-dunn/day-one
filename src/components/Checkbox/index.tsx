import React from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type CheckboxProps = {
  color: string;
  complete: boolean;
  handleComplete: () => void;
};

export default function Checkbox({
  color,
  complete,
  handleComplete,
}: CheckboxProps) {
  return (
    <View style={[styles.checkbox]}>
      <TouchableHighlight
        onPress={handleComplete}
        underlayColor="transparent"
        testID="checkbox-touchable"
      >
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
