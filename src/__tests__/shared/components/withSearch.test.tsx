import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { withSearch } from "@/shared";

type Item = {
  id: number
  name: string
}
// Datos de prueba
const mockData: Item[] = [
  { id: 1, name: "Spider-Man" },
  { id: 2, name: "Iron Man" },
  { id: 3, name: "Captain America" },
];

// Componente dummy para envolver
const DummyComponent = ({ data }: { data: Item[] }) => (
  <ul data-testid="list">
    {data.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);

describe("withSearch HOC", () => {
  const getLabel = (item: typeof mockData[0]) => item.name;
  const Wrapped = withSearch(DummyComponent, getLabel);

  it("renderiza input y componente envuelto", () => {
    render(<Wrapped data={mockData} />);
    
    const input = screen.getByPlaceholderText(/buscar/i);
    expect(input).toBeInTheDocument();

    const list = screen.getByTestId("list");
    expect(list.children.length).toBe(3); // Todos los elementos inicialmente
  });

  it("filtra correctamente los elementos según el input", () => {
    render(<Wrapped data={mockData} />);
    
    const input = screen.getByPlaceholderText(/buscar/i);
    fireEvent.change(input, { target: { value: "iron" } });

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(1);
    expect(listItems[0]).toHaveTextContent("Iron Man");
  });

  it("no muestra elementos que no coincidan con la búsqueda", () => {
    render(<Wrapped data={mockData} />);
    
    const input = screen.getByPlaceholderText(/buscar/i);
    fireEvent.change(input, { target: { value: "thor" } });

    const list = screen.getByTestId("list");
    expect(list.children.length).toBe(0);
  });
});
