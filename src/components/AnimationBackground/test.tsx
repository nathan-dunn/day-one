import React from 'react';
import { render } from '@testing-library/react-native';
import { Animated } from 'react-native';
import AnimationBackground from './index';

// Mock Animated.timing
Animated.timing = jest.fn((value, config) => {
  return {
    start: jest.fn(callback => {
      value.setValue(config.toValue);
      if (callback && typeof callback === 'function') {
        callback();
      }
    }),
  };
});

describe('AnimationBackground Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders with initial page value', () => {
    const { getByTestId } = render(<AnimationBackground page={0} />);
    const lottieComponent = getByTestId('lottie-animation');
    expect(lottieComponent).toBeTruthy();
  });

  test('fadeIn is triggered when page changes from 0 to a higher value', () => {
    const { rerender } = render(<AnimationBackground page={0} />);

    rerender(<AnimationBackground page={1} />);

    expect(Animated.timing).toHaveBeenCalledWith(expect.any(Object), {
      useNativeDriver: true,
      toValue: 0.7,
      duration: 3000,
    });
  });

  test.skip('fadeOut is triggered when page changes to 0', () => {
    const { rerender } = render(<AnimationBackground page={1} />);

    rerender(<AnimationBackground page={0} />);

    expect(Animated.timing).toHaveBeenCalledWith(expect.any(Object), {
      useNativeDriver: true,
      toValue: 0,
    });
  });
});
