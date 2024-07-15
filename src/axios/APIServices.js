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
APIServices.Passwordchange = async () => {
    try {
        const res = await http.post("/");
        return res
    } catch (error) {
        console.log('API call failed :-', err);
        toast.error(err.response.data.message);
        throw error
    }
}




export default APIServices;



