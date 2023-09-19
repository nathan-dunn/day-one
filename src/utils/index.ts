import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('@day_one');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};

export const putStorage = async (value: string) => {
  try {
    await AsyncStorage.setItem('@day_one', value);
  } catch (e) {
    console.error(e);
  }
};

export const removeStorage = async () => {
  try {
    await AsyncStorage.removeItem('@day_one');
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
  date: [number, number];
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
