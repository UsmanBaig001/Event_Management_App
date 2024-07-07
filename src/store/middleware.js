

import path from "../config/path"
import api from "../services/api"
import actions from "./actions"
import jwt_decode from "jwt-decode";
import store from "./index";



const _login = body => (dispatch) => {
    return api(path.LOGIN, body, "POST").then(res => {
        if (res.success) {
            var decoded = jwt_decode(res.token);
            dispatch(actions._setUser({ token: res?.token, user: decoded.payload }))
        }
        return res
    })
}

const _signup = body => (dispatch) => {
    return api(path.SIGNUP, body, "POST").then(res => {
        return res
    })
}

const _sendEmailOtp = (email) => (dispatch) => {


    return api(path.SEND_EMAIL_OTP + email, null, "get").then(res => {

        return res
    })

}
const _sendEmailOtpForForgot = (email) => (dispatch) => {


    return api(path.SEND_EMAIL_OTP_FORGOT + email, null, "get").then(res => {

        return res
    })

}
const _forgotChangePassword = body => (dispatch) => {


    return api(path.FORGOT_PASSWORD + body.email, { password: body.password }, "PUT").then(res => {

        return res
    })

}
const _addEvent = body => (dispatch) => {


    return api(path.ADD_EVENT, body, "POST").then(res => {
        console.log(res, 'res....');
        return res
    })

}
const _getAllEvent = body => (dispatch) => {


    return api(path.GET_EVENT_BY_LAT_LONG, body, "POST").then(res => {
        return res
    })

}
const _getAllEventByUserId = userId => (dispatch) => {


    return api(path.GET_EVENT_BY_USER_ID + userId, null, "GET").then(res => {
        return res
    })

}
const _addFav = body => (dispatch) => {


    return api(path.ADD_FAVOURITE, body, "post").then(res => {
        if (res) {
            dispatch(_getFav())
        }
        return res
    })

}
const _getFav = userid => (dispatch) => {
    const { user } = store.getState()

    return api(path.GET_FAVOURITE + user._id, null, "GET").then(res => {
        console.log(res, 'favres.....');

        if (res) {
            dispatch(actions._setFav(res))
        }
        return res
    })

}
const _deleteFav = id => (dispatch) => {


    return api(path.DELETE_FAVOURITE + id, null, "DELETE").then(res => {

        if (res.success)
            dispatch(_getFav())

        return res
    })

}
const _editUser = body => (dispatch) => {


    return api(path.EDIT_USER + body._id, body, "PATCH").then(res => {
        if (res?.success)
            dispatch(actions._setUser({ token: store.getState().token, user: res.user }))

        return res
    })

}
const _getAllCat = body => (dispatch) => {


    return api(path.GET_ALL_CAT, null, "GET").then(res => {


        return res
    })

}
const _getPlaceByCatId = (id, body) => (dispatch) => {


    return api(path.PLACE_BY_CAT_ID + id, body, "POST").then(res => {


        return res
    })

}
const _getPlaceByID = id => (dispatch) => {


    return api(path.PLACE_BY_ID + id, null, "GET").then(res => {


        return res
    })

}
const _addRating = body => (dispatch) => {


    return api(path.ADD_RATING, body, "post").then(res => {


        return res
    })

}
const _getUserByEmail = email => (dispatch) => {


    return api(path.GET_USER_BY_EMAIL + email, null, "get").then(res => {


        return res
    })

}
const _getAllActivities = email => (dispatch) => {


    return api(path.GET_ALL_ACTIVITIES, null, "get").then(res => {


        return res
    })

}
const _getRoutes = email => (dispatch) => {


    return api(path.GET_ALL_ROUTES, null, "get").then(res => {


        return res
    })

}
const _purchaseTicket = body => (dispatch) => {


    return api(path.BUY_TICKET, body, "post").then(res => {


        return res
    })

}
const _getAllTicketsByUserId = userId => (dispatch) => {


    return api(path.GET_TICKETS_BY_USER_ID + userId, null, "GET").then(res => {
        console.log(res, 'tickets....');
        return res
    })

}
export default {
    ...actions,
    _login,
    _signup,
    _sendEmailOtp,
    _sendEmailOtpForForgot,
    _forgotChangePassword,
    _getAllEvent,
    _addEvent,
    _getAllEventByUserId,
    _addFav,
    _getFav,
    _deleteFav,
    _editUser,
    _getAllCat,
    _getPlaceByCatId,
    _addRating,
    _getUserByEmail,
    _getAllActivities,
    _getRoutes,
    _getPlaceByID,
    _purchaseTicket,
    _getAllTicketsByUserId

}
