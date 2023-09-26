import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import SelectBox from 'react-native-multi-selectbox';
import MaxInput from './MaxInput';
import { colors } from '../constants';
import { MaxesType, ProgramType } from '../types';

type PanelProps = {
  highlightColor: string;
  maxes: MaxesType;
  programs: ProgramType[];
  program: ProgramType;
  handleReset: () => void;
  onClose: () => void;
  setProgram: (program: ProgramType) => void;
};

export default function Panel({
  onClose,
  maxes,
  handleReset,
  highlightColor,
  programs,
  program,
  setProgram,
}: PanelProps) {
  const BG_1 = colors.DARK_BLACK;
  const TEXT_1 = colors.WHITE;
  const TEXT_2 = colors.MED_GRAY;

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: BG_1, borderRightColor: highlightColor },
      ]}
    >
      <TouchableOpacity style={styles.content} onPress={onClose}>
        {/* HEADER */}
        <View style={[styles.headerContainer]}>
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

        <View style={[styles.sectionContainer]}>
          {/* PROGRAM */}
          <View style={[styles.row, {}]}>
            <Text style={[styles.rowKey, { color: TEXT_1, fontSize: 20 }]}>
              PROGRAM
            </Text>
          </View>

          <SelectBox
            label=""
            options={programs.map(program => ({
              item: program.name,
              id: program.name,
              ...program,
            }))}
            value={{ id: program.name, item: program.name }}
            onChange={setProgram}
            hideInputFilter
            arrowIconColor={TEXT_1}
            containerStyle={{
              paddingLeft: 5,
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
            labelStyle={{ height: 0 }}
            optionContainerStyle={{
              paddingLeft: 5,
              borderTopWidth: 0,
              borderBottomWidth: 1,
              borderBottomColor: TEXT_2,
            }}
            optionsLabelStyle={{ color: TEXT_2 }}
            selectedItemStyle={{ color: TEXT_1 }}
          />
        </View>

        {/* MAXES */}
        <View style={[styles.sectionContainer, { flexGrow: 1 }]}>
          <View style={[styles.row, {}]}>
            <Text style={[styles.rowKey, { color: TEXT_1, fontSize: 20 }]}>
              MAXES
            </Text>
          </View>

          {Object.entries(maxes).map(([lift]) => {
            return (
              <View key={lift} style={[styles.row]}>
                <Text style={[styles.rowKey, { color: TEXT_1 }]}>{lift}</Text>
                <MaxInput
                  program={program}
                  maxes={maxes}
                  lift={lift}
                  style={[styles.input, { color: TEXT_1, borderColor: TEXT_1 }]}
                />
              </View>
            );
          })}
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRightWidth: 1,
  },
  content: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    width: '100%',
    paddingTop: 0,
  },
  sectionContainer: {
    padding: 20,
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
