import s from './City.module.sass'
import {useParams} from "react-router-dom";
import {useCities} from "@/entities/City/CityProvider.tsx";
import {useEffect} from "react";
import {Spinner} from "@/shared/ui/Spinner";
import {BackButton} from "@/shared/ui/BackButton";

const formatDate = (date:string | null) => {
  if(!date) return

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
}

export const City = () => {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(() => {
    if(id) {
      getCity(id)
    }
  }, [id, getCity]);


  if (isLoading) return <Spinner />;

  return (
    <div className={s.city}>
      <div className={s.row}>
        <h6>City name</h6>
        <h3>
          <span>{currentCity?.emoji}</span> {currentCity?.cityName}
        </h3>
      </div>

      <div className={s.row}>
        <h6>You went to {currentCity?.cityName} on</h6>
        <p>{formatDate(currentCity?.date || null)}</p>
      </div>

      {currentCity?.notes && (
        <div className={s.row}>
          <h6>Your notes</h6>
          <p>{currentCity?.notes}</p>
        </div>
      )}

      <div className={s.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${currentCity?.cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {currentCity?.cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton/>
      </div>
    </div>
  );
};