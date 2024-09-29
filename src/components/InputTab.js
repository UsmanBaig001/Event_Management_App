import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import colors from '../theme/colors';
import LatoText from './LatoText';

export default function InputTab({
  title,
  value,
  onChangeText,
  editable,
  keyboardType,
}) {
  return (
    <View
      style={[
        styles.shadow,
        {
          width: '90%',
          height: 74,
          backgroundColor: colors.white,
          borderRadius: 4,
          marginTop: 20,
          paddingHorizontal: 10,
          paddingTop: 10,
        },
      ]}>
      <LatoText text={title} fontSize={14} color={colors.greyText} />
      <TextInput
        keyboardType={keyboardType}
        {...{editable}}
        {...{value}}
        {...{onChangeText}}
        style={{color: '#000', fontSize: 16, width: '100%', height: 40}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
