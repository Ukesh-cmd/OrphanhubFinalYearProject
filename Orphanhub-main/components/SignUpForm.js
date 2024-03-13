// import axios from 'axios';
// //import signUp from '../pages/api/register'
// import React, { useState } from 'react';
// import { createUser } from '../pages/api/auth';
// import { baseURL } from '../util/constant';
// const SignUpForm = ({ onSignUp, onSwitchForm }) => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         address: '',
//         password: '',
//         confirmPassword: ''
//     });
//     const handleChange = (e) => {
//         setFormData({...formData, [e.target.name]: e.target.value });
//     };

//     const handleSignUp = async(e) => {
//         e.preventDefault();
//         if(password != confirmPassword){
//           alert('Password do not match')
//           return;
//         }
//         try {
//             const response = await axios.post(`${baseURL}/user/register `, formData, {
//                 full_name: formData.name, 
//                 email: formData.email,
//                 address: formData.address,
//                 password: formData.password,
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });

//             if (response.status === 200) {
//                 console.log(response.data.message);
//             } else {
//                 console.log("Registration failed");
//             }

//         } catch (error) {
//             if (error.response) {
//                 // The request was made, but the server responded with a non-2xx status code
//                 console.error('Server responded with error status:', error.response.status);
//                 console.error('Error response data:', error.response.data);
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 console.error('No response received:', error.request);
//             } else {
//                 // Something happened in setting up the request that triggered an error
//                 console.error('Error during request setup:', error.message);
//             }
//         }
//     };


//     return ( 
//         <form className="form-group signup" id="signup-form" onSubmit={handleSignUp}>
//         <label htmlFor="name-signup">Name:</label>
//         <input
//           type="text"
//           id="name-signup"
//           name="name"
//           placeholder="Choose a name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
  
//         <label htmlFor="email-signup">Email:</label>
//         <input
//           type="email"
//           id="email-signup"
//           name="email"
//           placeholder="Enter your email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
  
//         <label htmlFor="address-signup">Address:</label>
//         <input
//           type="text"
//           id="address-signup"
//           name="address"
//           placeholder="Enter your address"
//           value={formData.address}
//           onChange={handleChange}
//           required
//         />
  
//         <label htmlFor="password-signup">Password:</label>
//         <input
//           type="password"
//           id="password-signup"
//           name="password"
//           placeholder="Choose a password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
  
//         <label htmlFor="confirm-password-signup">Confirm Password:</label>
//         <input
//           type="password"
//           id="confirm-password-signup"
//           name="confirmPassword"
//           placeholder="Confirm your password"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           required
//         />
  
//         <button type="submit">Register</button>
  
//         <p className="switch-text">
//           Already have an account?{' '}
//           <a href="#" id="switch-link-signup" onClick={onSwitchForm}>
//             Login
//           </a>
//         </p>
//       </form>
//     );
//   };
  
//   export default SignUpForm;




import axios from 'axios';
//import signUp from '../pages/api/register'
import React, { useState } from 'react';
import { createUser } from '../pages/api/auth';
import { baseURL } from '../util/constant';
import { useRouter } from 'next/router';
const SignUpForm = ({ onSignUp, onSwitchForm }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        password: '',
        confirmPassword: ''
    });
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseURL}/user/register `, formData, {
                name: formData.name, // Use formData.username here
                email: formData.email,
                address: formData.address,
                password: formData.password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    // Add other necessary headers here
                }
            });

            if (response.status === 200) {
                console.log(response.data.message);
                //login page redirect code
                
                
            } else {
                console.log("Registration failed");
            }

        } catch (error) {
            if (error.response) {
                // The request was made, but the server responded with a non-2xx status code
                console.error('Server responded with error status:', error.response.status);
                console.error('Error response data:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error during request setup:', error.message);
            }
        }
    };


    return ( 
        <form className = "form-group signup"  id = "signup-form" onSubmit = { handleSignUp } >
            <label For = "name-signup" > Full Name: </label> 
            <input 
                type = "text"
                id = "name-signup"
                name = "name"
                placeholder = "Choose a name"
                value = { formData.name }
                onChange = { handleChange }
            required />

            <label For = "email-signup" > Email: </label> 
            <input 
                type = "email"
                id = "email-signup"
                name = "email"
                placeholder = "Enter your email"
                value = { formData.email }
                onChange = { handleChange }
            required />

            <label For = "address-signup" > Address: </label> 
             <input 
                type = "address"
                id = "address-signup"
                name = "address"
                placeholder = "Enter your address"
                value = { formData.address }
                onChange = { handleChange }
            required />

            <label For = "password-signup" > Password: </label> 
            <input 
                type = "password"
                id = "password-signup"
                name = "password"
                placeholder = "Choose a password"
                value = { formData.password }
                onChange = { handleChange }
                
            required />

            <label htmlFor = "confirm-password-signup" > Confirm Password: </label> 
            <input 
                type = "password"
                id = "confirm-password-signup"
                name = "confirmPassword"
                placeholder = "Confirm your password"
                value = { formData.confirmPassword }
                onChange = { handleChange }
            
            required />

            <button type = "submit" > Register </button>

            <p className = "switch-text" >
                Already have an account ? { " " } 
                <a href = "#" id = "switch-link-signup" onClick = { onSwitchForm } > Login </a> 
            </p > 
        </form> 

    );
};

export default SignUpForm;