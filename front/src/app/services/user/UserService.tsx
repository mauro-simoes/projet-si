import { API_URL } from '@/app/core/constants';
import { APIResponseModel } from '@/app/models/ApiResponseModel';
import { AdminPasswordChangeRequest, PasswordChangeRequest, User } from '@/app/models/user/UserModels';
import axios from 'axios';


export async function getUserInfo(token: string) :Promise<APIResponseModel<User>> {
    var url :string = API_URL + "/user/get";
    return axios.get(url,{
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${token}`
        },
    })
} 

export async function getAllUsers(token: string) :Promise<APIResponseModel<User[]>> {
    var url :string = API_URL + "/user/get-all";
    return axios.get(url,{
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${token}`
        },
    })
} 

export async function updateUserProfile(user: User, token: string) :Promise<APIResponseModel<boolean>> {
    var url :string = API_URL + "/user/mise-a-jour";
    return axios.put(url,user, {
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${token}`
        },
    })
} 

export async function updateUserPassword(request: PasswordChangeRequest, token: string) :Promise<APIResponseModel<boolean>> {
    var url :string = API_URL + "/user/reinitialiser-mot-de-passe";
    return axios.post(url,request, {
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${token}`
        },
    })
} 


export async function approveUserAccount(userId: number, token: string) :Promise<APIResponseModel<boolean>>{
    var url :string = API_URL + "/user/valider-compte/" + userId;
    return axios.post(url,null, {
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${token}`
        },
    })
} 

export async function suspendUserAccount(userId: number, token: string) :Promise<APIResponseModel<boolean>>{
    var url :string = API_URL + "/user/radier-compte/" + userId;
    return axios.post(url,null, {
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${token}`
        },
    })
} 


export async function changeUserPasswordAsAdmin(request: AdminPasswordChangeRequest, token: string) :Promise<APIResponseModel<boolean>>{
    var url :string = API_URL + "/user/reinitialiser-mot-de-passe-user";
    return axios.post(url,request, {
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${token}`
        },
    })
} 
