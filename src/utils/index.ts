import AsyncStorage from '@react-native-async-storage/async-storage';

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

type Rx = {
  sets: number | string;
  reps: number | string;
  perc?: number;
};

type Lift = {
  rxs: Rx[];
  name: string;
  notes: string[];
};

type Session = {
  sessionId: [number, number];
  notes: string[];
  lifts: Lift[];
};

type MaxesType = {
  [key: string]: number;
};

export function findMaxesNeeded(sessions: Session[]): MaxesType {
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

// temp
export const maxesArray: MaxesType[] = [
  {
    squat: 0,
    bench: 0,
    deadlift: 0,
    press: 0,
  },
  {
    squat: 140,
    bench: 115,
    deadlift: 160,
    press: 80,
  },
  {
    squat: 335,
    bench: 285,
    deadlift: 385,
    press: 160,
  },
];
