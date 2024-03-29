import {Point} from 'pigeon-maps';

import {geonamesInstance} from './instances';

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
    const {data, status} = await geonamesInstance.get('findNearbyPlaceNameJSON', {
      params: {
        lat: latitude,
        lng: longitude,
        username: import.meta.env.VITE_GEONAMES_USERNAME,
      },
    });
    return data;
  } catch (error) {
    console.error('Could not fetch country name.', error);
    return [];
  }
};
