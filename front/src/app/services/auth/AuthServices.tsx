import { API_URL } from '@/app/core/constants';
import { AuthResponse, LogInRequest, SignUpRequest } from '@/app/models/auth/AuthModels';
import axios from 'axios';


export async function signUp(request: SignUpRequest) :Promise<AuthResponse> {
    var url :string = API_URL + "/creer-compte";
    return axios.post(url,request, {
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        },
    })
} 

export async function login(request: LogInRequest) :Promise<AuthResponse> {
    var url :string = API_URL + "/login";
    return axios.post(url,request, {
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        },
    })
} 