import React from 'react';
import {Image, TextInput, View} from 'react-native';
import colors from '../theme/colors';

export default function Input({
  width = '90%',
  height = 50,
  backgroundColor = colors.inputBg,
  borderRadius = 10,
  placeholder,
  value,
  onChangeText,
  source,
  marginTop,
  marginBottom,
  editable,
  secureTextEntry,
}) {
  return (
    <View
      style={{
        width,
        height,
        backgroundColor,
        borderRadius,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        marginTop,
        marginBottom,
      }}>
      {source && (
        <Image
          style={{width: 20, height: 20, tintColor: colors.orange}}
          {...{source}}
          resizeMode="contain"
        />
      )}
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholderTextColor={'#aaa'}
        {...{editable}}
        autoCapitalize="none"
        {...{value}}
        {...{onChangeText}}
        {...{placeholder}}
        style={{
          flex: 1,
          height: '100%',
          paddingHorizontal: source ? 10 : 0,
          color: '#000',
        }}
      />
    </View>
  );
}
