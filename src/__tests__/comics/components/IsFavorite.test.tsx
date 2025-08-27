// __tests__/IsFavorite.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { IsFavorite } from "@/comics/components/IsFavorite";
import { toggleFavorite } from "@/store/comics/comics";
import { Comic } from "@/comics";

type State = {
  comics: {
    favorites: {
      [id: string]: Comic
    }
  }
}

// Mock de store hooks
jest.mock("@/store", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const { useAppDispatch, useAppSelector } = jest.requireMock("@/store");

describe("IsFavorite Component", () => {
  const mockComic = {
    id: '1',
    title: "Amazing Spiderman",
    description: "Un gran cómic",
    thumbnail: { path: "path/image", extension: "jpg" },
  } as Comic;

  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("muestra 'Agregar a favoritos' cuando el cómic no es favorito", () => {
    (useAppSelector as jest.Mock).mockImplementation((selectorFn: (state: State) => State) =>
      selectorFn({ comics: { favorites: {} } })
    );

    render(<IsFavorite comic={mockComic} size="xl" />);

    expect(screen.getByText("Agregar a favoritos")).toBeInTheDocument();
    expect(screen.getByTestId("heart-icon-outline")).toBeInTheDocument();
  });

  it("muestra 'En tu lista de favoritos' cuando el cómic SÍ es favorito", () => {
    (useAppSelector as jest.Mock).mockImplementation((selectorFn: (state: State) => State) =>
      selectorFn({ comics: { favorites: { '1': mockComic } } })
    );

    render(<IsFavorite comic={mockComic} size="xl" />);

    expect(screen.getByText("En tu lista de favoritos")).toBeInTheDocument();
  });

  it("ejecuta dispatch(toggleFavorite) al hacer click", () => {
    (useAppSelector as jest.Mock).mockImplementation((selectorFn: (state: State) => State) =>
      selectorFn({ comics: { favorites: {} } })
    );

    render(<IsFavorite comic={mockComic} size="xl" />);

    fireEvent.click(screen.getByText("Agregar a favoritos"));

    expect(mockDispatch).toHaveBeenCalledWith(toggleFavorite(mockComic));
  });
});
