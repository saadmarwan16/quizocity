import Image from "next/image";
import { Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { FunctionComponent } from "react";
import { useAuthContext } from "../../lib/data/contexts/AuthContext";
import capitalize from "../../lib/utils/capitalize";
import { useDocument } from "react-firebase-hooks/firestore";
import { firestore } from "../../lib/utils/firebaseInit";
import { doc } from "firebase/firestore";

interface UserPointsProps {}

const UserPoints: FunctionComponent<UserPointsProps> = () => {
  const {
    authState: [user],
  } = useAuthContext();
  const userRef = doc(firestore, `users/${user?.uid}/userInfo/points`)
  const [userDoc] = useDocument(userRef)

  return (
    <div className="flex flex-col items-center">
      <Image
        src={user?.photoURL ?? "/person.png"}
        alt="Marwan"
        width={145}
        height={145}
        className="rounded-full"
      />
      <Typography variant="h6" className="mt-6 font-bold">
        {user?.displayName ? capitalize(user.displayName) : "Anonymous User"}
      </Typography>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex items-center justify-center w-8 h-8 bg-teal-700 rounded-3xl">
          <StarIcon className="text-text-primary" />
        </div>
        <Typography variant="h5">{userDoc?.data()?.points ?? 0}</Typography>
      </div>
    </div>
  );
};

export default UserPoints;
