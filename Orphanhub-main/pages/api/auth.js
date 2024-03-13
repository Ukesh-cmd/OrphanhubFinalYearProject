import client from "./client";
export const createUser = async(userInfo) => {
    try {
        const { data } = await client.post('/register', userInfo)
        return data;
    } catch (error) {
        const { response } = error
        if (response && response.data) {
            return response.data
        }
        return { error: error.message || error }
    }

}