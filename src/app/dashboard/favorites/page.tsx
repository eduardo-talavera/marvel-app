import { FavoriteComics } from "@/comics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Favoritos',
  description: 'Listado de Comics favoritos'
}


export default async function PokemonsPage() {
  
  return (
    <div className="flex flex-col">
      <span className="text-2xl text-center md:text-left md:text-3xl mr-2 mb-2">
        Listado de Comics favoritos
      </span>
     <FavoriteComics />
    </div>
  );
}

