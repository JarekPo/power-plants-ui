import {powerPlantsBackendInstance} from './instances';

export const getPowerPlantsData = async () => {
  try {
    const {data, status} = await powerPlantsBackendInstance.get('get-all-plants');
    return data;
  } catch (error) {
    console.error('Could not fetch the caontries.', error);
    return [];
  }
};
