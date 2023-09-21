import React from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { WHITE, LIGHT_BLACK } from '../constants';
import { Mode } from '../types';

type CheckboxProps = {
  onPress: () => void;
  isChecked: boolean;
  mode: Mode;
};

export default function Checkbox({ onPress, isChecked, mode }: CheckboxProps) {
  const COLOR = mode === Mode.light ? LIGHT_BLACK : WHITE;

  return (
    <View style={[styles.container]}>
      <TouchableHighlight onPress={onPress}>
        <Feather
          name={isChecked ? 'check-circle' : 'circle'}
          size={30}
          color={COLOR}
        />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
