'use client'

import { Provider } from "react-redux";
import { store } from './';
import { useEffect } from "react";
import { FAVORITE_COMICS, setFavoriteComics } from "./comics/comics";

interface Props {
  children: React.ReactNode;
}

export const MarvelProvider = ({ children }: Props) => {

  useEffect(() => {
    const { favorites } = JSON.parse(localStorage.getItem(FAVORITE_COMICS) ?? '{}');
    if (favorites) store.dispatch( setFavoriteComics(favorites) );
  }, []);

  return (
    <Provider store={ store }>
      { children }
    </Provider>
  )
}


