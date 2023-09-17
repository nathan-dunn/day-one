import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import {
  Animated,
  Dimensions,
  View,
  StyleSheet,
  SafeAreaView,
  StyleProp,
  TextStyle,
  Text,
} from 'react-native';
import data from '../data/data';

// console.log(data);

type HorizontalLineProps = {
  style: StyleProp<TextStyle>;
  opacity: Animated.AnimatedInterpolation<number>;
  translateX: Animated.AnimatedInterpolation<number>;
};

function Line({ style, opacity, translateX }: LineProps) {
  return (
    <Animated.View
      style={[
        style,
        {
          opacity,
          transform: [{ translateX }],
        },
      ]}
    />
  );
}

const { width, height } = Dimensions.get('window');

type LiftType = {
  name: string;
  sets: number | string;
  reps: number | string;
  perc: number;
};

type SessionProps = {
  week: number | string;
  day: number | string;
  notes: string;
  // lifts: LiftType[];

  index: number;
  scrollX: Animated.Value;
};

type AniTextProps = {
  text: string;
  style: StyleProp<TextStyle>;
  opacity: Animated.AnimatedInterpolation<number>;
  translateX: Animated.AnimatedInterpolation<number>;
};

const AniText = ({ text, style, opacity, translateX }: AniTextProps) => {
  return (
    <Animated.Text
      style={[
        style,
        {
          opacity,
          transform: [{ translateX }],
        },
      ]}
    >
      {text}
    </Animated.Text>
  );
};

const Session = ({ week, day, notes, scrollX, index }: SessionProps) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const opacityInputRange = [
    (index - 0.4) * width,
    index * width,
    (index + 0.4) * width,
  ];
  const opacity: Animated.AnimatedInterpolation<number> = scrollX.interpolate({
    inputRange: opacityInputRange,
    outputRange: [0, 1, 0],
  });
  const translateXWeek: Animated.AnimatedInterpolation<number> =
    scrollX.interpolate({
      inputRange,
      outputRange: [width * 0.1, 0, -width * 0.1],
    });
  const translateXDay: Animated.AnimatedInterpolation<number> =
    scrollX.interpolate({
      inputRange,
      outputRange: [width, 0, -width],
    });
  const translateXNotes: Animated.AnimatedInterpolation<number> = translateXDay;
  const translateXLine: Animated.AnimatedInterpolation<number> = translateXDay;

  return (
    <View style={styles.sessionStyle}>
      <View style={styles.textContainer}>
        <AniText
          text={`Week ${week}`}
          style={styles.week}
          opacity={opacity}
          translateX={translateXWeek}
        />

        <AniText
          text={`Day ${day}`}
          style={styles.day}
          opacity={opacity}
          translateX={translateXDay}
        />

        <AniText
          text={notes}
          style={styles.day}
          opacity={opacity}
          translateX={translateXNotes}
        />

        <Line
          style={styles.line}
          opacity={opacity}
          translateX={translateXLine}
        />
      </View>
    </View>
  );
};

export default function App() {
  const _scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Animated.FlatList
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        horizontal
        keyExtractor={item => `${item.week}${item.day}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: _scrollX } } }],
          { useNativeDriver: true }
        )}
        data={data.sessions}
        renderItem={({ item, index }) => {
          return <Session {...item} index={index} scrollX={_scrollX} />;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sessionStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'flex-start',
    flex: 0.85,
  },

  week: {
    color: '#444',
    textTransform: 'uppercase',
    textAlign: 'left',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 10,
  },
  day: {
    color: '#bbb',
    fontWeight: '600',
    textAlign: 'left',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  sessionNotes: {
    color: '#444',
    fontWeight: '600',
    textAlign: 'left',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  line: {
    height: 1, // height of the line
    width: width * 0.66, // make it span the full width of its container
    backgroundColor: '#bbb', // change color as needed
  },
});
