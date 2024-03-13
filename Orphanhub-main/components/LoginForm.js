import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../util/constant';
const LoginForm = ({ onLogin, onSwitchForm }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('')
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async(e) => {
        e.preventDefault();
        // const isAdmin = username === 'admin' && password === 'admin';
        // if (isAdmin) {
        //     console.log('Admin login successful');
        // } else {
        //     onLogin(username, password);
        // }
        try {
            const response = await axios.post(`${baseURL}/login `, formData, {

                email: formData.email,
                password: formData.password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    // Add other necessary headers here
                }
            });

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token);

                const isAdmin = response.data.role; // Assuming the server sends isAdmin flag
                onLogin(formData.email, formData.password, isAdmin);
            } else {
                setErrorMessage('Invalid Email or Password')
            }

        } catch (error) {
            if (error.response) {
                // The request was made, but the server responded with a non-2xx status code
                setErrorMessage('Invalid Email or Password')
            } else if (error.request) {
                // The request was made but no response was received
                setErrorMessage('An unexpected error')
            } else {
                // Something happened in setting up the request that triggered an error
                setErrorMessage('An unexpected error')
            }
        }
        // const handleLogin = async(e) => {
        //     e.preventDefault();
        //     try {
        //         const response = await axios.post(`${baseURL}/admin/login `, {
        //             email: formData.email,
        //             password: formData.password,
        //         });

        //         if (response.status === 200) {
        //             const isAdmin = response.data.isAdmin; // Assuming the server sends isAdmin flag
        //             onLogin(formData.email, formData.password, isAdmin); // Pass isAdmin to onLogin
        //         } else {
        //             console.log('Login failed');
        //         }
        //     } catch (error) {
        //         console.error('Error during login:', error);
        //     }
        // };
    };

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            console.log("User loged in");
            axios.get(`${baseURL}/user/get-user `,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(response =>{
                const isAdmin = response.data.isAdmin; // Assuming the server sends isAdmin flag
                onLogin(formData.email, formData.password, isAdmin);
            
            })
            .catch(error => {
                console.log("error fethcing");
            })
        }
    });
    
    return ( <form className="form-group login" id="login-form" onSubmit={handleLogin}>
    <label htmlFor="email-login">Email:</label>
    <input
        type="email"
        id="email-login"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
    />

    <label htmlFor="password-login">Password:</label>
    <input
        type="password"
        id="password-login"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
    />
    {errorMessage && <p style={{color:'red'}}>{errorMessage}</p>}

    <button type="submit">Login</button>

    <p>
        Don't have an account? <a href="#" id="switch-link" onClick={onSwitchForm}>Register</a>
    </p>
  
</form>
);
};

export default LoginForm;