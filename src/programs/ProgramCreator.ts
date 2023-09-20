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
  sessionId: WeekDayTuple;
  notes: string[];
  lifts: Lift[];

  constructor(sessionId: WeekDayTuple, notes: string[], lifts: Lift[]) {
    this.sessionId = sessionId;
    this.notes = notes;
    this.lifts = lifts;
  }
}

export class Program {
  sessionId: WeekDayTuple;
  name: string;
  notes: string[];
  sessions: Session[] = [];

  constructor(name: string, notes: string[]) {
    this.sessionId = [0, 0];
    this.name = name;
    this.notes = notes;
  }

  addSession(sessionId: WeekDayTuple, notes: string[], lifts: Lift[]): Program {
    const session = new Session(sessionId, notes, lifts);
    this.sessions.push(session);
    return this;
  }
}
