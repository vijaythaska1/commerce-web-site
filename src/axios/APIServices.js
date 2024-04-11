import { http } from "./axios.js"
const APIServices = {};
APIServices.adminLogin = async (body) => {
    try {
        const res = await http.post('/login', body);
    } catch (err) {
        console.log('API call failed :-', err);
        throw err
    }
}
export default APIServices;

