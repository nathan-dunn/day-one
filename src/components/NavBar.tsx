import React, { useCallback, useMemo } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  StyleProp,
} from 'react-native';
import { Mode } from '../types';
import { colors } from '../constants';

type NavBarProps = {
  width: number;
  totalPages: number;
  segmentStyle: StyleProp<TextStyle>;
  onPress: (index: number) => void;
  page: number;
  mode: Mode;
};

export default function NavBar({
  width,
  totalPages,
  onPress,
  segmentStyle,
  page,
  mode,
}: NavBarProps) {
  const PRIMARY_COLOR = mode === Mode.light ? colors.LIGHT_BLACK : colors.WHITE;
  const SECONDARY_COLOR =
    mode === Mode.light ? colors.DARK_GRAY : colors.LIGHT_GRAY;

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
                backgroundColor: isCurrent ? PRIMARY_COLOR : SECONDARY_COLOR,
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
