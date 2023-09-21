import React from 'react';
import {
  TouchableHighlight,
  Animated,
  StyleProp,
  TextStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

type AnimatedCheckboxProps = {
  isChecked: boolean;
  opacity: Animated.AnimatedInterpolation<number>;
  translateX: Animated.AnimatedInterpolation<number>;
  style: StyleProp<TextStyle>;
  color: string;
  onPress: () => void;
};

export default function AnimatedCheckbox({
  isChecked,
  opacity,
  translateX,
  style,
  color,
  onPress,
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
