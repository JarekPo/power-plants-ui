import {Point} from 'pigeon-maps';

import {geonamesInstance, powerPlantsBackendInstance} from './instances';

export const getCountryNameByCity = async (city: string) => {
  try {
    const {data, status} = await geonamesInstance.get('searchJSON', {
      params: {
        name: encodeURIComponent(city),
        username: import.meta.env.VITE_GEONAMES_USERNAME,
      },
    });
    return data;
  } catch (error) {
    console.error('Could not match country name.', error);
    return [];
  }
};

export const getCountryByCoordinates = async (coordinates: Point) => {
  try {
    const [latitude, longitude] = coordinates;
    const {data, status} = await powerPlantsBackendInstance.get('geonames', {
      params: {
        latitude: latitude,
        longitude: longitude,
      },
    });
    return data;
  } catch (error) {
    console.error('Could not fetch country name.', error);
    return [];
  }
};
