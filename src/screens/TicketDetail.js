import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import {LOCATION_IMG} from '../theme/images';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import colors from '../theme/colors';
import LatoText from '../components/LatoText';
import {font} from '../services/helper';
import moment from 'moment';
import QRCodeModal from '../components/QRCodeModal';

class TicketDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticketDetail: props.route.params?.ticketDetail,
      reviewModal: false,
      qrCodeModal: false,
    };
  }
  render() {
    let {ticketDetail} = this.state;
    return (
      <View style={{flex: 1}}>
        <Header
          navigation={this.props.navigation}
          leftArrow
          title={'Ticket Detail'}
        />
        <View>
          <View
            style={{
              width: '100%',
              height: 180,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={{uri: this.state.ticketDetail?.featureImage}}
              resizeMode="stretch"
            />
            <ActivityIndicator
              style={{position: 'absolute', zIndex: -1}}
              size="small"
              color="#000"
            />
          </View>
          <View
            style={{
              width: '100%',
              height: 40,
              backgroundColor: 'rgba(0,0,0,0.5)',
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: 20,
              paddingLeft: 20,
            }}>
            <View
              style={{
                width: '50%',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              {ticketDetail?.averageRating ? (
                Array(Math.round(ticketDetail?.averageRating))
                  .fill()
                  .map((item, index) => (
                    <Entypo
                      key={index}
                      name="star"
                      size={15}
                      color={colors.golden}
                      style={{marginRight: 5}}
                    />
                  ))
              ) : (
                <LatoText
                  text={'No ratings'}
                  fontSize={15}
                  color={colors.white}
                  fontName={font.medium}
                />
              )}
            </View>
            <TouchableOpacity
              onPress={() => this.setState({qrCodeModal: true})}
              style={{
                width: '25%',
                alignItems: 'center',
                backgroundColor: colors.orange,
                borderRadius: 5,
              }}>
              <LatoText
                text={'QR Code'}
                fontSize={15}
                color={colors.white}
                fontName={font.medium}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            marginTop: 20,
            paddingBottom: 35,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <LatoText text={ticketDetail?.name} fontName={font.medium} />
              <LatoText
                text={`from ${moment(ticketDetail?.eventStartDate).format(
                  'D MMM',
                )} to ${moment(ticketDetail?.eventEndDate).format(
                  'D MMM YYYY',
                )}`}
                fontName={font.light}
              />
              <LatoText
                text={`Ticket Price: $${ticketDetail?.price}`}
                fontName={font.light}
              />
            </View>
          </View>

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <Entypo name="location-pin" size={15} color={colors.orange} />
            <LatoText
              text={ticketDetail?.location}
              fontSize={12}
              color={colors.greyText}
              marginLeft={10}
            />
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <Foundation name="web" size={15} color={colors.orange} />
            <LatoText
              text={ticketDetail?.website}
              fontSize={12}
              color={colors.greyText}
              marginLeft={10}
            />
          </View>

          <LatoText text={ticketDetail?.description} marginTop={20} />

          <View
            style={{
              borderBottomWidth: 0.5,
              borderColor: colors.greyText,
              width: '100%',
              marginTop: 20,
            }}
          />
          {ticketDetail?.reviews?.map((item, index) => (
            <>
              <View
                key={index}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 15,
                    marginTop: 20,
                  }}
                  source={LOCATION_IMG}
                  resizeMode="stretch"
                />
                <View style={{marginLeft: 10}}>
                  <Text>
                    <LatoText text={item?.userID?.userName} />
                    <LatoText text={' left a review'} />
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Entypo
                      name="location-pin"
                      size={15}
                      color={colors.orange}
                    />
                    <LatoText
                      text={item?.userID?.address}
                      fontSize={12}
                      color={colors.greyText}
                      marginLeft={10}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingRight: 20,
                }}>
                {Array(item?.star)
                  .fill()
                  .map((item, index) => (
                    <Entypo
                      key={index}
                      name="star"
                      size={15}
                      color={colors.golden}
                      style={{marginRight: 5}}
                    />
                  ))}
              </View>
              <LatoText text={item?.review} marginTop={10} />
            </>
          ))}
          <QRCodeModal
            close={() => this.setState({qrCodeModal: false})}
            visible={this.state.qrCodeModal}
            item={this.state.ticketDetail}
          />
        </ScrollView>
      </View>
    );
  }
}

export default TicketDetail;
