import {CityType} from "./CityTypes.ts";


interface CityItemProps {
  city: CityType
}

export const CityItem = ({city}: CityItemProps) => {
  return (
    <div>
      {city.cityName}
    </div>
  );
};