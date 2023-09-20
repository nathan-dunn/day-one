import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import NumericInput from './NumericInput';
import { setStorage } from '../utils';
import { WHITE, LIGHT_BLACK } from '../constants';
import styles from '../styles';
import { Mode, MaxesType } from '../types';

type PanelProps = {
  onOptionSelected?: (option: string) => void;
  onClose: () => void;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode | undefined>>;
  maxes: MaxesType;
  programName: string;
  reset: () => void;
};

export default function Panel({
  onClose,
  mode,
  setMode,
  maxes,
  programName,
  reset,
}: PanelProps) {
  const color = mode === Mode.light ? LIGHT_BLACK : WHITE;
  return (
    <SafeAreaView
      style={[
        styles.panelContainer,
        { backgroundColor: mode === Mode.light ? WHITE : LIGHT_BLACK },
      ]}
    >
      {/* HEADER */}
      <View style={styles.panelHeaderContainer}>
        <Feather
          name={'x'}
          size={24}
          color={mode === Mode.light ? LIGHT_BLACK : WHITE}
          alignSelf="flex-end"
          padding={20}
          onPress={onClose}
          onLongPress={reset}
        />
      </View>

      <View style={styles.panelRowsContainer}>
        {/* MODE */}
        <TouchableOpacity
          style={[styles.panelRow]}
          onPress={() => {
            const updated = mode === Mode.light ? Mode.dark : Mode.light;
            setStorage('@day_one_mode', updated);
            setMode(updated);
          }}
        >
          <Text style={[styles.panelKey, { color }]}>MODE</Text>
          <View
            style={[
              styles.panelRow,
              { justifyContent: 'center', width: '33%' },
            ]}
          >
            <Feather
              name={mode === Mode.light ? 'sun' : 'moon'}
              size={24}
              color={mode === Mode.light ? LIGHT_BLACK : WHITE}
            />
          </View>
        </TouchableOpacity>

        {/* PROGRAM */}
        {/* <View style={[styles.panelRow]}>
          <Text style={[styles.panelKey, { color }]}>PROGRAM</Text>
          <Text style={[styles.panelValue, { color }]}>{programName}</Text>
        </View> */}

        {/* MAXES */}
        {Object.entries(maxes).map(([lift]) => {
          return (
            <View key={lift} style={[styles.panelRow]}>
              <Text style={[styles.panelKey, { color }]}>{lift}</Text>
              <NumericInput
                maxes={maxes}
                lift={lift}
                style={[
                  styles.input,
                  { color, borderColor: color, borderWidth: 1 },
                ]}
              />
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
