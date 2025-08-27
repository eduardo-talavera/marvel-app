
import React from "react";
import { IoHeart, IoScan } from "react-icons/io5";
import { SidebarMenuItem } from "./SidebarMenuItem";

const menuItems = [
  {
    path: "/dashboard/comics",
    icon: <IoScan size={30}/>,
    title: "Comics",
  },
  {
    path: "/dashboard/favorites",
    icon: <IoHeart size={30}/>,
    title: "Favoritos",
  },
];

export const Sidebar = () => {
  return (
    <div
      id="menu"
      style={{ width: 400 }}
      className="bg-zinc-900 min-h-screen z-10 text-slate-300 w-64 left-0 overflow-y-clip hidden md:block"
    >
      <div id="logo" className="my-4 px-6">
        <img src="/Marvel-Logo-2000-2012.png" alt="logo" role="img" />
        <p className="text-slate-500 text-md mt-5">
          Administra tus comics
        </p>
      </div>

      <div id="nav" className="w-full px-6">
        {
            menuItems.map(item => (
                <SidebarMenuItem
                    key={item.path} 
                    {...item} 
                />
            ))
        }
      </div>
    </div>
  );
};
