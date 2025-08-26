export interface Comic {
  id: string
  title: string
  thumbnail: Thumbnail
  characters: Character
  description?: string
}

export type Character = {
 items: CharacterItem[]
}

export type CharacterItem = {
  resourceURI: string
  name: string
}

export interface ComicCharacter {
  id: string
  name: string
  thumbnail: Thumbnail
}

type Thumbnail = { path: string, extension: string }