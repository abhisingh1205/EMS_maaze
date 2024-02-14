import {
  EMPLOYEE_UPLOAD_REQUEST,
  EMPLOYEE_UPLOAD_SUCCESS,
  EMPLOYEE_UPLOAD_FAIL,
  EMPLOYEE_UPLOAD_RESET,
  EMPLOYEE_TASKS_REQUEST,
  EMPLOYEE_TASKS_SUCCESS,
  EMPLOYEE_TAKS_FAIL,
  EMPLOYEE_TASKS_RESET,
} from "../constants/employee_constants";

export const fileUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_UPLOAD_REQUEST:
      return { loading: true };
    case EMPLOYEE_UPLOAD_SUCCESS:
      return { loading: false, message: action.payload };
    case EMPLOYEE_UPLOAD_FAIL:
      return { error: action.payload };
    case EMPLOYEE_UPLOAD_RESET:
      return {};
    default:
      return state;
  }
};

export const taskListReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_TASKS_REQUEST:
      return { loading: true };
    case EMPLOYEE_TASKS_SUCCESS:
      return { loading: false, data: action.payload };
    case EMPLOYEE_TAKS_FAIL:
      return { error: action.payload };
    case EMPLOYEE_UPLOAD_RESET:
      return {};
    default:
      return state;
  }
};
