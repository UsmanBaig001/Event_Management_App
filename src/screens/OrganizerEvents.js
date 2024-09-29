import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import AppLoader from '../components/AppLoader';
import Header from '../components/Header';
import LatoText from '../components/LatoText';
import middleware from '../store/middleware';
import colors from '../theme/colors';
import EventCard from './EventCard';

class OrganizerEvents extends Component {
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
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      let userId = this.props.user?._id;
      let res = await this.props._getAllEventByUserId(userId);
      if (res?.success) {
        console.log(res, 'res////');
        this.setState({allEvents: res?.docs, filterAllEvents: res?.docs});
      }
      this.setState({loading: false});
    });
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Header
          addEvent={() => this.props.navigation.navigate('CreateEvent')}
          title={'Events'}
          rightAddIcon
        />

        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            {this.state.allEvents?.length > 0 ? (
              <FlatList
                contentContainerStyle={{paddingBottom: 35}}
                data={this.state.allEvents}
                renderItem={({item, index}) => (
                  <EventCard
                    hideFav
                    onPress={() =>
                      this.props.navigation.navigate('ItemDetail', {
                        eventDetail: item,
                        type: 'organizer',
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

export default connect(state => state, middleware)(OrganizerEvents);
