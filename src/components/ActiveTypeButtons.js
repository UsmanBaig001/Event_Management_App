import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { font } from '../services/helper';
import colors from '../theme/colors';
import LatoText from './LatoText';

const ActiveTypeButtons = ({ active, onChange }) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 10 }} >
            <TouchableOpacity activeOpacity={1} onPress={() => onChange("purchaser")} style={{ flexDirection: "row", alignItems: "center" }} >
                <View style={{ width: 20, height: 20, borderWidth: 1, borderColor: colors.orange, borderRadius: 10, justifyContent: "center", alignItems: "center" }} >
                    {active === "purchaser" && <View style={{ width: 10, height: 10, backgroundColor: colors.orange, borderRadius: 10 }} />}
                </View>
                <LatoText text={"Customer"} marginLeft={10} fontName={font.medium} fontSize={12} color={colors.orange} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => onChange("scanner")} style={{ flexDirection: "row", alignItems: "center" }} >
                <View style={{ width: 20, height: 20, borderWidth: 1, borderColor: colors.orange, borderRadius: 10, justifyContent: "center", alignItems: "center" }} >
                    {active === "scanner" && <View style={{ width: 10, height: 10, backgroundColor: colors.orange, borderRadius: 10 }} />}
                </View>
                <LatoText text={"Organizer"} marginLeft={10} fontName={font.medium} fontSize={12} color={colors.orange} />
            </TouchableOpacity>
        </View>
    );
}

export default ActiveTypeButtons;