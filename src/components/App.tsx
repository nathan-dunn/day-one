import { StatusBar } from 'expo-status-bar';
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Drawer from 'react-native-drawer';
import Session from './Session';
import Intro from './Intro';
import Panel from './Panel';
import programs from '../programs';
import { colors } from '../constants';
import {
  findMaxesNeeded,
  findSession,
  getStorage,
  removeStorage,
  setStorage,
} from '../utils';
import { Mode, MaxesType, isMode, isMaxesType } from '../types';

const { width } = Dimensions.get('window');

const drawerStyles = {
  main: { paddingLeft: 0 },
};

const ANIMATED_VALUE = new Animated.Value(0);

export default function App() {
  // PROGRAM
  const [program] = useState(programs[0]);
  const sessionsCount = program.sessions.length;

  // MODE
  const [mode, setMode] = useState<Mode | undefined>(undefined);

  // PAGE && CHECKS
  const [page, setPage] = useState<number | undefined>(undefined);
  const [checks, setChecks] = useState<boolean[]>([]);

  // MAXES
  const maxesNeeded: MaxesType = useMemo(
    () => findMaxesNeeded(program.sessions),
    [program]
  );
  const [maxes, setMaxes] = useState<MaxesType>(maxesNeeded);

  // VARIABLES
  const BACKGROUND_COLOR =
    mode === Mode.light ? colors.WHITE : colors.DARK_BLACK;
  const PRIMARY_COLOR = mode === Mode.light ? colors.LIGHT_BLACK : colors.WHITE;

  // REFS
  const drawerRef = useRef<Drawer>(null);
  const flatListRef = useRef<FlatList>(null);
  const _scrollX = useRef(ANIMATED_VALUE).current;

  // HANDLERS
  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setPage(pageNum);
    console.log('...setPage', pageNum);
    setStorage('@day_one_page', String(pageNum));
    console.log('...setStorage', pageNum);
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: _scrollX } } }],
    { useNativeDriver: true }
  );

  const openPanel = useCallback(() => {
    if (drawerRef.current) {
      drawerRef.current.open();
    }
  }, []);

  const closePanel = useCallback(() => {
    if (drawerRef.current) {
      drawerRef.current.close();
    }
  }, []);

  const handlePageNav = (index: number) => {
    flatListRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
  };

  const handleCheck = useCallback(async (index: number) => {
    const storedChecks = await getStorage('@day_one_checks');
    const parsed = storedChecks ? JSON.parse(storedChecks) : null;
    if (parsed) {
      const updatedChecks = [...parsed];
      updatedChecks[index] = !updatedChecks[index];
      setChecks(updatedChecks);
      setStorage('@day_one_checks', JSON.stringify(updatedChecks));
    }
  }, []);

  const handleNavPress = useCallback((index: number) => {
    handlePageNav(index + 1);
    setPage(index + 1);
    setStorage('@day_one_page', String(index + 1));
  }, []);

  const handleReset = useCallback(async () => {
    await removeStorage('@day_one_checks');
    await removeStorage('@day_one_mode');
    await removeStorage('@day_one_maxes');
    await removeStorage('@day_one_page'); // sunset

    loadStoredMode();
    loadStoredChecks();
    loadStoredMaxes();

    alert('App Reset');
  }, []);

  // LOADERS
  const loadStoredMode = async () => {
    const storedMode = await getStorage('@day_one_mode');
    if (isMode(storedMode)) {
      setMode(storedMode);
    } else {
      setMode(Mode.dark);
      await setStorage('@day_one_mode', Mode.dark);
    }
  };

  const loadStoredChecks = async () => {
    const storedChecks = await getStorage('@day_one_checks');
    const parsed = storedChecks ? JSON.parse(storedChecks) : null;

    if (parsed) {
      setChecks(parsed);
      const currentSession = findSession(parsed);
      setPage(currentSession);
      handlePageNav(currentSession);
    } else {
      const _checks = new Array(sessionsCount + 1).fill(false);
      setPage(0);
      handlePageNav(0);
      setChecks(_checks);
      await setStorage('@day_one_checks', JSON.stringify(_checks));
    }
  };

  const loadStoredMaxes = async () => {
    const storedMaxes = await getStorage('@day_one_maxes');
    const parsed = storedMaxes ? JSON.parse(storedMaxes) : null;

    if (isMaxesType(parsed)) {
      setMaxes({ ...maxesNeeded, ...parsed });
    } else {
      setMaxes(maxesNeeded);
      await setStorage('@day_one_maxes', JSON.stringify(maxesNeeded));
    }
  };

  // EFFECTS
  useEffect(() => {
    loadStoredMode();
    loadStoredChecks();
    loadStoredMaxes();
  }, []);

  if (page === undefined || !mode) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.DARK_BLACK,
        }}
      >
        <Image
          source={require('../../assets/icon.png')}
          style={{ width: width * 0.85, resizeMode: 'contain' }}
        />
      </SafeAreaView>
    );
  }

  return (
    <Drawer
      type="static"
      ref={drawerRef}
      styles={drawerStyles}
      tapToClose={true}
      panCloseMask={0.2}
      openDrawerOffset={0.2}
      tweenHandler={ratio => ({
        main: { transform: [{ translateX: ratio * 0 }] },
      })}
      onClose={() => {
        loadStoredMaxes();
        Keyboard.dismiss();
      }}
      content={
        <Panel
          onClose={closePanel}
          mode={mode}
          setMode={setMode}
          maxes={maxes}
          programName={program.name}
          handleReset={handleReset}
        />
      }
    >
      <SafeAreaView
        style={[styles.container, { backgroundColor: BACKGROUND_COLOR }]}
      >
        <StatusBar style="auto" />

        <View style={styles.headerContainer}>
          <Feather
            name={'settings'}
            size={24}
            color={PRIMARY_COLOR}
            onPress={openPanel}
          />
        </View>

        <Animated.FlatList
          // initialScrollIndex={page}
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          horizontal
          pagingEnabled
          keyExtractor={item => item.sessionId.toString()}
          onScroll={onScroll}
          onMomentumScrollEnd={onScrollEnd}
          data={[
            {
              name: program.name,
              notes: program.notes,
              sessionId: program.sessionId,
            },
            ...program.sessions,
          ]}
          renderItem={({ item, index }) => {
            return index === 0 ? (
              <Intro
                index={index}
                name={item.name}
                notes={item.notes}
                mode={mode}
                scrollX={_scrollX}
              />
            ) : (
              <Session
                {...item}
                index={index}
                page={page}
                scrollX={_scrollX}
                mode={mode}
                maxes={maxes}
                isChecked={checks[index]}
                handleCheck={() => handleCheck(index)}
                sessionsCount={sessionsCount}
                handleNavPress={handleNavPress}
              />
            );
          }}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
      </SafeAreaView>
    </Drawer>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 30,
    height: 64,
  },
});
