import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import LatoText from '../components/LatoText';
import {uploadPhotoOfEvents, wp} from '../services/helper';
import colors from '../theme/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from '../components/Button';
import {connect} from 'react-redux';
import middleware from '../store/middleware';
import {launchImageLibrary} from 'react-native-image-picker';
import AppLoader from '../components/AppLoader';
import InputTab from '../components/InputTab';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import * as Location from 'react-native-location';
import Geocoder from 'react-native-geocoding';

Geolocation.setRNConfiguration({authorizationLevel: 'always'});
Geocoder.init('AIzaSyCTeuajYJW22KJe7Ae-tOq_10n0D52CP_0');
class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      granted: false,
      region: {
        latitude: 30.4504,
        longitude: 73.135,
        latitudeDelta: 0.022,
        longitudeDelta: 0.022,
      },
      name: '',
      type: '',
      website: '',
      tagLine: '',
      limit: '',
      destination: null,
      address: null,
      eventStartDate: '',
      eventEndDate: '',
      price: 0,
      location: '',
      description: '',
      featureImage: '',
      galleryImages: [],
      pickImage: '',
      uploaded: false,
      loading: false,
      showStartDatePicker: false,
      showEndDatePicker: false,
    };
  }
  async componentDidMount() {
    await this.getMyLocations();
  }

  getMyLocations = async () => {
    let granted = await Location.requestPermission({
      ios: 'whenInUse',
      android: {detail: 'fine'},
    });

    if (!granted) {
      this.setState({granted: false});
      return alert('Permission to access location was denied');
    } else {
      this.setState({granted: true});
    }

    let location = await Location.getLatestLocation();

    // console.log(JSON.stringify(location), 'location>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

    const region = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.022,
      longitudeDelta: 0.022,
    };
    this.setState({
      region: region,
      loading: false,
      error: null,
    });

    // this.setLongLat()
  };
  pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await launchImageLibrary({
      quality: 1,
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (result?.didCancel) {
    } else {
      this.setState({pickImage: result?.assets[0].uri, uploaded: false});
    }
  };

  addEvent = async () => {
    let {
      name,
      type,
      website,
      tagLine,
      eventStartDate,
      price,
      eventEndDate,
      location,
      description,
      featureImage,
      galleryImages,
      pickImage,
      uploaded,
      limit,
    } = this.state;
    let lat = this.state.region?.latitude;
    let long = this.state.region?.longitude;
    if (!name) return alert('Please enter event name');
    else if (!description) return alert('Please enter event description');
    else if (!type) return alert('Please enter event type');
    else if (!limit) return alert('Please enter limit');
    else if (!eventStartDate) return alert('Please select event start date');
    else if (!eventEndDate) return alert('Please select event end date');
    else if (!price) return alert('Please select event price');
    else if (!pickImage) return alert('Please select event image');
    else if (!this.state.address) return alert('Please select event location');
    else {
      let body = {
        name,
        type,
        website,
        tagLine,
        limit,
        eventStartDate: moment(eventStartDate).format('YYYY/MM/DD'),
        price,
        eventEndDate: moment(eventEndDate).format('YYYY/MM/DD'),
        location: this.state.address,
        description,
        featureImage,
        galleryImages,
        lat,
        long,
        userID: this.props.user?._id,
      };
      this.setState({loading: true});
      if (pickImage && !uploaded) {
        body.featureImage = await uploadPhotoOfEvents(
          pickImage,
          this.props.user?.email,
          p => console.log(p),
        );
        this.setState({uploaded: true, progress: 0});
      }
      let res = await this.props._addEvent(body);
      if (res?.success) {
        this.setState({loading: false});
        alert(res?.message);
        this.props.navigation.goBack();
      } else {
        this.setState({loading: false});
        alert(res?.message);
      }
    }

    this.setState({loading: false});
  };

  getAddress = (region, address) => {
    this.setState({region: region, address, loading: false});
    this.forceUpdate();
  };

  render() {
    let {
      name,
      type,
      website,
      tagLine,
      eventStartDate,
      price,
      eventEndDate,
      location,
      description,
      featureImage,
      galleryImages,
      pickImage,
      uploaded,
      limit,
    } = this.state;

    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Header
          navigation={this.props.navigation}
          title={'Add Event'}
          leftArrow
        />
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            width: '100%',
            alignItems: 'center',
            paddingBottom: 35,
          }}>
          <View style={{width: 80, height: 80, marginTop: 30}}>
            <Image
              style={{width: 80, height: 80, borderRadius: 40}}
              resizeMode="cover"
              source={{
                uri: this.state.pickImage
                  ? this.state.pickImage
                  : 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
              }}
            />
            <TouchableOpacity
              onPress={this.pickImage}
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: colors.orange,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 5,
                right: -10,
              }}>
              <Entypo name="camera" size={15} color={colors.white} />
            </TouchableOpacity>
          </View>
          <InputTab
            value={name}
            onChangeText={e => this.setState({name: e})}
            title={'Event Name'}
          />
          <InputTab
            value={description}
            onChangeText={e => this.setState({description: e})}
            title={'Event Description'}
          />
          <InputTab
            value={type}
            onChangeText={e => this.setState({type: e})}
            title={'Event Type'}
          />
          <InputTab
            value={website}
            onChangeText={e => this.setState({website: e})}
            title={'Event Website Link'}
          />
          <InputTab
            value={tagLine}
            onChangeText={e => this.setState({tagLine: e})}
            title={'Event TagLine'}
          />
          <InputTab
            value={limit}
            onChangeText={e => this.setState({limit: parseInt(e)})}
            title={'Total Attendees Limit'}
          />
          <TouchableOpacity
            onPress={() => this.setState({showStartDatePicker: true})}
            style={[
              styles.shadow,
              {
                width: '90%',
                height: 74,
                backgroundColor: colors.white,
                borderRadius: 4,
                marginTop: 20,
                paddingLeft: 10,
                paddingTop: 10,
              },
            ]}>
            <LatoText
              text={'Event Start Date'}
              fontSize={14}
              color={colors.greyText}
            />
            <LatoText
              text={
                eventStartDate && moment(eventStartDate).format('DD-MM-YYYY')
              }
              marginTop={7}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({showEndDatePicker: true})}
            style={[
              styles.shadow,
              {
                width: '90%',
                height: 74,
                backgroundColor: colors.white,
                borderRadius: 4,
                marginTop: 20,
                paddingLeft: 10,
                paddingTop: 10,
              },
            ]}>
            <LatoText
              text={'Event End Date'}
              fontSize={14}
              color={colors.greyText}
            />
            <LatoText
              text={eventEndDate && moment(eventEndDate).format('DD-MM-YYYY')}
              marginTop={7}
            />
          </TouchableOpacity>
          <InputTab
            keyBoardType={'decimal-pad'}
            value={price}
            onChangeText={e => this.setState({price: e})}
            title={'Event Ticket Price'}
          />
          {/* <InputTab value={location} onChangeText={e => this.setState({ location: e })} title={"Location"} /> */}
          <View
            style={[
              styles.shadow,
              {
                width: '90%',
                backgroundColor: colors.white,
                borderRadius: 4,
                marginTop: 20,
                paddingHorizontal: 10,
                paddingTop: 10,
              },
            ]}>
            <LatoText text={'Location'} fontSize={14} color={colors.greyText} />
            <GooglePlacesAutocomplete
              keyboardShouldPersistTaps="handled"
              styles={{
                description: {color: '#000'},
                container: {},
                powered: {display: 'none'},
                textInputContainer: {
                  width: '100%',
                  height: 40,
                  color: '#000',
                },
                textInput: {
                  height: 40,
                  fontSize: 16,
                  backgroundColor: 'rgba(0,0,0,0)',
                  color: colors.black,
                },
                predefinedPlacesDescription: {color: '#1faadb'},
                listView: {
                  color: colors.black,
                  backgroundColor: 'white',
                  marginTop: 10,
                  width: wp(85),
                },

                poweredContainer: {display: 'none'},
              }}
              listUnderlayColor="green"
              placeholder={'Search Location'}
              ref={ref => (this.textInput = ref)}
              textInputProps={{
                placeholderTextColor: '#aaa',
                onChangeText: e =>
                  e.length === 0 && this.setState({address: null}),
              }}
              onPress={(data, details = null) => {
                this.setState({loading: true});

                Geocoder.from(data.description)
                  .then(json => {
                    const {location} = json.results[0].geometry;
                    const region = {
                      latitude: location.lat,
                      longitude: location.lng,
                      latitudeDelta: 0.022,
                      longitudeDelta: 0.022,
                    };
                    this.setState({destination: region});
                    this.getAddress(
                      region,
                      details?.structured_formatting?.main_text +
                        ' ' +
                        details?.structured_formatting?.secondary_text,
                    );
                  })
                  .catch(error => {
                    console.warn(error);
                    this.setState({loading: false});
                  });
              }}
              query={{
                // key: 'AIzaSyCTeuajYJW22KJe7Ae-tOq_10n0D52CP_0',
                key: 'AIzaSyB2PrwrEcilwvSO3DUcw4vu_aVx3kL2OPc',
                // key: 'AIzaSyCTeuajYJW22KJe7Ae-tOq_10n0D52CP_0',
                language: 'en',
              }}
            />
          </View>

          <Button
            onPress={() => this.addEvent()}
            text={'Save'}
            marginTop={30}
          />
        </ScrollView>
        <AppLoader visible={this.state.loading} />

        <DatePicker
          theme="light"
          mode="date"
          modal
          androidVariant="iosClone"
          open={this.state.showStartDatePicker}
          date={new Date()}
          onConfirm={date => {
            console.log(date);
            this.setState({
              eventStartDate: date,
              DOBISO: date,
              showStartDatePicker: false,
            });
          }}
          onCancel={() => {
            this.setState({showStartDatePicker: false});
          }}
        />
        <DatePicker
          theme="light"
          mode="date"
          modal
          androidVariant="iosClone"
          open={this.state.showEndDatePicker}
          date={new Date()}
          onConfirm={date => {
            console.log(date);
            this.setState({
              eventEndDate: date,
              DOBISO: date,
              showEndDatePicker: false,
            });
          }}
          onCancel={() => {
            this.setState({showEndDatePicker: false});
          }}
        />
      </View>
    );
  }
}

export default connect(state => state, middleware)(CreateEvent);

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
