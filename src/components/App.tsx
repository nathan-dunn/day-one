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
  Text,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Drawer from 'react-native-drawer';
import Session from './Session';
import data from '../data';
import { WHITE, LIGHT_BLACK, DARK_BLACK } from '../constants';
import styles from '../styles';

const { width } = Dimensions.get('window');

enum Mode {
  dark = 'dark',
  light = 'light',
}

// console.log(JSON.stringify(data, null, 2));

type MaxesType = {
  squat: number;
  bench: number;
  deadlift: number;
  press: number;
};

type ControlPanelProps = {
  onOptionSelected?: (option: string) => void;
  onClose: () => void;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  setMaxesIndex: React.Dispatch<React.SetStateAction<Mode>>;
};

const ControlPanel: React.FC<ControlPanelProps> = ({
  onClose,
  mode,
  setMode,
  setMaxesIndex,
}) => {
  return (
    <SafeAreaView
      style={[
        styles.controlPanelContainer,
        { backgroundColor: mode === Mode.light ? WHITE : LIGHT_BLACK },
      ]}
    >
      <View
        style={{
          justifyContent: 'flex-start',
          alignSelf: 'flex-start',
        }}
      >
        <Feather
          name={'x'}
          size={24}
          color={mode === Mode.light ? LIGHT_BLACK : WHITE}
          alignSelf="flex-end"
          padding={20}
          onPress={onClose}
        />
      </View>

      <View
        style={{
          justifyContent: 'flex-start',
          alignSelf: 'flex-start',
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <Feather
          name={mode === Mode.light ? 'sun' : 'moon'}
          size={24}
          color={mode === Mode.light ? LIGHT_BLACK : WHITE}
          // alignSelf="flex-end"
          paddingHorizontal={0}
          paddingVertical={10}
          onPress={() => {
            setMode(p => (p === Mode.light ? Mode.dark : Mode.light));
            onClose();
          }}
        />
        <Text
          style={[
            styles.controlPanelOption,
            { color: mode === Mode.light ? LIGHT_BLACK : WHITE },
          ]}
          onPress={() => {
            setMaxesIndex(0);
            onClose();
          }}
        >
          BLANK
        </Text>
        <Text
          style={[
            styles.controlPanelOption,
            { color: mode === Mode.light ? LIGHT_BLACK : WHITE },
          ]}
          onPress={() => {
            setMaxesIndex(1);
            onClose();
          }}
        >
          BECCA
        </Text>
        <Text
          style={[
            styles.controlPanelOption,
            { color: mode === Mode.light ? LIGHT_BLACK : WHITE },
          ]}
          onPress={() => {
            setMaxesIndex(2);
            onClose();
          }}
        >
          NATE
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  const flatListRef = useRef<FlatList>(null);
  const _scrollX = useRef(new Animated.Value(0)).current;

  const drawerRef = useRef<Drawer>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const len = data.sessions.length;
  const [mode, setMode] = useState<Mode>(Mode.light);

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('@day_one', value);
    } catch (e) {
      console.error(e);
    }
  };

  const maxesArray: MaxesType[] = [
    {
      squat: 0,
      bench: 0,
      deadlift: 0,
      press: 0,
    },
    {
      squat: 140,
      bench: 115,
      deadlift: 160,
      press: 80,
    },
    {
      squat: 335,
      bench: 285,
      deadlift: 385,
      press: 160,
    },
  ];

  const [maxesIndex, setMaxesIndex] = useState<number>(0);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@day_one');
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@day_one');
    } catch (e) {
      console.error(e);
    }
  };

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
    const nextIndex = currentIndex === len - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);

    flatListRef.current?.scrollToOffset({
      offset: nextIndex * width,
      animated: true,
    });
  };

  const closeControlPanel = () => {
    if (drawerRef.current) {
      drawerRef.current.close();
    }
  };

  const openControlPanel = () => {
    if (drawerRef.current) {
      drawerRef.current.open();
    }
  };

  useEffect(() => {
    const stored = getData();
    console.log('stored:', stored);
  }, []);

  const BACKGROUND_COLOR = mode === Mode.light ? WHITE : DARK_BLACK;

  const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    main: { paddingLeft: 3 },
  };

  return (
    <Drawer
      // open={true}
      ref={drawerRef}
      type="static"
      content={
        <ControlPanel
          mode={mode}
          setMode={setMode}
          onClose={closeControlPanel}
          setMaxesIndex={setMaxesIndex}
        />
      }
      openDrawerOffset={100}
      styles={drawerStyles}
      // tweenHandler={Drawer.tweenPresets.parallax}
    >
      <SafeAreaView
        style={[styles.container, { backgroundColor: BACKGROUND_COLOR }]}
      >
        <StatusBar style="auto" />

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            width: '100%',
            paddingLeft: 16,
          }}
        >
          <Feather
            name={'settings'}
            size={24}
            color={mode === Mode.light ? LIGHT_BLACK : WHITE}
            padding={20}
            onPress={openControlPanel}
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
          data={data.sessions}
          renderItem={({ item, index }) => (
            <Session
              {...item}
              index={index}
              scrollX={_scrollX}
              mode={mode}
              handleLongPress={handleLongPress}
              maxes={maxesArray[maxesIndex]}
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
  );
}
