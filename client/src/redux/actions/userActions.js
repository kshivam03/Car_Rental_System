import axios from "axios";
import { message } from "antd";

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/users/getallusers");
    dispatch({ type: "GET_ALL_USERS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/login", reqObj);
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login successfull");
    setTimeout(() => {
      if (
        JSON.parse(localStorage.getItem("user")).username === "admin@gmail.com"
      )
        window.location.href = "/admin";
      else window.location.href = "/";
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Invalid username or password");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/register", reqObj);
    if (response.data.error === 1) {
      message.error("Password and Confirm Password are not same");
    } else if (response.data.error === 2) {
      message.error("User already exist");
      setTimeout(() => {
        window.location.href = "/register";
      }, 500);
    } else if (response.data.error === 0) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      message.success("Registration Successfull");
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    }
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    setTimeout(() => {
      window.location.href = "/register";
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const changePassword = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/users/changepassword", reqObj);
    const user = localStorage.getItem("user");
    if (user) {
      const parsedData = JSON.parse(user);
      parsedData.password = reqObj.password;
      localStorage.setItem("user", JSON.stringify(parsedData));
    }
    message.success("Password updated successfully");
    setTimeout(() => {
      if (
        JSON.parse(localStorage.getItem("user")).username != "admin@gmail.com"
      )
        window.location.href = "/";
      else window.location.href = "/admin";
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteUser = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/users/deleteuser", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success("User deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
