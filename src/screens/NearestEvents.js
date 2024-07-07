import React, { Component } from 'react'
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps'
import Header from '../components/Header'
import colors from '../theme/colors'
import { LOCATION_IMG } from "../theme/images"
import Entypo from "react-native-vector-icons/Entypo"
import Foundation from "react-native-vector-icons/Foundation"
import AntDesign from "react-native-vector-icons/AntDesign"
import LatoText from '../components/LatoText'
import { font, getLocation } from '../services/helper'
import * as Location from 'react-native-location';
import middleware from '../store/middleware'
import { connect } from 'react-redux'

class NearestEvents extends Component {
    constructor(props) {
        super(props)

        this.state = {
            region: {
                latitude: Number(this.props.route.params?.detail?.lat) || 31.4504,
                longitude: Number(this.props.route.params?.detail?.long) || 73.1350,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            },
            allEvents: [],
            filterAllEvents: [],

        }
    }
    async componentDidMount() {

        this.setState({ loading: true })
        let location = await getLocation()
        if (location) {
            this.props._setCurrentLocation(location)
        }

        await this.props._getFav(this.props.user?._id)
        let body = {
            lat: this.props.currentLocation?.latitude,
            long: this.props.currentLocation?.longitude
        }
        let res = await this.props._getAllEvent(body)
        if (res?.success) {
            console.log(res, 'resLoca')
            this.setState({ allEvents: res?.docs, filterAllEvents: res?.docs, loading: false })
        }
        else {
            this.setState({ loading: false })
            alert(res?.error?.message)
        }




    }

    onRegionChange = (region) => {




    };
    renderMarkers() {
        return this.state.allEvents?.map((marker, index) => (
            <Marker
                key={index}
                coordinate={{ latitude: parseFloat(marker?.lat), longitude: parseFloat(marker?.long) }}
                title={marker?.name}
                description={marker?.description}
                onPress={(e) => {
                    e.stopPropagation();
                    this.props.navigation.navigate("ItemDetail", { eventDetail: marker })
                }}
            >
                <Image resizeMode='contain' style={{ width: 50, height: 50 }} source={{ uri: marker?.featureImage }} />
            </Marker>
        ));
    }

    render() {

        return (
            <View style={{ flex: 1 }} >
                <Header navigation={this.props.navigation} title={"Event Next Door"} />

                <MapView
                    showsUserLocation={true}
                    ref={ref => this.map = ref}
                    showsMyLocationButton={false}
                    zoomEnabled={true}
                    provider={Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                    style={{ width: "100%", flex: 1 }}
                    initialRegion={this.state.region}
                    userInterfaceStyle={"light"}
                    onRegionChangeComplete={this.onRegionChange}
                >
                    {
                        this.state.allEvents?.length > 0 ?
                            // this.state.allEvents?.map((item, index) => {
                            this.renderMarkers()


                            // })
                            :
                            null
                    }
                </MapView>


            </View>
        )
    }
}

export default connect(state => state, middleware)(NearestEvents)

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "100%",
    },
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

