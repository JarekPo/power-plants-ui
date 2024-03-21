import axios from 'axios';

const PowerPlantsBaseUrl = import.meta.env.VITE_PP_API_URL;

export const powerPlantsBackendInstance = axios.create({
  baseURL: PowerPlantsBaseUrl,
});
