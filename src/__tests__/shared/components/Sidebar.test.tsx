import React from "react";
import { render, screen } from "@testing-library/react";
import { Sidebar } from "@/shared";

// 🔹 Mock del componente SidebarMenuItem
jest.mock("@/shared/components/SidebarMenuItem", () => ({
  SidebarMenuItem: ({ title }: { title: string }) => (
    <div data-testid="menu-item">{title}</div>
  ),
}));

describe("Sidebar Component", () => {
  it("renderiza el logo y texto de bienvenida", () => {
    render(<Sidebar />);

    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/Marvel-Logo-2000-2012.png");

    const text = screen.getByText(/administra tus comics/i);
    expect(text).toBeInTheDocument();
  });

  it("renderiza todos los elementos de menú", () => {
    render(<Sidebar />);
    
    const items = screen.getAllByTestId("menu-item");
    expect(items.length).toBe(2); // Comics + Favoritos
    expect(items[0]).toHaveTextContent("Cómics");
    expect(items[1]).toHaveTextContent("Favoritos");
  });
});
