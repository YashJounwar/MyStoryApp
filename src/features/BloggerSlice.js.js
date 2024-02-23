import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { country, category } from "../components/News";
import axios from 'axios'


const initialState = {
    loading: false,
    Blogs: [],
    error: ''
}

const fetchBlogs = createAsyncThunk('Blogs/fetchBlogs', () => {

    axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=1f499fbc4dad4dd5bebf0ee2cd3e387d`)
        .then((res) => {
            const data = res.data.articles
            console.log(data);
            return data
        })
        .catch((err) => {
            console.log("error Message", err.message);
        });
})

const BloggerSlice = createSlice({
    name: 'Blogs',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchBlogs.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchBlogs.fulfilled, (state, action) => {
            state.loading = false;
            state.Blogs = action.payload;
            state.error = ''
        })
        builder.addCase(fetchBlogs.rejected, (state, action) => {
            state.loading = false;
            state.Blogs = [];
            state.error = action.error.message
        })
    }
})

export const blogReducer = BloggerSlice.reducer;
export default fetchBlogs;