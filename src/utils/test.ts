import {
  getStorage,
  setStorage,
  removeStorage,
  clearStorage,
  roundTo,
  findMaxesNeeded,
  findLastCompleted,
  interpolateColors,
  generateTintsAndShades,
  findIncrement,
  makeRange,
} from './index'; // adjust the path accordingly
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('Utility Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('gets value from storage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('test_value');
    const value = await getStorage('test_key');
    expect(value).toBe('test_value');
  });

  test('sets value in storage', async () => {
    await setStorage('test_key', 'test_value');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('test_key', 'test_value');
  });

  test('removes value from storage', async () => {
    await removeStorage('test_key');
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('test_key');
  });

  test('clears the storage', async () => {
    await clearStorage();
    expect(AsyncStorage.clear).toHaveBeenCalled();
  });

  test('rounds a number to the nearest value', () => {
    expect(roundTo(53, 5)).toBe(55);
    expect(roundTo(52, 5)).toBe(50);
  });

  test('finds maxes needed for sessions', () => {});

  test('finds the last completed session', () => {});

  test('interpolates colors', () => {
    const colors = ['#FFFFFF', '#000000'];
    const result = interpolateColors(3, colors);
    expect(result).toEqual(['#FFFFFF', '#808080', '#000000']);
  });

  test('generates tints and shades', () => {
    const color = '#808080';
    const result = generateTintsAndShades(3, color);
  });

  test('finds the increment for exercises', () => {
    expect(findIncrement('BENCH')).toBe(2.5);
    expect(findIncrement('SQUAT')).toBe(5);
  });

  test('makes a range of numbers', () => {
    expect(makeRange(1, 5, 1)).toEqual([1, 2, 3, 4, 5]);
    expect(makeRange(5, 1, -1)).toEqual([5, 4, 3, 2, 1]);
  });
});
