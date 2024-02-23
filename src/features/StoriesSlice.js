import { createSlice } from '@reduxjs/toolkit'
import { refe } from '../DataBase/firebaseDB';
import { get, remove } from 'firebase/database';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../DataBase/firebaseDB';

const initialState = {
  stories: [],
  status: '',
  error: null
};

export const fetchStories = createAsyncThunk(
  'story/fetchStories',
  async () => {
    try {
      const data = [];
      console.log("fetchStories is called")
      const snapshot = await get(refe(db, `/Stories`));
      snapshot.forEach((childsnapshot) => {
        data.push(childsnapshot.val());
      });
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
);



const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    deleteStory: (state, action) => {

      get(refe(db,`/Stories/`))
      .then((snapshot) => {
        snapshot.forEach((childsnapshot) => {
          const data = childsnapshot.val();
          if(data.id === action.payload){
            
            remove(refe(db,`/Stories/${childsnapshot.key}`))
                .then(() => {
                    console.log("data is removed")
                })
                .catch((error) => {
                    console.log("error: " + error.message);
                })
                window.location.reload();
          } 
        })
      })
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stories = action.payload;
        console.log('Fetched stories:', action.payload);
        console.log(state.stories)
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.error('Fetch stories failed:', action.error.message);
      });
  }
});

export const storyReducer = storySlice.reducer;
export const { getStories, deleteStory } = storySlice.actions;