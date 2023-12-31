import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Checkbox from './index';

jest.mock('@expo/vector-icons', () => ({
  Feather: '',
}));

describe('<Checkbox />', () => {
  test.skip('renders the circle icon when not complete', () => {
    const { getByTestId } = render(
      <Checkbox color="red" complete={false} handleComplete={() => {}} />
    );
    const icon = getByTestId('checkbox-icon');
    expect(icon.props.name).toBe('circle');
  });

  test.skip('renders the check-circle icon when complete', () => {
    const { getByTestId } = render(
      <Checkbox color="red" complete={true} handleComplete={() => {}} />
    );
    const icon = getByTestId('checkbox-icon');
    expect(icon.props.name).toBe('check-circle');
  });

  test('fires handleComplete function when pressed', () => {
    const handleCompleteMock = jest.fn();
    const { getByTestId } = render(
      <Checkbox
        color="red"
        complete={false}
        handleComplete={handleCompleteMock}
      />
    );
    const checkboxTouchable = getByTestId('checkbox-touchable');
    fireEvent.press(checkboxTouchable);
    expect(handleCompleteMock).toHaveBeenCalled();
  });
});
