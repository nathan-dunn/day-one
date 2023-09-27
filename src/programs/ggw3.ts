import { Exercises, Program } from '../types';

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
  name: 'Garage Gym Warrior III',
  shortName: 'GGW III',
  notes: ['Coming Soon...'],
  maxes: { [SQUAT]: 0, [BENCH]: 0, [DEADLIFT]: 0, [PRESS]: 0 },
  sessions: [],
};
export default program;
