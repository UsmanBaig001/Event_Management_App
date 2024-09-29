import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import Button from '../components/Button';
import LatoText from '../components/LatoText';
import {font, wp} from '../services/helper';
import colors from '../theme/colors';
import {SPLASH_BG} from '../theme/images';

class OnBoarding extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}
          source={SPLASH_BG}
        />
        <View
          style={{
            flex: 0.6,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{alignItems: 'center'}}>
            <LatoText
              text={'N_E_L'}
              fontSize={wp(17)}
              color={colors.white}
              fontName={font.bold}
            />
            <LatoText
              text={'Nearby Event Locator'}
              fontSize={wp(5)}
              color={colors.white}
              fontName={font.bold}
            />
          </View>
          <Button
            onPress={() =>
              this.props.navigation.navigate(
                this.props.info ? 'Login' : 'GuideScreen',
              )
            }
            text={'GET STARTED'}
            marginBottom={70}
          />
        </View>
      </View>
    );
  }
}

export default connect(state => state)(OnBoarding);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
