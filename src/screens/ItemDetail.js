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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import colors from '../theme/colors';
import LatoText from '../components/LatoText';
import {font} from '../services/helper';
import moment from 'moment';
import RateModal from '../components/RateModal';
import Fav from '../components/Fav';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventDetail: props.route.params?.eventDetail,
      reviewModal: false,
    };
  }
  render() {
    let {eventDetail} = this.state;
    return (
      <View style={{flex: 1}}>
        <Header
          navigation={this.props.navigation}
          leftArrow
          title={'Event Detail'}
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
              source={{uri: this.state.eventDetail?.featureImage}}
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
              {eventDetail?.averageRating ? (
                Array(Math.round(eventDetail?.averageRating))
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

            {!this.props.route.params?.type ? (
              eventDetail?.price === 0 ||
              eventDetail?.price === '0' ||
              !eventDetail?.price ? null : (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('PaymentMethodScreen', {
                      eventDetail,
                    })
                  }
                  style={{
                    width: '20%',
                    alignItems: 'center',
                    backgroundColor: colors.orange,
                    borderRadius: 5,
                  }}>
                  <LatoText
                    text={'BUY'}
                    fontSize={15}
                    color={colors.white}
                    fontName={font.medium}
                  />
                </TouchableOpacity>
              )
            ) : (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('QRCodeScannerScreen', {
                    eventDetail,
                  })
                }
                style={{
                  width: '25%',
                  alignItems: 'center',
                  backgroundColor: colors.orange,
                  borderRadius: 5,
                }}>
                <LatoText
                  text={'Scan QR'}
                  fontSize={15}
                  color={colors.white}
                  fontName={font.medium}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            marginTop: 20,
            paddingBottom: 35,
            height: '100%',
          }}>
          <Pressable
            style={{
              position: 'absolute',
              bottom: 30,
              right: 20,
            }}
            onPress={() => this.props.navigation.navigate('ChatBot')}>
            <View
              style={{
                height: 70,
                width: 70,
                borderRadius: 35,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 10,
              }}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/teacher-finder-58df9.appspot.com/o/DALL·E%202024-09-03%2016.53.08%20-%20A%20modern%20and%20sleek%20logo%20for%20a%20chatbot%2C%20with%20an%20orange%20background.%20The%20chatbot%20icon%20should%20be%20minimalist%2C%20featuring%20a%20friendly%2C%20rounded%20robot%20face%20with.webp?alt=media&token=b6e25db7-4f24-4234-affd-313c3170a752',
                }}
                style={{height: 70, width: 70, borderRadius: 35}}
                accessibilityLabel="ChatBot Logo"
              />
            </View>
            <LatoText
              text={'Support'}
              fontSize={15}
              color={colors.black}
              fontName={font.medium}
            />
          </Pressable>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <LatoText text={eventDetail?.name} fontName={font.medium} />
              <LatoText
                text={`from ${moment(eventDetail?.eventStartDate).format(
                  'D MMM',
                )} to ${moment(eventDetail?.eventEndDate).format(
                  'D MMM YYYY',
                )}`}
                fontName={font.light}
              />
              <LatoText
                text={`Ticket Price: $${eventDetail?.price}`}
                fontName={font.light}
              />
            </View>
            {!this.props.route.params?.type ? (
              <Fav item={this.state.eventDetail} />
            ) : null}
          </View>

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <Entypo name="location-pin" size={15} color={colors.orange} />
            <LatoText
              text={eventDetail?.location}
              fontSize={12}
              color={colors.greyText}
              marginLeft={10}
            />
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <Foundation name="web" size={15} color={colors.orange} />
            <LatoText
              text={eventDetail?.website}
              fontSize={12}
              color={colors.greyText}
              marginLeft={10}
            />
          </View>

          <LatoText text={eventDetail?.description} marginTop={20} />

          <View
            style={{
              borderBottomWidth: 0.5,
              borderColor: colors.greyText,
              width: '100%',
              marginTop: 20,
            }}
          />
          {!this.props.route.params?.type ? (
            <TouchableOpacity
              onPress={() => this.setState({reviewModal: true})}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <AntDesign name="edit" size={24} color={colors.orange} />
              <LatoText
                text={'REVIEW'}
                fontName={font.medium}
                marginLeft={10}
              />
            </TouchableOpacity>
          ) : null}

          {eventDetail?.reviews?.map((item, index) => (
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
                  .map((item, ind) => (
                    <Entypo
                      key={ind}
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
        </ScrollView>

        <RateModal
          close={() => this.setState({reviewModal: false})}
          visible={this.state.reviewModal}
          id={this.props.route.params?.eventDetail._id}
          type="event"
        />
      </View>
    );
  }
}

export default ItemDetail;
