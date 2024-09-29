import ACTION_TYPES from './actionTypes';

const _setUser = payload => ({type: ACTION_TYPES.LOGIN, payload});
const _setUserType = payload => ({type: ACTION_TYPES.USER_TYPE, payload});
const _logout = () => ({type: ACTION_TYPES.LOGOUT});
const _remember = payload => ({type: ACTION_TYPES.REMEMBER, payload});
const _info = payload => ({type: ACTION_TYPES.INFO, payload});
const _setFav = payload => ({type: ACTION_TYPES.FAVOURITES, payload});
const _setCurrentLocation = payload => ({
  type: ACTION_TYPES.CURRENT_LOCATION,
  payload,
});

export default {
  _setUser,
  _setUserType,
  _logout,
  _remember,
  _info,
  _setFav,
  _setCurrentLocation,
};
