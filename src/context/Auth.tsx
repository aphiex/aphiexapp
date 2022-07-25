import { createContext, useContext, useState } from "react";
import { authService } from "../services";

export type TAuthData = {
  key: string;
  authorized: boolean;
};

type TAuthContext = {
  auth?: TAuthData;
  signIn: (
    password: string,
    setError: React.Dispatch<React.SetStateAction<string>>
    ) => Promise<TAuthData | undefined>;
  signOut: () => void;
};

export const AuthContext = createContext<TAuthContext>({} as TAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<TAuthData>();

  async function signIn(
    password: string,
    setError: React.Dispatch<React.SetStateAction<string>>
  ): Promise<TAuthData | undefined> {
    try {

      const authFromService = await authService.signIn(password);
      setAuth(authFromService);
      return authFromService;

    } catch (error: any) {
      
      setError(error.message);
      return undefined;
      
    }
  }

  function signOut() {
    setAuth(undefined);
  }

  return (
    <AuthContext.Provider value={{ auth, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
};