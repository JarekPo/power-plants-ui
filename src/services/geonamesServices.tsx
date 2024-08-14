import {Point} from 'pigeon-maps';

import {powerPlantsBackendInstance} from './instances';

export const getCountryNameByCity = async (city: string) => {
  try {
    const {data, status} = await powerPlantsBackendInstance.get('geonames/search-country', {
      params: {
        name: encodeURIComponent(city),
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
