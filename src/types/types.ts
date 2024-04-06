export interface PlantData {
  country_long: string;
  gppd_idnr: string;
  latitude: number;
  primary_fuel: string;
  capacity_mw: number;
  country: string;
  name: string;
  longitude: number;
  id: number;
}

export interface CountriesSummaryData {
  country_long: string;
  plants_number: number;
  total_capacity: number;
}
