import {createStore, compinedReducers, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducers';
import uiReducer from './reducers/uiReducer';
//redux store props

const initialState={};

const middleware= [thunk];

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
});

const store = createStore(reducers, initialState,
     compose(applyMiddleware(...middleware)   )
    );

export default store;