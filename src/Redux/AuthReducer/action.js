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
    .post("https://naresh-auth-user.onrender.com/auth/signup", payload)
    .then((r) => {
      console.log(r.data);
      setToast(toast, "Registered Successful", "success");
      dispatch({ type: types.REGISTER_SUCCESS, payload: r.data });
    })
    .catch((e) => {
      setToast(toast, e.response.data.message, "error");
      dispatch({ type: types.REGISTER_FAILURE, payload: e });
    });
};

const login = (payload, toast) => (dispatch) => {
  console.log(payload)
  saveLocalData("userCredentials", payload.email);
  dispatch({ type: types.LOGIN_REQUEST });
  return axios
    .post("https://naresh-auth-user.onrender.com/auth/login", payload)
    .then((r) => {
      console.log(r)
      setToast(toast, "Login Successful", "success");
      dispatch({ type: types.LOGIN_SUCCESS, payload: r.data.token });
    })
    .catch((e) => {
      setToast(toast, e.response.data.message, "error");
      dispatch({ type: types.LOGIN_FAILURE, payload: e });
    });
};

const profile = (payload) => (dispatch) => {
  dispatch({ type: types.PROFILE_REQUEST });
  const options = {
    method: "GET",
    url: `https://naresh-auth-user.onrender.com/auth/${payload.email}`,
    headers: { Authorization: `Bearer ${payload.token}` },
  };
  return axios(options)
    .then((r) => {
      console.log("action", r.data)
      dispatch({
        type: types.PROFILE_SUCCESS,
        payload: r.data,
      });
    })
    .catch((e) => dispatch({ type: types.PROFILE_FAILURE, payload: e }));
};

export { login, register, profile };
