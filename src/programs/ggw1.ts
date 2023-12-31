import { Program, Exercises } from '../types';

const { SQUAT, BENCH, PRESS, DEADLIFT } = Exercises;

const program: Program = {
  name: 'Garage Gym Workout I',
  shortName: 'GGW I',
  notes: ['Coming Soon...'],
  maxes: { [SQUAT]: 0, [BENCH]: 0, [DEADLIFT]: 0, [PRESS]: 0 },
  sessions: [],
};
export default program;
