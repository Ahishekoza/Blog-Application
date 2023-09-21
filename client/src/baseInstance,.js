import axios from "axios";

export const HTTP  =  axios.create({
    
    headers:{
        Authorization:`Bearer ${localStorage.getItem('authToken')}`
    }
})

export const PF = "http://localhost:8080/"