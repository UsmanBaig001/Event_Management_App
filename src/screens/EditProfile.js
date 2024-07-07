import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Header from '../components/Header'
import LatoText from '../components/LatoText'
import { uploadPhoto } from '../services/helper'
import colors from '../theme/colors'
import Entypo from "react-native-vector-icons/Entypo"
import Button from '../components/Button'
import { connect } from 'react-redux'
import middleware from '../store/middleware'
import { launchImageLibrary } from 'react-native-image-picker';
import AppLoader from '../components/AppLoader'
import InputTab from '../components/InputTab'
import moment from 'moment'
import DatePicker from 'react-native-date-picker'


class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: props.user?.userName,
            DOB: props.user?.DOB,
            email: props.user?.email,
            address: props.user?.address,
            image: props.user?.image,
            pickImage: "",
            uploaded: false,
            loading: false,
            showDatePicker: false
        }
    }
    pickImage = async () => {

        // No permissions request is necessary for launching the image library
        const result = await launchImageLibrary({

            quality: 1,
            mediaType: "photo",
            selectionLimit: 1
        });

        if (result?.didCancel) {

        } else {
            this.setState({ pickImage: result?.assets[0].uri, uploaded: false })
        }
    };


    editUser = async () => {
        let { userName, DOB, address, pickImage, uploaded } = this.state
        let body = {
            userName, DOB, address,
            _id: this.props.user?._id
        }
        this.setState({ loading: true })
        if (pickImage && !uploaded) {
            body.image = await uploadPhoto(pickImage, this.props.user?.email, p =>
                console.log(p)
            );
            this.setState({ uploaded: true, progress: 0 });
        }
        console.log(body, "body")
        let res = await this.props._editUser(body)
        if (res.success) {
            alert(res.message)
            this.props.navigation.goBack()
        }
        else {
            alert(res.message)
        }
        this.setState({ loading: false })
        // this.props.navigation.goBack()
    }
    render() {
        let { pickImage } = this.state
        console.log(pickImage)

        return (
            <View style={{ flex: 1, backgroundColor: colors.white, }} >
                <Header navigation={this.props.navigation} title={"Edit Profile"} leftArrow />
                <ScrollView contentContainerStyle={{ width: "100%", alignItems: "center", paddingBottom: 35 }} >

                    <View style={{ width: 80, height: 80, marginTop: 30 }} >
                        {
                            this.state.pickImage ?
                                <Image style={{ width: 80, height: 80, borderRadius: 40, }} resizeMode="cover" source={{ uri: this.state.pickImage }} />
                                :
                                <Image style={{ width: 80, height: 80, borderRadius: 40, }} resizeMode="cover" source={{ uri: this.state.image ? this.state.image : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" }} />
                        }
                        <TouchableOpacity onPress={this.pickImage} style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: colors.orange, justifyContent: "center", alignItems: "center", position: "absolute", bottom: 5, right: -10 }} >
                            <Entypo name="camera" size={15} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                    <InputTab value={this.state.userName} onChangeText={e => this.setState({ userName: e })} title={"Full Name"} />
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })} style={[styles.shadow, { width: "90%", height: 74, backgroundColor: colors.white, borderRadius: 4, marginTop: 20, paddingLeft: 10, paddingTop: 10 }]} >
                        <LatoText text={"Date of Birth"} fontSize={14} color={colors.greyText} />
                        <LatoText text={this.state.DOB && moment(this.state.DOB).format("DD-MM-YYYY")} marginTop={7} />
                    </TouchableOpacity>
                    <InputTab editable={false} value={this.state.email} title={"Email"} />
                    <InputTab value={this.state.address} onChangeText={e => this.setState({ address: e })} title={"Where you live?"} />

                    <Button onPress={() => this.editUser()} text={"Save"} marginTop={30} />
                </ScrollView>
                <AppLoader visible={this.state.loading} />


                <DatePicker
                    theme="light"
                    mode="date"
                    modal
                    androidVariant="iosClone"
                    open={this.state.showDatePicker}
                    date={new Date()}
                    onConfirm={(date) => {
                        console.log(date)
                        this.setState({ DOB: date, DOBISO: date, showDatePicker: false })
                    }}
                    onCancel={() => {
                        this.setState({ showDatePicker: false })
                    }}
                />
            </View >
        )
    }
}

export default connect(state => state, middleware)(EditProfile)

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})