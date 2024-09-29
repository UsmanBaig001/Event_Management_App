import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Header from '../components/Header';
import QRCodeScanner from 'react-native-qrcode-scanner';
import TicketScanModal from '../components/TicketScanModal';

class QRCodeScannerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventDetail: props.route.params?.eventDetail,
      reviewModal: false,
      activeScan: true,
      afterScanModalVisible: false,
      afterScanModalType: 'tick',
    };
  }
  ifScanned = e => {
    try {
      let data = JSON.parse(e?.data);
      var startDate = new Date(data?.startDate);
      var endDate = new Date(data?.endDate);
      var currentDate = new Date();
      if (data?.ID === this.state.eventDetail?._id) {
        if (
          currentDate >= startDate &&
          currentDate <= endDate &&
          currentDate.toDateString() !== endDate.toDateString()
        ) {
          this.setState({activeScan: false}, () => {
            this.setState({
              afterScanModalVisible: true,
              afterScanModalType: 'tick',
            });
          });
        } else {
          this.setState({activeScan: false}, () => {
            this.setState({
              afterScanModalVisible: true,
              afterScanModalType: 'cross',
            });
          });
        }
      } else {
        this.setState({activeScan: false}, () => {
          this.setState({
            afterScanModalVisible: true,
            afterScanModalType: 'cross',
          });
        });
      }
    } catch (error) {
      this.setState({activeScan: false}, () => {
        this.setState({
          afterScanModalVisible: true,
          afterScanModalType: 'cross',
        });
      });
    }
  };
  onClose = () => {
    this.setState({afterScanModalVisible: false});
    this.props.navigation.navigate('OrganizerEvents');
  };
  render() {
    let {eventDetail} = this.state;
    return (
      <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <Header
          navigation={this.props.navigation}
          leftArrow
          title={'Scan QR Code'}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            marginTop: 20,
          }}>
          <QRCodeScanner
            containerStyle={{
              backgroundColor: '#fff',
              height: '100%',
              alignSelf: 'center',
              marginBottom: 40,
            }}
            onRead={this.ifScanned}
            reactivate={this.state.activeScan}
            permissionDialogMessage="Need Permission To Access Camera"
            reactivateTimeout={10}
            showMarker={true}
            markerStyle={{borderColor: '#fff', borderRadius: 10}}
            bottomContent={
              <TouchableOpacity>
                <Text style={{fontSize: 21, color: 'rgb(0,122,255)'}}>
                  Scan QR Code
                </Text>
              </TouchableOpacity>
            }
          />
        </View>
        <TicketScanModal
          type={this.state.afterScanModalType}
          visible={this.state.afterScanModalVisible}
          onPress={() =>
            this.state.afterScanModalType === 'tick'
              ? this.onClose()
              : this.setState({afterScanModalVisible: false, activeScan: true})
          }
          onCrossPress={() => this.setState({afterScanModalVisible: false})}
        />
      </View>
    );
  }
}

export default QRCodeScannerScreen;
