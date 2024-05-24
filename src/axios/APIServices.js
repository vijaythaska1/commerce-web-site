import toast from "react-hot-toast";
import { http } from "./axios.js"


const APIServices = {};
APIServices.adminLogin = async (body) => {
    try {
        console.log("🚀 ~ http:", http)
        const res = await http.post('/login', body);
        console.log("🚀 ~ APIServices.adminLogin= ~ res:", res)
        toast.success(res.data.message);
        return res
    } catch (err) {
        console.log('API call failed :-', err);
        toast.error(err.response.data.message);
        throw err
    }
}
export default APIServices;

