import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback, PropsWithChildren,
} from "react";
import {CityType} from "@/entities/City/CityTypes.ts";

const BASE_URL = "http://localhost:9000";

interface ContextType {
  cities: CityType[],
  isLoading: boolean,
  currentCity: CityType | null,
  error: string,
  getCity: (id: number) => void,
  createCity: (city: CityType) => void,
  deleteCity: (id: number) => void,
}

const CitiesContext= createContext<ContextType>({
  createCity: () => {},
  currentCity: null,
  error: '',
  deleteCity: () => {},
  getCity: () => {},
  isLoading: false,
  cities: []
});

interface InitialReducerStateType {
  cities: CityType[],
  isLoading: boolean,
  currentCity: null | CityType,
  error: string
}

const initialReducerState: InitialReducerStateType = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: "",
};

//eslint-disable-next-line
//@ts-ignore
const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city:CityType) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

const CitiesProvider = ({ children }: PropsWithChildren) => {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialReducerState);

  useEffect( () => {
    const fetchCities = async () => {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(async (id: number) => {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity?.id]
  );

  const createCity = async (newCity:CityType) => {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  const deleteCity = async(id: number) => {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
