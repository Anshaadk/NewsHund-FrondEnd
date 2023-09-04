import axios from 'axios';

const baseURL=import.meta.env.VITE_SOME_KEY
console.log(baseURL)
const axiosInstance = axios.create({
  baseURL: baseURL,
  

  
  
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'multipart/form-data', // Set the correct content type
//     Authorization: `Bearer ${localStorage.getItem('token')}`, // Include your authorization token if needed
//   },
});

export default axiosInstance;
