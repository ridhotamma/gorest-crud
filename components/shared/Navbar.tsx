"use client";

import { useSidebar } from "@/contexts/SidebarContext";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { setVisible: setSidebarVisible } = useSidebar();

  const handleOpenSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div className="sticky z-[95] top-0 text-white w-full h-[100px] bg-blue-700 px-4">
      <div className="w-full h-full flex justify-between items-center">
        <Link href={"/"} className="p-4 flex gap-4 items-center">
          <Image
            src={"/synapsis.png"}
            width={40}
            height={40}
            alt="synapsis.id image"
          ></Image>
          <p>
            <b>Synapsis Challenge</b>
          </p>
        </Link>
        <div onClick={handleOpenSidebar} className="cursor-pointer p-4">
          <span className="material-icons">menu</span>
        </div>
      </div>
    </div>
  );
}
