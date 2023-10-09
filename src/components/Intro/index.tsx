import React from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import TextBlock from '../TextBlock';

const { width } = Dimensions.get('window');

type IntroProps = {
  index: number;
  name: string;
  notes: string[];
  page: number;
  scrollX: Animated.Value;
  BG_1: string;
  BG_2: string;
  TEXT_1: string;
  TEXT_2: string;
};

export default function Intro({
  index: sessionIndex, // always 0
  name,
  notes,
  scrollX,
  TEXT_1,
}: IntroProps) {
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
    <ScrollView contentContainerStyle={[styles.container, { width }]}>
      <View style={styles.header}>
        <TextBlock
          text={name}
          style={[
            styles.headerText,
            {
              width: width * 0.75,
              color: TEXT_1,
              opacity,
              transform: [{ translateX: translateSlow }],
            },
          ]}
        />
      </View>

      <View style={styles.notesContainer}>
        {notes
          .filter(note => note)
          .map((note, noteIndex) => (
            <TextBlock
              key={noteIndex}
              text={note.trim()}
              style={[
                styles.note,
                {
                  width: width * 0.85,
                  color: TEXT_1,
                  opacity,
                  transform: [{ translateX: translateFast }],
                  // backgroundColor: BG_2,
                },
              ]}
            />
          ))}
      </View>
    </ScrollView>
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
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Archivo Black',
  },
  notesContainer: {},
  note: {
    fontWeight: '300',
    // textAlign: 'justify',
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    borderRadius: 5,
    padding: 16,
  },
});
