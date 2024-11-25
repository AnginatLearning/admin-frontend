import axios from 'axios';
import Swal from "sweetalert2";
import {
    loginConfirmedAction,
    Logout,
} from '../store/actions/AuthActions';
import api from './AxiosInstance';

export function signUp(email, password) {
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };
    return axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=API_KEY`,
        postData,
    );
}

export function login(email, password) {
    const postData = {
        "emailOrUsername": email,
        "password": password,
    };
    return api.post('auth/login', postData);
}
export async  function getInstitutionDetails(){
    const response = await api.get('auth/get-institution');
    console.log(response.data.data)
    localStorage.setItem('InstitutionDetails', JSON.stringify(response.data.data) )
}

export function formatError(errorResponse) {
    switch (errorResponse.message) {
        case 'EMAIL_EXISTS':
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Email already exists',                        
            });
            break;
        case 'EMAIL_NOT_FOUND':
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Email not found',                        
            });
            break;
        case 'Invalid Credentials':
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Invalid Password',                        
            });
            break;
        case 'USER_DISABLED':
            Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'User account is disabled',                        
            });
            break;
        default:
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Invalid credentials',
            });
            break;
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    const currentTime = new Date().getTime();
    localStorage.setItem('loginTimestamp', currentTime);
    localStorage.setItem('accessToken', `Bearer ${tokenDetails.accessToken}`);
}

export function checkTokenExpiry(dispatch, navigate) {
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    if (loginTimestamp) {
        const currentTime = new Date().getTime();
        const timeElapsed = currentTime - loginTimestamp;
        const expiryTime = 24 * 60 * 60 * 1000;

        if (timeElapsed >= expiryTime) {
            dispatch(Logout(navigate)); // Log out if 24 hours have passed
        }
    }
}

export function runLogoutTimer(dispatch, timer, navigate) {
    setTimeout(() => {
        console.log(timer)
        dispatch(Logout(navigate));
    }, timer);
}

export function checkAutoLogin(dispatch, navigate) {
    const tokenDetailsString = localStorage.getItem('accessToken');
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    
    if (!tokenDetailsString || !loginTimestamp) {
        dispatch(Logout(navigate));
        return;
    }

    const expireDate = new Date(parseInt(loginTimestamp) + 24 * 60 * 60 * 1000);
    const currentDate = new Date();

    if (currentDate > expireDate) {
        dispatch(Logout(navigate));
        return;
    }

    // Confirm login and calculate remaining time
    dispatch(loginConfirmedAction(tokenDetailsString));
    const timer = expireDate.getTime() - currentDate.getTime();
    runLogoutTimer(dispatch, timer, navigate);
}
