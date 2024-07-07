import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import AppLoader from '../components/AppLoader'
import Header from '../components/Header'
import middleware from '../store/middleware'
import colors from '../theme/colors'
import InputTab from '../components/InputTab'
import Button from '../components/Button'
import PaymentAlertModal from '../components/PaymentAlertModal'


class JazzcashCardDetailScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            accountNumber: "",
            price: "",
            afterScanModalVisible: false,
            afterScanModalType: "tick",
        }
    }
    submitHandler = async () => {
        if (!this.state.accountNumber) {
            alert('Enter account number')
        }
        else if (!this.state.price) {
            alert('Enter price')
        }
        else if (this.state.price !== this.props.route.params?.eventDetail?.price) {
            this.setState({ afterScanModalVisible: true, afterScanModalType: "cross", })
        }
        else {
            let body = {
                price: this.props.route.params?.eventDetail?.price,
                eventID: this.props.route.params?.eventDetail?._id,
                userID: this.props.user?._id
            }
            this.setState({ loading: true })
            let res = await this.props._purchaseTicket(body)
            if (res?.success) {
                this.setState({ loading: false })
                this.setState({ afterScanModalVisible: true, afterScanModalType: "tick", })
            }
            else {
                this.setState({ loading: false })
                alert(res?.message)
            }
            this.setState({ loading: false })
        }
    }
    onClose = () => {
        this.setState({ afterScanModalVisible: false })
        this.props.navigation.navigate('EventStack', { screen: 'Events' })
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.white, width: '100%', }} >
                <Header leftArrow navigation={this.props.navigation} title={"Account Details"} />

                <View style={{ flex: 1, width: '100%', paddingHorizontal: 20, alignItems: 'center' }} >

                    <InputTab keyboardType={"decimal-pad"} onChangeText={(e) => this.setState({ accountNumber: e })} value={this.state.accountNumber} title={"Account Number"} />
                    <InputTab keyboardType={"decimal-pad"} onChangeText={(e) => this.setState({ price: e })} value={this.state.price} title={"Amount"} />
                    <Button onPress={() => this.submitHandler()} text={"Submit"} marginTop={30} />
                </View>
                <AppLoader visible={this.state.loading} />
                <PaymentAlertModal type={this.state.afterScanModalType} visible={this.state.afterScanModalVisible} onPress={() => this.state.afterScanModalType === "tick" ? this.onClose() : this.setState({ afterScanModalVisible: false, activeScan: true })} onCrossPress={() => this.setState({ afterScanModalVisible: false })} />

            </View>
        )
    }
}

export default connect(state => state, middleware)(JazzcashCardDetailScreen)

