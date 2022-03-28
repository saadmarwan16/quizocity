import {
  collection,
  collectionGroup,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { IQuiz } from "../../data_types/interfaces";
import { firestore } from "../../utils/firebaseInit";

interface IFavorite {
  area: string;
  level: number;
  createdAt: any;
  quiz: [string, string, string];
  option: [string, string];
  correct: number;
}

const useCollectionGroup = (path: string) => {
  const [favorites, setFavorites] = useState<IFavorite[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const ref = collectionGroup(firestore, path);
    const q = query(ref, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const currentFavorites: IFavorite[] = [];
      snapshot.docs.forEach(
        (favorite) => {
          const favoriteData = favorite.data() as IFavorite;
          currentFavorites.push(favoriteData);
        },
        (e: any) => setError(!!e)
      );
      setLoading(false);
      setFavorites(currentFavorites);
    });

    return unsubscribe;
  }, [path]);

  return {
    favorites,
    loading,
    error,
  };
};

export default useCollectionGroup;
