import React, { Component } from 'react'
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import AppLoader from '../components/AppLoader'
import Button from '../components/Button'
import Input from '../components/Input'
import LatoText from '../components/LatoText'
import { font, hp, sHeight, wp } from '../services/helper'
import middleware from '../store/middleware'
import colors from '../theme/colors'
import { EMAIL_ICON, PASSWORD_ICON, SPLASH_BG } from '../theme/images'
import Entypo from "react-native-vector-icons/Entypo"
import ActiveTypeButtons from '../components/ActiveTypeButtons'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: props.remember !== null ? props.remember.email : "",
            password: props.remember !== null ? props.remember.password : "",
            loading: false,
            remenber: props.remember !== null ? true : false,
            activeType: props.userType,
        }
    }

    login = async () => {
        let { email, password } = this.state
        if (!email)
            alert("Please enter email")
        else if (!password)
            alert("Please enter password")
        else {
            this.setState({ loading: true })

            let res = await this.props._login({ email, password })
            if (res?.success) {
                if (this.state.remenber) {
                    this.props._remember({ email: this.state.email, password: this.state.password })
                } else {
                    this.props._remember(null)
                }
            }
            else if (!res?.success) {
                alert(res?.message)
            }
            else if (res?.error) {
                alert(res?.error)
            }
            this.setState({ loading: false })


        }
    }

    onActiveType = (e) => {
        this.setState({ activeType: e })
        this.props._setUserType(e)

    }
    render() {

        let { email, password } = this.state
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ paddingTop: sHeight }} >
                <Image style={{ position: "absolute", width: "100%", height: hp(100) + sHeight + sHeight, zIndex: -1, top: 0 }} source={SPLASH_BG} />
                <ScrollView contentContainerStyle={{ width: "100%", minHeight: hp(100), }} >

                    <View style={{ width: "85%", height: 485, backgroundColor: colors.white, borderRadius: 20, alignSelf: "center", marginTop: 100 }} >
                        <View style={{ height: 127, backgroundColor: colors.orange, borderTopRightRadius: 20, borderTopLeftRadius: 20, justifyContent: "center", alignItems: "center" }} >
                            <LatoText text={"Event Next Door"} textAlign="center" fontSize={wp(6)} color={colors.white} fontName={font.semibold} />
                        </View>

                        <LatoText fontSize={15} alignSelf={"center"} text={"Welcome back"} textAlign="center" marginTop={30} />
                        <LatoText fontSize={12} color={colors.greyText} alignSelf={"center"} width={"80%"} text={"Please enter your email and password to continue"} textAlign="center" marginTop={20} />
                        <ActiveTypeButtons active={this.state.activeType} onChange={e => this.onActiveType(e)} />

                        <View style={{ alignItems: "center" }} >
                            <Input value={email} onChangeText={e => this.setState({ email: e.trim() })} source={EMAIL_ICON} placeholder="Email" marginTop={20} />
                            <Input secureTextEntry={true} value={password} onChangeText={e => this.setState({ password: e.trim() })} source={PASSWORD_ICON} placeholder="Password" marginTop={15} />
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "90%", paddingHorizontal: 10, marginTop: 10 }} >
                                <View style={{ flexDirection: "row", alignItems: "center" }} >
                                    <TouchableOpacity onPress={() => this.setState({ remenber: !this.state.remenber })} style={{ width: 15, height: 15, borderRadius: 5, borderWidth: 1, borderColor: "rgba(0,0,0,0.1)", backgroundColor: "#F3F3F3", justifyContent: "center", alignItems: "center" }} >
                                        {this.state.remenber && <Entypo name="check" size={10} color={colors.orange} />}
                                    </TouchableOpacity>
                                    <LatoText text={"Remember me"} fontSize={12} marginLeft={10} />
                                </View>
                                <LatoText onPress={() => this.props.navigation.navigate("ForgotPassword")} text={"Forgot Password?"} fontSize={12} />
                            </View>
                        </View>

                        <View style={{ position: "absolute", bottom: -25, width: "100%", alignItems: "center" }} >
                            <Button onPress={() => this.login()} width='90%' text={"Sign In"} />
                        </View>
                    </View>

                    <Text style={{ textAlign: "center", marginTop: 50, marginBottom: 20 }} >
                        <LatoText text={"Don't have an account."} color={colors.white} />
                        <LatoText onPress={() => this.props.navigation.navigate("Signup")} text={" Sign up"} color={colors.orange} fontSize={16} fontName="Poppins-Bold" />
                    </Text>
                </ScrollView>

                <AppLoader visible={this.state.loading} />
            </KeyboardAvoidingView>
        )
    }
}

export default connect(state => state, middleware)(Login)