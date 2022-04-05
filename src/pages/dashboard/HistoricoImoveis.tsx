import NavbarDashCorretor from "../../components/Navbar/NavbarDashCorretor";
import NavbarDashHeaderCorretor from "../../components/Navbar/NavbarDashHeaderCorretor";
import "../../styles/pages/dashboard/historicoImoveis.scss";
import Imovel from "../../assets/internas/cozinha.png";
import {
  FaCheckCircle,
  FaShower,
  FaCar,
  FaWhatsappSquare,
  FaPhoneAlt,
  FaRegEnvelope,
  FaSearch,
  FaDollarSign,
  FaRegCommentAlt,
  FaRegTimesCircle,
} from "react-icons/fa";
import { BiBed, BiArea } from "react-icons/bi";
import { IoOptions } from "react-icons/io5";
import Corretor from "../../assets/internas/corretor.png";
import Paginacao from "../../components/Paginacao";
import { useEffect, useState } from "react";
import { HiOutlineDownload } from "react-icons/hi";
import api from "../../services/api";
import { iDadosUsuario } from "../../@types";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { EmailShareButton, WhatsappShareButton } from "react-share";
import { HistoricoClientes } from "./HistoricoClientes";
import { useHistory } from "react-router";

interface iHistorico {
  codHistoricoImovel: number;
  codImovel: number;
  codTipoHistoricoImovel: number;
  descHistoricoImovel: string;
  dtHistorico: string;
  codProposta: number;
  codCompromisso: number;
  userEdicao: number;
  dtCorreta: string;
}
interface iHistoricoCorretor {
  codCorretor: number;
  codUsuario: number;
  nomeCompleto: string;
  nomeSocial: string;
  dtAtualizacao: string;
  img: string[];
  telefone: number;
  email: string;
}
interface iHistoricoImovel {
  codImovel: number;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  qtdeDormitorios: number;
  qtdeSuites: number;
  qtdeBanheiros: number;
  qtdeVagasGaragem: number;
  areaTotal: number;
  valorVendaOriginal: number;
  valorVenda: number;
  descImovel: string;
  descTipoImovel: string;
  imgsDoImovel: [string];
}

export function HistoricoImoveis() {
  const [pagina, setPagina] = useState(1);
  const [historico, setHistorico] = useState<iHistorico[]>([]);
  const [imovel, setImovel] = useState<iHistoricoImovel>();
  const [corretor, setCorretor] = useState<iHistoricoCorretor>();
  const [historicoImoveis, setHistoricoImoveis] = useState(false);
  const [imovelFiltroVisita, setImovelFiltroVisita] = useState<iHistorico[]>(
    []
  );
  const [imovelFiltroMudancaValor, setImovelFiltroMudancaValor] = useState<
    iHistorico[]
  >([]);
  const [imovelFiltroPropostas, setImovelFiltroPorpostas] = useState<
    iHistorico[]
  >([]);
  const [visita, setVisita] = useState(false);
  const [mudancaValor, setMudancaValor] = useState(false);
  const [propostas, setPropostas] = useState(false);
  const [semFiltro, setSemFiltro] = useState(true);
  const [naoEncontrou, setNaoEncontrou] = useState(false);
  const [naoEncontrouVisita, setNaoEncontrouVisita] = useState(false);
  const [naoEncontrouMudanca, setNaoEncontrouMudanca] = useState(false);
  const [naoEncontrouProposta, setNaoEncontrouProposta] = useState(false);
  const codImovel = Number(localStorage.getItem("@appePlus/codImovel"));
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  var data = "";
  var dia = "";
  var mes = "";
  var ano = "";
  const shareUrl = window.location.href;

  const botaoVisita = document.querySelector("#botaoVisita");
  const botaoMudanca = document.querySelector("#botaoMudanca");
  const botaoPropostas = document.querySelector("#botaoPropostas");

  const history = useHistory();

  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  useEffect(() => {
    checaUsuarioLogado();
    accordionActiveClass();
    getHistoricoImovel();
  }, []);

  async function getHistoricoImovel() {
    await api
      .get(`HistoricoImovel/buscar-historico-por-imovel?codImovel=${codImovel}`)
      .then((response) => {
        if (response.data.data === null) {
          setNaoEncontrou(true);
          setSemFiltro(false);
        } else {
          setNaoEncontrou(false);
          setImovel(response.data.data.imovel);
          setCorretor(response.data.data.corretor);
          dataCorrecao(response.data.data.historico);
          setSemFiltro(true);
        }
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function getHistoricoImovelFiltroVisita() {
    setNaoEncontrouProposta(false);
    setNaoEncontrouMudanca(false);
    if (!visita && !naoEncontrouVisita) {
      await api
        .get(
          `HistoricoImovel/buscar-historico-por-imovel?codImovel=${codImovel}&codTipo=1`
        )
        .then((response) => {
          if (response.data.data === null) {
            setNaoEncontrou(true);
            setSemFiltro(false);
            setMudancaValor(false);
            setPropostas(false);
            setVisita(true);
            botaoVisita?.classList.add("ativo");
            botaoMudanca?.classList.remove("ativo");
            botaoPropostas?.classList.remove("ativo");
            setNaoEncontrouVisita(true);
          } else {
            dataCorrecao(response.data.data.historico);
            setVisita(true);
            setSemFiltro(false);
            setMudancaValor(false);
            setPropostas(false);
            setNaoEncontrou(false);
            botaoVisita?.classList.add("ativo");
            botaoMudanca?.classList.remove("ativo");
            botaoPropostas?.classList.remove("ativo");
          }
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
        });
    } else {
      setVisita(false);
      setSemFiltro(true);
      setNaoEncontrou(false);
      botaoVisita?.classList.remove("ativo");
      setNaoEncontrouVisita(false);
    }
  }
  async function getHistoricoImovelFiltroMudanca() {
    setNaoEncontrouVisita(false);
    setNaoEncontrouProposta(false);
    if (!mudancaValor && !naoEncontrouMudanca) {
      await api
        .get(
          `HistoricoImovel/buscar-historico-por-imovel?codImovel=${codImovel}&codTipo=2`
        )
        .then((response) => {
          if (response.data.data === null) {
            setNaoEncontrou(true);
            setMudancaValor(true);
            setSemFiltro(false);
            setPropostas(false);
            setVisita(false);
            botaoMudanca?.classList.add("ativo");
            botaoVisita?.classList.remove("ativo");
            botaoPropostas?.classList.remove("ativo");
            setNaoEncontrouMudanca(true);
          } else {
            dataCorrecao(response.data.data.historico);
            setVisita(false);
            setSemFiltro(false);
            setMudancaValor(true);
            setPropostas(false);
            setNaoEncontrou(false);
            botaoMudanca?.classList.add("ativo");
            botaoVisita?.classList.remove("ativo");
            botaoPropostas?.classList.remove("ativo");
          }
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
        });
    } else {
      setMudancaValor(false);
      setSemFiltro(true);
      setNaoEncontrou(false);
      botaoMudanca?.classList.remove("ativo");
      setNaoEncontrouMudanca(false);
    }
  }
  async function getHistoricoImovelFiltroPropostas() {
    setNaoEncontrouMudanca(false);
    setNaoEncontrouVisita(false);
    if (!propostas && !naoEncontrouProposta) {
      await api
        .get(
          `HistoricoImovel/buscar-historico-por-imovel?codImovel=${codImovel}&codTipo=3&codTipo=4`
        )
        .then((response) => {
          if (response.data.data === null) {
            setNaoEncontrou(true);
            setSemFiltro(false);
            setMudancaValor(false);
            setVisita(false);
            setPropostas(true);
            botaoPropostas?.classList.add("ativo");
            botaoMudanca?.classList.remove("ativo");
            botaoVisita?.classList.remove("ativo");
            setNaoEncontrouProposta(true);
          } else {
            dataCorrecao(response.data.data.historico);
            setVisita(false);
            setSemFiltro(false);
            setMudancaValor(false);
            setPropostas(true);
            setNaoEncontrou(false);
            botaoPropostas?.classList.add("ativo");
            botaoMudanca?.classList.remove("ativo");
            botaoVisita?.classList.remove("ativo");
          }
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
        });
    } else {
      setPropostas(false);
      setSemFiltro(true);
      setNaoEncontrou(false);
      botaoPropostas?.classList.remove("ativo");
      setNaoEncontrouProposta(false);
    }
  }

  function dataCorrecao(hist: iHistorico[]) {
    hist.map((dt) => {
      data = dt.dtHistorico;
      dia = data.substring(8, 10);
      mes = data.substring(5, 7);
      ano = data.substring(0, 4);
      dt.dtCorreta = dia + "." + mes + "." + ano;
    });
    setHistorico(hist);
    setImovelFiltroVisita(hist);
    setImovelFiltroMudancaValor(hist);
    setImovelFiltroPorpostas(hist);
  }
  // dataAtual
  const novaData = new Date();
  const diaAtual = String(novaData.getDate()).padStart(2, "0");
  const mesAtual = String(novaData.getMonth() + 1).padStart(2, "0");
  const anoAtual = novaData.getFullYear();
  const horaAtual = String(novaData.getHours());
  const minutosAtual = String(novaData.getMinutes());
  const dataAtual =
    diaAtual +
    "/" +
    mesAtual +
    "/" +
    anoAtual +
    " às " +
    horaAtual +
    ":" +
    minutosAtual;

  function accordionActiveClass() {
    const accordion = document.querySelectorAll(".accordion-button");
    const li = document.querySelectorAll(".lista");

    accordion.forEach((button, index) => {
      button.addEventListener("click", () => {
        tabButton(index);
      });
    });
    function tabButton(index: any) {
      li.forEach((teste) => {
        teste.classList.remove("ativo");
      });
      li[index].classList.add("ativo");
    }
  }

  const settingsCard = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "slides",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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

  return (
    <div id="historico">
      <NavbarDashCorretor />
      <div className="main-content">
        <NavbarDashHeaderCorretor />
        <div className="container">
          <section className="my-4 head">
            <div className="row">
              <div className="col-lg-10 mt-2">
                <h2>
                  Histórico de {historicoImoveis ? "imóveis" : "clientes"}
                </h2>
              </div>
              <div className="col-lg-2 d-flex justify-content-end">
                <div className="segmented-control">
                  <button
                    className={`btn item ${!historicoImoveis ? "active" : ""}`}
                    onClick={() => setHistoricoImoveis(false)}
                  >
                    Clientes
                  </button>
                  <button
                    className={`btn item ${historicoImoveis ? "active" : ""}`}
                    onClick={() => setHistoricoImoveis(true)}
                  >
                    Imóveis
                  </button>
                </div>
              </div>
            </div>
          </section>
          {historicoImoveis ? (
            <>
              <section className="imovel">
                <div className="row">
                  <div className="col-lg-4 imovel-img">
                    <Slider {...settingsCard}>
                      {imovel?.imgsDoImovel.map((imagens) => {
                        return <img src={imagens ? imagens : Imovel} />;
                      })}
                    </Slider>
                  </div>
                  <div className="col-lg-4 card imovel-detalhes">
                    <p
                      style={{
                        fontSize: 12,
                        color: "#ADADAD",
                        marginBottom: 5,
                      }}
                    >
                      {imovel?.descTipoImovel}
                    </p>
                    <h4>
                      {imovel?.endereco} <FaCheckCircle />
                    </h4>
                    <p>{imovel?.bairro}</p>
                    <div className="line-gray"></div>
                    <div className="caracteristicas">
                      <div className="d-block">
                        <BiArea
                          size={28}
                          color="#ADADAD"
                          style={{ marginBottom: 10 }}
                        />
                        <p>{imovel?.areaTotal} m²</p>
                      </div>
                      <div className="d-block">
                        <FaShower
                          size={28}
                          color="#ADADAD"
                          style={{ marginBottom: 10 }}
                        />
                        <p>{imovel?.qtdeBanheiros} Banheiros</p>
                      </div>
                      <div className="d-block">
                        <BiBed
                          size={28}
                          color="#ADADAD"
                          style={{ marginBottom: 10 }}
                        />
                        <p>{imovel?.qtdeDormitorios} Quartos</p>
                      </div>
                      <div className="d-block">
                        <FaCar
                          size={28}
                          color="#ADADAD"
                          style={{ marginBottom: 10 }}
                        />
                        <p>{imovel?.qtdeVagasGaragem} Vagas</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 imovel-corretor">
                    <p className="last-update">Última atualização em</p>
                    <p>{dataAtual}</p>
                    <div className="card py-2">
                      <div className="d-flex">
                        <img
                          src={corretor?.img[0] ? corretor?.img[0] : Corretor}
                        />
                        <div className="mt-2">
                          <p
                            style={{
                              fontSize: 12,
                              color: "#ADADAD",
                              marginBottom: 0,
                            }}
                          >
                            Proprietário
                          </p>
                          <p>{corretor?.nomeSocial}</p>
                        </div>
                      </div>
                      <div className="mx-3 line-gray"></div>
                      <div className="info">
                        <div className="update-info">
                          <p>Atualizado em</p>
                          <p>{corretor?.dtAtualizacao}</p>
                        </div>
                        <div className="contatos">
                          <div>
                            <WhatsappShareButton
                              url={shareUrl}
                              title={`AppePlus - Histórico do imóvel ${imovel?.codImovel}`}
                            >
                              <FaWhatsappSquare color={`#3BC14A`} size={48} />
                            </WhatsappShareButton>
                          </div>
                          <div className="icon-box">
                            <FaPhoneAlt size={16} color={"#ADADAD"} />
                          </div>

                          {corretor?.email ? (
                            <div className="icon-box">
                              <EmailShareButton
                                url={shareUrl}
                                subject={`AppePlus - Histórico do imóvel ${imovel?.codImovel}`}
                                body={`Imóvel compartilhado do AppePlus.`}
                              >
                                <FaRegEnvelope size={18} color={"#ADADAD"} />
                              </EmailShareButton>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="historico-imovel">
                <div className="card">
                  {/* <div className="busca">
                                <div className="busca-campo">
                                    <div className="icone"><FaSearch size={18} style={{ marginRight: 10 }} /></div>
                                    <input type="text" placeholder="Busque por atualização" className="campo-filtro" />
                                </div>
                                <div><button className="buttonBuscar">Encontrar atualização <FaSearch style={{ marginLeft: 10 }} /></button></div>
                            </div> */}
                  <div className="filtros">
                    <div className="filtros-fixos">
                      <div>
                        <button
                          type="button"
                          id="botaoVisita"
                          className={visita ? "ativo" : ""}
                          onClick={getHistoricoImovelFiltroVisita}
                        >
                          Visitas
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          id="botaoMudanca"
                          className={mudancaValor ? "ativo" : ""}
                          onClick={getHistoricoImovelFiltroMudanca}
                        >
                          Mudanças no valor
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          id="botaoPropostas"
                          className={propostas ? "ativo" : ""}
                          onClick={getHistoricoImovelFiltroPropostas}
                        >
                          Propostas{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 historico-lista">
                    <div className="row">
                      <div className="col-md-12">
                        {visita &&
                          !naoEncontrou &&
                          imovelFiltroVisita.map((hist, index) => {
                            return (
                              <ul className="timeline" key={hist.codImovel}>
                                <div
                                  className="accordion"
                                  id="accordionExample"
                                >
                                  <div className="accordion-item">
                                    <div
                                      className="accordion-header"
                                      id={`heading${index}`}
                                    >
                                      <li className="lista">
                                        <div className="data">
                                          {hist.dtCorreta}
                                        </div>
                                        <button
                                          className="accordion-button collapsed"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target={`#collapse${index}`}
                                          aria-expanded="false"
                                          aria-controls={`collapse${index}`}
                                          onClick={accordionActiveClass}
                                        >
                                          {hist.codTipoHistoricoImovel == 1 && (
                                            <div>
                                              <p>
                                                <FaSearch
                                                  color="#FD4A19"
                                                  style={{ marginRight: 10 }}
                                                />{" "}
                                                Visita realizada
                                              </p>
                                            </div>
                                          )}
                                          {hist.codTipoHistoricoImovel == 2 && (
                                            <div>
                                              <p>
                                                <FaDollarSign
                                                  color="#3BC14A"
                                                  style={{ marginRight: 10 }}
                                                />{" "}
                                                Mudança de valor
                                              </p>
                                            </div>
                                          )}
                                          {hist.codTipoHistoricoImovel == 3 && (
                                            <div>
                                              <p>
                                                <HiOutlineDownload
                                                  color="#0065DD"
                                                  style={{ marginRight: 10 }}
                                                />{" "}
                                                Proposta recebida
                                              </p>
                                            </div>
                                          )}
                                          {hist.codTipoHistoricoImovel == 4 && (
                                            <div>
                                              <p>
                                                <FaRegTimesCircle
                                                  color="red"
                                                  style={{ marginRight: 10 }}
                                                />{" "}
                                                Proposta reprovada
                                              </p>
                                            </div>
                                          )}
                                        </button>
                                      </li>
                                    </div>
                                    <div
                                      id={`collapse${index}`}
                                      className="accordion-collapse collapse"
                                      aria-labelledby={`heading${index}`}
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body conteudo">
                                        <p>{hist.descHistoricoImovel}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </ul>
                            );
                          })}
                        {semFiltro &&
                          !naoEncontrou &&
                          historico.map((hist, index) => {
                            return (
                              <ul className="timeline" key={hist.codImovel}>
                                <div
                                  className="accordion"
                                  id="accordionExample"
                                >
                                  <div className="accordion-item">
                                    <div
                                      className="accordion-header"
                                      id={`heading${index}`}
                                    >
                                      <li className="lista">
                                        <div className="data">
                                          {hist.dtCorreta}
                                        </div>
                                        <button
                                          className="accordion-button collapsed"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target={`#collapse${index}`}
                                          aria-expanded="false"
                                          aria-controls={`collapse${index}`}
                                          onClick={accordionActiveClass}
                                        >
                                          {hist.codTipoHistoricoImovel == 1 && (
                                            <div>
                                              <p>
                                                <FaSearch
                                                  color="#FD4A19"
                                                  style={{ marginRight: 10 }}
                                                />{" "}
                                                Visita realizada
                                              </p>
                                            </div>
                                          )}
                                          {hist.codTipoHistoricoImovel == 2 && (
                                            <div>
                                              <p>
                                                <FaDollarSign
                                                  color="#3BC14A"
                                                  style={{ marginRight: 10 }}
                                                />{" "}
                                                Mudança de valor
                                              </p>
                                            </div>
                                          )}
                                          {hist.codTipoHistoricoImovel == 3 && (
                                            <div>
                                              <p>
                                                <HiOutlineDownload
                                                  color="#0065DD"
                                                  style={{ marginRight: 10 }}
                                                />{" "}
                                                Proposta recebida
                                              </p>
                                            </div>
                                          )}
                                          {hist.codTipoHistoricoImovel == 4 && (
                                            <div>
                                              <p>
                                                <FaRegTimesCircle
                                                  color="red"
                                                  style={{ marginRight: 10 }}
                                                />{" "}
                                                Proposta reprovada
                                              </p>
                                            </div>
                                          )}
                                        </button>
                                      </li>
                                    </div>
                                    <div
                                      id={`collapse${index}`}
                                      className="accordion-collapse collapse"
                                      aria-labelledby={`heading${index}`}
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body conteudo">
                                        <p>{hist.descHistoricoImovel}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </ul>
                            );
                          })}
                        {mudancaValor &&
                          !naoEncontrou &&
                          imovelFiltroMudancaValor.map((hist, index) => {
                            return (
                              <ul className="timeline" key={hist.codImovel}>
                                <div
                                  className="accordion"
                                  id="accordionExample"
                                >
                                  <div className="accordion-item">
                                    <div
                                      className="accordion-header"
                                      id={`heading${index}`}
                                    >
                                      <li className="lista">
                                        <div className="data">
                                          {hist.dtCorreta}
                                        </div>
                                        <button
                                          className="accordion-button collapsed"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target={`#collapse${index}`}
                                          aria-expanded="false"
                                          aria-controls={`collapse${index}`}
                                          onClick={accordionActiveClass}
                                        >
                                          {hist.codTipoHistoricoImovel == 1 && (
                                            <div>
                                              <p>
                                                <FaSearch
                                                  color="#FD4A19"
                                                  style={{ marginRight: 10 }}
                                                />{" "}
                                                Visita realizada
                                              </p>
                                            </div>
                                          )}
                                          {hist.codTipoHistoricoImovel == 2 && (
                                            <div>
                                              <p>
                                                <FaDollarSign
                                                  color="#3BC14A"
                                                  style={{ marginRight: 10 }}
                                                />{" "}
                                                Mudança de valor
                                              </p>
                                            </div>
                                          )}
                                          {hist.codTipoHistoricoImovel == 3 && (
                                            <div>
                                              <p>
                                                <HiOutlineDownload
                                                  color="#0065DD"
                                                  style={{ marginRight: 10 }}
                                                />{" "}
                                                Proposta recebida
                                              </p>
                                            </div>
                                          )}
                                          {hist.codTipoHistoricoImovel == 4 && (
                                            <div>
                                              <p>
                                                <FaRegTimesCircle
                                                  color="red"
                                                  style={{ marginRight: 10 }}
                                                />{" "}
                                                Proposta reprovada
                                              </p>
                                            </div>
                                          )}
                                        </button>
                                      </li>
                                    </div>
                                    <div
                                      id={`collapse${index}`}
                                      className="accordion-collapse collapse"
                                      aria-labelledby={`heading${index}`}
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body conteudo">
                                        <p>{hist.descHistoricoImovel}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </ul>
                            );
                          })}
                        {propostas &&
                          !naoEncontrou &&
                          imovelFiltroPropostas.map((hist, index) => {
                            return (
                              <ul className="timeline" key={hist.codImovel}>
                                <div
                                  className="accordion"
                                  id="accordionExample"
                                >
                                  <div className="accordion-item">
                                    <div
                                      className="accordion-header"
                                      id={`heading${index}`}
                                    >
                                      <li className="lista">
                                        <div className="data">
                                          {hist.dtCorreta}
                                        </div>
                                        <button
                                          className="accordion-button collapsed"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target={`#collapse${index}`}
                                          aria-expanded="false"
                                          aria-controls={`collapse${index}`}
                                          onClick={accordionActiveClass}
                                        >
                                          {hist.codTipoHistoricoImovel == 1 && (
                                            <div>
                                              <p>
                                                <FaSearch
                                                  color="#FD4A19"
                                                  style={{ marginRight: 10 }}
                                                />{" "}
                                                Visita realizada
                                              </p>
                                            </div>
                                          )}
                                          {hist.codTipoHistoricoImovel == 2 && (
                                            <div>
                                              <p>
                                                <FaDollarSign
                                                  color="#3BC14A"
                                                  style={{ marginRight: 10 }}
                                                />{" "}
                                                Mudança de valor
                                              </p>
                                            </div>
                                          )}
                                          {hist.codTipoHistoricoImovel == 3 && (
                                            <div>
                                              <p>
                                                <HiOutlineDownload
                                                  color="#0065DD"
                                                  style={{ marginRight: 10 }}
                                                />{" "}
                                                Proposta recebida
                                              </p>
                                            </div>
                                          )}
                                          {hist.codTipoHistoricoImovel == 4 && (
                                            <div>
                                              <p>
                                                <FaRegTimesCircle
                                                  color="red"
                                                  style={{ marginRight: 10 }}
                                                />{" "}
                                                Proposta reprovada
                                              </p>
                                            </div>
                                          )}
                                        </button>
                                      </li>
                                    </div>
                                    <div
                                      id={`collapse${index}`}
                                      className="accordion-collapse collapse"
                                      aria-labelledby={`heading${index}`}
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body conteudo">
                                        <p>{hist.descHistoricoImovel}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </ul>
                            );
                          })}
                        {naoEncontrou && (
                          <div>
                            <p>Não existe histórico deste tipo.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="d-block">
                    <div className="paginas">
                      <div className="status-page">
                        <p>
                          Mostrando transações <span>de 1 a 24</span>
                        </p>
                      </div>
                      <div>
                        {historico.length >= 5 ? (
                          <Paginacao
                            total={100}
                            limit={5}
                            paginaAtual={pagina}
                            setPagina={setPagina}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="mx-4 line-gray"></div>
                    <div className="px-4 my-4">
                      <p className="status-information">
                        Monstrando transações já creditadas. Última atualização
                        em {dataAtual}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <HistoricoClientes />
          )}
        </div>
      </div>
    </div>
  );
}
