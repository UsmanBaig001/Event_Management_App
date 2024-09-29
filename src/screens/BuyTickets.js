import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import AppLoader from '../components/AppLoader';
import Header from '../components/Header';
import LatoText from '../components/LatoText';
import middleware from '../store/middleware';
import colors from '../theme/colors';
import TicketCard from '../components/TicketCard';

class BuyTickets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allEvents: [],
      filterAllEvents: [],
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
    let userId = this.props.user?._id;
    let res = await this.props._getAllTicketsByUserId(userId);
    this.setState({allEvents: res, filterAllEvents: res, loading: false});
  }
  onChange = item => {
    if (item?.eventID) {
      let temp = {
        ...item?.eventID,
        reviews: item?.reviews,
        averageRating: item?.averageRating,
      };
      this.props.navigation.navigate('TicketDetail', {ticketDetail: temp});
    }
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Header title={'Tickets'} />
        <View style={{flex: 1}}>
          {this.state.allEvents?.length > 0 ? (
            <FlatList
              contentContainerStyle={{paddingBottom: 35}}
              data={this.state.allEvents}
              renderItem={({item, index}) => (
                <TicketCard
                  onPress={() => this.onChange(item)}
                  item={
                    item?.eventID
                      ? {
                          ...item?.eventID,
                          reviews: item?.reviews,
                          averageRating: item?.averageRating,
                        }
                      : null
                  }
                  {...{index}}
                  key={index}
                />
              )}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <LatoText
                text={'Tickets list empty.'}
                fontSize={18}
                color={colors.orange}
              />
            </View>
          )}
        </View>
        <AppLoader visible={this.state.loading} />
      </View>
    );
  }
}

export default connect(state => state, middleware)(BuyTickets);
