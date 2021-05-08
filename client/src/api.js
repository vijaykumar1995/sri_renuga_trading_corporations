/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
export default {
  user: {
    login: credentials =>
      axios.post("/api/employee/login", { data: credentials }).then(res =>  res.data.user),
  },
  categories: {
    create: data => axios.post('/api/categories', { data: data }).then(res => res.data),
    get: () => axios.get('/api/categories').then(res => res.data),
    update: (data) => axios.put('/api/categories', {data: data}).then(res => res.data),
    delete: (data) => axios.delete('/api/categories', {data: data}).then(res => res.data)
  }
};
