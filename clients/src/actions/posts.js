import * as api from '../api';
import { CREATE, UPDATE, DELETE, FETCH_ALL, FETCH_SINGLE, LIKEPOST, FETCH_BY_SEARCH, START_LOADING, END_LOADING , COMMENT} from '../constants/actionTypes';

//Actions Creators
export const getPosts = (page) => async (dispatch) => {
    try {

        dispatch({type: START_LOADING});
        const { data } = await api.fetchPosts( page );
        dispatch({ type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log( error );
    }
}

export const getPost = (id) => async ( dispatch )  => {
    
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchSinglePost(id);
        dispatch({ type: FETCH_SINGLE, payload: data})
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log( error );
    }
}

export const getPostsBySearch = ( query ) => async (dispatch) => {
    try {
        
        dispatch({type: START_LOADING});
        const { data: { data } } = await api.fetchPostsBySearch(query);
        
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}


export const createPost = ( post, history ) => async ( dispatch) => {

    try {
        dispatch({type: START_LOADING});
        const { data } = await api.createPost(post);
        history.push(`/posts/${data._id}`);
        dispatch({ type: CREATE,  payload: data});
    } catch (error) {
        console.log( error.message );
    }
}


export const updatePost = ( id, post ) => async ( dispatch) => {

    try {
        const { data } = await api.updatePost(id,post); // response.data
        dispatch({ type: UPDATE,  payload: data});
    } catch (error) {
        console.log( error.message );
    }
}

export const deletePost = ( id ) => async ( dispatch ) => {
    try {
        await api.deletePost( id );

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log( error );
    }
}

export const likePost = ( id ) => async ( dispatch ) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKEPOST, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = ( comment, postId ) => async (dispatch) => {
    try {
        console.log( postId );
        const { data } = await api.comment( comment, postId);
        dispatch({ type: COMMENT, payload: data});
        return data.comments;
    } catch (error) {
        console.log( error );
    }
}