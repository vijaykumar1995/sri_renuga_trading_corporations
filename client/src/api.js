/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
export default {
  user: {
    login: credentials =>
      axios.post("/api/employee/login", { data: credentials }).then(res =>  res.data.user),
    get: () => axios.get('api/employee').then(res => res.data),
    update: (data) => axios.put('/api/employee', { data: data }).then(res => res.data),
    delete: (data) => axios.delete('/api/employee', { data: data }).then(res => res.data)
  },
  categories: {
    create: data => axios.post('/api/categories', { data: data }).then(res => res.data),
    get: () => axios.get('/api/categories').then(res => res.data),
    update: (data) => axios.put('/api/categories', {data: data}).then(res => res.data),
    delete: (data) => axios.delete('/api/categories', {data: data}).then(res => res.data)
  },
  weight: {
    create: data => axios.post('/api/weight', { data: data }).then(res => res.data),
    get: () => axios.get('/api/weight').then(res => res.data),
    update: (data) => axios.put('/api/weight', {data: data}).then(res => res.data),
    delete: (data) => axios.delete('/api/weight', {data: data}).then(res => res.data)
  },
  product: {
    create: data => axios.post('/api/products', { data: data }).then(res => res.data),
    get: () => axios.get('/api/products').then(res => res.data),
    delete: (data) => axios.delete('/api/products', {data: data}).then(res => res.data),
    update: (data) => axios.put('/api/products', {data: data}).then(res => res.data)
  },
  purchase_company: {
    create: data => axios.post('/api/purchase_company', { data: data }).then(res => res.data),
    get: () => axios.get('/api/purchase_company').then(res => res.data),
    update: (data) => axios.put('/api/purchase_company', {data: data}).then(res => res.data),
    delete: (data) => axios.delete('/api/purchase_company', {data: data}).then(res => res.data)
  },
  stock: {
    get: () => axios.get('/api/stock').then(res => res.data),
    create: (data) => axios.post('/api/stock', { data: data }).then(res => res.data),
    fetch: (data) => axios.get('/api/stock/fetch_single', { params: {_id: data} }).then(res => res.data)
  },
  stock_maintainance: {
    get: () => axios.get('/api/stock_maintainance').then(res => res.data),
    updateStockDetails: () => axios.get('/api/stock_maintainance/update_stock').then(res => res.data)
  },
  settings: {
    get: () => axios.get('/api/settings').then(res => res.data),
    update: (data) => axios.post('/api/settings', {data: data}).then(res => res.data)
  }
};
