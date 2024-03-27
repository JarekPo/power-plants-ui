import React from 'react';

import {PlantData} from '../types/types';

interface CustomTooltipProps {
  payload: PlantData | null;
}

const CustomTooltip = ({payload}: CustomTooltipProps) => {
  return (
    <div style={{backgroundColor: 'white', padding: '5px', borderRadius: '5px', width: '80px'}}>
      Name: {payload?.name}
      <br />
      Capacity: {payload?.capacity_mw}
    </div>
  );
};

export default CustomTooltip;
