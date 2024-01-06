import {ResultCountry} from './CountryList.tsx'
import s from './CountryItem.module.sass'

export const CountryItem = ({country}: {country: ResultCountry}) => {


  return (
    <li className={s.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  )
}