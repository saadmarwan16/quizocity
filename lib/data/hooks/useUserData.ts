import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebaseInit";

const useUserData = () => {
  const [user, loading, error] = useAuthState(auth);

  return {
    user,
    loading,
    error,
  };
};

export default useUserData;
