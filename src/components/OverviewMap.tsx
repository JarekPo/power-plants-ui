import React, {BaseSyntheticEvent, useEffect, useState} from 'react';

import {Map, Marker, Overlay, Point} from 'pigeon-maps';
import {osm} from 'pigeon-maps/providers';

import {MAP_CENTER} from '../constants/constants';
import {getCountryNameByCity} from '../services/geonamesServices';
import {getCountryPlants} from '../services/powerPlantsServices';
import {PlantData} from '../types/types';
import CustomTooltip from './CustomTooltip';
import {getTimezoneCity} from './OverviewMapUtils';

const OverviewMap = () => {
  const [mapData, setMapData] = useState<PlantData[]>([]);
  const [country, setCountry] = useState('');
  const [coordinates, setCoordintes] = useState<Point>(MAP_CENTER);
  const [tooltipPosition, setTooltipPosition] = useState<Point | null>(null);
  const [tooltipData, setTooltipData] = useState<PlantData | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Point>(MAP_CENTER);
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

  const handleMarkerClick = (e: {event: BaseSyntheticEvent<MouseEvent>; anchor: Point; payload: PlantData}) => {
    setTooltipPosition(e.anchor);
    setTooltipData(e.payload);
    setSelectedMarker(e.anchor);
  };

  const handleMapClick = () => {
    setTooltipPosition(null);
    setSelectedMarker(MAP_CENTER);
  };

  return (
    <>
      <Map
        provider={osm}
        height={'90vh'}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={3}
        zoom={6}
        dprs={[1, 2]}
        attribution={false}
        width={screenWidth}
        metaWheelZoom={true}
        onClick={handleMapClick}
      >
        {mapData.map((plant: PlantData) => (
          <Marker
            width={selectedMarker[0] === plant.latitude && selectedMarker[1] === plant.longitude ? 30 : 25}
            anchor={[plant.latitude, plant.longitude]}
            key={plant.id}
            payload={plant}
            onClick={handleMarkerClick}
          />
        ))}
        {tooltipPosition && (
          <Overlay anchor={tooltipPosition} offset={[60, -5]}>
            <CustomTooltip payload={tooltipData} />
          </Overlay>
        )}
      </Map>
    </>
  );
};

export default OverviewMap;
