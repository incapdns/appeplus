import "../../../styles/pages/dashboard/corretor/clientes.scss";
import NavbarDashHeader from "../../../components/Navbar/NavbarDashHeader";
import { NavbarDashDark } from "../../../components/Navbar/NavbarDashDark";
import {
  MdClose,
  MdMailOutline,
  MdOutlineAccountCircle,
  MdOutlineBed,
  MdOutlineDirectionsCar,
  MdOutlineOtherHouses,
  MdRefresh,
  MdSearch,
  MdSwapHoriz,
} from "react-icons/md";
import {
  BsBuilding,
  BsCheckCircleFill,
  BsFacebook,
  BsPlusLg,
  BsPlusSquare,
  BsWhatsapp,
} from "react-icons/bs";
import { RiArrowRightUpLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import api from "../../../services/api";
import Loading from "../../../components/Loading";
import { cpfMask, moeda, phoneMask } from "../../../utils/Masks";
import { EStatusProspeccao, iDadosUsuario } from "../../../@types";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaBath, FaSwimmingPool } from "react-icons/fa";
import { useHistory } from "react-router";
import NavbarDashCorretor from "../../../components/Navbar/NavbarDashCorretor";

interface iCliente {
  endereco: string;
  numero: string;
  arquivosClienteFotoPerfil: any;
  bairro: string;
  cidade: string;
  codCliente: number;
  codProspeccao: number;
  descStatusProspeccao: string;
  descTermometroProspeccao: string;
  descTipoImove: number;
  dtCadastro: string;
  dtConclusao: string;
  email: string;
  nomeCompleto: string;
  qtdeImoveis: number;
  telefone: string;
  uf: string;
  valorVenda: number;
  valorVendaOriginal: number;
  codTermometroProspeccao: number;
  percentualTermometro: number;
  origem: any; //não recebe do endpoint
  iptu: any; //não recebe do endpoint
  condominio: any; //não recebe do endpoint
}

interface iDadosCliente {
  codCliente: number;
  codStatus: number;
  codUsuario: number;
  cpF_Conjuge: any;
  cpfcnpj: any;
  descStatus: string;
  dtAtualizacao: string;
  dtCadastro: string;
  dtExclusao: string;
  dtNascimento: any;
  email_Conjuge: any;
  nomeCompleto: string;
  nomeCompleto_Conjuge: any;
  telefone: string;
  telefone_Conjuge: any;
  tipoCliente: string;
  userAtualizacao: any;
  userCadastro: string;
  userExclusao: any;
  endereco: any;
  cidade: any;
  uf: any;
  email: any;
  numero: any; //não retorna no endpoint
  origemLead: any; //não retorna no endpoint
}

interface iProposta {
  codProspeccao: number;
  codImovel: number;
  codProposta: number;
  codImovelProspeccao: number;
  dtCadastro: string;
  userCadastro: number;
  dtAtualizacao: string;
  userAtualizacao: number;
  dtConclusao: string;
  userConclusao: number;
  dtCancelamento: string;
  userCancelamento: number;
  codMotivoCancelamento: number;
  motivoCancelamento: string;
  valor: number;
  obsCondicoesPagamento: string;
  codStatusProposta: number;
  codTermmometroProposta: number;
  dtValidade: string;
  observacoes: string;
  numProposta: number;
  codPropostaPai: number;
  codAditivo: number;
  dtAceite: string;
  userAceite: number;
  dtRecusa: string;
  userRecusa: number;
  motivoRecusa: string;
  desTipoImovel: string;
  descStatusProposta: string;
  descTipoImovel: string;
  endereco: string;
}
interface iClienteCorretor {
  arquivosCliente: null;
  codCliente: number;
  codEstadoCivil: number;
  cpfcnpj: string;
  dtNascimento: string;
  email: null;
  genero: number;
  nomeCompleto: string;
  rg: string;
  telefone: string;
  tipoCliente: null;
}

export default function DashboardNegociacoes() {
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const [tipoNegociacao, setTipoNegociacao] = useState("cliente");
  const [clientes, setClientes] = useState<iCliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [dadosCliente, setDadosCliente] = useState({} as iDadosCliente);
  const [dadosProspeccao, setDadosProspeccao] = useState({} as iCliente);
  const [loadingPropostas, setLoadingPropostas] = useState(false);
  const [propostas, setPropostas] = useState<iProposta[]>([]);
  const [dataAtual, setDataAtual] = useState("");
  const [codProspeccaoCliente, setCodProspeccaoCliente] = useState<
    number | null
  >(null);
  const [getClientes, setGetClientes] = useState<iClienteCorretor[]>([]);
  const [nome, setNome] = useState("");
  const [imoveis, setImoveis] = useState(false);
  const [tipoTransacao, setTipoTransacao] = useState("compra");
  const [statusLead, setStatusLead] = useState("");
  const [valor, setValor] = useState("");
  const qtdPagina = 10;
  const pagina = 1;
  const history = useHistory();

  function checaUsuarioLogado() {
    if (!usuario.token || usuario.codStatus !== 1) {
      window.alert(
        "Você precisar estar logado e aprovado para acessar este menu!"
      );
      history.push("/");
    }
  }

  const endpoint =
    tipoTransacao === "compra"
      ? `prospeccao/busca-avancada?CodCorretorCompra=${usuario.codCorretor}&qtdePagina=${qtdPagina}&pagina=${pagina}`
      : `prospeccao/busca-avancada-venda?CodCorretor=${usuario.codCorretor}&QtdePagina=${qtdPagina}&Pagina=${pagina}`;

  const params =
    tipoTransacao === "compra"
      ? {}
      : {
          params: {
            NomeCliente: nome,
            CodStatusProspeccao: statusLead ? Number(statusLead) : undefined,
            ValorVenda: valor ? Number(valor) : undefined,
          },
        };

  useEffect(() => {
    // checaUsuarioLogado();
    GetClientes();
    // GetProspeccaoImovel(0);
    // GetRecuperarDadosCliente(104);
  }, []);

  async function GetRecuperarDadosCliente(codCliente: number) {
    setLoading(true);
    await api
      .get(`cliente/recuperar-dados-cliente?codCliente=${codCliente}`)

      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
  async function GetProspeccaoImovel(codProspeccao: number) {
    setLoading(true);
    await api
      .get(`Proposta/listar-por-prospeccao?codProspeccao=${codProspeccao}`)

      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function GetClientes() {
    setLoading(true);
    clientes.length = 0;

    await api
      .get(endpoint, params)
      .then((response) => {
        if (!response.data.success) {
          clientes.length = 0;
          setLoading(false);
          return;
        }

        setClientes(response.data.data.listaDeProspeccoes);

        // dataAtual
        const data = new Date();
        const dia = String(data.getDate()).padStart(2, "0");
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const ano = data.getFullYear();
        const hora = data
          .getHours()
          .toLocaleString("pt-BR", { minimumIntegerDigits: 2 });
        const minutos = data
          .getMinutes()
          .toLocaleString("pt-BR", { minimumIntegerDigits: 2 });
        const dataAtual =
          dia + "." + mes + "." + ano + " às " + hora + ":" + minutos;

        setDataAtual(dataAtual);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoading(false);
      });
  }

  // ESTE ENDPOINT NÃO RECEBE DADOS DE ENDEREÇO DO CLIENTE
  async function GetDadosCliente(nome: string) {
    setLoadingModal(true);
    await api
      .get(`cliente?QtdePagina=10&Pagina=1&NomeCliente=${nome}`)
      .then((response) => {
        setDadosCliente(response.data.data[0]);
        setLoadingModal(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoadingModal(false);
      });
  }

  async function GetProposta(codProspeccao: number) {
    setLoadingPropostas(true);
    setCodProspeccaoCliente(codProspeccao);
    await api
      .get(`Proposta/listar-por-prospeccao?codProspeccao=${codProspeccao}`)
      .then((response) => {
        setPropostas(response.data.data);
        setLoadingPropostas(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoadingPropostas(false);
      });
  }

  async function GetClienteCorretor() {
    
    if (usuario.token) {
      await api
        .get(
          `/cliente/recuperar-clientes-corretor?codCorretor=${usuario.codCorretor}&qtdePagina=99&pagina=1`
        )
        .then((response) => {
          console.log(response.data.data);
          setGetClientes(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function clienteAction(codCliente: any) {
    localStorage.setItem("@appePlus/codCliente", String(codCliente));
    localStorage.setItem("@appePlus/codImovel", String(""));
    history.push("/cadastro/imovel/anuncioSimples");
  }

  // Funcão para gerar um nuúmero aleatório para o termômetro
  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return String(Math.floor(Math.random() * (max - min)) + min) + "%";
  }

  // co termômetro tem 6 etapas, sair do Vermelho -> Laranja -> Amarelo -> Verde Claro, Verde, Verde Escuro
  function Termometro(valor: number) {
    if (valor <= 16) {
      return { width: valor + "%", backgroundColor: "#d4442e" };
    } else if (valor > 16 && valor <= 32) {
      return { width: valor + "%", backgroundColor: "#FF715B" };
    } else if (valor > 32 && valor <= 48) {
      return { width: valor + "%", backgroundColor: "#FFB30F" };
    } else if (valor > 48 && valor <= 64) {
      return { width: valor + "%", backgroundColor: "#77ff87" };
    } else if (valor > 64 && valor <= 80) {
      return { width: valor + "%", backgroundColor: "#3BC14A" };
    } else if (valor > 80 && valor <= 100) {
      return { width: valor + "%", backgroundColor: "#148b22" };
    }
  }

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
      <NavbarDashCorretor />
      <div className="main-content" id="dashboard-clientes">
        <NavbarDashHeader />
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Oportunidades</h2>
            </div>
            <div className="col d-flex justify-content-end col-lg-12 flex-wrap">
              {!imoveis ? (
                <div className="col col-lg-8 d-flex justify-content-end flex-wrap">
                  <div className="content-button">
                    <button
                      type="button"
                      className="buttonCompartilhar"
                      onClick={() => {
                        history.push("/cadastro/cliente/comprador");
                      }}
                    >
                      <span>
                        <BsPlusSquare fontSize={20} /> &nbsp; Novo Comprador
                      </span>
                    </button>
                  </div>
                  <div className="content-button">
                    <button
                      type="button"
                      className="buttonCompartilhar"
                      onClick={() => {
                        history.push("/cadastro/cliente/vendedor");
                      }}
                    >
                      <span>
                        <BsPlusSquare fontSize={20} /> &nbsp; Novo Vendedor
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    className="buttonCompartilhar"
                    data-bs-toggle="modal"
                    data-bs-target="#modalTableCliente"
                    onClick={GetClienteCorretor}
                  >
                    <span>
                      <BsPlusSquare fontSize={20} /> &nbsp; Novo Imóvel
                    </span>
                  </button>
                </div>
              )}
              <div className="segmented-control">
                <button
                  className={`btn item ${!imoveis ? "active" : ""}`}
                  onClick={() => setImoveis(false)}
                >
                  Clientes
                </button>
                <button
                  className={`btn item ${imoveis ? "active" : ""}`}
                  onClick={() => setImoveis(true)}
                >
                  Imóveis
                </button>
              </div>
            </div>
          </div>
          <div className="body">
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="row mb-3">
                  <div className="col-lg-9">
                    <div className="mb-3">
                      <div className="form-control-icon">
                        <MdSearch size={24} />
                        <input
                          type="text"
                          className="form-control"
                          value={nome}
                          placeholder="Busque por nome"
                          onChange={(e) => setNome(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="mb-3 d-grid">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={GetClientes}
                      >
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
                        defaultValue={valor}
                        onChange={(e) => setValor(e.target.value)}
                      >
                        <option value="">Escolha o valor</option>
                        <option value="30000000">R$ 300.000,00</option>
                        <option value="40000000">R$ 400.000,00</option>
                        <option value="50000000">R$ 500.000,00</option>
                        <option value="80000000">R$ 800.000,00</option>
                      </select>
                    </div>
                    <div className="col-lg-3 mb-3 mb-lg-0">
                      <select
                        className="form-select"
                        aria-label="Escolha o tipo"
                        defaultValue={statusLead}
                        onChange={(e) => setStatusLead(e.target.value)}
                      >
                        <option value="">Status do Lead</option>
                        <option value="1">Aberta</option>
                        <option value="2">Cancelado</option>
                        <option value="3">Concluido</option>
                      </select>
                    </div>

                    <div className="col-lg-6 d-flex justify-content-lg-end">
                      {/* <button type="button" className="btn btn-primary bt-filtro">
                          <IoOptions size={22} />
                          Mais filtros
                        </button> */}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col tipo">
                    Tipo de transação:
                    <select
                      name="tipo"
                      id="tipo"
                      defaultValue={tipoTransacao}
                      onChange={(e) => setTipoTransacao(e.target.value)}
                    >
                      <option value="compra">Compra</option>
                      <option value="venda">Venda direta</option>
                    </select>
                  </div>
                  <div className="col ordem">
                    Ordenar por:
                    <select name="ordem" id="ordem">
                      <option value="">Valor</option>
                    </select>
                  </div>
                </div>

                {clientes.length ? (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Cliente</th>
                          <th scope="col">Status do Lead</th>
                          <th scope="col">Valor</th>
                          <th scope="col" className="center">
                            Termômetro
                          </th>
                          <th scope="col" className="center">
                            Imóveis
                          </th>
                          <th scope="col" className="center">
                            Mais sobre
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientes.map((cliente, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                {imoveis ? (
                                  <>
                                    <BsBuilding size={22} />
                                    {cliente.bairro}, {cliente.cidade}-
                                    {cliente.uf}
                                  </>
                                ) : (
                                  <>
                                    <MdOutlineAccountCircle size={22} />
                                    {cliente.nomeCompleto}
                                  </>
                                )}
                              </td>
                              <td className="status">
                                {cliente.descStatusProspeccao ===
                                  EStatusProspeccao.Aberta && (
                                  <RiArrowRightUpLine
                                    size={16}
                                    color="#4bb7f1"
                                  />
                                )}
                                {cliente.descStatusProspeccao ===
                                  EStatusProspeccao.Cancelado && (
                                  <MdClose size={16} color="#FD4A19" />
                                )}
                                {cliente.descStatusProspeccao ===
                                  EStatusProspeccao.Concluido && (
                                  <BsCheckCircleFill
                                    size={16}
                                    color="#3BC14A"
                                  />
                                )}

                                {cliente.descStatusProspeccao}
                              </td>
                              <td>
                                R$ {moeda(cliente?.valorVendaOriginal)}
                              </td>
                              <td>
                                <div className="progress" style={{ height: 4 }}>
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={Termometro(
                                      cliente.codTermometroProspeccao
                                    )}
                                    // aria-valuenow={25}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                </div>
                              </td>
                              <td className="center">{cliente.qtdeImoveis}</td>
                              <td className="center">
                                <button
                                  className="btn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalDashboard"
                                  onClick={() => {
                                    // if (imoveis) {
                                    //   GetDadosCliente(cliente.nomeCompleto);
                                    //   GetProposta(cliente.codProspeccao);
                                    // } else {
                                    //   GetDadosCliente(cliente.nomeCompleto);
                                    //   GetProposta(cliente.codProspeccao);
                                    // }
                                    GetDadosCliente(cliente.nomeCompleto);
                                    GetProposta(cliente.codProspeccao);
                                    setDadosProspeccao(cliente);
                                  }}
                                >
                                  <BsPlusLg size={18} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="alert alert-warning" role="alert">
                    Nenhum {imoveis ? "imóvel" : "cliente"} encontrado.
                  </div>
                )}

                <div className="footer">
                  {dataAtual ? `Última atualização em ${dataAtual}` : null}
                </div>
              </>
            )}
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
                Dados do {imoveis ? "imóvel" : "cliente"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {loadingModal ? (
                <Loading />
              ) : (
                <>
                  <div className="header d-flex justify-content-between align-items-center">
                    <div className="name">
                      <h2>
                        {imoveis ? (
                          <>
                            <BsBuilding size={48} />
                            {dadosProspeccao.endereco
                              ? `${dadosProspeccao.endereco}, ${dadosProspeccao.numero}`
                              : "Não informado"}
                          </>
                        ) : (
                          <>
                            <MdOutlineAccountCircle size={48} />
                            {dadosCliente.nomeCompleto}
                          </>
                        )}
                      </h2>
                    </div>
                    {/* <div className="actions">
                        <button
                          className="btn">
                          <BsQuestionCircle size={24} />
                        </button>
                        <button
                          className="btn">
                          <MdMoreHoriz size={24} />
                        </button>
                      </div> */}
                  </div>

                  <hr />

                  {!imoveis && (
                    <div className="title d-flex justify-content-between align-items-center mb-4">
                      <div className="label d-flex justify-content-center align-items-center">
                        Dados do cliente
                      </div>
                      <div className="actions d-flex justify-content-center align-items-center">
                        <button className="btn">
                          Editar
                          <BiEditAlt size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {imoveis ? (
                    <div className="row dados-pessoais">
                      <div className="col">
                        <div className="mb-3">
                          <span>Endereço:</span>{" "}
                          {dadosProspeccao.endereco ? (
                            `${dadosProspeccao.endereco}, ${dadosProspeccao.numero}`
                          ) : (
                            <span>- Não informado -</span>
                          )}
                        </div>
                        <div className="mb-3">
                          <span>Valor:</span>{" "}
                          {dadosProspeccao.valorVendaOriginal
                            ? `R$ ${moeda(
                                String(dadosProspeccao.valorVendaOriginal)
                              )}`
                            : "- Não informado -"}
                        </div>
                        <div className="mb-3">
                          <span>Status:</span>{" "}
                          {dadosProspeccao.descStatusProspeccao ? (
                            dadosProspeccao.descStatusProspeccao
                          ) : (
                            <span>- Não informado -</span>
                          )}
                          {/* <MdSwapHoriz size={20} color={'#4BB7F1'} /> */}
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <span>Cidade/UF:</span>{" "}
                          {dadosProspeccao.cidade ? (
                            `${dadosProspeccao.cidade} - ${dadosProspeccao.uf}`
                          ) : (
                            <span>- Não informado -</span>
                          )}
                        </div>

                        <div className="mb-3">
                          <span>IPTU:</span>{" "}
                          {dadosProspeccao.iptu ? (
                            `R$ ${moeda(dadosProspeccao.iptu)}`
                          ) : (
                            <span>- Não informado -</span>
                          )}
                        </div>
                        <div className="mb-3">
                          <span>Condomínio:</span>{" "}
                          {dadosProspeccao.condominio ? (
                            `R$ ${moeda(dadosProspeccao.condominio)}`
                          ) : (
                            <span>- Não informado -</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row dados-pessoais">
                      <div className="col">
                        <div className="mb-3">
                          <span>Endereço:</span>{" "}
                          {dadosCliente?.endereco ? (
                            `${dadosCliente.endereco}, ${dadosCliente.numero}`
                          ) : (
                            <span>- Não informado -</span>
                          )}
                        </div>
                        <div className="mb-3">
                          <span>Aniversário:</span>{" "}
                          {dadosCliente?.dtNascimento ? (
                            dadosCliente.dtNascimento
                          ) : (
                            <span>- Não informado -</span>
                          )}
                        </div>
                        <div className="mb-3">
                          <span>Telefone:</span>{" "}
                          {phoneMask(dadosCliente?.telefone || "")}
                        </div>
                      </div>

                      <div className="col">
                        <div className="mb-3">
                          <span>Cidade/UF:</span>{" "}
                          {dadosCliente?.cidade ? (
                            `${dadosCliente.cidade} - ${dadosCliente.uf}`
                          ) : (
                            <span>- Não informado -</span>
                          )}
                        </div>
                        <div className="mb-3">
                          <span>Origem do lead:</span>{" "}
                          {dadosCliente?.origemLead ? (
                            dadosCliente.origemLead
                          ) : (
                            <span>- Não informado -</span>
                          )}
                          {/* <BsFacebook size={20} color={'#0065DD'} /> */}
                        </div>
                        <div className="mb-3">
                          <span>Email:</span>{" "}
                          {dadosCliente?.email ? (
                            dadosCliente.email
                          ) : (
                            <span>- Não informado -</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <hr />
                  {imoveis && (
                    <>
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
                    </>
                  )}

                  <div className="title d-flex justify-content-between align-items-center mb-2">
                    <div className="label d-flex justify-content-center align-items-center">
                      Propostas realizadas
                    </div>
                    <div className="actions d-flex justify-content-center align-items-center">
                      <button
                        className="btn"
                        onClick={() =>
                          GetProposta(Number(codProspeccaoCliente))
                        }
                      >
                        Atualizar
                        <MdRefresh size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="label d-flex justify-content-center align-items-center">
                      Propostas feitas com você
                    </div>
                    <div className="ordem">
                      Ordenar por:
                      <select aria-label="Escolha o tipo">
                        <option value="">Status</option>
                      </select>
                    </div>
                  </div>

                  {loadingPropostas ? (
                    <Loading />
                  ) : propostas.length ? (
                    <div className="table-responsive">
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
                          {propostas.map((proposta, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <BsBuilding size={22} /> {proposta.endereco}
                                </td>
                                <td>R$5.100.000,00</td>
                                <td className="status">
                                  {proposta.descStatusProposta}
                                </td>
                                <td>{proposta.dtAtualizacao}</td>
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
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="alert alert-warning" role="alert">
                      Nenhuma proposta realizada.
                    </div>
                  )}
                </>
              )}
            </div>
            {!imoveis && (
              <div className="modal-footer">
                {dadosCliente?.email && (
                  <a
                    href="mailto:andre@andre.com"
                    type="button"
                    className="btn"
                  >
                    E-mail
                    <MdMailOutline />
                  </a>
                )}
                {dadosCliente?.telefone && (
                  <a
                    href={`https://wa.me/55${dadosCliente.telefone}`}
                    target="_blank"
                    rel="noreferrer"
                    type="button"
                    className="btn"
                  >
                    Whatsapp
                    <BsWhatsapp />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="modalTableCliente"
        tabIndex={-1}
        aria-labelledby="modalTableClienteLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modalTableClienteLabel">
                Clientes{" "}
              </h4>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                X
              </button>
            </div>
            <div className="modal-body">
              {getClientes.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-proposta ">
                    <tbody className="text-center">
                      <tr key="header">
                        <td className="cpf">
                          <span>Documento</span>
                        </td>
                        <td className="proprietario">
                          <span>Nome</span>
                        </td>
                        <td className="button">
                          <span>Ação</span>
                        </td>
                      </tr>
                      {getClientes.map((cliente) => (
                        <tr key={cliente.codCliente}>
                          <td className="cpf">{cliente.cpfcnpj}</td>
                          <td className="proprietario">
                            {cliente.nomeCompleto}
                          </td>
                          <td className="button">
                            <button
                              className="button-selecionar"
                              data-bs-dismiss="modal"
                              onClick={() => clienteAction(cliente.codCliente)}
                            >
                              selecionar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center">
                  Desculpe no momento não temos informações.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
