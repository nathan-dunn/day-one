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

export class Session {
  program: Program;
  date: WeekDayTuple;
  notes: string[];
  lifts: Lift[];

  constructor(
    program: Program,
    date: WeekDayTuple,
    notes: string[],
    lifts: Lift[]
  ) {
    this.program = program;
    this.date = date;
    this.notes = notes;
    this.lifts = lifts;
  }
}

export class Program {
  date: WeekDayTuple;
  name: string;
  notes: string[];
  sessions: Session[] = [];

  constructor(name: string, notes: string[]) {
    this.date = [0, 0];
    this.name = name;
    this.notes = notes;
  }

  addSession(date: WeekDayTuple, notes: string[], lifts: Lift[]): Program {
    const session = new Session(this, date, notes, lifts);
    this.sessions.push(session);
    return this;
  }
}
