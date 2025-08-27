'use client';

import React, { useState } from 'react'
import { ComicsGrid } from './ComicsGrid';
import { useAppSelector } from '@/store';
import { IoHeartOutline } from 'react-icons/io5';

export const FavoriteComics = () => {
  const favoriteComics = useAppSelector(state => Object.values(state.comics.favorites));
  const [comics,] = useState(favoriteComics);

  return <>
    {
      favoriteComics.length 
        ? <ComicsGrid data={comics} />
        : <NotFavorites />
    }
  </>
}

export const NotFavorites = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoHeartOutline size={100} className="text-red-500" data-testid="heart-icon" />
      <span className='text-center md:text-left'>No hay favoritos</span>
    </div>
  )
}

