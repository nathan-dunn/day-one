import React, { useRef, useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import animationSource from '../../../assets/animations/waves.json';

const { width, height } = Dimensions.get('window');

type AnimationBackgroundProps = {
  page: number;
  showAnimation: boolean;
};

export default function AnimationBackground({
  page,
  showAnimation,
}: AnimationBackgroundProps) {
  const animationRef = useRef<LottieView>(null);

  const [fadeAnim] = useState<Animated.Value>(new Animated.Value(0));
  const [speed, setSpeed] = useState(-0.33);
  const [on, setOn] = useState(showAnimation);

  const fadeIn = (options = {}) => {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 3000,
      ...options,
    }).start();
  };

  const fadeOut = (options = {}) => {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 0,
      duration: 3000,
      ...options,
    }).start();
  };

  useEffect(() => {
    setTimeout(() => {
      if (on) {
        fadeOut({ duration: 6000 });
        setOn(!on);
      } else if (page > 0) {
        fadeIn({ duration: 3000 });
        setOn(!on);
      }
    }, 6000);
  }, [on]);

  useEffect(() => {
    if (!showAnimation || page === 0) fadeOut({ toValue: 0 });
    else if (showAnimation) fadeIn({ toValue: 0.7 });
  }, [page, showAnimation]);

  return (
    <Animated.View style={[styles.lottieContainer, { opacity: fadeAnim }]}>
      <LottieView
        testID="lottie-animation"
        ref={animationRef}
        style={[styles.lottie, { width: width * 4, height }]}
        source={animationSource}
        autoPlay={page > 0}
        loop={false}
        progress={0.5}
        speed={speed}
        onAnimationFinish={() => {
          setSpeed(p => p * -1);
          animationRef.current?.play();
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  lottieContainer: {
    overflow: 'hidden',
    padding: 0,
    margin: 0,
    position: 'absolute',
  },
  lottie: {},
});
