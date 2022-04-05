import NavbarDark from "./NavbarDark";
import NavbarSearch from "./NavbarSearch";
import NavbarDefault from "./NavbarDefault";
import { iNavbar } from "../../@types";

export default function Navbar(props: iNavbar) {
  switch (props.type) {
    case 'dark':
      return <NavbarDark />
    case 'search':
      return <NavbarSearch />
    default:
      return <NavbarDefault />
  }
}