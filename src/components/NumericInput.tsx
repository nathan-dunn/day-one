import React, { useState, useEffect } from 'react';
import { TextInput, StyleProp, TextStyle } from 'react-native';
import { MaxesType } from '../types';
import { getStorage, setStorage } from '../utils';

type NumericInputProps = {
  lift: keyof MaxesType;
  style: StyleProp<TextStyle>;
};

export default function NumericInput({ lift, style }: NumericInputProps) {
  const [max, setMax] = useState<number>(0);

  const getMaxes = async () => {
    const maxes = (await getStorage('@day_one_maxes')) || JSON.stringify({});
    console.log(lift, maxes);
    return JSON.parse(maxes);
  };

  const getMax = async () => {
    const maxes = await getMaxes();
    return maxes[lift] || 0;
  };

  const loadMax = async () => {
    const max = await getMax();
    setMax(max);
  };

  const handleTextChange = async (text: string) => {
    if (text === '') {
      setMax(0); // or any default value you prefer
      return;
    }

    const updatedMax = parseFloat(text);

    if (!isNaN(updatedMax)) {
      const maxes = await getMaxes();

      setMax(updatedMax);

      await setStorage(
        '@day_one_maxes',
        JSON.stringify({
          ...maxes,
          [lift]: updatedMax,
        })
      );
    }
  };

  useEffect(() => {
    loadMax();
  }, []);

  return (
    <TextInput
      style={style}
      onChangeText={handleTextChange}
      value={max > 0 ? max.toString() : ''}
      keyboardType="numeric"
    />
  );
}
