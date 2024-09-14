import axios from "axios";

const BASE_URL = 'https://api.pexels.com/v1/search';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': import.meta.env.VITE_PEXELS_API_KEY, 
  },
};

export const GetPlaceImages = (query) => {
  const params = {
    query: query, 
    per_page: 10, 
  };

  return axios.get(BASE_URL, {
    params,
    ...config
  });
};
