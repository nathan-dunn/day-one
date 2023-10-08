import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Animated } from 'react-native';
import SessionHeader from './index';

jest.mock('@expo/vector-icons', () => ({
  Feather: '',
}));

// Mock Animated dependencies
// jest.mock('react-native', () => {
//   const originalModule = jest.requireActual('react-native');
//   return {
//     ...originalModule,
//     Animated: {
//       ...originalModule.Animated,
//       timing: (value, config) => ({
//         start: callback => {
//           value.setValue(config.toValue);
//           if (callback && typeof callback === 'function') {
//             callback();
//           }
//         },
//       }),
//       Value: originalModule.Animated.Value,
//       interpolate: jest.fn(),
//     },
//   };
// });

describe.skip('SessionHeader Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    complete: false,
    day: 1,
    dayOptions: [1, 2, 3],
    handleComplete: jest.fn(),
    BG_1: '#FFFFFF',
    BG_2: '#DDDDDD',
    TEXT_1: '#000000',
    TEXT_2: '#888888',
    index: 0,
    onDayChange: jest.fn(),
    onWeekChange: jest.fn(),
    opacity: new Animated.Value(0),
    translateFast: new Animated.Value(0),
    translateSlow: new Animated.Value(0),
    week: 1,
    weekOptions: [1, 2, 3],
  };

  test('renders correctly', () => {
    const { getByText } = render(<SessionHeader {...defaultProps} />);
    expect(getByText('Week 1')).toBeTruthy();
  });

  test('triggers handleComplete on Checkbox press', () => {
    const { getByTestId } = render(<SessionHeader {...defaultProps} />);
    const checkbox = getByTestId('checkbox'); // Assuming you have testID="checkbox" on Checkbox

    act(() => {
      fireEvent.press(checkbox);
    });
    expect(defaultProps.handleComplete).toHaveBeenCalled();
  });
});
