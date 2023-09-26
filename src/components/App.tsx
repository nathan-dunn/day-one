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
  findLastChecked,
  getStorage,
  clearStorage,
  setStorage,
  getColor,
  interpolateColors,
} from '../utils';
import { Maxes, isMaxes, Theme, Program } from '../types';

const { width } = Dimensions.get('window');

const drawerStyles = {
  main: {},
  drawer: {},
  drawerOverlay: {},
  mainOverlay: {},
};

// const ANIMATED_VALUE: Animated.Value = new Animated.Value(0);

export default function App() {
  // PROGRAM & MAXES
  const [program, setProgram] = useState<Program>(programs[1]);
  const maxesNeeded: Maxes = useMemo(
    () => findMaxesNeeded(program.sessions),
    [program]
  );
  const [maxes, setMaxes] = useState<Maxes>(maxesNeeded);

  // PAGE & CHECKS
  const totalPages = program.sessions.length + 1;
  const [page, setPage] = useState<number>(0);
  const [checks, setChecks] = useState<boolean[]>([]);

  // COLORS
  const gradient = useMemo(
    () =>
      interpolateColors(totalPages, [
        colors.PALE_BLUE,
        colors.PALE_VIOLET,
        colors.PALE_GREEN,
      ]),
    [totalPages]
  );

  const HIGHLIGHT_COLOR = page ? gradient[page] : colors.PALE_BLUE;
  const BASE_BG = getColor(Theme.BG_1);
  const BASE_TEXT = getColor(Theme.TEXT_1);

  // REFS
  const scrollX = useRef(new Animated.Value(0)).current;
  const drawerRef = useRef<Drawer>(null);
  const flatListRef = useRef<FlatList>(null);

  // HANDLERS
  const onScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const contentOffset = e.nativeEvent.contentOffset;
      const viewSize = e.nativeEvent.layoutMeasurement;
      const pageNum = Math.floor(contentOffset.x / viewSize.width);

      setPage(pageNum);
    },
    []
  );

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
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
    setPage(index);
  };

  const handleCheck = useCallback(async (index: number) => {
    const storedChecks = await getStorage(`@day_one_checks_${program.name}`);
    const parsed = storedChecks ? JSON.parse(storedChecks) : null;
    if (parsed) {
      const updatedChecks = [...parsed];
      updatedChecks[index] = !updatedChecks[index];
      setChecks(updatedChecks);
      setStorage(
        `@day_one_checks_${program.name}`,
        JSON.stringify(updatedChecks)
      );
    }
  }, []);

  const handleReset = useCallback(async () => {
    await clearStorage();
    loadStoredChecks();
    loadStoredMaxes();
    alert('App Reset');
  }, []);

  // LOADERS
  const loadStoredChecks = async () => {
    const storedChecks = await getStorage(`@day_one_checks_${program.name}`);
    const parsed = storedChecks ? JSON.parse(storedChecks) : null;

    if (parsed) {
      setChecks(parsed);
      const currentSession = findLastChecked(parsed);
      handlePageNav(currentSession);
    } else {
      const _checks = new Array(totalPages).fill(false);
      setChecks(_checks);
      handlePageNav(0);
      await setStorage(
        `@day_one_checks_${program.name}`,
        JSON.stringify(_checks)
      );
    }
  };

  const loadStoredMaxes = async () => {
    const storedMaxes = await getStorage(`@day_one_maxes_${program.name}`);
    const parsed = storedMaxes ? JSON.parse(storedMaxes) : null;

    if (isMaxes(parsed)) {
      setMaxes({ ...maxesNeeded, ...parsed });
    } else {
      setMaxes(maxesNeeded);
      await setStorage(
        `@day_one_maxes_${program.name}`,
        JSON.stringify(maxesNeeded)
      );
    }
  };

  // EFFECTS
  useEffect(() => {
    loadStoredChecks();
    loadStoredMaxes();
  }, [program]);

  if (page === undefined) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: getColor(Theme.BG_1) }]}
      >
        <Image
          source={require('../../assets/_splash.png')}
          style={[styles.splashImage, { width: width * 0.85 }]}
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
          maxes={maxes}
          handleReset={handleReset}
          highlightColor={HIGHLIGHT_COLOR}
          setProgram={setProgram}
          program={program}
          programs={programs}
        />
      }
    >
      <SafeAreaView style={[styles.container, { backgroundColor: BASE_BG }]}>
        <View style={styles.headerContainer}>
          <Feather
            name={'menu'}
            size={24}
            color={BASE_TEXT}
            onPress={openPanel}
          />
        </View>

        <Animated.FlatList
          windowSize={program.sessions.length + 1}
          keyExtractor={item => `${item.week} + ${item.day}`}
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          horizontal
          pagingEnabled
          onScroll={onScroll}
          onMomentumScrollEnd={onScrollEnd}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          data={[{}, ...program.sessions]}
          renderItem={({ item: session, index }) => {
            return index === 0 ? (
              <Intro
                name={program.name}
                notes={program.notes}
                index={index}
                page={page}
                scrollX={scrollX}
              />
            ) : (
              <Session
                index={index}
                week={session.week}
                day={session.day}
                notes={session.notes}
                lifts={session.lifts}
                maxes={maxes}
                page={page}
                scrollX={scrollX}
                highlightColor={HIGHLIGHT_COLOR}
                isChecked={checks[index]}
                handleCheck={() => handleCheck(index)}
              />
            );
          }}
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
  splashImage: {
    resizeMode: 'contain',
  },
});
