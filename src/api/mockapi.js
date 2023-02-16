import axios from "axios";

const instanse = axios.create({
  baseURL: 'https://63e651637eef5b2233835792.mockapi.io/my-social/'
});

export const getPosts = (fullName) => {
  return instanse.get(`posts?profileOwnerName=${fullName}&sortby=date&order=desc`)
    .then(response => {
      return response.data
    })
}

export const addPost = (obj) => {
  return instanse.post('posts', { ...obj })
}

export const deletePost = (id) => {
  return instanse.delete(`posts/${id}`)
}

export const likePost = (id, likesCount, whoLiked) => {
  return instanse.put(`posts/${id}`, { likesCount, whoLiked: [...whoLiked] })
}

export const changeComments = (id, commentsCount, comments) => {
  return instanse.put(`posts/${id}`, { commentsCount, comments: [...comments] })
}