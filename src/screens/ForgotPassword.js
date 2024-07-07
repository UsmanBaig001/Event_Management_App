import React, { Component } from 'react'
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import AppLoader from '../components/AppLoader'
import Button from '../components/Button'
import Input from '../components/Input'
import LatoText from '../components/LatoText'
import { font, hp, sHeight, wp } from '../services/helper'
import middleware from '../store/middleware'
import colors from '../theme/colors'
import { EMAIL_ICON, PASSWORD_ICON, SPLASH_BG } from '../theme/images'

class ForgotPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            loading: false
        }
    }



    sendEmail = async () => {
        let { email } = this.state
        if (!email)
            alert("Please enter email")
        else {

            this.setState({ loading: true })
            let res = await this.props._sendEmailOtpForForgot(email)
            this.setState({ loading: false })
            if (res.success) {
                this.props.navigation.navigate("VerifyOtp", { code: res?.code, requestBody: { email } })
            } else if (!res?.success) {
                alert(res?.message)
            }
        }
    }
    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ paddingTop: sHeight }} >
                <Image style={{ position: "absolute", width: "100%", height: hp(100) + sHeight, zIndex: -1, top: 0 }} source={SPLASH_BG} />
                <ScrollView contentContainerStyle={{ width: "100%", minHeight: hp(100), }} >

                    <View style={{ width: "85%", height: 425, backgroundColor: colors.white, borderRadius: 20, alignSelf: "center", marginTop: 100 }} >
                        <View style={{ height: 127, backgroundColor: colors.orange, borderTopRightRadius: 20, borderTopLeftRadius: 20, justifyContent: "center", alignItems: "center" }} >
                            <LatoText text={"Event Next Door"} textAlign="center" fontSize={wp(6)} color={colors.white} fontName={font.semibold} />
                        </View>

                        <LatoText fontSize={15} alignSelf={"center"} text={"Forgot Password"} textAlign="center" marginTop={30} />
                        <LatoText fontSize={12} color={colors.greyText} alignSelf={"center"} width={"80%"} text={"Enter email associated with your account and we will send email instruction to reset your password."} textAlign="center" marginTop={20} />

                        <View style={{ alignItems: "center" }} >
                            <Input value={this.state.email} onChangeText={e => this.setState({ email: e.trim() })} source={EMAIL_ICON} placeholder="Email" marginTop={40} />

                        </View>

                        <View style={{ position: "absolute", bottom: -25, width: "100%", alignItems: "center" }} >
                            <Button onPress={() => this.sendEmail()} width='90%' text={"Send OTP"} />
                        </View>
                    </View>

                    <Text style={{ textAlign: "center", marginTop: 50, marginBottom: 20 }} >
                        <LatoText text={"Go back to "} color={colors.white} />
                        <LatoText onPress={() => this.props.navigation.navigate("Login")} text={"Sign In"} color={colors.orange} fontSize={16} fontName="Poppins-Bold" />
                    </Text>
                </ScrollView>
                <AppLoader visible={this.state.loading} />
            </KeyboardAvoidingView>
        )
    }
}

export default connect(null, middleware)(ForgotPassword)