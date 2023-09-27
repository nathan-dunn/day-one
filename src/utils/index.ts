import AsyncStorage from '@react-native-async-storage/async-storage';
import { Program, Session, Maxes, Colors, Exercises, Theme } from '../types';

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

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error(e);
  }
};

export function roundTo(num: number, nearest: number): number {
  return Math.round(num / nearest) * nearest;
}

export function findMaxesNeeded(sessions: Session[]): Maxes {
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
  const maxesNeeded: Maxes = {
    [Exercises.SQUAT]: 0,
    [Exercises.BENCH]: 0,
    [Exercises.DEADLIFT]: 0,
    [Exercises.PRESS]: 0,
  };

  for (const liftName of liftNames) {
    maxesNeeded[liftName] = 0;
  }

  return maxesNeeded;
}

export function findLastCompleted(program: Program): number {
  const { sessions } = program;

  // if none completed return first session
  if (sessions.every(session => !session.complete)) {
    return 0;
  }

  // if last session is complete return first session
  if (sessions[sessions.length - 1].complete) {
    return 0;
  }

  // find the last completed session
  for (let i = sessions.length - 1; i >= 1; i--) {
    if (sessions[i].complete) {
      return i;
    }
  }

  return 0;
}

export const getColor = (theme: Theme): string => {
  const themes = {
    BG_1: Colors.LIGHT_SPACE,
    // BG_2: Colors.DARK_GRAY,
    BG_2: Colors.DARK_SPACE,
    BG_3: Colors.PALE_VIOLET,
    BG_4: Colors.PALE_BLUE,

    TEXT_1: Colors.WHITE,
    TEXT_2: Colors.WHITE,
    // TEXT_3: Colors.LIGHT_GRAY,
    TEXT_3: Colors.WHITE,
    // TEXT_4: Colors.DARK_BLACK,
    TEXT_4: Colors.WHITE,
    // TEXT_5: Colors.DARK_GRAY,
    TEXT_5: Colors.WHITE,
  };

  return themes[theme] || Colors.PINK;
};

const hexToRgb = (hex: string): [number, number, number] => {
  // Remove the hash at the start if it's there
  hex = hex.charAt(0) === '#' ? hex.slice(1) : hex;

  // Parse r, g, b values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    '#' +
    ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()
  );
};

export const interpolateColors = (n: number, Colors: string[]): string[] => {
  if (Colors.length < 2)
    throw new Error('Need at least two Colors to interpolate');

  const segments = Colors.length - 1; // the number of segments between Colors
  const stepsPerSegment = Math.floor(n / segments); // calculate how many steps per each segment
  const remainder = n - stepsPerSegment * segments; // remainder if n is not divisible by segments

  const output: string[] = [];

  for (let i = 0; i < segments; i++) {
    const color1 = Colors[i];
    const color2 = Colors[i + 1];

    // Calculate how many steps for the current segment, adding remainder to the last segment
    const steps =
      i === segments - 1 ? stepsPerSegment + remainder : stepsPerSegment;

    const [r1, g1, b1] = hexToRgb(color1);
    const [r2, g2, b2] = hexToRgb(color2);

    for (let j = 0; j < steps; j++) {
      const t = j / (steps - 1);

      const r = r1 + (r2 - r1) * t;
      const g = g1 + (g2 - g1) * t;
      const b = b1 + (b2 - b1) * t;

      output.push(rgbToHex(Math.round(r), Math.round(g), Math.round(b)));
    }
  }

  return output;
};

export const findIncrement = (exercise: string): number => {
  if (['BENCH', 'PRESS'].includes(exercise)) return 2.5;
  if (['SQUAT', 'DEADLIFT'].includes(exercise)) return 5;
  return 5;
};

export const makeRange = (
  start: number,
  end: number,
  increment: number
): number[] => {
  // Validate the arguments
  if (increment === 0) throw new Error('Increment cannot be 0');
  if ((start < end && increment < 0) || (start > end && increment > 0))
    throw new Error('Invalid increment value for the given range');

  const result: number[] = [];
  if (start < end) {
    for (let i = start; i <= end; i += increment) {
      result.push(i);
    }
  } else {
    for (let i = start; i >= end; i += increment) {
      result.push(i);
    }
  }

  return result;
};
