import React, {Component} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import AppLoader from '../components/AppLoader';
import Button from '../components/Button';
import Input from '../components/Input';
import LatoText from '../components/LatoText';
import {font, hp, sHeight, wp} from '../services/helper';
import middleware from '../store/middleware';
import colors from '../theme/colors';
import {PASSWORD_ICON, SPLASH_BG} from '../theme/images';
import {LAN} from '../translation';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      confirmPassword: '',
      loading: false,
    };
  }

  forgotPassword = async () => {
    if (!this.state.password) {
      alert(LAN.EN.RESET_PASSWORD.ALERTS.VALIDATIONS.INVALID_PASSWORD);
      return;
    } else if (this.state.password !== this.state.confirmPassword) {
      alert(LAN.EN.RESET_PASSWORD.ALERTS.VALIDATIONS.PASSWORDS_NOT_MATCH);
      return;
    } else {
      this.setState({loading: true});
      let res = await this.props._forgotChangePassword({
        email: this.props.route.params.email,
        password: this.state.password,
      });
      if (res.success) {
        alert(LAN.EN.RESET_PASSWORD.ALERTS.PASSWORD_CHANGED);
        this.props.navigation.navigate('Login');
      } else {
        alert(res?.message);
      }
      this.setState({loading: false});
    }
  };
  render() {
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
              height: 435,
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
              text={LAN.EN.RESET_PASSWORD.TITLE}
              textAlign="center"
              marginTop={30}
            />
            <LatoText
              fontSize={12}
              color={colors.greyText}
              alignSelf={'center'}
              width={'80%'}
              text={LAN.EN.RESET_PASSWORD.HEADING}
              textAlign="center"
              marginTop={20}
            />

            <View style={{alignItems: 'center'}}>
              <Input
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={e => this.setState({password: e.trim()})}
                source={PASSWORD_ICON}
                placeholder={LAN.EN.RESET_PASSWORD.FIELDS.PASSWORD}
                marginTop={15}
              />
              <Input
                secureTextEntry={true}
                value={this.state.confirmPassword}
                onChangeText={e => this.setState({confirmPassword: e.trim()})}
                source={PASSWORD_ICON}
                placeholder={LAN.EN.RESET_PASSWORD.FIELDS.CONFIRM_PASSWORD}
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
                onPress={() => this.forgotPassword()}
                width="90%"
                text={LAN.EN.RESET_PASSWORD.DONE}
              />
            </View>
          </View>

          <Text style={{textAlign: 'center', marginTop: 50, marginBottom: 20}}>
            <LatoText
              text={LAN.EN.RESET_PASSWORD.SUB_TITLE}
              color={colors.white}
            />
            <LatoText
              onPress={() => this.props.navigation.navigate('Login')}
              text={LAN.EN.RESET_PASSWORD.SIGN_IN}
              color={colors.orange}
              fontSize={16}
              fontName="Poppins-Bold"
            />
          </Text>
        </ScrollView>

        <AppLoader visible={this.state.loading} />
      </KeyboardAvoidingView>
    );
  }
}

export default connect(state => state, middleware)(ResetPassword);
