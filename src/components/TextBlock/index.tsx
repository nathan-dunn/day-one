import React from 'react';
import { Animated, StyleProp, TextStyle } from 'react-native';

type TextBlockBlock = {
  text: string;
  style: StyleProp<TextStyle>;
};

export default function TextBlock({ text, style }: TextBlockBlock) {
  return <Animated.Text style={[style]}>{text}</Animated.Text>;
}
