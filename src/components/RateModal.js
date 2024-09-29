import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {hp, sHeight} from '../services/helper';
import colors from '../theme/colors';
import LatoText from './LatoText';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from './Button';
import {connect} from 'react-redux';
import middleware from '../store/middleware';

function RateModal({visible = true, _addRating, user, id, type, close}) {
  const [review, setReview] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);

  const addRate = async () => {
    setLoading(true);
    let body = {
      star: review,
      review: reviewText,
      userID: user._id,
    };
    if (type === 'event') body.eventID = id;
    else body.placeID = id;
    if (review === 0 || !reviewText) {
      return;
    }
    console.log(body, 'body.....');
    let res = await _addRating(body);
    if (res.success) {
      alert(res?.message);
      setReview(0);
      setLoading(false);
      setReviewText('');
      close();
    } else {
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <Modal {...{visible}} transparent={true} animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.7)',
          paddingTop: sHeight + 100,
        }}>
        <ScrollView
          contentContainerStyle={{
            width: '100%',
            minHeight: hp(100),
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '90%',
              height: 250,
              backgroundColor: colors.white,
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 20,
            }}>
            <View
              style={{
                width: '100%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.orange,
                borderRadius: 6,
              }}>
              <TouchableOpacity
                onPress={() => close()}
                style={{position: 'absolute', right: 10}}>
                <Entypo
                  name="circle-with-cross"
                  size={25}
                  color={colors.white}
                />
              </TouchableOpacity>
              <LatoText
                text={'Please Rate Your Experience'}
                color={colors.white}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15,
              }}>
              {Array(5)
                .fill()
                .map((item, index) => (
                  <Entypo
                    onPress={() => setReview(index + 1)}
                    key={index}
                    name="star"
                    size={40}
                    color={
                      review >= index + 1 ? colors.orange : colors.greyText
                    }
                    style={{marginRight: 5}}
                  />
                ))}
            </View>

            <View
              style={{
                width: '90%',
                height: 50,
                backgroundColor: colors.inputBg,
                paddingHorizontal: 15,
                alignSelf: 'center',
                borderRadius: 6,
              }}>
              <TextInput
                placeholder="Type something..."
                autoCapitalize="none"
                style={{width: '100%', height: '100%', color: colors.orange}}
                onChangeText={text => setReviewText(text)}
                value={reviewText}
              />
            </View>

            <Button
              loading={loading}
              onPress={addRate}
              borderRadius={6}
              text="Submit"
              height={40}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default connect(state => state, middleware)(RateModal);
