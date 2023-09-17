type DataType = {
  type: string;
  heading: string;
  description: string;
  key: string;
};

const data: DataType[] = [
  {
    type: 'Humlan P',
    heading: 'Vibrant colors',
    description: 'Four on-trend colorways to seamlessly suit your style.',
    key: 'first',
  },
  {
    type: 'Pampas',
    heading: 'Redefined sound',
    description: 'A bold statement tuned to perfection.',
    key: 'second',
  },
  {
    type: 'Humlan P',
    heading: 'Great quality',
    description:
      'An Urbanears classic! Listen-all-day fit. Striking the perfect balance of effortless technology',
    key: 'third',
  },
  {
    type: 'Humlan B',
    heading: 'From Sweden',
    description:
      'The “Plattan” in Plattan headphones is Swedish for “the slab.”',
    key: 'fourth',
  },
];

export default data;
