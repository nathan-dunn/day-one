import React from 'react';
import { Animated, StyleProp, TextStyle } from 'react-native';

type AnimatedTextProps = {
  text: string;
  style: StyleProp<TextStyle>;
  opacity: Animated.AnimatedInterpolation<number>;
  translateX: Animated.AnimatedInterpolation<number>;
};

export default function AnimatedText({
  text,
  style,
  opacity,
  translateX,
}: AnimatedTextProps) {
  return (
    <Animated.Text style={[style, { opacity, transform: [{ translateX }] }]}>
      {text}
    </Animated.Text>
  );
}