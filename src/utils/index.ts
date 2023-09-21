import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionType, MaxesType } from '../types';

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

  // short cut
  if (checks[checks.length - 1] === true) {
    return 0;
  }
  // skip the first session (intro page)
  for (let i = checks.length - 1; i >= 1; i--) {
    if (checks[i] === true && checks[i + 1] === false) {
      return i + 1;
    }
  }

  return 1;
}
