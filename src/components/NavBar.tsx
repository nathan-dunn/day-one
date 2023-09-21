import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Mode } from '../types';
import { colors } from '../constants';

type NavBarProps = {
  page: number;
  sessionsCount: number;
  width: number;
  mode: Mode;
  onPress: (index: number) => void;
};

export default function NavBar({
  page,
  sessionsCount,
  width,
  mode,
  onPress,
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
            <View
              style={[
                styles.nav,
                {
                  width: adjustedWidth,
                  height: isCurrent ? 6 : 3,
                  backgroundColor: isCurrent ? PRIMARY_COLOR : SECONDARY_COLOR,
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
    underlayColor: 'red',
    activeOpacity: 1,
  },
  nav: {
    height: 3,
  },
});
