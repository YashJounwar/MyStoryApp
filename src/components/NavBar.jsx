import React, { useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import useActiveStyle from '../customHooks/useActiveStyle'
import home from '../assets/css/HomePage.module.css'
import logo from '../assets/images/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../DataBase/firebaseDB'
import { isLoggedOut } from '../features/IsLoggedIn'

function NavBar() {

    const [activeStyle] = useActiveStyle(); // custom hook


    const dispatch = useDispatch();
    //isLoggedIn state
    const loggedInState = useSelector((state) => state.loggedInReducer.isLoggedIn)
    console.log("LoggedIn State in NavBar:", loggedInState)

    return (
        <React.Fragment>
            <nav className={home.navbar}>
                <Link to='/'><img className={home.logo} src={logo} alt="logo" /></Link>
                <ul className={home.list1}>
                    <NavLink style={activeStyle} to='/'>Home</NavLink>
                    {loggedInState 
                    ? <NavLink style={activeStyle} to='/News'>News</NavLink>
                    : <NavLink style={activeStyle} to='/SignUp'>News</NavLink>
                    }
                    {loggedInState 
                    ? <NavLink style={activeStyle} to='/Stories'>Stories</NavLink>
                    : <NavLink style={activeStyle} to='/SignUp'>Stories</NavLink>
                    }
                    {loggedInState 
                    ? <NavLink style={activeStyle} to='/MyStories'>MyStories</NavLink>
                    : <NavLink style={activeStyle} to='/SignUp'>MyStories</NavLink>
                    }
                    
                </ul>
                {!loggedInState ? (
                    <ul className={home.list2}>
                        <NavLink style={activeStyle} to='/Login'>Login</NavLink>
                        <NavLink style={activeStyle} to='/SignUp'>SignUp</NavLink>
                    </ul>
                ) : (<ul className={home.list2}>
                    <NavLink style={activeStyle} onClick={() => dispatch(isLoggedOut(auth.currentUser.uid))} to='/'>SignOut</NavLink>
                </ul>)}
            </nav>
        </React.Fragment>
    )
}

export default NavBar
