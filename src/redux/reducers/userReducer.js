import {SET_TEST,LOADING_DATA,SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED,LOADING_USER } from '../type';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    //todo more data

};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
    
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
            
            case SET_UNAUTHENTICATED:
                return initialState;
            case SET_USER:
                return {
                    authenticated: true,
                    loading: false,
                    ...action.payload
                };
            case LOADING_USER:
                return{
                    ...state,
                    loading: true
                }
            
            default:
                return state;
    }
}