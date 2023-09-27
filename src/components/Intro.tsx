import React from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import TextBlock from './TextBlock';
import { Colors } from '../types';

const { width, height } = Dimensions.get('window');

type IntroProps = {
  index: number;
  name: string;
  notes: string[];
  page: number;
  scrollX: Animated.Value;
};

export default function Intro({
  index: sessionIndex, // always 0
  name,
  notes,
  scrollX,
}: IntroProps) {
  const PRIMARY_COLOR = Colors.WHITE;
  const SECONDARY_COLOR = Colors.LIGHT_GRAY;

  const inputRange = [
    (sessionIndex - 1) * width,
    sessionIndex * width,
    (sessionIndex + 1) * width,
  ];

  const opacityInputRange = [
    (sessionIndex - 0.5) * width,
    sessionIndex * width,
    (sessionIndex + 0.5) * width,
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
    <View style={{ height, width, padding: 0, margin: 0 }}>
      <ScrollView contentContainerStyle={[styles.container, { width }]}>
        <View style={styles.header}>
          <TextBlock
            text={name}
            style={[
              styles.headerText,
              { width: width * 0.75, color: PRIMARY_COLOR },
            ]}
            opacity={opacity}
            translateX={translateSlow}
          />
        </View>

        {notes
          .filter(note => note)
          .map((note, noteIndex) => (
            <TextBlock
              key={noteIndex}
              text={note.trim()}
              style={[
                styles.note,
                { width: width * 0.85, color: SECONDARY_COLOR },
              ]}
              opacity={opacity}
              translateX={translateFast}
            />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Archivo Black',
  },
  note: {
    fontWeight: '600',
    textAlign: 'justify',
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
