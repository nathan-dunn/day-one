import React, { useRef, useState, useEffect } from 'react';
import {
  TextInput,
  StyleProp,
  TouchableWithoutFeedback,
  TextStyle,
  Keyboard,
} from 'react-native';
import { Maxes, Program } from '../types';
import { getStorage, setStorage } from '../utils';

type MaxInputProps = {
  lift: keyof Maxes;
  style: StyleProp<TextStyle>;
  maxes: Maxes;
  program: Program;
};

export default function MaxInput({
  lift,
  style,
  maxes,
  program,
}: MaxInputProps) {
  const [max, setMax] = useState<number>(0);

  const inputRef = useRef<TextInput | null>(null);

  const getMaxes = async () => {
    const maxes =
      (await getStorage(`@day_one_maxes_${program.name}`)) ||
      JSON.stringify({});
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
    const endPosition = String(max).length;
    inputRef.current?.setNativeProps({
      selection: { start: 0, end: endPosition },
    });
  };

  const handleBlur = () => {
    inputRef.current?.blur();
  };

  const handleTextChange = async (text: string) => {
    if (text === '') {
      setMax(0);
      return;
    }

    const pattern = /^(?:\d{1,3}(?:\.\d)?)?$/;

    if (pattern.test(text)) {
      const updatedMax = parseFloat(text);

      setMax(updatedMax);

      const maxes = await getMaxes();
      await setStorage(
        `@day_one_maxes_${program.name}`,
        JSON.stringify({ ...maxes, [lift]: updatedMax })
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <TextInput
        ref={inputRef}
        style={style}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleTextChange}
        value={String(max)}
        keyboardType="numeric"
      />
    </TouchableWithoutFeedback>
  );
}
