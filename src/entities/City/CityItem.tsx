import {CityType} from "./CityTypes.ts";
import {Link} from "react-router-dom";
import s from './CityItem.module.sass'
import {useCities} from "./CityProvider.tsx";
import {MouseEvent} from 'react'

interface CityItemProps {
  city: CityType
}

const formatDate = (date:string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export const CityItem = ({city}: CityItemProps) => {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  const handleClick = (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${s.cityItem} ${
          id === currentCity?.id ? s["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={s.emoji}>{emoji}</span>
        <h3 className={s.name}>{cityName}</h3>
        <time className={s.date}>({formatDate(date)})</time>
        <button className={s.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
};