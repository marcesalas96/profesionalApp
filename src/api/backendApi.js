import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backendApi = axios.create({
  //baseURL: 'http://127.0.0.1:8000/api',
  baseURL: 'https://api.profesional-remis.com/api'
});


backendApi.interceptors.request.use(async (config) => {

  config.headers = {
    ...config.headers,
    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
    'Accept': 'application/json',
  };
  return config;
});

export default backendApi;