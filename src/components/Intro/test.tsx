import React from 'react';
import { Animated } from 'react-native';
import { render } from '@testing-library/react-native';
import Intro from './index';

test('renders the provided name', () => {
  const testProps = {
    index: 0,
    name: 'Test Name',
    notes: ['Note 1', 'Note 2'],
    scrollX: new Animated.Value(0),
    BG_1: 'red',
    BG_2: 'blue',
    TEXT_1: 'white',
    TEXT_2: 'black',
    page: 1,
  };

  const { getByText } = render(<Intro {...testProps} />);
  expect(getByText(testProps.name)).toBeTruthy();
});

test('renders the provided notes', () => {
  const testProps = {
    index: 0,
    name: 'Test Name',
    notes: ['Note 1', 'Note 2'],
    scrollX: new Animated.Value(0),
    BG_1: 'red',
    BG_2: 'blue',
    TEXT_1: 'white',
    TEXT_2: 'black',
    page: 1,
  };

  const { getByText } = render(<Intro {...testProps} />);
  testProps.notes.forEach(note => {
    expect(getByText(note)).toBeTruthy();
  });
});
