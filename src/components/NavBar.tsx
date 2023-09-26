import React, { useCallback, useMemo } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  StyleProp,
} from 'react-native';
import { colors } from '../constants';

type NavBarProps = {
  highlightColor: string;
  onPress: (index: number) => void;
  // page: number;
  segmentStyle: StyleProp<TextStyle>;
  totalPages: number;
  totalWeeks: number;
  week: number;
  width: number;
};

export default function NavBar({
  highlightColor,
  onPress,
  // page,
  segmentStyle,
  totalPages,
  totalWeeks,
  week,
  width,
}: NavBarProps) {
  const weekSegments = useMemo(
    () => new Array(totalWeeks).fill(null),
    [totalPages]
  );
  const daySegments = useMemo(() => new Array(3).fill(null), [totalPages]);
  const padding = 2;

  return (
    <View style={styles.container}>
      <View style={[styles.content, { width }]}>
        {weekSegments.map((item: null, index: number) => {
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
                      : colors.LIGHT_GRAY,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={[styles.content, { width }]}>
        {daySegments.map((item: null, index: number) => {
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
                    width: width / 3 - 2 * padding,
                    height: isCurrent ? 5 : 3,
                    backgroundColor: isCurrent
                      ? highlightColor
                      : colors.LIGHT_GRAY,
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
