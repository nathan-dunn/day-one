import { Program, Lift, Rx } from './Program';
import {
  SQUAT,
  BENCH,
  ROWS,
  DIPS,
  PRESS,
  DEADLIFT,
  SLDL,
  CHINS,
  ARMS,
} from './constants';

export const program = new Program('GGW2', 'program notes');

// Week 1
program
  .addSession(
    1,
    1,
    '',
    new Lift(SQUAT, 'notes', new Rx(3, 5, 0.75)),
    new Lift(BENCH, 'notes', new Rx(3, 5, 0.75)),
    new Lift(ROWS, 'notes', new Rx(3, 5, 0.75)),
    new Lift(DIPS, 'notes', new Rx(3, 5, 0.75))
  )
  .addSession(
    1,
    2,
    '',
    new Lift(PRESS, 'notes', new Rx(3, 5, 0.75)),
    new Lift(DEADLIFT, 'notes', new Rx(3, 5, 0.75)),
    new Lift(SLDL, 'notes', new Rx(3, 5, 0.75))
  )
  .addSession(
    1,
    3,
    '',
    new Lift(SQUAT, 'notes', new Rx(3, 5, 0.75)),
    new Lift(BENCH, 'notes', new Rx(3, 5, 0.75)),
    new Lift(CHINS, 'notes', new Rx(3, 5, 0.75)),
    new Lift(ARMS, 'notes', new Rx(3, 5, 0.75))
  );

// Week 2
program
  .addSession(
    2,
    1,
    '',
    new Lift(SQUAT, 'notes', new Rx(3, 5, 0.75)),
    new Lift(BENCH, 'notes', new Rx(3, 5, 0.75)),
    new Lift(ROWS, 'notes', new Rx(3, 5, 0.75)),
    new Lift(DIPS, 'notes', new Rx(3, 5, 0.75))
  )
  .addSession(
    2,
    2,
    '',
    new Lift(PRESS, 'notes', new Rx(3, 5, 0.75)),
    new Lift(DEADLIFT, 'notes', new Rx(3, 5, 0.75)),
    new Lift(SLDL, 'notes', new Rx(3, 5, 0.75))
  )
  .addSession(
    2,
    3,
    '',
    new Lift(SQUAT, 'notes', new Rx(3, 5, 0.75)),
    new Lift(BENCH, 'notes', new Rx(3, 5, 0.75)),
    new Lift(CHINS, 'notes', new Rx(3, 5, 0.75)),
    new Lift(ARMS, 'notes', new Rx(3, 5, 0.75))
  );

// Week 3
program
  .addSession(
    3,
    1,
    '',
    new Lift(SQUAT, 'notes', new Rx(3, 5, 0.75)),
    new Lift(BENCH, 'notes', new Rx(3, 5, 0.75)),
    new Lift(ROWS, 'notes', new Rx(3, 5, 0.75)),
    new Lift(DIPS, 'notes', new Rx(3, 5, 0.75))
  )
  .addSession(
    3,
    2,
    '',
    new Lift(PRESS, 'notes', new Rx(3, 5, 0.75)),
    new Lift(DEADLIFT, 'notes', new Rx(3, 5, 0.75)),
    new Lift(SLDL, 'notes', new Rx(3, 5, 0.75))
  )
  .addSession(
    3,
    3,
    '',
    new Lift(SQUAT, 'notes', new Rx(3, 5, 0.75)),
    new Lift(BENCH, 'notes', new Rx(3, 5, 0.75)),
    new Lift(CHINS, 'notes', new Rx(3, 5, 0.75)),
    new Lift(ARMS, 'notes', new Rx(3, 5, 0.75))
  );

// Week 4
program
  .addSession(
    4,
    1,
    '',
    new Lift(SQUAT, 'notes', new Rx(3, 5, 0.75)),
    new Lift(BENCH, 'notes', new Rx(3, 5, 0.75)),
    new Lift(ROWS, 'notes', new Rx(3, 5, 0.75)),
    new Lift(DIPS, 'notes', new Rx(3, 5, 0.75))
  )
  .addSession(
    4,
    2,
    '',
    new Lift(PRESS, 'notes', new Rx(3, 5, 0.75)),
    new Lift(DEADLIFT, 'notes', new Rx(3, 5, 0.75)),
    new Lift(SLDL, 'notes', new Rx(3, 5, 0.75))
  )
  .addSession(
    4,
    3,
    '',
    new Lift(SQUAT, 'notes', new Rx(3, 5, 0.75)),
    new Lift(BENCH, 'notes', new Rx(3, 5, 0.75)),
    new Lift(CHINS, 'notes', new Rx(3, 5, 0.75)),
    new Lift(ARMS, 'notes', new Rx(3, 5, 0.75))
  );

console.log(JSON.stringify(program, null, 2));
