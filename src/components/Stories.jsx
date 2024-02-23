import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStories, deleteStory } from '../features/StoriesSlice';
import storycss from '../assets/css/Stories.module.css';

function Stories() {

  let storyState = useSelector((state) => state.storyReducer.stories)
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(fetchStories());
  }, [])

  useEffect(() => {
    console.log("storyState", storyState)
  }, [storyState])

  if(storyState.length !== 0){
  return (
    <React.Fragment>
      <NavBar />
      {storyState.map((story) => (

        <div id={story.id} className={storycss.cardContainer}>
          <div className={storycss.title}>
            <h1 style={{color : "rgb(238, 64, 54)"}}>Title: {story.title}</h1>
          </div>
          <div className={storycss.mystory}>
            <h2 style={{color : "rgb(238, 64, 54)"}}>Story:</h2>
            <p className={storycss.storyPara}> {story.storyDesc}</p>
          </div>
          <div className={storycss.author}>
            Author: {story.author}
            <div>Date : {story.date}</div>
          </div>
            <button onClick = {()=>{dispatch(deleteStory(story.id))}} className={storycss.deletebtn}>Delete Story</button>
        </div>
      ))}

    </React.Fragment>
  )
}else{
  return (
    <React.Fragment>
    <NavBar />
    <div className={storycss.nostory}>
      <h1 className={storycss.heading}>No Story Yet!</h1>
    </div>
    </React.Fragment>
  )
}


}

export default Stories
