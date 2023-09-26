// ENUMS
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

export enum Theme {
  BG_1 = 'BG_1',
  BG_2 = 'BG_2',
  BG_3 = 'BG_3',
  BG_4 = 'BG_4',
  TEXT_1 = 'TEXT_1',
  TEXT_2 = 'TEXT_2',
  TEXT_3 = 'TEXT_3',
  TEXT_4 = 'TEXT_4',
  TEXT_5 = 'TEXT_5',
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
};

export type Session = {
  week: number;
  day: number;
  notes: string[];
  lifts: Lift[];
};

export type Program = {
  name: string;
  shortName?: string;
  notes: string[];
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
