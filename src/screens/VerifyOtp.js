import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from '../components/Button';
import LatoText from '../components/LatoText';
import {font, hp, sHeight, wp} from '../services/helper';
import colors from '../theme/colors';
import {SPLASH_BG} from '../theme/images';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {connect} from 'react-redux';
import middleware from '../store/middleware';
import {LAN} from '../translation';

const CELL_COUNT = 5;
const VerifyOtp = props => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(props.route.params?.code);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props1, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const resendCode = async () => {
    setLoading(true);
    let res = await props._sendEmailOtp(
      props.route.params.requestBody?.email,
      'forget',
    );
    setLoading(false);
    if (res.success) {
      alert(LAN.EN.OTP.ALERTS.SENT_AGAIN);
      setCode(res.code);
      setValue('');
    }
  };

  const verifyCode = async () => {
    if (value.length === 5 && code === value) {
      setValue('');
      props.navigation.navigate('ResetPassword', {
        email: props.route.params.requestBody?.email,
      });
    } else {
      alert(LAN.EN.OTP.ALERTS.VALIDATIONS.INCORRECT_OTP);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{paddingTop: sHeight}}>
      <Image
        style={{
          position: 'absolute',
          width: '100%',
          height: hp(100) + sHeight,
          zIndex: -1,
          top: 0,
        }}
        source={SPLASH_BG}
      />
      <ScrollView contentContainerStyle={{width: '100%', minHeight: hp(100)}}>
        <View
          style={{
            width: '85%',
            height: 380,
            backgroundColor: colors.white,
            borderRadius: 20,
            alignSelf: 'center',
            marginTop: 100,
          }}>
          <View
            style={{
              height: 127,
              backgroundColor: colors.orange,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LatoText
              text={LAN.EN.APP_NAME}
              textAlign="center"
              fontSize={wp(6)}
              color={colors.white}
              fontName={font.semibold}
            />
          </View>

          <LatoText
            fontSize={15}
            alignSelf={'center'}
            text={LAN.EN.OTP.TITLE}
            textAlign="center"
            marginTop={30}
          />
          <LatoText
            fontSize={12}
            color={colors.greyText}
            alignSelf={'center'}
            width={'80%'}
            text={LAN.EN.OTP.HEADING}
            textAlign="center"
            marginTop={20}
          />

          <View style={{alignItems: 'center', width: '100%'}}>
            <CodeField
              ref={ref}
              props={props1}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              // keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: -25,
              width: '100%',
              alignItems: 'center',
            }}>
            <Button
              onPress={() => verifyCode()}
              width="90%"
              text={LAN.EN.OTP.VERIFY}
            />
          </View>
        </View>

        <Text style={{textAlign: 'center', marginTop: 50, marginBottom: 20}}>
          {/* <LatoText text={"Go back to "} color={colors.white} /> */}
          <LatoText
            onPress={() => resendCode()}
            text={LAN.EN.OTP.RESEND}
            color={colors.orange}
            fontSize={16}
            fontName="Poppins-Bold"
          />
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default connect(null, middleware)(VerifyOtp);

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {width: '90%', marginTop: 30},
  cell: {
    width: wp(10),
    height: wp(10),
    lineHeight: 38,
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    borderRadius: 6,
    color: '#000',
  },
  focusCell: {
    borderColor: colors.orange,
    borderRadius: 6,
  },
});
