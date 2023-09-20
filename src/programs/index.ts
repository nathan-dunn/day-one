import { Program, Lift, Rx } from './ProgramCreator';
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

const GARAGE_GYM_WARRIOR_2 = new Program('Garage Gym Warrior II', [
  'This basic barbell program has a total duration of 15 weeks. The 15th week is a testing week where lifters can choose to test their 1-rep maxes if they so choose. If not, then after week 14, the lifter might conservatively “assume” an increase in 1-rep max strength of approximately 5% and restart the program based off of a new assumed maximum for each lift.',
  'This program does not aggressively load weight every week. Instead week to week progression often comes in the form of increases in volume (more sets or reps) while weight is held constant.',
  'In general, the weight will be increased every 3-4 weeks with a simultaneous reduction in volume to accommodate the weight increase. Then, with the new weight, volume will build again over another 3-4 week period.',
  'There is a deload DAY in Week 7. Do not adjust this day.',
  'Bar Speed is a very important component of this program. This program uses a lot sets in the 2-3 rep range at loads between 75-85% of 1RM. These are nowhere near limit sets. Moved slowly, these reps will be far less effective than if there is intentional acceleration of the barbell applied to each and every rep. There is ample evidence that in doing so we can recruit more of the high threshold motor units responsible for peak force production in a manner that minimizes overall systemic fatigue.',
  'Moving every rep of every set with speed and acceleration will challenge your physical and mental capacity. You need to stay focused and concentrate on every set and every rep.',
  'A fast bar speed does not mean wild and out of control. It also does not imply a fast eccentric phase of the lift. Lower the bar in a normal controlled fashion. You explode and accelerate the concentric phase of the lift. If this is very new to you, then add the speed in gradually. Start with just a little faster than what a normal rep might be. Over time you will get better and better at moving these loads faster and with more acceleration.',
  'The speed element applies mainly to the primary work sets on the Squat, Bench, Press, and Deadlift.',
  'There is some dedicated hypertrophy work in the program that comes in the form of assistance exercises (rows, dips, push ups, bicep curls, tricep extensions, stiff leg deadlifts, and the occasional back off set). In these cases a more normal rep tempo is used.',
  'It is recommended that lifters do not skip the assistance exercises. If there is an exercise you cannot do for some reason then swap it out with an appropriate substitution. If you can’t do Barbell Rows you might swap them out for more Chins or Pull Ups. Dips are recommended but if you cannot do Dips, substitute with Push Ups. After Deadlifts, I recommend a top set of Stiff Leg Deadlifts. If you prefer, you could swap these out with perhaps Deficit Deadlifts or Snatch Grip Deadlifts.',
  'Use common sense when progressing your assistance work. If possible, every week you should attempt to increase either weight, sets, or reps on a given exercise while maintaining good quality form.',
  'Keep in mind I have everything here for a reason. This program has been tested with dozens of my online training clients and I know that it works. If you change the program up dramatically - it makes it not this program.',
]);

// Week 1
GARAGE_GYM_WARRIOR_2.addSession(
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
GARAGE_GYM_WARRIOR_2.addSession(
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
GARAGE_GYM_WARRIOR_2.addSession(
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
GARAGE_GYM_WARRIOR_2.addSession(
  [4, 1],
  [''],
  [
    new Lift(SQUAT, [''], [new Rx(3, 5, 0.75)]),
    new Lift(BENCH, [''], [new Rx(3, 5, 0.75)]),
    new Lift(ROWS, [''], [new Rx(3, '10-15')]),
    new Lift(DIPS_OR_PUSHUPS, [''], [new Rx(3, 'AMRAP')]),
  ]
)
  .addSession(
    [4, 2],
    [''],
    [
      new Lift(PRESS, [''], [new Rx(3, 5, 0.75)]),
      new Lift(DEADLIFT, [''], [new Rx(3, 5, 0.75)]),
      new Lift(SLDL, [''], [new Rx(3, 5)]),
    ]
  )
  .addSession(
    [4, 3],
    [''],
    [
      new Lift(SQUAT, [''], [new Rx(3, 5, 0.75)]),
      new Lift(BENCH, [''], [new Rx(3, 5, 0.75)]),
      new Lift(CHINS_OR_PULLUPS, [''], [new Rx(3, 'AMRAP')]),
      new Lift(ARMS, [''], [new Rx(3, 5)]),
    ]
  );

export default [GARAGE_GYM_WARRIOR_2];
