import { signOut } from "firebase/auth";
import { createContext, FC, useContext } from "react";
import {
  AuthStateHook,
  EmailAndPasswordActionHook,
  SendPasswordResetEmailHook,
  SignInWithPopupHook,
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithFacebook,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebaseInit";
import useConfirmPasswordReset from "../hooks/useConfirmPasswordReset";

type ConfirmPasswordResetHook = {
  resetPassword: (oob: string, password: string) => Promise<void>;
  isComplete: boolean;
  loading: boolean;
  error: string | null;
};

interface IAuthContext {
  authState: AuthStateHook;
  registerWithEmailAndPassword: EmailAndPasswordActionHook;
  loginWithEmailAndPassword: EmailAndPasswordActionHook;
  loginWithGoogle: SignInWithPopupHook;
  loginWithFacebook: SignInWithPopupHook;
  sendPasswordResetEmail: SendPasswordResetEmailHook;
  confirmPasswordReset: ConfirmPasswordResetHook;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuthContext = () => useContext(AuthContext)!;

const AuthContextProvider: FC = ({ children }) => {
  const value = {
    authState: useAuthState(auth),
    registerWithEmailAndPassword: useCreateUserWithEmailAndPassword(auth),
    loginWithEmailAndPassword: useSignInWithEmailAndPassword(auth),
    loginWithGoogle: useSignInWithGoogle(auth),
    loginWithFacebook: useSignInWithFacebook(auth),
    sendPasswordResetEmail: useSendPasswordResetEmail(auth),
    confirmPasswordReset: useConfirmPasswordReset(auth),
    signOut: () => signOut(auth),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
