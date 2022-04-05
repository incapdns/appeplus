import {useState} from 'react'
import LogoDash from '../../assets/internas/logo-menu-dashboard.svg';
import LogoDashSimples from '../../assets/internas/logo-simplificado.svg';
import {AiOutlineDownload,AiOutlineSchedule,AiOutlineUnorderedList} from 'react-icons/ai'
import {CgFileDocument} from 'react-icons/cg'
import {HiOutlineUsers} from 'react-icons/hi'
import {IoSettingsSharp} from 'react-icons/io5'
import {BsFillChatLeftFill, BsFillHouseDoorFill, BsHouseDoor} from 'react-icons/bs'
import {MdArrowForwardIos} from 'react-icons/md'
import { Link } from "react-router-dom";

import '../../styles/components/Navbar/navbarDash.scss'
const NavbarDash = () => {
  const[menuBar, setMenuBar]= useState(false);

  return (
    <>
      <input type="checkbox"  id="sidebar-toogle" checked={menuBar} onChange={({target}) => setMenuBar(target.checked)} />
      <div className="sidebar" id="sidebarDashWhite">
        <div className="sidebar-header">
          {menuBar ? (
            <div className="brand">
              <a href="/">
              <img src={LogoDashSimples} alt="" />
              </a>
            </div>
          ):(
            <div className="brand">
              <a href="/">
              <img src={LogoDash} alt="" />
              </a>
            </div>
          )}
        </div>
        <label htmlFor="sidebar-toogle" className="arrow-bar-white">
            <MdArrowForwardIos fontSize={24} color={'#7A7A7A'}/>
        </label>
        <div className="sidebar-menu">
          <ul>
            {/* <li>
              <Link to="/dashboard/propostas">
                <span><AiOutlineDownload fontSize={24}/></span>
                <span>Propostas Recebidas</span>
              </Link>
            </li>
            <li>
              <a href="#">
                <span><CgFileDocument fontSize={24} /></span>
                <span>Contratos assinados</span>
              </a>
            </li> */}
            <li>
              <a href="/dashboard/MeusCorretores">
                <span><HiOutlineUsers fontSize={24}/></span>
                <span>Meus corretores</span>
              </a>
            </li>
            <li>
              <Link to="/dashboard/meus-imoveis">
                <span><BsFillHouseDoorFill fontSize={24}/></span>
                <span>Meus Imóveis à venda</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/meus-imoveis-pesquisados">
                <span><BsHouseDoor fontSize={24}/></span>
                <span>Meus imóveis de interesse</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/lista-agenda">
                <span><AiOutlineSchedule fontSize={24}/></span>
                <span>Minha agenda de visitas</span>
              </Link>
            </li>
            
            {/* <li>
              <a href="#">
                <span><IoSettingsSharp fontSize={24}/></span>
                <span>Configurações</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span><BsFillChatLeftFill fontSize={24}/></span>
                <span>Fale com a Appe+</span>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  )
}

export default NavbarDash
