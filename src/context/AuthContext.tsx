import React from "react";
import { fakeAuthProvider } from "../services/auth";
import { IUser } from "../services/user.types";

export interface AuthContextType {
  user: IUser | null;
  signin: (user: IUser, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  let [user, setUser] = React.useState<IUser>(null!);

  let signin = (newUser: IUser, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null!);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthContext, AuthProvider };
