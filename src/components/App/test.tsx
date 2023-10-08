import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from './index';

jest.mock('@expo/vector-icons', () => ({
  Feather: '',
}));

describe('<App />', () => {
  test('should display splash screen when page is not loaded', () => {
    const { getByTestId } = render(<App />);
    const splashImage = getByTestId('splash-image');
    expect(splashImage).toBeTruthy();
  });

  test('should render main view once page is loaded', async () => {
    const { getByTestId } = render(<App />);
    // Assuming that the loading delay is 1000ms
    await waitFor(() => getByTestId('main-view'), { timeout: 1100 });
    expect(getByTestId('main-view')).toBeTruthy();
  });

  test('should open the drawer panel when menu icon is pressed', async () => {
    const { getByTestId } = render(<App />);
    await waitFor(() => getByTestId('main-view'), { timeout: 1100 });
    const menuIcon = getByTestId('menu-icon');
    fireEvent.press(menuIcon);
    // Assuming that the drawer has a testID of 'drawer-panel'
    expect(getByTestId('drawer-panel')).toBeTruthy();
  });

  test('should close the drawer panel', async () => {
    const { getByTestId, queryByTestId } = render(<App />);
    await waitFor(() => getByTestId('main-view'), { timeout: 1100 });
    const closeIcon = getByTestId('close-icon'); // You'll need to assign a testID to your close icon in the Drawer
    fireEvent.press(closeIcon);
    const drawerPanel = queryByTestId('drawer-panel');
    expect(drawerPanel).toBeNull();
  });

  // You can add more tests for functions like handleWeekChange, handleDayChange, handleComplete, and so on

  // Example:
  test('should navigate to a specific session on week change', async () => {
    const { getByTestId } = render(<App />);
    const weekChangeButton = getByTestId('week-change-button'); // Assign testID to your week change button
    fireEvent.press(weekChangeButton);
    // Expect some state change or UI change
    const specificSession = getByTestId('specific-session'); // Assign testID to your specific session or its header
    expect(specificSession).toBeTruthy();
  });
});
