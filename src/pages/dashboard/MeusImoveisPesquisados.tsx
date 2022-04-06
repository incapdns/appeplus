import NavbarDash from "../../components/Navbar/NavbarDash";
import NavbarDashHeader from "../../components/Navbar/NavbarDashHeader";

import "../../styles/pages/dashboard/meusImoveisPesquisados.scss";
import Footer from "../../components/Footer";
import api from "../../services/api";
import { iDadosUsuario, iImoveisPesquisados, iImovel } from "../../@types";
import { CardImovelPesquisado } from "../../components/Cards/cardImovelPesquisado";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Loading from "../../components/Loading";

export default function MeusImoveisPesquisados() {
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const [imoveisAgendados, setImoveisAgendados] = useState<
    iImoveisPesquisados[]
  >([]);

  const [imoveisVisitados, setImoveisVisitados] = useState<
    iImoveisPesquisados[]
  >([]);
  const [imoveisFavoritados, setImoveisFavoritados] = useState<iImovel[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState("agendados");

  const codCliente = usuario.codCliente;
  const pagina = 1;
  const qtdePagina = 40;
  const history = useHistory();

  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  useEffect(() => {
    if (filtro === "agendados") {
      GetImoveisAgendados();
    } else if (filtro === "visitados") {
      GetImoveisVisitados();
    } else {
      GetImoveisFavoritados();
    }
    checaUsuarioLogado();
  }, [filtro]);

  async function GetImoveisAgendados() {
    setLoading(true);
    await api
      .get("agenda/visitas-pendentes-cliente", {
        params: {
          codCliente,
          pagina,
          qtdePagina,
        },
      })
      .then((response) => {
        setImoveisAgendados(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoading(false);
      });
  }

  async function GetImoveisVisitados() {
    setLoading(true);
    await api
      .get("agenda/visitas-confirmadas-cliente", {
        params: {
          codCliente,
          pagina,
          qtdePagina,
        },
      })
      .then((response) => {
        setImoveisVisitados(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoading(false);
      });
  }

  async function GetImoveisFavoritados() {
    setLoading(true);
    await api
      .get("imovel/favoritos", {
        params: {
          codCliente,
        },
      })
      .then((response) => {
        setImoveisFavoritados(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoading(false);
      });
  }

  function Empty() {
    return (
      <div className="contaiter empty">
        <p>Não há imóveis {filtro}.</p>
      </div>
    );
  }

  return (
    <>
      <div className="wrapper-imoveis">
        <NavbarDash />
        <div className="main-content" id="meusImoveisPesqusados">
          <NavbarDashHeader />
          <div className="container">
            <section className="my-4">
              <h2>Meus imóveis pesquisados</h2>
              <div className="row">
                <div className="col-lg-8">
                  <h4>
                    {filtro === "agendados" &&
                      (imoveisAgendados.length
                        ? `${imoveisAgendados.length} resultados`
                        : null)}
                    {filtro === "visitados" &&
                      (imoveisVisitados.length
                        ? `${imoveisVisitados.length} resultados`
                        : null)}
                    {filtro === "favoritados" &&
                      (imoveisFavoritados.length
                        ? `${imoveisFavoritados.length} resultados`
                        : null)}
                  </h4>
                </div>
                <div className="col-lg-4 col-filtro">
                  <div className="row">
                    <div className="col col-label">filtrar por:</div>
                    <div className="col">
                      <select
                        className="form-select"
                        aria-label="Filtro de pesquisa"
                        onChange={(e) => setFiltro(e.target.value)}
                      >
                        <option value="agendados">Agendados</option>
                        <option value="visitados">Visitados</option>
                        <option value="favoritados">Favoritados</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {loading ? (<Loading />) : (
              <div className="row">
                {filtro === "agendados" &&
                  (imoveisAgendados.length ? (
                    imoveisAgendados.map((imovel) => {
                      return (
                        <div
                          className="col-lg-4 mb-3"
                          key={`imoveisAgendados-${imovel.codImovel}`}
                        >
                          <CardImovelPesquisado
                            codCliente={imovel.codCliente}
                            codImovel={imovel.codImovel}
                            endereco={`${imovel.imovel.endereco}, ${imovel.imovel.numero}`}
                            bairro={imovel.imovel.bairro}
                            cidade={imovel.imovel.cidade}
                            uf={imovel.imovel.uf}
                            qtdeDormitorios={imovel.qtdeDormitorios!}
                            qtdeSuites={imovel.imovel.qtdeSuites}
                            qtdeBanheiros={imovel.imovel.qtdeBanheiros}
                            qtdeVagasGaragem={imovel.imovel.qtdeVagasGaragem}
                            areaTotal={imovel.areaTotal}
                            valorVendaOriginal={imovel.imovel.valorVendaOriginal}
                            valorVenda={imovel.valorVenda}
                            descTipoImovel={imovel.imovel.descTipoImovel}
                            imgsDoImovel={imovel.imovel.imgsDoImovel}

                          />
                        </div>
                      );
                    })
                  ) : (
                    <Empty />
                  ))}

                {filtro === "visitados" &&
                  (imoveisVisitados.length ? (
                    imoveisVisitados.map((imovel) => {
                      return (
                        <div
                          className="col-lg-4 mb-3"
                          key={`imoveisVisitados-${imovel.codImovel}`}
                        >
                          <CardImovelPesquisado
                            codImovel={imovel.codImovel}
                            endereco={`${imovel.imovel.endereco}, ${imovel.imovel.numero}`}
                            bairro={imovel.imovel.bairro}
                            cidade={imovel.imovel.cidade}
                            uf={imovel.imovel.uf}
                            qtdeDormitorios={imovel.qtdeDormitorios!}
                            qtdeSuites={imovel.imovel.qtdeSuites}
                            qtdeBanheiros={imovel.imovel.qtdeBanheiros}
                            qtdeVagasGaragem={imovel.imovel.qtdeVagasGaragem}
                            areaTotal={imovel.areaTotal}
                            valorVendaOriginal={imovel.imovel.valorVendaOriginal}
                            valorVenda={imovel.valorVenda}
                            descTipoImovel={imovel.imovel.descTipoImovel}
                            imgsDoImovel={imovel.imovel.imgsDoImovel}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <Empty />
                  ))}

                {filtro === "favoritados" &&
                  (imoveisFavoritados.length ? (
                    imoveisFavoritados.map((imovel) => {
                      return (
                        <div
                          className="col-lg-4 mb-3"
                          key={`imoveisFavoritados-${imovel.codImovel}`}
                        >
                          <CardImovelPesquisado
                            codImovel={imovel.codImovel}
                            endereco={`${imovel.endereco}, ${imovel.numero}`}
                            bairro={imovel.bairro}
                            cidade={imovel.cidade}
                            uf={imovel.uf}
                            qtdeDormitorios={imovel.qtdeDormitorios!}
                            qtdeSuites={imovel.qtdeSuites}
                            qtdeBanheiros={imovel.qtdeBanheiros}
                            qtdeVagasGaragem={imovel.qtdeVagasGaragem}
                            areaTotal={imovel.areaTotal}
                            valorVendaOriginal={imovel.valorVendaOriginal}
                            valorVenda={imovel.valorVenda}
                            descTipoImovel={imovel.descTipoImovel}
                            imgsDoImovel={imovel.imgsDoImovel}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <Empty />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
