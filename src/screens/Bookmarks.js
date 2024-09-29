import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import Header from '../components/Header';
import LatoText from '../components/LatoText';
import middleware from '../store/middleware';
import colors from '../theme/colors';
import EventCard from './EventCard';

class Bookmarks extends Component {
  onChange = item => {
    if (item?.eventID) {
      let temp = {
        ...item?.eventID,
        reviews: item?.reviews,
        averageRating: item?.averageRating,
      };
      this.props.navigation.navigate('ItemDetail', {eventDetail: temp});
    }
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Header title={'Bookmarks'} />
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            {this.props.favourites.length === 0 && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <LatoText
                  text={'Bookmarks list empty.'}
                  fontSize={18}
                  color={colors.orange}
                />
              </View>
            )}
            <FlatList
              contentContainerStyle={{paddingBottom: 35}}
              data={this.props.favourites}
              renderItem={({item, index}) => (
                <EventCard
                  onPress={() => this.onChange(item)}
                  item={
                    item?.eventID
                      ? {
                          ...item?.eventID,
                          reviews: item?.reviews,
                          averageRating: item?.averageRating,
                        }
                      : {
                          ...item?.placeID,
                          reviews: item?.reviews,
                          averageRating: item?.averageRating,
                        }
                  }
                  {...{index}}
                  key={index}
                />
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default connect(state => state, middleware)(Bookmarks);
