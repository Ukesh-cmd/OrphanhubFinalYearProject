import React, { useState } from 'react';
import LoginForm from './LoginForm';
import AdminPage from './AdminPage';

const Main = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (username, password) => {
    // Check credentials (replace with your actual logic)
    if (username === 'admin' && password === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  return (
    <div>
      {isAdmin ? (
        <AdminPage />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Main;

/*
export function showLoginForm() {
    const loginForm = document.querySelector('.form-group.login');
    const signupForm = document.querySelector('.form-group.signup');
    const switchLink = document.getElementById('switch-link');
    const switchLinkSignup = document.getElementById('switch-link-signup');
    const mainPage = document.getElementById('main-page');
    const Events = document.getElementsByClassName('Events');

    signupForm.style.display = 'none';
    mainPage.style.display = 'none';
    Events.display = 'none';

    switchLink.addEventListener('click', () => {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    switchLinkSignup.addEventListener('click', () => {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        mainPage.style.display = 'none';
    });

    document.getElementById('login-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username-login').value;
        const password = document.getElementById('password-login').value;

        if (username === 'admin' && password === 'admin') {
            document.querySelector('.admin-page').style.display = 'block';
            document.querySelector('.login').style.display = 'none';
            document.querySelector('.logo').style.display = 'none';
            document.querySelector('.statement').style.display = 'none';
            document.querySelector('.container').style.display = 'none';
            document.getElementsByClassName('Events').display = 'block';
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });

    document.getElementById('switch-link').addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('.form-group.login').classList.toggle('active');
        document.querySelector('.form-group.signup').classList.toggle('active');
    });

    document.getElementById('switch-link-signup').addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('signup-form').classList.toggle('active');
        document.getElementById('login-form').classList.toggle('active');
    });

    let j = 0;
    document.getElementById('profile-container').addEventListener('click', () => {
        j % 2 === 0 ? (j++, document.getElementById('profile-menu').style.display = 'block') : (document.getElementById('profile-menu').style.display = 'none', j++);
    });

    document.addEventListener('DOMContentLoaded', () => {
        pastEvent.style.display = 'none';

        document.querySelector('.event-section').addEventListener('click', (event) => {
            const targetClass = event.target.className;

            if (targetClass.includes('upcoming')) {
                document.querySelectorAll('.event:not(.past-event)').forEach((event) => {
                    event.style.display = 'block';
                    pastEvent.style.display = 'none';
                });

                document.querySelectorAll('.past-event').forEach((pastEvent) => {
                    pastEvent.style.display = 'none';
                    event.style.display = 'block';
                });
            } else if (targetClass.includes('past')) {
                document.querySelectorAll('.past-event').forEach((pastEvent) => {
                    pastEvent.style.display = 'block';
                    event.style.display = 'none';
                });

                document.querySelectorAll('.event:not(.past-event)').forEach((event) => {
                    event.style.display = 'none';
                    pastEvent.style.display = 'block';
                });
            }
        });
    });

    document.getElementById('logout-link').addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('main-page').style.display = 'none';
        document.querySelector('.login').style.display = 'block';
        document.querySelector('.logo').style.display = 'block';
        document.querySelector('.statement').style.display = 'block';
        document.querySelector('.container').style.display = 'block';
        document.getElementById('profile-menu').style.display = 'none';

        const signupForm = document.querySelector('.form-group.signup');
        if (signupForm.classList.contains('active')) {
            signupForm.classList.remove('active');
        }
    });
}


export function updateChildDetails(name, age, gender, healthConditions, personality, picture) {
  // Logic to update child details using the provided parameters...
  // our logic to update child details goes here
    
  const updatedChild = {
    name: name,
    age: age,
    gender: gender,
    healthConditions: healthConditions,
    Personality: personality,
    Picture:picture,
};

document.addEventListener('DOMContentLoaded', function () {
// Existing code...
const addRowButton = document.getElementById('addRowBtn');
addRowButton.addEventListener('click', function () {
    modal.style.display = 'block';
    // Show the modal or add your logic to add a new row
    // ...
});

// Additional code for saving new child data
const saveButton = document.getElementById('save-child-button');

saveButton.addEventListener('click', function () {
    // Call a function to save the new child data
    saveNewChild();
  
});
})
}
*/


