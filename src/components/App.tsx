import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Session from './Session';
import data from '../data';
import { WHITE, LIGHT_BLACK, DARK_BLACK, GRAY } from '../constants';
import styles from '../styles';

const { width, height } = Dimensions.get('window');

enum Mode {
  dark = 'dark',
  light = 'light',
}

// console.log(JSON.stringify(data, null, 2));

export default function App() {
  const flatListRef = useRef<FlatList>(null);
  const _scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const len = data.sessions.length;
  const [mode, setMode] = useState<Mode>(Mode.light);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentIndex(pageNum);
    return { contentOffset, viewSize, pageNum };
  };

  // const handlePrevItem = () => {
  //   // Increment the index
  //   const prevIndex = currentIndex === 0 ? len - 1 : currentIndex - 1;
  //   setCurrentIndex(prevIndex);

  //   flatListRef.current?.scrollToOffset({
  //     offset: prevIndex * width,
  //     animated: true,
  //   });
  // };

  // const handleNextItem = () => {
  //   // Increment the index
  //   const nextIndex = currentIndex === len - 1 ? 0 : currentIndex + 1;
  //   setCurrentIndex(nextIndex);

  //   flatListRef.current?.scrollToOffset({
  //     offset: nextIndex * width,
  //     animated: true,
  //   });
  // };

  const BACKGROUND_COLOR = mode === Mode.light ? WHITE : DARK_BLACK;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: BACKGROUND_COLOR }]}
    >
      <StatusBar style="auto" />

      <Feather
        name={mode === Mode.light ? 'sun' : 'moon'}
        size={24}
        color={mode === Mode.light ? LIGHT_BLACK : WHITE}
        alignSelf="flex-end"
        padding={20}
        onPress={() => {
          setMode(p => (p === Mode.light ? Mode.dark : Mode.light));
        }}
      />

      <Animated.FlatList
        initialScrollIndex={currentIndex}
        ref={flatListRef}
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
          return (
            <Session {...item} index={index} scrollX={_scrollX} mode={mode} />
          );
        }}
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
    </SafeAreaView>
  );
}
