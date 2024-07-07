import React, { Component } from 'react'
import { FlatList, StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import AppLoader from '../components/AppLoader'
import Header from '../components/Header'
import LatoText from '../components/LatoText'
import middleware from '../store/middleware'
import colors from '../theme/colors'
import EventCard from './EventCard'

const data = [{ _id: "634a87c7c92dce6566676aaa", name: "METADIMENSIONISM", price: "300", location: "Carrer de Vera, 612001 Castellon, Spanga", eventStartDate: '2023-03-03', eventEndDate: '2023-03-06', website: 'https://www.zara.com/es', description: 'Lorem ipsum dolor sit amet, consectetur adi-piscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.', galleryImages: ["https://plinki-admin-panel.herokuapp.com/static/media/event2.651eb8b8826832c0bd80.png", "https://plinki-admin-panel.herokuapp.com/static/media/event3.630aecba8fd7147d2ec9.png"], featureImage: "https://plinki-admin-panel.herokuapp.com/static/media/event1.f2b70874b0d50aea4b38.png", reviews: [], tagLine: 'Best event' }]

class Events extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allEvents: [],
            filterAllEvents: [],
            loading: false,
            selectedKM: "30",
        }
    }


    async componentDidMount() {
        this.setState({ loading: true })
        let body = {
            lat: this.props.currentLocation?.latitude,
            long: this.props.currentLocation?.longitude
        }
        let res = await this.props._getAllEvent(body)
        if (res?.success) {
            console.log
            this.setState({ allEvents: res?.docs, filterAllEvents: res?.docs })
        }
        this.setState({ loading: false })
    }
    render() {
        console.log(this.props.userType, 'usertype....');
        return (
            <View style={{ flex: 1, backgroundColor: colors.white }} >
                <Header title={"Events"} />

                <View style={{ flex: 1 }} >

                    {/* <LatoText text={"Events"} fontSize={20} fontName={font.semibold} alignSelf="center" marginTop={20} /> */}

                    <View style={{ flex: 1, }} >
                        {

                            this.state.allEvents?.length > 0 ?
                                <FlatList
                                    contentContainerStyle={{ paddingBottom: 35 }}
                                    data={this.state.allEvents}
                                    renderItem={({ item, index }) =>
                                        <EventCard onPress={() => this.props.navigation.navigate("ItemDetail", { eventDetail: item })} {...{ item }} {...{ index }} key={index} />
                                    }
                                />
                                :
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                    <LatoText text={"Events list empty."} fontSize={18} color={colors.orange} />
                                </View>
                        }
                    </View>
                </View>
                <AppLoader visible={this.state.loading} />
            </View>
        )
    }
}

export default connect(state => state, middleware)(Events)

