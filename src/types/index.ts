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
}

export type MaxesType = {
  [key: string]: number;
};

export type ColorType = {
  [key: string]: string;
};

export type RxType = {
  sets?: number | string;
  reps?: number | string;
  perc?: number;
};

export type LiftType = {
  name: string;
  notes: string[];
  rxs: RxType[];
};

export type SessionType = {
  week: number;
  day: number;
  notes: string[];
  lifts: LiftType[];
};

export type ProgramType = {
  name: string;
  notes: string[];
  sessions: SessionType[];
};

export function isMode(value: any): value is Mode {
  return Object.values(Mode).includes(value);
}

export function isMaxesType(obj: any): obj is MaxesType {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  for (const key in obj) {
    if (typeof obj[key] !== 'number') return false;
  }

  return true;
}

export const enum Theme {
  BG_1 = 'BG_1',
  BG_2 = 'BG_2',
  BG_3 = 'BG_3',
  BG_4 = 'BG_4',
  TEXT_1 = 'TEXT_1',
  TEXT_2 = 'TEXT_2',
  TEXT_3 = 'TEXT_3',
  TEXT_4 = 'TEXT_4',
}
