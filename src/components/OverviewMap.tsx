import React from 'react';

import {Map, Marker} from 'pigeon-maps';

const OverviewMap = () => {
  const screenWidth = window.innerWidth;
  return (
    <Map
      height={'90vh'}
      defaultCenter={[25, 0]}
      defaultZoom={2.6}
      dprs={[1, 2]}
      attribution={false}
      width={screenWidth}
    >
      <Marker width={50} anchor={[25, 0]} />
    </Map>
  );
};

export default OverviewMap;
