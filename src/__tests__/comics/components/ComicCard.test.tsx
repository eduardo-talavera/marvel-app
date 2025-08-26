import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { ComicCard } from '../../../comics/components/ComicCard';
import { Comic } from '@/comics';

// Mocks necesarios antes de importar el componente
jest.mock('next/image', () => {
  const ActualNextImage = jest.requireActual('next/image').default;
  return {
    __esModule: true,
    default: (props: React.ComponentProps<typeof ActualNextImage>) => <ActualNextImage {...props} unoptimized />,
  };
});

jest.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ children, href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a href={href} {...rest}>{children}</a>,
  };
});

// Mock del componente IsFavorite (ruta relativa desde este test al componente)
jest.mock('../../../comics/components/IsFavorite', () => {
  return {
    __esModule: true,
    IsFavorite: () => <div data-testid="is-favorite" />,
  };
});


afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const mockComic: Comic = { 
  id: '123', 
  title: 'Mock Title',
  thumbnail: {
    path :'http://example.com/image',
    extension:'jpg'
  },
  description: '',
  characters: {
    items: [
      {
        resourceURI: 'https://gateway.marvel.com/v1/public/characters/1011010',
        name: "Spider-Man (Ultimate)"
      }
    ]
  } 
}

describe('ComicCard', () => {
  it('muestra el título del cómic', () => {
    render(<ComicCard comic={mockComic} />);
    expect(screen.getByText('Mock Title')).toBeInTheDocument();
  });

  it('muestra la imagen con src y alt correctos', () => {
    render(<ComicCard comic={mockComic} />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toBe('http://example.com/image.jpg');
    expect(img.getAttribute('alt')).toBe('Mock Comic Title');
  });

  it("muestra el enlace 'Saber mas' con href correcto", () => {
    render(<ComicCard comic={mockComic} />);
    const link = screen.getByRole('link', { name: /saber mas/i }) as HTMLAnchorElement;
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/dashboard/comics/123');
  });

  it('renderiza el componente IsFavorite', () => {
    render(<ComicCard comic={mockComic} />);
    expect(screen.getByTestId('is-favorite')).toBeInTheDocument();
  });

  it('el contenedor raíz contiene clases esperadas', () => {
    const { container } = render(<ComicCard comic={mockComic} />);
    const rootDiv = container.querySelector('div.mx-auto');
    expect(rootDiv).toBeTruthy();
    // verificación adicional de una clase concreta
    expect(rootDiv?.className).toContain('w-60');
  });
});