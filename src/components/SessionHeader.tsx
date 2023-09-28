import React, { useState } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Day, Theme, Option } from '../types';
import { getColor } from '../utils';
import Checkbox from './Checkbox';

type SessionHeaderProps = {
  complete: boolean;
  day: number;
  dayOptions: number[];
  handleComplete: () => void;
  highlightBG: string;
  highlightColor: string;
  index: number;
  onDayChange: (dayOption: number) => void;
  onWeekChange: (weekOption: number) => void;
  opacity: Animated.AnimatedInterpolation<number>;
  translateFast: Animated.AnimatedInterpolation<number>;
  translateSlow: Animated.AnimatedInterpolation<number>;
  week: number;
  weekOptions: number[];
};

export default function SessionHeader({
  complete,
  day,
  dayOptions,
  handleComplete,
  highlightBG,
  highlightColor,
  onDayChange,
  onWeekChange,
  opacity,
  translateFast,
  translateSlow,
  week,
  weekOptions,
}: SessionHeaderProps) {
  const BG_1 = getColor(Theme.BG_1);
  const TEXT_4 = getColor(Theme.TEXT_4);

  const weekText = `Week ${weekOptions[week - 1]}`;

  const dayText =
    day === 1 ? Day.monday : day === 2 ? Day.wednesday : Day.friday;

  const [showWeekPicker, setShowWeekPicker] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(false);

  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor: highlightBG, opacity: 0.85 },
      ]}
    >
      {!showDayPicker && (
        <Animated.View
          style={[
            styles.headerTopRow,
            { opacity, transform: [{ translateX: translateSlow }] },
          ]}
        >
          <View style={styles.selectContainer}>
            <TouchableOpacity
              onPress={() => {
                setShowDayPicker(false);
                setShowWeekPicker(p => !p);
              }}
            >
              <Text style={[styles.week, { color: highlightColor }]}>
                {weekText}
              </Text>
            </TouchableOpacity>
          </View>
          <Checkbox
            color={TEXT_4}
            complete={complete}
            handleComplete={handleComplete}
          />
        </Animated.View>
      )}

      {!showWeekPicker && (
        <Animated.View
          style={[
            styles.headerBottomRow,
            { opacity, transform: [{ translateX: translateFast }] },
          ]}
        >
          {!showWeekPicker && (
            <TouchableOpacity
              onPress={() => {
                setShowWeekPicker(false);
                setShowDayPicker(p => !p);
              }}
            >
              <Text style={[styles.day, { color: highlightColor }]}>
                {dayText}
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      )}

      {showWeekPicker && (
        <Picker
          itemStyle={{ fontSize: 20, color: TEXT_4 }}
          style={{
            borderRadius: 3,
            // backgroundColor: BG_1,
          }}
          selectedValue={String(week)}
          onValueChange={(value: string) => {
            onWeekChange(Number(value));
            setShowWeekPicker(false);
          }}
        >
          {weekOptions.map((week: number, index: number) => {
            return (
              <Picker.Item
                key={String(week) + index}
                label={`Week ${week}`}
                value={week}
              />
            );
          })}
        </Picker>
      )}

      {showDayPicker && (
        <Picker
          itemStyle={{ fontSize: 20, color: TEXT_4 }}
          style={{
            borderRadius: 3,
            // backgroundColor: BG_1,
          }}
          selectedValue={String(day)}
          onValueChange={(value: string) => {
            onDayChange(Number(value));
            setShowDayPicker(false);
          }}
        >
          {dayOptions.map((day: number, index: number) => {
            return (
              <Picker.Item
                key={String(day) + index}
                label={
                  day === 1
                    ? Day.monday
                    : day === 2
                    ? Day.wednesday
                    : Day.friday
                }
                value={day}
              />
            );
          })}
        </Picker>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 15,
    borderRadius: 3,
    fontFamily: 'Archivo Black',
    justifyContent: 'space-evenly',
    gap: 20,
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
  selectContainer: {
    width: '75%',
  },
});
