import { Program, Lift, Rx } from './Program';
import {
  SQUAT,
  BENCH,
  ROWS,
  DIPS,
  PUSHUPS,
  PRESS,
  DEADLIFT,
  SLDL,
  CHINS,
  PULLUPS,
  ARMS,
} from '../constants';
const DIPS_OR_PUSHUPS = `${DIPS} or ${PUSHUPS}`;
const CHINS_OR_PULLUPS = `${CHINS} or ${PULLUPS}`;

const program = new Program('GGW2', ['program notes']);

// Week 1
program
  .addSession(
    [1, 1],
    [
      'Volumes and Intensities are starting out very moderate.',
      'Use this as an opportunity to build your work capacity and endurance by pushing the rest times to be as minimal as possible. 2-3 minutes is allowed, but if you can shorten rest periods to 60-90 seconds this is permissible provided (1) your form does not degrade (2) you do not have massive losses in bar speed.',
      'As the weeks get heavier you can of course extend the rest periods as needed, but better endurance now will lead to shorter rest periods (and workouts) later',
    ],
    [
      new Lift(
        SQUAT,
        [
          'Rest 2-3 mins between sets.',
          'Keep rest minimal while preserving form and focusing on bar speed.',
        ],
        [new Rx(4, 3, 0.75)]
      ),

      new Lift(
        BENCH,
        [
          'Rest 2-3 mins between sets.',
          'Keep rest minimal while preserving form and focusing on bar speed.',
        ],
        [new Rx(4, 3, 0.75)]
      ),
      new Lift(
        ROWS,
        [
          'Keep form strict and maintain 2-3 minute rest periods.',
          'Perform from the hang or from the floor.',
          'Use straps.',
        ],
        [new Rx(3, '8-10')]
      ),
      new Lift(
        DIPS_OR_PUSHUPS,
        [
          '2-3 mins rest between sets.',
          'Add weight to Dips if performing more than 15 reps per set.',
        ],
        [new Rx(3, 'AMRAP')]
      ),
    ]
  )
  .addSession(
    [1, 2],
    [''],
    [
      new Lift(
        PRESS,
        [
          'Rest 2-3 mins between sets.',
          'Keep rest minimal while preserving form and focusing on bar speed.',
        ],
        [new Rx(4, 3, 0.75), new Rx(1, '8+', 0.6)]
      ),

      new Lift(
        DEADLIFT,
        [
          'Rest 2-3 mins between sets.',
          'Keep rest minimal while preserving form and focusing on bar speed.',
        ],
        [new Rx(4, 3, 0.75)]
      ),
      new Lift(
        SLDL,
        [
          'Use approx 50-60% of your Deadlift 1RM (or reference recent records) and perform a set of 8 reps on the SLDL.',
          'You may use a small 1-2 inch deficit as needed to increase range of motion.',
        ],
        [new Rx(1, 8)]
      ),
    ]
  )
  .addSession(
    [1, 3],
    [''],
    [
      new Lift(
        SQUAT,
        [
          'Rest 2-3 mins between sets. Keep rest minimal while preserving form and focusing on bar speed.',
          'You may pause all or some of the reps in order to increase difficulty.',
        ],
        [new Rx(3, 5, 0.6)]
      ),
      new Lift(
        BENCH,
        [
          'Perform this exercise with a narrow / close grip in order to increase difficulty.',
          'You may also institute a 2-3 count pause in order to increase difficulty.',
          'Rest 2-3 mins between sets. Keep rest minimal while preserving form and focusing on bar speed.',
          'On the final set you may push for more reps, stopping 1-2 reps shy of failure.',
        ],
        [new Rx(3, 5, 0.6)]
      ),
      new Lift(
        CHINS_OR_PULLUPS,
        [
          'Rest 2-3 minutes between sets.',
          'If you cannot do Chins/Pull Ups then sub with Lat Pulldowns for sets of 8-12 reps or Bodyweight Rows for sets of 10-15 reps.',
          'If you can only do a few chins/pull ups then perform as many sets as needed to achieve 20-25 total reps minimum.',
          'If you can do more than 15 reps per set, add weight.',
        ],
        [new Rx(5, 'AMRAP')]
      ),
      new Lift(
        ARMS,
        [
          'Pick one bicep exercise and one tricep exercise and move back and forth between the two for 2-3 sets.',
          'Rest about 1 minute between each exercise until all sets are complete.',
        ],
        [new Rx('2-3', '10-15')]
      ),
    ]
  );

// Week 2
program
  .addSession(
    [2, 1],
    [''],
    [
      new Lift(SQUAT, [''], [new Rx(5, 3, 0.75)]),
      new Lift(BENCH, [''], [new Rx(5, 3, 0.75)]),
      new Lift(ROWS, [''], [new Rx(4, '8-10')]),
      new Lift(DIPS_OR_PUSHUPS, [''], [new Rx(4, 'AMRAP')]),
    ]
  )
  .addSession(
    [2, 2],
    [''],
    [
      new Lift(PRESS, [''], [new Rx(5, 2, 0.75), new Rx(1, '8+', 0.62)]),
      new Lift(DEADLIFT, [''], [new Rx(5, 3, 0.75)]),
      new Lift(SLDL, [''], [new Rx(1, 8)]),
    ]
  )
  .addSession(
    [2, 3],
    [''],
    [
      new Lift(SQUAT, [''], [new Rx(4, 5, 0.6)]),
      new Lift(BENCH, [''], [new Rx(4, 5, 0.6)]),
      new Lift(CHINS_OR_PULLUPS, [''], [new Rx(5, 'AMRAP')]),
      new Lift(ARMS, [''], [new Rx('2-3', '10-15')]),
    ]
  );

// Week 3
program
  .addSession(
    [3, 1],
    [''],
    [
      new Lift(SQUAT, [''], [new Rx(6, 3, 0.75)]),
      new Lift(BENCH, [''], [new Rx(6, 3, 0.75)]),
      new Lift(ROWS, [''], [new Rx(5, '8-10')]),
      new Lift(DIPS_OR_PUSHUPS, [''], [new Rx(5, 'AMRAP')]),
    ]
  )
  .addSession(
    [3, 2],
    [''],
    [
      new Lift(PRESS, [''], [new Rx(6, 3, 0.75), new Rx(1, '8+', 0.64)]),
      new Lift(DEADLIFT, [''], [new Rx(6, 3, 0.75)]),
      new Lift(SLDL, [''], [new Rx(1, 8)]),
    ]
  )
  .addSession(
    [3, 3],
    [''],
    [
      new Lift(SQUAT, [''], [new Rx(5, 5, 0.6)]),
      new Lift(BENCH, [''], [new Rx(5, 5, 0.6)]),
      new Lift(CHINS_OR_PULLUPS, [''], [new Rx(5, 'AMRAP')]),
      new Lift(ARMS, [''], [new Rx('2-3', '10-15')]),
    ]
  );

// Week 4
program
  .addSession(
    [4, 1],
    [''],
    [
      new Lift(SQUAT, ['notes'], [new Rx(3, 5, 0.75)]),
      new Lift(BENCH, ['notes'], [new Rx(3, 5, 0.75)]),
      new Lift(ROWS, ['notes'], [new Rx(3, '10-15')]),
      new Lift(DIPS_OR_PUSHUPS, ['notes'], [new Rx(3, 'AMRAP')]),
    ]
  )
  .addSession(
    [4, 2],
    [''],
    [
      new Lift(PRESS, ['notes'], [new Rx(3, 5, 0.75)]),
      new Lift(DEADLIFT, ['notes'], [new Rx(3, 5, 0.75)]),
      new Lift(SLDL, ['notes'], [new Rx(3, 5)]),
    ]
  )
  .addSession(
    [4, 3],
    [''],
    [
      new Lift(SQUAT, ['notes'], [new Rx(3, 5, 0.75)]),
      new Lift(BENCH, ['notes'], [new Rx(3, 5, 0.75)]),
      new Lift(CHINS_OR_PULLUPS, ['notes'], [new Rx(3, 'AMRAP')]),
      new Lift(ARMS, ['notes'], [new Rx(3, 5)]),
    ]
  );

export default program;
