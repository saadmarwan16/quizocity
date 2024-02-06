import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
  Typography,
} from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Layout from '../../components/shared/Layout';
import UserPoints from '../../components/shared/UserPoints';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { collection, CollectionReference, getDocs } from 'firebase/firestore';
import { firestore } from '../../lib/utils/firebaseInit';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { IFavorite, IFavoriteQuestion } from '../../lib/data_types/interfaces';
import { useEffect, useState } from 'react';

interface FavoritesProps {
  path: string;
}

const Favorites: NextPage<FavoritesProps> = ({ path }) => {
  const colRef = collection(firestore, path) as CollectionReference<IFavorite>;
  const [favorites, loading, error] = useCollectionData(colRef);
  const [flattendFavorites, setFlattendFavorites] = useState<
    IFavoriteQuestion[] | null
  >(null);

  useEffect(() => {
    if (!loading && !error) {
      const currentFlattendFavorites: IFavoriteQuestion[] = [];
      favorites?.forEach((favorite) => {
        favorite.questions.forEach((question) =>
          currentFlattendFavorites.push(question)
        );
      });

      setFlattendFavorites(currentFlattendFavorites);
    }
  }, [error, favorites, loading]);

  return (
    <Layout pageName='Favorites'>
      <div className='w-full pb-6'>
        <UserPoints />
        <div className='mt-12'>
          <Typography variant='h6' className='mt-12 mb-3 font-semibold'>
            Favorites
          </Typography>
          {loading && (
            <div className='flex flex-col gap-2'>
              {[0, 1, 2, 3, 4].map((num) => (
                <Skeleton key={num} height={45} variant='rectangular' />
              ))}
            </div>
          )}

          {error && <div>Error...</div>}

          {flattendFavorites && (
            <div className='flex flex-col gap-2'>
              {flattendFavorites.map(
                ({ area, correct, level, option, questionNumber, quiz }) => {
                  return (
                    <Accordion
                      key={`${area}${level}${correct}${questionNumber}`}
                      className='before:hidden'
                      sx={{ bgcolor: '#101010' }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon className='text-text-primary' />
                        }
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                        className='flex-row-reverse gap-3'
                      >
                        <div className='flex justify-between w-full'>
                          <Typography>
                            {area.toUpperCase()} at Level {level}
                          </Typography>
                          <FavoriteIcon />
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className='flex flex-col gap-4'>
                          <div>
                            <Typography className='text-lg text-teal-500'>
                              Question:
                            </Typography>
                            <Typography>
                              Which of two words is more related to the given
                              words below:
                            </Typography>
                            <Typography className='text-text-disabled'>
                              {`${quiz[0]}, ${quiz[1]}, ${quiz[2]}`}
                            </Typography>
                          </div>
                          <div>
                            <Typography className='text-lg text-teal-500'>
                              Options:
                            </Typography>
                            <Typography>{option[0]}</Typography>
                            <Typography>{option[1]}</Typography>
                          </div>
                          <div>
                            <Typography className='text-teal-500'>
                              Correct Answer:{' '}
                              <span className='font-semibold text-text-primary'>
                                {option[correct - 1]}
                              </span>
                            </Typography>
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ref = collection(firestore, 'users');
  const users = await getDocs(ref);

  const paths = users.docs.map((user) => {
    return user.id;
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const userId = params?.slug;

  if (!userId || typeof userId !== 'string') {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      path: `users/${userId}/favorites`,
    },
  };
};

export default Favorites;
