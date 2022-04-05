import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import Slider from "react-slick";
import SliderRage, { SliderTooltip } from "rc-slider";
import { IoOptions } from "react-icons/io5";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdCheckmark,
} from "react-icons/io";
import CardCorretorHorizontal from "../components/Cards/CorretorHorizontal";
import CardImovel from "../components/Cards/Imovel";
import Footer from "../components/Footer";
import CardCorretor from "../components/Cards/Corretor";
import { iBuscaImoveis, iCorretores, iDataSelect, iTipos } from "../@types";
import Alert from "../components/Alert";

import "../styles/pages/buscaImoveis.scss";
import "rc-slider/assets/index.css";
import { useLocation } from "react-router-dom";
import FiltroCore from "./FiltroCore";

const { createSliderWithTooltip } = SliderRage;
const Range = createSliderWithTooltip(SliderRage.Range);
const { Handle } = SliderRage;

const handle = (props: any) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

interface iItens {
  codConjunto: number;
  descConjunto: string;
  codTipoConjunto: number;
  descTipoConjunto: string;
  itens: iDataSelect[];
}

interface iCaracteristicas {
  codConjunto: number;
  descConjunto: string;
  codTipoConjunto: number;
  descTipoConjunto: string;
  caracteristicas: iDataSelect[];
}

interface iItensSelecionados {
  codItem: number;
  codInteresse?: number;
  codCaracteristica?: number;
}

export default function BuscaImoveis() {
  var tipoOrdenacao = 0;
  const valorMinimoInicial = 0;
  const valorMaximoInicial = 1000000;
  const tamanhoMinimoInicial = 1;
  const tamanhoMaximoInicial = 30000000;

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const tipoQueryParams = searchParams.get("tipo");
  const cidadeQueryParams = searchParams.get("cidade");
  const bairroQueryParams = searchParams.get("bairro");
  const valorQueryParams = searchParams.get("valor");
  const quartosQueryParams = searchParams.get("quartos");
  const finalidadeQueryParam = searchParams.get("finalidade");
  const ateQueryParam = searchParams.get("ate");

  const [cidade, setCidade] = useState<string>(cidadeQueryParams || "");
  const [bairro, setBairro] = useState<string>(bairroQueryParams || "");
  const [tipo, setTipo] = useState<string>(tipoQueryParams || "");
  const [valor, setValor] = useState<string>(valorQueryParams || "");
  const [quartos, setQuartos] = useState<string>(quartosQueryParams || "");

  const [tipos, setTipos] = useState<iTipos[]>([]);
  const [imoveis, setImoveis] = useState<iBuscaImoveis[]>([]);
  const [corretores, setCorretores] = useState<iCorretores[]>([]);
  console.log(
    "🚀 ~ file: BuscaImoveis.tsx ~ line 92 ~ BuscaImoveis ~ corretores",
    corretores
  );
  const [loading, setLoading] = useState(false);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const [telaVazia, setTelaVazia] = useState(false);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(1);
  // const [tipoOrdenacao, setTipoOrdenacao] = useState(0);

  // Itens e caracteristicas
  const [itens, setItens] = useState<iItens[]>([]);
  const [caracteristicas, setCaracteristicas] = useState<iCaracteristicas[]>(
    []
  );
  const [itensSelecionados, setItensSelecionados] = useState<any>([]);
  const [caracteristicasSelecionadas, setCaracteristicasSelecionadas] =
    useState<any>([]);

  // MODAL
  let [rangeValor, setRangeValor] = useState([
    valorMinimoInicial,
    valorMaximoInicial,
  ]);
  const [rangeTamanho, setRangeTamanho] = useState([
    tamanhoMinimoInicial,
    tamanhoMaximoInicial,
  ]);
  const [filtroSuites, setFiltroSuites] = useState(0);
  // const [filtroQuartos, setFiltroQuartos] = useState(0);
  const [filtroBanheiros, setFiltroBanheiros] = useState(0);
  const [filtroVagas, setFiltroVagas] = useState(0);

  const [update, setUpdate] = useState<string>()

  let [core, setCore] = useState<FiltroCore>()

  if (!core) {
    core = new FiltroCore(setUpdate)

    setCore(core)
  }

  useEffect(() => {
    if (!core!.needReload) return;

    GetImoveis()
  }, [update])

  useEffect(() => {
    if(!cidadeQueryParams) return;

    core!.setCity(cidadeQueryParams)

    if(bairroQueryParams){
      core!.setDistrict(bairroQueryParams)
    }

    core!.reflect()
  }, [cidadeQueryParams, bairroQueryParams])

  useEffect(() => {
    if(!ateQueryParam) return;
    
    core!.applyPrice([0, parseInt(ateQueryParam)])

    core!.reflect()
  }, [ateQueryParam])

  useEffect(() => {
    if (!valorQueryParams) return;

    core!.parse(parseInt(valorQueryParams))

    core!.reflect()
  }, [valorQueryParams])

  useEffect(() => {
    if (!tipoQueryParams) return;

    core!.setType(parseInt(tipoQueryParams))

    core!.reflect()
  }, [tipoQueryParams])

  useEffect(() => {
    GetImoveis(pagina > 1)
  }, [pagina])
  
  useEffect(() => {
    GetImoveis();
    GetCorretores();
    GetTiposFinalidade();
    GetItens();
    GetCaracteristicas();
    GetTipos()
  }, []);

  const CodTipoImovel = 1;

  async function GetItens() {
    await api
      .get(`item/buscar-conjuntos?CodTipoImovel=${CodTipoImovel}`)
      .then((response) => {
        setItens(response.data.data);
      })
      .catch((error) => { });
  }
  async function GetCaracteristicas() {
    await api
      .get(`caracteristicas/buscar-conjuntos?CodTipoImovel=${CodTipoImovel}`)
      .then((response) => {
        setCaracteristicas(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function GetTipos() {
    api
      .get("imovel/tipos")
      .then((response) => {
        setTipos(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function GetTiposFinalidade() {
    let finalidade = Number(finalidadeQueryParam);
    await api
      .get(
        `Finalidade-Tipo-Imovel/buscar/autoComplete?codFinalidade=${finalidade}`
      )
      .then((response) => {
        setTipos(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  // function ArrayParams() {
  //   arrayCaracteristicas?.map(caracteristica => {
  //     caracteristicasSelecionadasFiltro = caracteristicasSelecionadasFiltro + `&caracteristica=${caracteristica}`
  //   });
  //   arrayItens?.map(item => {
  //     itensSelecionadasFiltro = itensSelecionadasFiltro + `&caracteristica=${item}`
  //   });
  // }

  async function GetCorretores() {
    setCorretores([]);
    await api
      .get("Corretor/top-corretores", {
        params: {
          QtdePagina: 6,
          Pagina: 1,
          DescCidade: cidadeQueryParams,
          DescBairro: bairroQueryParams,
        },
      })
      .then((response) => {
        setCorretores(response.data.data);
        console.log(response.data.data)
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function GetImoveis(loadMore = false) {
    setLoading(true);
    setAlertErro(false);
    let page = loadMore ? pagina : 1
    await api
      .post("imovel/busca-avancada?qtdePagina="+core!.qtyPerPage+"&pagina="+page+"&tipoOrdenacao=" + core!.sort, {
        ...core!.query,
        finalidade: Number(finalidadeQueryParam),
      })
      .then((response) => {
        if (!response.data.success) {
          return (
            setAlertErro(true),
            setMsgErro("Sem resultados para sua pesquisa"),
            setLoading(false),
            setTelaVazia(true),
            setImoveis([]),
            setTotal(0)
          );
        }

        if (cidadeQueryParams) {
          GetCorretores();
        }

        if(response.data.success){
          let registros = response.data.data.buscaAvancada

          setTotal(response.data.data.qtdeRegistroTotal);

          let result = loadMore ? [...imoveis, ...registros] : registros

          setImoveis(result)
        }
        
        setLoading(false);
        setTelaVazia(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setAlertErro(true);
        setMsgErro(
          "Não foi possivel retornar resultados para sua pesquisa. Tente novamente mais tarde."
        );
        setLoading(false);
        setTelaVazia(true);
        setTotal(0);
      });
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

  const settingsCard = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
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

  function SetTamanho(value: any) {
    setRangeTamanho(value);
  }

  return (
    <>
      <Navbar type="search" />
      <div className="container-fluid" id="busca-imoveis">
        <div className="container">
          <div className="box-filtros">
            <div className="row">
              <div className="col-lg-2 mb-3 mb-lg-0">
                <select
                  className="form-select"
                  aria-label="Escolha o valor"
                  value={core!.value}
                  onChange={e => core!.parse(e.target.value)}
                >
                  <option value="1">Escolha o valor</option>
                  <option value="2">R$ 150 mil a 250 mil</option>
                  <option value="3">R$ 350 mil a 450 mil</option>
                  <option value="4">R$ 450 mil a 650 mil</option>
                  <option value="5">R$ 650 mil a 1 milhão</option>
                  <option value="6">mais de R$ 1 milhão</option>
                </select>
              </div>
              <div className="col-lg-2 mb-3 mb-lg-0">
                <select
                  className="form-select"
                  aria-label="Escolha o tipo"
                  value={core!.type}
                  onChange={e => core!.setType(parseInt(e.target.value))}
                >
                  <option value="">Tipo do imóvel</option>
                  {tipos.map((tipo) => {
                    return (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-lg-2 mb-3 mb-lg-0">
                <select
                  className="form-select"
                  aria-label="Escolha o número de quartos"
                  defaultValue=""
                  onChange={e => core!.setQtyDorms(parseInt(e.target.value))}
                >
                  <option value="">Nº de quartos</option>
                  <option value="1">1 Quarto</option>
                  <option value="2">2 Quartos</option>
                  <option value="3">3 Quartos</option>
                  <option value="4">+4 Quartos</option>
                </select>
              </div>
              <div className="col-lg-1 mb-3 mb-lg-0">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setImoveis([]);
                    core!.reflect()
                  }}
                >
                  Filtrar
                </button>
              </div>

              <div className="col-lg-5 d-flex justify-content-lg-end">
                <button
                  type="button"
                  className="btn btn-primary bt-filtro"
                  data-bs-toggle="modal"
                  data-bs-target="#modalFiltros"
                >
                  <IoOptions size={22} />
                  Mais filtros
                </button>
              </div>
            </div>
          </div>
          {corretores ? (
            corretores.length > 0 ? (
              <div className="top-corretores">
                <div className="header">
                  <div className="row">
                    <div className="col-lg d-flex flex-grow-1 align-items-center">
                      <h4>Tenha ajuda de corretores especialistas na região</h4>
                    </div>
                    {/* <div className="col-lg-3">

                <div className="row">
                  <div className="col d-flex flex-row-reverse align-items-center">Ordenar por:</div>
                  <div className="col">
                    <select className="form-select" aria-label="Ordenar por" defaultValue="1">
                      <option value="1">Avaliação</option>
                    </select>
                  </div>
                </div>

              </div> */}
                  </div>
                </div>
                <div className="lista">
                  <Slider {...settingsCard}>
                    {corretores.map((corretor) => {
                      return (
                        <CardCorretorHorizontal
                          key={corretor.codCorretor}
                          codCorretor={corretor.codCorretor}
                          nomeCompleto={corretor.nomeCompleto}
                          codUsuario={corretor.codUsuario}
                          numeroCreci={corretor.numeroCreci}
                          dtCadastro={corretor.dtCadastro}
                          pontuacaoAtual={corretor.pontuacaoAtual}
                          mediaAvaliacao={corretor.mediaAvaliacao}
                          nomeSocial={corretor.nomeSocial}
                          img={corretor.img}
                          imoveisNoAppePlus={corretor.imoveisNoAppePlus}
                          qtdVenda={corretor.qtdVenda}
                        />
                      );
                    })}
                  </Slider>
                </div>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <div className="imoveis">
            {total ? (
              <div className="header">
                <div className="row">
                  <div className="col-lg d-flex flex-grow-1 align-items-center">
                    <h4>
                      {total}{" "}
                      {total > 1 ? "imóveis encontrados" : "imóvel encontrado"}{" "}
                      {cidade && `para ${cidade}`}
                    </h4>
                  </div>
                  <div className="col-lg-4">
                    <div className="row">
                      <div className="col d-flex flex-row-reverse align-items-center">
                        Ordenar por:
                      </div>
                      <div className="col">
                        <select
                          className="form-select"
                          aria-label="Ordenar por"
                          defaultValue="0"
                          onChange={(e) => {
                            core!.sort = Number(e.target.value)

                            core!.reflect()
                          }}
                        >
                          <option value="0">Relevância</option>
                          <option value="1">Menor preco</option>
                          <option value="2">Maior preco</option>
                          <option value="3">Novidades</option>
                          {/* 
                            Relevante = 0,
                            Menor preco = 1,
                            Maior preco =2,
                            Novidades = 3 
                          */}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {alertErro && <Alert msg={msgErro} setAlertErro={setAlertErro} />}

            <div className="lista row">
              {imoveis.map((imovel) => {
                if (imovel.tipoCard === 0) {
                  return (
                    <div
                      key={imovel.listarTopCorretoresQueryResult.codCorretor}
                      className="col-lg-3 mb-3"
                    >
                      <CardCorretor
                        key={imovel.listarTopCorretoresQueryResult.codCorretor}
                        codCorretor={
                          imovel.listarTopCorretoresQueryResult.codCorretor
                        }
                        codUsuario={
                          imovel.listarTopCorretoresQueryResult.codUsuario
                        }
                        nomeCompleto={
                          imovel.listarTopCorretoresQueryResult.nomeCompleto
                        }
                        numeroCreci={
                          imovel.listarTopCorretoresQueryResult.numeroCreci
                        }
                        dtCadastro={
                          imovel.listarTopCorretoresQueryResult.dtCadastro
                        }
                        pontuacaoAtual={
                          imovel.listarTopCorretoresQueryResult.pontuacaoAtual
                        }
                        mediaAvaliacao={
                          imovel.listarTopCorretoresQueryResult.mediaAvaliacao
                        }
                        nomeSocial={
                          imovel.listarTopCorretoresQueryResult.nomeSocial
                        }
                        img={imovel.listarTopCorretoresQueryResult.img}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={imovel.codImovel} className="col-lg-3 mb-3">
                      <CardImovel
                        key={imovel.codImovel}
                        codImovel={imovel.codImovel}
                        endereco={imovel.endereco}
                        bairro={imovel.bairro}
                        cidade={imovel.cidade}
                        uf={imovel.uf}
                        qtdeDormitorios={imovel.qtdeDormitorios}
                        qtdeSuites={imovel.qtdeSuites}
                        qtdeBanheiros={imovel.qtdeBanheiros}
                        qtdeVagasGaragem={imovel.qtdeVagasGaragem}
                        areaTotal={imovel.areaTotal}
                        valorVendaOriginal={imovel.valorVendaOriginal}
                        descImovel={imovel.descImovel}
                        descTipoImovel={imovel.descTipoImovel}
                        imgsDoImovel={imovel.imgsDoImovel}
                        codStatusAnuncio={imovel.codStatusAnuncio}
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div className="row">
              <div className="col d-flex justify-content-center">
                {imoveis.length <= total && (
                  <button
                    className="btn btn-primary btn-lg"
                    type="button"
                    disabled={loading}
                    onClick={() => {
                      setPagina(pagina + 1)
                    }}
                  >
                    {loading ? "Carregando" : "Carregar mais"}
                    {loading && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* MODAL */}
      <div
        className="modal fade"
        id="modalFiltros"
        tabIndex={-1}
        aria-labelledby="modalFiltrosLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen-sm-down modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalFiltrosLabel">
                Filtros
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="rangeValor" className="form-label mb-3">
                  Valor
                </label>

                <Range
                  min={valorMinimoInicial}
                  max={valorMaximoInicial}
                  defaultValue={rangeValor}
                  tipFormatter={(value) => `R$ ${value}`}
                  onChange={range => core!.applyPrice(range)}
                  handle={handle}
                />

                <div className="row">
                  <div className="col min">R$ {rangeValor[0]}</div>
                  <div className="col max d-flex justify-content-end">
                    R$ {rangeValor[1]}
                  </div>
                </div>
              </div>

              <hr />

              <div className="mb-3">
                <p className="label mb-3">Tipo do imóvel</p>
                <div className="row">
                  {tipos.map((tipo) => {
                    return (
                      <div key={tipo.value} className="col-lg-6 mb-3 mb-lg-0">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={tipo.value}
                            id={String(tipo.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={String(tipo.value)}
                            onClick={() => core!.setType(tipo.value)}
                          >
                            {tipo.label}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <hr />

              <div className="mb-3">
                <label htmlFor="rangeValor" className="form-label mb-3">
                  Tamanho em m²
                </label>
                <Range
                  min={tamanhoMinimoInicial}
                  max={tamanhoMaximoInicial}
                  defaultValue={rangeTamanho}
                  tipFormatter={(value) => `${value} m²`}
                  onChange={SetTamanho}
                  handle={handle}
                />

                <div className="row">
                  <div className="col min">{rangeTamanho[0]} m²</div>
                  <div className="col max d-flex justify-content-end">
                    {rangeTamanho[1]} m²
                  </div>
                </div>
              </div>

              <hr />

              <div className="mb-3">
                <div className="row">
                  <div className="col d-flex align-items-center">
                    <p className="label">Número de Suítes</p>
                  </div>
                  <div className="col d-flex justify-content-end">
                    <button
                      type="button"
                      className={`btn btn-primary ${filtroSuites === 1 && "active"
                        }`}
                      onClick={() => setFiltroSuites(1)}
                    >
                      1
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${filtroSuites === 2 && "active"
                        }`}
                      onClick={() => setFiltroSuites(2)}
                    >
                      2
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${filtroSuites === 3 && "active"
                        }`}
                      onClick={() => setFiltroSuites(3)}
                    >
                      3
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${filtroSuites === 4 && "active"
                        }`}
                      onClick={() => setFiltroSuites(4)}
                    >
                      4
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${filtroSuites === 5 && "active"
                        }`}
                      onClick={() => setFiltroSuites(5)}
                    >
                      +5
                    </button>
                  </div>
                </div>
              </div>

              <hr />

              <div className="mb-3">
                <div className="row">
                  <div className="col d-flex align-items-center">
                    <p className="label">Número de Quartos</p>
                  </div>
                  <div className="col d-flex justify-content-end">
                    <button
                      type="button"
                      className={`btn btn-primary ${quartos === "1" && "active"
                        }`}
                      onClick={() => core!.setQtyDorms(1)}
                    >
                      1
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${quartos === "2" && "active"
                        }`}
                      onClick={() => core!.setQtyDorms(2)}
                    >
                      2
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${quartos === "3" && "active"
                        }`}
                      onClick={() => core!.setQtyDorms(3)}
                    >
                      3
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${quartos === "4" && "active"
                        }`}
                      onClick={() => core!.setQtyDorms(4)}
                    >
                      4
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${quartos === "5" && "active"
                        }`}
                      onClick={() => core!.setQtyDorms(5)}
                    >
                      +5
                    </button>
                  </div>
                </div>
              </div>

              <hr />

              <div className="mb-3">
                <div className="row">
                  <div className="col d-flex align-items-center">
                    <p className="label">Número de Banheiros</p>
                  </div>
                  <div className="col d-flex justify-content-end">
                    <button
                      type="button"
                      className={`btn btn-primary ${filtroBanheiros === 1 && "active"
                        }`}
                      onClick={() => core!.setQtyToilets(1)}
                    >
                      1
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${filtroBanheiros === 2 && "active"
                        }`}
                      onClick={() => core!.setQtyToilets(2)}
                    >
                      2
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${filtroBanheiros === 3 && "active"
                        }`}
                      onClick={() => core!.setQtyToilets(3)}
                    >
                      3
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${filtroBanheiros === 4 && "active"
                        }`}
                      onClick={() => core!.setQtyToilets(4)}
                    >
                      4
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${filtroBanheiros === 5 && "active"
                        }`}
                      onClick={() => core!.setQtyToilets(5)}
                    >
                      +5
                    </button>
                  </div>
                </div>
              </div>

              <hr />

              <div className="mb-3">
                <div className="row">
                  <div className="col d-flex align-items-center">
                    <p className="label">Número de vagas</p>
                  </div>
                  <div className="col d-flex justify-content-end">
                    <button
                      type="button"
                      className={`btn btn-primary ${filtroVagas === 1 && "active"
                        }`}
                      onClick={() => core!.setQtyParking(1)}
                    >
                      1
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${filtroVagas === 2 && "active"
                        }`}
                      onClick={() => core!.setQtyParking(2)}
                    >
                      2
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${filtroVagas === 3 && "active"
                        }`}
                      onClick={() => core!.setQtyParking(3)}
                    >
                      3
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${filtroVagas === 4 && "active"
                        }`}
                      onClick={() => core!.setQtyParking(4)}
                    >
                      4
                    </button>
                    <button
                      type="button"
                      className={`btn btn-primary ${filtroVagas === 5 && "active"
                        }`}
                      onClick={() => core!.setQtyParking(5)}
                    >
                      +5
                    </button>
                  </div>
                </div>
              </div>

              <hr />

              <div className="mb-3">
                <p className="label mb-3">Características do imóvel</p>
                {caracteristicas.map((detalhe) => {
                  return (
                    <div className="mb-4" key={detalhe.codConjunto}>
                      <p className="mb-2">{detalhe.descConjunto}</p>

                      <div className="row">
                        {detalhe.caracteristicas.map((item) => {
                          return (
                            <div key={item.value} className="col-lg-6">
                              <div className="form-check" key={item.value}>
                                <input
                                  className="form-check-input"
                                  type={detalhe.descTipoConjunto}
                                  value={item.value}
                                  name={String(detalhe.codConjunto)}
                                  id={String(
                                    "c" + detalhe.codConjunto + item.value
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      if (item.value)
                                        core!.features.push(item.value)
                                    } else {
                                      let index = core!.features.findIndex(val => val == item.value)
                                      core!.features.splice(index, 1);
                                    }
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={String(
                                    "c" + detalhe.codConjunto + item.value
                                  )}
                                >
                                  {item.label}
                                </label>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <hr />

              <div className="mb-3">
                <p className="label mb-3">Itens do imóvel</p>
                {itens.map((detalhe) => {
                  return (
                    <div className="mb-4" key={detalhe.codConjunto}>
                      <p className="mb-2">{detalhe.descConjunto}</p>
                      <div className="row">
                        {detalhe.itens.map((item) => {
                          return (
                            <div className="col-lg-6" key={item.value}>
                              <div className="form-check" key={item.value}>
                                <input
                                  className="form-check-input"
                                  type={detalhe.descTipoConjunto}
                                  value={item.value}
                                  name={String(detalhe.codConjunto)}
                                  id={String(
                                    "i" + detalhe.codConjunto + item.value
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      if (item.value)
                                        core!.itens.push(item.value)
                                    } else {
                                      let index = core!.itens.findIndex(val => val == item.value)
                                      core!.itens.splice(index, 1);
                                    }
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={String(
                                    "i" + detalhe.codConjunto + item.value
                                  )}
                                >
                                  {item.label}
                                </label>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => core!.reflect()}
              >
                Aplicar filtros
                <IoMdCheckmark />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}