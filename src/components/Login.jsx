import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from '../assets/css/SignUp.module.css'
import NavBar from './NavBar'
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../DataBase/firebaseDB';
import { isLoggedIn } from '../features/IsLoggedIn'

function Login() {

  const navigate = useNavigate();
  const loginData = useSelector(((state) => state.signupReducer.formData));
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password : ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password : '',
  });



  useEffect(() => {
    const validateForm = () => {

      let isValid = true;
      console.log("Validate Form Called")

      if (!formData.email.trim()) {
        setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
        console.log("email wrong")
        isValid = false;
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
      }

      if (!formData.password.trim()) {
        setErrors((prevErrors) => ({ ...prevErrors, password: 'password is required' }));
        isValid = false;
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
        setErrors((prevErrors) => ({ ...prevErrors, password: 'Invalid password' }));
        console.log("password wrong")
        isValid = false;
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
      }

      return isValid;
    };

    validateForm();
    console.log(formData)
    console.log(errors)
  }, [formData.email, formData.password])


  const handleSubmit = (e) => {
    e.preventDefault();
    var valid = true;
    for (let item in errors) {
      // console.log(errors[item])
      if (errors[item] !== '') {
        valid = false;
      }
    }
    if (valid) {

      signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(isLoggedIn(user.uid));
        navigate('/News');
      })
      .catch((error) => {
        console.log(error.message)
      });
      navigate('/News')
    }
  }

  return (
    <React.Fragment>

      <NavBar />

      <div className={styles.loginform}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
          <input type="email" id='email' name='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder='Email' required/>
          {formData.email == '' ? errors.email && <small className={styles.error}>{errors.email}</small> : <small className={styles.error}>{errors.email}</small>}

          <label htmlFor="password">Password:</label>
          <input type="password" id='password' name='password' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder='Password' required/>
          {formData.password == '' ? errors.password && <small className={styles.error}>{errors.password}</small> : <small className={styles.error}>{errors.password}</small>}
          <button type='submit' className='submitbtn' style={{ marginTop: "20px" }}>Submit</button>
        </form>
      </div>
      </div>
    </React.Fragment>
  )
}

export default Login
