import React, {BaseSyntheticEvent, useEffect, useState} from 'react';

import {Map, Marker, Overlay, Point, ZoomControl} from 'pigeon-maps';
import {osm} from 'pigeon-maps/providers';

import {INITIAL_ZOOM, MAP_CENTER} from '../constants/constants';
import {getCountryByCoordinates, getCountryNameByCity} from '../services/geonamesServices';
import {getCountriesSummary, getCountryPlants} from '../services/powerPlantsServices';
import {CountriesSummaryData, PlantData} from '../types/types';
import CountryCard from './CountryCard';
import CustomTooltip from './CustomTooltip';
import LoadingBar from './LoadingBar';
import {getTimezoneCity} from './overviewMapUtils';
import ResetButton from './ResetButton';

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
  const [isLoading, setIsLoading] = useState(false);
  const [mapKey, setMapKey] = useState(0);

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
  }, [country]);

  const getCountryName = async () => {
    setIsLoading(true);
    const countryDeatils = await getCountryNameByCity(getTimezoneCity());
    setIsLoading(false);
    if (!countryDeatils) return;
    setCountry(countryDeatils.country_name);
    setCoordintes([parseFloat(countryDeatils.latitude), parseFloat(countryDeatils.longitude)]);
  };

  const getCountryNameByCoordinates = async (coordinates: Point) => {
    const countryDetails = await getCountryByCoordinates(coordinates);
    if (!countryDetails) return;
    setCountry(countryDetails.country_name);
  };
  const getPlantsData = async (country: string) => {
    setIsLoading(true);
    const data = await getCountryPlants(country);
    setMapData(data);
    setIsLoading(false);
  };

  const getSummaryData = async () => {
    setIsLoading(true);
    const data = await getCountriesSummary();
    setCountriesSummary(data);
    setIsLoading(false);
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
  };

  const resetMapZoom = () => {
    setMapKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      {isLoading && <LoadingBar />}
      <main className='relative'>
        <Map
          key={mapKey}
          provider={osm}
          height={screenHeight - 100}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={INITIAL_ZOOM / 2}
          zoom={zoom}
          dprs={[1, 2]}
          attributionPrefix={<span>Power Plants</span>}
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
          <ZoomControl style={{position: 'absolute', top: 8, left: 264}} />
        </Map>
        <div style={{position: 'absolute', top: 66, left: 264}} onClick={resetMapZoom}>
          <ResetButton />
        </div>
        <div className='flex flex-row absolute top-0 left-0'>
          {selectedCountrySummary && <CountryCard countryData={selectedCountrySummary} />}
        </div>
      </main>
    </>
  );
};

export default OverviewMap;
