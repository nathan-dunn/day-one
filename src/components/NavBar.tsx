import React, { useMemo } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  StyleProp,
} from 'react-native';
import { findLast } from 'lodash';
import { Program, Colors } from '../types';

type NavBarProps = {
  highlightColor: string;
  onPress: (index: number) => void;
  segmentStyle: StyleProp<TextStyle>;
  totalPages: number;
  week: number;
  width: number;
  program: Program;
  page: number;
};

export default function NavBar({
  highlightColor,
  onPress,
  segmentStyle,
  totalPages,
  week,
  width,
  program,
  page,
}: NavBarProps) {
  const lastSession = findLast(program.sessions);
  const totalWeeks = lastSession ? lastSession.week : 0;
  const daysThisWeek = findLast(program.sessions, { week })?.day || 0;

  const weekSegments = useMemo(
    () => new Array(totalWeeks).fill(null),
    [totalPages]
  );
  const daySegments = useMemo(
    () => new Array(daysThisWeek).fill(null),
    [totalPages]
  );
  const padding = 2;

  return (
    <View style={styles.container}>
      <View style={[styles.content, { width }]}>
        {weekSegments.map((_, index: number) => {
          const isCurrent = index + 1 === week;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.touch, {}]}
              onPress={() => onPress(index)}
            >
              <Animated.View
                style={[
                  segmentStyle,
                  {
                    width: width / totalWeeks - 2 * padding,
                    height: isCurrent ? 5 : 3,
                    backgroundColor: isCurrent
                      ? highlightColor
                      : Colors.LIGHT_GRAY,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={[styles.content, { width, justifyContent: 'center', gap: 50 }]}
      >
        {daySegments.map((_, index: number) => {
          const isCurrent = index + 1 === program.sessions[page - 1]?.day;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.touch, {}]}
              // onPress={() => onPress(index)}
            >
              <Animated.View
                style={[
                  segmentStyle,
                  {
                    width: width / totalWeeks - 2 * padding,
                    height: isCurrent ? 5 : 3,
                    backgroundColor: isCurrent
                      ? highlightColor
                      : Colors.LIGHT_GRAY,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touch: {
    paddingVertical: 10,
    activeOpacity: 1,
  },
});
