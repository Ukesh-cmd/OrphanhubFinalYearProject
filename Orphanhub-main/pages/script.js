
export function formatRevalidate(){
    document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
  
    if (loginForm) {
      loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        validateLoginForm();
      });
    }
  
    if (signupForm) {
      signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        validateSignupForm();
      });
    }
  
    function validateLoginForm() {
      const username = document.getElementById("username-login").value;
      const password = document.getElementById("password-login").value;
  
      if (username.trim() === "" || password.trim() === "") {
        alert("Username and password are required");
      } else {
    
        loginForm.submit();
      }
    }
  
    function validateSignupForm() {
      const UserName = document.getElementById("username-signup").value;
     
      const email = document.getElementById("email-signup").value;
      const password = document.getElementById("password-signup").value;
      const confirmPassword = document.getElementById("confirm-password-signup").value;
  
      if (
        UserName.trim() === "" ||
        email.trim() === "" ||
        password.trim() === "" ||
        confirmPassword.trim() === ""
      ) {
        alert("All fields are required");
      } else if (password !== confirmPassword) {
        alert("Passwords do not match");
      } else {
      
        signupForm.submit();
      }
    }
  });
  
}
