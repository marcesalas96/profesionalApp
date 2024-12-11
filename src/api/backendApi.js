import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backendApi = axios.create({
  withCredentials: true,
  // baseURL: 'https://test.projectsdm.com/api',
  productionUrl: 'https://api.profesional-remis.com/api'
});


backendApi.interceptors.request.use(async (config) => {

  config.headers = {
    ...config.headers,
    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
    'Accept': 'application/json',
    'User-Agent': 'Android'
  };
  return config;
});

export default backendApi;