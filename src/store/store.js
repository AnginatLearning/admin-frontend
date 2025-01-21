import { applyMiddleware, combineReducers, compose, createStore, } from 'redux';

import { PostsReducer, toggleMenu } from './reducers/PostsReducer';
import { thunk } from 'redux-thunk';
import { AuthReducer } from './reducers/AuthReducer';
import todoReducers from './reducers/Reducers'; 
import searchReducer from './reducers/SearchReducer';
import { configureStore } from '@reduxjs/toolkit';

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    sideMenu: toggleMenu,
    posts: PostsReducer,
    auth: AuthReducer,
    todoReducers,
    search : searchReducer
});

export const store = configureStore({
    reducer: reducers
});
