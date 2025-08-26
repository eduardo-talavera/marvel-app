'use client'

import React from 'react'
import { Comic } from '@/comics'
import { ComicCard } from './ComicCard'

interface Props {
  data: Comic[]
}

export const ComicsGrid = ({ data }: Props) => {
  return (
       <div className="flex flex-wrap gap-10 item-center justify-center mb-5 pb-5">
        {
          data.map(comic => (
            <ComicCard 
              key={comic.id}
              comic={comic}
            />
          ))
        }
      </div>
  )
}


