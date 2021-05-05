/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
export default {
  user: {
    login: credentials =>
      axios.post("/api/employee/login", { data: credentials }).then(res =>  res.data.user),
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/api/users/reset_password_request", { email }),
    validateToken: data => 
    axios.post("/api/users/validate_token", { data }),
    resetPassword: data => axios.post("/api/users/reset_password", { data })
  }
};
