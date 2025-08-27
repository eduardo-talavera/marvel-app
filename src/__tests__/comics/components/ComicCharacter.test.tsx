import React from "react";
import { render, screen } from "@testing-library/react";
import { ComicCharacterUi, type ComicCharacter } from "@/comics";


// Mock de next/image
jest.mock('next/image', () => {
  const ActualNextImage = jest.requireActual('next/image').default;
  return {
    __esModule: true,
    default: (props: React.ComponentProps<typeof ActualNextImage>) => <ActualNextImage {...props} unoptimized />,
  };
});

const mockCharacter: ComicCharacter = {
  id: '101',
  name: "Spider-Man",
  thumbnail: {
    path: "http://example.com/spiderman",
    extension: "jpg",
  }
};

describe("ComicCharacterUi", () => {
  it("debe renderizar la imagen con el nombre del personaje en alt", () => {
    render(<ComicCharacterUi character={mockCharacter} />);
    const img = screen.getByAltText("Spider-Man");
    expect(img).toBeInTheDocument();
  });

  it("debe tener la URL de la imagen correcta", () => {
    render(<ComicCharacterUi character={mockCharacter} />);
    const img = screen.getByAltText("Spider-Man") as HTMLImageElement;
    expect(img.src).toBe("http://example.com/spiderman.jpg");
  });

  it("debe aplicar el tooltip con el nombre del personaje", () => {
    render(<ComicCharacterUi character={mockCharacter} />);
    const img = screen.getByTitle("Spider-Man");
    expect(img).toBeInTheDocument();
  });

  it("debe tener el tamaño 100x100", () => {
    render(<ComicCharacterUi character={mockCharacter} />);
    const img = screen.getByAltText("Spider-Man");
    expect(img).toHaveAttribute("width", "100");
    expect(img).toHaveAttribute("height", "100");
  });
});
