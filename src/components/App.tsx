import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
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

export default function App() {
  const [program] = useState(programs[0]);

  const programData = [
    { name: program.name, notes: program.notes, sessionId: program.sessionId },
    ...program.sessions,
  ];
  const sessionsCount = program.sessions.length;

  const [mode, setMode] = useState<Mode | undefined>(undefined);
  const [checks, setChecks] = useState<boolean[]>([]);
  const BACKGROUND_COLOR =
    mode === Mode.light ? colors.WHITE : colors.DARK_BLACK;
  const PRIMARY_COLOR = mode === Mode.light ? colors.LIGHT_BLACK : colors.WHITE;

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
  };

  const handlePageNav = (index: number) => {
    flatListRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
  };

  const handleCheck = async (index: number) => {
    const storedChecks = await getStorage('@day_one_checks');
    const parsed = storedChecks ? JSON.parse(storedChecks) : null;
    if (parsed) {
      const newChecks = [...parsed];
      newChecks[index] = !newChecks[index];
      setChecks(newChecks);
      setStorage('@day_one_checks', JSON.stringify(newChecks));
    }
  };

  const handleNavPress = (index: number) => {
    handlePageNav(index + 1);
    setPage(index + 1);
    setStorage('@day_one_page', String(index + 1));
  };

  const handleReset = async () => {
    await removeStorage('@day_one_checks');
    await removeStorage('@day_one_mode');
    await removeStorage('@day_one_page');
    await removeStorage('@day_one_maxes');

    loadStoredMode();
    loadStoredPage();
    loadChecks();
    loadMaxes();

    alert('App Reset');
  };

  const loadStoredPage = async () => {
    const storedPage = await getStorage('@day_one_page');
    const parsed = storedPage ? parseInt(storedPage, 10) : null;

    if (parsed) {
      setPage(parsed);
    } else {
      const _page = 0;
      setPage(_page);
      await setStorage('@day_one_page', String(_page));
    }
  };

  const loadChecks = async () => {
    const storedChecks = await getStorage('@day_one_checks');
    const parsed = storedChecks ? JSON.parse(storedChecks) : null;

    if (parsed) {
      setChecks(parsed);
      const currentSession = findSession(parsed);
      handlePageNav(currentSession);
    } else {
      const _checks = new Array(sessionsCount + 1).fill(false);
      setChecks(_checks);
      await setStorage('@day_one_checks', JSON.stringify(_checks));
      handlePageNav(1);
    }
  };

  const loadStoredMode = async () => {
    const storedMode = await getStorage('@day_one_mode');
    if (isMode(storedMode)) {
      setMode(storedMode);
    } else {
      setMode(Mode.dark);
      await setStorage('@day_one_mode', Mode.dark);
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

  // init
  useEffect(() => {
    loadStoredMode();
    loadChecks();
    loadStoredPage();
    loadMaxes();
  }, []);

  return (
    mode && (
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
          loadMaxes();
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
              padding={20}
              onPress={openPanel}
            />
          </View>

          <Animated.FlatList
            ref={flatListRef}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            horizontal
            pagingEnabled
            keyExtractor={item => item.sessionId.toString()}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: _scrollX } } }],
              { useNativeDriver: true }
            )}
            data={programData}
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
    paddingLeft: 10,
  },
});
