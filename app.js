// import functions and grab DOM elements

import { signUp, logIn, getUser } from './fetch-utils.js';

const logInForm = document.querySelector('#log-in-form');
const signUpForm = document.querySelector('#sign-up-form');

// let state

//CHECKS IF USER IS LOGGED IN AND IF SO REDIRECTS TO POLLS PAGE
redirectIfLoggedIn();

// set event listeners 
  // get user input
  // use user input to update state 
  // update DOM to reflect the new state

// SIGN UP
signUpForm.addEventListener('submit', async(e) => {
    // - prevent default behavior
    e.preventDefault();

    //   - get the username and password from the form (`new FormData(form)`)
    const signUpData = new FormData(signUpForm);
    const email = signUpData.get('email');
    const password = signUpData.get('password');

    //   - "sign up the user"
    const user = await signUp(email, password);

    // - redirect the user to the protected page with their data
    if (user) {
        //     - re-direct
        window.location.href = './polls';
    } else {
        console.error(user);
        alert('Sorry there was an error. Make sure your email is formatted name@domain.com and your password is a least 6 characters');
    }
});


// LOG IN
logInForm.addEventListener('submit', async(e) => {
    //   - prevent default behavior
    e.preventDefault();
    //   - get the username and password from the form (`new FormData(form)`)
    const logInData = new FormData(logInForm);
    const email = logInData.get('email');
    const password = logInData.get('password');

    //   - "log in the user" - make a function using .signIn and pass username and password
    const user = await logIn(email, password);

    // - redirect the user to the protected page with their data
    if (user) {
        //     - re-direct
        window.location.href = './polls';
    } else {
        console.error(user);
        alert('that email or password is wrong or doesn\'t exist');
    }
});

async function redirectIfLoggedIn(){
    const user = await getUser();
    if (user) {
        window.location.href = './polls';
    }
    
}