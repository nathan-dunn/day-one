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
  TouchableHighlight,
} from 'react-native';
import TextBlock from '../TextBlock';
import { Maxes, Lift } from '../../types';
import { roundTo, findIncrement } from '../../utils';
import SessionHeader from '../SessionHeader';

const { width } = Dimensions.get('window');
const _width = width * 0.85;

type SessionProps = {
  BG_1: string;
  BG_2: string;
  complete: boolean;
  day: number;
  dayOptions: number[];
  index: number;
  lifts: Lift[];
  maxes: Maxes;
  notes: string[];
  onComplete: (index: number) => void;
  onDayChange: (day: number) => void;
  onshowNotesChange: (showNotes: boolean) => void;
  onWeekChange: (week: number) => void;
  page: number;
  scrollX: Animated.Value;
  showDayName: boolean;
  showNotes: boolean;
  TEXT_1: string;
  TEXT_2: string;
  week: number;
  weekOptions: number[];
};

export default function Session({
  BG_1,
  BG_2,
  complete,
  day,
  dayOptions,
  index,
  lifts,
  maxes,
  notes,
  onComplete,
  onDayChange,
  onshowNotesChange,
  onWeekChange,
  page,
  scrollX,
  showDayName,
  showNotes,
  TEXT_1,
  TEXT_2,
  week,
  weekOptions,
}: SessionProps) {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

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

  const fastStyle = {
    color: TEXT_1,
    opacity,
    transform: [{ translateX: translateFast }],
  };

  const slowStyle = {
    color: TEXT_1,
    opacity,
    transform: [{ translateX: translateSlow }],
  };

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
      <TouchableHighlight
        onLongPress={() => {
          onshowNotesChange(!showNotes);
        }}
        underlayColor="transparent"
      >
        <View style={[styles.content, { width: _width }]}>
          {/* HEADER */}
          <SessionHeader
            complete={complete}
            day={day}
            dayOptions={dayOptions}
            onComplete={onComplete}
            BG_1={BG_1}
            BG_2={BG_2}
            TEXT_1={TEXT_1}
            TEXT_2={TEXT_2}
            index={index}
            onDayChange={onDayChange}
            onWeekChange={onWeekChange}
            opacity={opacity}
            translateFast={translateFast}
            translateSlow={translateSlow}
            week={week}
            weekOptions={weekOptions}
            showDayName={showDayName}
          />

          <View style={[styles.liftsContainer]}>
            {lifts.map(({ name, notes: liftNotes, rxs }, liftIndex) => {
              return (
                <View
                  style={[styles.liftContainer, { backgroundColor: BG_2 }]}
                  key={liftIndex}
                >
                  <TextBlock text={name} style={[styles.liftName, slowStyle]} />
                  <View style={[styles.rxContainer]}>
                    {rxs.map(({ sets, reps, perc, test }, rxIndex) => {
                      const max: number = maxes[name.toUpperCase()];
                      const setsText =
                        (typeof sets === 'number' && sets > 1) ||
                        typeof sets === 'string'
                          ? 'sets'
                          : 'set';
                      const repsText =
                        reps === 'AMRAP' ? '' : reps == 1 ? 'rep' : 'reps';
                      const rounded = findIncrement(name);
                      let rxText =
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

                      if (test) {
                        rxText = 'Work up to a new 1-rep max';
                      }

                      return (
                        <TextBlock
                          key={rxIndex}
                          text={rxText}
                          style={[styles.rx, fastStyle]}
                        />
                      );
                    })}
                  </View>

                  {showNotes &&
                    liftNotes.map((note, noteIndex) => {
                      return (
                        <View
                          key={noteIndex}
                          style={[styles.liftNoteContainer]}
                        >
                          <TextBlock
                            text={'•'}
                            style={[styles.bullet, fastStyle]}
                          />

                          <TextBlock
                            text={note.replace(/\.$/, '').trim()}
                            style={[styles.liftNote, fastStyle]}
                          />
                        </View>
                      );
                    })}
                </View>
              );
            })}
          </View>

          {showNotes && !!notes.length && (
            <View
              style={[styles.sessionNotesContainer, { backgroundColor: BG_2 }]}
            >
              <Text style={[styles.sessionNoteHeader, { color: TEXT_1 }]}>
                Session Notes
              </Text>
              {notes.map((note, noteIndex) => {
                return (
                  <View key={noteIndex} style={[styles.sessionNoteContainer]}>
                    <TextBlock
                      text={note.trim()}
                      style={[
                        styles.sessionNote,
                        {
                          color: TEXT_1,
                          opacity,
                          transform: [{ translateX: translateFast }],
                        },
                      ]}
                    />
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </TouchableHighlight>
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
    borderRadius: 3,
    gap: 10,
    opacity: 0.95,
  },
  liftName: {
    textTransform: 'uppercase',
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Archivo Black',
  },
  rxContainer: {
    //
  },
  rx: {
    textAlign: 'left',
    marginRight: 10,
    fontSize: 18,
    lineHeight: 16 * 1.5,
    fontWeight: '600',
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
    fontWeight: '400',
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
    borderRadius: 3,
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
    fontWeight: '300',
    textAlign: 'justify',
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    marginLeft: -6,
  },
});
