import axios from 'axios';

const url = 'http://localhost:3006/';

export const HandleCrud = async (method, endpoint, data) => {
  try {
    let response;

    switch (method) {
      case 'get':
        response = await axios.get(`${url}${endpoint}`);
        break;
      case 'post':
        response = await axios.post(`${url}${endpoint}`, data);
        break;
      case 'put':
        response = await axios.put(`${url}${endpoint}`, data);
        break;
      case 'delete':
        response = await axios.delete(`${url}${endpoint}`);
        break;
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
