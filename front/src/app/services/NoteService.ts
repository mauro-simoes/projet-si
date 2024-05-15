import axios from "axios";
import { API_URL } from "../core/constants";
import { APIResponseModel } from "../models/ApiResponseModel";


export async function addNote(note: string, token: string) :Promise<APIResponseModel<boolean>> {
    var url :string = API_URL + "/noter/" + note;
    return axios.post(url,null, {
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${token}`
        },
    })
} 
