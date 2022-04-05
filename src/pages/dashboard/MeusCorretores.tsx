import Footer from "../../components/Footer";
import "../../styles/pages/dashboard/meusCorretores.scss";
import { FaRedoAlt } from "react-icons/fa";
import { FormEvent, useEffect, useState } from "react";
import CardMeuCorretor from "../../components/Cards/MeuCorretor";
import FiltroMeusCorretores from "../../components/Form/cadastro/filtroMeusCorretores";
import api from "../../services/api";
import { iDadosUsuario } from "../../@types";
import NavbarDash from "../../components/Navbar/NavbarDash";
import NavbarDashHeader from "../../components/Navbar/NavbarDashHeader";
import Paginacao from "../../components/Paginacao";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router";
import { useHistory } from "react-router";

interface iCorretorImoveis {
  corretor: iCorretor;
  imoveis: iImoveis[];
}
interface iCorretor {
  codCorretor: number;
  codUsuario: number;
  nomeCompleto: string;
  dtNascimento: string;
  numeroCreci: number;
  rg: number;
  cpfcnpj: number;
  telefone: number;
  endereco: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  nomeSocial: string;
  cep: number;
  codOrigemCadastro: number;
  codCorretorIndicacao: number;
  tokenCadastro: string;
  dtCadastro: string;
  userCadastro: number;
  dtAtualizacao: string;
  userAtualizacao: number;
  dtExclusao: string;
  userExclusao: string;
  motivoExclusao: string;
  pontuacaoAtual: number;
  mediaAvaliacao: number;
  img: string;
  codCorretorCompra: number;
  codCorretorVenda: number;
  descStatusImovel: string;
  codImovel: number;
  fotoCapaImovel: string;
}
interface iImoveis {
  codImovel: number;
  codClienteVendedor: number;
  codCorretorVendedor: number;
  endereco: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: number;
  latitude: number;
  longitude: number;
  qtdeVisualizacoes: number;
  codStatus: number;
  descStatus: string;
  codTipoImovel: number;
  valorVendaOriginal: number;
  valorVenda: number;
  dtVenda: string;
  dtCadastro: string;
  userCadastro: number;
  dtAtualizacao: string;
  userAtualizacao: number;
  dtExclusao: string;
  userExclusao: number;
  motivoExclusao: string;
  codMotivoExclusao: number;
  codStatusAnuncio: number;
  urlCapaImovel: string;
  codCorretorCompra: number;
}
const usuario: iDadosUsuario = JSON.parse(
  localStorage.getItem("@appePlus/usuario") || "{}"
);

export default function MeusCorretores() {
  const [corretorImovel, setCorretorImovel] = useState<iCorretorImoveis[]>([]);
  let [filterCorretor, setFilterCorretor] = useState<iCorretorImoveis[]>([]);
  const [filter, setFilter] = useState<iCorretorImoveis[]>([]);
  const [pagina, setPagina] = useState(1);
  const [valor, setValor] = useState("0");
  const [statusProposta, setStatusProposta] = useState("0");
  const [statusContrato, setStatusContrato] = useState("");
  const [select, setSelect] = useState("");
  const [ordenar, setOrdenar] = useState("MediaAvaliacao");
  const [inputSearch, setInputSearch] = useState("");
  const [searchCorretor, setSearchCorretor] = useState("");
  const [searchGetFilterCorretor, setSearchGetFilterCorretor] = useState(false);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const valorQueryParams = searchParams.get("valor");

  const filtroNomeCreci = corretorImovel.filter((corretor) => {
    return (
      corretor?.corretor.nomeCompleto
        ?.toString()
        .toLowerCase()
        .includes(inputSearch.toString().toLowerCase()) ||
      corretor?.corretor.numeroCreci
        ?.toString()
        .toLowerCase()
        .includes(inputSearch.toString().toLowerCase())
    );
  });
  const history = useHistory();

  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  async function buscaCorretores() {
    if (usuario.token) {
      await api
        .get(
          `Corretor/imoveis-corretor-por-cliente?CodCliente=${usuario.codCliente}&Pagina=${pagina}&QtdePagina=3`
        )
        .then((response) => {
          console.log(response.data.data)
          setCorretorImovel(response.data.data);
        }).catch((error)=> {
          console.log(error)
        })
    }
  }
  /* async function buscaFiltroCorretores() {
        await api.get(`Corretor/imoveis-corretor-por-cliente?CodCliente=${usuario.codCliente}&Pagina=${pagina}&QtdePagina=3`)
            .then(Response => {
                filterCorretor = Response.data.data;
                setSearchGetFilterCorretor(true)
                const filter = filterCorretor.filter(corretor => {
                    return (
                        corretor?.corretor.numeroCreci.toString().toLowerCase().includes(searchCorretor.toString().toLowerCase()) ||
                        corretor?.corretor.nomeCompleto.toString().toLowerCase().includes(searchCorretor.toString().toLowerCase())
                    );
                });
                setFilter(filter)
            })
            .catch(error => {
                console.log("Ocorreu um erro")
            })
    } */
  async function filterCorretores() {
    const valorMin = "ValorImovelMin";
    const valorMax = "ValorImovelMax";
    const vMinimo = valorMinimo(valor ? valor : valorQueryParams || "");
    const vMaximo = valorMaximo(valor ? valor : valorQueryParams || "");
    /* const status = statusProposta */

    if (searchCorretor === null) {
      setSearchCorretor("0");
    }
    api
      .get(
        `Corretor/imoveis-corretor-por-cliente?CodCliente=${usuario.codCliente}&Pagina=${pagina}&QtdePagina=3&${valorMin}=${vMinimo}&${valorMax}=${vMaximo}&ordenar=${ordenar}`
      )
      .then((response) => {
        setFilter(response.data.data);
        setSearchGetFilterCorretor(true);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
  const valorMinimo = (valorQueryParams: string) => {
    switch (valorQueryParams) {
      case "2":
        return 150000;
      case "3":
        return 350000;
      case "4":
        return 450000;
      case "5":
        return 650000;
      default:
        return 0;
    }
  };
  const valorMaximo = (valorQueryParams: string) => {
    switch (valorQueryParams) {
      case "2":
        return 250000;
      case "3":
        return 450000;
      case "4":
        return 650000;
      case "5":
        return 1000000;
      case "6":
        return 10000000;
      default:
        return 0;
    }
  };

  function handleCorretor(event: FormEvent) {
    event.preventDefault();
    if (/* searchCorretor === "" &&  */ valor === "0") {
      buscaCorretores();
      setSearchGetFilterCorretor(false);
    } else {
      /* if (valor === '0') {
                buscaFiltroCorretores();
            } else {
                filterCorretores();
            } */
      filterCorretores();
    }
  }

  useEffect(() => {
    checaUsuarioLogado();
    buscaCorretores();
  }, [pagina]);

  return (
    <>
      <div className="grapper wrapper-imoveis">
        <NavbarDash />
        <div className="main-content">
          <NavbarDashHeader />
          <div className="container col-lg-12 mt-2">
            <section className="my-4 ">
              <div className="row">
                <div className="col-lg-10">
                  <h2 className="pageTitle">Meus corretores</h2>
                </div>
                <div
                  className="col-lg-2"
                  style={{ alignSelf: "end", textAlign: "end" }}
                >
                  <button className="buttonUpdate" onClick={buscaCorretores}>
                    Atualizar
                    <FaRedoAlt size={14} style={{ marginLeft: 10 }} />
                  </button>
                </div>
              </div>
            </section>
            <section className="meus-corretores">
              <form onSubmit={handleCorretor}>
                <div className="filtro-corretor my-3 col-lg-12">
                  <input
                    type="text"
                    placeholder="Busque por nome ou CRECI"
                    className="campo-filtro"
                    onChange={(e) => setInputSearch(e.target.value)}
                  />
                  <button type="submit" className="buttonBuscar">
                    Encontrar corretor <FaSearch style={{ marginLeft: 10 }} />
                  </button>
                </div>
              </form>
              <div className="row mx-2 my-4">
                <div className="col-lg-3 mb-3 mb-lg-0">
                  <select
                    className="form-select campo-select"
                    aria-label="Valor do imóvel"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                  >
                    <option value="0">Valor do imóvel</option>
                    <option value="2">R$ 150 mil a 250 mil</option>
                    <option value="3">R$ 350 mil a 450 mil</option>
                    <option value="4">R$ 450 mil a 650 mil</option>
                    <option value="5">R$ 650 mil a 1 milhão</option>
                    <option value="6">mais de R$ 1 milhão</option>
                  </select>
                </div>
                {/* <div className="col-lg-3 mb-3 mb-lg-0">
                                    <select className="form-select campo-select" aria-label="Status da proposta" value={statusProposta}
                                        onChange={(e) => setStatusProposta(e.target.value)}
                                    >
                                        <option value="0">Status da proposta</option>
                                        <option value="1">Vendido</option>
                                        <option value="2">Aguard. aprovação</option>
                                        <option value="3">Em elaboração</option>

                                    </select>
                                </div> */}
                {/* <div className="col-lg-3 mb-3 mb-lg-0">
                    <select className="form-select campo-select" aria-label="Escolha o número de quartos" defaultValue=""
                        onChange={(e) => setStatusContrato(e.target.value)}>
                        <option value="">Status do contrato</option>
                        <option value="1">Vendido</option>
                        <option value="2">Aguard. aprovação</option>
                        <option value="3">Em elaboração</option>
                    </select>
                </div> */}

                {/* <div className="col-lg-3 d-flex justify-content-lg-end">
                    <button type="button" className="buttonMais" >
                        <IoOptions style={{ marginRight: 10 }} size={22} />
                        Mais filtros
                    </button>
                </div> */}
              </div>
              <div className="row mx-2 blue-filter col-lg-12">
                {/* <div className="col-lg-6  my-2 d-flex first-filter">
                    <p>Tipo de corretor: </p>
                    <select className="caixa-select" value={select} onChange={({ target }) => setSelect(target.value)}>
                        <option value="comprador">Comprador</option>
                        <option value="vendedor">Vendedor</option>
                    </select>
                </div> */}
                <div className="col-lg-6  my-2 d-flex second-filter">
                  <p>Ordenar por: </p>
                  <select
                    className="caixa-select"
                    value={ordenar}
                    onChange={({ target }) => setOrdenar(target.value)}
                  >
                    <option value="MediaAvaliacao">Média avaliação</option>
                    <option value="DataDeContato">Histórico</option>
                    <option value="ValorImovel">Valor imóvel</option>
                  </select>
                </div>
              </div>

              <div className="cod-md-2 line-gray "></div>

              {corretorImovel?.length > 0 ? (
                <div className="lista-corretores">
                  {searchGetFilterCorretor ? (
                    <>
                      <div className="row ">
                        {filter?.length <= 0 ? (
                          <div className="text-center">
                            <p>
                              Não encontramos nenhum resultado de busca
                              solicitado
                            </p>
                          </div>
                        ) : (
                          <>
                            {filter?.map((corretorImovel) => (
                              <div className="col-lg-12 pt-4 lista-cards" key={corretorImovel.corretor.codImovel}>
                                <CardMeuCorretor
                                  nomeCompleto={
                                    corretorImovel.corretor.nomeCompleto
                                  }
                                  nomeSocial={
                                    corretorImovel.corretor.nomeSocial
                                  }
                                  numeroCreci={
                                    corretorImovel.corretor.numeroCreci
                                  }
                                  mediaAvaliacao={
                                    corretorImovel.corretor.mediaAvaliacao
                                  }
                                  dtCadastro={
                                    corretorImovel.corretor.dtCadastro
                                  }
                                  pontuacaoAtual={
                                    corretorImovel.corretor.pontuacaoAtual
                                  }
                                  imoveis={corretorImovel.imoveis}
                                  img={corretorImovel.corretor.img}
                                />
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="row ">
                        {filtroNomeCreci?.map((corretorImovel) => (
                          <div className="col-lg-12 pt-4 lista-cards" key={corretorImovel.corretor.codImovel}>
                            <CardMeuCorretor
                              nomeCompleto={
                                corretorImovel.corretor.nomeCompleto
                              }
                              nomeSocial={corretorImovel.corretor.nomeSocial}
                              numeroCreci={corretorImovel.corretor.numeroCreci}
                              mediaAvaliacao={
                                corretorImovel.corretor.mediaAvaliacao
                              }
                              dtCadastro={corretorImovel.corretor.dtCadastro}
                              pontuacaoAtual={
                                corretorImovel.corretor.pontuacaoAtual
                              }
                              imoveis={corretorImovel.imoveis}
                              img={corretorImovel.corretor.img}
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <p>No momento não temos corretores registrados</p>
                </div>
              )}

              <div className="px-4 d-flex justify-content-between align-items-center flex-wrap">
                <div className="status-page">
                  <p>
                    Mostrando transações <span>de 1 a 24</span>
                  </p>
                </div>
                <div>
                  {corretorImovel.length >= 3 ? (
                    <Paginacao
                      total={100}
                      limit={3}
                      paginaAtual={pagina}
                      setPagina={setPagina}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="cod-md-2 line-gray"></div>
              <div className="px-4 my-4">
                <p className="status-information">
                  Monstrando transações já creditadas. Última atualização em
                  09.12.2021 às 14:28
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
