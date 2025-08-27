import React from "react";
import { render, screen } from "@testing-library/react";
import { SidebarMenuItem } from "@/shared/components/SidebarMenuItem";
import { IoHeart } from "react-icons/io5";

// Mock de next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

import { usePathname } from "next/navigation";

describe("SidebarMenuItem", () => {
  const path = "/dashboard/favorites";
  const title = "Favoritos";
  const icon = <IoHeart data-testid="icon" />;

  it("renderiza el link con el href y título correctos", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard/comics");

    render(<SidebarMenuItem path={path} title={title} icon={icon} />);

    const link = screen.getByRole("link", { name: /favoritos/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", path);

    const text = screen.getByText(title);
    expect(text).toBeInTheDocument();

    const iconRendered = screen.getByTestId("icon");
    expect(iconRendered).toBeInTheDocument();
  });

  it("aplica clase bg-red-500 cuando el path coincide con la ruta actual", () => {
    (usePathname as jest.Mock).mockReturnValue(path);

    render(<SidebarMenuItem path={path} title={title} icon={icon} />);

    const link = screen.getByRole("link", { name: /favoritos/i });
    expect(link).toHaveClass("bg-red-500");
  });

  it("no aplica bg-red-500 si el path no coincide con la ruta actual", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard/comics");

    render(<SidebarMenuItem path={path} title={title} icon={icon} />);

    const link = screen.getByRole("link", { name: /favoritos/i });
    expect(link).not.toHaveClass("bg-red-500");
  });
});
