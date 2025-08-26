'use client'

import Image from 'next/image'
import React from 'react'
import { Comic, ComicCharacter } from '../interfaces/comic'
import { IsFavorite } from './IsFavorite'
import { Carousel } from '@/shared/components/Carousel'
import { ComicCharacterUi } from './ComicCharacter'
import Link from 'next/link'
import { useBreakpoint } from '@/shared/hooks/useBreakPoint'

interface Props {
  comic: Comic
  characters: ComicCharacter[]
}

export const ComicDetail = ({ comic, characters }: Props) => {
  const breakpoint = useBreakpoint()
  return (
    <div className="flex flex-col items-center justify-center md:justify-start md:items-start md:flex-row mt-5 text-slate-800">
      <div className="w-full flex flex-col items-center md:w-[30vw] justyfy-self-center center">
        <Image 
          key={comic.id}
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          width={['xs', 'sm'].includes(breakpoint) ? 250 : 400}
          height={['xs', 'sm'].includes(breakpoint) ? 500 : 800}
          alt={comic.title}
          priority={false} 
          style={{ height: 'auto' }}
        />
      </div>

      <div className="p-5 flex flex-col items-center md:items-start sm:w-full md:w-[50vw]">
        <h1 className="text-xl text-center md:text-left md:text-3xl">{ comic.title }</h1>
        <p className="mb-3 mt-3">{ comic.description }</p>

        <IsFavorite comic={comic} size='xl' />

      { characters.length > 0 && <h2 className="text-xl mt-3 text-center md:text-left">Caracteres</h2> }

        <div className="pt-5"></div>
        <Carousel>
          {
            characters.map(character => (
            <div key={character.id} style={{ width: 100, height: 100, margin: '0 0.25rem' }}>
                <ComicCharacterUi character={character} />
            </div>
            ))
          }
        </Carousel>

        <div className="pt-5"></div>
        <span className="bg-red-500 hover:bg-red-800 text-zinc-100 p-2 rounded-sm w-[13rem] mt-5 flex justify-center">
          <Link href="/dashboard/comics" className="text-center">Volver a listado de comics</Link>
        </span>
      </div>
    </div>
  )
}


