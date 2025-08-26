
import React from "react";
import { IoHeart, IoScan } from "react-icons/io5";
import { BottomTabBarMenuItem } from "./BotomTabBarMenuItem";

const menuItems = [
  {
    path: "/dashboard/comics",
    icon: <IoScan size={25}/>,
    title: "Comics",
  },
  {
    path: "/dashboard/favorites",
    icon: <IoHeart size={25}/>,
    title: "Favoritos",
  },
];

export const BottomTabBar = () => {
  return (
    <div
      id="menu_botton"
      style={{ width: '100vw' }}
      className="absolute bottom-[-0.5rem] left-0 right-0 bg-zinc-900 z-10 text-slate-300 h-[7rem] block md:hidden"
    >
   
      <div id="nav" className="px-6 flex justify-center">
        {
            menuItems.map(item => (
                <BottomTabBarMenuItem
                    key={item.path} 
                    {...item} 
                />
            ))
        }
      </div>
    </div>
  );
};