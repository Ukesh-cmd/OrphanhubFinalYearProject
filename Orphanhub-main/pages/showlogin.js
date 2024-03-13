import React, { useState } from 'react';
import AdminPage from './AdminPage';
import UserPage from './UserPage';

export function ShowLogin() {
  

    document.getElementById('login-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username-login').value;
        const password = document.getElementById('password-login').value;

        if (username === 'admin' && password === 'admin') {
         
            const isAdmin = true;

            setShowAdminPage(isAdmin);

            // Hide the login form
            document.querySelector('.login').style.display = 'none';
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });
}

