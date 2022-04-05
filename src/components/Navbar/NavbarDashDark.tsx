import { useState } from 'react'
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdWorkspacesFilled,
  MdDataUsage,
  MdCalendarToday,
  MdAttachMoney,
  MdPeopleAlt,
  MdApartment
} from 'react-icons/md'

import LogoDash from '../../assets/Logo/logo-vertical-white.svg';
import LogoDashSimples from '../../assets/Logo/logo-vertical-white-min.svg';

import '../../styles/components/Navbar/navbarDashDark.scss'
import { Link } from 'react-router-dom';
export function NavbarDashDark() {
  const [menuBar, setMenuBar] = useState(false);

  return (
    <>
      <input type="checkbox" id="sidebar-toogle" checked={menuBar} onChange={({ target }) => setMenuBar(target.checked)} />
      <div className="sidebar" id="sidebar">
        <div className="sidebar-header">
          {menuBar ? (
            <div className="brand">
              <img src={LogoDashSimples} alt="" />
            </div>
          ) : (
            <div className="brand">
              <img src={LogoDash} alt="" />
            </div>
          )}
        </div>
        <label htmlFor="sidebar-toogle" className="arrow-bar">
          {menuBar ? <MdArrowForwardIos size={20} /> : <MdArrowBackIos size={20} />}
        </label>
        <div className="sidebar-menu">
          <ul>
            <li>
              <a href="#">
                <span><MdWorkspacesFilled size={24} /></span>
                <span>Workspace</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span><MdDataUsage size={24} /></span>
                <span>Dashboards</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span><MdCalendarToday size={24} /></span>
                <span>Agenda</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span><MdAttachMoney size={24} /></span>
                <span>Comissões</span>
              </a>
            </li>

            <li>
              <Link to="/dashboard/corretor/negociacoes">
                <span><MdPeopleAlt size={24} /></span>
                <span>Clientes</span>
              </Link>
            </li>
            <li>
              <a href="#">
                <span><MdApartment size={24} /></span>
                <span>Imóveis</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
