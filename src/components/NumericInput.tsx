import React, { useRef, useState, useEffect } from 'react';
import { TextInput, StyleProp, TextStyle } from 'react-native';
import { MaxesType } from '../types';
import { getStorage, setStorage } from '../utils';

type NumericInputProps = {
  lift: keyof MaxesType;
  style: StyleProp<TextStyle>;
  maxes: MaxesType;
};

export default function NumericInput({
  lift,
  style,
  maxes,
}: NumericInputProps) {
  const [max, setMax] = useState<number>(0);

  const inputRef = useRef<TextInput | null>(null);

  const getMaxes = async () => {
    const maxes = (await getStorage('@day_one_maxes')) || JSON.stringify({});
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

  const handleFocus = () => {
    // Select all text when the input is focused
    const endPosition = String(max).length;
    inputRef.current &&
      inputRef.current.setNativeProps({
        selection: { start: 0, end: endPosition },
      });
  };

  const handleTextChange = async (text: string) => {
    if (text === '') {
      setMax(0); // or any default value you prefer
      return;
    }

    const updatedMax = parseFloat(text.slice(0, 3));

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
    setMax(maxes[lift] || 0);
  }, [maxes]);

  useEffect(() => {
    loadMax();
  }, []);

  return (
    <TextInput
      ref={inputRef}
      style={style}
      onFocus={handleFocus}
      onChangeText={handleTextChange}
      value={max > 0 ? max.toString() : ''}
      keyboardType="numeric"
    />
  );
}
