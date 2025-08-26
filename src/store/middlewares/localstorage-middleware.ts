import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "..";
import { FAVORITE_COMICS } from "../comics/comics";

export const localStorageMiddleware = ( state: MiddlewareAPI ) => {

  return (next: Dispatch) => (action: Action) => {

    next(action);

    if (action.type === 'comics/toggleFavorite') {
      const { comics } = state.getState() as RootState;
      localStorage.setItem(FAVORITE_COMICS, JSON.stringify(comics));
      return;
    }
  }
}