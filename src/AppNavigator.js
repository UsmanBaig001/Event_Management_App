import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import CustomTab from './components/CustomTab'
import Bookmarks from './screens/Bookmarks'
import EditProfile from './screens/EditProfile'
import Events from './screens/Events'
import ForgotPassword from './screens/ForgotPassword'
import GuideScreen from './screens/GuideScreen'
import ItemDetail from './screens/ItemDetail'
import Login from './screens/Login'
import OnBoarding from './screens/OnBoarding'
import Profile from './screens/Profile'
import ResetPassword from './screens/ResetPassword'
import Signup from './screens/Signup'
import VerifyEmail from './screens/VerifyEmail'
import VerifyOtp from './screens/VerifyOtp'
import NearestEvents from './screens/NearestEvents'
import BuyTickets from './screens/BuyTickets'
import TicketDetail from './screens/TicketDetail'
import OrganizerCustomTab from './components/OrganizerCustomTab'
import OrganizerEvents from './screens/OrganizerEvents'
import CreateEvent from './screens/CreateEvent'
import QRCodeScannerScreen from './screens/QRCodeScannerScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import JazzcashCardDetailScreen from './screens/JazzcashCardDetailScreen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();
const CatScreens = () => {
    return (
        <Stack.Navigator initialRouteName='NearestEvents' screenOptions={{ headerShown: false }} >

            <Stack.Screen name='NearestEvents' component={NearestEvents} />
            <Stack.Screen name='ItemDetail' component={ItemDetail} />
            <Stack.Screen name='PaymentMethodScreen' component={PaymentMethodScreen} />
            <Stack.Screen name='JazzcashCardDetailScreen' component={JazzcashCardDetailScreen} />
        </Stack.Navigator>
    )
}
const MapStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >

            <Stack.Screen name='BuyTickets' component={BuyTickets} />
            <Stack.Screen name='TicketDetail' component={TicketDetail} />

        </Stack.Navigator>
    )
}
const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='EditProfile' component={EditProfile} />
        </Stack.Navigator>
    )
}
const EventStack = () => {
    return (
        <Stack.Navigator initialRouteName='Events' screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Events' component={Events} />
            <Stack.Screen name='ItemDetail' component={ItemDetail} />
            <Stack.Screen name='PaymentMethodScreen' component={PaymentMethodScreen} />
            <Stack.Screen name='JazzcashCardDetailScreen' component={JazzcashCardDetailScreen} />
        </Stack.Navigator>
    )
}
const OrganizerEventStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='OrganizerEvents' component={OrganizerEvents} />
            <Stack.Screen name='CreateEvent' component={CreateEvent} />
            <Stack.Screen name='ItemDetail' component={ItemDetail} />
            <Stack.Screen name='QRCodeScannerScreen' component={QRCodeScannerScreen} />
        </Stack.Navigator>
    )
}
const BookmarkStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Bookmarks' component={Bookmarks} />
            <Stack.Screen name='ItemDetail' component={ItemDetail} />
        </Stack.Navigator>
    )
}
class AppNavigator extends Component {


    TabStack() {
        return (
            <Tab.Navigator initialRouteName='CatScreens' tabBar={props => <CustomTab {...props} />} screenOptions={{ headerShown: false }} >
                <Tab.Screen name='CatScreens' component={CatScreens} />
                <Tab.Screen name='EventStack' component={EventStack} />
                <Tab.Screen name='MapStack' component={MapStack} />
                <Tab.Screen name='BookmarkStack' component={BookmarkStack} />
                <Tab.Screen name='ProfileStack' component={ProfileStack} />
            </Tab.Navigator>
        );
    }
    OrganizerTabStack() {
        return (
            <Tab.Navigator initialRouteName='EventStack' tabBar={props => <OrganizerCustomTab {...props} />} screenOptions={{ headerShown: false }} >
                <Tab.Screen name='EventStack' component={OrganizerEventStack} />
                <Tab.Screen name='ProfileStack' component={ProfileStack} />
            </Tab.Navigator>
        );
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='MapScreen' screenOptions={{ headerShown: false }} >
                    {
                        !this.props.user ?
                            <>
                                <Stack.Screen name='OnBoarding' component={OnBoarding} />
                                {
                                    !this.props.info &&
                                    <Stack.Screen name='GuideScreen' component={GuideScreen} />
                                }
                                <Stack.Screen name='Login' component={Login} />
                                <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
                                <Stack.Screen name='VerifyOtp' component={VerifyOtp} />
                                <Stack.Screen name='ResetPassword' component={ResetPassword} />
                                <Stack.Screen name='Signup' component={Signup} />
                                <Stack.Screen name='VerifyEmail' component={VerifyEmail} />

                            </>
                            :
                            this.props.userType === 'purchaser' ?
                                <Stack.Screen name='TabStack' component={this.TabStack} />
                                :
                                <Stack.Screen name='TabStack' component={this.OrganizerTabStack} />
                    }




                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default connect(state => state)(AppNavigator)