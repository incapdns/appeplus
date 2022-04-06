import { FormEvent, useEffect, useState } from "react";
import NavbarDashHeader from "../../components/Navbar/NavbarDashHeader";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { NavbarDashAdm } from "../../components/Navbar/NavbarDashAdm";
import { format, parseISO } from "date-fns";
import "../../styles/pages/adm/imoveis.scss";
import Footer from "../../components/Footer";
import Paginacao from "../../components/Paginacao";

interface iCorretoresPendentes {
  nomeCompleto: string;
  nomeSocial: string;
  numeroCreci: number;
  codStatusCorretor: number;
  descStatusCorretor: string;
  dtCadastro: string;
  codCorretor: number;
}

export default function AdmCorretores() {
  const history = useHistory();
  const [corretores, setCorretores] = useState<iCorretoresPendentes[]>([]);
  let [filterCorretores, setFilterCorretores] = useState<iCorretoresPendentes[]>([]);
  const [filter, setFilter] = useState<iCorretoresPendentes[]>([]);
  const [pagina, setPagina] = useState(1);
  const [searchCorretores, setSearchCorretores] = useState("");
  const [searchGetFilterCorretores, setSearchGetFilterCorretores] = useState(false);

  const qtdePagina = 20;
  

  useEffect(() => {
    GetCorretores();
  }, [pagina]);

  async function GetCorretores() {
    await api
      .get("Corretor/listar-corretores-pendente", {
        params: {
          qtdePagina,
          pagina,
        },
      })
      .then((response) => {
        setCorretores(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
  function getFilterCorretores(){
    api.get(`Corretor/listar-corretores-pendente?qtdePagina=999&pagina=1`).then((response) => {
      filterCorretores = response.data.data
      setSearchGetFilterCorretores(true)
      const filter = filterCorretores.filter((corretor) =>{
        return(
          corretor.nomeCompleto
          ?.toString()
          .toLowerCase()
          .includes(searchCorretores.toString().toLowerCase()) ||
        corretor.descStatusCorretor
          ?.toString()
          .toLowerCase()
          .includes(searchCorretores.toString().toLowerCase()) ||
          corretor.numeroCreci
          ?.toString()
          .toLowerCase()
          .includes(searchCorretores.toString().toLowerCase())
        )
      })
      setFilter(filter);
    }).catch(error =>{
      console.log(error)
    })
  }

  function handleClick(id: number) {
    history.push(`/adm/corretor/${id}`);
  }

  function StatusCorretor(codStatus: number) {
    switch (codStatus) {
      case 1:
        return <span className="badge bg-success text-dark">ativo</span>;
      case 2:
        return <span className="badge bg-light text-dark">inativo</span>;
      case 3:
        return <span className="badge bg-warning text-dark">pendente</span>;
      case 4:
        return <span className="badge bg-danger text-dark">reprovado</span>;
      case 5:
        return (
          <span className="badge bg-info text-dark">cadastro incompleto</span>
        );
    }
  }
  function handleCorretor(event: FormEvent){
    event.preventDefault();
    if(searchCorretores === ""){
      GetCorretores();
      setSearchGetFilterCorretores(false)
    }else{
      getFilterCorretores()
    }
  }

  return (
    <>
      <div className="wrapper-imoveis" id="adm-imoveis">
        <NavbarDashAdm />
        <div className="main-content">
          <NavbarDashHeader />
          <div className="container">
            <section className="my-4">
              <div className="row">
                <div className="col-lg-8">
                  <h2>Corretores</h2>
                </div>
              </div>
            </section>
            <form onSubmit={handleCorretor}>
                <div className="filtro-corretor my-3 col-lg-12">
                  <input
                    type="text"
                    placeholder=" digite o nome ou creci"
                    value={searchCorretores}
                    onChange={(event) => setSearchCorretores(event.target.value)}
                    className="campo-filtro"
                  />
                  <button type="submit" className="buttonBuscar">
                    Buscar <FaSearch style={{ marginLeft: 10 }} />
                  </button>
                </div>
              </form>
            <section className="meus-imoveis mb-3">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">Status</th>
                      <th scope="col">Creci</th>
                      <th scope="col" colSpan={2}>
                        Data de cadastro
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchGetFilterCorretores ? (
                      <>
                        {filter.length == 0 ? (
                          <div className='text-center'>
                            <p>Não encontramos nenhum resultado de busca solicitado</p>
                          </div>
                        ) : (
                          <>
                            {filter.map((corretor, index) => (
                              <tr key={index}>
                                <td>{corretor.nomeCompleto}</td>
                                <td>{StatusCorretor(corretor.codStatusCorretor)}</td>
                                <td>{corretor.numeroCreci}</td>
                                <td>
                                  {corretor.dtCadastro
                                    ? format(
                                        parseISO(corretor.dtCadastro),
                                        "dd/MM/yyyy"
                                      )
                                    : null}
                                </td>
                                <td className="td-button">
                                  <button
                                    className="btn"
                                    onClick={() => handleClick(corretor.codCorretor)}
                                  >
                                    <FaChevronRight />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                      </>
                    ) :(
                      <>
                      {corretores?.length ? (
                      corretores.map((corretor, index) => (
                        <tr key={index}>
                          <td>{corretor.nomeCompleto}</td>
                          <td>{StatusCorretor(corretor.codStatusCorretor)}</td>
                          <td>{corretor.numeroCreci}</td>
                          <td>
                            {corretor.dtCadastro
                              ? format(
                                  parseISO(corretor.dtCadastro),
                                  "dd/MM/yyyy"
                                )
                              : null}
                          </td>
                          <td className="td-button">
                            <button
                              className="btn"
                              onClick={() => handleClick(corretor.codCorretor)}
                            >
                              <FaChevronRight />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3}>Nenhum corretor pendente</td>
                      </tr>
                    )}
                      </>
                    )}
                    
                  </tbody>
                </table>
              </div>
            </section>
            <div>
              {searchGetFilterCorretores ? (
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
        </div>
      </div>
      <Footer dark />
    </>
  );
}
