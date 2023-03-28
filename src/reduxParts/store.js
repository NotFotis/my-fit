import { configureStore} from "@reduxjs/toolkit";
import exerciseReducer from './reducers/exerciseSlice.js';
import thunkMiddleWare from "redux-thunk";
import { applyMiddleware } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import { composeWithDevTools } from "redux-devtools-extension";
// import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
import workoutReducer from "./reducers/workoutSlice.js"
import goalReducer from "./reducers/goalSlice.js"
import programReducer from "./reducers/programSlice.js"

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleWare))

export default configureStore({

    reducer: {
        exercise: exerciseReducer,
        workout:workoutReducer,
        program:programReducer,
        goal:goalReducer
    },
    
    // middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger),
    // composedEnhancer
})
