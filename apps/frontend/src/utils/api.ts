import axios, {Method, AxiosRequestHeaders} from 'axios';
import { useRouter } from 'next/router';


const apiUrl = 'http://127.0.0.1:8000/';

const instance = axios.create(); // create a new instance so we dont mess with the global one
instance.defaults.baseURL = apiUrl;

export default function requestApi(endpoint: string, method: string, headers?: object, data?: object){
    return instance({
        method: method as Method,
        url: endpoint,
        data: data,
        headers: headers as AxiosRequestHeaders
      });
};
