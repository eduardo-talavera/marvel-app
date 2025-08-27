import React from "react";
import { render, screen } from "@testing-library/react";
import { BottomTabBar } from "@/shared/components/BottonTabBar";


// 🔹 Mock de BottomTabBarMenuItem
jest.mock("@/shared/components/BotomTabBarMenuItem", () => ({
  BottomTabBarMenuItem: ({ title }: { title: string }) => (
    <div data-testid="menu-item">{title}</div>
  ),
}));

describe("BottomTabBar Component", () => {
  it("renderiza el contenedor principal", () => {
    render(<BottomTabBar />)
    const menuDiv = document.getElementById("menu_bottom");
    expect(menuDiv).toBeInTheDocument();
  });

  it("renderiza todos los elementos de menú", () => {
    render(<BottomTabBar />);
    const items = screen.getAllByTestId("menu-item");
    expect(items.length).toBe(2); // Comics + Favoritos
    expect(items[0]).toHaveTextContent("Comics");
    expect(items[1]).toHaveTextContent("Favoritos");
  });
});
