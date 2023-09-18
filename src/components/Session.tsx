import React from 'react';
import { Animated, Dimensions, ScrollView, View } from 'react-native';
import AnimatedText from './AnimatedText';
import AnimatedLine from './AnimatedLine';

import { WHITE, LIGHT_BLACK, DARK_BLACK, GRAY } from '../data/constants';
import styles from '../styles';

const { width, height } = Dimensions.get('window');

enum Mode {
  dark = 'dark',
  light = 'light',
}

type RxType = {
  sets?: number | string;
  reps: number | string;
  perc?: number;
};

type LiftType = {
  name: string;
  notes: string;
  rxs: RxType[];
};

type SessionProps = {
  week: number | string;
  day: number | string;
  notes: string;
  lifts: LiftType[];
  index: number;
  scrollX: Animated.Value;
  mode: Mode;
};

export default function Session({
  week,
  day,
  notes,
  lifts,
  scrollX,
  index: sessionIndex,
  mode,
}: SessionProps) {
  const PRIMARY_TEXT = mode === Mode.light ? LIGHT_BLACK : WHITE;
  const SECONDARY_TEXT = mode === Mode.light ? GRAY : GRAY;

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
  const translateXWeek: Animated.AnimatedInterpolation<number> =
    scrollX.interpolate({
      inputRange,
      outputRange: [width * 0.1, 0, -width * 0.1],
    });
  const translateXDay: Animated.AnimatedInterpolation<number> =
    scrollX.interpolate({
      inputRange,
      outputRange: [width, 0, -width],
    });
  const translateXNotes: Animated.AnimatedInterpolation<number> = translateXDay;
  const translateXLine: Animated.AnimatedInterpolation<number> = translateXDay;

  return (
    <ScrollView contentContainerStyle={[styles.sessionContainer, { width }]}>
      <View style={styles.textContainer}>
        <AnimatedText
          text={`Week ${week}`}
          style={[styles.week, { color: PRIMARY_TEXT }]}
          opacity={opacity}
          translateX={translateXWeek}
        />
        <AnimatedText
          text={`Day ${day}`}
          style={[styles.day, { width: width * 0.75, color: SECONDARY_TEXT }]}
          opacity={opacity}
          translateX={translateXDay}
        />
        <AnimatedLine
          style={[styles.line, { width: width * 0.8 }]}
          opacity={opacity}
          translateX={translateXLine}
        />

        <View style={styles.liftContainer}>
          {lifts.map(({ name, notes, rxs }, liftIndex) => {
            return (
              <View
                style={[
                  styles.liftSubContainer,
                  { paddingBottom: liftIndex === lifts.length - 1 ? 0 : 50 },
                ]}
                key={liftIndex}
              >
                <AnimatedText
                  text={name}
                  style={[styles.lift, { color: PRIMARY_TEXT }]}
                  opacity={opacity}
                  translateX={translateXWeek}
                />
                <View style={[styles.rxContainer]}>
                  {rxs.map(({ sets, reps, perc }, rxIndex) => {
                    const rxText = perc
                      ? `${perc * 100}% x ${sets} x ${reps}`
                      : `${sets} x ${reps}`;

                    return (
                      <AnimatedText
                        key={rxIndex}
                        text={rxText}
                        style={[
                          styles.rx,
                          { width: width * 0.75, color: SECONDARY_TEXT },
                        ]}
                        opacity={opacity}
                        translateX={translateXDay}
                      />
                    );
                  })}
                </View>

                <View style={styles.notesContainer}>
                  {notes
                    .split('.')
                    .filter(note => note)
                    .map((note, noteIndex) => {
                      return (
                        <View key={noteIndex} style={styles.subNotesContainer}>
                          <AnimatedText
                            text={'•'}
                            style={[styles.bullet, { color: SECONDARY_TEXT }]}
                            opacity={opacity}
                            translateX={translateXNotes}
                          />

                          <AnimatedText
                            text={note.trim()}
                            style={[
                              styles.note,
                              { width: width * 0.75, color: SECONDARY_TEXT },
                            ]}
                            opacity={opacity}
                            translateX={translateXNotes}
                          />
                        </View>
                      );
                    })}
                </View>
              </View>
            );
          })}
        </View>

        <AnimatedLine
          style={[styles.line, { backgroundColor: GRAY }]}
          opacity={opacity}
          translateX={translateXLine}
        />

        <AnimatedText
          text={notes}
          style={styles.day}
          opacity={opacity}
          translateX={translateXNotes}
        />
      </View>
    </ScrollView>
  );
}
