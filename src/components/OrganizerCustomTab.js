import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {font} from '../services/helper';
import colors from '../theme/colors';
import {BOTTOM_EVENTS_ICON, BOTTOM_USER_ICON} from '../theme/images';
import LatoText from './LatoText';

export default function OrganizerCustomTab({state, navigation}) {
  const active = state.index;
  const [activeTab, setActiveTab] = useState(active ? active : 1);

  const Icon = ({image, onPress, activeTab}) => {
    return (
      <TouchableOpacity {...{onPress}}>
        <Image
          style={{width: 25, height: 25, tintColor: activeTab}}
          source={image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };
  const changeActive = (i, screen) => {
    if (screen) {
      setActiveTab(i);
      screen === 'EventStack'
        ? navigation.navigate('EventStack', {screen: 'Events'})
        : screen === 'ProfileStack'
        ? navigation.navigate('ProfileStack', {screen: 'Profile'})
        : navigation.navigate(screen);
    } else {
      setActiveTab(i);
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.white,
        justifyContent: 'space-evenly',
        height: 80,
        alignItems: 'center',
      }}>
      <Icon
        image={BOTTOM_EVENTS_ICON}
        onPress={() => changeActive(1, 'EventStack')}
        activeTab={activeTab === 1 ? colors.orange : colors.greyText}
      />

      <View
        activeOpacity={0.7}
        style={[
          styles.shadow,
          {
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: colors.orange,
            marginBottom: 60,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <LatoText
          fontSize={15}
          text={'N_E_L'}
          textAlign={'center'}
          fontName={font.semibold}
          color={colors.white}
        />
      </View>
      <Icon
        image={BOTTOM_USER_ICON}
        onPress={() => changeActive(4, 'ProfileStack')}
        activeTab={activeTab === 4 ? colors.orange : colors.greyText}
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
