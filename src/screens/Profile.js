import React, { Component } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from 'react-native'
import Header from '../components/Header'
import Input from '../components/Input'
import LatoText from '../components/LatoText'
import { font } from '../services/helper'
import colors from '../theme/colors'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Entypo from "react-native-vector-icons/Entypo"
import Button from '../components/Button'
import { connect } from 'react-redux'
import middleware from '../store/middleware'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: ""
        }
    }
    render() {
        let { email } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: colors.white, }} >
                <Header rightEdit title={"Profile"} onEditPress={() => this.props.navigation.navigate("EditProfile")} />
                <ScrollView contentContainerStyle={{ width: "100%", alignItems: "center" }} >

                    <View style={{ width: 80, height: 80, justifyContent: "center", alignItems: "center", marginTop: 30 }} >
                        <Image style={{ width: 80, height: 80, borderRadius: 40, }} resizeMode="cover" source={{ uri: this.props?.user?.image || "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" }} />
                        <ActivityIndicator style={{ position: "absolute", zIndex: -1 }} size={"small"} color={"#000"} />
                    </View>

                    <LatoText text={this.props.user?.userName} marginTop={10} />

                    <View style={[styles.shadow, { width: "90%", height: 160, backgroundColor: colors.white, borderRadius: 4, marginTop: 30 }]} >
                        <View style={{ height: 40, borderBottomWidth: 0.5, borderColor: colors.greyText, justifyContent: "center", paddingHorizontal: 20 }} >
                            <LatoText text={"Contact Information"} fontSize={14} fontName={font.medium} color={colors.orange} />
                        </View>

                        <View style={{ flex: 1, padding: 10, justifyContent: "space-around" }} >
                            <View style={{ flexDirection: "row", alignItems: "center" }} >
                                <View style={{ width: 20, alignItems: "center" }}>
                                    <FontAwesome name="user" size={18} color={colors.orange} />
                                </View>
                                <LatoText text={this.props.user?.userName} marginLeft={10} fontSize={14} />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }} >
                                <View style={{ width: 20, alignItems: "center" }}>
                                    <Entypo name="mail" size={18} color={colors.orange} />
                                </View>
                                <LatoText text={this.props.user?.email} marginLeft={10} fontSize={14} />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }} >
                                <View style={{ width: 20, alignItems: "center" }}>
                                    <Entypo name="location-pin" size={18} color={colors.orange} />
                                </View>
                                <LatoText text={this.props.user?.address} marginLeft={10} fontSize={14} />
                            </View>
                        </View>
                    </View>

                    {/* <Input value={email} onChangeText={e => this.setState({ email: e.trim() })} placeholder="Email" marginTop={40} /> */}
                    <Button onPress={() => this.props._logout()} text={"Logout"} marginTop={30} />
                </ScrollView>


            </View>
        )
    }
}

export default connect(state => state, middleware)(Profile)

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