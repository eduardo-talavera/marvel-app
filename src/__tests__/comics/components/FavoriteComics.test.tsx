import React from "react";
import { render, screen } from "@testing-library/react";
import { Comic, FavoriteComics, NotFavorites } from "@/comics";
import { useAppSelector } from "@/store";

// 🔹 Mock de ComicsGrid (para no renderizar todo el grid real)
jest.mock("@/comics/components/ComicsGrid", () => ({
  ComicsGrid: ({ data }: { data: Comic[] }) => (
    <div data-testid="comics-grid">{`ComicsGrid con ${data.length} comics`}</div>
  ),
}));

// 🔹 Mock de useAppSelector para controlar el estado
jest.mock("@/store", () => ({
  useAppSelector: jest.fn(),
}));

describe("FavoriteComics", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debería renderizar ComicsGrid si hay favoritos", () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue([
      { id: 1, title: "Spider-Man" },
      { id: 2, title: "Iron Man" },
    ]);

    render(<FavoriteComics />);

    expect(screen.getByTestId("comics-grid")).toHaveTextContent(
      "ComicsGrid con 2 comics"
    );
    expect(
      screen.queryByText("No hay favoritos")
    ).not.toBeInTheDocument();
  });

  it("debería renderizar NotFavorites si no hay favoritos", () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue([]);

    render(<FavoriteComics />);

    expect(screen.getByText("No hay favoritos")).toBeInTheDocument();
    expect(screen.getByTestId("heart-icon")).toBeInTheDocument();
  });
});

describe("NotFavorites", () => {
  it("debería renderizar el ícono y el mensaje", () => {
    render(<NotFavorites />);

    expect(screen.getByText("No hay favoritos")).toBeInTheDocument();
    expect(screen.getByTestId("heart-icon")).toBeInTheDocument();
  });
});
