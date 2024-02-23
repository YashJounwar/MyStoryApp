import React, { useEffect, useState } from 'react'
import home from '../assets/css/HomePage.module.css'
import {Link, useSearchParams } from 'react-router-dom'
import NavBar from './NavBar';
import blog1 from '../assets/images/cards/blog1.avif'
import { useDispatch, useSelector } from 'react-redux';
import fetchBlogs from '../features/BloggerSlice.js';
import axios from 'axios';
import weatherimg from '../assets/images/weather.jpeg'

function HomePage() {

    const loggedInState = useSelector((state) => state.loggedInReducer.isLoggedIn)
    const state = useSelector((state) => state.blogReducer);
    const dispatch = useDispatch();
    let [cityParams, setCityParams] = useSearchParams();
    let [data, setData] = useState([]);
    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {

        axios.get(`https://api.api-ninjas.com/v1/weather?city=Indore`, {
            method: 'GET',
            headers: { 'X-Api-Key': 'ECJ8SGh+TUd6MlyhKCEBiA==iiUdW151Djb9YZSF' },
            contentType: 'application/json',
        })
            .then((res) => {
                const data = res.data;
                setWeatherData(data);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })

        dispatch(fetchBlogs());
        setData(state.Blogs);
        setData(data.filter((blog) => blog.urlToImage !== null && blog.description !== null));
        console.log(state.Blogs)
        console.log("LoggedIn State in HomePage:", loggedInState)

    }, [])


    return (
        <React.Fragment>
            <NavBar />
            <div className={home.flexContainer}>
                <div class={home.weathercard}>
                    <div className={home.align}>
                        <img id={home.weatherimg} src={weatherimg} alt="Weather Icon" class="weather-icon" />
                        <div class={home.temperature}>{weatherData.temp}°C</div>
                    </div>
                    <div class={home.description}>Humidity: {weatherData.humidity}</div>
                    <div class={home.location}>(Indore)</div>
                </div>
            </div>
            <div className={home.mainSection}>
                <div className={home.smallcards}>
                    <div className={home.smallcard}>
                        <img className={home.cardimg} src={blog1} alt="blog11 Image" />
                        <br />
                        <Link className={home.title}>
                            PhonePe strengthens board with former bureaucrat and Walmart executives
                        </Link>
                        <div className={home.paragraph}>
                            <p>
                                Source - YourStory
                            </p>
                        </div>
                        <hr />
                        <div className={home.smallcard}>
                            <img className={home.cardimg} src={blog1} alt="blog11 Image" />
                            <br />
                            <Link className={home.title}>
                                PhonePe strengthens board with former bureaucrat and Walmart executives
                            </Link>
                            <div className={home.paragraph}>
                                <p>
                                    Source - YourStory
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className={home.smallcard}>
                            <img className={home.cardimg} src={blog1} alt="blog11 Image" />
                            <br />
                            <Link className={home.title}>
                                PhonePe strengthens board with former bureaucrat and Walmart executives
                            </Link>
                            <div className={home.paragraph}>
                                <p>
                                    Source - YourStory
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={home.largecards}>
                    <div className={home.largecard}>
                        <img className={home.cardimg} src={blog1} alt="blog11 Image" />
                        <br />
                        <Link className={home.title}>
                            PhonePe strengthens board with former bureaucrat and Walmart executives
                        </Link>
                        <div className={home.paragraph}>
                            <p>
                                The Walmart-owned mobile payments company has appointed former revenue secretary Tarun Bajaj and Walmart's Chief Financial Officer, John D Rainey, and Chief People Officer, Donna Morris to its board.
                            </p>
                        </div>
                        <div className={home.largecard}>
                            <img className={home.cardimg} src={blog1} alt="blog11 Image" />
                            <br />
                            <Link className={home.title}>
                                PhonePe strengthens board with former bureaucrat and Walmart executives
                            </Link>
                            <div className={home.paragraph}>
                                <p>
                                    The Walmart-owned mobile payments company has appointed former revenue secretary Tarun Bajaj and Walmart's Chief Financial Officer, John D Rainey, and Chief People Officer, Donna Morris to its board.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={home.smallcards}>
                    <div className={home.smallcard}>
                        <img className={home.cardimg} src={blog1} alt="blog11 Image" />
                        <br />
                        <Link className={home.title}>
                            PhonePe strengthens board with former bureaucrat and Walmart executives
                        </Link>
                        <div className={home.paragraph}>
                            <p>
                                Source - YourStory
                            </p>
                        </div>
                        <hr />
                        <div className={home.smallcard}>
                            <img className={home.cardimg} src={blog1} alt="blog1 Image" />
                            <br />
                            <Link className={home.title}>
                                PhonePe strengthens board with former bureaucrat and Walmart executives
                            </Link>
                            <div className={home.paragraph}>
                                <p>
                                    Source - YourStory
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className={home.smallcard}>
                            <img className={home.cardimg} src={blog1} alt="blog11 Image" />
                            <br />
                            <Link className={home.title}>
                                PhonePe strengthens board with former bureaucrat and Walmart executives
                            </Link>
                            <div className={home.paragraph}>
                                <p>
                                    Source - YourStory
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={home.spotlight}>
                In SpotLight
            </div>
            <div className={home.spotlightsection}>
                <div className={home.spotlightfirstchild}>
                    <div className={home.col}>
                        <img className={home.colimg} src={blog1} alt="blog1 Image" />
                        <br />
                        <Link className={home.coltitle}>
                            PhonePe strengthens board with former bureaucrat and Walmart executives
                        </Link>
                        <div className={home.colparagraph}>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, magnam architecto natus hic porro aspernatur quos placeat voluptatum!
                            </p>
                        </div>
                    </div>
                    <div className={home.col}>
                        <img className={home.colimg} src={blog1} alt="blog1 Image" />
                        <br />
                        <Link className={home.coltitle}>
                            PhonePe strengthens board with former bureaucrat and Walmart executives
                        </Link>
                        <div className={home.colparagraph}>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, magnam architecto natus hic porro aspernatur quos placeat voluptatum!
                            </p>
                        </div>
                    </div>
                    <div className={home.col}>
                        <img className={home.colimg} src={blog1} alt="blog1 Image" />
                        <br />
                        <Link className={home.coltitle}>
                            PhonePe strengthens board with former bureaucrat and Walmart executives
                        </Link>
                        <div className={home.colparagraph}>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, magnam architecto natus hic porro aspernatur quos placeat voluptatum!
                            </p>
                        </div>
                    </div>
                    <div className={home.col}>
                        <img className={home.colimg} src={blog1} alt="blog1 Image" />
                        <br />
                        <Link className={home.coltitle}>
                            PhonePe strengthens board with former bureaucrat and Walmart executives
                        </Link>
                        <div className={home.colparagraph}>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, magnam architecto natus hic porro aspernatur quos placeat voluptatum!                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={home.footer}>
                <div>&copy;MyStory 2024</div>
            </div>
        </React.Fragment>
    )
}

export default React.memo(HomePage);
