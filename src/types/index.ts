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

export type RxType = {
  sets?: number | string;
  reps: number | string;
  perc?: number;
};

export type LiftType = {
  name: string;
  notes: string[];
  rxs: RxType[];
};

export type SessionType = {
  sessionId: [number, number];
  notes: string[];
  lifts: LiftType[];
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
