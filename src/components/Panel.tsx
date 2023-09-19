import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import NumericInput from './NumericInput';
import { getStorage, setStorage } from '../utils';
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
};

export default function Panel({
  onClose,
  mode,
  setMode,
  maxes,
  programName,
}: PanelProps) {
  const color = mode === Mode.light ? LIGHT_BLACK : WHITE;
  return (
    <SafeAreaView
      style={[
        styles.panelContainer,
        { backgroundColor: mode === Mode.light ? WHITE : LIGHT_BLACK },
      ]}
    >
      <View style={styles.panelHeaderContainer}>
        <Feather
          name={'x'}
          size={24}
          color={mode === Mode.light ? LIGHT_BLACK : WHITE}
          alignSelf="flex-end"
          padding={20}
          onPress={onClose}
        />
      </View>

      <View style={styles.panelRowsContainer}>
        <View style={[styles.panelRow]}>
          <Text style={[styles.panelOption, { color }]}>MODE</Text>
          <Feather
            name={mode === Mode.light ? 'sun' : 'moon'}
            size={24}
            color={mode === Mode.light ? LIGHT_BLACK : WHITE}
            onPress={() => {
              const updated = mode === Mode.light ? Mode.dark : Mode.light;
              setStorage('@day_one_mode', updated);
              setMode(updated);
            }}
          />
        </View>

        <View style={[styles.panelRow]}>
          <Text
            style={[styles.panelOption, { color, textTransform: 'uppercase' }]}
          >
            PROGRAM
          </Text>
          <Text style={[styles.panelOption, { color }]}>{programName}</Text>
        </View>

        {Object.entries(maxes).map(([lift, max]) => {
          return (
            <View key={lift} style={[styles.panelRow]}>
              <Text
                style={[
                  styles.panelOption,
                  { color, textTransform: 'uppercase' },
                ]}
              >
                {lift}
              </Text>
              <NumericInput
                value={max}
                onChange={val => {
                  console.log(`${lift} val:`, val);
                }}
                style={[
                  styles.input,
                  {
                    color,
                    // borderColor: 'transparent',
                    borderColor: color,
                    borderWidth: 1,
                  },
                ]}
              />
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
