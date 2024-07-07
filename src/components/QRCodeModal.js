import React, { useState } from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'
import { sHeight } from '../services/helper'
import colors from '../theme/colors'
import LatoText from './LatoText'
import Entypo from "react-native-vector-icons/Entypo"
import { connect } from 'react-redux'
import middleware from '../store/middleware'
import QRCode from 'react-native-qrcode-svg'

function QRCodeModal({ visible = true, item, close }) {
    console.log(item, 'itemOk.....');
    let data = {
        ID: item?._id,
        startDate: item?.eventStartDate,
        endDate: item?.eventEndDate
    }

    return (
        <Modal {...{ visible }} transparent={true} animationType="slide" >
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)", alignItems: 'center', paddingTop: sHeight + 100 }} >
                <View style={{ width: "90%", height: 300, backgroundColor: colors.white, borderRadius: 6, alignItems: "center", justifyContent: "space-between", paddingBottom: 20 }} >
                    <View style={{ width: "100%", height: 40, justifyContent: "center", alignItems: "center", backgroundColor: colors.orange, borderRadius: 6 }} >
                        <TouchableOpacity onPress={() => close()} style={{ position: "absolute", right: 10 }} >
                            <Entypo name="circle-with-cross" size={25} color={colors.white} />
                        </TouchableOpacity>
                        <LatoText text={"QR Code"} color={colors.white} />
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', paddingVertical: 10 }}>
                        <QRCode
                            size={200}
                            value={JSON.stringify(data)}
                            bgColor='black'
                            fgColor='white'
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default connect(state => state, middleware)(QRCodeModal)
