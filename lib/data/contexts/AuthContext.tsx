import { signOut } from "firebase/auth";
import { createContext, FC, useContext } from "react";
import {
  AuthStateHook,
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebaseInit";

interface IAuthContext {
  authState: AuthStateHook;
  createUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuthContext = () => useContext(AuthContext)!;

const AuthContextProvider: FC = ({ children }) => {
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const value = {
    authState: useAuthState(auth),
    // registerWithEmailAndPassword: useCreateUserWithEmailAndPassword(auth),
    // loginWithEmailAndPassword: useSignInWithEmailAndPassword(auth),
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut: () => signOut(auth),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
