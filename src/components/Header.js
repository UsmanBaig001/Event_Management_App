import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import LatoText from './LatoText';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../theme/colors';
import {font} from '../services/helper';

export default function Header({
  leftArrow,
  navigation,
  rightEdit,
  onEditPress,
  rightAddIcon,
  addEvent,
  title,
}) {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 100,
        backgroundColor: colors.orange,
        paddingTop: 15,
      }}>
      <View
        style={{
          zIndex: 1,
          paddingLeft: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {leftArrow ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={30} color={colors.white} />
          </TouchableOpacity>
        ) : (
          <LatoText text={''} />
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          alignItems: 'center',
          paddingTop: 15,
        }}>
        {title && (
          <LatoText
            text={title || 'SIGN UP'}
            color={colors.white}
            fontName={font.semibold}
            fontSize={25}
          />
        )}
      </View>
      <View style={{paddingRight: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {rightAddIcon && (
            <TouchableOpacity
              onPress={() => addEvent()}
              style={{marginRight: 0}}>
              <AntDesign name="plus" size={20} color={colors.white} />
            </TouchableOpacity>
          )}
          {rightEdit ? (
            <TouchableOpacity onPress={onEditPress} style={{marginRight: 0}}>
              <AntDesign name="edit" size={20} color={colors.white} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}
