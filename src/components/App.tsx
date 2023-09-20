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
  Keyboard,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Drawer from 'react-native-drawer';
import Session from './Session';
import Panel from './Panel';
import programs from '../programs';
import { WHITE, LIGHT_BLACK, DARK_BLACK } from '../constants';
import {
  findMaxesNeeded,
  getStorage,
  setStorage,
  removeStorage,
} from '../utils';
import { Mode, MaxesType, isMode, isMaxesType } from '../types';
import styles from '../styles';
import { drawerStyles } from '../styles/misc';

const { width } = Dimensions.get('window');

export default function App() {
  const [program, setProgram] = useState(programs[0]);

  const [mode, setMode] = useState<Mode | undefined>(undefined);
  const backgroundColor = mode === Mode.light ? WHITE : DARK_BLACK;

  const [page, setPage] = useState<number>(0);
  const maxesNeeded: MaxesType = findMaxesNeeded(program.sessions);

  const [maxes, setMaxes] = useState<MaxesType>(maxesNeeded);

  const flatListRef = useRef<FlatList>(null);
  const _scrollX = useRef(new Animated.Value(0)).current;
  const drawerRef = useRef<Drawer>(null);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setPage(pageNum);
    return { contentOffset, viewSize, pageNum };
  };

  const openPanel = () => {
    if (drawerRef.current) {
      drawerRef.current.open();
    }
  };

  const closePanel = () => {
    if (drawerRef.current) {
      drawerRef.current.close();
    }
    loadMaxes();
    Keyboard.dismiss();
  };

  const loadStoredPage = async () => {
    const storedPage = await getStorage('@day_one_page');
    const parsed = storedPage ? parseInt(storedPage, 10) : null;
    if (parsed) {
      setPage(parsed);
    } else {
      setPage(0);
      await setStorage('@day_one_page', String(0));
    }
  };

  const loadStoredMode = async () => {
    const storedMode = await getStorage('@day_one_mode');
    if (isMode(storedMode)) {
      setMode(storedMode);
    } else {
      setMode(Mode.light);
      await setStorage('@day_one_mode', Mode.light);
    }
  };

  const loadMaxes = async () => {
    const storedMaxes = await getStorage('@day_one_maxes');
    const parsed = storedMaxes ? JSON.parse(storedMaxes) : null;

    if (isMaxesType(parsed)) {
      setMaxes({ ...maxesNeeded, ...parsed });
    } else {
      setMaxes(maxesNeeded);
      await setStorage('@day_one_maxes', JSON.stringify(maxesNeeded));
    }
  };

  const reset = async () => {
    await removeStorage('@day_one_mode');
    await removeStorage('@day_one_page');
    await removeStorage('@day_one_maxes');

    setMode(Mode.light);
    setPage(0);
    setMaxes(maxesNeeded);

    alert('Storage Cleared');
  };

  // init
  useEffect(() => {
    loadStoredMode();
    loadStoredPage();
    loadMaxes();
  }, []);

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
            reset={reset}
          />
        }
        openDrawerOffset={100}
        styles={drawerStyles}
      >
        <SafeAreaView
          style={[styles.container, { backgroundColor: backgroundColor }]}
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
            initialScrollIndex={page}
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
