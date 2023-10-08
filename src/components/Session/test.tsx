import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Animated } from 'react-native';
import Session from './index';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const mockProgram = {
  name: 'Mock Program',
  shortName: 'MP',
  notes: ['Some notes'],
  maxes: { SQUAT: 0, BENCH: 0, DEADLIFT: 0, PRESS: 0 },
  sessions: [],
};

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
//       // Add other necessary mocks
//     },
//   };
// });

describe.skip('Session Component', () => {
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
    lifts: [],
    notes: [],
    onDayChange: jest.fn(),
    onWeekChange: jest.fn(),
    page: 0,
    program: mockProgram,
    scrollX: new Animated.Value(0),
    week: 1,
    weekOptions: [1, 2, 3],
    collapsed: false,
    handleCollapsedChange: jest.fn(),
  };

  test('renders correctly', () => {
    const { getByText } = render(<Session {...defaultProps} />);
    expect(getByText('Session Notes')).toBeTruthy();
  });

  test('triggers handleCollapsedChange on long press', () => {
    const { getByText } = render(<Session {...defaultProps} />);
    const sessionContent = getByText('Session Notes');

    act(() => {
      fireEvent(sessionContent, 'longPress');
    });
    expect(defaultProps.handleCollapsedChange).toHaveBeenCalledWith(true);
  });
});
