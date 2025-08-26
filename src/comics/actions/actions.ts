/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import crypto from "crypto";
import { Comic } from "@/comics";
import { ComicCharacter } from "../interfaces/comic";

const ts = new Date().getTime().toString();
const publicKey = process.env.MARVEL_PUBLIC_KEY as string
const privateKey = process.env.MARVEL_PRIVATE_KEY as string

const hash = crypto
  .createHash("md5")
  .update(ts + privateKey + publicKey)
  .digest("hex");

const params = new URLSearchParams({
   ts,
   apikey: publicKey,
   hash
});


const emptyComicResponse = {
  id: '',
  title: '',
  thumbnail: { path: '', extension: '' },
  characters: { items: [] },
  description: ''
}

export const getMarvelComics = async (): Promise<Comic[]> => {

    try {
    const response = await fetch(`https://gateway.marvel.com/v1/public/comics?${params.toString()}`, {
      cache: 'force-cache',
      next: { revalidate: 60 * 60 * 24 } // Revalida cada 24 horas
    });

    const { data }  = await response.json();
   
    const comics: Comic[] = data.results.map(
      (c: any) => ({ 
        id: c.id,
        title: c.title, 
        thumbnail: c.thumbnail 
      }) 
    );
    return comics
  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message);
    return [];
  }
}

export const getMarvelComicById = async (id: string):Promise<Comic> => {
    try {
    const response = await fetch(`https://gateway.marvel.com/v1/public/comics/${id}?${params.toString()}`, {
      cache: 'force-cache',
      next: { revalidate: 60 * 60 * 24 } 
    });
    const { data }   = await response.json();
  
    return data.results[0]
    
  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message);
    return emptyComicResponse;
  }
}

export const getCharacter = async (uri: string): Promise<ComicCharacter> => {
    try {
    const response = await fetch(uri + `?${params.toString()}`, {
      cache: 'force-cache',
      next: { revalidate: 60 * 60 * 24 }
    });

    const { data }  = await response.json();
    
    return data.results[0]
  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message);
    return {
      id: '',
      name: '',
      thumbnail: { path: '', extension: '' }
    };
  }
}


