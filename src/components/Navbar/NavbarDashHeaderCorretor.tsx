import React from "react";
import { MdArrowForwardIos, MdOutlineAccountCircle } from "react-icons/md";
import "../../styles/components/Navbar/navbarDashHeader.scss";

import { GoThreeBars } from "react-icons/go";
import { iDadosUsuario } from "../../@types";
import { Link, useHistory } from "react-router-dom";
import { DropDownLogado } from "./DropdowLogado";

const NavbarDashHeaderCorretor = () => {
  const history = useHistory();
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appeDigital/usuario") || "{}"
  );
  const PrimeiroNome = usuario.nomeCompleto
    ? usuario.nomeCompleto.substring(
        0,
        (usuario.nomeCompleto + " ").indexOf(" ")
      )
    : null;

  // dataAtual
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const dataAtual = dia + "/" + mes + "/" + ano;

  return (
    <header id="navbar-header-dashboard">
      <div className="container-fluid d-flex justify-content-between align-content-center py-4 px-4 mb-4">
        <label
          id="sidebarToggleTop"
          htmlFor="sidebar-toogle"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <GoThreeBars />
        </label>
        <div className="d-flex content-user">
          <p className="saudacao">Bem-vindo {PrimeiroNome}. </p>
          <p>Este é o seu menu no dia {dataAtual}</p>
        </div>
        <div className="d-flex align-items-center">
          <DropDownLogado />
        </div>
      </div>
    </header>
  );
};

export default NavbarDashHeaderCorretor;
