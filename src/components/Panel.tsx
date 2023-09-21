import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import NumericInput from './NumericInput';
import { setStorage } from '../utils';
import { WHITE, LIGHT_BLACK, MED_BLACK } from '../constants';
import { Mode, MaxesType } from '../types';

type PanelProps = {
  onOptionSelected?: (option: string) => void;
  onClose: () => void;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode | undefined>>;
  maxes: MaxesType;
  programName: string;
  handleReset: () => void;
};

export default function Panel({
  onClose,
  mode,
  setMode,
  maxes,
  handleReset,
}: PanelProps) {
  const backgroundColor = mode === Mode.light ? WHITE : MED_BLACK;
  const PRIMARY_TEXT = mode === Mode.light ? LIGHT_BLACK : WHITE;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <Feather
          name={'x'}
          size={24}
          color={PRIMARY_TEXT}
          alignSelf="flex-end"
          padding={20}
          onPress={onClose}
          onLongPress={handleReset}
        />
      </View>

      <View style={styles.rows}>
        {/* MODE */}
        <TouchableOpacity
          style={[styles.row]}
          onPress={() => {
            const updated = mode === Mode.light ? Mode.dark : Mode.light;
            setStorage('@day_one_mode', updated);
            setMode(updated);
          }}
        >
          <Text style={[styles.rowKey, { color: PRIMARY_TEXT }]}>MODE</Text>
          <View
            style={[styles.row, { justifyContent: 'center', width: '33%' }]}
          >
            <Feather
              name={mode === Mode.light ? 'sun' : 'moon'}
              size={24}
              color={PRIMARY_TEXT}
            />
          </View>
        </TouchableOpacity>

        {/* PROGRAM */}
        {/* <View style={[styles.row]}>
          <Text style={[styles.rowKey, { color }]}>PROGRAM</Text>
          <Text style={[styles.rowValue, { color }]}>{programName}</Text>
        </View> */}

        {/* MAXES */}
        {Object.entries(maxes).map(([lift]) => {
          return (
            <View key={lift} style={[styles.row]}>
              <Text style={[styles.rowKey, { color: PRIMARY_TEXT }]}>
                {lift}
              </Text>
              <NumericInput
                maxes={maxes}
                lift={lift}
                style={[
                  styles.input,
                  {
                    color: PRIMARY_TEXT,
                    borderColor: PRIMARY_TEXT,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowKey: {
    fontSize: 20,
    paddingVertical: 10,
    textTransform: 'uppercase',
  },
  rowValue: {
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'center',
  },
  headerContainer: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    paddingTop: 0,
  },
  rows: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    paddingLeft: 20,
    paddingRight: 40,
    paddingVertical: 10,
    width: '100%',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '33%',
    textAlign: 'center',
    fontSize: 16,
    borderRadius: 2,
  },
});
