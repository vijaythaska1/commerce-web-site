import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// export {
//     fetchData:c
// }

export const fetchData = createAsyncThunk('/type/fetchdata', async () => {
    try {
        const respons = await axios.get('api')
        return respons
    } catch (error) {

    }
})