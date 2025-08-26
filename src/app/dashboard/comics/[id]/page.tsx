
import { getCharacter, getMarvelComicById } from "@/comics/actions/actions";
import { ComicDetail } from "@/comics/components/ComicDetail";
import { ComicCharacter } from "@/comics/interfaces/comic";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

// esta linea se ejecuta solamente en build time, genera el numero de paginas estaticas dadas por el tamaño del array retornado
export async function generateStaticParams() {

  const staticComics = Array.from({ length: 14 }).map((v, i) => `${i + 1}`);

  return staticComics.map(id => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params
    const { title } = await getMarvelComicById(id);

    return {
      title: `#${ id } - ${ title }`,
      description: `${ title }`
    }
  } catch (error) {
    console.log(error);
     return {
      title: 'Pagina de comic',
      description: 'Descripcion del comic'
    }
  }
}

export default async function ComicPage({ params }: Props) {

  const { id } = await params;
  const comic = await getMarvelComicById(id);

  const characteresRequests: Promise<ComicCharacter>[] = []

  comic.characters.items.forEach(item => {
    characteresRequests.push(getCharacter(item.resourceURI))
  })
  
  const allCharacteres = await Promise.all(characteresRequests)

  return (
    <ComicDetail 
      comic={comic} 
      characters={allCharacteres} 
    />
  );
}