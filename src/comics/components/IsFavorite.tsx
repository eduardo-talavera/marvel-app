'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { toggleFavorite } from '@/store/comics/comics';
import React from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { Comic } from '../interfaces/comic';

export interface IsFavoriteProps {
  comic: Comic
  size: 'sm' | 'xl'
  justify?: 'start' | 'center'
}

export const IsFavorite = ({ comic, size, justify = 'start' }: IsFavoriteProps) => {
  const { id } = comic
  const isFavorite = useAppSelector(state => !!state.comics.favorites?.[id]);
  const dispatch = useAppDispatch();

  const onToggle = () => {
    dispatch( toggleFavorite(comic) );
  }

  const iconSize = size === 'sm' ? 20 : 40;
  
  return (
      <div
        className={`mt-3 justify-${justify} hover:bg-gray-100 flex items-center cursor-pointer`}
        onClick={onToggle}
      >
        <div className="text-red-600">
          {
          isFavorite 
            ? ( <IoHeart size={iconSize}/> ) 
            : ( <IoHeartOutline size={iconSize} /> )
          }
        </div>
        <div className="pl-3">
          <p className={`text-${size} font-medium text-gray-800 leading-none`}>
            {
            isFavorite 
              ? 'En tu lista de favoritos'
              : 'Agregar a favoritos'
            }
          </p>
        </div>
      </div>
  )
}

