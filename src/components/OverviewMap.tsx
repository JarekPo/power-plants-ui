import React, {BaseSyntheticEvent, useEffect, useState} from 'react';

import {Map, Marker, Overlay, Point, ZoomControl} from 'pigeon-maps';
import {osm} from 'pigeon-maps/providers';

import {INITIAL_ZOOM, MAP_CENTER} from '../constants/constants';
import {getCountryByCoordinates, getCountryNameByCity} from '../services/geonamesServices';
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
  const [selectedMarkerLatitude, selectedMarkerLongitude] = selectedMarker;
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

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
    if (!countryDeatils) return;
    setCountry(countryDeatils.geonames[0].countryName);
    setCoordintes([countryDeatils.geonames[0].lat, countryDeatils.geonames[0].lng]);
  };

  const getCountryNameByCoordinates = async (coordinates: Point) => {
    const countryDetails = await getCountryByCoordinates(coordinates);
    if (!countryDetails) return;
    setCountry(countryDetails.geonames[0].countryName);
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

  const handleMapClick = (e: {event: MouseEvent; latLng: Point; pixel: [number, number]}) => {
    setTooltipPosition(null);
    setSelectedMarker(MAP_CENTER);
    getCountryNameByCoordinates(e.latLng);
    setCoordintes(e.latLng);
    setZoom(0);
  };

  return (
    <>
      <main className='relative'>
        <Map
          provider={osm}
          height={'90vh'}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={INITIAL_ZOOM / 2}
          zoom={zoom}
          dprs={[1, 2]}
          attributionPrefix={'Power Plants'}
          width={screenWidth}
          metaWheelZoom={true}
          zoomSnap={false}
          onClick={handleMapClick}
        >
          {mapData.map((plant: PlantData) => (
            <Marker
              width={selectedMarkerLatitude === plant.latitude && selectedMarkerLongitude === plant.longitude ? 30 : 25}
              anchor={[plant.latitude, plant.longitude]}
              key={plant.id}
              payload={plant}
              onClick={handleMarkerClick}
            />
          ))}
          {tooltipPosition && (
            <Overlay anchor={tooltipPosition} offset={[60, 140]}>
              <CustomTooltip payload={tooltipData} />
            </Overlay>
          )}
          <ZoomControl style={{top: 10, left: 10}} />
        </Map>
        <div className='absolute top-0 left-0'>
          <div>card</div>
        </div>
      </main>
    </>
  );
};

export default OverviewMap;
