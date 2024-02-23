import { createSlice, nanoid } from '@reduxjs/toolkit'
import {  db, refe } from '../DataBase/firebaseDB';
import { push, update } from 'firebase/database';

export let submitted = false;

const initialState = {
    id: '',
    title: '',
    storyDesc: '',
    author: '',
    date : null
}

const mystoriesSlice = createSlice({
    name: 'mystory',
    initialState,
    reducers: {
        addStory: (state, action) => {
            state = {
                id : nanoid(),
                title : action.payload.title,
                storyDesc : action.payload.storyDesc,
                author : action.payload.author,
                date : `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
            }
            push(refe(db, `/Stories/`), state)
            state = initialState;
        }
    },
}
)

export const { addStory } = mystoriesSlice.actions;
export const mystory  = mystoriesSlice.reducer