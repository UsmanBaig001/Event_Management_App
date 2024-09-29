export const BASE_URL = 'https://event-management-server-chi.vercel.app/';

export default {
  LOGIN: BASE_URL + 'user/login',
  SIGNUP: BASE_URL + 'user/signup',
  SEND_EMAIL_OTP: BASE_URL + 'user/send-email/',
  SEND_EMAIL_OTP_FORGOT: BASE_URL + 'user/send-reset-pass/',
  FORGOT_PASSWORD: BASE_URL + 'user/reset/password/',

  GET_ALL_EVENT: BASE_URL + 'event/get/all',
  ADD_EVENT: BASE_URL + 'event/add',
  GET_EVENT_BY_LAT_LONG: BASE_URL + 'event/get/by/near/location',
  GET_EVENT_BY_USER_ID: BASE_URL + 'event/get/by/user/',
  GET_ALL_CAT: BASE_URL + 'category/get/',
  ADD_FAVOURITE: BASE_URL + 'favorite/add',
  GET_FAVOURITE: BASE_URL + 'favorite/user/',
  DELETE_FAVOURITE: BASE_URL + 'favorite/delete/',

  EDIT_USER: BASE_URL + 'user/edit/',
  GET_USER_BY_EMAIL: BASE_URL + 'user/get/by/email/',
  GET_ALL_ACTIVITIES: BASE_URL + 'activity/get',
  GET_ALL_ROUTES: BASE_URL + 'route/get',
  PLACE_BY_CAT_ID: BASE_URL + 'place/get/by/near/location/',
  PLACE_BY_ID: BASE_URL + 'place/get/',
  ADD_RATING: BASE_URL + 'rating/add',

  BUY_TICKET: BASE_URL + 'ticket/add',
  GET_TICKETS_BY_USER_ID: BASE_URL + 'ticket/get/by/user/',
};
