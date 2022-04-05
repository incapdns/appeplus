import { FormEvent, useEffect, useState } from "react";
import NavbarDashHeader from "../../components/Navbar/NavbarDashHeader";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { moeda } from "../../utils/Masks";
import { NavbarDashAdm } from "../../components/Navbar/NavbarDashAdm";
import { format, parseISO } from "date-fns";
import "../../styles/pages/adm/imoveis.scss";
import Footer from "../../components/Footer";
import Paginacao from "../../components/Paginacao";

interface iImovel {
  codImovel: number;
  codClienteVendedor: number;
  codCorretor: number;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  latitude: string;
  longitude: string;
  codStatus: number;
  codTipoImovel: number;
  qtdeDormitorios: number;
  qtdeSuites: number;
  qtdeBanheiros: number;
  qtdeVagasGaragem: number;
  areaTotal: number;
  areaPrivativa: number;
  valorVendaOriginal: number;
  valorVenda: number;
  dtVenda: string;
  dtCadastro: string;
  userCadastro: number;
  dtAtualizacao: string;
  userAtualizacao: number;
  dtExclusao: string;
  userExclusao: number;
  valorCondominio: number;
  valorIPTU: number;
  descImovel: any;
  codExibicao: number;
  descStatus: string;
  descTipoImovel: string;
  nomeProprietario: string;
  favorito: boolean;
  codStatusAnuncio: number;
  imgsDoImovel: string[];
}

export function AdmImoveis() {
  const history = useHistory();
  function handleClick(id: number) {
    history.push(`/adm/detalhe-imovel/${id}`);
  }
  const [imoveis, setImoveis] = useState<iImovel[]>([]);
  let [filterImoveis, setFilterImoveis] = useState<iImovel[]>([]);
  const [filter, setFilter] = useState<iImovel[]>([]);
  const [pagina, setPagina] = useState(1);
  const [searchImovel, setSearchImovel] = useState("");
  const [searchGetFilterImovel, setSearchGetFilterImovel] = useState(false);

  const qtdePagina = 20;

  useEffect(() => {
    GetImoveis();
  }, [pagina]);

  async function GetImoveis() {
    await api
      .get(`imovel/listar-imoveis?Pagina=${pagina}&QtdePagina=${qtdePagina}`)
      .then((response) => {
        setImoveis(response.data.data);
        console.log(
          "🚀 ~ file: Imoveis.tsx ~ line 39 ~ .then ~ response.data.data",
          response.data.data
        );
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
  function getFilterImovel(){
    api.get(`imovel/listar-imoveis?Pagina=1&QtdePagina=999`).then((response) =>{
      filterImoveis = response.data.data
      console.log(response.data.data)
      setSearchGetFilterImovel(true)
      const filter =  filterImoveis.filter((imovel) =>{
        return(
          imovel.endereco?.toString()
          .toLowerCase()
          .includes(searchImovel.toString().toLowerCase()) ||
          imovel.descStatus?.toString()
          .toLowerCase()
          .includes(searchImovel.toString().toLowerCase()) ||
          imovel.nomeProprietario?.toString()
          .toLowerCase()
          .includes(searchImovel.toString().toLowerCase()) ||
          imovel.descTipoImovel?.toString()
          .toLowerCase()
          .includes(searchImovel.toString().toLowerCase())

        )
      })
      setFilter(filter)
    })
  }

  function statusImovel(codStatus: number){
    switch (codStatus) {
      case 1:
        return <span className="badge  bg-warning text-dark">Pendente de Aprovação</span>;
      case 2:
        return <span className="badge  bg-success text-dark">Publicado</span>;
      case 3:
        return <span className="badge bg-warning text-dark">Em Negociação</span>;
      case 4:
        return <span className="badge bg-success text-dark">Vendido</span>;
      case 5:
        return (
          <span className="badge bg-danger text-dark">Cancelado</span>
        );
      case 7:
        return (
          <span className="badge bg-danger text-dark">Excluido</span>
        );
      case 8:
        return (
          <span className="badge bg-danger text-dark">Reprovado</span>
        );
        case 9:
          return (
            <span className="badge  bg-warning text-dark">Pendente de Aprovação do Cliente</span>
          );
        case 10:
          return (
            <span className="badge bg-danger text-dark">Reprovado pelo Proprietario</span>
          );
        
    }
  }

  function handleImovel(event: FormEvent){
    event.preventDefault();
    if(searchImovel === ''){
      GetImoveis();
      setSearchGetFilterImovel(false)
    }else{
      getFilterImovel()
    }
  }

  return (
    <>
      <div className="wrapper-imoveis pb-5" id="adm-imoveis">
        <NavbarDashAdm />
        <div className="main-content">
          <NavbarDashHeader />
          <div className="container">
            <section className="my-4">
              <div className="row">
                <div className="col-lg-8">
                  <h2>Imóveis</h2>
                </div>
              </div>
            </section>
            <form onSubmit={handleImovel}>
                <div className="filtro-corretor my-3 col-lg-12">
                  <input
                    type="text"
                    placeholder=" Busque por endereço, status ou proprietário"
                    value={searchImovel}
                    onChange={(e) => setSearchImovel(e.target.value)}
                    className="campo-filtro"
                  />
                  <button type="submit" className="buttonBuscar">
                    Encontrar imóvel <FaSearch style={{ marginLeft: 10 }} />
                  </button>
                </div>
              </form>
            <section className="meus-imoveis mb-3">
              
              {/* <div className="row mx-2 my-4">
                <div className="col-lg-3 mb-3 mb-lg-0">
                  <select
                    className="form-select campo-select"
                    aria-label="Status da proposta"
                    defaultValue=""
                  >
                    <option value="">Satus</option>
                  </select>
                </div>
                <div className="col-lg-3 mb-3 mb-lg-0">
                  <select
                    className="form-select campo-select"
                    aria-label="Valor do imóvel"
                    defaultValue="1"
                  >
                    <option value="1">Valor</option>
                    <option value="2">R$ 150 mil a 250 mil</option>
                    <option value="3">R$ 350 mil a 450 mil</option>
                    <option value="4">R$ 450 mil a 650 mil</option>
                    <option value="5">R$ 650 mil a 1 milhão</option>
                    <option value="6">mais de R$ 1 milhão</option>
                  </select>
                </div>
              </div> */}

              <div className="cod-md-2 line-gray" />

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Codigo imóvel</th>
                      <th scope="col">Imóvel</th>
                      <th scope="col">Tipo imóvel</th>
                      <th scope="col">Status</th>
                      <th scope="col">Proprietário</th>
                      <th scope="col">Data cadastro</th>
                      <th scope="col" colSpan={2}>
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchGetFilterImovel ? (
                        <>
                        {filter.length == 0 ? (
                          <div className='text-center'>
                            <p>Não encontramos nenhum resultado de busca solicitado</p>
                          </div>
                        ) : (
                          <>
                          
                            {filter.map((imovel) => (
                            
                              <tr key={imovel.codImovel}>
                                <td>{imovel.codImovel}</td>
                                <td>{imovel.endereco}</td>
                                <td>{imovel.descTipoImovel}</td>

                                <td> {statusImovel(imovel.codStatus)} </td>
                                <td> {imovel.nomeProprietario}</td>
                                <td> {imovel.dtCadastro
                                  ? format(
                                      parseISO(imovel.dtCadastro),
                                      "dd/MM/yyyy"
                                    )
                                  : null}
                                </td>
                                <td>
                                  R$ {moeda(imovel.valorVendaOriginal)}
                                </td>
                                <td className="td-button">
                                  <button
                                    className="btn"
                                    onClick={() => handleClick(imovel.codImovel)}
                                  >
                                    <FaChevronRight />
                                  </button>
                                </td>
                              </tr>
                            ))}

                          </>
                        )}
                        </>
                    ):(
                      <>
                      {imoveis?.length ? (
                      imoveis.map((imovel) => {
                        return (
                          <tr key={imovel.codImovel}>
                            <td>{imovel.codImovel}</td>
                            <td>{imovel.endereco}</td>
                            <td>{imovel.descTipoImovel}</td>

                            <td> {statusImovel(imovel.codStatus)} </td>
                            <td> {imovel.nomeProprietario}</td>
                            <td> {imovel.dtCadastro
                              ? format(
                                  parseISO(imovel.dtCadastro),
                                  "dd/MM/yyyy"
                                )
                              : null}
                            </td>
                            <td>
                              R$ {moeda(imovel.valorVendaOriginal)}
                            </td>
                            <td className="td-button">
                              <button
                                className="btn"
                                onClick={() => handleClick(imovel.codImovel)}
                              >
                                <FaChevronRight />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5}>Nenhum imóvel encontrado</td>
                      </tr>
                    )}
                      </>
                    )}
                    
                  </tbody>
                </table>
              </div>
            </section>
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
        </div>
      </div>
      <Footer dark />
    </>
  );
}
