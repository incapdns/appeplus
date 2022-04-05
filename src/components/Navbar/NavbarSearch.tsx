import '../../styles/components/navbar.scss';
import LogoBlack from '../../assets/Logo/HorizontalBlack.svg';
import { Link } from 'react-router-dom';
import { Login } from '../Login';
import { MenuNavbar } from './Menu';

export default function NavbarSearch() {
  return (
    <>
      <nav className="navbar navbar-expand-lg pull-right navbar-light border-bottom" id="navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={LogoBlack} alt="Logo Appe Plus" height={34} />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <MenuNavbar />
        </div>
      </nav>
      <Login />
    </>
  );
}