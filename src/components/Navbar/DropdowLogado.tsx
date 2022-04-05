import { MdOutlineAccountCircle } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import { iDadosUsuario, iNavbar, tipoUsuario } from "../../@types";

export function DropDownLogado(props: iNavbar) {
  const history = useHistory();
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );

  const PrimeiroNome = usuario.nomeCompleto
    ? usuario.nomeCompleto.substring(
      0,
      (usuario.nomeCompleto + " ").indexOf(" ")
    )
    : null;

  function Sair() {
    localStorage.clear();

    history.push("/");
    window.location.reload()
  }

  const dasboard = (tipo: number) => {
    if (tipo === tipoUsuario.corretor) return "/dashboard/corretor/clientes";
    else if (tipo === tipoUsuario.cliente) return "/dashboard/meus-imoveis";
    else return "/adm/imoveis";
  };

  return (
    <div className="btn-group group-user">
      <button
        type="button"
        className={`btn nav-link login dropdown-toggle d-flex align-items-center ${props.dark ? "dark" : ""
          }`}
        data-bs-toggle="dropdown"
        data-bs-display="static"
        aria-expanded="false"
      >
        <MdOutlineAccountCircle size={22} /> Olá, {PrimeiroNome}
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        {(usuario.tipo === tipoUsuario.corretor && usuario.codStatus == 1) || (usuario.tipo !== tipoUsuario.corretor) ?
          (
            <li>
              <Link to={dasboard(usuario.tipo)} className="dropdown-item">
                Espaço+
              </Link>
              {/* <Link to="/dashboard/corretor/clientes" className="dropdown-item">
                Espaço+
              </Link> */}
            </li>
          ) :
          ('')
        }

        {usuario.tipo === tipoUsuario.corretor && (
          <li>
            <Link
              className="dropdown-item"
              to={{
                pathname: "/cadastro/dadosCorretor",
                state: { edicao: true },
              }}
            >
              Editar perfil
            </Link>
          </li>
        )}
        {usuario.tipo === tipoUsuario.cliente && (
          <>
            {usuario.nivel !== 3 ? (
              <li>
                {usuario.nivel === 1 && (
                  <Link
                    className="dropdown-item"
                    to={{
                      pathname: "/cadastro/dadosComprador",
                      state: { edicao: true },
                    }}
                  >
                    Editar perfil
                  </Link>
                )}
                {usuario.nivel === 2 && (
                  <Link
                    className="dropdown-item"
                    to={{
                      pathname: "/cadastro/vendedor",
                      state: { edicao: true },
                    }}
                  >
                    Editar perfil
                  </Link>
                )}
              </li>
            ) : (
              <>
                <li>
                  <Link
                    className="dropdown-item"
                    to={{
                      pathname: "/cadastro/dadosComprador",
                      state: { edicao: true },
                    }}
                  >
                    Editar perfil comprador
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={{
                      pathname: "/cadastro/vendedor",
                      state: { edicao: true },
                    }}
                  >
                    Editar perfil vendedor
                  </Link>
                </li>
              </>
            )}
          </>
        )}
        <li>
          {usuario.nivel === 1 && (
            <Link
              className="dropdown-item"
              to={{
                pathname: "/cadastro/vendedor",
                state: { edicao: true },
              }}
            >
              Quero vender imóvel
            </Link>
          )}

          {usuario.nivel === 2 && (
            <Link
              className="dropdown-item"
              to={{
                pathname: "/cadastro/dadosComprador",
                state: { edicao: true },
              }}
            >
              Quero ser um comprador
            </Link>
          )}

        </li>
        <li>
          <Link
            className="dropdown-item"
            to={{
              pathname: "/usuario/alterarSenha",
              state: { edicao: true },
            }}
          >
            Alterar Senha
          </Link>
          
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button onClick={Sair} className="dropdown-item" type="button">
            Sair
          </button>
        </li>
      </ul>
    </div>
  );
}
