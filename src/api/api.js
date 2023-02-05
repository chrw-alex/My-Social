import axios from 'axios';

const instanse = axios.create({
  withCredentials: true,
  headers: {
    'API-KEY': '2d03c615-d6dd-4611-aea7-50381ef37ebd'
  },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/'
});

export const getUsers = (page = 1, count = 10) => {
  return instanse.get(`users?page=${page}&count=${count}`)
    .then(response => {
      return response.data
    })
}

export const postFollow = (id) => {
  return instanse.post(`follow/${id}`)
}

export const deleteFollow = (id) => {
  return instanse.delete(`follow/${id}`)
}

export const showMore = (page, count = 10) => {
  return instanse.get(`users?page=${page}&count=${count}`)
    .then(response => {
      return response.data
    })
}

export const getMe = () => {
  return instanse.get('auth/me')
}

export const getProfile = (id) => {
  return instanse.get(`profile/${id}`)
    .then(response => {
      return response.data
    })
}

export const getStatus = (id) => {
  return instanse.get(`profile/status/${id}`)
}

export const changeStatus = (statusText) => {
  return instanse.put(`profile/status`, { status: statusText })
}

export const loginUser = (email, password, rememberMe) => {
  return instanse.post(`auth/login`, { email, password, rememberMe })
}

export const logoutUser = () => {
  return instanse.delete(`auth/login`)
}