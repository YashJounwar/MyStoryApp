import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formData: {
        username: '',
        email: '',
        password: '',
        gender: '',
        phoneNumber: '',
        role: 'Frontend Developer',
        isValid: false
    },
    errors: {
        username: 'Name is required',
        email: 'Email is required',
        password: 'Password is required',
        gender: 'Gender is required',
        phoneNumber: 'PhoneNumber is required',
    },
};

const formSlice = createSlice({
    name: 'formSlice',
    initialState,
    reducers: {
        UPDATE_FORM_DATA: (state, action) => {
            state.formData = action.payload
        },
        VALIDATE_FORM: (state) => {

            let formData = state.formData;
            let errors = state.errors;
            // console.log("validate action :", formData)
            // console.log("Validate Form Called")
            // console.log(formData.email);
            // console.log(errors.email);
            if (!formData.username.trim()) {
                state.errors.username = 'Name is required';
                state.formData.isValid = false;
            }
            else {
                state.errors.username = '';
            }

            if (!formData.email.trim()) {
                state.errors.email = 'Email is required';
                state.formData.isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                state.errors.email = 'Invalid email address';
                console.log("email wrong")
                state.formData.isValid = false;
            } else {
                state.errors.email = '';
            }

            if (!formData.password.trim()) {
                state.errors.password = 'Password is required';
                state.formData.isValid = false;
            } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
                state.errors.password = 'Invalid Password';
                console.log("password wrong")
                state.formData.isValid = false;
            } else {
                state.errors.password = '';
            }

            if (!formData.gender.trim()) {
                state.errors.gender = 'Gender is required';
                state.formData.isValid = false;
            } else {
                state.errors.gender = '';

            }

            if (!formData.phoneNumber.trim()) {
                state.errors.phoneNumber = 'PhoneNumber is required';
                state.formData.isValid = false;
            } else if (!/^[7-9]\d{9}$/.test(formData.phoneNumber)) {
                state.errors.phoneNumber = 'Invalid PhoneNumber';
                state.formData.isValid = false;
            } else {
                state.errors.phoneNumber = '';
            }

            if (state.errors.email === '' && state.errors.phoneNumber === '' && state.errors.gender === '' && state.errors.username === '' && state.errors.password === '') {
                state.formData.isValid = true;
                console.log(state.formData.isValid);
            }
        }
    }
})


export const signupReducer = formSlice.reducer;
export const { UPDATE_FORM_DATA, VALIDATE_FORM } = formSlice.actions;