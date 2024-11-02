// api.js
import axios from 'axios';

// const API_BASE_URL = 'https://your-api-url.com'; // Replace with your API base URL

export const sendOtpOnEmail = async (email) => {
  try {
    const response = await axios.post(`https://back-end.anginat.com/api/otp/generate`, { 
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
      const response = await axios.post(`https://back-end.anginat.com/api/otp/verify`, { 
          "otp": otp,     
          "otpType": "email"
      });
      return response.data; // Return the response data or whatever you need
    } catch (error) {
      throw new Error('Failed to send OTP: ' + error.message);
    }
  };