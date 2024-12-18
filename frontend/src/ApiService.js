import axios from 'axios';

const API_URL = 'http://localhost:5000/api/service-requests';

export const getServiceRequests = () => {
    return axios.get(API_URL);
};

export const createServiceRequest = (request) => {
    return axios.post(API_URL, request);
};

export const updateServiceRequest = (id, request) => {
    return axios.put(`${API_URL}/${id}`, request);
};

export const deleteServiceRequest = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
