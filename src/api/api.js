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

export const searchUsersbyName = (page = 1, count = 10, term) => {
  return instanse.get(`users?page=${page}&count=${count}&term=${term}`)
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

export const showMore = (page, count = 10, term = '') => {
  return instanse.get(`users?page=${page}&count=${count}&term=${term}`)
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

export const getFollowed = (id) => {
  return instanse.get(`follow/${id}`)
}

export const loginUser = (email, password, rememberMe, captcha) => {
  return instanse.post(`auth/login`, { email, password, rememberMe, captcha })
}

export const logoutUser = () => {
  return instanse.delete(`auth/login`)
}

export const getCaptcha = () => {
  return instanse.get('security/get-captcha-url')
}

export const changeProfileInfo = (obj) => {
  return instanse.put('profile', { ...obj })
}

export const changeProfileImg = (formData) => {
  return instanse.put('profile/photo', formData, { headers: { 'content-type': 'multipart/form-data' } })
}

export const getUserImg = (id) => {
  return instanse.get(`profile/${id}`)
    .then(response => {
      return response.data.photos.small
    })
}

export const getFriends = () => {
  return instanse.get('users?friend=true&count=100')
    .then(response => {
      return response.data
    })
}

export const getDialogs = () => {
  return instanse.get('dialogs')
    .then(response => {
      return response.data
    })
}

export const getMessages = (id) => {
  return instanse.get(`dialogs/${id}/messages`)
    .then(response => {
      return response.data
    })
}

export const sendMessage = (id, body) => {
  return instanse.post(`dialogs/${id}/messages`, { body })
}

export const deleteMessage = (messageId) => {
  return instanse.delete(`dialogs/messages/${messageId}`)
}

export const getMessagesCount = () => {
  return instanse.get('dialogs/messages/new/count')
}