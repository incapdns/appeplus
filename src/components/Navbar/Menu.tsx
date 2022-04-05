import { Link } from "react-router-dom";
import { iDadosUsuario, iNavbar } from "../../@types";
import { MdOutlineAccountCircle } from "react-icons/md";
import { DropDownLogado } from "./DropdowLogado";
import { useEffect, useState } from "react";

export function MenuNavbar(props: iNavbar) {
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 0);
    });
  }, []);

  return (
    <div
      className={`collapse navbar-collapse ${scroll ? " cShadow" : "cWhite"}`}
      id="navbarMenu"
    >
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link
            to="/quemSomos"
            className={`nav-link ${props.dark ? "dark" : ""}`}
          >
            Quem Somos
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/cadastro/comprador"
            className={`nav-link ${props.dark ? "dark" : ""}`}
          >
            Quero Comprar{" "}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/cadastro/Anuncio"
            className={`nav-link ${props.dark ? "dark" : ""}`}
          >
            Quero Vender
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/cadastro/corretor"
            className={`nav-link ${props.dark ? "dark" : ""}`}
          >
            Quero ser Corretor
          </Link>
        </li>
        <li className={`nav-item user-link `}>
          {usuario.token ? (
            <DropDownLogado dark={props.dark} />
          ) : (
            <a
              className={`nav-link login ${props.dark ? "dark" : ""}`}
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#modalLogin"
            >
              <MdOutlineAccountCircle size={22} />
              Fazer login
            </a>
          )}
        </li>
      </ul>
    </div>
  );
}
