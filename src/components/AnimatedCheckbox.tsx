import React from 'react';
import {
  TouchableHighlight,
  Animated,
  StyleProp,
  TextStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

type AnimatedCheckboxProps = {
  onPress: () => void;
  isChecked: boolean;
  style: StyleProp<TextStyle>;
  opacity: Animated.AnimatedInterpolation<number>;
  translateX: Animated.AnimatedInterpolation<number>;
  color: string;
  checks: boolean[];
  sessionIndex: number;
};

export default function AnimatedCheckbox({
  onPress,
  isChecked,
  style,
  opacity,
  translateX,
  color,
}: AnimatedCheckboxProps) {
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
