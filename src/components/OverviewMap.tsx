import React, {BaseSyntheticEvent, useEffect, useState} from 'react';

import {Map, Marker, Overlay, Point, ZoomControl} from 'pigeon-maps';
import {osm} from 'pigeon-maps/providers';

import {INITIAL_ZOOM, MAP_CENTER} from '../constants/constants';
import {getCountryByCoordinates, getCountryNameByCity} from '../services/geonamesServices';
import {getCountriesSummary, getCountryPlants} from '../services/powerPlantsServices';
import {CountriesSummaryData, PlantData} from '../types/types';
import CountryCard from './CountryCard';
import CustomTooltip from './CustomTooltip';
import {getTimezoneCity} from './overviewMapUtils';

const OverviewMap = () => {
  const [mapData, setMapData] = useState<PlantData[]>([]);
  const [country, setCountry] = useState('');
  const [countriesSummary, setCountriesSummary] = useState<CountriesSummaryData[]>([]);
  const [selectedCountrySummary, setSelectedCountrySummary] = useState<CountriesSummaryData>();
  const [coordinates, setCoordintes] = useState<Point>(MAP_CENTER);
  const [tooltipPosition, setTooltipPosition] = useState<Point | null>(null);
  const [tooltipData, setTooltipData] = useState<PlantData | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Point>(MAP_CENTER);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const [selectedMarkerLatitude, selectedMarkerLongitude] = selectedMarker;
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  useEffect(() => {
    getCountryName();
    getSummaryData();
  }, []);

  useEffect(() => {
    if (country) {
      getPlantsData(country);

      if (countriesSummary.length) {
        const selectedCountryData = countriesSummary.find((selectedCountry: CountriesSummaryData) => {
          const countryData = selectedCountry.country_long === country;
          return countryData;
        });
        setSelectedCountrySummary(selectedCountryData);
      }
    }
  }, [country, countriesSummary]);

  const getCountryName = async () => {
    const countryDeatils = await getCountryNameByCity(getTimezoneCity());
    if (!countryDeatils) return;
    setCountry(countryDeatils.country_name);
    setCoordintes([countryDeatils.latitude, countryDeatils.longitude]);
  };

  const getCountryNameByCoordinates = async (coordinates: Point) => {
    const countryDetails = await getCountryByCoordinates(coordinates);
    if (!countryDetails) return;
    setCountry(countryDetails.country_name);
  };
  const getPlantsData = async (country: string) => {
    const data = await getCountryPlants(country);
    setMapData(data);
  };

  const getSummaryData = async () => {
    const data = await getCountriesSummary();
    setCountriesSummary(data);
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
          height={screenHeight - 100}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={INITIAL_ZOOM / 2}
          zoom={zoom}
          dprs={[1, 2]}
          attributionPrefix={<span>Power Plants</span>}
          width={screenWidth}
          metaWheelZoom={true}
          zoomSnap={false}
          onClick={handleMapClick}
        >
          {mapData.map((plant: PlantData) => (
            <Marker
              width={selectedMarkerLatitude === plant.latitude && selectedMarkerLongitude === plant.longitude ? 30 : 25}
              color={
                selectedMarkerLatitude === plant.latitude && selectedMarkerLongitude === plant.longitude
                  ? 'darkOrange'
                  : undefined
              }
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
        </Map>
        <div className='flex flex-row absolute top-0 left-0'>
          {selectedCountrySummary && <CountryCard countryData={selectedCountrySummary} />}
          <ZoomControl style={{position: 'relative'}} />
        </div>
      </main>
    </>
  );
};

export default OverviewMap;
