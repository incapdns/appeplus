import { useEffect, useState } from "react";
import '../../styles/components/navbar.scss';
import LogoBlack from '../../assets/Logo/HorizontalBlack.svg';
import { Link } from "react-router-dom";
import { Login } from "../Login";
import { MenuNavbar } from "./Menu";

export default function NavbarDefault() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 0);
    });
  }, []);

  return (
    <>
      <nav className={`navbar fixed-top navbar-expand-lg  pull-right ${scroll ? "navbar-light bg-light shadow" : "navbar-light"}`} id="navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={LogoBlack} alt="Logo Appe Plus" height={34} />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <MenuNavbar />
        </div>
      </nav>
      <Login />
    </>
  );
}