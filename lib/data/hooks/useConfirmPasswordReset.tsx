import { Auth, confirmPasswordReset } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../utils/firebaseInit";

const useConfirmPasswordReset = (auth: Auth) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const resetPassword = async (oob: string, password: string) => {
    try {
      console.log(oob);
      console.log(password);
      console.log('clicked');
      setLoading(true);
      await confirmPasswordReset(auth, oob, password);
      setIsComplete(true);
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      console.log(typeof e);
      console.log(e.message);
      setError(JSON.stringify(e));
    }
  };

  return {
    resetPassword,
    isComplete,
    loading,
    error,
  };
};

export default useConfirmPasswordReset;
