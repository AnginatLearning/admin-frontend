// api.js
import axios from 'axios';

// const API_BASE_URL = 'https://your-api-url.com'; // Replace with your API base URL

export const sendOtpOnEmail = async (email) => {
  try {
    const response = await axios.post(`http://88.222.212.252:3001/api/otp/generate`, { 
        "email": email,     
        "otpType": "email"
    });
    return response.data; // Return the response data or whatever you need
  } catch (error) {
    throw new Error('Failed to send OTP: ' + error.message);
  }
};

export const verifyOtpOnEmail = async (otp) => {
    try {
      const response = await axios.post(`http://88.222.212.252:3001/api/otp/verify`, { 
          "otp": otp,     
          "otpType": "email"
      });
      return response.data; // Return the response data or whatever you need
    } catch (error) {
      throw new Error('Failed to send OTP: ' + error.message);
    }
  };