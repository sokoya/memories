import { CREATE, UPDATE, DELETE, FETCH_ALL, LIKEPOST } from '../constants/actionTypes';
export default ( posts = [], action) => {
    switch ( action.type ) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
        case LIKEPOST:
            // if the post is the returned payload, return the updated else return all previous post
            // Since we are returning the updated "post" from the action creator
            return posts.map( (post) => post._id === action.payload._id ? action.payload : post );
        case DELETE:
            // we returned the post id from action
            return posts.filter( (post) => post._id !== action.payload);
        default:
            return posts;
    }
}