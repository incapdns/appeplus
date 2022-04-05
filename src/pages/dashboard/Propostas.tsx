import { FormEvent, useEffect, useState } from "react";
import MeuImovel from "../../components/Cards/MeuImovel";
import NavbarDash from "../../components/Navbar/NavbarDash";
import NavbarDashHeader from "../../components/Navbar/NavbarDashHeader";
import { FaRedoAlt, FaSearch } from "react-icons/fa";
import { FiArrowDownRight } from "react-icons/fi";
import { IoOptions } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineCheckCircle, AiOutlinePlus } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import "../../styles/pages/dashboard/meusImoveis.scss";
import FiltroMeusImoveis from "../../components/Form/dashboard/FiltroMeusImoveis";
import Footer from "../../components/Footer";
import ImgCorretor from "../../assets/internas/corretor-card-selecao.png";
import Paginacao from "../../components/Paginacao";
import "../../styles/pages/dashboard/propostas.scss";
import { BiEditAlt } from "react-icons/bi";
import { HiPhone } from "react-icons/hi";
import { MdDeleteOutline, MdVerified, MdOutlineEmail } from "react-icons/md";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { BsQuestionCircle, BsWhatsapp } from "react-icons/bs";
import DetalhamentoImovel from "../../components/Cards/DetalhamentoImovel";
import Historico from "../../components/Cards/Historico";
import api from "../../services/api";
import {
  iPropostas,
  tipoUsuario,
  iDadosUsuario,
  iImoveisCorretor,
} from "../../@types";
import { moedaFloat, moeda } from "../../utils/Masks";
import ImovelProposta from "../../assets/internas/imovel-user.png";
import { useHistory } from "react-router";

const usuario: iDadosUsuario = JSON.parse(
  localStorage.getItem("@appePlus/usuario") || "{}"
);
const Propostas = () => {
  const [historico, setHistorico] = useState(true);
  const [propostas, setPropostas] = useState<iPropostas[]>([]);
  let [filterProposta, setFilterProposta] = useState<iPropostas[]>([]);
  const [filter, setFilter] = useState<iPropostas[]>([]);
  const [imoveisProposta, setImoveisProposta] = useState<iImoveisCorretor[]>(
    []
  );
  const [search, setSearch] = useState("");
  const [searchGet, setSearchGet] = useState(false);
  const [corretorName, setCorretorName] = useState("");
  const [pagina, setPagina] = useState(1);
  const history = useHistory();

  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  async function getPropostas() {
    if (usuario.token) {
      await api
        .get(
          `cliente/propostas?codCliente=${usuario.codCliente}&pagina=${pagina}&qtdePagina=3`
        )
        .then((response) => {
          setPropostas(response.data.data);
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
        });
    }
  }
  async function getFilterPropostas() {
    if (usuario.token) {
      await api
        .get(
          `cliente/propostas?codCliente=${usuario.codCliente}&pagina=1&qtdePagina=999`
        )
        .then((response) => {
          filterProposta = response.data.data;
          setSearchGet(true);
          const filter = filterProposta.filter((proposta) => {
            return proposta?.endereco
              ?.toString()
              .toLowerCase()
              .includes(search.toString().toLowerCase());
          });
          setFilter(filter);
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
        });
    }
  }
  async function getDetalhesPropostas(codProposta: number) {
    await api
      .get(
        `imovel/listar-imoveis-Cliente?CodCliente=${usuario.codCliente}&CodProposta=${codProposta}&Pagina=1&QtdePagina=1`
      )
      .then((response) => {
        setImoveisProposta(response.data.data);
      });
    setHistorico(false);
  }

  function handlePropostas(event: FormEvent) {
    event.preventDefault();
    if (search === "") {
      getPropostas();
      setSearchGet(false);
    } else {
      getFilterPropostas();
    }
  }

  useEffect(() => {
    checaUsuarioLogado();
    getPropostas();
  }, [pagina]);

  return (
    <>
      <div className="wrapper-imoveis">
        <NavbarDash />
        <div className="main-content">
          <NavbarDashHeader />
          <div className="container">
            <section className="my-4">
              <div className="row">
                <div className="col-lg-10">
                  <h2>Propostas recebidas</h2>
                </div>
                <div className="col-lg-2">
                  <button className="buttonUpdate">
                    Atualizar
                    <FaRedoAlt size={14} style={{ marginLeft: 10 }} />
                  </button>
                </div>
              </div>
            </section>
            <section className="meus-imoveis">
              <form onSubmit={handlePropostas}>
                <div className="filtro-corretor my-3 col-lg-12">
                  <input
                    type="text"
                    placeholder=" digite o endereço"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="campo-filtro"
                  />
                  <button type="submit" className="buttonBuscar">
                    Buscar <FaSearch style={{ marginLeft: 10 }} />
                  </button>
                </div>
              </form>
              <div className="row mx-2 my-4">
                <div className="col-lg-3 mb-3 mb-lg-0">
                  <select
                    className="form-select campo-select"
                    aria-label="Valor do imóvel"
                    defaultValue="1"
                  >
                    <option value="1">Valor da proposta</option>
                    <option value="2">R$ 150 mil a 250 mil</option>
                    <option value="3">R$ 350 mil a 450 mil</option>
                    <option value="4">R$ 450 mil a 650 mil</option>
                    <option value="5">R$ 650 mil a 1 milhão</option>
                    <option value="6">mais de R$ 1 milhão</option>
                  </select>
                </div>
                <div className="col-lg-3 mb-3 mb-lg-0">
                  <select
                    className="form-select campo-select"
                    aria-label="Status da proposta"
                    defaultValue=""
                  >
                    <option value="">Status da proposta</option>
                    <option value="1">Vendido</option>
                    <option value="2">Aguard. aprovação</option>
                    <option value="3">Em elaboração</option>
                  </select>
                </div>
                <div className="col-lg-6 d-flex justify-content-lg-end">
                  <div className="filtro-corretor my-3 col-lg-12">
                    <input
                      type="text"
                      placeholder="digite o nome do corretor"
                      value={corretorName}
                      onChange={(e) => setCorretorName(e.target.value)}
                      className="campo-filtro"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="row mx-2 blue-filter col-lg-12">
                <div className="col-lg-6  my-2 d-flex first-filter">
                  {/* <p>Tipo de corretor: </p>
                      <select className="caixa-select" >
                          <option value="comprador">Comprador</option>
                          <option value="vendedor">Vendedor</option>
                      </select> */}
                </div>
                <div className="col-lg-6  my-2 d-flex second-filter">
                  <p>Ordenar por: </p>
                  <select className="caixa-select">
                    <option value="historico">Histórico</option>
                    <option value="maiorValor">Maior valor</option>
                    <option value="menorValor">Menor valor</option>
                  </select>
                </div>
              </div>
              <div className="cod-md-2 line-gray"></div>

              <div className="lista-propostas">
                <div className="accordion" id="accordionPanelsStayOpenExample">
                  <div className="cabecalho-propostas">
                    <ul>
                      <li>Endereço</li>
                      <li>Status da proposta</li>
                      <li>Valor da proposta</li>
                      <li>Valor anunciado</li>
                      <li>Proposta</li>
                      <li>mais sobre</li>
                    </ul>
                  </div>
                  {searchGet ? (
                    filter.map((fproposta, index) => (
                      <div className="accordion-item" key={fproposta.codImovel}>
                        <div
                          className="accordion-header"
                          id={`panelsStayOpen-headingOne${index}`}
                        >
                          <div
                            className="accordion-button collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target={`#panelsStayOpen-collapseOne${index}`}
                            aria-expanded="false"
                            aria-controls={`panelsStayOpen-collapseOne${index}`}
                          >
                            <ul className="list-status">
                              <li className="name-img">
                                {fproposta.fotoCapaImovel ? (
                                  <img
                                    src={fproposta.fotoCapaImovel}
                                    className="img-vendedor"
                                    alt="imagem de perfil imovel corretor"
                                  />
                                ) : (
                                  <img
                                    src={ImovelProposta}
                                    className="img-vendedor"
                                    alt="imagem de perfil imovel corretor"
                                  />
                                )}

                                {fproposta.endereco}
                              </li>
                              <li>
                                <AiOutlineCheckCircle color={"#3BC14A"} />
                                {fproposta.descStatusProposta}
                              </li>
                              <li className="valor-saida">
                                R$ 5.750.000
                                <FiArrowDownRight />
                              </li>
                              <li>
                                {moeda(
                                  fproposta.valorVendaOriginal
                                )}
                              </li>
                              <li>{fproposta.numProposta}</li>
                              <li>
                                <AiOutlinePlus fontSize={24} />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div
                          id={`panelsStayOpen-collapseOne${index}`}
                          className="accordion-collapse collapse "
                          aria-labelledby={`panelsStayOpen-headingOne${index}`}
                        >
                          <div className="accordion-body">
                            <div className="card-header p-0 d-flex justify-content-lg-between justify-content-center align-items-center flex-wrap">
                              <div className="action">
                                <button
                                  onClick={() => setHistorico(true)}
                                  className={`${historico && "active"}`}
                                >
                                  Histórico
                                </button>
                                <button
                                  onClick={() =>
                                    getDetalhesPropostas(fproposta.codProposta)
                                  }
                                  className={`${!historico && "active"}`}
                                >
                                  Detalhes
                                </button>
                              </div>
                              <div className="information">
                                <button className="mx-3">
                                  <BsQuestionCircle
                                    fontSize={24}
                                    color={"#4BB7F1"}
                                  />
                                </button>
                                <button>
                                  <IoEllipsisHorizontal
                                    fontSize={24}
                                    color={"#4BB7F1"}
                                  />
                                </button>
                              </div>
                            </div>
                            {historico ? (
                              <div className="historico">
                                <Historico />
                              </div>
                            ) : (
                              <div className="detalhes">
                                {imoveisProposta.map((dImovel) => (
                                  <DetalhamentoImovel
                                    key={dImovel.imovel.codImovel}
                                    endereco={dImovel.imovel.endereco}
                                    bairro={dImovel.imovel.bairro}
                                    numero={dImovel.imovel.numero}
                                    valorVenda={
                                      dImovel.imovel.valorVendaOriginal
                                    }
                                    fotoCapa={dImovel.imovel.fotoCapaImovel}
                                    nomeCorretorCompra={
                                      dImovel.corretorCompra.nomeSocial
                                    }
                                    descStatusCompra={
                                      dImovel.corretorVenda.descStatusImovel
                                    }
                                    nomeCompradorVenda={
                                      dImovel.corretorVenda.nomeSocial
                                    }
                                    descStatusVenda={
                                      dImovel.corretorVenda.descStatusImovel
                                    }
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      {propostas == null ? (

                        <div className='text-center'>
                          <h4>Até o momento não temos propostas</h4>
                        </div>


                      ) : (
                        <>
                        {propostas.map((proposta, index) => (
                          <div className="accordion-item" key={proposta.codImovel}>
                            <div className="accordion-header" id={`panelsStayOpen-headingOne${index}`}>
                              <div className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseOne${index}`} aria-expanded="false" aria-controls={`panelsStayOpen-collapseOne${index}`}>
                                <ul className="list-status">
                                  <li className="name-img">
                                    {proposta.fotoCapaImovel ? (
                                      <img src={proposta.fotoCapaImovel} className="img-vendedor" alt="imagem de perfil imovel corretor" />
                                    ) : (
                                      <img src={ImovelProposta} className="img-vendedor" alt="imagem de perfil imovel corretor" />
                                    )}

                                    {proposta.endereco}
                                  </li>
                                  <li  >
                                    <AiOutlineCheckCircle color={'#3BC14A'} />
                                    {proposta.descStatusProposta}
                                  </li>
                                  <li className="valor-saida">
                                    R$ 5.750.000
                                    <FiArrowDownRight />
                                  </li>
                                  <li>
                                    {moeda(proposta.valorVendaOriginal)}
                                  </li>
                                  <li>
                                    {proposta.numProposta}
                                  </li>
                                  <li>
                                    <AiOutlinePlus fontSize={24} />
                                  </li>
                                </ul>
                              </div>
                              <div
                                id={`panelsStayOpen-collapseOne${index}`}
                                className="accordion-collapse collapse "
                                aria-labelledby={`panelsStayOpen-headingOne${index}`}
                              >
                                <div className="accordion-body">
                                  <div className="card-header p-0 d-flex justify-content-lg-between justify-content-center align-items-center flex-wrap">
                                    <div className="action">
                                      <button
                                        onClick={() => setHistorico(true)}
                                        className={`${historico && "active"}`}
                                      >
                                        Histórico
                                      </button>
                                      <button
                                        onClick={() =>
                                          getDetalhesPropostas(
                                            proposta.codProposta
                                          )
                                        }
                                        className={`${!historico && "active"}`}
                                      >
                                        Detalhes
                                      </button>
                                    </div>
                                    <div className="information">
                                      <button className="mx-3">
                                        <BsQuestionCircle
                                          fontSize={24}
                                          color={"#4BB7F1"}
                                        />
                                      </button>
                                      <button>
                                        <IoEllipsisHorizontal
                                          fontSize={24}
                                          color={"#4BB7F1"}
                                        />
                                      </button>
                                    </div>
                                  </div>
                                  {historico ? (
                                    <div className="historico">
                                      <Historico />
                                    </div>
                                  ) : (
                                    <div className="detalhes">
                                      {imoveisProposta.map((dImovel) => (
                                        <DetalhamentoImovel
                                          key={dImovel.imovel.codImovel}
                                          endereco={dImovel.imovel.endereco}
                                          bairro={dImovel.imovel.bairro}
                                          numero={dImovel.imovel.numero}
                                          valorVenda={
                                            dImovel.imovel.valorVendaOriginal
                                          }
                                          fotoCapa={
                                            dImovel.imovel.fotoCapaImovel
                                          }
                                          nomeCorretorCompra={
                                            dImovel.corretorCompra.nomeSocial
                                          }
                                          descStatusCompra={
                                            dImovel.corretorVenda
                                              .descStatusImovel
                                          }
                                          nomeCompradorVenda={
                                            dImovel.corretorVenda.nomeSocial
                                          }
                                          descStatusVenda={
                                            dImovel.corretorVenda
                                              .descStatusImovel
                                          }
                                        />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="px-4 d-flex justify-content-between align-items-center flex-wrap">
                <div className="status-page">
                  <p>
                    Mostrando transações <span>de 1 a 24</span>
                  </p>
                </div>
                <div>
                  {propostas !== null ? (
                    <>
                        {propostas.length >= 3 ? (
                        <p>Busca realizada !</p>
                      ) : (
                        <Paginacao total={100} limit={3} paginaAtual={pagina} setPagina={setPagina} />
                      )}
                    </>
                  ): ('')}
                 

                </div>
              </div>
              <div className="cod-md-2 line-gray"></div>
              <div className="px-4 my-4">
                <p className="status-information">
                  Monstrando transações já creditadas. Última atualização em
                  07.11.2021 às 17:38
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Propostas;
