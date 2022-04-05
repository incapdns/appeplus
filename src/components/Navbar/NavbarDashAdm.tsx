import { useState } from "react";
import LogoDash from "../../assets/internas/logo-menu-dashboard.svg";
import LogoDashSimples from "../../assets/internas/logo-simplificado.svg";
import { FaFileContract, FaUsers } from "react-icons/fa";
import { BsBuilding, BsPlusSquare } from "react-icons/bs";
import { MdArrowForwardIos } from "react-icons/md";

import "../../styles/components/Navbar/navbarDashDark.scss";
import { Link } from "react-router-dom";
import { AiOutlinePieChart } from "react-icons/ai";

export const NavbarDashAdm = () => {
  const [menuBar, setMenuBar] = useState(false);
  return (
    <>
      <input
        type="checkbox"
        id="sidebar-toogle"
        checked={menuBar}
        onChange={({ target }) => setMenuBar(target.checked)}
      />
      <div className="sidebar" id="sidebar">
        <div className="sidebar-header">
          {menuBar ? (
            <div className="mt-3 brand">
              <a href="/">
              <img src={LogoDashSimples} alt="" />
              </a>
            </div>
          ) : (
            <div className="mt-3 brand">
              <a href="/">
              <img src={LogoDash} alt="" />
              </a>
            </div>
          )}
        </div>
        <label htmlFor="sidebar-toogle" className="arrow-bar">
          <MdArrowForwardIos fontSize={24} color={"#7A7A7A"} />
        </label>
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link to="/adm/dashboard">
                <span>
                  <AiOutlinePieChart fontSize={24} />
                </span>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/adm/imoveis">
                <span>
                  <BsBuilding fontSize={24} />
                </span>
                <span>Imóveis</span>
              </Link>
            </li>
            <li>
              <Link to="/adm/contratos">
                <span>
                  <FaFileContract fontSize={24} />
                </span>
                <span>Contratos</span>
              </Link>
            </li>
            <li>
              <Link to="/adm/corretores">
                <span>
                  <BsPlusSquare fontSize={24} />
                </span>
                <span>Corretores</span>
              </Link>
            </li>
            <li style={{ marginBottom: 15 }}>
              <Link to="/adm/clientes">
                <span>
                  <FaUsers fontSize={24} />
                </span>
                <span>Clientes</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
