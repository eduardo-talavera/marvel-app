import { getMarvelComics } from "@/comics/actions/actions";
import { SearchableComicList } from "@/comics/components/SearchableComicList";

export default async function ComicsPage() {

  const comics = (await getMarvelComics()).filter(
    c => c.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
  );

  return (
    <div>
      <SearchableComicList data={comics} />
    </div>
  );
}