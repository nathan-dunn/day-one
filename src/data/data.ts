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

const program = new Program('GGW2', 'program notes');

// Week 1
program
  .addSession(
    1,
    1,
    '',
    new Lift(
      SQUAT,
      'Rest 2-3 mins between sets. Keep rest minimal while preserving form and focusing on bar speed.',
      new Rx(3, 5, 0.75),
      new Rx(3, 5, 0.75)
    ),
    new Lift(
      BENCH,
      'Rest 2-3 mins between sets. Keep rest minimal while preserving form and focusing on bar speed.',
      new Rx(3, 5, 0.75)
    ),
    new Lift(
      ROWS,
      'Keep form strict and maintain 2-3 minute rest periods. Perform from the hang or from the floor. Use straps.',
      new Rx(3, '10-15')
    ),
    new Lift(
      DIPS,
      '2-3 mins rest between sets. Add weight to Dips if performing more than 15 reps per set.',
      new Rx(3, 'AMRAP')
    )
  )
  .addSession(
    1,
    2,
    '',
    new Lift(PRESS, `notes`, new Rx(3, 5, 0.75)),
    new Lift(DEADLIFT, `notes`, new Rx(3, 5, 0.75)),
    new Lift(SLDL, `notes`, new Rx(3, 5))
  )
  .addSession(
    1,
    3,
    '',
    new Lift(SQUAT, `notes`, new Rx(3, 5, 0.75)),
    new Lift(BENCH, `notes`, new Rx(3, 5, 0.75)),
    new Lift(CHINS, `notes`, new Rx(3, 'AMRAP')),
    new Lift(ARMS, `notes`, new Rx(3, 5))
  );

// Week 2
program
  .addSession(
    2,
    1,
    '',
    new Lift(SQUAT, `notes`, new Rx(3, 5, 0.75)),
    new Lift(BENCH, `notes`, new Rx(3, 5, 0.75)),
    new Lift(ROWS, `notes`, new Rx(3, '10-15')),
    new Lift(DIPS, `notes`, new Rx(3, 'AMRAP'))
  )
  .addSession(
    2,
    2,
    '',
    new Lift(PRESS, `notes`, new Rx(3, 5, 0.75)),
    new Lift(DEADLIFT, `notes`, new Rx(3, 5, 0.75)),
    new Lift(SLDL, `notes`, new Rx(3, 5))
  )
  .addSession(
    2,
    3,
    '',
    new Lift(SQUAT, `notes`, new Rx(3, 5, 0.75)),
    new Lift(BENCH, `notes`, new Rx(3, 5, 0.75)),
    new Lift(CHINS, `notes`, new Rx(3, 'AMRAP')),
    new Lift(ARMS, `notes`, new Rx(3, 5))
  );

// Week 3
program
  .addSession(
    3,
    1,
    '',
    new Lift(SQUAT, `notes`, new Rx(3, 5, 0.75)),
    new Lift(BENCH, `notes`, new Rx(3, 5, 0.75)),
    new Lift(ROWS, `notes`, new Rx(3, '10-15')),
    new Lift(DIPS, `notes`, new Rx(3, 'AMRAP'))
  )
  .addSession(
    3,
    2,
    '',
    new Lift(PRESS, `notes`, new Rx(3, 5, 0.75)),
    new Lift(DEADLIFT, `notes`, new Rx(3, 5, 0.75)),
    new Lift(SLDL, `notes`, new Rx(3, 5))
  )
  .addSession(
    3,
    3,
    '',
    new Lift(SQUAT, `notes`, new Rx(3, 5, 0.75)),
    new Lift(BENCH, `notes`, new Rx(3, 5, 0.75)),
    new Lift(CHINS, `notes`, new Rx(3, 'AMRAP')),
    new Lift(ARMS, `notes`, new Rx(3, 5))
  );

// Week 4
program
  .addSession(
    4,
    1,
    '',
    new Lift(SQUAT, `notes`, new Rx(3, 5, 0.75)),
    new Lift(BENCH, `notes`, new Rx(3, 5, 0.75)),
    new Lift(ROWS, `notes`, new Rx(3, '10-15')),
    new Lift(DIPS, `notes`, new Rx(3, 'AMRAP'))
  )
  .addSession(
    4,
    2,
    '',
    new Lift(PRESS, `notes`, new Rx(3, 5, 0.75)),
    new Lift(DEADLIFT, `notes`, new Rx(3, 5, 0.75)),
    new Lift(SLDL, `notes`, new Rx(3, 5))
  )
  .addSession(
    4,
    3,
    '',
    new Lift(SQUAT, `notes`, new Rx(3, 5, 0.75)),
    new Lift(BENCH, `notes`, new Rx(3, 5, 0.75)),
    new Lift(CHINS, `notes`, new Rx(3, 'AMRAP')),
    new Lift(ARMS, `notes`, new Rx(3, 5))
  );

export default program;
