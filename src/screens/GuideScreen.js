import React from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import Button from '../components/Button';
import LatoText from '../components/LatoText';
import {font, sHeight, wp, hp} from '../services/helper';
import colors from '../theme/colors';
import {GUIDE} from '../theme/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import middleware from '../store/middleware';

const WIDTH = wp(100);

const data = {
  title: 'Your personal guide',
  image: GUIDE,
  subTitle: 'We’re happy to guide you to the discovery of wonderful places',
};
const GuideScreen = ({navigation, _info}, props) => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: sHeight + 10,
        backgroundColor: colors.white,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="left" size={18} color={colors.orange} />
          <LatoText
            text={'Back'}
            marginLeft={10}
            color={colors.orange}
            fontName={font.medium}
            fontSize={18}
          />
        </TouchableOpacity>
        <LatoText
          onPress={() => {
            navigation.navigate('Login');
            _info(true);
          }}
          text={'Skip'}
          marginLeft={10}
          color={colors.orange}
          fontName={font.medium}
          fontSize={18}
        />
      </View>

      <View
        style={[
          styles.container,
          {paddingHorizontal: 0, alignItems: 'center'},
        ]}>
        <View
          style={{
            flex: 0.6,
            width: WIDTH,
            paddingHorizontal: 20,
            justifyContent: 'space-evenly',
          }}>
          <Image
            style={{width: '100%', height: hp(40), backgroundColor: 'red'}}
            resizeMode="stretch"
            source={data.image}
          />
          <View>
            <LatoText
              text={data.title}
              ma
              color={colors.orange}
              marginBottom={20}
              fontSize={25}
              textAlign="center"
            />
            <LatoText
              text={data.subTitle}
              color={colors.greyText}
              fontSize={15}
              textAlign="center"
            />
          </View>
        </View>
      </View>

      <Button
        onPress={() => {
          navigation.navigate('Login');
          _info(true);
        }}
        text={'Continue'}
        borderRadius={20}
        marginBottom={30}
      />
    </View>
  );
};

export default connect(state => state, middleware)(GuideScreen);

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    paddingTop: sHeight,
  },
});
