// // src/components/MainPage.js
// import React, { useEffect, useState } from 'react';
// import UserPage from './UserPage';
// import AdminPage from './AdminPage';
// import { formatRevalidate } from './script';
// import LoginForm from '../components/LoginForm';
// import SignUpForm from '../components/SignupForm';



// const MainPage = () => {
//     const [isLoginFormVisible, setLoginFormVisible] = useState(true);
//     const [isAdmin, setIsAdmin] = useState(false);

//     const handleLogin = (username, password) => {

//         const isAdminUser = username === 'admin' && password === 'admin';

//         if (isAdminUser) {
//             setIsAdmin(true);
//         } else {
//             setIsAdmin(false);
//         }
//     };





//     const toggleFormVisibility = () => {
//         setLoginFormVisible((prevVisibility) => !prevVisibility);
//     };

//     return ( <
//         div className = "maincontainer" >
//         <
//         div className = "logo" >
//         <
//         img src = "orphanage_logo.png"
//         alt = "OrphanageHub Logo" / >
//         <
//         h1 > OrphanHub < /h1> < /
//         div >

//         <
//         div className = "statement" >
//         <
//         p >
//         <
//         br / >
//         "Transforming Lives, One Click at a Time:<br />
//         OrphanHub, Impacting Futures.
//         " < /
//         p > <
//         br / >
//         <
//         div className = "bpic" >
//         <
//         img src = "childorp1.jpg"
//         alt = "Child Orphanage" / >
//         <
//         /div> < /
//         div > <
//         br / >

//         <
//         div className = "container" > {
//             isLoginFormVisible ? ( <
//                 LoginForm onLogin = { handleLogin }
//                 onSwitchForm = { toggleFormVisibility }
//                 />
//             ) : ( <
//                 SignUpForm onSignUp = { handleSignUp }
//                 onSwitchForm = { toggleFormVisibility }
//                 />
//             )
//         } <
//         /div>

//         <
//         div className = "main-page"
//         id = "main-page" > { isAdmin ? < AdminPage / > : < UserPage / > } <
//         /div> < /
//         div >
//     );
// };

// export default MainPage;

import React, { useState,useEffect } from 'react';
import UserPage from './UserPage';
import AdminPage from './AdminPage';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignupForm';

const MainPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginFormVisible, setLoginFormVisible] = useState(true);

  const handleLogin = async (email, password, isAdmin) => {
    setIsAdmin(isAdmin === 'admin');
    setIsLoggedIn(true);
    setLoginFormVisible(false);
   
  };
  const [sparkles, setSparkles] = useState([]);
  
  useEffect(() => {
    const createSparkle = (_, index) => {
      // Generate a random color in hexadecimal format
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        right: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 100}%`,
        color: randomColor,
      };
    
    };

    const newSparkles = Array.from({ length: 19 }, createSparkle);
    setSparkles(newSparkles);
  }, []); 
  const handleSignUp = (username, email, password) => {
    // Your signup logic goes here
    console.log('Signing up:', username, email, password);
    // Additional signup logic if needed
  };

  const toggleFormVisibility = () => {
    setLoginFormVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <div className="maincontainer">
      {isLoggedIn ? (
        isAdmin ? (
          <div className="main-page" id="main-page">
            <AdminPage />
          </div>
          
        ) : (
          <div className="main-page" id="main-page">
            <UserPage />
          </div>
        )
      ) : (
        <div>
            <div className="sparkles-container">
              {sparkles.map((sparkle, index) => (
                <div
                  key={index}
                  className="sparkle"
                  style={{ right:sparkle.right, left: sparkle.left, top: sparkle.top ,bottom:sparkle.top}}
                ></div>
              ))}
            </div>
          <div className="logo">
            <img src="orphanage_logo.png" alt="OrphanageHub Logo" />
            <h1>OrphanHub</h1>
          </div>
          <div className="statement">
            <p>
              <br />
              "Transforming Lives, One Click at a Time:<br />
              OrphanHub, Impacting Futures."
            </p>
            <br />
            <div className="bpic">
              <img src="childorp1.jpg" alt="Child Orphanage" />
            </div>
          </div>
          <div className="container">
            {isLoginFormVisible ? (
              <LoginForm onLogin={handleLogin} onSwitchForm={toggleFormVisibility} />
            ) : (
              <SignUpForm onSignUp={handleSignUp} onSwitchForm={toggleFormVisibility} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
