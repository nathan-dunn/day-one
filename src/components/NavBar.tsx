import React from 'react';
import { Animated, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Mode } from '../types';
import { colors } from '../constants';

type NavBarProps = {
  page: number;
  sessionsCount: number;
  width: number;
  mode: Mode;
  onPress: (index: number) => void;
  opacity: Animated.AnimatedInterpolation<number>;
  translateX: Animated.AnimatedInterpolation<number>;
};

export default function NavBar({
  page,
  sessionsCount,
  width,
  mode,
  onPress,
  opacity,
  translateX,
}: NavBarProps) {
  return (
    <View style={[styles.container, { width }]}>
      {new Array(sessionsCount).fill(false).map((item, index) => {
        const PRIMARY_COLOR =
          mode === Mode.light ? colors.LIGHT_BLACK : colors.WHITE;
        const SECONDARY_COLOR =
          mode === Mode.light ? colors.DARK_GRAY : colors.LIGHT_GRAY;
        const padding = 1.5;
        const adjustedWidth = width / sessionsCount - 2 * padding;
        const isCurrent = index === page - 1;

        return (
          <TouchableOpacity
            key={index}
            style={styles.touch}
            onPress={() => onPress(index)}
          >
            <Animated.View
              style={[
                styles.nav,
                {
                  width: adjustedWidth,
                  height: isCurrent ? 6 : 3,
                  backgroundColor: isCurrent ? PRIMARY_COLOR : SECONDARY_COLOR,
                },
                { opacity, transform: [{ translateX }] },
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
    underlayColor: 'red',
    activeOpacity: 1,
  },
  nav: {
    height: 3,
  },
});
