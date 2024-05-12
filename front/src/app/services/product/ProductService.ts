import { API_URL } from '@/app/core/constants';
import { allProductsMockData } from '@/app/core/mockData';
import { Product } from '@/app/models/product/ProductModels';
import axios from 'axios';


export async function getAllProducts(category :string,token: string) :Promise<Product[]> {
    var url :string = API_URL + "/produit/get-all-produits/" + category;
    return new Promise<Product[]>((resolve, reject) => {
        setTimeout( () => {
            resolve(allProductsMockData);
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

export async function addProduct(product: Product, token: string) :Promise<boolean> {
    var url :string = API_URL + "/produit/get-all-produits/";
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

export async function updateProduct(product: Product, token: string) :Promise<boolean> {
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

