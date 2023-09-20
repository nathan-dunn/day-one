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
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Drawer from 'react-native-drawer';
import Session from './Session';
import Intro from './Intro';
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

const { width } = Dimensions.get('window');

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 },
};

export default function App() {
  const [program, setProgram] = useState(programs[0]);
  const programData = [
    { name: program.name, notes: program.notes, date: program.date },
    ...program.sessions,
  ];

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
    setStorage('@day_one_page', String(pageNum));
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

      flatListRef.current?.scrollToOffset({
        offset: parsed * width,
        animated: true,
      });
    } else {
      const _page = 0;
      setPage(_page);
      await setStorage('@day_one_page', String(_page));
      flatListRef.current?.scrollToOffset({
        offset: _page * width,
        animated: true,
      });
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

    loadStoredMode();
    loadStoredPage();
    loadMaxes();

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
            ref={flatListRef}
            initialScrollIndex={page}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            horizontal
            pagingEnabled
            keyExtractor={item => item.date.toString()}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: _scrollX } } }],
              { useNativeDriver: true }
            )}
            data={programData}
            renderItem={({ item, index }) => {
              return index === 0 ? (
                <Intro
                  name={item.name}
                  notes={item.notes}
                  mode={mode}
                  scrollX={_scrollX}
                />
              ) : (
                <Session
                  {...item}
                  index={index}
                  scrollX={_scrollX}
                  mode={mode}
                  maxes={maxes}
                />
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
      </Drawer>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: '100%',
    paddingLeft: 16,
  },
});
