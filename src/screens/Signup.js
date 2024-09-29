import moment from 'moment';
import React, {Component} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {connect} from 'react-redux';
import AppLoader from '../components/AppLoader';
import Button from '../components/Button';
import Input from '../components/Input';
import LatoText from '../components/LatoText';
import {font, hp, sHeight, wp} from '../services/helper';
import middleware from '../store/middleware';
import colors from '../theme/colors';
import {
  BOTTOM_USER_ICON,
  CALENDER_ICON,
  EMAIL_ICON,
  HOME_ICON,
  PASSWORD_ICON,
  SPLASH_BG,
} from '../theme/images';
import ActiveTypeButtons from '../components/ActiveTypeButtons';
import {LAN} from '../translation';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      email: '',
      DOB: '',
      DOBISO: '',
      whereLive: '',
      password: '',
      confirmPassword: '',

      loading: false,
      showDatePicker: false,
      activeType: props.userType,
    };
  }

  register = async () => {
    let {email, DOB, whereLive, password, confirmPassword, DOBISO, userName} =
      this.state;
    if (!userName) alert(LAN.EN.SIGNUP.ALERTS.VALIDATIONS.INVALID_NAME);
    else if (!email) alert(LAN.EN.SIGNUP.ALERTS.VALIDATIONS.INVALID_EMAIL);
    else if (!DOBISO) alert(LAN.EN.SIGNUP.ALERTS.VALIDATIONS.INVALID_DOB);
    else if (!whereLive)
      alert(LAN.EN.SIGNUP.ALERTS.VALIDATIONS.INVALID_LOCATION);
    else if (!password)
      alert(LAN.EN.SIGNUP.ALERTS.VALIDATIONS.INVALID_PASSWORD);
    else if (password !== confirmPassword)
      alert(LAN.EN.SIGNUP.ALERTS.VALIDATIONS.PASSWORDS_NOT_MATCH);
    else {
      this.setState({loading: true});
      console.log('this.state', this.state);
      try {
        let res = await this.props._sendEmailOtp(email);
        this.setState({loading: false});
        if (res.success) {
          let body = {
            userName,
            email,
            DOB: DOBISO,
            address: whereLive,
            password,
            isActive: true,
            type: this.props.userType,
            registerType: 'normal',
          };
          this.props.navigation.navigate('VerifyEmail', {
            requestBody: body,
            code: res.code,
          });
        } else {
          console.log('Response not successful: ', res);
          alert(LAN.EN.SIGNUP.ALERTS.ERRORS.SEND_MAIL);
        }
      } catch (error) {
        this.setState({loading: false});
        console.log('Error during registration: ', error);
        alert(LAN.EN.SIGNUP.ALERTS.ERRORS.REGISTRATION);
      }
    }
  };

  onActiveType = e => {
    this.setState({activeType: e});
    this.props._setUserType(e);
  };
  render() {
    let {email, DOB, whereLive, password, confirmPassword, userName} =
      this.state;
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
              height: 700,
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
              text={LAN.EN.SIGNUP.ACCOUNT}
              textAlign="center"
              marginTop={30}
            />
            <LatoText
              fontSize={12}
              color={colors.greyText}
              alignSelf={'center'}
              width={'80%'}
              text={LAN.EN.SIGNUP.HEADING}
              textAlign="center"
              marginTop={20}
            />
            <ActiveTypeButtons
              active={this.state.activeType}
              onChange={e => this.onActiveType(e)}
            />

            <View style={{alignItems: 'center'}}>
              <Input
                value={userName}
                onChangeText={e => this.setState({userName: e})}
                source={BOTTOM_USER_ICON}
                placeholder={LAN.EN.SIGNUP.FIELDS.NAME}
                marginTop={25}
              />
              <Input
                value={email}
                onChangeText={e => this.setState({email: e.trim()})}
                source={EMAIL_ICON}
                placeholder={LAN.EN.SIGNUP.FIELDS.EMAIL}
                marginTop={25}
              />

              <TouchableOpacity
                onPress={() => this.setState({showDatePicker: true})}
                style={{
                  width: '90%',
                  height: 50,
                  backgroundColor: colors.inputBg,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 20,
                  marginTop: 15,
                }}>
                <Image
                  style={{width: 20, height: 20}}
                  source={CALENDER_ICON}
                  resizeMode="contain"
                />
                <LatoText
                  text={DOB || 'DOB'}
                  color={DOB ? '#000' : '#aaa'}
                  marginLeft={20}
                  fontSize={14}
                />
              </TouchableOpacity>

              <Input
                value={whereLive}
                onChangeText={e => this.setState({whereLive: e})}
                source={HOME_ICON}
                placeholder={LAN.EN.SIGNUP.FIELDS.LOCATION}
                marginTop={15}
              />
              <Input
                secureTextEntry={true}
                value={password}
                onChangeText={e => this.setState({password: e.trim()})}
                source={PASSWORD_ICON}
                placeholder={LAN.EN.SIGNUP.FIELDS.PASSWORD}
                marginTop={15}
              />
              <Input
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={e => this.setState({confirmPassword: e.trim()})}
                source={PASSWORD_ICON}
                placeholder={LAN.EN.SIGNUP.FIELDS.CONFIRM_PASSWORD}
                marginTop={15}
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
                onPress={() => this.register()}
                width="90%"
                text={LAN.EN.SIGNUP.SIGN_UP}
              />
            </View>
          </View>

          <Text style={{textAlign: 'center', marginTop: 50, marginBottom: 20}}>
            <LatoText text={LAN.EN.SIGNUP.SUB_TITLE} color={colors.white} />
            <LatoText
              onPress={() => this.props.navigation.goBack()}
              text={LAN.EN.SIGNUP.SIGN_IN}
              color={colors.orange}
              fontSize={16}
              fontName="Poppins-Bold"
            />
          </Text>
        </ScrollView>

        <AppLoader visible={this.state.loading} />

        <DatePicker
          theme="light"
          mode="date"
          modal
          androidVariant="iosClone"
          open={this.state.showDatePicker}
          date={new Date()}
          onConfirm={date => {
            console.log(date);
            this.setState({
              DOB: moment(date).format('DD-MM-YYYY'),
              DOBISO: date,
              showDatePicker: false,
            });
          }}
          onCancel={() => {
            this.setState({showDatePicker: false});
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}

export default connect(state => state, middleware)(Signup);
