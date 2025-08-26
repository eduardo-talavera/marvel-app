import React from 'react'
import type { ComicCharacter } from '../interfaces/comic'
import Image from 'next/image'

interface Props {
  character: ComicCharacter
}

export const ComicCharacterUi = ({ character }: Props) => {
  return (
    <div className='mx-1'>
      <Image 
        key={character.id}
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        width={100}
        height={100}
        style={{ width: 100, height: 100 }}
        alt={character.name}
        priority
        className='rounded-md'
        data-toggle="tooltip"
        data-placement="top"
        title={character.name}
      />
    </div>
  )
}


