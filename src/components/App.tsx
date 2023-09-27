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
import { findIndex, cloneDeep } from 'lodash';
import Session from './Session';
import Intro from './Intro';
import Panel from './Panel';
import programs from '../programs';
import {
  findMaxesNeeded,
  findLastChecked,
  getStorage,
  clearStorage,
  setStorage,
  getColor,
  interpolateColors,
} from '../utils';
import { Day, Theme, Program, Option, Colors } from '../types';

const log = console.log;
const { width } = Dimensions.get('window');

const defaultProgram = programs[1];

export default function App() {
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);

  // PROGRAM & MAXES
  const [program, setProgram] = useState<Program>(defaultProgram);

  // PAGE & CHECKS
  const totalPages = program.sessions.length + 1;
  const [page, setPage] = useState<number>(0);

  // WEEKS
  const weekOptions: Option[] = program.sessions
    .filter(session => session.day === 1)
    .map(session => ({
      id: session.week,
      item: `Week ${session.week}`,
    }));
  const [weekOption, setWeekOption] = useState<Option>(weekOptions[0]);

  // DAYS
  const dayOptions: Option[] = [
    { id: 1, item: Day.monday },
    { id: 2, item: Day.wednesday },
    { id: 3, item: Day.friday },
  ];
  const [dayOption, setDayOption] = useState<Option>(dayOptions[0]);

  // Colors
  const gradient = useMemo(
    () =>
      interpolateColors(totalPages, [
        Colors.PALE_BLUE,
        Colors.PALE_VIOLET,
        Colors.PALE_GREEN,
      ]),
    [totalPages]
  );

  const HIGHLIGHT_COLOR = page ? gradient[page] : Colors.PALE_BLUE;
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

      if (pageNum > 0) {
        const session = program.sessions[pageNum - 1];
        // alert(
        //   `page: ${pageNum} week: ${session.week} day: ${session.day} weekOption: ${weekOption.id} dayOption: ${dayOption.id}`
        // );

        if (dayOption.id !== session.week) {
          setWeekOption(weekOptions[session.week - 1]);
        }

        if (weekOption.id !== session.day) {
          setDayOption(dayOptions[session.day - 1]);
        }
      }

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
    if (!pageLoaded) setPageLoaded(true);
  };

  const handleCheck = useCallback(async (index: number) => {
    // const storedChecks = await getStorage(`@day_one_checks_${program.name}`);
    // const parsed = storedChecks ? JSON.parse(storedChecks) : null;
    // if (parsed) {
    //   const updatedChecks = [...parsed];
    //   updatedChecks[index] = !updatedChecks[index];
    //   setChecks(updatedChecks);
    //   setStorage(
    //     `@day_one_checks_${program.name}`,
    //     JSON.stringify(updatedChecks)
    //   );
    // }
  }, []);

  const handleReset = async () => {
    log(`CLEARING STORAGE (${program.name})`);
    await clearStorage();
    log(`STORAGE CLEARED`);
    closePanel();
    alert('App Reset');
    loadStorage(defaultProgram);
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
    log(`PROGRAM CHANGE TO ${selectedProgram.name}`);

    const shouldChange = selectedProgram.name !== program.name;
    log(
      `SHOULD CHANGE: ${shouldChange} (OLD: ${program.name}) vs. NEW ${selectedProgram.name}) `
    );

    if (shouldChange) {
      loadStorage(selectedProgram);
    }
  };

  // LOADERS
  const loadStorage = async (selectedProgram: Program) => {
    log('CHECKING FOR:', selectedProgram.name);

    const storedProgram = await getStorage(
      `@day_one_program_${selectedProgram.name}`
    );
    const parsedProgram = storedProgram ? JSON.parse(storedProgram) : null;

    log(`${selectedProgram.name} IS ${parsedProgram ? '' : 'NOT'} STORED`);

    if (parsedProgram) {
      log(`SETTING ${parsedProgram.name}`);
      setProgram(parsedProgram);
      setPageLoaded(true);
    } else {
      log(`CLONING ${selectedProgram.name}`);
      const _program = cloneDeep(selectedProgram);
      _program.sessions = _program.sessions.map(session => ({
        ...session,
        complete: false,
        lifts: session.lifts.map(lift => ({
          ...lift,
          complete: false,
        })),
      }));
      log(`NOW STORING ${_program.name}`);
      await setStorage(
        `@day_one_program_${_program.name}`,
        JSON.stringify(_program)
      );
      log(`AND SETTING ${_program.name}`);
      setProgram(_program);
      setPageLoaded(true);
    }
  };

  // EFFECTS
  // useEffect(() => {
  //   const currentDay = program.sessions[page - 1]?.day;
  //   const index = findIndex(program.sessions, {
  //     week: weekOption.id,
  //     day: currentDay,
  //   });
  //   if (page !== index + 1) {
  //     handlePageNav(index + 1);
  //   }
  // }, [weekOption]);

  // useEffect(() => {
  //   const currentDay = dayOption.id;
  //   const index = findIndex(program.sessions, {
  //     week: weekOption.id,
  //     day: currentDay,
  //   });
  //   if (page !== index + 1) {
  //     handlePageNav(index + 1);
  //   }
  // }, [dayOption]);

  useEffect(() => {
    log('INIT...');
    loadStorage(program);
  }, []);

  log('RENDERED:', program.name);

  if (!pageLoaded) {
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
      ref={drawerRef}
      styles={{
        main: {},
        drawer: {},
        drawerOverlay: {
          borderRightColor: HIGHLIGHT_COLOR,
          borderRightWidth: 1,
        },
        mainOverlay: {},
      }}
      type="static"
      tapToClose={true}
      panCloseMask={0.2}
      openDrawerOffset={0.2}
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
                maxes={program.maxes}
                week={session.week}
                complete={session.complete}
                day={session.day}
                notes={session.notes}
                lifts={session.lifts}
                page={page}
                scrollX={scrollX}
                highlightColor={HIGHLIGHT_COLOR}
                handleCheck={() => handleCheck(index)}
                weekOptions={weekOptions}
                weekOption={weekOption}
                setWeekOption={setWeekOption}
                dayOptions={dayOptions}
                dayOption={dayOption}
                setDayOption={setDayOption}
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
