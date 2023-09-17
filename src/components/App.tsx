import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewToken,
} from 'react-native';
import data from '../data/data';

enum Mode {
  dark = 'dark',
  light = 'light',
}

const MODE = Mode.light;

const DARK_BLACK = '#222';
const LIGHT_BLACK = '#444';
const WHITE = '#fff';
const GRAY = '#aaa';

const BACKGROUND_COLOR = MODE === Mode.light ? WHITE : DARK_BLACK;
const PRIMARY_TEXT = MODE === Mode.light ? LIGHT_BLACK : WHITE;
const SECONDARY_TEXT = MODE === Mode.light ? GRAY : GRAY;

// console.log(JSON.stringify(data, null, 2));

type AniLineProps = {
  style: StyleProp<TextStyle>;
  opacity: Animated.AnimatedInterpolation<number>;
  translateX: Animated.AnimatedInterpolation<number>;
};

function AniLine({ style, opacity, translateX }: AniLineProps) {
  return (
    <Animated.View style={[style, { opacity, transform: [{ translateX }] }]} />
  );
}

const { width, height } = Dimensions.get('window');

type OnViewableItemsChangedType = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
};

type AniTextProps = {
  text: string;
  style: StyleProp<TextStyle>;
  opacity: Animated.AnimatedInterpolation<number>;
  translateX: Animated.AnimatedInterpolation<number>;
};

const AniText = ({ text, style, opacity, translateX }: AniTextProps) => {
  return (
    <Animated.Text style={[style, { opacity, transform: [{ translateX }] }]}>
      {text}
    </Animated.Text>
  );
};

type RxType = {
  sets?: number | string;
  reps: number | string;
  perc?: number;
};

type LiftType = {
  name: string;
  notes: string;
  rxs: RxType[];
};

type SessionProps = {
  week: number | string;
  day: number | string;
  notes: string;
  lifts: LiftType[];
  index: number;
  scrollX: Animated.Value;
};

const Session = ({
  week,
  day,
  notes,
  lifts,
  scrollX,
  index: sessionIndex,
}: SessionProps) => {
  const inputRange = [
    (sessionIndex - 1) * width,
    sessionIndex * width,
    (sessionIndex + 1) * width,
  ];
  const opacityInputRange = [
    (sessionIndex - 0.4) * width,
    sessionIndex * width,
    (sessionIndex + 0.4) * width,
  ];
  const opacity: Animated.AnimatedInterpolation<number> = scrollX.interpolate({
    inputRange: opacityInputRange,
    outputRange: [0, 1, 0],
  });
  const translateXWeek: Animated.AnimatedInterpolation<number> =
    scrollX.interpolate({
      inputRange,
      outputRange: [width * 0.1, 0, -width * 0.1],
    });
  const translateXDay: Animated.AnimatedInterpolation<number> =
    scrollX.interpolate({
      inputRange,
      outputRange: [width, 0, -width],
    });
  const translateXNotes: Animated.AnimatedInterpolation<number> = translateXDay;
  const translateXLine: Animated.AnimatedInterpolation<number> = translateXDay;

  return (
    <ScrollView contentContainerStyle={styles.sessionContainer}>
      <View style={styles.textContainer}>
        <AniText
          text={`Week ${week}`}
          style={styles.week}
          opacity={opacity}
          translateX={translateXWeek}
        />
        <AniText
          text={`Day ${day}`}
          style={styles.day}
          opacity={opacity}
          translateX={translateXDay}
        />
        <AniLine
          style={styles.line}
          opacity={opacity}
          translateX={translateXLine}
        />

        <View style={styles.liftContainer}>
          {lifts.map(({ name, notes, rxs }, liftIndex) => {
            return (
              <View
                style={[
                  styles.liftSubContainer,
                  { paddingBottom: liftIndex === lifts.length - 1 ? 0 : 50 },
                ]}
                key={liftIndex}
              >
                <AniText
                  text={name}
                  style={styles.lift}
                  opacity={opacity}
                  translateX={translateXWeek}
                />
                <View style={styles.rxContainer}>
                  {rxs.map(({ sets, reps, perc }, rxIndex) => {
                    return (
                      <AniText
                        key={rxIndex}
                        text={
                          perc
                            ? `${perc * 100}% x ${sets} x ${reps}`
                            : `${sets} x ${reps}`
                        }
                        style={styles.rx}
                        opacity={opacity}
                        translateX={translateXDay}
                      />
                    );
                  })}
                </View>

                <View style={styles.notesContainer}>
                  {notes
                    .split('.')
                    .filter(note => note)
                    .map((note, noteIndex) => {
                      return (
                        <View key={noteIndex} style={styles.subNotesContainer}>
                          <AniText
                            text={'•'}
                            style={styles.bullet}
                            opacity={opacity}
                            translateX={translateXNotes}
                          />

                          <AniText
                            text={note.trim()}
                            style={styles.note}
                            opacity={opacity}
                            translateX={translateXNotes}
                          />
                        </View>
                      );
                    })}
                </View>
              </View>
            );
          })}
        </View>

        <AniLine
          style={styles.line}
          opacity={opacity}
          translateX={translateXLine}
        />

        <AniText
          text={notes}
          style={styles.day}
          opacity={opacity}
          translateX={translateXNotes}
        />
      </View>
    </ScrollView>
  );
};

export default function App() {
  const _scrollX = React.useRef(new Animated.Value(0)).current;

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    return { contentOffset, viewSize, pageNum };
  };

  const onViewableItemsChanged = ({
    viewableItems,
    changed,
  }: OnViewableItemsChangedType) => {
    console.log('onViewableItemsChanged:', { viewableItems, changed });
    const { index } = viewableItems[0];

    return { viewableItems, changed };
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Animated.FlatList
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        horizontal
        keyExtractor={item => `${item.week}${item.day}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: _scrollX } } }],
          { useNativeDriver: true }
        )}
        data={data.sessions}
        renderItem={({ item, index }) => {
          return <Session {...item} index={index} scrollX={_scrollX} />;
        }}
        onMomentumScrollEnd={onScrollEnd}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR,
    // overflowY: 'auto',
  },
  sessionContainer: {
    // height,
    width,
    paddingTop: 50,
    // paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'flex-start',
    flex: 0.85,
  },
  week: {
    color: PRIMARY_TEXT,
    textTransform: 'uppercase',
    textAlign: 'left',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 10,
  },
  day: {
    color: SECONDARY_TEXT,
    fontWeight: '600',
    textAlign: 'left',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 20,
    lineHeight: 16 * 1.5,
  },
  sessionNotes: {
    color: PRIMARY_TEXT,
    fontWeight: '600',
    textAlign: 'left',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  line: {
    height: 1,
    width: width * 0.8,
    backgroundColor: GRAY,
    marginVertical: 20,
  },
  liftSubContainer: {
    //
  },
  lift: {
    color: PRIMARY_TEXT,
    textTransform: 'uppercase',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 10,
  },
  rx: {
    color: SECONDARY_TEXT,
    fontWeight: '600',
    textAlign: 'left',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  notesContainer: {
    //
  },
  liftContainer: {
    //
  },
  subNotesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bullet: {
    color: SECONDARY_TEXT,
    fontWeight: '600',
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    width: 10,
    textAlign: 'center',
  },
  note: {
    color: SECONDARY_TEXT,
    fontWeight: '600',
    textAlign: 'left',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    marginLeft: -6,
  },
  rxContainer: {
    paddingBottom: 10,
  },
});
