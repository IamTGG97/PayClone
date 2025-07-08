import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',  
});

API.interceptors.request.use((req) => {
const token = localStorage.getItem('token');
if(token){
    req.headers.Authorization = `Bearer ${token}`;
}
return req;
});

//Backend API calls
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);
export const getWalletBalance = () => API.get('/wallet/balance');
export const fundWallet = (paymentData) => API.post('/wallet/fund', paymentData);
export const transferMoney = (transferData) => API.post('/wallet/transfer', transferData);
export const getTransactionHistory = () => API.get('/wallet/history');