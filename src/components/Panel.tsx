import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import programs from '../programs';
import { Maxes, Program, Theme } from '../types';
import { findIncrement, makeRange, getColor } from '../utils';

const { width } = Dimensions.get('window');

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
  const _width = width * 0.85;
  const maxes: Maxes = program.maxes;
  const BG_2 = getColor(Theme.BG_2);
  const BG_1 = getColor(Theme.BG_1);
  const TEXT_1 = getColor(Theme.TEXT_1);
  const TEXT_6 = getColor(Theme.TEXT_6);

  const [showProgramPicker, setShowProgramPicker] = useState(false);
  const [showMaxPicker, setShowMaxPicker] = useState(false);
  const [selectedLift, setSelectedLift] = useState<string>('');

  return (
    <SafeAreaView
      style={[
        styles.container,
        { width: _width, backgroundColor: BG_2, borderRightWidth: 0 },
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
          onPress={() => {
            setSelectedLift('');
            setShowProgramPicker(false);
            setShowMaxPicker(false);
            onClose();
          }}
          onLongPress={handleReset}
        />
      </View>

      <View style={[styles.sectionContainer]}>
        {/* PROGRAM */}
        <Text style={[styles.rowHeader, { fontSize: 20, color: TEXT_1 }]}>
          PROGRAM
        </Text>
        <View style={[styles.row, {}]}>
          <Text
            style={[
              styles.rowKey,
              {
                color: selectedLift ? TEXT_6 : TEXT_1,
              },
            ]}
            onPress={() => {
              setShowProgramPicker(p => !p);
            }}
          >
            {program.name}
          </Text>
        </View>
      </View>

      {/* MAXES */}
      <View style={[styles.sectionContainer, { flexGrow: 1 }]}>
        <Text style={[styles.rowHeader, { color: TEXT_1, fontSize: 20 }]}>
          MAXES
        </Text>

        <View style={[styles.maxes]}>
          {Object.entries(maxes).map(([lift]) => {
            const max = program.maxes[lift];
            const TEXT_COLOR =
              showProgramPicker || (selectedLift && selectedLift !== lift)
                ? TEXT_6
                : TEXT_1;

            return (
              <TouchableOpacity
                key={lift}
                style={[styles.row, {}]}
                onPress={() => {
                  setTimeout(() => {
                    setSelectedLift(p => (p === lift ? '' : lift));
                    setShowMaxPicker(p =>
                      p === false || lift !== selectedLift ? true : false
                    );
                  }, 0);
                }}
              >
                <Text style={[styles.rowKey, { color: TEXT_COLOR }]}>
                  {lift}
                </Text>

                <Text
                  style={[
                    styles.rowValue,
                    {
                      width: '30%',
                      color: TEXT_COLOR,
                      borderColor: TEXT_COLOR,
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 3,
                    },
                  ]}
                >
                  {max}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {showProgramPicker && (
        <Picker
          itemStyle={{ fontSize: 20, color: TEXT_1 }}
          style={{ borderRadius: 3, backgroundColor: BG_1 }}
          selectedValue={program.name} // working ?
          onValueChange={(_, index) => {
            setShowProgramPicker(false);
            onProgramChange(programs[index]);
          }}
        >
          {programs.map((program: Program, index: number) => {
            return (
              <Picker.Item
                key={program.name + index}
                label={program.name}
                value={program.name}
              />
            );
          })}
        </Picker>
      )}
      {showMaxPicker && (
        <Picker
          itemStyle={{ fontSize: 20, color: TEXT_1 }}
          style={{ borderRadius: 3, backgroundColor: BG_1 }}
          selectedValue={String(maxes[selectedLift] || '')} // working ?
          onValueChange={(value: string) => {
            onMaxChange(selectedLift, Number(value));
          }}
        >
          {makeRange(25, 500, findIncrement(selectedLift)).map(
            (weight: number, index: number) => {
              return (
                <Picker.Item
                  key={String(weight) + index}
                  label={String(weight)}
                  value={String(weight)}
                />
              );
            }
          )}
        </Picker>
      )}
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
  rowHeader: {
    fontSize: 18,
    paddingVertical: 10,
    fontFamily: 'Archivo Black',
    textTransform: 'uppercase',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  rowKey: {
    fontSize: 18,
    paddingLeft: 10,
    textTransform: 'uppercase',
  },
  rowValue: {
    fontSize: 18,
    textAlign: 'center',
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
    gap: 10,
    paddingRight: 40,
  },
});
