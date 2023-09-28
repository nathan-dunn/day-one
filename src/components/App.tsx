import React, { useState, useRef, useEffect, useMemo } from 'react';
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
import LottieView from 'lottie-react-native';
import { cloneDeep } from 'lodash';
import Session from './Session';
import Intro from './Intro';
import Panel from './Panel';
import programs from '../programs';
import {
  findLastCompleted,
  getStorage,
  clearStorage,
  setStorage,
  getColor,
  interpolateColors,
} from '../utils';
import { Theme, Program, Colors } from '../types';
import spaceAnimation from '../../assets/animations/data_2.json';

const { width, height } = Dimensions.get('window');
const LOADING_DELAY = 1000;
const defaultProgram = programs[1];

export default function App() {
  // PAGE
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);

  // PROGRAM
  const [program, setProgram] = useState<Program>(defaultProgram);

  // PAGE & CHECKS
  const totalPages = program.sessions.length + 1;
  const [page, setPage] = useState<number>(0);

  const weekOptions: number[] = program.sessions
    .filter(session => session.day === 1)
    .map(session => session.week);

  const dayOptions: number[] = [1, 2, 3];

  // COLORS
  const BG_1 = Colors.DARK_SPACE;
  const BG_2 = Colors.LIGHT_SPACE;

  const gradientBG = useMemo(
    () => interpolateColors(totalPages, [BG_1, BG_2]),
    [totalPages]
  );
  const gradientColor = useMemo(
    () => interpolateColors(totalPages, [Colors.WHITE, Colors.WHITE]),
    [totalPages]
  );

  const HIGHLIGHT_BG = page ? gradientBG[page] : BG_1;
  const HIGHLIGHT_COLOR = page ? gradientColor[page] : 'white';
  const BASE_TEXT = getColor(Theme.TEXT_1);

  // REFS
  const scrollX = useRef(new Animated.Value(0)).current;
  const drawerRef = useRef<Drawer>(null);
  const flatListRef = useRef<FlatList>(null);

  // HANDLERS
  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);

    setPage(pageNum);
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  );

  const openPanel = () => {
    if (drawerRef.current) {
      drawerRef.current.open();
    }
  };

  const closePanel = () => {
    if (drawerRef.current) {
      drawerRef.current.close();
    }
  };

  const handlePageNav = (index: number) => {
    flatListRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    setPage(index);
    if (!pageLoaded) {
      setTimeout(() => {
        setPageLoaded(true);
      }, LOADING_DELAY);
    }
  };

  const handleReset = async () => {
    await clearStorage();
    closePanel();
    alert('App Reset');
    loadStorage(defaultProgram);
  };

  const handleWeekChange = (week: number) => {
    const currentSession = program.sessions[page - 1];
    const currentWeek = currentSession.week;
    const numberOfDays = dayOptions.length;

    if (week > currentWeek) {
      handlePageNav(page + (week - currentWeek) * numberOfDays);
    } else if (week < currentWeek) {
      handlePageNav(page - (currentWeek - week) * numberOfDays);
    }
  };

  const handleDayChange = (day: number) => {
    const currentSession = program.sessions[page - 1];
    const currentDay = currentSession.day;

    if (day > currentDay) {
      handlePageNav(page + (day - currentDay));
    } else if (day < currentDay) {
      handlePageNav(page - (currentDay - day));
    }
  };

  const handleComplete = async (sessionIndex: number) => {
    const updated = cloneDeep(program);
    updated.sessions[sessionIndex - 1].complete =
      !updated.sessions[sessionIndex - 1].complete;

    await setStorage(
      `@day_one_program_${program.name}`,
      JSON.stringify(updated)
    );

    setProgram(updated);
  };

  const handleMaxChange = async (lift: string, max: number) => {
    const updated = cloneDeep(program);
    updated.maxes[lift] = max;

    await setStorage(
      `@day_one_program_${program.name}`,
      JSON.stringify(updated)
    );

    setProgram(updated);
  };

  const handleProgramChange = async (selectedProgram: Program) => {
    console.log('selectedProgram:', selectedProgram.name);
    if (selectedProgram.name !== program.name) {
      loadStorage(selectedProgram);
    }
  };

  // LOADERS
  const loadStorage = async (selectedProgram: Program) => {
    const storedProgram = await getStorage(
      `@day_one_program_${selectedProgram.name}`
    );
    const parsedProgram = storedProgram ? JSON.parse(storedProgram) : null;

    if (parsedProgram) {
      setProgram(parsedProgram);
      const lastCompleted = findLastCompleted(parsedProgram);
      handlePageNav(lastCompleted + 1);
      setTimeout(() => {
        setPageLoaded(true);
      }, LOADING_DELAY);
    } else {
      const _program = cloneDeep(selectedProgram);
      _program.sessions = _program.sessions.map(session => ({
        ...session,
        complete: false,
        lifts: session.lifts.map(lift => ({
          ...lift,
          complete: false,
        })),
      }));
      await setStorage(
        `@day_one_program_${_program.name}`,
        JSON.stringify(_program)
      );
      setProgram(_program);
      setTimeout(() => {
        setPageLoaded(true);
      }, LOADING_DELAY);
    }
  };

  // EFFECTS
  useEffect(() => {
    loadStorage(program);
  }, []);

  if (!pageLoaded) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: getColor(Theme.BG_1) }]}
      >
        <LottieView
          style={{ ...styles.lottie, width: width * 1.33, height }}
          source={spaceAnimation}
          autoPlay={true}
          loop={true}
        />
        <Image
          source={require('../../assets/splash_transparent.png')}
          style={[
            styles.splashImage,
            { marginBottom: 150, width: width * 0.85 },
          ]}
        />
      </SafeAreaView>
    );
  }

  return (
    <Drawer
      ref={drawerRef}
      styles={{
        main: {},
        drawer: {},
        drawerOverlay: {},
        mainOverlay: {},
      }}
      type="overlay"
      tapToClose
      panCloseMask={0.2}
      tweenHandler={ratio => ({
        main: { transform: [{ translateX: ratio * 0 }] },
      })}
      onClose={Keyboard.dismiss}
      content={
        <Panel
          onClose={closePanel}
          handleReset={handleReset}
          program={program}
          onProgramChange={handleProgramChange}
          onMaxChange={handleMaxChange}
        />
      }
    >
      <SafeAreaView style={[styles.container, { backgroundColor: BG_1 }]}>
        <LottieView
          style={{ ...styles.lottie, width: width * 1.33, height }}
          source={spaceAnimation}
          autoPlay={true}
          loop={true}
        />

        <View style={styles.headerContainer}>
          <Feather
            name={'menu'}
            size={24}
            color={BASE_TEXT}
            onPress={openPanel}
          />
        </View>

        <Animated.FlatList
          keyExtractor={item => `${item.week} + ${item.day}`}
          ref={flatListRef}
          windowSize={program.sessions.length + 1}
          initialScrollIndex={page}
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
          extraData={[program, page]}
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
                onDayChange={handleDayChange}
                onWeekChange={handleWeekChange}
                program={program}
                index={index}
                week={session.week}
                complete={session.complete}
                day={session.day}
                notes={session.notes}
                lifts={session.lifts}
                page={page}
                scrollX={scrollX}
                highlightBG={HIGHLIGHT_BG}
                highlightColor={HIGHLIGHT_COLOR}
                handleComplete={() => handleComplete(index)}
                weekOptions={weekOptions}
                dayOptions={dayOptions}
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
  lottie: {
    overflow: 'hidden',
    padding: 0,
    margin: 0,
    position: 'absolute',
  },
});
