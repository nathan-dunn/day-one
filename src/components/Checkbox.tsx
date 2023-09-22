import React from 'react';
import {
  TouchableHighlight,
  Animated,
  StyleProp,
  TextStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

type CheckboxProps = {
  onPress: () => void;
  isChecked: boolean;
  style: StyleProp<TextStyle>;
  opacity: Animated.AnimatedInterpolation<number>;
  translateX: Animated.AnimatedInterpolation<number>;
  color: string;
};

export default function Checkbox({
  onPress,
  isChecked,
  style,
  opacity,
  translateX,
  color,
}: CheckboxProps) {
  return (
    <Animated.View style={[style, { opacity, transform: [{ translateX }] }]}>
      <TouchableHighlight onPress={onPress} underlayColor="transparent">
        <Feather
          name={isChecked ? 'check-circle' : 'circle'}
          size={30}
          color={color}
        />
      </TouchableHighlight>
    </Animated.View>
  );
}
