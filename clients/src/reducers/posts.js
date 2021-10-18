import { CREATE, UPDATE, DELETE, FETCH_ALL, FETCH_SINGLE, LIKEPOST, FETCH_BY_SEARCH, START_LOADING, END_LOADING, COMMENT } from '../constants/actionTypes';
export default ( state = { isLoading: true , posts: []}, action) => {
    switch ( action.type ) {
        case START_LOADING:
            return { ...state, isLoading: true }; 
        case END_LOADING:
            return { ... state, isLoading: false }; 
        case FETCH_ALL:
            return { 
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case FETCH_SINGLE:
            return { ...state, post : action.payload }
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload}
        case CREATE:
            return {...state, posts: [...state.posts, action.payload]};
        case UPDATE:
        case LIKEPOST:
            // if the post is the returned payload, return the updated else return all previous post
            // Since we are returning the updated "post" from the action creator
            return {...state, posts: state.posts.map( (post) => post._id === action.payload._id ? action.payload : post )};
        case COMMENT:
            return { ...state, posts: state.posts.map((post) => {
                // return all the other post normally
                // change the post that have just received a comment
                if( post._id === action.payload._id ) return action.payload;

                return post;
            })};
        case DELETE:
            // we returned the post id from action
            return {...state, posts: state.posts.filter( (post) => post._id !== action.payload) };
        default:
            return state;
    }
}