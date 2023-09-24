import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import NumericInput from './NumericInput';
import { colors } from '../constants';
import { MaxesType } from '../types';

type PanelProps = {
  onOptionSelected?: (option: string) => void;
  onClose: () => void;
  maxes: MaxesType;
  programName: string;
  handleReset: () => void;
};

export default function Panel({ onClose, maxes, handleReset }: PanelProps) {
  const BG_1 = colors.DARK_BLACK;
  const TEXT_1 = colors.WHITE;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: BG_1 }]}>
      <TouchableOpacity onPress={onClose} style={styles.content}>
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <Feather
            name={'x'}
            size={24}
            color={TEXT_1}
            alignSelf="flex-end"
            padding={20}
            onPress={onClose}
            onLongPress={handleReset}
          />
        </View>

        <View style={styles.rows}>
          {/* PROGRAM */}
          {/* <View style={[styles.row]}>
          <Text style={[styles.rowKey, { color }]}>PROGRAM</Text>
          <Text style={[styles.rowValue, { color }]}>{programName}</Text>
        </View> */}

          {/* MAXES */}
          <View style={[styles.maxesContainer]}>
            <View style={[styles.row, {}]}>
              <Text style={[styles.rowKey, { color: TEXT_1, fontSize: 20 }]}>
                MAXES
              </Text>
            </View>

            {Object.entries(maxes).map(([lift]) => {
              return (
                <View key={lift} style={[styles.row]}>
                  <Text style={[styles.rowKey, { color: TEXT_1 }]}>{lift}</Text>
                  <NumericInput
                    maxes={maxes}
                    lift={lift}
                    style={[
                      styles.input,
                      { color: TEXT_1, borderColor: TEXT_1 },
                    ]}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    paddingTop: 0,
  },
  maxesContainer: {
    padding: 20,
    borderRadius: 5,
  },
  rows: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 10,
    width: '100%',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rowKey: {
    fontSize: 18,
    paddingVertical: 10,
    textTransform: 'uppercase',
    fontFamily: 'Archivo Black',
  },
  rowValue: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: 'center',
    fontFamily: 'Archivo Black',
  },
  input: {
    height: 40,
    borderWidth: 2,
    padding: 10,
    width: '33%',
    textAlign: 'center',
    fontSize: 16,
    borderRadius: 2,
  },
});
