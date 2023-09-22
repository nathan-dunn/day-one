import React from 'react';
import { Animated, StyleProp, TextStyle } from 'react-native';

type TextBlockBlock = {
  text: string;
  style: StyleProp<TextStyle>;
  opacity: Animated.AnimatedInterpolation<number>;
  translateX: Animated.AnimatedInterpolation<number>;
};

export default function TextBlock({
  text,
  style,
  opacity,
  translateX,
}: TextBlockBlock) {
  return (
    <Animated.Text style={[style, { opacity, transform: [{ translateX }] }]}>
      {text}
    </Animated.Text>
  );
}
