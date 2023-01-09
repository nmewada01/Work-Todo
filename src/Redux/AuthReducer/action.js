// import axios from "axios";
// import * as types from "./actionTypes";

// const register = (payload) => (dispatch) => {
//   dispatch({ type: types.REGISTER_REQUEST });
//   return axios
//     .post("https://masai-api-mocker.herokuapp.com/auth/register", payload)
//     .then((r) => {
//       dispatch({ type: types.REGISTER_SUCCESS, payload: r.data });
//     })
//     .catch((e) => dispatch({ type: types.REGISTER_FAILURE, payload: e }));
// };

// const login = (params) => (dispatch) => {
//   dispatch({ type: types.LOGIN_REQUEST });
//   return axios
//     .post("https://masai-api-mocker.herokuapp.com/auth/login", params)
//     .then((r) => {
//       dispatch({ type: types.LOGIN_SUCCESS, payload: r.data.token });
//     })
//     .catch((e) => {
//       dispatch({ type: types.LOGIN_FAILURE, payload: e });
//     });
// };

// const profile = (payload) => (dispatch) => {

//   dispatch({ type: types.PROFILE_REQUEST });
//   const options = {
//     method: "GET",
//     url: `https://masai-api-mocker.herokuapp.com/user/${payload.username}`,
//     headers: { Authorization: `Bearer ${payload.token}` },
//   };

//   return axios(options)
//     .then((r) => {
//       dispatch({
//         type: types.PROFILE_SUCCESS,
//         payload: r.data,
//       });
//     })
//     .catch((e) => dispatch({ type: types.PROFILE_FAILURE, payload: e }));
// };

// export { login, register, profile };

import axios from "axios";
import { setToast } from "../../utils/Authenticate";
import { saveLocalData } from "../../utils/localStorage";
import * as types from "./actionTypes";
const register = (payload, toast) => (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST });
  return axios
    .post(`${process.env.REACT_APP_AUTHENTICATION}/auth/signup`, payload)
    .then((r) => {
      return dispatch({ type: types.REGISTER_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      setToast(toast, e.response.data.msg, "error");
      dispatch({ type: types.REGISTER_FAILURE, payload: e });
    });
};

const login = (payload, toast) => (dispatch) => {
  saveLocalData("userCredentials", payload.email);
  dispatch({ type: types.LOGIN_REQUEST });
  return axios
    .post(`${process.env.REACT_APP_AUTHENTICATION}/auth/login`, payload)
    .then((r) => {
      return dispatch({ type: types.LOGIN_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      setToast(toast, e.response.data.msg, "error");
      dispatch({ type: types.LOGIN_FAILURE, payload: e });
    });
};

const profile = (payload) => (dispatch) => {
  dispatch({ type: types.PROFILE_REQUEST });
  const options = {
    method: "GET",
    url: `${process.env.REACT_APP_AUTHENTICATION}/auth/${payload.email}`,
    headers: { Authorization: `Bearer ${payload.token}` },
  };
  return axios(options)
    .then((r) => {
      dispatch({
        type: types.PROFILE_SUCCESS,
        payload: r.data,
      });
    })
    .catch((e) => dispatch({ type: types.PROFILE_FAILURE, payload: e }));
};

export { login, register, profile };
