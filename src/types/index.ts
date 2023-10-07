// ENUMS
export enum Exercises {
  SQUAT = 'squat',
  BENCH = 'bench',
  PRESS = 'press',
  DEADLIFT = 'deadlift',
  ROWS = 'rows',
  SLDL = 'stiff-leg deadlift',
  DIPS = 'dips',
  PUSHUPS = 'pushups',
  CHINS = 'chins',
  PULLUPS = 'pullups',
  ARMS = 'arms',
  DIPS_OR_PUSHUPS = `dips or pushups`,
  CHINS_OR_PULLUPS = `chins or pullups`,
}

export enum Colors {
  DARK_BLACK = '#222',
  MED_BLACK = '#333',
  LIGHT_BLACK = '#444',
  WHITE = '#F8F8F8',
  LIGHT_GRAY = '#AAA',
  DARK_GRAY = '#3D3D3D',
  MED_GRAY = '#777',
  BRICK = '#92282E',
  RED = '#BD1D26',
  PINK = '#E91E63',
  ORANGE = '#BD562D',
  PALE_BLUE = '#ABC4E7',
  PALE_VIOLET = '#D1D7EC',
  PALE_GREEN = '#B8D8BE',
  PALE_RED = '#E5BEBD',
  DARK_SPACE = '#313854',
  MED_SPACE = '#394473',
  LIGHT_SPACE = '#5666A3',
}

export enum Mode {
  dark = 'dark',
  light = 'light',
}

export enum Day {
  monday = 'Monday',
  tuesday = 'Tuesday',
  wednesday = 'Wednesday',
  thursday = 'Thursday',
  friday = 'Friday',
  saturday = 'Saturday',
  sunday = 'Sunday',
  mon = 'Mon',
  tue = 'Tue',
  wed = 'Wed',
  thu = 'Thu',
  fri = 'Fri',
  sat = 'Sat',
  sun = 'Sun',
}

// TYPES
export type Option = {
  id: number;
  item: string;
};

export type Maxes = {
  [key: string]: number;
};

export type Color = {
  [key: string]: string;
};

export type Rx = {
  sets?: number | string;
  reps?: number | string;
  perc?: number;
};

export type Lift = {
  name: string;
  notes: string[];
  rxs: Rx[];
  complete?: boolean;
};

export type Session = {
  week: number;
  day: number;
  notes: string[];
  lifts: Lift[];
  complete?: boolean;
};

export type Program = {
  name: string;
  shortName?: string;
  notes: string[];
  maxes: Maxes;
  sessions: Session[];
};

// TYPE GUARDS
export function isMode(value: any): value is Mode {
  return Object.values(Mode).includes(value);
}

export function isMaxes(obj: any): obj is Maxes {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  for (const key in obj) {
    if (typeof obj[key] !== 'number') return false;
  }

  return true;
}
