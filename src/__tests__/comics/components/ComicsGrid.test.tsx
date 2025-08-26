import { render } from '@testing-library/react';
import { ComicsGrid } from '@/comics/components/ComicsGrid';
import { Comic } from '@/comics';
import { mockComics } from '@/comics/utils/constants';

jest.mock('@/comics/components/ComicCard', () => ({
  ComicCard: ({ comic }: { comic: Comic }) => <div data-testid="comic-card">{comic.title}</div>
}));

describe('ComicsGrid', () => {
  

  it('renders a ComicCard for each comic in data', () => {

    const { getAllByTestId } = render(<ComicsGrid data={mockComics} />);
    const cards = getAllByTestId('comic-card');
    expect(cards).toHaveLength(mockComics.length);
    expect(cards[0]).toHaveTextContent('Ultimate Spider-Man (2000) #110 (Mark Bagley Variant');
    expect(cards[1]).toHaveTextContent('Official Handbook of the Marvel Universe (2004) #10 (MARVEL KNIGHTS)');
  });

  it('renders container div with correct class names', () => {

    const { container } = render(<ComicsGrid data={mockComics} />);
    const div = container.querySelector('div');
    expect(div).toHaveClass('flex', 'flex-wrap', 'gap-10', 'item-center', 'justify-center', 'mb-5', 'pb-5');
  });

  it('renders nothing when data is empty', () => {

    const { queryAllByTestId } = render(<ComicsGrid data={[]} />);
    expect(queryAllByTestId('comic-card')).toHaveLength(0);
  });
});