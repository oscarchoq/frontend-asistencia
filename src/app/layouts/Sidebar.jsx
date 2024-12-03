import { useAuth } from "@/context/AuthContext";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { MdOutlineSchool } from "react-icons/md";
import { BiCalendar } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuHome } from "react-icons/lu";

const links = [
  { name: "Home", href: "", icon: LuHome, roles: [1, 2, 3] },
  { name: "estudiante", href: "estudiante", icon: PiStudentFill, roles: [1] },
  { name: "docente", href: "docente", icon: GiTeacher, roles: [1] },
  { name: "periodo", href: "periodoacademico", icon: BiCalendar, roles: [1] },
  {
    name: "aperturar curso",
    href: "aperturacurso",
    icon: FaPeopleGroup,
    roles: [1],
  },
  { name: "Clases", href: "clase", icon: MdOutlineSchool, roles: [2, 3] },
];

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { userSession } = useAuth();

  // Filtrar enlaces según los permisos del usuario
  const filteredLinks = links.filter(
    (link) => link.roles.includes(userSession?.TipoPersonaID) // Asegurarse de que el rol tenga acceso
  );

  return (
    <>
      <div
        className={`text-dashboard_sidebar-100 xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-dashboard_sidebar-500 p-4 flex flex-col justify-between z-50 transition-all dark:bg-slate-950 ${
          showMenu ? "left-0" : "-left-full"
        }`}
      >
        <div>
          {/* Cabezera */}
          <div className="flex items-center justify-center p-2 -ml-4">
            {/* <div> */}
            <a
              href=""
              className="text-2xl font-bold flex items-center lg:ml-2.5"
            >
              {/* Logo */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="h-6 w-6"
              >
                <rect width="256" height="256" fill="none"></rect>
                <line
                  x1="208"
                  y1="128"
                  x2="128"
                  y2="208"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
                <line
                  x1="192"
                  y1="40"
                  x2="40"
                  y2="192"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
              </svg>
              {/* Nombre */}
              <span className="self-center whitespace-nowrap ml-2"> ESIS</span>
            </a>
          </div>

          {/* Contenido */}
          <div className="flex-1 divide-y space-y-1 mt-9">
            <ul className="">
              {filteredLinks.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-dashboard_sidebar-900 transition-colors text-base capitalize font-normal p-2 ${
                        isActive ? "text-white" : ""
                      }`
                    }
                  >
                    {link.icon && (
                      <link.icon className="text-dashboard_primary w-5 h-5" />
                    )}
                    <span className="">{link.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`xl:hidden fixed z-49 w-[20%] md:w-[60%] lg:w-[70%] h-full ${
          showMenu ? "right-0" : "-right-full"
        } transition-all bg-slate-100 opacity-50 dark:bg-slate-950`}
      />
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="xl:hidden fixed bottom-4 right-4 bg-primary text-black p-3 rounded-full z-50"
      >
        {showMenu ? (
          <Cross1Icon className="text-white dark:text-black" />
        ) : (
          <HamburgerMenuIcon className="text-white dark:text-black" />
        )}
      </button>
    </>
  );
};

export default Sidebar;
