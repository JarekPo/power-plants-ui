import React, {useEffect, useState} from 'react';

import {Map, Marker} from 'pigeon-maps';
import {osm} from 'pigeon-maps/providers';

import {getCountryNameByCity} from '../services/geonamesServices';
import {getCountryPlants} from '../services/powerPlantsServices';
import {PlantData} from '../types/types';
import {getTimezoneCity} from './OverviewMapUtils';

const OverviewMap = () => {
  const [mapData, setMapData] = useState<PlantData[]>([]);
  const [country, setCountry] = useState('');
  const [coordinates, setCoordintes] = useState<[number, number]>([50.54114, 22.72204]);
  const screenWidth = window.innerWidth;

  useEffect(() => {
    getCountryName();
  }, []);

  useEffect(() => {
    if (country) {
      getPlantsData(country);
    }
  }, [country]);

  const getCountryName = async () => {
    const countryDeatils = await getCountryNameByCity(getTimezoneCity());
    setCountry(countryDeatils.geonames[0].countryName);
    setCoordintes([countryDeatils.geonames[0].lat, countryDeatils.geonames[0].lng]);
  };
  const getPlantsData = async (country: string) => {
    const data = await getCountryPlants(country);
    setMapData(data);
  };

  return (
    <>
      <Map
        provider={osm}
        height={'90vh'}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={4}
        dprs={[1, 2]}
        attribution={false}
        width={screenWidth}
        metaWheelZoom={true}
      >
        <Marker width={25} anchor={[25, 0]} />
        {mapData.map((plant: PlantData, index: number) => (
          <Marker width={25} anchor={[plant.latitude, plant.longitude]} key={plant.id} />
        ))}
      </Map>
    </>
  );
};

export default OverviewMap;
