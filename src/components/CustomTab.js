import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {font} from '../services/helper';
import colors from '../theme/colors';
import {
  BOTTOM_EVENTS_ICON,
  BOTTOM_HEART_ICON,
  BOTTOM_MAP_ICON,
  BOTTOM_USER_ICON,
} from '../theme/images';
import LatoText from './LatoText';

export default function CustomTab({state, descriptors, navigation}) {
  const active = state.index;
  const [activeTab, setActiveTab] = useState(active);
  useEffect(() => {
    setActiveTab(state.index);
  }, [state.index]);

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
      screen === 'CatScreens'
        ? navigation.navigate('CatScreens', {screen: 'NearestEvents'})
        : screen === 'EventStack'
        ? navigation.navigate('EventStack', {screen: 'Events'})
        : screen === 'MapStack'
        ? navigation.navigate('MapStack', {screen: 'BuyTickets'})
        : screen === 'BookmarkStack'
        ? navigation.navigate('BookmarkStack', {screen: 'Bookmarks'})
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
        image={BOTTOM_MAP_ICON}
        onPress={() => changeActive(0, 'CatScreens')}
        activeTab={activeTab === 0 ? colors.orange : colors.greyText}
      />
      <Icon
        image={BOTTOM_EVENTS_ICON}
        onPress={() => changeActive(1, 'EventStack')}
        activeTab={activeTab === 1 ? colors.orange : colors.greyText}
      />

      <TouchableOpacity
        onPress={() => changeActive(2, 'MapStack')}
        activeOpacity={0.7}
        style={[
          styles.shadow,
          {
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: activeTab === 2 ? colors.orange : colors.white,
            marginBottom: 60,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <LatoText
          fontSize={10}
          text={'Purchased Tickets'}
          textAlign={'center'}
          fontName={font.semibold}
          color={activeTab === 2 ? colors.white : colors.orange}
        />
      </TouchableOpacity>

      <Icon
        image={BOTTOM_HEART_ICON}
        onPress={() => changeActive(3, 'BookmarkStack')}
        activeTab={activeTab === 3 ? colors.orange : colors.greyText}
      />
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
