import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import {
  Animated,
  Dimensions,
  View,
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';
import headphones from '../data/_index';
import data from '../data/data';

// console.log(data);

const { width, height } = Dimensions.get('window');

type _ItemProps = {
  heading: string;
  description: string;
  index: number;
  scrollX: Animated.Value;
};

const _Item = ({ heading, description, scrollX, index }: _ItemProps) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const opacityInputRange = [
    (index - 0.4) * width,
    index * width,
    (index + 0.4) * width,
  ];
  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.1, 0, -width * 0.1],
  });
  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width, 0, -width],
  });
  const opacity = scrollX.interpolate({
    inputRange: opacityInputRange,
    outputRange: [0, 1, 0],
  });

  return (
    <View style={styles.itemStyle}>
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity,
              transform: [{ translateX: translateXHeading }],
            },
          ]}
        >
          {heading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            {
              opacity,
              transform: [{ translateX: translateXDescription }],
            },
          ]}
        >
          {description}
        </Animated.Text>
      </View>
    </View>
  );
};

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
  lifts: LiftType[];

  index: number;
  scrollX: Animated.Value;
};

const Session = ({ week, day, scrollX, index }: SessionProps) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const opacityInputRange = [
    (index - 0.4) * width,
    index * width,
    (index + 0.4) * width,
  ];
  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.1, 0, -width * 0.1],
  });
  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width, 0, -width],
  });
  const opacity = scrollX.interpolate({
    inputRange: opacityInputRange,
    outputRange: [0, 1, 0],
  });

  return (
    <View style={styles.sessionStyle}>
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.week,
            {
              opacity,
              transform: [{ translateX: translateXHeading }],
            },
          ]}
        >
          {`Week ${week}`}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.day,
            {
              opacity,
              transform: [{ translateX: translateXDescription }],
            },
          ]}
        >
          {`Day ${day}`}
        </Animated.Text>
      </View>
    </View>
  );
};

export default function App() {
  const _scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {/* <Animated.FlatList
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        horizontal
        keyExtractor={item => item.key}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: _scrollX } } }],
          { useNativeDriver: true }
        )}
        data={headphones}
        renderItem={({ item, index }) => (
          <_Item {...item} index={index} scrollX={_scrollX} />
        )}
      /> */}

      <Animated.FlatList
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        horizontal
        keyExtractor={item => item.key}
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
  itemStyle: {
    width,
    height,
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
  heading: {
    color: '#444',
    textTransform: 'uppercase',
    textAlign: 'left',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 10,
  },
  description: {
    color: '#ccc',
    fontWeight: '600',
    textAlign: 'left',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
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
    color: '#ccc',
    fontWeight: '600',
    textAlign: 'left',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
});
