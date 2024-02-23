import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import {useDispatch, useSelector} from 'react-redux'
import { addStory, deleteStory, submitted } from '../features/MyStories'
import mystory from '../assets/css/MyStories.module.css'
import { useNavigate } from 'react-router'

function MyStories() {

  const navigate = useNavigate();
  const myStoryState = useSelector((state) => state.mystory)


  const [state,setState] = useState({
    id: '',
    title: '',
    storyDesc: '',
    author: ''
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) =>{
    e.preventDefault();
      dispatch(addStory(state));
      navigate('/Stories')
      console.log("data pushed into the database");
  }

  return (
    <React.Fragment>
      <NavBar />
      <div className={mystory.storyForm}>
      <form onSubmit={handleSubmit}>
        <div className={mystory.storytitle}>
        Story Title:
        </div>
        <input type="text" name='title' value={state.title} onChange={(e) => setState({ ...state, title: e.target.value })} placeholder='Title' required/>
        
        <div className={mystory.storytitle}>Story Description</div>
        <textarea name="storyDesc" id={mystory.storyDesc} value={state.storyDesc} onChange={(e) => setState({ ...state, storyDesc: e.target.value })} cols="30" rows="10" placeholder='Write Your Story' required />
        <label htmlFor="author">
          <input type="text" name='author' id={mystory.author} value={state.author} onChange={(e) => setState({ ...state, author: e.target.value })} placeholder='Author Name' required/>
        </label>
        <div >
          <button className={mystory.save} type='submit'>Save</button>
        </div>
      </form>
      </div>
    </React.Fragment>
  )
}

export default MyStories
