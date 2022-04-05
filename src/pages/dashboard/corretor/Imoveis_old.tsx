import "../../../styles/pages/dashboard/corretor/clientes.scss";
import NavbarDashHeader from "../../../components/Navbar/NavbarDashHeader";
import { NavbarDashDark } from "../../../components/Navbar/NavbarDashDark";
import {
  MdMailOutline,
  MdMoreHoriz,
  MdOutlineAccountCircle,
  MdOutlineBed,
  MdOutlineDirectionsCar,
  MdOutlineOtherHouses,
  MdRefresh,
  MdSearch,
  MdSwapHoriz,
} from "react-icons/md";
import { IoOptions } from "react-icons/io5";
import {
  BsBuilding,
  BsFacebook,
  BsPlusLg,
  BsQuestionCircle,
  BsWhatsapp,
} from "react-icons/bs";
import { RiArrowRightUpLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaBath, FaSwimmingPool } from "react-icons/fa";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { iDadosUsuario } from "../../../@types";
import { useHistory } from "react-router";

export function DashboardImoveis() {
  const [tipoNegociacao, setTipoNegociacao] = useState("imovel");
  const history = useHistory();
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );

  function checaUsuarioLogado() {
    if (!usuario.token || usuario.codStatus !== 1) {
      window.alert("Você precisar estar logado e aprovado para acessar este menu!");
      history.push("/");
    }
  }

  useEffect(() => {
    checaUsuarioLogado();
  }, []);

  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <IoIosArrowForward size={36} />
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <IoIosArrowBack size={36} />
      </div>
    );
  }

  const settingSlide = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    className: "slides",
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <NavbarDashDark />
      <div className="main-content" id="dashboard-clientes">
        <NavbarDashHeader />
        <div className="container">
          <div className="d-flex justify-content-between align-items-center my-4">
            <h2>Últimas Negociações</h2>
            <div className="segmented-control">
              <Link
                to="/dashboard/corretor/clientes"
                className={`item ${
                  tipoNegociacao === "cliente" ? "active" : ""
                }`}
                onClick={() => setTipoNegociacao("cliente")}
              >
                Clientes
              </Link>
              <Link
                to="/dashboard/corretor/imoveis"
                className={`item ${
                  tipoNegociacao === "imovel" ? "active" : ""
                }`}
                onClick={() => setTipoNegociacao("imovel")}
              >
                Imóveis
              </Link>
            </div>
          </div>
          <div className="body">
            <div className="row mb-3">
              <div className="col-lg-9">
                <div className="mb-3">
                  <div className="form-control-icon">
                    <MdSearch size={24} />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Busque por nome"
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="mb-3 d-grid">
                  <button type="button" className="btn btn-primary">
                    Encontrar transação <MdSearch />
                  </button>
                </div>
              </div>
            </div>
            <div className="box-filtros mb-3">
              <div className="row">
                <div className="col-lg-3 mb-3 mb-lg-0">
                  <select
                    className="form-select"
                    aria-label="Escolha o valor"
                    defaultValue="1"
                    // onChange={(e) => setValor(e.target.value)}
                  >
                    <option value="1">Escolha o valor</option>
                  </select>
                </div>
                <div className="col-lg-3 mb-3 mb-lg-0">
                  <select
                    className="form-select"
                    aria-label="Escolha o tipo"
                    // defaultValue={tipoQueryParams || ""}
                    // onChange={(e) => setTipo(e.target.value)}
                  >
                    <option value="">Status do Lead</option>
                  </select>
                </div>
                {/* <div className="col-lg-3 mb-3 mb-lg-0">

                  <select className="form-select" aria-label="Escolha o número de quartos" defaultValue=""
                  // onChange={(e) => setQuartos(e.target.value)}
                  >
                    <option value="">Status do contrato</option>
                  </select>

                </div> */}

                {/* <div className="col-lg-3 d-flex justify-content-lg-end">
                  <button type="button" className="btn btn-primary bt-filtro">
                    <IoOptions size={22} />
                    Mais filtros
                  </button>
                </div> */}
              </div>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <div className="tipo">
                Tipo de transação:
                <select name="tipo" id="tipo">
                  <option value="1">Venda direta</option>
                  <option value="2">Compra</option>
                </select>
              </div>
              <div className="ordem">
                Ordenar por:
                <select name="ordem" id="ordem">
                  <option value="">Valor</option>
                </select>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Status do imóvel</th>
                  <th scope="col">Valor</th>
                  <th scope="col" className="center">
                    Termometro
                  </th>
                  <th scope="col" className="center">
                    Clientes
                  </th>
                  <th scope="col" className="center">
                    Mais sobre
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <BsBuilding size={22} /> Av. Savassi 750
                  </td>
                  <td className="status">
                    <MdSwapHoriz size={16} color="#4bb7f1" />
                    Em negociação
                  </td>
                  <td>R$ 5.750.000,00</td>
                  <td>
                    <div className="progress" style={{ height: 4 }}>
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: "90%" }}
                        aria-valuenow={25}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                  </td>
                  <td className="center">3</td>
                  <td className="center">
                    <button
                      className="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#modalDashboard"
                    >
                      <BsPlusLg size={18} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="footer">
              Última atualização em 07.11.2021 às 17:38
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="modalDashboard"
        tabIndex={-1}
        aria-labelledby="modalDashboardLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalDashboardLabel">
                Dados do imóvel
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="header d-flex justify-content-between align-items-center">
                <div className="name">
                  <h2>
                    <BsBuilding size={48} />
                    Av. Savassi 750
                  </h2>
                </div>
                <div className="actions">
                  {/* <button
                    className="btn">
                    <BsQuestionCircle size={24} />
                  </button>
                  <button
                    className="btn">
                    <MdMoreHoriz size={24} />
                  </button> */}
                  <button className="btn btn-primary">
                    Ir para anúncio
                    <FiArrowUpRight size={24} />
                  </button>
                </div>
              </div>

              <hr />

              <div className="row dados-pessoais">
                <div className="col">
                  <div className="mb-3">
                    <span>Endereço:</span> Rua Margarida Galvão, 161
                  </div>
                  <div className="mb-3">
                    <span>Valor:</span> R$ 5.100.000,00
                  </div>
                  <div className="mb-3">
                    <span>Status:</span>{" "}
                    <MdSwapHoriz size={20} color={"#4BB7F1"} /> Em negociação
                  </div>
                </div>

                <div className="col">
                  <div className="mb-3">
                    <span>Cidade/UF:</span> São Paulo, SP
                  </div>
                  <div className="mb-3">
                    <span>IPTU:</span> R$ 200,00
                  </div>
                  <div className="mb-3">
                    <span>Condomínio:</span> R$ 1.200
                  </div>
                </div>
              </div>

              <hr />

              {/* <div className="slider">

                <div className="item">
                  <MdOutlineBed size={24} />
                  6 quartos
                  <span>
                    3 suítes
                  </span>
                </div>

                <div className="item">
                  <FaBath size={22} />
                  4 banheiros
                </div>

                <div className="item">
                  <FaSwimmingPool size={24} />
                  Piscina
                </div>

                <div className="item">
                  <MdOutlineDirectionsCar size={24} />
                  4 vagas
                </div>

                <div className="item">
                  <MdOutlineOtherHouses size={24} />
                  Portaria 24h
                </div>

              </div> */}

              <Slider {...settingSlide} className="slider">
                <div className="item">
                  <MdOutlineBed size={24} />6 quartos
                  <span>3 suítes</span>
                </div>

                <div className="item">
                  <FaBath size={22} />4 banheiros
                </div>

                <div className="item">
                  <FaSwimmingPool size={24} />
                  Piscina
                </div>

                <div className="item">
                  <MdOutlineDirectionsCar size={24} />4 vagas
                </div>

                <div className="item">
                  <MdOutlineOtherHouses size={24} />
                  Portaria 24h
                </div>
              </Slider>

              <hr />

              <div className="title d-flex justify-content-between align-items-center mb-2">
                <div className="label d-flex justify-content-center align-items-center">
                  Propostas realizadas
                </div>
                <div className="actions d-flex justify-content-center align-items-center">
                  <button className="btn">
                    Atualizar
                    <MdRefresh size={16} />
                  </button>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="label d-flex justify-content-center align-items-center">
                  Propostas feitas pelos seus clientes
                </div>
                <div className="ordem">
                  Ordenar por:
                  <select aria-label="Escolha o tipo">
                    <option value="">Status</option>
                  </select>
                </div>
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Status</th>
                    <th scope="col">Última atualização</th>
                    <th scope="col" className="center">
                      Mais
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <MdOutlineAccountCircle size={22} /> José da silva Veiga
                    </td>
                    <td>R$5.100.000,00</td>
                    <td className="status">
                      <RiArrowRightUpLine size={16} color="#4bb7f1" />
                      Proposta enviada
                    </td>
                    <td>08.11.2021</td>
                    <td className="center">
                      <button
                        className="btn"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDashboard"
                      >
                        <BsPlusLg size={18} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" data-bs-dismiss="modal">
                E-mail <MdMailOutline />
              </button>
              <button type="button" className="btn">
                Whatsapp <BsWhatsapp />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
