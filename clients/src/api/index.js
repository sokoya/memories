import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if( localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});




// const url = "https://olayinka-memories.herokuapp.com/";

export const fetchPosts = () => API.get('/posts');

export const createPost = ( newPost) => API.post( '/posts', newPost);

export const updatePost = ( id, updatedPost) => API.patch( `/posts/${id}`, updatedPost);

export const deletePost = ( id ) => API.delete( `/posts/${id}`);

export const likePost = ( id ) => API.patch(`/posts/${id}/likePost`);


// Auth

export const signin = (formData) => API.post('/users/signin', formData);

export const signup = (formData) => API.post('/users/signup', formData);