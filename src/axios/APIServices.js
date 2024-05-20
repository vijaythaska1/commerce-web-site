import toast from "react-hot-toast";
import { http } from "./axios.js"
import { useNavigate } from "react-router-dom";

const APIServices = {};

APIServices.adminLogin = async (body) => {
    try {
        const res = await http.post('/login', body);
        toast.success(res.data.message);
        return res
    } catch (err) {
        console.log('API call failed :-', err);
        toast.error(err.response.data.message)
        throw err
    }
}
export default APIServices;

