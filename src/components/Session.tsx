import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import AnimatedText from './AnimatedText';
import AnimatedLine from './AnimatedLine';
import { WHITE, LIGHT_BLACK, LIGHT_GRAY, DARK_GRAY } from '../constants';
import { Mode, MaxesType, LiftType } from '../types';
import { roundTo } from '../utils';

const { width } = Dimensions.get('window');

type SessionProps = {
  page: number;
  date: [number, number];
  notes: string[];
  lifts: LiftType[];
  index: number;
  scrollX: Animated.Value;
  mode: Mode;
  maxes: MaxesType;
};

export default function Session({
  page,
  date,
  notes,
  lifts,
  scrollX,
  index: sessionIndex,
  mode,
  maxes,
}: SessionProps) {
  const _width = width * 0.85;

  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const scrollViewRef = useRef<ScrollView | null>(null);

  const [week, day] = date;
  const PRIMARY_TEXT = mode === Mode.light ? LIGHT_BLACK : WHITE;
  const SECONDARY_TEXT = mode === Mode.light ? DARK_GRAY : LIGHT_GRAY;

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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setScrollPosition(scrollPosition);
  };

  useEffect(() => {
    if (scrollPosition > 0) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      console.log('paging...:', { page, scrollPosition });
    }
  }, [page]);

  return (
    <ScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      contentContainerStyle={[styles.container, { width }]}
    >
      <View style={[styles.content, { width: _width }]}>
        {/* HEADER */}
        <View style={[styles.headerContainer]}>
          <AnimatedText
            text={`Week ${week}`}
            style={[styles.week, { color: PRIMARY_TEXT }]}
            opacity={opacity}
            translateX={translateSlow}
          />
          <AnimatedText
            text={`Day ${day}`}
            style={[styles.day, { color: SECONDARY_TEXT }]}
            opacity={opacity}
            translateX={translateFast}
          />
        </View>

        <AnimatedLine
          style={[
            styles.line,
            { width: width * 0.8, backgroundColor: LIGHT_GRAY },
          ]}
          opacity={opacity}
          translateX={translateFast}
        />

        <View style={[styles.liftsContainer]}>
          {lifts.map(({ name, notes: liftNotes, rxs }, liftIndex) => {
            return (
              <View
                style={[
                  styles.liftSubContainer,
                  { paddingBottom: liftIndex === lifts.length - 1 ? 10 : 50 },
                ]}
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
                        style={[styles.rx, { color: SECONDARY_TEXT }]}
                        opacity={opacity}
                        translateX={translateFast}
                      />
                    );
                  })}
                </View>

                {liftNotes
                  .filter(note => note)
                  .map((note, noteIndex) => {
                    return (
                      <View key={noteIndex} style={[styles.liftNoteContainer]}>
                        <AnimatedText
                          text={'•'}
                          style={[styles.bullet, { color: SECONDARY_TEXT }]}
                          opacity={opacity}
                          translateX={translateFast}
                        />

                        <AnimatedText
                          text={note.trim()}
                          style={[styles.liftNote, { color: SECONDARY_TEXT }]}
                          opacity={opacity}
                          translateX={translateFast}
                        />
                      </View>
                    );
                  })}
              </View>
            );
          })}
        </View>

        <AnimatedLine
          style={[
            styles.line,
            { width: width * 0.8, backgroundColor: LIGHT_GRAY },
          ]}
          opacity={opacity}
          translateX={translateSlow}
        />

        <View style={[styles.notesContainer]}>
          {notes
            .filter(note => note)
            .map((note, noteIndex) => {
              return (
                <View key={noteIndex} style={[styles.noteContainer]}>
                  <AnimatedText
                    text={note.trim()}
                    style={[styles.note, { color: SECONDARY_TEXT }]}
                    opacity={opacity}
                    translateX={translateFast}
                  />
                </View>
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bullet: {
    fontWeight: '600',
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    width: 10,
    textAlign: 'center',
  },
  container: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {},
  day: {
    fontWeight: '600',
    textAlign: 'left',
    marginRight: 10,
    fontSize: 20,
    lineHeight: 16 * 1.5,
  },
  headerContainer: {
    //
  },
  lift: {
    textTransform: 'uppercase',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 10,
  },
  liftsContainer: {
    // paddingHorizontal: 20,
  },
  liftSubContainer: {
    // paddingHorizontal: 20,
  },
  line: {
    height: 1,
    marginVertical: 30,
  },
  notesContainer: {
    //
  },
  liftNote: {
    fontWeight: '600',
    textAlign: 'left',
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    marginLeft: -6,
  },
  note: {
    fontWeight: '600',
    textAlign: 'justify',
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    marginLeft: -6,
  },
  rx: {
    fontWeight: '600',
    textAlign: 'left',
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  rxContainer: {
    paddingBottom: 10,
  },
  noteContainer: {
    paddingBottom: 10,
    paddingHorizontal: 8,
  },
  liftNoteContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  week: {
    textTransform: 'uppercase',
    textAlign: 'left',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 10,
  },
});
