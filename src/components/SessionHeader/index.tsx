import React, { useState } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Day } from '../../types';
import Checkbox from '../Checkbox';

type SessionHeaderProps = {
  index: number;
  complete: boolean;
  day: number;
  dayOptions: number[];
  onComplete: (index: number) => void;
  BG_1: string;
  BG_2: string;
  TEXT_1: string;
  TEXT_2: string;
  onDayChange: (dayOption: number) => void;
  onWeekChange: (weekOption: number) => void;
  opacity: Animated.AnimatedInterpolation<number>;
  translateFast: Animated.AnimatedInterpolation<number>;
  translateSlow: Animated.AnimatedInterpolation<number>;
  week: number;
  weekOptions: number[];
  showDayName: boolean;
};

export default function SessionHeader({
  index,
  complete,
  day,
  dayOptions,
  onComplete,
  BG_1,
  BG_2,
  TEXT_1,
  TEXT_2,
  onDayChange,
  onWeekChange,
  opacity,
  translateFast,
  translateSlow,
  week,
  weekOptions,
  showDayName,
}: SessionHeaderProps) {
  const weekText = `Week ${weekOptions[week - 1]}`;

  let dayText = `Day ${day}`;
  if (showDayName) {
    if (day === 1) {
      dayText = Day.monday;
    } else if (day === 2) {
      dayText = Day.wednesday;
    } else if (day === 3) {
      dayText = Day.friday;
    }
  }

  const [showWeekPicker, setShowWeekPicker] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: BG_2 }]}>
      {/* WEEK */}
      {!showDayPicker && (
        <>
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
                <Text style={[styles.week, { color: TEXT_1 }]}>{weekText}</Text>
              </TouchableOpacity>
            </View>
            <Checkbox
              color={TEXT_1}
              complete={complete}
              handleComplete={() => onComplete(index)}
            />
          </Animated.View>

          {showWeekPicker && (
            <Picker
              itemStyle={{ fontSize: 20, color: TEXT_1 }}
              style={{ borderRadius: 3 }}
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
                    value={String(week)}
                  />
                );
              })}
            </Picker>
          )}
        </>
      )}

      {/* DAY */}
      {!showWeekPicker && (
        <>
          <Animated.View
            style={[
              styles.headerBottomRow,
              { opacity, transform: [{ translateX: translateFast }] },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                setShowWeekPicker(false);
                setShowDayPicker(p => !p);
              }}
            >
              <Text style={[styles.day, { color: TEXT_1 }]}>{dayText}</Text>
            </TouchableOpacity>
          </Animated.View>

          {showDayPicker && (
            <Picker
              itemStyle={{ fontSize: 20, color: TEXT_1 }}
              style={{ borderRadius: 3 }}
              selectedValue={String(day)}
              onValueChange={(value: string) => {
                onDayChange(Number(value));
                setShowDayPicker(false);
              }}
            >
              {dayOptions.map((day: number, index: number) => {
                let dayText = `Day ${day}`;
                if (showDayName) {
                  if (day === 1) {
                    dayText = Day.monday;
                  } else if (day === 2) {
                    dayText = Day.wednesday;
                  } else if (day === 3) {
                    dayText = Day.friday;
                  }
                }

                return (
                  <Picker.Item
                    key={String(day) + index}
                    label={dayText}
                    value={String(day)}
                  />
                );
              })}
            </Picker>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    fontFamily: 'Archivo Black',
    justifyContent: 'space-evenly',
    padding: 15,
    gap: 15,
    opacity: 0.95,
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
    fontSize: 18,
    lineHeight: 16 * 1.5,
  },
  checkbox: {
    //
  },
  selectContainer: {
    width: '75%',
  },
});
