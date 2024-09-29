import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import AppLoader from '../components/AppLoader';
import Header from '../components/Header';
import LatoText from '../components/LatoText';
import middleware from '../store/middleware';
import colors from '../theme/colors';

const data = [
  {source: require('../assets/images/jazzCash.png'), title: 'JazzCash'},
  {source: require('../assets/images/easyPaisa.png'), title: 'Easy Paisa'},
  {source: require('../assets/images/PayPal.png'), title: 'PayPal'},
  {
    source: require('../assets/images/bankTransfer.png'),
    title: 'Bank Transfer',
  },
];

class PaymentMethodScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }
  handler = val => {
    this.props.navigation.navigate('JazzcashCardDetailScreen', {
      eventDetail: this.props.route.params?.eventDetail,
    });
  };
  render() {
    console.log(this.props.userType, 'usertye....');
    return (
      <View style={{flex: 1, backgroundColor: colors.white, width: '100%'}}>
        <Header
          leftArrow
          navigation={this.props.navigation}
          title={'Payment Methods'}
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 10,
          }}>
          <FlatList
            contentContainerStyle={{
              marginTop: 10,
              width: '100%',
              paddingBottom: 35,
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => this.handler(item?.title)}
                style={[
                  styles.tabContainerShadow,
                  {
                    width: '45%',
                    height: 180,
                    backgroundColor: 'white',
                    justifyContent: 'space-evenly',
                    borderRadius: 30,
                    alignSelf: 'center',
                    alignItems: 'center',
                    margin: 10,
                  },
                ]}>
                <Image
                  style={{width: '50%', height: 50, alignSelf: 'center'}}
                  source={item.source}
                  resizeMode="contain"
                />
                <LatoText
                  text={item.title}
                  fontSize={16}
                  color={colors.black}
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <AppLoader visible={this.state.loading} />
      </View>
    );
  }
}

export default connect(state => state, middleware)(PaymentMethodScreen);
const styles = StyleSheet.create({
  tabContainerShadow: {
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
