import { Exercises, Program } from '../types';

const { SQUAT, BENCH, PRESS, DEADLIFT } = Exercises;

const program: Program = {
  name: 'Garage Gym Workout III',
  shortName: 'GGW III',
  notes: ['Coming Soon...'],
  maxes: { [SQUAT]: 0, [BENCH]: 0, [DEADLIFT]: 0, [PRESS]: 0 },
  sessions: [],
};
export default program;
