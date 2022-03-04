import { confirmPasswordReset } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../utils/firebaseInit";

const useConfirmPasswordReset = async () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const resetPassword = async (oob: string, password: string) => {
    try {
      setLoading(true);
      await confirmPasswordReset(auth, oob, password);
      setIsComplete(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
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
