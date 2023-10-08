import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Panel from './index';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@expo/vector-icons', () => ({
  Feather: '',
}));

const mockProgram = {
  name: 'Mock Program',
  shortName: 'MP',
  notes: ['Some notes'],
  maxes: { SQUAT: 0, BENCH: 0, DEADLIFT: 0, PRESS: 0 },
  sessions: [],
};

const mockProps = {
  onClose: jest.fn(),
  handleReset: jest.fn(),
  onProgramChange: jest.fn(),
  onMaxChange: jest.fn(),
  BG_1: 'red',
  BG_2: 'blue',
  TEXT_1: 'white',
  TEXT_2: 'black',
  program: mockProgram,
};

test.skip('renders the provided program name', () => {
  const { getByText } = render(<Panel {...mockProps} />);
  expect(getByText(mockProps.program.name)).toBeTruthy();
});

test.skip('renders the maxes values', () => {
  const { getByText } = render(<Panel {...mockProps} />);
  Object.values(mockProps.program.maxes).forEach(max => {
    expect(getByText(String(max))).toBeTruthy();
  });
});

test.skip('calls handleReset on long press', () => {
  const { getByTestId } = render(<Panel {...mockProps} />);
  const closeButton = getByTestId('close-button');
  fireEvent(closeButton, 'longPress');
  expect(mockProps.handleReset).toHaveBeenCalled();
});

test.skip('shows the max picker on pressing a max row', () => {
  const { getByText, queryByText } = render(<Panel {...mockProps} />);
  const squatRow = getByText('squat');
  fireEvent.press(squatRow);
  expect(queryByText('100')).toBeTruthy(); // this assumes "100" is one of the options in the picker
});
