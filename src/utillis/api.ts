import axios from 'axios';
import https from 'https';

const API_BASE_URL: string = 'https://localhost:7060/Home';

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

export const fetchData = async (endpoint: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
        console.log(response)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
};

export const postData = async (endpoint: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${endpoint}`);
        console.log(response)
    } catch (error) {
        throw new Error('Failed to post data');
    }
};

export const deleteData = async (endpoint: string) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${endpoint}`, {httpsAgent});
        console.log(response)
    } catch (error) {
        throw new Error('Failed to post data');
    }
}

export const updateData = async (endpoint: string) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${endpoint}`, {httpsAgent});
        console.log(response)
    } catch (error) {
        throw new Error('Failed to post data');
    }
}