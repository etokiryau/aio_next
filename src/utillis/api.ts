import axios from 'axios';

const API_BASE_URL: string = 'http://localhost:7018';

export const fetchData = async (endpoint: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
    }
};

export const postData = async (endpoint: string, data: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw new Error('Failed to post data');
    }
};