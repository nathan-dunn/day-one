import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import SelectBox from 'react-native-multi-selectbox';
import programs from '../programs';
import { Maxes, Program, Colors, Option, Theme } from '../types';
import { findIncrement, makeRange, getColor } from '../utils';

type PanelProps = {
  program: Program;
  handleReset: () => void;
  onClose: () => void;
  onProgramChange: (program: Program) => void;
  onMaxChange: (lift: string, max: number) => void;
};

export default function Panel({
  onClose,
  handleReset,
  program,
  onProgramChange,
  onMaxChange,
}: PanelProps) {
  const maxes: Maxes = program.maxes;
  const BG_2 = getColor(Theme.BG_2);
  const TEXT_1 = getColor(Theme.TEXT_1);
  const TEXT_2 = getColor(Theme.TEXT_2);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          // backgroundColor: BG_2,
          backgroundColor: BG_2,
        },
      ]}
    >
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
            id: program.name,
            item: program.name,
            ...program,
          }))}
          value={{ id: program.name, item: program.name }}
          onChange={onProgramChange}
          hideInputFilter
          arrowIconColor={TEXT_1}
          containerStyle={{
            paddingLeft: 5,
            borderTopWidth: 0,
            borderBottomWidth: 1,
            borderBottomColor: TEXT_2,
          }}
          labelStyle={{ height: 0 }}
          optionContainerStyle={{
            paddingLeft: 5,
            borderTopWidth: 0,
            borderBottomWidth: 1,
            borderBottomColor: TEXT_2,
          }}
          optionsLabelStyle={{
            color: TEXT_2,
          }}
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

        <View style={styles.maxes}>
          {Object.entries(maxes).map(([lift]) => {
            const max = program.maxes[lift];
            const increment = findIncrement(lift);
            const range = makeRange(25, 500, increment);
            const maxOptions = range.map(num => ({
              id: num,
              item: String(num),
            }));

            return (
              <View
                key={lift}
                style={[
                  {
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    borderBottomWidth: 1,
                    borderBottomColor: TEXT_2,
                    paddingBottom: 0,
                    paddingTop: 0,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.rowKey,
                    {
                      paddingLeft: 10,
                      color: TEXT_1,
                      fontSize: 16,
                      width: '60%',
                    },
                  ]}
                >
                  {lift}
                </Text>

                <View
                  style={[
                    styles.rowValue,
                    {
                      flexGrow: 1,
                      padding: 0,
                      paddingTop: 0,
                      paddingBottom: 0,
                      margin: 0,
                      marginTop: 0,
                      marginBottom: 0,
                    },
                  ]}
                >
                  <SelectBox
                    label=""
                    options={maxOptions}
                    value={{ id: max, item: String(max) }}
                    onChange={(val: Option) => onMaxChange(lift, val.id)}
                    hideInputFilter
                    arrowIconColor={TEXT_1}
                    containerStyle={{
                      paddingLeft: 15,
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
                    optionsLabelStyle={{
                      color: TEXT_2,
                      textAlign: 'right',
                      paddingLeft: 10,
                      width: '100%',
                    }}
                    selectedItemStyle={{ color: TEXT_1 }}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </View>
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
    fontFamily: 'Archivo Black',
    textTransform: 'uppercase',
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
  maxes: {
    gap: 20,
  },
});
