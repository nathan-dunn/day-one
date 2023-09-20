import React from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import AnimatedText from './AnimatedText';
import { Mode } from '../types';
import { WHITE, LIGHT_BLACK, LIGHT_GRAY, DARK_GRAY } from '../constants';

const { width } = Dimensions.get('window');

type IntroProps = {
  name: string;
  notes: string[];
  mode: Mode;
  scrollX: Animated.Value;
};

export default function Intro({ name, notes, mode, scrollX }: IntroProps) {
  const PRIMARY_TEXT = mode === Mode.light ? LIGHT_BLACK : WHITE;
  const SECONDARY_TEXT = mode === Mode.light ? DARK_GRAY : LIGHT_GRAY;
  const sessionIndex = 0;

  const inputRange = [
    (sessionIndex - 1) * width,
    sessionIndex * width,
    (sessionIndex + 1) * width,
  ];

  const opacityInputRange = [
    (sessionIndex - 0.4) * width,
    sessionIndex * width,
    (sessionIndex + 0.4) * width,
  ];

  const opacity: Animated.AnimatedInterpolation<number> = scrollX.interpolate({
    inputRange: opacityInputRange,
    outputRange: [0, 1, 0],
  });

  const translateSlow: Animated.AnimatedInterpolation<number> =
    scrollX.interpolate({
      inputRange,
      outputRange: [width * 0.1, 0, -width * 0.1],
    });

  const translateFast: Animated.AnimatedInterpolation<number> =
    scrollX.interpolate({
      inputRange,
      outputRange: [width, 0, -width],
    });

  return (
    <ScrollView contentContainerStyle={[styles.container, { width }]}>
      <View style={styles.header}>
        <AnimatedText
          text={name}
          style={[
            styles.headerText,
            { width: width * 0.75, color: PRIMARY_TEXT },
          ]}
          opacity={opacity}
          translateX={translateSlow}
        />
      </View>

      {notes
        .filter(note => note)
        .map((note, noteIndex) => (
          <AnimatedText
            key={noteIndex}
            text={note.trim()}
            style={[
              styles.note,
              { width: width * 0.75, color: SECONDARY_TEXT },
            ]}
            opacity={opacity}
            translateX={translateFast}
          />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  note: {
    fontWeight: '600',
    textAlign: 'left',
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    paddingBottom: 20,
  },
  bullet: {
    fontWeight: '600',
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    width: 10,
    textAlign: 'center',
  },
});
