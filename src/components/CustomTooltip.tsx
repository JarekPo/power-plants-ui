import React from 'react';

import {PlantData} from '../types/types';

interface CustomTooltipProps {
  payload: PlantData | null;
}

const CustomTooltip = ({payload}: CustomTooltipProps) => {
  return (
    <figure className='flex-col mx-auto bg-slate-100 rounded-xl p-3 opacity-75'>
      <div className='mx-auto font-bold text-veryDarkgreen'>{payload?.name}</div>
      <div className='text-sm font-semibold'>{payload?.country_long}</div>
      <div className='text-sm font-semibold'>Primary Fuel: {payload?.primary_fuel}</div>
      <div className='text-sm font-semibold'>Capacity: {payload?.capacity_mw} MW</div>
    </figure>
  );
};

export default CustomTooltip;
