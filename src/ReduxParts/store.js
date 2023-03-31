import { configureStore} from "@reduxjs/toolkit";
import exerciseReducer from './exercise/exerciseSlice.js';
import thunkMiddleWare from "redux-thunk";
import { applyMiddleware } from "@reduxjs/toolkit";
//.import logger from 'redux-logger';
import { composeWithDevTools } from "redux-devtools-extension";
// import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";


const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleWare))

export default configureStore({

    reducer: {
        exercise: exerciseReducer
        
    },
    
    // middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger),
    // composedEnhancer
})
