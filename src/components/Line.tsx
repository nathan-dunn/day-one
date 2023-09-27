import React from 'react';
import { Animated, StyleProp, TextStyle } from 'react-native';

type AnimatedLineProps = {
  style: StyleProp<TextStyle>;
  opacity: Animated.AnimatedInterpolation<number>;
  translateX: Animated.AnimatedInterpolation<number>;
};

export default function AnimatedLine({
  style,
  opacity,
  translateX,
}: AnimatedLineProps) {
  return (
    <Animated.View style={[style, { opacity, transform: [{ translateX }] }]} />
  );
}
