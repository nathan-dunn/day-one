import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { Day, Theme, Option } from '../types';
import { getColor } from '../utils';
import Checkbox from './Checkbox';

type SessionHeaderProps = {
  complete: boolean;
  day: number;
  dayOptions: Option[];
  handleComplete: () => void;
  highlightColor: string;
  index: number;
  onDayChange: (dayOption: Option) => void;
  onWeekChange: (weekOption: Option) => void;
  opacity: Animated.AnimatedInterpolation<number>;
  translateFast: Animated.AnimatedInterpolation<number>;
  translateSlow: Animated.AnimatedInterpolation<number>;
  week: number;
  weekOptions: Option[];
};

export default function SessionHeader({
  complete,
  day,
  dayOptions,
  handleComplete,
  highlightColor,
  onDayChange,
  onWeekChange,
  opacity,
  translateFast,
  translateSlow,
  week,
  weekOptions,
}: SessionHeaderProps) {
  const TEXT_4 = getColor(Theme.TEXT_4);
  const TEXT_5 = getColor(Theme.TEXT_5);

  const dayText =
    day === 1 ? Day.monday : day === 2 ? Day.wednesday : Day.friday;

  return (
    <View style={[styles.headerContainer, { backgroundColor: highlightColor }]}>
      <Animated.View
        style={[
          styles.headerTopRow,
          { opacity, transform: [{ translateX: translateSlow }] },
        ]}
      >
        <View style={styles.selectContainer}>
          <SelectBox
            label=""
            options={weekOptions}
            value={{ id: week, item: `Week ${week}` }}
            onChange={onWeekChange}
            hideInputFilter
            arrowIconColor={'transparent'}
            labelStyle={{ height: 0 }}
            containerStyle={{ ...styles.week, paddingBottom: 10 }}
            selectedItemStyle={{ ...styles.week, color: TEXT_4 }}
            optionContainerStyle={{
              paddingLeft: 5,
              borderBottomWidth: 1,
              borderBottomColor: TEXT_4,
            }}
            optionsLabelStyle={{ color: TEXT_5 }}
          />
        </View>
        <Checkbox
          color={TEXT_4}
          complete={complete}
          handleComplete={handleComplete}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.headerBottomRow,
          { opacity, transform: [{ translateX: translateFast }] },
        ]}
      >
        <SelectBox
          label=""
          options={dayOptions}
          value={{ id: day, item: dayText }}
          onChange={onDayChange}
          hideInputFilter
          arrowIconColor={'transparent'}
          labelStyle={{ height: 0 }}
          containerStyle={{ ...styles.day, paddingBottom: 10 }}
          selectedItemStyle={{ ...styles.day, color: TEXT_4 }}
          optionContainerStyle={{
            paddingLeft: 5,
            borderBottomWidth: 1,
            borderBottomColor: TEXT_4,
          }}
          optionsLabelStyle={{ color: TEXT_5 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 15,
    borderRadius: 5,
    fontFamily: 'Archivo Black',
    justifyContent: 'space-evenly',
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  week: {
    textTransform: 'uppercase',
    textAlign: 'left',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,

    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingTop: 0,
    paddingLeft: 0,
  },
  day: {
    fontWeight: '600',
    marginRight: 10,
    fontSize: 20,
    lineHeight: 16 * 1.5,

    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
  },
  checkbox: {
    //
  },
  selectContainer: {
    width: '75%',
  },
});
