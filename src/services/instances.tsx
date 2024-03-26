import axios from 'axios';

const PowerPlantsBaseUrl = import.meta.env.VITE_PP_API_URL;
const GeonamesBaseUrl = import.meta.env.VITE_GEONAMES_API_URL;

export const powerPlantsBackendInstance = axios.create({
  baseURL: PowerPlantsBaseUrl,
});

export const geonamesInstance = axios.create({baseURL: GeonamesBaseUrl});
