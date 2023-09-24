import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../constants';
import { SessionType, MaxesType, Mode, Theme } from '../types';

export const getStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};

export const setStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const removeStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};

export function roundTo(num: number, nearest: number): number {
  return Math.round(num / nearest) * nearest;
}

export function findMaxesNeeded(sessions: SessionType[]): MaxesType {
  const liftNamesWithPerc: string[] = [];

  for (const session of sessions) {
    for (const lift of session.lifts) {
      for (const rx of lift.rxs) {
        if (rx.perc !== undefined) {
          liftNamesWithPerc.push(lift.name);
          break;
        }
      }
    }
  }

  const liftNames = Array.from(new Set(liftNamesWithPerc));
  const maxesNeeded: MaxesType = {};

  for (const liftName of liftNames) {
    maxesNeeded[liftName] = 0;
  }

  return maxesNeeded;
}

export function findSession(checks: boolean[]): number {
  // find the first unchecked session after the last checked session

  // if no checks, go to first session
  if (checks.every(check => check === false)) {
    return 0;
  }

  // if last session checked, go to first session
  if (checks[checks.length - 1] === true) {
    return 0;
  }

  // skip the first session (intro page)
  for (let i = checks.length - 1; i >= 1; i--) {
    if (checks[i] === true && checks[i + 1] === false) {
      return i + 1;
    }
  }

  return 0;
}
export const getColor = (
  mode: Mode | undefined | null,
  theme: Theme
): string => {
  if (mode === null) mode = Mode.dark;

  const themes = {
    BG_1: mode === Mode.light ? colors.WHITE : colors.DARK_BLACK,
    BG_2: mode === Mode.light ? colors.DARK_GRAY : colors.DARK_GRAY,
    BG_3: mode === Mode.light ? colors.PALE_VIOLET : colors.PALE_VIOLET,
    BG_4: mode === Mode.light ? colors.PALE_BLUE : colors.PALE_BLUE,

    TEXT_1: mode === Mode.light ? colors.DARK_GRAY : colors.WHITE,
    TEXT_2: mode === Mode.light ? colors.DARK_BLACK : colors.WHITE,
    TEXT_3: mode === Mode.light ? colors.LIGHT_GRAY : colors.LIGHT_GRAY,
    TEXT_4: mode === Mode.light ? colors.WHITE : colors.DARK_BLACK,
  };

  return themes[theme] || colors.PINK;
};
