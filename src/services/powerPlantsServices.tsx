import {powerPlantsBackendInstance} from './instances';

export const getPowerPlantsData = async () => {
  try {
    const {data, status} = await powerPlantsBackendInstance.get('all-plants');
    return data;
  } catch (error) {
    console.error('Could not fetch the plants data.', error);
    return [];
  }
};

export const getCountryPlants = async (country: string) => {
  const params = {
    country: country,
  };
  try {
    const {data, status} = await powerPlantsBackendInstance.get('country-plants', {
      params: {
        country: country,
      },
    });
    return data;
  } catch (error) {
    console.error('Could not fetch plants details for the selected country.', error);
    return [];
  }
};
