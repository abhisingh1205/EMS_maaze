import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/user_constants";
import { EMPLOYEE_UPLOAD_RESET, EMPLOYEE_TASKS_RESET } from "../constants/employee_constants";
import { RESET_MESSAGE } from "../constants/message_constants";
import axios from "../axiosConfig";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log("email = ", email);
    console.log("password = ", password);
    const { data } = await axios.post(
      "/auth/login/",
      {
        email: email,
        password: password,
      },
      config
    );

    if (data.msg == "Login Success") {
      let token = data.token.access;
      localStorage.setItem("token", token);
      const getUserInfo = async () => {
        try {
          let authValue = "Bearer " + token;

          const userresponse = await axios.get("/base/emp-profile/", {
            headers: {
              Authorization: authValue,
              Accept: "application/json",
            },
          });
          localStorage.setItem("userInfo", JSON.stringify(userresponse.data));
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: userresponse.data,
            token: token,
          });
        } catch (error) {
          dispatch({
            type: USER_LOGIN_FAILED,
            error: error,
          });
        }
      };
      getUserInfo();
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: error.response.data,
    });
  }
};

export const register =
  (name, email, password, password2, category) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const senddata = {
        user: {
          email: email,
          password: password,
          password2: password2,
          name: name,
        },
        department: { name: category },
      };
      const { data } = await axios.post("/base/empregister/", senddata, config);

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      //localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response ? error.response.data.errors : error.message,
      });
    }
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  localStorage.removeItem("cartItem");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: RESET_MESSAGE });
  dispatch({ type: EMPLOYEE_UPLOAD_RESET });
  dispatch({ type: EMPLOYEE_TASKS_RESET });
};
