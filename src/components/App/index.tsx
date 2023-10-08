import React, { useState, useRef, useEffect, useCallback } from 'react';
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
import { cloneDeep, set } from 'lodash';
import Session from '../Session';
import Intro from '../Intro';
import Panel from '../Panel';
import AnimationBackground from '../AnimationBackground';
import programs from '../../programs';
import {
  findLastCompleted,
  getStorage,
  clearStorage,
  setStorage,
} from '../../utils';
import { Program, Colors } from '../../types';

// VARS
const { width } = Dimensions.get('window');
const DEFAULT_PROGRAM = programs[1];
const DEFAULT_SHOW_NOTES = true;
const DEFAULT_SHOW_ANIMATION = true;
const DEFAULT_SHOW_DAY_NAME = true;

export default function App() {
  // REFS
  const scrollX = useRef(new Animated.Value(0)).current;
  const drawerRef = useRef<Drawer>(null);
  const flatListRef = useRef<FlatList>(null);

  // STATE
  const [program, setProgram] = useState<Program>(DEFAULT_PROGRAM);
  const [showNotes, setShowNotes] = useState<boolean>(DEFAULT_SHOW_NOTES);
  const [showAnimation, setShowAnimation] = useState<boolean>(
    DEFAULT_SHOW_ANIMATION
  );
  const [showDayName, setShowDayName] = useState<boolean>(
    DEFAULT_SHOW_DAY_NAME
  );

  // PAGES
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const weekOptions: number[] = program.sessions
    .filter(session => session.day === 1)
    .map(session => session.week);

  const dayOptions: number[] = [1, 2, 3];

  // COLORS
  const BG_1 = '#182A37';
  const BG_2 = '#516f7f';

  const TEXT_1 = Colors.WHITE;
  const TEXT_2 = Colors.MED_GRAY;

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
      setPageLoaded(true);
    }
  };

  const handleReset = async () => {
    await clearStorage();
    closePanel();
    alert('App Reset');
    loadStorage(DEFAULT_PROGRAM);
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

  const handleshowNotesChange = async (showNotes: boolean) => {
    setShowNotes(showNotes);
    await setStorage(`@day_one_program_showNotes`, showNotes.toString());
  };

  const handleAnimationChange = async (showAnimation: boolean) => {
    setShowAnimation(showAnimation);
    await setStorage(
      `@day_one_program_show_animation`,
      showAnimation.toString()
    );
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
    // Load program
    const storedProgram = await getStorage(
      `@day_one_program_${selectedProgram.name}`
    );
    const parsedProgram = storedProgram ? JSON.parse(storedProgram) : null;

    if (parsedProgram) {
      setProgram(parsedProgram);
      const lastCompleted = findLastCompleted(parsedProgram);
      handlePageNav(lastCompleted + 1);
      setPageLoaded(true);
    } else {
      const _program = cloneDeep(selectedProgram);
      _program.sessions = _program.sessions.map(session => ({
        ...session,
        complete: false,
        lifts: session.lifts.map(lift => ({ ...lift, complete: false })),
      }));
      await setStorage(
        `@day_one_program_${_program.name}`,
        JSON.stringify(_program)
      );
      setProgram(_program);
      setPageLoaded(true);
    }

    // Load showNotes
    const storedshowNotes = await getStorage(`@day_one_program_showNotes`);
    if (storedshowNotes != null) {
      setShowNotes(storedshowNotes === 'true');
    } else {
      setShowNotes(DEFAULT_SHOW_NOTES);
      await setStorage(
        `@day_one_program_showNotes`,
        DEFAULT_SHOW_NOTES.toString()
      );
    }

    // Load showAnimation
    const storedShowAnimation = await getStorage(
      `@day_one_program_show_animation`
    );
    if (storedShowAnimation != null) {
      setShowAnimation(storedShowAnimation === 'true');
    } else {
      setShowAnimation(DEFAULT_SHOW_ANIMATION);
      await setStorage(
        `@day_one_program_show_animation`,
        DEFAULT_SHOW_ANIMATION.toString()
      );
    }

    // Load showDayName
    const storedShowDayName = await getStorage(
      `@day_one_program_show_day_name`
    );
    if (storedShowDayName != null) {
      setShowDayName(storedShowDayName === 'true');
    } else {
      setShowDayName(DEFAULT_SHOW_DAY_NAME);
      await setStorage(
        `@day_one_program_show_day_name`,
        DEFAULT_SHOW_DAY_NAME.toString()
      );
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
          testID="splash-image"
          source={require('../../../assets/images/splash_transparent.png')}
          style={[styles.splashImage, { width: width * 0.85 }]}
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
          onshowNotesChange={handleshowNotesChange}
          showNotes={showNotes}
          showAnimation={showAnimation}
          onAnimationChange={handleAnimationChange}
          showDayName={showDayName}
          onDayNameChange={setShowDayName}
          BG_1={BG_1}
          BG_2={BG_2}
          TEXT_1={TEXT_1}
          TEXT_2={TEXT_2}
        />
      }
    >
      <SafeAreaView style={[styles.container, { backgroundColor: BG_1 }]}>
        <AnimationBackground page={page} showAnimation={showAnimation} />

        <View style={styles.headerContainer}>
          <Feather name={'menu'} size={24} color={TEXT_1} onPress={openPanel} />
        </View>
        <Animated.FlatList
          keyExtractor={item => `${item.week} + ${item.day}`}
          ref={flatListRef}
          initialScrollIndex={page}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          horizontal
          pagingEnabled
          removeClippedSubviews={true}
          initialNumToRender={program.sessions.length + 1}
          windowSize={program.sessions.length + 1}
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
            if (index === 0) {
              return (
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
              );
            }

            return (
              <Session
                maxes={program.maxes}
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
                weekOptions={weekOptions}
                dayOptions={dayOptions}
                showNotes={showNotes}
                showDayName={showDayName}
                onDayChange={handleDayChange}
                onWeekChange={handleWeekChange}
                onshowNotesChange={handleshowNotesChange}
                onComplete={handleComplete}
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
