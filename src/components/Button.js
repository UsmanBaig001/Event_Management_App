import React from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { font } from '../services/helper'
import colors from '../theme/colors'
import LatoText from './LatoText'

export default function Button({
    width = "50%", height = 50, backgroundColor = colors.orange, borderRadius = 20, text, textColor = colors.white, marginTop, marginBottom, onPress, alignSelf, loading
}) {
    return (
        <TouchableOpacity {...{ onPress }}
            style={{ width, height, backgroundColor, borderRadius, justifyContent: "center", alignItems: "center", marginTop, marginBottom, alignSelf }}
        >
            {
                loading ?
                    <ActivityIndicator size={"small"} color={colors.white} />
                    :
                    <LatoText {...{ text }} color={textColor} fontName={font.semibold} fontSize={16} />
            }
        </TouchableOpacity>
    )
}
