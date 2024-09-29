import ACTION_TYPES from './actionTypes';

const initialState = {
  darkMode: false,
  user: null,
  token: null,
  remember: null,
  info: false,
  favourites: [],
  userType: 'purchaser',
  currentLocation: {
    latitude: 31.407085,
    latitudeDelta: 0.1,
    longitude: 73.147595,
    longitudeDelta: 0.1,
  },
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ACTION_TYPES.LOGIN: {
      return {
        ...state,
        user: payload.user,
        token: payload.token,
      };
    }
    case ACTION_TYPES.USER_TYPE: {
      return {
        ...state,
        userType: payload,
      };
    }
    case ACTION_TYPES.LOGOUT: {
      return {
        ...state,
        user: null,
        token: null,
      };
    }
    case ACTION_TYPES.REMEMBER: {
      return {
        ...state,
        remember: payload,
      };
    }
    case ACTION_TYPES.INFO: {
      return {
        ...state,
        info: payload,
      };
    }
    case ACTION_TYPES.FAVOURITES: {
      return {
        ...state,
        favourites: payload,
      };
    }
    case ACTION_TYPES.CURRENT_LOCATION: {
      return {
        ...state,
        currentLocation: payload,
      };
    }

    default:
      return state;
  }
};
