import axios from 'axios';
import { useSearchParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import styles from '../assets/css/News.module.css'
import NavBar from './NavBar';
import { useErrorBoundary } from 'react-error-boundary';

function News() {

  var [countryParam, setCountryParam] = useSearchParams();
  const [news, setNews] = useState([]);
  const [country, setCountry] = useState('us');
  const [category, setCategory] = useState('science');
  const [throwError, setThrowError] = useState({
    error : false,
    errorMsg : ""
  });

  // For error boundary
  // const {error, resetErrorBoundary} = useErrorBoundary();

  if (throwError.error) {
    throw new Error("API ERROR: "+ throwError.errorMsg);
  }

  // handling the country change
  const handleCountry = (e) => {
    setCountry(e.target.value)
  }

  // handling the news category
  const handleCategory = (e) => {
    setCategory(e.target.value);
  }

  //fetching the NEWS API in useEffect
  useEffect(() => {

    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=1f499fbc4dad4dd5bebf0ee2cd3e387d`;

    axios.get(apiUrl)
      .then((response) => {
        const data = response.data.articles;
        // console.log(data)
        setNews(data);
      })
      .catch((error) => {
        setThrowError({
          error : true,
          errorMsg : error.message
        })
        console.error("error Message :", error.message);
      })
    countryParam = country;
    const categoryParam = category;
    setCountryParam({ country: countryParam, category: categoryParam });

  }, [country, category])

  return (
    <>
      <NavBar />
      <div className={styles.filters}>
        <select name="country" value={country} onChange={handleCountry} id="country">
          <option value="us">US</option>
          <option value="in">IN</option>
        </select>
        <select name="category" value={category} onChange={handleCategory} id="category">
          <option value="technology">Technology</option>
          <option value="science">Science</option>
          <option value="entertainment">Entertainment</option>
          <option value="sports">Sports</option>
          <option value="politics">Politics</option>
          <option value="health">Health</option>
        </select>
      </div>

      {news.map((news, index) => {
        if (news.author !== null && news.urlToImage !== null) {
          return (

            <div key={index} className={styles.card}>
              <div className={styles.newsDesc}>
                <div className={styles.title}><h3>Title:{news.title}</h3></div>
                <p>{news.description}</p>
                <button className={styles.cardbtn}><a href={news.url}>Read Full Article</a></button>
              </div>
              <div className={styles.image}>
                <img src={news.urlToImage} alt="Image not available" />
              </div>
            </div>

          )
        }
      })}
      </>
 )
}

export default News;
