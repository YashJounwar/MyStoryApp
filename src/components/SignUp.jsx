import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../assets/css/SignUp.module.css'
import NavBar from './NavBar'
import { auth } from '../DataBase/firebaseDB'
import { refe, sett, db } from '../DataBase/firebaseDB'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_FORM_DATA, VALIDATE_FORM } from '../features/SignupSlice'
import { isLoggedIn } from '../features/IsLoggedIn'


function SignUp() {

  const navigate = useNavigate();

  //isLoggedIn state
  const loggedInState = useSelector((state) => state.loggedInReducer.isLoggedIn)
  
  console.log("LoggedIn State in SigupPage:", loggedInState)
  const formData = useSelector(((state) => state.signupReducer.formData));
  const errors = useSelector(((state) => state.signupReducer.errors));
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(formData)
    console.log(errors)
  }, [formData, errors, loggedInState])

  const handleChange = (e) => {

    const { name, value } = e.target;
    // Update form data with the new value
    const newFormData = { ...formData, [name]: value };
    // Dispatch action to update form data
    dispatch(UPDATE_FORM_DATA(newFormData));
    // Dispatch action to validate the form
    dispatch(VALIDATE_FORM());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(VALIDATE_FORM());
    console.log("IsValid_---------", formData.isValid)
    if (formData.isValid) {


      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          sendEmailVerification(user);


          //this intervals runs after every one seconds and when the emailVerified returns true then it ends
          const IntervalId = setInterval(() => {
            console.log(user.emailVerified);
            if (user.emailVerified) {
              // if the email is verified then add the record in the database
              sett(refe(db, "/Users/user-" + user.uid), {
                uid: user.uid,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                gender: formData.gender,
                phoneNumber: formData.phoneNumber,
                role: formData.role,
                isValid: formData.isValid,
              })
                .then(() => {
                  dispatch(isLoggedIn(user.uid))
                  navigate('/News');
                  console.log(`${user.username} is signed up successfully`);
                })
                .catch((error) => {
                  console.log(error.message + "error occurred");
                });
              clearInterval(IntervalId);
            }
            user.reload();
          }, 1000);

        })
        .catch((error) => {
          if (error) {
            alert("email is already in use")
          }
        })


    }
  }

  const handleMale = (e) => {

    if (e.target.checked) {
      dispatch(UPDATE_FORM_DATA({ ...formData, gender: 'Male' }))
    }
    dispatch(VALIDATE_FORM());
  }

  const handleFemale = (e) => {

    if (e.target.checked) {
      dispatch(UPDATE_FORM_DATA({ ...formData, gender: 'Female' }))
    }
    dispatch(VALIDATE_FORM());
  }


  return (
    <React.Fragment>
      <NavBar />

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <h1 style={{ textAlign: "center" }}>SignUp Form</h1>
          <label htmlFor="name" id='username'>Name:</label>
          <input type="text" id="name" name='username' focus value={formData.username} onChange={handleChange} placeholder='Name' required />
          {formData.username == '' ? errors.username && <small className={styles.error}>{errors.username}</small> : <small className={styles.error}>{errors.username}</small>}

          <label htmlFor="email">Email:</label>
          <input type="email" id='email' name='email' value={formData.email} onChange={handleChange} placeholder='Email' required />
          {formData.email == '' ? errors.email && <small className={styles.error}>{errors.email}</small> : <small className={styles.error}>{errors.email}</small>}

          <label htmlFor="password">Password:</label>
          <input type="password" id='password' name='password' value={formData.password} onChange={handleChange} placeholder='Password' required />
          {formData.password == '' ? errors.password && <small className={styles.error}>{errors.password}</small> : <small className={styles.error}>{errors.password}</small>}


          <label htmlFor="gender">Gender:
            <input type="radio" name='gender' className={styles.Gender} onChange={handleMale} value={formData.gender} required />Male
            <input type="radio" name='gender' className={styles.Gender} onChange={handleFemale} value={formData.gender} required />Female
          </label>
          {formData.gender == '' ? errors.gender && <small className={styles.error}>{errors.gender}</small> : <small className={styles.error}>{errors.gender}</small>}

          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            pattern="[7-9]{1}[0-9]{9}"
            placeholder="Enter mobile number"
            required />
          {formData.phoneNumber == '' ? errors.phoneNumber && <small className={styles.error}>{errors.phoneNumber}</small> : <small className={styles.error}>{errors.phoneNumber}</small>}

          <label htmlFor="selectRole">Role:</label>
          <select name="role" id="selectRole" onChange={handleChange} value={formData.role} required>
            <option value="FrontEnd" className='radio'>Frontend Developer</option>
            <option value="Backend" className='radio'>Backend Developer</option>
          </select>
          <button type='submit' className='submitbtn' style={{ marginTop: "20px" }}>Submit</button>
        </form>
      </div>
    </React.Fragment>
  )

}
export default SignUp
