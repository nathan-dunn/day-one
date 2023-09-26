import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import TextBlock from './TextBlock';
import { Day, Theme } from '../types';
import { getColor } from '../utils';
import Checkbox from './Checkbox';

type SessionHeaderProps = {
  index: number;
  day: number;
  week: number;
  handleCheck: () => void;
  highlightColor: string;
  isChecked: boolean;
  opacity: Animated.AnimatedInterpolation<number>;
  translateFast: Animated.AnimatedInterpolation<number>;
  translateSlow: Animated.AnimatedInterpolation<number>;
};

export default function SessionHeader({
  handleCheck,
  highlightColor,
  isChecked,
  opacity,
  translateFast,
  translateSlow,
  day,
  week,
}: SessionHeaderProps) {
  const TEXT_4 = getColor(Theme.TEXT_4);

  const dayText: Day | null =
    day === 1
      ? Day.monday
      : day === 2
      ? Day.wednesday
      : day === 3
      ? Day.friday
      : null;

  return (
    <View style={[styles.headerContainer, { backgroundColor: highlightColor }]}>
      <View style={[styles.headerSubContainer]}>
        <TextBlock
          style={[styles.week, { color: TEXT_4 }]}
          text={`Week ${week}`}
          opacity={opacity}
          translateX={translateSlow}
        />
        <Checkbox
          style={[styles.checkbox, { color: TEXT_4 }]}
          isChecked={isChecked}
          onPress={handleCheck}
          opacity={opacity}
          translateX={translateSlow}
          color={TEXT_4}
        />
      </View>
      <TextBlock
        style={[styles.day, { color: TEXT_4 }]}
        text={dayText || `Day ${day}`}
        opacity={opacity}
        translateX={translateFast}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 15,
    borderRadius: 5,
    fontFamily: 'Archivo Black',
  },
  headerSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  week: {
    textTransform: 'uppercase',
    textAlign: 'left',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 10,
  },
  day: {
    fontWeight: '600',
    marginRight: 10,
    fontSize: 20,
    lineHeight: 16 * 1.5,
  },
  checkbox: {
    //
  },
});
