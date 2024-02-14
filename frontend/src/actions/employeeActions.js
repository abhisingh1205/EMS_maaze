import {
  EMPLOYEE_UPLOAD_REQUEST,
  EMPLOYEE_UPLOAD_SUCCESS,
  EMPLOYEE_UPLOAD_FAIL,
  EMPLOYEE_TASKS_REQUEST,
  EMPLOYEE_TASKS_SUCCESS,
  EMPLOYEE_TAKS_FAIL,
} from "../constants/employee_constants";
import { RESET_MESSAGE } from "../constants/message_constants";
import axios from "../axiosConfig";

export const uploadFile = (id, files) => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_UPLOAD_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      `/base/emp-file/${id}`,
      { files: files },
      config
    );
    console.log("Data", data);
    if (data.msg) {
      dispatch({
        type: EMPLOYEE_UPLOAD_SUCCESS,
        payload: data,
      });
    } else if (data.error) {
      dispatch({
        type: EMPLOYEE_UPLOAD_FAIL,
        payload: data.error,
      });
    }
  } catch (error) {
    dispatch({
      type: EMPLOYEE_UPLOAD_FAIL,
      payload: error.response ? error.response.data.errors : error.message,
    });
  }
};

export const getTasksList = (id) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_TASKS_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(`base/tasks-list/${id}`, config);

    console.log("Data", data);
    dispatch({
      type: EMPLOYEE_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_TAKS_FAIL,
      payload: error.response ? error.error : error.message,
    });
  }
};
