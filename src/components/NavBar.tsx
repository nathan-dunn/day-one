import React from 'react';
import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  StyleProp,
} from 'react-native';

type NavBarProps = {
  width: number;
  sessionsCount: number;
  segmentStyle: StyleProp<TextStyle>;
  onPress: (index: number) => void;
};

export default function NavBar({
  width,
  sessionsCount,
  onPress,
  segmentStyle,
}: NavBarProps) {
  return (
    <View style={[styles.container, { width }]}>
      {new Array(sessionsCount).fill(null).map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[styles.touch, {}]}
            onPress={() => onPress(index)}
          >
            <Animated.View style={[segmentStyle]} />
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
