'use client'

import Link from "next/link";
import Image from "next/image";
import { Comic } from "../interfaces/comic";
import { IsFavorite } from "./IsFavorite";

interface Props {
  comic: Comic;
}

export const ComicCard = ({ comic }: Props) => {
  const { title, id } = comic;

  return (
    <div className="mx-auto right-0 mt-2 w-60">
      <div className="flex flex-col overflow-hidden">
        <div className="flex flex-col items-center justify-center text-center p-6">
          <Image 
            key={comic.id}
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            width={200}
            height={400}
            alt={comic.title}
            priority 
          />
          <p className="pt-2 text-lg font-semibold text-zinc-500 capitalize h-[9rem]">{ title }</p>
          <div className="mt-5">
            <Link
              href={`/dashboard/comics/${id}`}
              className="border rounded-sm py-2 px-4 text-xs font-semibold text-zinc-900 hover:bg-zinc-900 hover:text-zinc-100">
              Saber mas
            </Link>
          </div>
        </div>
        <div className="border-b">
          <IsFavorite comic={comic} size='sm' justify='center' />
          <div className="pb-3"></div>
        </div>
      </div>
    </div>
  );
};
