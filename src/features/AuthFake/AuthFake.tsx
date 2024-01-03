import {createContext, PropsWithChildren, useContext, useReducer} from "react";

interface User {
  name: string
  email: string
  password: string
  avatar: string
}

interface AuthContextType {
  user: null | User
  isAuthenticated: boolean
  login: (email: string, password: string) => void,
  logout: () => void
}

const initialState = {
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialState);

type ReducerType = Omit<AuthContextType, 'login' | 'logout'>

// eslint-disable-next-line
const  reducer = (state:ReducerType, action:{type: string, payload?: any}) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

export const AuthProvider = ({ children }:PropsWithChildren) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    {user: null, isAuthenticated: false}
  );

  const  login = (email: string, password: string) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  const logout = () => {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}


