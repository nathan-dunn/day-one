import React from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import AnimatedText from './AnimatedText';
import AnimatedLine from './AnimatedLine';
import { WHITE, LIGHT_BLACK, GRAY } from '../constants';
import { roundTo } from '../utils';
import styles from '../styles';

const { width } = Dimensions.get('window');

type MaxesType = {
  [key: string]: number;
};

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
  notes: string[];
  rxs: RxType[];
};

type SessionProps = {
  date: [number, number];
  notes: string[];
  lifts: LiftType[];
  index: number;
  scrollX: Animated.Value;
  mode: Mode;
  handleLongPress: () => void;
  maxes: MaxesType;
};

export default function Session({
  date,
  notes,
  lifts,
  scrollX,
  index: sessionIndex,
  mode,
  handleLongPress,
  maxes,
}: SessionProps) {
  const [week, day] = date;
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

  const translateSlow: Animated.AnimatedInterpolation<number> =
    scrollX.interpolate({
      inputRange,
      outputRange: [width * 0.1, 0, -width * 0.1],
    });

  const trasnlateFast: Animated.AnimatedInterpolation<number> =
    scrollX.interpolate({
      inputRange,
      outputRange: [width, 0, -width],
    });

  return (
    <ScrollView contentContainerStyle={[styles.sessionContainer, { width }]}>
      <View style={styles.textContainer}>
        <TouchableOpacity onLongPress={handleLongPress}>
          <AnimatedText
            text={`Week ${week}`}
            style={[styles.week, { color: PRIMARY_TEXT }]}
            opacity={opacity}
            translateX={translateSlow}
          />
        </TouchableOpacity>
        <AnimatedText
          text={`Day ${day}`}
          style={[styles.day, { width: width * 0.75, color: SECONDARY_TEXT }]}
          opacity={opacity}
          translateX={trasnlateFast}
        />
        <AnimatedLine
          style={[styles.line, { width: width * 0.8, backgroundColor: GRAY }]}
          opacity={opacity}
          translateX={trasnlateFast}
        />

        <View style={styles.liftContainer}>
          {lifts.map(({ name, notes, rxs }, liftIndex) => {
            return (
              <View
                style={[styles.liftSubContainer, { paddingBottom: 50 }]}
                key={liftIndex}
              >
                <AnimatedText
                  text={name}
                  style={[styles.lift, { color: PRIMARY_TEXT }]}
                  opacity={opacity}
                  translateX={translateSlow}
                />
                <View style={[styles.rxContainer]}>
                  {rxs.map(({ sets, reps, perc }, rxIndex) => {
                    const max: number = maxes[name];
                    const setsText =
                      (typeof sets === 'number' && sets > 1) ||
                      typeof sets === 'string'
                        ? 'sets'
                        : 'set';
                    const repsText = reps === 'AMRAP' ? '' : 'reps';

                    const rxText =
                      max && perc
                        ? `${sets} ${setsText} x ${reps} ${repsText} @ ${roundTo(
                            max * perc,
                            5
                          )} lbs`
                        : perc
                        ? `${sets} ${setsText} x ${reps} ${repsText} @ ${
                            perc * 100
                          }%`
                        : `${sets} ${setsText} x ${reps} ${repsText}`;

                    return (
                      <AnimatedText
                        key={rxIndex}
                        text={rxText}
                        style={[
                          styles.rx,
                          { width: width * 0.75, color: SECONDARY_TEXT },
                        ]}
                        opacity={opacity}
                        translateX={trasnlateFast}
                      />
                    );
                  })}
                </View>

                <View style={styles.notesContainer}>
                  {notes.map((note, noteIndex) => {
                    return (
                      <View key={noteIndex} style={styles.subNotesContainer}>
                        <AnimatedText
                          text={'•'}
                          style={[styles.bullet, { color: SECONDARY_TEXT }]}
                          opacity={opacity}
                          translateX={trasnlateFast}
                        />

                        <AnimatedText
                          text={note.trim()}
                          style={[
                            styles.note,
                            { width: width * 0.75, color: SECONDARY_TEXT },
                          ]}
                          opacity={opacity}
                          translateX={trasnlateFast}
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
          style={[styles.line, { width: width * 0.8, backgroundColor: GRAY }]}
          opacity={opacity}
          translateX={translateSlow}
        />

        <View style={styles.notesContainer}>
          {notes.map((note, noteIndex) => {
            return (
              <View key={noteIndex} style={styles.sessionNotesContainer}>
                <AnimatedText
                  text={note.trim()}
                  style={[
                    styles.note,
                    { width: width * 0.75, color: SECONDARY_TEXT },
                  ]}
                  opacity={opacity}
                  translateX={trasnlateFast}
                />
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
