import toast from "react-hot-toast";
import { http } from "./axios.js"
const APIServices = {};

APIServices.adminLogin = async (body) => {
    try {
        const res = await http.post('/login', body);
        toast.success(res.data.message);
        return res
    } catch (err) {
        console.log('API call failed :-', err);
        toast.error(err.response.data.message);
        throw err
    }
};

APIServices.ProfilGet = async () => {
    try {
        const res = await http.get('/UserProfile');
        return res
    } catch (err) {
        console.log('API call failed :-', err);
        toast.error(err.response.data.message);
        throw err
    }
};

APIServices.Passwordchange = async (body) => {
    try {
        const res = await http.post("/changePassword", body);
        toast.success(res.data.message);
        return res
    } catch (err) {
        console.log('API call failed :-', err);
        toast.error(err.response.data.message);
        throw err
    }
};

APIServices.logout = async (body) => {
    try {
        const res = await http.post("/logout");
        localStorage.clear()
        toast.success(res.data.message);
        return res
    } catch (err) {
        console.log('API call failed :-', err);
        toast.error(err.response.data.message);
        throw err
    }

};

APIServices.GetCms = async (body, data) => {
    try {
        const res = await http.get(`/cmsget?type=${body}`, data);
        return res
    } catch (err) {
        console.log('API call failed :-', err);
        toast.error(err.response.data.message);
        throw err
    }

};

APIServices.UpdateCms = async (body) => {
    console.log("sandeep",body);
    const {content,type} =body;
    try {
        const res = await http.post(`/CmsUpdate?type=${type}`,{content});
        toast.success(res.data.message);
        return res
    } catch (err) {
        console.log('API call failed :-', err);
        toast.error(err.response.data.message);
        throw err
    }

}


export default APIServices;



