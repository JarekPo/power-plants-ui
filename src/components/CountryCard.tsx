import React from 'react';

import {CountriesSummaryData} from '../types/types';

interface CountryCardProps {
  countryData: CountriesSummaryData;
}
const CountryCard = ({countryData}: CountryCardProps) => {
  return (
    <>
      <div className='flex flex-col p-3 m-2 mx-auto bg-white hover:shadow-2xl'>
        <div className='text-2xl font-bold text-veryDarkgreen'>{countryData.country_long}</div>
        <div>{`Number of plants: ${countryData.plants_number}`}</div>
        <div>{`Total Capacity: ${countryData.total_capacity.toFixed(3)} MW`}</div>
      </div>
    </>
  );
};

export default CountryCard;
