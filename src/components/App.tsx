import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Session from './Session';
import data from '../data';
import { WHITE, LIGHT_BLACK, DARK_BLACK } from '../constants';
import styles from '../styles';

const { width } = Dimensions.get('window');

enum Mode {
  dark = 'dark',
  light = 'light',
}

console.log(JSON.stringify(data, null, 2));

export default function App() {
  const flatListRef = useRef<FlatList>(null);
  const _scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const len = data.sessions.length;
  const [mode, setMode] = useState<Mode>(Mode.light);

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('@day_one', value);
    } catch (e) {
      console.error(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@day_one');
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@day_one');
    } catch (e) {
      console.error(e);
    }
  };

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentIndex(pageNum);
    return { contentOffset, viewSize, pageNum };
  };

  const handleLongPress = () => {
    // Increment the index
    const nextIndex = currentIndex === len - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);

    flatListRef.current?.scrollToOffset({
      offset: nextIndex * width,
      animated: true,
    });
  };

  useEffect(() => {
    const stored = getData();
    console.log('stored:', stored);
  }, []);

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
        keyExtractor={item => item.date.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: _scrollX } } }],
          { useNativeDriver: true }
        )}
        data={data.sessions}
        renderItem={({ item, index }) => (
          <Session
            {...item}
            index={index}
            scrollX={_scrollX}
            mode={mode}
            handleLongPress={handleLongPress}
          />
        )}
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
