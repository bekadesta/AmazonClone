import axios from "axios";

const axiosInstance = axios.create({
    //local instance of forebase functions
    //baseURL:"http://127.0.0.1:5001/clone-13fe4/us-central1/api",
    //deploued version of amazon server on render 
    baseURL:"https://amazon-api-deploy-55av.onrender.com",
})

export {axiosInstance} 