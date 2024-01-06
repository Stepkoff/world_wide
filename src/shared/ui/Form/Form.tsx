import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import s from './Form.module.sass'
import {Button} from "@/shared/ui/Button";
import {BackButton} from "@/shared/ui/BackButton";
import {useUrlPosition} from "@/shared/hooks/useUrlPosotion.ts";
import {CityType, useCities} from "@/entities/City";
import {useNavigate} from "react-router-dom";
import {useEffect, useState, FormEvent} from "react";
import {Spinner} from "@/shared/ui/Spinner";
import {Message} from "@/shared/ui/Message";

export const convertToEmoji = (countryCode:string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    //eslint-disable-next-line
    // @ts-ignore
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export const Form = () => {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  useEffect(() => {

    if (!lat && !lng) return;
    const fetchCityData = async() => {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");

        const res = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeocodingError((err as Error).message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
    },
    [lat, lng]
  );

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity:CityType = {
      cityName,
      country,
      emoji,
      date: date.toString(),
      notes,
      position: {
        lat: Number(lat),
        lng: Number(lng)
      },
      id: Number(Math.random().toString().slice(2, 11))
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${s.form} ${isLoading ? s.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={s.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={s.flag}>{emoji}</span>
      </div>

      <div className={s.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date ? date : new Date())}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={s.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={s.buttons}>
        <Button variant="primary">Add</Button>
        <BackButton/>
      </div>
    </form>
  );
};