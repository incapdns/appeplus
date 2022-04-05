import { useState } from "react";
import LogoDash from "../../assets/internas/logo-menu-dashboard.svg";
import LogoDashSimples from "../../assets/internas/logo-simplificado.svg";
import {
  FaRegCalendarAlt,
  FaDollarSign,
  FaRegStar,
  FaFileContract,
  FaGratipay,
} from "react-icons/fa";
import { HiOutlineUsers, HiOutlineChartPie } from "react-icons/hi";
import { IoSettingsSharp, IoBriefcase } from "react-icons/io5";
import { BsFillChatLeftFill, BsBuilding, BsPlusSquare } from "react-icons/bs";
import { MdArrowForwardIos, MdWorkspaces } from "react-icons/md";

import "../../styles/components/Navbar/navbarDashDark.scss";
import { Link } from "react-router-dom";
import { AiOutlineSchedule } from "react-icons/ai";
const NavbarDashCorretor = () => {
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
            {/* <li>
              <a href="/dashboard">
                <span>
                  <HiOutlineChartPie fontSize={24} />
                </span>
                <span>Dashboards</span>
              </a>
            </li> */}
            <li>
              <a href="/dashboard/agenda">
                <span>
                  <FaRegCalendarAlt fontSize={24} />
                </span>
                <span>Agenda</span>
              </a>
            </li>
            <li>
              <Link to="/dashboard/transacoes">
                <span>
                  <FaDollarSign fontSize={24} />
                </span>
                <span>Comissões</span>
              </Link>
            </li>
            <li>
              <a href="/dashboard/corretor/clientes">
                <span>
                  <HiOutlineUsers fontSize={24} />
                </span>
                <span>Clientes</span>
              </a>
            </li>
            <li>
              <a href="/dashboard/corretor/imoveis">
                <span>
                  <BsBuilding fontSize={24} />
                </span>
                <span>Imóveis</span>
              </a>
            </li>
            <li>
              <Link to="/dashboard/corretor/contratos">
                <span>
                  <FaFileContract fontSize={24} />
                </span>
                <span>Contratos</span>
              </Link>
            </li>
            {/* <li>
              <a href="#">
                <span>
                  <IoBriefcase fontSize={24} />
                </span>
                <span>Carreiras</span>
              </a>
            </li> */}
            <li>
              <a href="/dashboard/suas-avaliacoes">
                <span>
                  <FaGratipay fontSize={24} />
                </span>
                <span>Avaliações</span>
              </a>
            </li>
            {/* <li>
              <a href="#">
                <span>
                  <FaRegStar fontSize={24} />
                </span>
                <span>Eventos</span>
              </a>
            </li> */}
            <li>
              <a href="/dashboard/seus-tokens">
                <span>
                  <BsPlusSquare fontSize={24} />
                </span>
                <span>Indica+</span>
              </a>
            </li>
            <li>
              <a href="/dashboard/corretor/lista-agenda">
                <span>
                  <AiOutlineSchedule fontSize={24}/>
                </span>
                <span>Lista de Agendamento</span>
              </a>
            
            </li>
            <div
              className="cod-md-2 line-gray"
              style={{ marginRight: 12, marginLeft: 12 }}
            ></div>
            {/* <li style={{ marginTop: 15 }}>
              <a href="#">
                <span>
                  <IoSettingsSharp fontSize={24} />
                </span>
                <span>Configurações</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <BsFillChatLeftFill fontSize={24} />
                </span>
                <span>Fale com a Appe+</span>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavbarDashCorretor;
