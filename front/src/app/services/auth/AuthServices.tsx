import { API_URL } from '@/app/core/constants';
import { AuthResponse, LogInRequest, SignUpRequest } from '@/app/models/auth/AuthModels';
import axios from 'axios';


export function signUp(request: SignUpRequest) :void {
    var url :string = API_URL + "/creer-compte";
    axios.post(url,request, {
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        },
    })
    .then(({data}) => {
        console.log(data);
        handleToken(data)
    });
} 

export function login(request: LogInRequest) :void {
    var url :string = API_URL + "/login";
    axios.post(url,request, {
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        },
    })
    .then(({data}) => {
        console.log(data);
        handleToken(data);
    });
} 


function handleToken(data :AuthResponse){

}