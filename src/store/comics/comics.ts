import { Comic } from '@/comics';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ComicState {
  favorites: { [key: string]: Comic }
}

export const FAVORITE_COMICS = 'favorite-comics';

const initialState: ComicState = {
  favorites: {}
}


const comicSlice = createSlice({
  name: 'comics',
  initialState,
  reducers: {
    setFavoriteComics(state, action: PayloadAction<{[key: string]: Comic}>) {
      state.favorites = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<Comic>) {
      const comic = action.payload
      const { id } = comic

      if (!!state.favorites[id]) {
        delete state.favorites[id]
      } else {
        state.favorites[id] = comic
      }
    }
  }
});

export const {  toggleFavorite, setFavoriteComics } = comicSlice.actions

export default comicSlice.reducer