import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TextBlock from './TextBlock';
import { Maxes, Program, Lift, Theme, Option } from '../types';
import { roundTo, getColor, findIncrement } from '../utils';
import SessionHeader from './SessionHeader';
const { width } = Dimensions.get('window');

type SessionProps = {
  program: Program;
  index: number;
  week: number;
  day: number;
  notes: string[];
  lifts: Lift[];
  page: number;
  scrollX: Animated.Value;
  highlightColor: string;
  handleCheck: () => void;
  weekOptions: Option[];
  weekOption: Option;
  setWeekOption: (week: Option) => void;
  dayOptions: Option[];
  dayOption: Option;
  setDayOption: (day: Option) => void;
  complete: boolean;
};

function Session({
  index,
  day,
  notes,
  lifts,
  page,
  scrollX,
  highlightColor,
  handleCheck,
  weekOptions,
  weekOption,
  setWeekOption,
  dayOptions,
  dayOption,
  setDayOption,
  program,
  complete,
}: SessionProps) {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const maxes: Maxes = program.maxes;

  const _width = width * 0.85;
  const BG_2 = getColor(Theme.BG_2);
  const TEXT_2 = getColor(Theme.TEXT_2);
  const TEXT_3 = getColor(Theme.TEXT_3);

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const opacityInputRange = [
    (index - 0.4) * width,
    index * width,
    (index + 0.4) * width,
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
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
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
        <SessionHeader
          index={index}
          setWeekOption={setWeekOption}
          weekOptions={weekOptions}
          weekOption={weekOption}
          day={day}
          complete={complete}
          highlightColor={highlightColor}
          handleCheck={handleCheck}
          opacity={opacity}
          translateFast={translateFast}
          translateSlow={translateSlow}
          dayOptions={dayOptions}
          dayOption={dayOption}
          setDayOption={setDayOption}
        />

        <View style={[styles.liftsContainer]}>
          {lifts.map(({ name, notes: liftNotes, rxs }, liftIndex) => {
            return (
              <View
                style={[styles.liftContainer, { backgroundColor: BG_2 }]}
                key={liftIndex}
              >
                <TextBlock
                  text={name}
                  style={[styles.liftName, { color: TEXT_2 }]}
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
                    const repsText =
                      reps === 'AMRAP' ? '' : reps == 1 ? 'rep' : 'reps';
                    const rounded = findIncrement(name);
                    const rxText =
                      max && perc
                        ? `${sets} ${setsText} x ${reps} ${repsText} @ ${roundTo(
                            max * perc,
                            rounded
                          )} lbs`
                        : perc
                        ? `${sets} ${setsText} x ${reps} ${repsText} @ ${
                            perc * 100
                          }%`
                        : `${sets} ${setsText} x ${reps} ${repsText}`;

                    return (
                      <TextBlock
                        key={rxIndex}
                        text={rxText}
                        style={[styles.rx, { color: TEXT_2 }]}
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
                        <TextBlock
                          text={'•'}
                          style={[styles.bullet, { color: TEXT_3 }]}
                          opacity={opacity}
                          translateX={translateFast}
                        />

                        <TextBlock
                          text={note.replace(/\.$/, '').trim()}
                          style={[styles.liftNote, { color: TEXT_3 }]}
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

        {!!notes.filter(note => note).length && (
          <View
            style={[styles.sessionNotesContainer, { backgroundColor: BG_2 }]}
          >
            <Text style={[styles.sessionNoteHeader, { color: TEXT_2 }]}>
              Session Notes
            </Text>
            {notes
              .filter(note => note)
              .map((note, noteIndex) => {
                return (
                  <View key={noteIndex} style={[styles.sessionNoteContainer]}>
                    <TextBlock
                      text={note.trim()}
                      style={[styles.sessionNote, { color: TEXT_3 }]}
                      opacity={opacity}
                      translateX={translateFast}
                    />
                  </View>
                );
              })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    gap: 20,
  },
  liftsContainer: {
    gap: 20,
  },
  liftContainer: {
    padding: 15,
    borderRadius: 5,
  },
  liftName: {
    textTransform: 'uppercase',
    textAlign: 'left',
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Archivo Black',
  },
  rxContainer: {
    paddingBottom: 10,
  },
  rx: {
    textAlign: 'left',
    marginRight: 10,
    fontSize: 18,
    lineHeight: 16 * 1.5,
  },
  bullet: {
    fontWeight: '600',
    marginRight: 10,
    fontSize: 16,
    lineHeight: 24,
    width: 10,
    textAlign: 'center',
  },
  liftNoteContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  liftNote: {
    fontWeight: '600',
    textAlign: 'left',
    marginRight: 10,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: -6,
  },
  line: {
    height: 1,
    marginVertical: 30,
  },
  sessionNotesContainer: {
    padding: 15,
    borderRadius: 5,
  },
  sessionNoteHeader: {
    textTransform: 'uppercase',
    textAlign: 'left',
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Archivo Black',
  },
  sessionNoteContainer: {
    paddingBottom: 10,
    paddingHorizontal: 8,
  },
  sessionNote: {
    fontWeight: '600',
    textAlign: 'justify',
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    marginLeft: -6,
  },
});

export default Session;
