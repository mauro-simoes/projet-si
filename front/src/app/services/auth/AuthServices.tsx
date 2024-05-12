import { API_URL } from '@/app/core/constants';
import { authenticationMockData } from '@/app/core/mockData';
import { AuthResponse, LogInRequest, SignUpRequest } from '@/app/models/auth/AuthModels';
import axios from 'axios';


export async function signUp(request: SignUpRequest) :Promise<AuthResponse> {
    var url :string = API_URL + "/creer-compte";
    // return new Promise((resolve, reject) => {
    //     return authenticationMockData;
    // });
    return new Promise<AuthResponse>((resolve, reject) => {
        setTimeout( () => {
            resolve(authenticationMockData);
        }, 1500);
    });
    // return axios.post(url,request, {
    //     headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "application/json;charset=UTF-8",
    //     },
    // })
} 

export async function logIn(request: LogInRequest) :Promise<AuthResponse> {
    var url :string = API_URL + "/login";
    return new Promise<AuthResponse>((resolve, reject) => {
        setTimeout( () => {
            resolve(authenticationMockData);
        }, 1500);
    });
    // return axios.post(url,request, {
    //     headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "application/json;charset=UTF-8",
    //     },
    // })
} 