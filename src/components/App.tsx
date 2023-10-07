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
import { cloneDeep, set } from 'lodash';
import Session from './Session';
import Intro from './Intro';
import Panel from './Panel';
import programs from '../programs';
import {
  findLastCompleted,
  getStorage,
  clearStorage,
  setStorage,
  interpolateColors,
  generateTintsAndShades,
} from '../utils';
import { Program, Colors } from '../types';
import animationSrc from '../../assets/animations/data_6.json';

const { width, height } = Dimensions.get('window');
const LOADING_DELAY = 1000;
const defaultProgram = programs[1];

export default function App() {
  // REFS
  const scrollX = useRef(new Animated.Value(0)).current;
  const drawerRef = useRef<Drawer>(null);
  const flatListRef = useRef<FlatList>(null);
  const animationRef = useRef<LottieView | null>(null);

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
  // const BGS_1 = useMemo(
  //   () => interpolateColors(totalPages, ['#151C23', '#2F363D']),
  //   [totalPages]
  // );
  // const BGS_2 = useMemo(
  //   () => interpolateColors(totalPages, ['#2F363D', '#151C23']),
  //   [totalPages]
  // );

  const HEX = '#516f7f';

  const BGS_1 = useMemo(
    () => generateTintsAndShades(totalPages, HEX),
    [totalPages]
  );
  const BGS_2 = useMemo(
    () => generateTintsAndShades(totalPages, HEX),
    [totalPages]
  );

  const BG_1 = HEX || BGS_1[page];
  const BG_2 = HEX || BGS_2[page];

  const TEXT_1 = Colors.WHITE;
  const TEXT_2 = Colors.WHITE;

  // VARS
  const [speed, setSpeed] = useState(0.33);
  const [collapsed, setCollapsed] = useState<boolean>(false);

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

  const handleCollapsedChange = async (collapsed: boolean) => {
    setCollapsed(collapsed);
    await setStorage(`@day_one_program_collapsed`, collapsed.toString());
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

    const storedCollapsed = await getStorage(`@day_one_program_collapsed`);

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

    if (storedCollapsed) {
      setCollapsed(storedCollapsed === 'true');
    }
  };

  // EFFECTS
  useEffect(() => {
    loadStorage(program);
  }, []);

  if (!pageLoaded) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: BG_1 }]}>
        <Image
          source={require('../../assets/splash_transparent.png')}
          style={[
            styles.splashImage,
            {
              // marginBottom: 150,
              width: width * 0.85,
            },
          ]}
        />
      </SafeAreaView>
    );
  }

  return (
    <Drawer
      ref={drawerRef}
      styles={{ main: {}, drawer: {}, drawerOverlay: {}, mainOverlay: {} }}
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
          BG_1={BG_1}
          BG_2={BG_2}
          TEXT_1={TEXT_1}
          TEXT_2={TEXT_2}
        />
      }
    >
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: BG_1,
          },
        ]}
      >
        <LottieView
          ref={animationRef}
          style={{
            ...styles.lottie,
            width: width * 4,
            height: height * 4,
            opacity: 0.7,
            // transform: [{ rotate: '0deg' }],
          }}
          source={animationSrc}
          autoPlay={true}
          loop={false}
          speed={speed}
          onAnimationFinish={() => {
            setSpeed(p => p * -1);
            animationRef.current?.play();
          }}
        />

        <View style={styles.headerContainer}>
          <Feather name={'menu'} size={24} color={TEXT_1} onPress={openPanel} />
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
                BG_1={BG_1}
                BG_2={BG_2}
                TEXT_1={TEXT_1}
                TEXT_2={TEXT_2}
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
                BG_1={BG_1}
                BG_2={BG_2}
                TEXT_1={TEXT_1}
                TEXT_2={TEXT_2}
                handleComplete={() => handleComplete(index)}
                weekOptions={weekOptions}
                dayOptions={dayOptions}
                collapsed={collapsed}
                handleCollapsedChange={handleCollapsedChange}
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
