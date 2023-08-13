import { useSidebar } from "@/contexts/SidebarContext";

import navigationMenus, { IMenu } from "@/constants/navigationMenus";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useEffect } from "react";

export default function Sidebar() {
  const { visible, setVisible } = useSidebar();

  const handleToggleSidebar = () => {
    setVisible((prev) => !prev);
  };

  const validateMatchedRoute = (menu: IMenu) => {
    const path = usePathname()
    return path === menu.path
  }

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  return (
    <div
      className={`${
        visible ? "translate-x-0" : "translate-x-full "
      } duration-300 transition-all z-[98] fixed top-0 w-full h-screen`}
    >
      <div
        onClick={handleToggleSidebar}
        className={`z-[98] opacity-60 w-full h-screen absolute top-0 left-0`}
      ></div>

      <div
        className={`w-screen md:w-[400px] shadow-2xl fixed right-0 z-[99] h-full p-4 bg-white flex flex-col`}
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
              <li onClick={handleToggleSidebar} key={index}>
                <Link
                  className={`${
                    validateMatchedRoute(menu) ? "bg-slate-600 text-white" : ""
                  } rounded-xl p-4 cursor-pointer flex gap-4 mb-2`}
                  href={menu.path}
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
