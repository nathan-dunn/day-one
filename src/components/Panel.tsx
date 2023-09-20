import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
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
        <View style={[styles.panelRow]}>
          <Text style={[styles.panelKey, { color }]}>MODE</Text>
          <View
            style={[styles.panelValue, { width: '33%', alignItems: 'center' }]}
          >
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
        </View>

        <View style={[styles.panelRow]}>
          <Text
            style={[styles.panelKey, { color, textTransform: 'uppercase' }]}
          >
            PROGRAM
          </Text>
          <Text style={[styles.panelValue, { color, width: '33%' }]}>
            {programName}
          </Text>
        </View>

        {Object.entries(maxes).map(([lift]) => {
          return (
            <View key={lift} style={[styles.panelRow]}>
              <Text
                style={[styles.panelKey, { color, textTransform: 'uppercase' }]}
              >
                {lift}
              </Text>
              <NumericInput
                maxes={maxes}
                lift={lift}
                style={[
                  styles.input,
                  {
                    color,
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
