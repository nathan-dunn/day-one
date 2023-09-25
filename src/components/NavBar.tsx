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
  page: number;
  segmentStyle: StyleProp<TextStyle>;
  totalPages: number;
  totalWeeks: number;
  week: number;
  width: number;
};

export default function NavBar({
  highlightColor,
  onPress,
  page,
  segmentStyle,
  totalPages,
  totalWeeks,
  week,
  width,
}: NavBarProps) {
  const segments = useMemo(
    () => new Array(totalWeeks).fill(null),
    [totalPages]
  );
  const padding = 2;

  return (
    <View style={[styles.container, { width }]}>
      {segments.map((item: null, index: number) => {
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touch: {
    paddingVertical: 30,
    activeOpacity: 1,
  },
});
