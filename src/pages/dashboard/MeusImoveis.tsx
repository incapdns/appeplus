import { FormEvent, useEffect, useState } from "react";
import MeuImovel from "../../components/Cards/MeuImovel";
import NavbarDash from "../../components/Navbar/NavbarDash";
import NavbarDashHeader from "../../components/Navbar/NavbarDashHeader";

import "../../styles/pages/dashboard/meusImoveis.scss";
import FiltroMeusImoveis from "../../components/Form/dashboard/FiltroMeusImoveis";
import Footer from "../../components/Footer";
import CardMeuCorretor from "../../components/Cards/MeuCorretor";
import Paginacao from "../../components/Paginacao";
import api from "../../services/api";
import { iImoveisCorretor, iDadosUsuario } from "../../@types";
import { FaRedoAlt, FaSearch } from "react-icons/fa";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { BsPlusSquare } from "react-icons/bs";

let usuario: iDadosUsuario = JSON.parse(
  localStorage.getItem("@appePlus/usuario") || "{}"
);
const MeusImoveis = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const valorQueryParams = searchParams.get("valor");

  const [meusImoveis, setMeusImoveis] = useState<iImoveisCorretor[]>([]);
  let [filterImovel, setFilterImovel] = useState<iImoveisCorretor[]>([]);
  const [filter, setFilter] = useState<iImoveisCorretor[]>([]);
  const [pagina, setPagina] = useState(1);
  const [searchImovel, setSearchImovel] = useState("");
  const [searchGetFilterImovel, setSearchGetFilterImovel] = useState(false);
  const [valor, setValor] = useState<string>("0");
  const [statusImovel, setStatusImovel] = useState<string>("0");
  const [orderBy, setOrderBy] = useState("");
  const history = useHistory();

  console.log(
    "🚀 ~ file: MeusImoveis.tsx ~ line 38 ~ MeusImoveis ~ usuario.token",
    usuario.token
  );

  async function getMeuImovel() {
    usuario = JSON.parse(
      localStorage.getItem("@appePlus/usuario") || "{}"
    );
    await api
      .get(
        `/imovel/listar-imoveis-Cliente?CodCliente=${usuario.codCliente}&Pagina=${pagina}&QtdePagina=3&ordenar=${orderBy}`
      )
      .then((response) => {
        setMeusImoveis(response.data.data);
        console.log('meus imóveis',response.data.data);
      })

      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function getFilterImoveis() {
    await api
      .get(
        `/imovel/listar-imoveis-Cliente?CodCliente=${usuario.codCliente}&Pagina=1&QtdePagina=999`
      )
      .then((response) => {
        filterImovel = response.data.data;

        setSearchGetFilterImovel(true);
        const filter = filterImovel.filter((imovel) => {
          return (
            imovel?.imovel.endereco
              ?.toString()
              .toLowerCase()
              .includes(searchImovel.toString().toLowerCase()) ||
            imovel?.imovel.bairro
              ?.toString()
              .toLowerCase()
              .includes(searchImovel.toString().toLowerCase())
          );
        });

        setFilter(filter);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
  async function filterImoveis() {
    const valorMin = "ValorImovelMin";
    const valorMax = "ValorImovelMax";
    const vMinimo = valorMinimo(valor ? valor : valorQueryParams || "");
    const vMaximo = valorMaximo(valor ? valor : valorQueryParams || "");
    const status = statusImovel;
    const endereco: any = searchImovel;

    if (searchImovel === null) {
      setSearchImovel("0");
    }
    api
      .get(
        `/imovel/listar-imoveis-Cliente?CodCliente=${usuario.codCliente}&Pagina=1&QtdePagina=999&${valorMin}=${vMinimo}&${valorMax}=${vMaximo}&StatusImovel=${status}&Endereco=${endereco}&ordenar=${orderBy}`
      )
      .then((response) => {
        setFilter(response.data.data);
        setSearchGetFilterImovel(true);
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

  function handleImovel(event: FormEvent) {
    event.preventDefault();

    if (
      searchImovel === "" &&
      valor === "0" &&
      statusImovel === "0" &&
      orderBy === ""
    ) {
      getMeuImovel();
      setSearchGetFilterImovel(false);
    } else {
      if (valor === "0" && statusImovel === "0" && orderBy === "") {
        getFilterImoveis();
      } else {
        filterImoveis();
      }
    }
  }

  useEffect(() => {
    getMeuImovel();
  }, [pagina, orderBy]);

  return (
    <>
      <div className="wrapper-imoveis">
        <NavbarDash />
        <div className="main-content">
          <NavbarDashHeader />
          <div className="container">
            <section className="my-4">
              <div className="row">
                <div className="col-lg-9">
                  <h2>Meus imóveis</h2>
                </div>

                <div className="col-lg-3">
                  {usuario.nivel !== 1 ?(
                    <button
                      type="button"
                      className="buttonCompartilhar"
                      onClick={() => {
                        localStorage.setItem(
                          "@appePlus/codCliente",
                          String(usuario.codCliente)
                        );
                        localStorage.setItem("@appePlus/codImovel", String(""));
                        history.push("/cadastro/imovel/anuncioSimples");
                      }}
                      >
                      <span>
                        <BsPlusSquare fontSize={20} /> &nbsp; Novo
                      </span>
                    </button>
                  ): (
                    <button
                      type="button"
                      className="buttonCompartilhar"
                      onClick={() => {
                        localStorage.setItem(
                          "@appePlus/codCliente",
                          String(usuario.codCliente)
                        );
                        localStorage.setItem("@appePlus/codImovel", String(""));
                        history.push("/cadastro/cadastro/vendedor");
                      }}
                      >
                      <span>
                        <BsPlusSquare fontSize={20} /> &nbsp; Novo
                      </span>
                    </button>
                  )}
                  
                  <button className="buttonUpdate">
                    Atualizar
                    <FaRedoAlt size={14} style={{ marginLeft: 10 }} />
                  </button>
                </div>
              </div>
            </section>
            <section className="meus-imoveis">
              <form onSubmit={handleImovel}>
                <div className="filtro-corretor my-3 col-lg-12">
                  <input
                    type="text"
                    placeholder=" digite o endereço"
                    value={searchImovel}
                    onChange={(event) => setSearchImovel(event.target.value)}
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
                <div className="col-lg-3 mb-3 mb-lg-0">
                  <select
                    className="form-select campo-select"
                    aria-label="Status da proposta"
                    value={statusImovel}
                    onChange={(e) => setStatusImovel(e.target.value)}
                  >
                    <option value="0">Status do imóvel</option>
                    <option value="7">Excluido</option>
                    <option value="1">Aguard. aprovação</option>
                    <option value="2">Aprovado</option>
                  </select>
                </div>
                <div className="col-lg-6 d-flex justify-content-lg-end"></div>
              </div>
              <div className="row  blue-filter col-lg-12">
                {/* <div className="col-lg-6  my-2 d-flex first-filter">
                  <p>Tipo de corretor: </p>
                        <select className="caixa-select" >
                            <option value="comprador">Comprador</option>
                            <option value="vendedor">Vendedor</option>
                        </select>
                </div> */}
                <div className="cod-md-2 line-gray"></div>

                {meusImoveis !== null ? (
                  <>
                    <div className="lista-corretores">
                      {searchGetFilterImovel ? (
                        <>
                          {filter.length == 0 ? (
                            <div className="text-center">
                              <p>
                                Não encontramos nenhum resultado de busca
                                solicitado
                              </p>
                            </div>
                          ) : (
                            <>
                              {filter.map((imovel) => (
                                <MeuImovel
                                  key={imovel.imovel?.codImovel}
                                  endereco={imovel.imovel?.endereco}
                                  fotoCapaImovel={imovel.imovel?.fotoCapaImovel}
                                  bairro={imovel.imovel?.bairro}
                                  valorVendaOriginal={
                                    imovel.imovel?.valorVendaOriginal
                                  }
                                  statusNegociacao={imovel.imovel?.descStatus}
                                  nomeCorretorCompra={
                                    imovel.corretorCompra?.nomeSocial
                                  }
                                  dtCadastro={imovel.imovel?.dtCadastro}
                                  nomeCorretorVenda={
                                    imovel.corretorVenda?.nomeSocial
                                  }
                                  codImovel={imovel.imovel?.codImovel}
                                />
                              ))}
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {meusImoveis.length > 0 ? (
                            <>
                              {meusImoveis.map((imovel) => (
                                <MeuImovel
                                  key={imovel.imovel?.codImovel}
                                  endereco={imovel.imovel?.endereco}
                                  fotoCapaImovel={imovel.imovel?.fotoCapaImovel}
                                  bairro={imovel.imovel?.bairro}
                                  telefoneCorretorVenda={imovel.corretorVenda?.telefone}
                                  fotoCorretorVenda={imovel.corretorVenda?.arquivos}
                                  emailVendedor={imovel.corretorVenda?.email}
                                  valorVendaOriginal={
                                    imovel.imovel?.valorVendaOriginal
                                  }
                                  statusNegociacao={imovel.imovel?.descStatus}
                                  nomeCorretorCompra={
                                    imovel.corretorCompra?.nomeSocial
                                  }
                                  dtCadastro={imovel.imovel?.dtCadastro}
                                  nomeCorretorVenda={
                                    imovel.corretorVenda?.nomeSocial
                                  }
                                  codImovel={imovel.imovel?.codImovel}
                                />
                              ))}
                            </>
                          ) : (
                            <div className="text-center">
                              <p>No momento não temos imóveis registrados</p>
                            </div>
                          )}

                        </>
                      )}

                      <hr />
                    </div>
                    <div className="px-4 d-flex justify-content-between align-items-center flex-wrap">
                      <div className="status-page">
                        <p>
                          Mostrando transações <span>de 1 a 24</span>
                        </p>
                      </div>
                      <div>
                        {searchGetFilterImovel ? (
                          <p>Busca realizada!</p>
                        ) : (
                          <>
                            <Paginacao
                              total={100}
                              limit={3}
                              paginaAtual={pagina}
                              setPagina={setPagina}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <p>No momento não temos imoveis registrados</p>
                  </div>
                )}
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

export default MeusImoveis;
