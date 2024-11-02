import axios from 'axios';
// import swal from "sweetalert";
import Swal from "sweetalert2";
import {
    loginConfirmedAction,
    Logout,
} from '../store/actions/AuthActions';

export function signUp(email, password) {
    //axios call
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };
    return axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
        postData,
    );
}

export function login(email, password) {
    const postData = {
        "emailOrUsername": email,
        "password": password,
        // returnSecureToken: true,
    };
    return axios.post(
        `http://88.222.212.252:3001/api/auth/login`, postData
    );
}

export function formatError(errorResponse) {
    switch (errorResponse.message) {
        case 'EMAIL_EXISTS':
            //return 'Email already exists';
            // swal("Oops", "Email already exists", "error");
              Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Email already exists',                        
              })
            break;
        case 'EMAIL_NOT_FOUND':
             Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Email not found',                        
              })
            //return 'Email not found';
                //swal("Oops", "Email not found", "error",{ button: "Try Again!",});
           break;
        case 'Invalid Credentials':
            //return 'Invalid Password';
            // swal("Oops", "Invalid Password", "error",{ button: "Try Again!",});
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Invalid Password',                        
            })
            break;
        case 'USER_DISABLED':
            return 'User Disabled';

        default:
            return '';
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    // Optional: Calculate and store token expiration date
    // tokenDetails.expireDate = new Date(
    //     new Date().getTime() + tokenDetails.expiresIn * 1000
    // );

    // Store the token in local storage
    localStorage.setItem('accessToken', `Bearer ${tokenDetails.accessToken}`);
}


export function runLogoutTimer(dispatch, timer, navigate) {
    setTimeout(() => {
        dispatch(Logout(history));
        dispatch(Logout(navigate));
    }, timer);
}

export function checkAutoLogin(dispatch, navigate) {
    const tokenDetailsString = localStorage.getItem('accessToken');
    // let tokenDetails = '';
    // if (!tokenDetailsString) {
    //     dispatch(Logout(navigate));
	// 	return;
    // }

    // tokenDetails = JSON.parse(tokenDetailsString);
    // let expireDate = new Date(tokenDetails.expireDate);
    // let todaysDate = new Date();

    // if (todaysDate > expireDate) {
    //     dispatch(Logout(navigate));
    //     return;
    // }
		if(tokenDetailsString){
            dispatch(loginConfirmedAction(tokenDetailsString));
        }
    
	
    // const timer = expireDate.getTime() - todaysDate.getTime();
    // runLogoutTimer(dispatch, timer, navigate);
}
