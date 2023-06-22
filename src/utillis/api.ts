import axios from 'axios';

const API_BASE_URL: string = 'https://localhost:7060/Home';

export const fetchData = async (endpoint: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
        console.log(response)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
};

export const postData = async (endpoint: string, data: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to post data');
    }
};