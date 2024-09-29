import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import AppLoader from '../components/AppLoader';
import Header from '../components/Header';
import LatoText from '../components/LatoText';
import middleware from '../store/middleware';
import colors from '../theme/colors';
import EventCard from './EventCard';

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allEvents: [],
      filterAllEvents: [],
      loading: false,
      selectedKM: '30',
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
    let body = {
      lat: this.props.currentLocation?.latitude,
      long: this.props.currentLocation?.longitude,
    };
    let res = await this.props._getAllEvent(body);
    if (res?.success) {
      console.log;
      this.setState({allEvents: res?.docs, filterAllEvents: res?.docs});
    }
    this.setState({loading: false});
  }
  render() {
    console.log(this.props.userType, 'usertype....');
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Header title={'Events'} />
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            {this.state.allEvents?.length > 0 ? (
              <FlatList
                contentContainerStyle={{paddingBottom: 35}}
                data={this.state.allEvents}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item, index}) => (
                  <EventCard
                    onPress={() =>
                      this.props.navigation.navigate('ItemDetail', {
                        eventDetail: item,
                      })
                    }
                    {...{item}}
                    {...{index}}
                    key={index}
                  />
                )}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <LatoText
                  text={'Events list empty.'}
                  fontSize={18}
                  color={colors.orange}
                />
              </View>
            )}
          </View>
        </View>
        <AppLoader visible={this.state.loading} />
      </View>
    );
  }
}

export default connect(state => state, middleware)(Events);
