import s from './CityList.module.sass'
import {Spinner} from "@/shared/ui/Spinner";
import {Message} from "@/shared/ui/Message";
import {useCities} from "@/entities/City";
import {CityItem} from "@/entities/City/CityItem.tsx";

export const CityList = () => {
  const { cities, isLoading } = useCities();


  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={s.cityList}>
      {cities?.map((city) => (
        <CityItem city={city} key={city.id}/>
      ))}
    </ul>
  );
};