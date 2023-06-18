import axios from "axios";
require('dotenv').config()

let baseURL

if(process.env.NODE_ENV === 'production'){
    baseURL = '/'
}else{
    baseURL = 'http://localhost:5000/'
}

const URL = axios.create({baseURL})

export const addEssayAPI = (data) => URL.post('essays', data)

export const getAllEssayAPI = () => URL.get('essays')

export const getSingleEssayAPI = (id) => URL.get(`essays/${id}`)

export const deleteEssayAPI = (id) => URL.delete(`essays/${id}`)

export const updateEssayAPI = (id, data) => URL.patch(`essays/${id}`, data)