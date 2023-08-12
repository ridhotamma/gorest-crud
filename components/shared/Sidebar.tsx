import { useSidebar } from "@/contexts/SidebarContext";

import navigationMenus, { IMenu } from "@/constants/navigationMenus";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const { visible, setVisible } = useSidebar();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleToggleSidebar = () => {
    setVisible((prev) => !prev);
  };

  const handleClickMenu = (index: number) => {
    setCurrentIndex(index);
    localStorage.setItem("sidebarIndex", String(index));
    handleToggleSidebar();
  };

  useEffect(() => {
    const storedIndex = localStorage.getItem("sidebarIndex");

    if (storedIndex !== null) {
      setCurrentIndex(parseInt(storedIndex, 10));
    }
  }, []);

  return (
    <div
      className={`${
        visible ? "translate-x-0" : "translate-x-full "
      } duration-300 transition-all z-[98] fixed top-0 w-full h-screen`}
    >
      <div
        onClick={handleToggleSidebar}
        className={`z-[98] opacity-50 w-full h-screen absolute top-0 left-0`}
      ></div>

      <div
        className={`w-[400px] shadow-2xl fixed right-0 z-[99] h-full p-4 bg-white flex flex-col`}
      >
        <div className="pb-6 flex justify-between items-center">
          <p>
            <b>Menu List</b>
          </p>
          <span
            onClick={handleToggleSidebar}
            className="cursor-pointer material-icons"
          >
            close
          </span>
        </div>
        <ul>
          {navigationMenus.map((menu, index) => {
            return (
              <li onClick={() => handleClickMenu(index)} key={index}>
                <Link
                  className={`${
                    currentIndex === index ? "bg-slate-600 text-white" : ""
                  } rounded-xl p-4 cursor-pointer flex gap-4 mb-2`}
                  href={menu.route}
                >
                  <span className="material-icons">{menu.icon}</span>
                  <p>{menu.label}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
