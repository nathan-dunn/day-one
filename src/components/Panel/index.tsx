import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import programs from '../../programs';
import { Maxes, Program } from '../../types';
import { findIncrement, makeRange } from '../../utils';

const { width } = Dimensions.get('window');

type PanelProps = {
  program: Program;
  handleReset: () => void;
  onClose: () => void;
  onProgramChange: (program: Program) => void;
  onMaxChange: (lift: string, max: number) => void;
  onshowNotesChange: (showNotes: boolean) => void;
  showNotes: boolean;
  showAnimation: boolean;
  onAnimationChange: (showAnimation: boolean) => void;
  showDayName: boolean;
  onDayNameChange: (showDayName: boolean) => void;
  BG_1: string;
  BG_2: string;
  TEXT_1: string;
  TEXT_2: string;
};

export default function Panel({
  onClose,
  handleReset,
  program,
  onProgramChange,
  onMaxChange,
  onshowNotesChange,
  showNotes,
  showAnimation,
  onAnimationChange,
  showDayName,
  onDayNameChange,
  BG_1,
  BG_2,
  TEXT_1,
  TEXT_2,
}: PanelProps) {
  const _width = width * 0.85;
  const maxes: Maxes = program.maxes;

  const [showProgramPicker, setShowProgramPicker] = useState(false);
  const [showMaxPicker, setShowMaxPicker] = useState(false);
  const [selectedLift, setSelectedLift] = useState<string>('');

  return (
    <SafeAreaView
      style={[
        styles.container,
        { width: _width, backgroundColor: BG_1, borderRightWidth: 0 },
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

      {/* PROGRAM */}
      <View style={[styles.sectionContainer]}>
        <Text
          style={[styles.rowHeader, { color: selectedLift ? TEXT_2 : TEXT_1 }]}
        >
          PROGRAM
        </Text>
        <View style={[styles.row, {}]}>
          <Text
            style={[styles.rowKey, { color: selectedLift ? TEXT_2 : TEXT_1 }]}
            onPress={() => {
              setSelectedLift('');
              setShowMaxPicker(false);
              setShowProgramPicker(p => !p);
            }}
          >
            {program.name}
          </Text>
        </View>
        {showProgramPicker && (
          <Picker
            itemStyle={{ fontSize: 20, color: TEXT_1 }}
            style={{}}
            selectedValue={program.name}
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
      </View>

      {/* MAXES */}
      <View style={[styles.sectionContainer]}>
        <Text
          style={[
            styles.rowHeader,
            { color: showProgramPicker ? TEXT_2 : TEXT_1 },
          ]}
        >
          MAXES
        </Text>

        <View style={[styles.maxesContainer]}>
          {Object.entries(maxes).map(([lift], index) => {
            const max = program.maxes[lift];
            const TEXT_COLOR =
              showProgramPicker || (selectedLift && selectedLift !== lift)
                ? TEXT_2
                : TEXT_1;

            return (
              <TouchableOpacity
                testID="close-button"
                key={lift + index}
                style={[styles.row, {}]}
                onPress={() => {
                  setTimeout(() => {
                    setShowProgramPicker(false);
                    setSelectedLift(p => (p === lift ? '' : lift));
                    setShowMaxPicker(p =>
                      p === false || lift !== selectedLift ? true : false
                    );
                  }, 0);
                }}
              >
                <Text
                  style={[
                    styles.rowKey,
                    { textTransform: 'uppercase', color: TEXT_COLOR },
                  ]}
                >
                  {lift}
                </Text>

                <Text
                  style={[
                    styles.rowValue,
                    styles.input,
                    {
                      color: TEXT_COLOR,
                      borderColor: TEXT_COLOR,
                    },
                  ]}
                >
                  {max}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {showMaxPicker && (
          <Picker
            itemStyle={{ fontSize: 20, color: TEXT_1 }}
            style={{}}
            selectedValue={String(maxes[selectedLift] || '')}
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
      </View>

      <View style={[styles.sectionContainer]}>
        <Text
          style={[
            styles.rowHeader,
            { color: showProgramPicker || selectedLift ? TEXT_2 : TEXT_1 },
          ]}
        >
          PREFERENCES
        </Text>
        <View style={[styles.preferencesContainer]}>
          <TouchableOpacity style={[styles.row, {}]} onPress={() => {}}>
            <Text
              style={[
                styles.rowKey,
                { color: showProgramPicker || selectedLift ? TEXT_2 : TEXT_1 },
              ]}
            >
              Show Notes
            </Text>

            <Switch
              trackColor={{ false: TEXT_2, true: BG_2 }}
              thumbColor={showNotes ? TEXT_1 : TEXT_1}
              ios_backgroundColor={TEXT_2}
              onValueChange={onshowNotesChange}
              value={showNotes}
              disabled={showProgramPicker || selectedLift ? true : false}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.row, {}]} onPress={() => {}}>
            <Text
              style={[
                styles.rowKey,
                { color: showProgramPicker || selectedLift ? TEXT_2 : TEXT_1 },
              ]}
            >
              Show Animation
            </Text>

            <Switch
              trackColor={{ false: TEXT_2, true: BG_2 }}
              thumbColor={showNotes ? TEXT_1 : TEXT_1}
              ios_backgroundColor={TEXT_2}
              onValueChange={onAnimationChange}
              value={showAnimation}
              disabled={showProgramPicker || selectedLift ? true : false}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.row, {}]} onPress={() => {}}>
            <Text
              style={[
                styles.rowKey,
                { color: showProgramPicker || selectedLift ? TEXT_2 : TEXT_1 },
              ]}
            >
              Show Day Name
            </Text>

            <Switch
              trackColor={{ false: TEXT_2, true: BG_2 }}
              thumbColor={showNotes ? TEXT_1 : TEXT_1}
              ios_backgroundColor={TEXT_2}
              onValueChange={onDayNameChange}
              value={showDayName}
              disabled={showProgramPicker || selectedLift ? true : false}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRightWidth: 1,
    gap: 30,
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
    paddingHorizontal: 20,
  },
  rowHeader: {
    fontSize: 20,
    paddingVertical: 20,
    fontFamily: 'Archivo Black',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowKey: {
    fontSize: 18,
    paddingLeft: 10,
  },
  rowValue: {
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    width: '30%',
    borderWidth: 1,
    padding: 5,
    borderRadius: 3,
  },
  maxesContainer: {
    gap: 15,
  },
  preferencesContainer: {
    gap: 15,
  },
});
