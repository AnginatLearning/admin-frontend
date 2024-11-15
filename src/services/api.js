// api.js
import axios from 'axios';
import api from './AxiosInstance';

// const API_BASE_URL = 'https://your-api-url.com'; // Replace with your API base URL

export const sendOtpOnEmail = async (email) => {
  try {
    const response = await api.post(`otp/generate`, { 
        "receiverId": email,     
        "otpType": "email"
    });
    return response.data; // Return the response data or whatever you need
  } catch (error) {
    throw new Error('Failed to send OTP: ' + error.message);
  }
};

export const verifyOtpOnEmail = async (otp,email) => {
    try {
      const response = await api.post(`otp/verify`, { 
          "otp": otp,     
          "otpType": "email",
          "receiverId": email,
      });
      return response.data; // Return the response data or whatever you need
    } catch (error)
     {
      console.error(error)
      throw new Error('Failed to send OTP: ' + error.message);
    }
  };