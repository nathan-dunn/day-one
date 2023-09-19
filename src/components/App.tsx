import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  FlatList,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Drawer from 'react-native-drawer';
import Session from './Session';
import Panel from './Panel';
import programs from '../programs';
import { WHITE, LIGHT_BLACK, DARK_BLACK } from '../constants';
import { findMaxesNeeded, getStorage } from '../utils';
import { Mode, MaxesType } from '../types';
import styles from '../styles';
import { drawerStyles } from '../styles/misc';

const { width } = Dimensions.get('window');

export default function App() {
  const [program, setProgram] = useState(programs[0]);
  let sessionsLen: number;
  let maxesNeeded: MaxesType = {};

  const [maxes, setMaxes] = useState(maxesNeeded);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mode, setMode] = useState<Mode | undefined>(undefined);

  const flatListRef = useRef<FlatList>(null);
  const _scrollX = useRef(new Animated.Value(0)).current;
  const drawerRef = useRef<Drawer>(null);

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
    const nextIndex = currentIndex === sessionsLen - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);

    flatListRef.current?.scrollToOffset({
      offset: nextIndex * width,
      animated: true,
    });
  };

  const closePanel = () => {
    if (drawerRef.current) {
      drawerRef.current.close();
    }
  };

  const openPanel = () => {
    if (drawerRef.current) {
      drawerRef.current.open();
    }
  };

  useEffect(() => {
    const fetchStoredMode = async () => {
      const storedMode = await getStorage('@day_one_mode');
      console.log('storedMode:', storedMode);
      if (storedMode) setMode(storedMode);
    };

    fetchStoredMode();
  }, []);

  useEffect(() => {
    maxesNeeded = findMaxesNeeded(program.sessions);
    sessionsLen = program.sessions.length;
    setMaxes(maxesNeeded);
    setMaxes({
      squat: 335,
      bench: 285,
      deadlift: 385,
      press: 160,
    });
    // console.log(JSON.stringify(program, null, 2));
  }, [program]);

  const BACKGROUND_COLOR = mode === Mode.light ? WHITE : DARK_BLACK;

  return (
    mode && (
      <Drawer
        ref={drawerRef}
        type="static"
        content={
          <Panel
            onClose={closePanel}
            mode={mode}
            setMode={setMode}
            maxes={maxes}
            programName={program.name}
          />
        }
        openDrawerOffset={100}
        styles={drawerStyles}
      >
        <SafeAreaView
          style={[styles.container, { backgroundColor: BACKGROUND_COLOR }]}
        >
          <StatusBar style="auto" />

          <View style={styles.headerContainer}>
            <Feather
              name={'settings'}
              size={24}
              color={mode === Mode.light ? LIGHT_BLACK : WHITE}
              padding={20}
              onPress={openPanel}
            />
          </View>

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
            data={program.sessions}
            renderItem={({ item, index }) => (
              <Session
                {...item}
                index={index}
                scrollX={_scrollX}
                mode={mode}
                handleLongPress={handleLongPress}
                maxes={maxes}
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
      </Drawer>
    )
  );
}
