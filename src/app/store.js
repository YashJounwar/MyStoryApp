import {configureStore} from '@reduxjs/toolkit'
import { mystory } from '../features/MyStories'
import {logger} from 'redux-logger'
import { blogReducer } from '../features/BloggerSlice.js'
import { storyReducer } from '../features/StoriesSlice.js'
import { signupReducer } from '../features/SignupSlice.js'
import { loggedInReducer } from '../features/IsLoggedIn.js'
import { signupDataReducer } from '../features/SignupDataSlice.js'


export const store = configureStore({
    reducer:{
        mystory : mystory,
        blogReducer : blogReducer,
        storyReducer : storyReducer,
        signupReducer : signupReducer,
        loggedInReducer : loggedInReducer,
        signupDataReducer : signupDataReducer
    },
    // middleware : (defaultMiddleware) => defaultMiddleware().concat(logger)
})