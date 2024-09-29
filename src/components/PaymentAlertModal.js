import React from 'react';
import {Image, Modal, View} from 'react-native';
import colors from '../theme/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import LatoText from './LatoText';
import {font} from '../services/helper';
import {CROSS_IMAGE, TICK_IMAGE} from '../theme/images';
import Button from './Button';

export default function PaymentAlertModal({
  visible,
  type = 'tick',
  onPress,
  onCrossPress,
}) {
  return (
    <Modal transparent={true} {...{visible}} animationType="slide">
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.8)'}}>
        <View
          style={{
            width: '90%',
            height: type === 'cross' ? 230 : 320,
            backgroundColor: colors.white,
            alignSelf: 'center',
            marginTop: 150,
            borderRadius: 10,
            padding: 15,
            justifyContent: 'space-between',
          }}>
          {type === 'cross' ? (
            <Entypo
              onPress={onCrossPress}
              name="cross"
              size={30}
              style={{alignSelf: 'flex-end'}}
              color={colors.greyText}
            />
          ) : null}
          <LatoText
            text={
              type === 'tick'
                ? 'Ticket Purchased Successfully'
                : 'Invalid Amount'
            }
            color={type === 'tick' ? colors.green : colors.pink}
            fontName={font.semibold}
            alignSelf="center"
          />
          <Image
            source={type === 'tick' ? TICK_IMAGE : CROSS_IMAGE}
            style={{width: 100, height: 100, alignSelf: 'center'}}
          />

          {type === 'tick' ? (
            <Button
              {...{onPress}}
              height={40}
              textSize={12}
              width={80}
              borderRadius={4}
              backgroundColor={colors.green}
              text="Okay"
              alignSelf={'center'}
            />
          ) : null}
        </View>
      </View>
    </Modal>
  );
}
