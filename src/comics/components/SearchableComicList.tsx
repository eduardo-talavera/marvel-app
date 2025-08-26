'use client'

import { withSearch } from '@/shared';
import React from 'react'
import { ComicsGrid } from './ComicsGrid';
import { Comic } from '@/comics';

interface Props<T> {
  data: T[]
}

export const SearchableComicList = ({ data }: Props<Comic>) => {

  const SearchableComicsListComponent = withSearch(ComicsGrid, (comic) => comic.title);
  
  return (
   <SearchableComicsListComponent data={data} />
  )
}

