'use client'

import Link from "next/link"
import { JSX } from "react"
import { usePathname } from "next/navigation";

interface Props {
  path: string
  icon: JSX.Element
  title: string
}

export const BottomTabBarMenuItem = ({ path, icon, title }: Props) => {
  const pathName = usePathname()
  return (
    <Link 
      href={path}
      className={`flex flex-col items-center m-5 p-2  items-center border-b border-red-700 py-3 ${path === pathName ?  'bg-red-500' : ''} hover:bg-white/5 transition ease-linear duration-150`}
    >
      <div>
        { icon }
      </div>

      <div className="flex flex-col">
        <span className="text-lg font-bold text-sm text-white">{ title }</span>
      </div>
    </Link>
  )
}

