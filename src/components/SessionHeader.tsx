import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { Theme, Option } from '../types';
import { getColor } from '../utils';
import Checkbox from './Checkbox';

type SessionHeaderProps = {
  index: number;
  day: number;
  weekOption: Option;
  weekOptions: Option[];
  handleCheck: () => void;
  highlightColor: string;
  complete: boolean;
  opacity: Animated.AnimatedInterpolation<number>;
  translateFast: Animated.AnimatedInterpolation<number>;
  translateSlow: Animated.AnimatedInterpolation<number>;
  setWeekOption: (week: Option) => void;
  dayOptions: Option[];
  dayOption: Option;
  setDayOption: (day: Option) => void;
};

export default function SessionHeader({
  handleCheck,
  highlightColor,
  complete,
  opacity,
  translateFast,
  translateSlow,
  setWeekOption,
  weekOption,
  weekOptions,
  dayOptions,
  dayOption,
  setDayOption,
}: SessionHeaderProps) {
  const TEXT_4 = getColor(Theme.TEXT_4);
  const TEXT_5 = getColor(Theme.TEXT_5);

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
            value={weekOption}
            onChange={(val: Option) => setWeekOption(val)}
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
          complete={complete}
          handleCheck={handleCheck}
          color={TEXT_4}
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
          value={dayOption}
          onChange={(val: Option) => setDayOption(val)}
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
