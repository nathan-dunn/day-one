import { Program, Exercises } from '../types';

const {
  SQUAT,
  BENCH,
  PRESS,
  DEADLIFT,
  SLDL,
  ROWS,
  DIPS_OR_PUSHUPS,
  CHINS_OR_PULLUPS,
  ARMS,
} = Exercises;

const program: Program = {
  name: 'Garage Gym Warrior II',
  shortName: 'GGW II',
  notes: [
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
  ],
  maxes: {
    SQUAT: 0,
    BENCH: 0,
    DEADLIFT: 0,
    PRESS: 0,
  },
  sessions: [
    {
      week: 1,
      day: 1,
      notes: [
        'Volumes and Intensities are starting out very moderate.',
        'Use this as an opportunity to build your work capacity and endurance by pushing the rest times to be as minimal as possible. 2-3 minutes is allowed, but if you can shorten rest periods to 60-90 seconds this is permissible provided (1) your form does not degrade (2) you do not have massive losses in bar speed.',
        'As the weeks get heavier you can of course extend the rest periods as needed, but better endurance now will lead to shorter rest periods (and workouts) later',
      ],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 4,
              reps: 3,
              perc: 0.75,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 4,
              reps: 3,
              perc: 0.75,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: ROWS,
          rxs: [
            {
              sets: 3,
              reps: '8-10',
            },
          ],
          notes: [
            'Keep form strict and maintain 2-3 minute rest periods',
            'Perform from the hang or from the floor',
            'Use straps',
          ],
        },
        {
          name: DIPS_OR_PUSHUPS,
          rxs: [
            {
              sets: 3,
              reps: 'AMRAP',
            },
          ],
          notes: [
            '2-3 mins rest between sets',
            'Add weight to Dips if performing more than 15 reps per set',
          ],
        },
      ],
    },
    {
      week: 1,
      day: 2,
      notes: [],
      lifts: [
        {
          name: PRESS,
          rxs: [
            {
              sets: 4,
              reps: 3,
              perc: 0.75,
            },
            {
              sets: 1,
              reps: '8+',
              perc: 0.6,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'After the triples perform a single set of 8 reps at 60',
          ],
        },
        {
          name: DEADLIFT,
          rxs: [
            {
              sets: 4,
              reps: 3,
              perc: 0.75,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: SLDL,
          rxs: [
            {
              sets: 1,
              reps: 8,
            },
          ],
          notes: [
            'Use approx 50-60 of your Deadlift 1RM or reference recent records and perform a set of 8 reps on the SLDL',
            'You may use a small 1-2 inch deficit as needed to increase range of motion',
          ],
        },
      ],
    },
    {
      week: 1,
      day: 3,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 3,
              reps: 5,
              perc: 0.6,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'You may pause all or some of the reps in order to increase difficulty',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 3,
              reps: 5,
              perc: 0.6,
            },
          ],
          notes: [
            'Perform this exercise with a narrow close grip in order to increase difficulty',
            'You may also institute a 2-3 count pause in order to increase difficulty',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'On the final set you may push for more reps stopping 1-2 reps shy of failure',
          ],
        },
        {
          name: CHINS_OR_PULLUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            'Rest 2-3 minutes between sets',
            'If you cannot do ChinsPull Ups then sub with Lat Pulldowns for sets of 8-12 reps or Bodyweight Rows for sets of 10-15 reps',
            'If you can only do a few chinspull ups then perform as many sets as needed to achieve 20-25 total reps minimum',
            'If you can do more than 15 reps per set add weight',
          ],
        },
        {
          name: ARMS,
          rxs: [
            {
              sets: '2-3',
              reps: '10-15',
            },
          ],
          notes: [
            'Pick one bicep exercise and one tricep exercise and move back and forth between the two for 2-3 sets',
            'Rest about 1 minute between each exercise until all sets are complete',
          ],
        },
      ],
    },
    {
      week: 2,
      day: 1,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 5,
              reps: 3,
              perc: 0.75,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 5,
              reps: 3,
              perc: 0.75,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: ROWS,
          rxs: [
            {
              sets: 4,
              reps: '8-10',
            },
          ],
          notes: [
            'Keep form strict and maintain 2-3 minute rest periods',
            'Perform from the hang or from the floor',
            'Use straps',
          ],
        },
        {
          name: DIPS_OR_PUSHUPS,
          rxs: [
            {
              sets: 4,
              reps: 'AMRAP',
            },
          ],
          notes: [
            '2 mins rest between sets',
            'Add weight to Dips if performing more than 15 reps per set',
          ],
        },
      ],
    },
    {
      week: 2,
      day: 2,
      notes: [],
      lifts: [
        {
          name: PRESS,
          rxs: [
            {
              sets: 5,
              reps: 3,
              perc: 0.75,
            },
            {
              sets: 1,
              reps: '8+',
              perc: 0.62,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'After the triples perform a single set of 8 or more reps at 62',
          ],
        },
        {
          name: DEADLIFT,
          rxs: [
            {
              sets: 5,
              reps: 3,
              perc: 0.75,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: SLDL,
          rxs: [
            {
              sets: 1,
              reps: 8,
            },
          ],
          notes: [
            'Use approx 50-60 of your Deadlift 1RM or reference recent records and perform a set of 8 reps on the SLDL',
            'You may use a small 1-2 inch deficit as needed to increase range of motion',
            'Aim to beat your set of 8 from last week',
          ],
        },
      ],
    },
    {
      week: 2,
      day: 3,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 4,
              reps: 5,
              perc: 0.6,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'You may pause all or some of the reps in order to increase difficulty',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 4,
              reps: 5,
              perc: 0.6,
            },
          ],
          notes: [
            'Perform this exercise with a narrow close grip in order to increase difficulty',
            'You may also institute a 2-3 count pause in order to increase difficulty',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'On the final set you may push for more reps stopping 1-2 reps shy of failure',
          ],
        },
        {
          name: CHINS_OR_PULLUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            'Rest 2-3 minutes between sets',
            'If you cannot do ChinsPull Ups then sub with Lat Pulldown or Bodyweight Rows',
            'If you can only do a few chinspull ups then perform as many sets as needed to achieve 15-25 total reps',
            'If you can do more than 15 reps per set add weight',
          ],
        },
        {
          name: ARMS,
          rxs: [
            {
              sets: '2-3',
              reps: '10-15',
            },
          ],
          notes: [
            'Pick one bicep exercise and one tricep exercise and move back and forth between the two for 2-3 sets',
            'Rest about 1 minute between each exercise until all sets are complete',
          ],
        },
      ],
    },
    {
      week: 3,
      day: 1,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 6,
              reps: 3,
              perc: 0.75,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 6,
              reps: 3,
              perc: 0.75,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: ROWS,
          rxs: [
            {
              sets: 5,
              reps: '8-10',
            },
          ],
          notes: [
            'Keep form strict and maintain 2-3 minute rest periods',
            'Perform from the hang or from the floor',
            'Use straps',
          ],
        },
        {
          name: DIPS_OR_PUSHUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            '2 mins rest between sets',
            'Add weight to Dips if performing more than 15 reps per set',
          ],
        },
      ],
    },
    {
      week: 3,
      day: 2,
      notes: [],
      lifts: [
        {
          name: PRESS,
          rxs: [
            {
              sets: 6,
              reps: 3,
              perc: 0.75,
            },
            {
              sets: 1,
              reps: '8+',
              perc: 0.64,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'After the triples perform a single set of 8 or more reps at 64',
          ],
        },
        {
          name: DEADLIFT,
          rxs: [
            {
              sets: 6,
              reps: 3,
              perc: 0.75,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: SLDL,
          rxs: [
            {
              sets: 1,
              reps: 8,
            },
          ],
          notes: [
            'Use approx 50-60 of your Deadlift 1RM or reference recent records and perform a set of 8 reps on the SLDL',
            'You may use a small 1-2 inch deficit as needed to increase range of motion',
            'Aim to beat your set of 8 from last week',
          ],
        },
      ],
    },
    {
      week: 3,
      day: 3,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 5,
              reps: 5,
              perc: 0.6,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'You may pause all or some of the reps in order to increase difficulty',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 5,
              reps: 5,
              perc: 0.6,
            },
          ],
          notes: [
            'Perform this exercise with a narrow close grip in order to increase difficulty',
            'You may also institute a 2-3 count pause in order to increase difficulty',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'On the final set you may push for more reps stopping 1-2 reps shy of failure',
          ],
        },
        {
          name: CHINS_OR_PULLUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            'Rest 2-3 minutes between sets',
            'If you cannot do ChinsPull Ups then sub with Lat Pulldown or Bodyweight Rows',
            'If you can only do a few chinspull ups then perform as many sets as needed to achieve 15-25 total reps',
            'If you can do more than 15 reps per set add weight',
          ],
        },
        {
          name: ARMS,
          rxs: [
            {
              sets: '2-3',
              reps: '10-15',
            },
          ],
          notes: [
            'Pick one bicep exercise and one tricep exercise and move back and forth between the two for 2-3 sets',
            'Rest about 1 minute between each exercise until all sets are complete',
          ],
        },
      ],
    },
    {
      week: 4,
      day: 1,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 4,
              reps: 2,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 4,
              reps: 2,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: ROWS,
          rxs: [
            {
              sets: 3,
              reps: '6-8',
            },
          ],
          notes: [
            'Keep form strict and maintain 2-3 minute rest periods',
            'Perform from the hang or from the floor',
            'Use straps',
            'Increase weight from last cycle',
          ],
        },
        {
          name: DIPS_OR_PUSHUPS,
          rxs: [
            {
              sets: 3,
              reps: 'AMRAP',
            },
          ],
          notes: [
            '2 mins rest between sets',
            'Add weight to Dips if performing more than 15 reps per set',
            'Add weight from last cycle if possible',
          ],
        },
      ],
    },
    {
      week: 4,
      day: 2,
      notes: [],
      lifts: [
        {
          name: PRESS,
          rxs: [
            {
              sets: 4,
              reps: 2,
              perc: 0.8,
            },
            {
              sets: 1,
              reps: '8+',
              perc: 0.66,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'After the doubles perform a single set of 8 or more reps at 66',
          ],
        },
        {
          name: DEADLIFT,
          rxs: [
            {
              sets: 4,
              reps: 2,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: SLDL,
          rxs: [
            {
              sets: 1,
              reps: 6,
            },
          ],
          notes: [
            'Perform a set of 6 reps on the SLDL',
            'You may use a small 1-2 inch deficit as needed to increase range of motion',
            'Aim to beat your sets of 8 from last week',
          ],
        },
      ],
    },
    {
      week: 4,
      day: 3,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 1,
              reps: 1,
              perc: 0.9,
            },
            {
              sets: 3,
              reps: 5,
              perc: 0.62,
            },
          ],
          notes: [
            'Work up to a single at 90 of your 1RM',
            'After the top single for the day perform 3 sets of 5 reps at 62 of 1RM',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'You may pause all or some of the reps in order to increase difficulty',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 1,
              reps: 1,
              perc: 0.9,
            },
            {
              sets: 3,
              reps: 5,
              perc: 0.62,
            },
          ],
          notes: [
            'Work up to a single at 90 of your 1RM then back off to 3 sets of 5 62 of 1RM',
            'Perform the back off sets with a narrow close grip in order to increase difficulty',
            'You may also institute a 2-3 count pause in order to increase difficulty',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'On the final set you may push for more reps stopping 1-2 reps shy of failure',
          ],
        },
        {
          name: CHINS_OR_PULLUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            'Rest 2-3 minutes between sets',
            'If you cannot do ChinsPull Ups then sub with Lat Pulldown or Bodyweight Rows',
            'If you can only do a few chinspull ups then perform as many sets as needed to achieve 15-25 total reps',
            'If you can do more than 15 reps per set add weight',
          ],
        },
        {
          name: ARMS,
          rxs: [
            {
              sets: '2-3',
              reps: '10-15',
            },
          ],
          notes: [
            'Pick one bicep exercise and one tricep exercise and move back and forth between the two for 2-3 sets',
            'Rest about 1 minute between each exercise until all sets are complete',
          ],
        },
      ],
    },
    {
      week: 5,
      day: 1,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 5,
              reps: 2,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 5,
              reps: 2,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: ROWS,
          rxs: [
            {
              sets: 4,
              reps: '6-8',
            },
          ],
          notes: [
            'Keep form strict and maintain 2-3 minute rest periods',
            'Perform from the hang or from the floor',
            'Use straps',
          ],
        },
        {
          name: DIPS_OR_PUSHUPS,
          rxs: [
            {
              sets: 4,
              reps: 'AMRAP',
            },
          ],
          notes: [
            '2 mins rest between sets',
            'Add weight to Dips if performing more than 15 reps per set',
          ],
        },
      ],
    },
    {
      week: 5,
      day: 2,
      notes: [],
      lifts: [
        {
          name: PRESS,
          rxs: [
            {
              sets: 5,
              reps: 2,
              perc: 0.8,
            },
            {
              sets: 1,
              reps: '8+',
              perc: 0.68,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'After the doubles perform a single set of 8 or more reps at 68',
          ],
        },
        {
          name: DEADLIFT,
          rxs: [
            {
              sets: 5,
              reps: 2,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: SLDL,
          rxs: [
            {
              sets: 1,
              reps: 6,
            },
          ],
          notes: [
            'Perform a set of 6 reps on the SLDL',
            'You may use a small 1-2 inch deficit as needed to increase range of motion',
            'Aim to beat your set of 6 from last week',
          ],
        },
      ],
    },
    {
      week: 5,
      day: 3,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 4,
              reps: 5,
              perc: 0.62,
            },
          ],
          notes: [
            'Perform 4 sets of 5 reps at 62 of 1RM',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'You may pause all or some of the reps in order to increase difficulty',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 4,
              reps: 5,
              perc: 0.62,
            },
          ],
          notes: [
            'Perform the sets with a narrow close grip in order to increase difficulty',
            'You may also institute a 2-3 count pause in order to increase difficulty',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'On the final set you may push for more reps stopping 1-2 reps shy of failure',
          ],
        },
        {
          name: CHINS_OR_PULLUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            'Rest 2-3 minutes between sets',
            'If you cannot do ChinsPull Ups then sub with Lat Pulldown or Bodyweight Rows',
            'If you can only do a few chinspull ups then perform as many sets as needed to achieve 15-25 total reps',
            'If you can do more than 15 reps per set add weight',
          ],
        },
        {
          name: ARMS,
          rxs: [
            {
              sets: '2-3',
              reps: '10-15',
            },
          ],
          notes: [
            'Pick one bicep exercise and one tricep exercise and move back and forth between the two for 2-3 sets',
            'Rest about 1 minute between each exercise until all sets are complete',
          ],
        },
      ],
    },
    {
      week: 6,
      day: 1,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 6,
              reps: 2,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 6,
              reps: 2,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: ROWS,
          rxs: [
            {
              sets: 5,
              reps: '6-8',
            },
          ],
          notes: [
            'Keep form strict and maintain 2-3 minute rest periods',
            'Perform from the hang or from the floor',
            'Use straps',
          ],
        },
        {
          name: DIPS_OR_PUSHUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            '2 mins rest between sets',
            'Add weight to Dips if performing more than 15 reps per set',
          ],
        },
      ],
    },
    {
      week: 6,
      day: 2,
      notes: [],
      lifts: [
        {
          name: PRESS,
          rxs: [
            {
              sets: 6,
              reps: 2,
              perc: 0.8,
            },
            {
              sets: 1,
              reps: '8+',
              perc: 0.7,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'After the doubles perform a single set of 8 or more reps at 68',
          ],
        },
        {
          name: DEADLIFT,
          rxs: [
            {
              sets: 6,
              reps: 2,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: SLDL,
          rxs: [
            {
              sets: 1,
              reps: 6,
            },
          ],
          notes: [
            'Perform a set of 6 reps on the SLDL',
            'You may use a small 1-2 inch deficit as needed to increase range of motion',
            'Aim to beat your set of 6 from last week',
          ],
        },
      ],
    },
    {
      week: 6,
      day: 3,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 5,
              reps: 5,
              perc: 0.62,
            },
          ],
          notes: [
            'Perform 5 sets of 5 reps at 62 of 1RM',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'You may pause all or some of the reps in order to increase difficulty',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 5,
              reps: 5,
              perc: 0.62,
            },
          ],
          notes: [
            'Perform the sets with a narrow close grip in order to increase difficulty',
            'You may also institute a 2-3 count pause in order to increase difficulty',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'On the final set you may push for more reps stopping 1-2 reps shy of failure',
          ],
        },
        {
          name: CHINS_OR_PULLUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            'Rest 2-3 minutes between sets',
            'If you cannot do ChinsPull Ups then sub with Lat Pulldown or Bodyweight Rows',
            'If you can only do a few chinspull ups then perform as many sets as needed to achieve 15-25 total reps',
            'If you can do more than 15 reps per set add weight',
          ],
        },
        {
          name: ARMS,
          rxs: [
            {
              sets: '2-3',
              reps: '10-15',
            },
          ],
          notes: [
            'Pick one bicep exercise and one tricep exercise and move back and forth between the two for 2-3 sets',
            'Rest about 1 minute between each exercise until all sets are complete',
          ],
        },
      ],
    },
    {
      week: 7,
      day: 1,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 4,
              reps: 2,
              perc: 0.7,
            },
          ],
          notes: [
            'DELOAD',
            'Rest 2 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 4,
              reps: 2,
              perc: 0.7,
            },
          ],
          notes: [
            'DELOAD',
            'Rest 2 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: ROWS,
          rxs: [
            {
              sets: 3,
              reps: '8-10',
            },
          ],
          notes: [
            'Keep form strict and maintain 2-3 minute rest periods',
            'Perform from the hang or from the floor',
            'Use straps',
            'Increase weight from last cycle of 8-10',
          ],
        },
        {
          name: DIPS_OR_PUSHUPS,
          rxs: [
            {
              sets: 3,
              reps: 'AMRAP',
            },
          ],
          notes: [
            '2 mins rest between sets',
            'Add weight to Dips if performing more than 15 reps per set',
          ],
        },
      ],
    },
    {
      week: 7,
      day: 2,
      notes: [],
      lifts: [
        {
          name: PRESS,
          rxs: [
            {
              sets: 4,
              reps: 2,
              perc: 0.7,
            },
            {
              sets: 1,
              reps: 1,
              perc: 0.8,
            },
            {
              sets: 1,
              reps: 1,
              perc: 0.85,
            },
            {
              sets: 1,
              reps: 1,
              perc: 0.9,
            },
          ],
          notes: [
            'Rest 2 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'After the lighter doubles perform 3 progressively heavier singles',
            'Rest as needed between efforts',
          ],
        },
        {
          name: DEADLIFT,
          rxs: [
            {
              sets: 4,
              reps: 2,
              perc: 0.7,
            },
            {
              sets: 1,
              reps: 1,
              perc: 0.8,
            },
            {
              sets: 1,
              reps: 1,
              perc: 0.85,
            },
            {
              sets: 1,
              reps: 1,
              perc: 0.9,
            },
          ],
          notes: [
            'Rest 2 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'After the lighter doubles perform 3 progressively heavier singles',
            'Rest as needed between efforts',
          ],
        },
        {
          name: SLDL,
          rxs: [
            {
              sets: 1,
              reps: 8,
            },
          ],
          notes: [
            'Perform a set of 8 reps on the SLDL',
            'You may use a small 1-2 inch deficit as needed to increase range of motion',
            'Aim to beat your last set of 8 from Week 3',
          ],
        },
      ],
    },
    {
      week: 7,
      day: 3,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 1,
              reps: 1,
              perc: 0.92,
            },
            {
              sets: 3,
              reps: 5,
              perc: 0.64,
            },
          ],
          notes: [
            'Perform 3 sets of 5 reps at 64 of 1RM',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'You may pause all or some of the reps in order to increase difficulty',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 1,
              reps: 1,
              perc: 0.92,
            },
            {
              sets: 3,
              reps: 5,
              perc: 0.64,
            },
          ],
          notes: [
            'Perform the back off sets with a narrow close grip in order to increase difficulty',
            'You may also institute a 2-3 count pause in order to increase difficulty',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'On the final set you may push for more reps stopping 1-2 reps shy of failure',
          ],
        },
        {
          name: CHINS_OR_PULLUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            'Rest 2-3 minutes between sets',
            'If you cannot do ChinsPull Ups then sub with Lat Pulldown or Bodyweight Rows',
            'If you can only do a few chinspull ups then perform as many sets as needed to achieve 15-25 total reps',
            'If you can do more than 15 reps per set add weight',
          ],
        },
        {
          name: ARMS,
          rxs: [
            {
              sets: '2-3',
              reps: '10-15',
            },
          ],
          notes: [
            'Pick one bicep exercise and one tricep exercise and move back and forth between the two for 2-3 sets',
            'Rest about 1 minute between each exercise until all sets are complete',
          ],
        },
      ],
    },
    {
      week: 8,
      day: 1,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 4,
              reps: 3,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 4,
              reps: 3,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: ROWS,
          rxs: [
            {
              sets: 4,
              reps: '8-10',
            },
          ],
          notes: [
            'Keep form strict and maintain 2-3 minute rest periods',
            'Perform from the hang or from the floor',
            'Use straps',
          ],
        },
        {
          name: DIPS_OR_PUSHUPS,
          rxs: [
            {
              sets: 4,
              reps: 'MAX',
            },
          ],
          notes: [
            '2 mins rest between sets',
            'Add weight to Dips if performing more than 15 reps per set',
          ],
        },
      ],
    },
    {
      week: 8,
      day: 2,
      notes: [],
      lifts: [
        {
          name: PRESS,
          rxs: [
            {
              sets: 4,
              reps: 3,
              perc: 0.8,
            },
            {
              sets: 1,
              reps: 'AMRAP',
              perc: 0.6,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'After the tripless perform a max rep set at 60 of 1RM',
            'Attempt to beat your total reps from week 1',
          ],
        },
        {
          name: DEADLIFT,
          rxs: [
            {
              sets: 4,
              reps: 3,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: SLDL,
          rxs: [
            {
              sets: 1,
              reps: 8,
            },
          ],
          notes: [
            'Perform a set of 8 reps on the SLDL',
            'You may use a small 1-2 inch deficit as needed to increase range of motion',
            'Aim to beat your best set of 8',
          ],
        },
      ],
    },
    {
      week: 8,
      day: 3,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 4,
              reps: 5,
              perc: 0.64,
            },
          ],
          notes: [
            'Perform 4 sets of 5 reps at 64 of 1RM',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'You may pause all or some of the reps in order to increase difficulty',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 4,
              reps: 5,
              perc: 0.64,
            },
          ],
          notes: [
            'Perform the sets with a narrow close grip in order to increase difficulty',
            'You may also institute a 2-3 count pause in order to increase difficulty',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'On the final set you may push for more reps stopping 1-2 reps shy of failure',
          ],
        },
        {
          name: CHINS_OR_PULLUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            'Rest 2-3 minutes between sets',
            'If you cannot do ChinsPull Ups then sub with Lat Pulldown or Bodyweight Rows',
            'If you can only do a few chinspull ups then perform as many sets as needed to achieve 15-25 total reps',
            'If you can do more than 15 reps per set add weight',
          ],
        },
        {
          name: ARMS,
          rxs: [
            {
              sets: '2-3',
              reps: '10-15',
            },
          ],
          notes: [
            'Pick one bicep exercise and one tricep exercise and move back and forth between the two for 2-3 sets',
            'Rest about 1 minute between each exercise until all sets are complete',
          ],
        },
      ],
    },
    {
      week: 9,
      day: 1,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 5,
              reps: 3,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 5,
              reps: 3,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: ROWS,
          rxs: [
            {
              sets: 5,
              reps: '8-10',
            },
          ],
          notes: [
            'Keep form strict and maintain 2-3 minute rest periods',
            'Perform from the hang or from the floor',
            'Use straps',
          ],
        },
        {
          name: CHINS_OR_PULLUPS,
          rxs: [
            {
              sets: 1,
              reps: 'AMRAP',
            },
          ],
          notes: [
            '2 mins rest between sets',
            'Add weight to Dips if performing more than 15 reps per set',
          ],
        },
      ],
    },
    {
      week: 9,
      day: 2,
      notes: [],
      lifts: [
        {
          name: PRESS,
          rxs: [
            {
              sets: 5,
              reps: 3,
              perc: 0.8,
            },
            {
              sets: 1,
              reps: 'AMRAP',
              perc: 0.62,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'After the triples perform a max rep set at 62 of 1RM',
            'Attempt to beat your total reps from week 2',
          ],
        },
        {
          name: DEADLIFT,
          rxs: [
            {
              sets: 5,
              reps: 3,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: SLDL,
          rxs: [
            {
              sets: 1,
              reps: 8,
            },
          ],
          notes: [
            'Perform a set of 8 reps on the SLDL',
            'You may use a small 1-2 inch deficit as needed to increase range of motion',
            'Aim to beat your best set of 8 from previous weeks',
          ],
        },
      ],
    },
    {
      week: 9,
      day: 3,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 5,
              reps: 5,
              perc: 0.64,
            },
          ],
          notes: [
            'Perform 5 sets of 5 reps at 64 of 1RM',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'You may pause all or some of the reps in order to increase difficulty',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 5,
              reps: 5,
              perc: 0.64,
            },
          ],
          notes: [
            'Perform the sets with a narrow close grip in order to increase difficulty',
            'You may also institute a 2-3 count pause in order to increase difficulty',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'On the final set you may push for more reps stopping 1-2 reps shy of failure',
          ],
        },
        {
          name: CHINS_OR_PULLUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            'Rest 2-3 minutes between sets',
            'If you cannot do ChinsPull Ups then sub with Lat Pulldown or Bodyweight Rows',
            'If you can only do a few chinspull ups then perform as many sets as needed to achieve 15-25 total reps',
            'If you can do more than 15 reps per set add weight',
          ],
        },
        {
          name: ARMS,
          rxs: [
            {
              sets: '2-3',
              reps: '10-15',
            },
          ],
          notes: [
            'Pick one bicep exercise and one tricep exercise and move back and forth between the two for 2-3 sets',
            'Rest about 1 minute between each exercise until all sets are complete',
          ],
        },
      ],
    },
    {
      week: 10,
      day: 1,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 6,
              reps: 3,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 6,
              reps: 3,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: ROWS,
          rxs: [
            {
              sets: 3,
              reps: '6-8',
            },
          ],
          notes: [
            'Keep form strict and maintain 2-3 minute rest periods',
            'Perform from the hang or from the floor',
            'Use straps',
            'Increase weight from last week and last cycle of 6-8 reps',
          ],
        },
        {
          name: DIPS_OR_PUSHUPS,
          rxs: [
            {
              sets: 3,
              reps: 'AMRAP',
            },
          ],
          notes: [
            '2 mins rest between sets',
            'Add weight to Dips if performing more than 15 reps per set',
          ],
        },
      ],
    },
    {
      week: 10,
      day: 2,
      notes: [],
      lifts: [
        {
          name: PRESS,
          rxs: [
            {
              sets: 6,
              reps: 3,
              perc: 0.8,
            },
            {
              sets: 1,
              reps: 'AMRAP',
              perc: 0.64,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'After the triples perform a max rep set at 64 of 1RM',
            'Attempt to beat your total reps from week 3',
          ],
        },
        {
          name: DEADLIFT,
          rxs: [
            {
              sets: 6,
              reps: 3,
              perc: 0.8,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: SLDL,
          rxs: [
            {
              sets: 1,
              reps: 8,
            },
          ],
          notes: [
            'Perform a set of 8 reps on the SLDL',
            'You may use a small 1-2 inch deficit as needed to increase range of motion',
            'Aim to beat your best set of 8 from previous weeks',
          ],
        },
      ],
    },
    {
      week: 10,
      day: 3,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 4,
              reps: 2,
              perc: 0.75,
            },
          ],
          notes: [],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 4,
              reps: 2,
              perc: 0.75,
            },
          ],
          notes: [
            'Perform 4 sets of 2 reps at 75 of 1RM',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'You may pause all or some of the reps in order to increase difficulty',
          ],
        },
        {
          name: CHINS_OR_PULLUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            'Rest 2-3 minutes between sets',
            'If you cannot do ChinsPull Ups then sub with Lat Pulldown or Bodyweight Rows',
            'If you can only do a few chinspull ups then perform as many sets as needed to achieve 15-25 total reps',
            'If you can do more than 15 reps per set add weight',
          ],
        },
        {
          name: ARMS,
          rxs: [
            {
              sets: '2-3',
              reps: '10-15',
            },
          ],
          notes: [
            'Pick one bicep exercise and one tricep exercise and move back and forth between the two for 2-3 sets',
            'Rest about 1 minute between each exercise until all sets are complete',
          ],
        },
      ],
    },
    {
      week: 11,
      day: 1,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 4,
              reps: 2,
              perc: 0.85,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 4,
              reps: 2,
              perc: 0.85,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: ROWS,
          rxs: [
            {
              sets: 4,
              reps: '6-8',
            },
          ],
          notes: [
            'Keep form strict and maintain 2-3 minute rest periods',
            'Perform from the hang or from the floor',
            'Use straps',
          ],
        },
        {
          name: DIPS_OR_PUSHUPS,
          rxs: [
            {
              sets: 4,
              reps: 'AMRAP',
            },
          ],
          notes: [
            '2 mins rest between sets',
            'Add weight to Dips if performing more than 15 reps per set',
          ],
        },
      ],
    },
    {
      week: 11,
      day: 2,
      notes: [],
      lifts: [
        {
          name: PRESS,
          rxs: [
            {
              sets: 4,
              reps: 2,
              perc: 0.85,
            },
            {
              sets: 1,
              reps: 'AMRAP',
              perc: 0.66,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'After the doubles perform a max rep set at 66 of 1RM',
            'Attempt to beat your total reps from week 4',
          ],
        },
        {
          name: DEADLIFT,
          rxs: [
            {
              sets: 4,
              reps: 2,
              perc: 0.85,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: SLDL,
          rxs: [
            {
              sets: 1,
              reps: 6,
            },
          ],
          notes: [
            'Perform a set of 6 reps on the SLDL',
            'You may use a small 1-2 inch deficit as needed to increase range of motion',
            'Aim to beat your best set of 6 from Week 6',
          ],
        },
      ],
    },
    {
      week: 11,
      day: 3,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 1,
              reps: 1,
              perc: 0.94,
            },
            {
              sets: 3,
              reps: 5,
              perc: 0.66,
            },
          ],
          notes: [
            'Work up to a single at 94 of your 1-rep max',
            'After the single perform 3 sets of 5 reps at 66 of 1RM',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'You may pause all or some of the reps in order to increase difficulty',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 1,
              reps: 1,
              perc: 0.94,
            },
            {
              sets: 3,
              reps: 5,
              perc: 0.66,
            },
          ],
          notes: [
            'Work up to a single at 94 of your 1-rep max',
            'After the single perform 3 sets of 5 reps at 66 of 1RM',
            'Perform the back off sets with a narrow close grip in order to increase difficulty',
            'You may also institute a 2-3 count pause in order to increase difficulty',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'On the final set you may push for more reps stopping 1-2 reps shy of failure',
          ],
        },
        {
          name: CHINS_OR_PULLUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            'Rest 2-3 minutes between sets',
            'If you cannot do ChinsPull Ups then sub with Lat Pulldown or Bodyweight Rows',
            'If you can only do a few chinspull ups then perform as many sets as needed to achieve 15-25 total reps',
            'If you can do more than 15 reps per set add weight',
          ],
        },
        {
          name: ARMS,
          rxs: [
            {
              sets: '2-3',
              reps: '10-15',
            },
          ],
          notes: [
            'Pick one bicep exercise and one tricep exercise and move back and forth between the two for 2-3 sets',
            'Rest about 1 minute between each exercise until all sets are complete',
          ],
        },
      ],
    },
    {
      week: 12,
      day: 1,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 5,
              reps: 2,
              perc: 0.85,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 5,
              reps: 2,
              perc: 0.85,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: ROWS,
          rxs: [
            {
              sets: 5,
              reps: '6-8',
            },
          ],
          notes: [
            'Keep form strict and maintain 2-3 minute rest periods',
            'Perform from the hang or from the floor',
            'Use straps',
            'Increase weight from previous best sets of 8-10',
          ],
        },
        {
          name: DIPS_OR_PUSHUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            '2 mins rest between sets',
            'Add weight to Dips if performing more than 15 reps per set',
          ],
        },
      ],
    },
    {
      week: 12,
      day: 2,
      notes: [],
      lifts: [
        {
          name: PRESS,
          rxs: [
            {
              sets: 5,
              reps: 2,
              perc: 0.85,
            },
            {
              sets: 1,
              reps: 'AMRAP',
              perc: 0.68,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'After the doubles perform a max rep set at 68 of 1RM',
            'Attempt to beat your total reps from week 5',
          ],
        },
        {
          name: DEADLIFT,
          rxs: [
            {
              sets: 5,
              reps: 2,
              perc: 0.85,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: SLDL,
          rxs: [
            {
              sets: 1,
              reps: 6,
            },
          ],
          notes: [
            'Perform a set of 6 reps on the SLDL',
            'You may use a small 1-2 inch deficit as needed to increase range of motion',
            'Aim to beat your best set of 6 from last week',
          ],
        },
      ],
    },
    {
      week: 12,
      day: 3,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 4,
              reps: 5,
              perc: 0.68,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'You may pause all or some of the reps in order to increase difficulty',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 4,
              reps: 5,
              perc: 0.68,
            },
          ],
          notes: [
            'Perform the sets with a narrow close grip in order to increase difficulty',
            'You may also institute a 2-3 count pause in order to increase difficulty',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'On the final set you may push for more reps stopping 1-2 reps shy of failure',
          ],
        },
        {
          name: CHINS_OR_PULLUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            'Rest 2-3 minutes between sets',
            'If you cannot do ChinsPull Ups then sub with Lat Pulldown or Bodyweight Rows',
            'If you can only do a few chinspull ups then perform as many sets as needed to achieve 15-25 total reps',
            'If you can do more than 15 reps per set add weight',
          ],
        },
        {
          name: ARMS,
          rxs: [
            {
              sets: '2-3',
              reps: '10-15',
            },
          ],
          notes: [
            'Pick one bicep exercise and one tricep exercise and move back and forth between the two for 2-3 sets',
            'Rest about 1 minute between each exercise until all sets are complete',
          ],
        },
      ],
    },
    {
      week: 13,
      day: 1,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 6,
              reps: 2,
              perc: 0.85,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 6,
              reps: 2,
              perc: 0.85,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: ROWS,
          rxs: [
            {
              sets: 3,
              reps: '8-10',
            },
          ],
          notes: [
            'Keep form strict and maintain 2-3 minute rest periods',
            'Perform from the hang or from the floor',
            'Use straps',
            'Increase weight from previous best sets of 8-10',
          ],
        },
        {
          name: DIPS_OR_PUSHUPS,
          rxs: [
            {
              sets: 3,
              reps: 'AMRAP',
            },
          ],
          notes: [
            '2 mins rest between sets',
            'Add weight to Dips if performing more than 15 reps per set',
          ],
        },
      ],
    },
    {
      week: 13,
      day: 2,
      notes: [],
      lifts: [
        {
          name: PRESS,
          rxs: [
            {
              sets: 6,
              reps: 2,
              perc: 0.85,
            },
            {
              sets: 1,
              reps: 'AMRAP',
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'After the doubles perform a max rep set at 70 of 1RM',
            'Attempt to beat your total reps from week 6 if possible but stop 1 rep short of failure',
          ],
        },
        {
          name: DEADLIFT,
          rxs: [
            {
              sets: 6,
              reps: 2,
              perc: 0.85,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: SLDL,
          rxs: [
            {
              sets: 1,
              reps: 5,
            },
          ],
          notes: [
            'Perform a set of 5 reps on the SLDL',
            'You may use a small 1-2 inch deficit as needed to increase range of motion',
            'Aim to beat your best set of 6 from previous weeks',
          ],
        },
      ],
    },
    {
      week: 13,
      day: 3,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 5,
              reps: 5,
              perc: 0.68,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'You may pause all or some of the reps in order to increase difficulty',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 5,
              reps: 5,
              perc: 0.68,
            },
          ],
          notes: [
            'Perform the sets with a narrow close grip in order to increase difficulty',
            'You may also institute a 2-3 count pause in order to increase difficulty',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: CHINS_OR_PULLUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            'Rest 2-3 minutes between sets',
            'If you cannot do ChinsPull Ups then sub with Lat Pulldown or Bodyweight Rows',
            'If you can only do a few chinspull ups then perform as many sets as needed to achieve 15-25 total reps',
            'If you can do more than 15 reps per set add weight',
          ],
        },
        {
          name: ARMS,
          rxs: [
            {
              sets: '2-3',
              reps: '10-15',
            },
          ],
          notes: [
            'Pick one bicep exercise and one tricep exercise and move back and forth between the two for 2-3 sets',
            'Rest about 1 minute between each exercise until all sets are complete',
          ],
        },
      ],
    },
    {
      week: 14,
      day: 1,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 2,
              reps: 2,
              perc: 0.9,
            },
          ],
          notes: ['Rest as needed between sets'],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 2,
              reps: 2,
              perc: 0.9,
            },
          ],
          notes: ['Rest as needed between sets'],
        },
        {
          name: ROWS,
          rxs: [
            {
              sets: 4,
              reps: '8-10',
            },
          ],
          notes: [
            'Keep form strict and maintain 2-3 minute rest periods',
            'Perform from the hang or from the floor',
            'Use straps',
          ],
        },
        {
          name: DIPS_OR_PUSHUPS,
          rxs: [
            {
              sets: 4,
              reps: 'AMRAP',
            },
          ],
          notes: [
            '2 mins rest between sets',
            'Add weight to Dips if performing more than 15 reps per set',
          ],
        },
      ],
    },
    {
      week: 14,
      day: 2,
      notes: [],
      lifts: [
        {
          name: PRESS,
          rxs: [
            {
              sets: 2,
              reps: 2,
              perc: 0.9,
            },
            {
              sets: 1,
              reps: 'AMRAP',
              perc: 0.75,
            },
          ],
          notes: [
            'Rest as needed between sets',
            'After the doubles perform max reps at 75 of 1RM stopping 1-2 reps shy of failure',
          ],
        },
        {
          name: DEADLIFT,
          rxs: [
            {
              sets: 2,
              reps: 2,
              perc: 0.9,
            },
          ],
          notes: ['Rest as needed between sets'],
        },
        {
          name: SLDL,
          rxs: [
            {
              sets: 1,
              reps: 4,
            },
          ],
          notes: [
            'Perform a set of 4 reps on the SLDL',
            'You may use a small 1-2 inch deficit as needed to increase range of motion',
            'Aim to beat your set of 5 from last week',
          ],
        },
      ],
    },
    {
      week: 14,
      day: 3,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 3,
              reps: 5,
              perc: 0.7,
            },
          ],
          notes: [
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'You may pause all or some of the reps in order to increase difficulty',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 3,
              reps: 5,
              perc: 0.7,
            },
          ],
          notes: [
            'Perform the sets with a narrow close grip in order to increase difficulty',
            'You may also institute a 2-3 count pause in order to increase difficulty',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
          ],
        },
        {
          name: CHINS_OR_PULLUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            'Rest 2-3 minutes between sets',
            'If you cannot do ChinsPull Ups then sub with Lat Pulldown or Bodyweight Rows',
            'If you can only do a few chinspull ups then perform as many sets as needed to achieve 15-25 total reps',
            'If you can do more than 15 reps per set add weight',
          ],
        },
        {
          name: ARMS,
          rxs: [
            {
              sets: '2-3',
              reps: '10-15',
            },
          ],
          notes: [
            'Pick one bicep exercise and one tricep exercise and move back and forth between the two for 2-3 sets',
            'Rest about 1 minute between each exercise until all sets are complete',
          ],
        },
      ],
    },
    {
      week: 15,
      day: 1,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              test: true,
            },
          ],
          notes: [
            'Aim for a very conservative 5-10 lb 1RM and then add weight for 1-2 more attempts based on feel',
            'Rest as needed between sets',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              test: true,
            },
          ],
          notes: [
            'Aim for a very conservative 5-10 lb 1RM and then add weight for 1-2 more attempts based on feel',
            'Rest as needed between sets',
          ],
        },
        {
          name: ROWS,
          rxs: [
            {
              sets: 5,
              reps: 10,
            },
          ],
          notes: [
            'Use a light-medium weight that is 3-4 reps short of failure and causes no form breakdown or low back fatigue',
          ],
        },
        {
          name: DIPS_OR_PUSHUPS,
          rxs: [
            {
              sets: 3,
              reps: 'TBD',
            },
          ],
          notes: [
            'Stop each set well short of failure in order to avoid excessive fatigue for Wednesday Presses',
            '2 mins rest between sets',
            'Add weight to Dips if performing more than 15 reps per set',
          ],
        },
      ],
    },
    {
      week: 15,
      day: 2,
      notes: [],
      lifts: [
        {
          name: PRESS,
          rxs: [
            {
              test: true,
            },
            {
              sets: 1,
              reps: '8-10',
              perc: 0.6,
            },
          ],
          notes: [
            'Aim for a very conservative 5-10 lb 1RM and then add weight for 1-2 more attempts based on feel',
            'Rest as needed between sets',
            'After the 1RM for the day perform a set of 8-10 reps at 60 of todays top single',
          ],
        },
        {
          name: DEADLIFT,
          rxs: [
            {
              test: true,
            },
            {
              sets: 1,
              reps: '5-8',
              perc: 0.7,
            },
          ],
          notes: [
            'Aim for a very conservative 5-10 lb 1RM and then add weight for 1-2 more attempts based on feel',
            'Rest as needed between sets',
            'After the 1RM for the day perform a set of 5-8 reps at 70 of todays top single',
          ],
        },
      ],
    },
    {
      week: 15,
      day: 3,
      notes: [],
      lifts: [
        {
          name: SQUAT,
          rxs: [
            {
              sets: 3,
              reps: 5,
              perc: 0.6,
            },
          ],
          notes: [
            'DELOAD',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            'You may pause all or some of the reps in order to increase difficulty',
            '60 of Mondays top single',
          ],
        },
        {
          name: BENCH,
          rxs: [
            {
              sets: 3,
              reps: 5,
              perc: 0.6,
            },
          ],
          notes: [
            'Perform the sets with a narrow close grip in order to increase difficulty',
            'You may also institute a 2-3 count pause in order to increase difficulty',
            'Rest 2-3 mins between sets',
            'Keep rest minimal while preserving form and focusing on bar speed',
            '60 of Mondays top single',
          ],
        },
        {
          name: CHINS_OR_PULLUPS,
          rxs: [
            {
              sets: 5,
              reps: 'AMRAP',
            },
          ],
          notes: [
            'Rest 2-3 minutes between sets',
            'If you cannot do ChinsPull Ups then sub with Lat Pulldown or Bodyweight Rows',
            'If you can only do a few chinspull ups then perform as many sets as needed to achieve 15-25 total reps',
            'If you can do more than 15 reps per set add weight',
          ],
        },
        {
          name: ARMS,
          rxs: [
            {
              sets: '2-3',
              reps: '10-15',
            },
          ],
          notes: [
            'Pick one bicep exercise and one tricep exercise and move back and forth between the two for 2-3 sets',
            'Rest about 1 minute between each exercise until all sets are complete',
          ],
        },
      ],
    },
  ],
};

export default program;
