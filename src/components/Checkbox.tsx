import React from 'react';
import {
  TouchableHighlight,
  Animated,
  StyleProp,
  TextStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

type CheckboxProps = {
  handleCheck: () => void;
  complete: boolean;
  style: StyleProp<TextStyle>;
  opacity: Animated.AnimatedInterpolation<number>;
  translateX: Animated.AnimatedInterpolation<number>;
  color: string;
};

export default function Checkbox({
  handleCheck,
  complete,
  style,
  opacity,
  translateX,
  color,
}: CheckboxProps) {
  return (
    <Animated.View style={[style, { opacity, transform: [{ translateX }] }]}>
      <TouchableHighlight onPress={handleCheck} underlayColor="transparent">
        <Feather
          name={complete ? 'check-circle' : 'circle'}
          size={30}
          color={color}
        />
      </TouchableHighlight>
    </Animated.View>
  );
}
