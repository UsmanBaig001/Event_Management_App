import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { font } from '../services/helper'
import { BOTTOM_HEART_ICON, LOCATION_IMG } from '../theme/images'
import LatoText from '../components/LatoText'
import colors from '../theme/colors'
import Entypo from "react-native-vector-icons/Entypo"
import moment from 'moment'
import Fav from '../components/Fav'

export default function TicketCard({ onPress, item }) {
    console.log(item, '......');
    return (
        <TouchableOpacity {...{ onPress }} style={[styles.tabContainerShadow, { width: "90%", height: 247, backgroundColor: "white", borderRadius: 30, alignSelf: "center", marginTop: 20 }]} >

            <View style={{ width: "100%", height: 172, }} >
                <View style={{ width: "100%", height: 172, justifyContent: "center", alignItems: "center" }} >
                    <Image style={{ width: "100%", height: 172, borderTopLeftRadius: 30, borderTopRightRadius: 30 }} source={{ uri: item?.featureImage }} resizeMode="stretch" />
                    <ActivityIndicator style={{ position: "absolute", zIndex: -1 }} size="small" color="#000" />
                </View>
                <View style={{ width: "100%", height: 40, backgroundColor: "rgba(0,0,0,0.5)", position: "absolute", bottom: 0, flexDirection: "row", alignItems: "center", justifyContent: "flex-end", paddingRight: 20 }}>
                    {
                        item?.averageRating ?
                            Array(Math.round(item?.averageRating)).fill().map((item, index) => <Entypo key={index} name="star" size={15} color={colors.golden} style={{ marginRight: 5 }} />)
                            :
                            <LatoText text={"No ratings"} fontSize={15} color={colors.white} fontName={font.medium} />

                    }
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: "#F6F6F6", borderBottomLeftRadius: 30, borderBottomRightRadius: 30, paddingHorizontal: 20, flexDirection: "row", alignItems: "center" }} >
                <View style={{ alignItems: "center" }} >
                    <LatoText text={moment(item?.eventStartDate).format("MMM").toUpperCase()} color={colors.orange} />
                    <LatoText text={moment(item?.eventStartDate).format("D")} fontSize={20} />
                </View>
                <View style={{ marginLeft: 10 }} >
                    <LatoText text={item?.name} fontSize={15} fontName={font.medium} />
                    <LatoText text={"Price: $" + item?.price} fontSize={15} fontName={font.light} />
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    tabContainerShadow: {
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



