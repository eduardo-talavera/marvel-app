import { render, screen } from "@testing-library/react";
import { ComicDetail } from "@/comics/components/ComicDetail";
import { Comic, ComicCharacter } from "@/comics";
import React from "react";

// 🔹 Mock de dependencias

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
jest.mock('@/comics/components/IsFavorite', () => {
  return {
    __esModule: true,
    IsFavorite: () => <div data-testid="is-favorite">Fav-1</div>,
  };
});

jest.mock("@/shared/components/Carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode | React.ReactNode[] }) => <div data-testid="carousel">{children}</div>,
}));

jest.mock("@/comics/components/ComicCharacter", () => ({
  ComicCharacterUi: ({ character }: { character: ComicCharacter }) => (
    <div data-testid="character">{character.name}</div>
  ),
}));

jest.mock("@/shared/hooks/useBreakPoint", () => ({
  useBreakpoint: jest.fn(() => "md"), // Por defecto simulamos "md"
}));

// 🔹 Datos de prueba
const mockComic: Comic = {
  id: '1',
  title: "Avengers #1",
  description: "First Avengers comic",
  thumbnail: { path: "http://example.com/image", extension: "jpg" },
  characters: { items: [] }
};

const mockCharacters: ComicCharacter[] = [
  { id: '100', name: "Iron Man", thumbnail: { path: "", extension: "" } },
  { id: '200', name: "Captain America", thumbnail: { path: "", extension: "" } },
];

describe("ComicDetail", () => {
  it("renderiza título, descripción e imagen", () => {
    render(<ComicDetail comic={mockComic} characters={[]} />);
    
    expect(screen.getByRole("heading", { name: /Avengers #1/i })).toBeInTheDocument();
    expect(screen.getByText(/First Avengers comic/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Avengers #1/i)).toBeInTheDocument();
  });

  it("renderiza el componente de favoritos", () => {
    render(<ComicDetail comic={mockComic} characters={[]} />);
    expect(screen.getByTestId("is-favorite")).toHaveTextContent("Fav-1");
  });

  it("renderiza personajes si characters tiene elementos", () => {
    render(<ComicDetail comic={mockComic} characters={mockCharacters} />);
    
    expect(screen.getByText(/Caracteres/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("character")).toHaveLength(2);
    expect(screen.getByText("Iron Man")).toBeInTheDocument();
    expect(screen.getByText("Captain America")).toBeInTheDocument();
  });

  it("renderiza el link de volver al listado", () => {
    render(<ComicDetail comic={mockComic} characters={[]} />);
    
    const link = screen.getByRole("link", { name: /volver a listado de comics/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/dashboard/comics");
  });

  it("ajusta ancho/alto de imagen según breakpoint", () => {
    const { rerender } = render(<ComicDetail comic={mockComic} characters={[]} />);

    // Mock de hook a 'sm'
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useBreakpoint } = require("@/shared/hooks/useBreakPoint");
    useBreakpoint.mockReturnValue("sm");

    rerender(<ComicDetail comic={mockComic} characters={[]} />);
    const img = screen.getByAltText(/Avengers #1/i);

    expect(img).toHaveAttribute("width", "250");
    expect(img).toHaveAttribute("height", "500");
  });
});
