import React from "react";
import { useSWRConfig, Key, Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";

interface IStaticProps {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const useTodo = () => {
  const fetcher = async ({url, args}: {url: Key, args: any}): Promise<Fetcher> => {
    console.log(url);
    const response = await fetch(url!.toString(), args);
    const results = response.json();

    return results;
  };

  const { mutate, cache } = useSWRConfig();

  const { data, error } = useSWRImmutable(
    {
      url: "https://jsonplaceholder.typicode.com/todos",
      args: {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      },
    },
    fetcher
  );

  console.log(cache.get("https://jsonplaceholder.typicode.com/todos"));

  return {
    todo: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const staticProps = (props: IStaticProps[]) => {
  //   const fetcher = async (args: string) => {
  //     const response = await fetch(args);
  //     const results = response.json();

  //     return results;
  //   };

  //   const { data, error } = useSWR(
  //     "https://jsonplaceholder.typicode.com/todos/1",
  //     fetcher
  //   );

  //   if (error) return <div>failed to load</div>;
  //   if (!data) return <div>loading...</div>;

  // render data
  //   console.log(data);

  const { todo, isLoading } = useTodo();

  if (isLoading) return <div>loading...</div>;

  console.log(todo);

  return <div>staticProps</div>;
};

// export const getStaticProps = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/todos");
//   const results = await res.json();

//   return {
//     props: { results },
//   };
// };

// export const getServerSideProps = async (context: any) => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/todos");
//   const results = await res.json();

//   return {
//     props: { results },
//   };
// };

export default staticProps;
