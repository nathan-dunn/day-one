export class Rx {
  sets?: number | string;
  reps: number | string;
  perc?: number;

  constructor(sets: number | string, reps: number | string, perc?: number) {
    this.sets = sets;
    this.reps = reps;
    this.perc = perc;
  }
}

export class Lift {
  name: string;
  notes: string[];
  rxs: Rx[] = [];

  constructor(name: string, notes: string[], rxs: Rx[]) {
    this.name = name;
    this.notes = notes;
    this.rxs = rxs;
  }
}

type WeekDayTuple = [number, number];

class Session {
  date: WeekDayTuple;
  notes: string[];
  lifts: Lift[];

  constructor(date: WeekDayTuple, notes: string[], lifts: Lift[]) {
    this.date = date;
    this.notes = notes;
    this.lifts = lifts;
  }
}

export class Program {
  name: string;
  notes: string[];
  sessions: Session[] = [];

  constructor(name: string, notes: string[]) {
    this.name = name;
    this.notes = notes;
  }

  addSession(date: WeekDayTuple, notes: string[], lifts: Lift[]): Program {
    const session = new Session(date, notes, lifts);
    this.sessions.push(session);
    return this;
  }
}
