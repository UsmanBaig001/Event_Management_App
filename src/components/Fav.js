import React, { Component } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { connect } from 'react-redux'
import middleware from '../store/middleware'
import colors from '../theme/colors'

class Fav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fav: false,
            loading: false
        }
    }
    componentDidMount() {
        console.log(this.props.favourites, 'fav.......');
        this.checkFav()
    }
    checkFav = () => {

        let index = this.props.favourites?.findIndex(item => item?.fID === this.props.item?._id)
        this.setState({ fav: index === -1 ? false : true })
    }
    handleFavAdd = () => {
        this.setState(
            {
                loading: true
            },
            async () => {
                let body = {
                    "fID": this.props.item._id,
                    "userID": this.props.user._id,

                }
                body.eventID = this.props.item._id
                let res = await this.props._addFav(body)
                if (res)
                    this.setState({ fav: true, })
                this.setState({ loading: false })
            }
        );
    };
    handleFavRemove = async () => {

        let found = this.props.favourites.find(f => f.fID === this.props.item._id)

        if (found?._id) {
            await this.setState({ loading: true, });

            const res = await this.props._deleteFav(found._id)
            this.setState({ loading: false, fav: false, })

        }
        else
            this.setState({ loading: false })

    }

    componentDidUpdate(prevProps) {
        if (prevProps.favourites !== this.props.favourites) {
            this.checkFav()
        }
    }


    render() {

        return (
            // <TouchableOpacity onPress={() => { this.state.fav ? this.handleFavRemove() : this.handleFavAdd() }} >
            //     {
            //         this.state.loading ?
            //             <View style={{width:30, height:30}} >
            //                 <ActivityIndicator size="small" color={colors.orange} />
            //             </View>
            //             :
            //             <FontAwesome size={30} name={"heart"} color={this.state.fav ? colors.orange : colors.greyText} />
            //     }
            // </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.state.fav ? this.handleFavRemove() : this.handleFavAdd() }} >
                {
                    this.state.loading ?
                        <View style={{ width: 30, height: 30 }} >
                            <ActivityIndicator size="small" color={colors.orange} />
                        </View>
                        :
                        <FontAwesome size={30} name={"heart"} color={this.state.fav ? colors.orange : colors.greyText} />
                }
            </TouchableOpacity>
        )
    }
}

export default connect(state => state, middleware)(Fav)