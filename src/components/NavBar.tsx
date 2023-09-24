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
  width: number;
  totalPages: number;
  segmentStyle: StyleProp<TextStyle>;
  onPress: (index: number) => void;
  page: number;
  highlightColor: string;
};

export default function NavBar({
  width,
  totalPages,
  onPress,
  segmentStyle,
  page,
  highlightColor,
}: NavBarProps) {
  const segments = useMemo(
    () => new Array(totalPages - 1).fill(null),
    [totalPages]
  );

  const callback = useCallback(
    (item: null, index: number) => {
      const isCurrent = index + 1 === page;
      const padding = 0.5;

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
                width: width / totalPages - 2 * padding,
                height: isCurrent ? 5 : 3,
                backgroundColor: isCurrent ? highlightColor : colors.LIGHT_GRAY,
              },
            ]}
          />
        </TouchableOpacity>
      );
    },
    [page]
  );

  return (
    <View style={[styles.container, { width }]}>{segments.map(callback)}</View>
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
