import {CityType, useCities} from "@/entities/City";
import {Spinner} from "@/shared/ui/Spinner";
import {Message} from "@/shared/ui/Message";
import s from './CountryList.module.sass'
import {CountryItem} from "./CountryItem.tsx";

export interface ResultCountry {
  country: string,
  emoji: string
}

export const CountryList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr:any[], city): ResultCountry[] => {
    if (!arr.map((el:CityType) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={s.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country}/>
      ))}
    </ul>
  );
};