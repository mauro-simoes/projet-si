import { API_URL } from '@/app/core/constants';
import { allUsersMockData, userMockData } from '@/app/core/mockData';
import { AdminPasswordChangeRequest, PasswordChangeRequest, User } from '@/app/models/user/UserModels';
import axios from 'axios';


export async function getUserInfo(token: string) :Promise<User> {
    var url :string = API_URL + "/user";
    return new Promise<User>((resolve, reject) => {
        setTimeout( () => {
            resolve(userMockData);
        }, 1500);
    });
    // return axios.get(url,{
    //     headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "application/json;charset=UTF-8",
    //       "Authorization": `Bearer ${token}`
    //     },
    // })
} 

export async function getAllUsers(token: string) :Promise<User[]> {
    var url :string = API_URL + "/user";
    return new Promise<User[]>((resolve, reject) => {
        setTimeout( () => {
            resolve(allUsersMockData);
        }, 1500);
    });
    // return axios.get(url,{
    //     headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "application/json;charset=UTF-8",
    //       "Authorization": `Bearer ${token}`
    //     },
    // })
} 

export async function updateUserProfile(user: User, token: string) :Promise<boolean> {
    var url :string = API_URL + "/user/mise-a-jour";
    return new Promise<boolean>((resolve, reject) => {
        setTimeout( () => {
            resolve(true);
        }, 1500);
    });
    // return axios.put(url,request, {
    //     headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "application/json;charset=UTF-8",
    //       "Authorization": `Bearer ${token}`
    //     },
    // })
} 

export async function updateUserPassword(request: PasswordChangeRequest, token: string) :Promise<boolean> {
    var url :string = API_URL + "/user/reinitialiser-mot-de-passe";
    return new Promise<boolean>((resolve, reject) => {
        setTimeout( () => {
            resolve(true);
        }, 1500);
    });
    // return axios.put(url,request, {
    //     headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "application/json;charset=UTF-8",
    //       "Authorization": `Bearer ${token}`
    //     },
    // })
} 


export async function approveUserAccount(userId: number, token: string) :Promise<boolean> {
    var url :string = API_URL + "/user/valider-compte";
    return new Promise<boolean>((resolve, reject) => {
        setTimeout( () => {
            resolve(true);
        }, 1500);
    });
    // return axios.post(url,request, {
    //     headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "application/json;charset=UTF-8",
    //       "Authorization": `Bearer ${token}`
    //     },
    // })
} 

export async function suspendUserAccount(userId: number, token: string) :Promise<boolean> {
    var url :string = API_URL + "/user/radier-compte";
    return new Promise<boolean>((resolve, reject) => {
        setTimeout( () => {
            resolve(true);
        }, 1500);
    });
    // return axios.post(url,request, {
    //     headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "application/json;charset=UTF-8",
    //       "Authorization": `Bearer ${token}`
    //     },
    // })
} 


export async function changeUserPasswordAsAdmin(request: AdminPasswordChangeRequest, token: string) :Promise<boolean> {
    var url :string = API_URL + "/user/reinitialiser-mot-de-passe-user";
    return new Promise<boolean>((resolve, reject) => {
        setTimeout( () => {
            resolve(true);
        }, 1500);
    });
    // return axios.post(url,request, {
    //     headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "application/json;charset=UTF-8",
    //       "Authorization": `Bearer ${token}`
    //     },
    // })
} 
