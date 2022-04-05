
import { format, parseISO } from 'date-fns';
import React, { useState, useEffect, FormEventHandler, FormEvent } from 'react'
import { FaChevronRight, FaSearch } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { ImEvil } from 'react-icons/im';
import Footer from '../../components/Footer';
import { NavbarDashAdm } from '../../components/Navbar/NavbarDashAdm';
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader';
import Paginacao from '../../components/Paginacao';
import api from '../../services/api';
import "../../styles/pages/adm/clientes.scss";

interface IclientesAdm{
codCliente: number,
nomeCompleto: string,
telefone: string,
dtCadastro: string,
nivelCliente: number,
codStatus: number,
descStatus: string,
imoveis: [
  {
    codImovel: number,
    codClienteVendedor: number,
    codCorretor: number,
    endereco: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string,
    uf: string,
    cep: string,
    latitude: string,
    longitude: string,
    codStatus: number,
    codTipoImovel: number,
    qtdeDormitorios: number,
    qtdeSuites: number,
    qtdeBanheiros: number,
    qtdeVagasGaragem: number,
    areaTotal: number,
    areaPrivativa: number,
    valorVendaOriginal: number,
    valorVenda: number,
    dtVenda: string,
    dtCadastro: string,
    userCadastro: number,
    dtAtualizacao: string,
    userAtualizacao: number,
    dtExclusao: string,
    userExclusao: number,
    valorCondominio: number,
    valorIPTU: number,
    descImovel: null,
    codExibicao: number,
    descStatus: string,
    descTipoImovel: string,
    nomeProprietario: string,
    favorito: false,
    codStatusAnuncio: number,
    imgsDoImovel: [
      string
    ]
  }
],
userCadastro: number,
nomeUserCadastro: null
}

function AdmClientesUser() {

  const [clientes, setClientes] = useState<IclientesAdm[]>([]);
  const [filter, setFilter] = useState<IclientesAdm[]>([]);
  const [imovelCliente, setImovelCliente] = useState<IclientesAdm[]>([]);
  const [pagina, setPagina] = useState(1);
  const [qtdePagina, setQtdePagina] = useState(12);
  const [searchCliente, setSearchCliente] = useState("");
  const [searchGetFilterCliente, setSearchGetFilterCliente] = useState(false);


  async function getClientesAdmin(){
   await api.get(`/cliente/listar-todos?Pagina=${pagina}&QtdePagina=${qtdePagina}`).then(response => {
     setClientes(response.data.data)
     console.log(response.data.data)
   }).catch(error => {
     console.log(error)
   })
  }
  
  function getFilterCliente(){
     api.get(`/cliente/listar-todos?Pagina=1&QtdePagina=999`).then(response => {
      let filterCliente:IclientesAdm[] = response.data.data
      console.log(response.data.data)
      setSearchGetFilterCliente(true);
      const filter = filterCliente.filter((cliente) => {
        return(
          cliente.descStatus.toString()
          .toLowerCase()
          .includes(searchCliente.toString().toLowerCase()) ||
          cliente.nomeCompleto.toString()
          .toLowerCase()
          .includes(searchCliente.toString().toLowerCase())
        )
      })
      setFilter(filter)
    }).catch(error => {
      console.log(error)
    })
  }
  function clienteImovel(codCliente:number){
    api.get(`/cliente/listar-todos?Pagina=1&QtdePagina=999`).then(response => {
      let imovelCli:IclientesAdm[] = response.data.data;
      let imovelNew = imovelCli.filter((imovel:IclientesAdm)=> imovel.codCliente === codCliente)
      setImovelCliente(imovelNew)
      console.log(imovelCliente)
    }).catch((error) =>{
      console.log(error)
    })
  }
  function handleCliente(event: FormEvent){
    event.preventDefault();
    if(searchCliente === ''){
      getClientesAdmin()
      setSearchGetFilterCliente(false)
    }else{
      getFilterCliente();
    }
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


  useEffect(()=>{
    getClientesAdmin();
  },[pagina])

  return (
    <>
    <div className="wrapper-imoveis pb-5" id="adm-clientes">
      <NavbarDashAdm/>
      <div className="main-content">
        <NavbarDashHeader/>
        <div className="container">
          <section className="my-4">
            <div className="row">
              <div className="col-lg-8">
                <h2>Clientes</h2>
              </div>
            </div>
          </section>
          <form onSubmit={handleCliente}>
            <div className="filter-clientes my-3 col-lg-12">
              <input
                type="text"
                placeholder=" Busque por nome ou status"
                className="campo-filtro"
                value={searchCliente}
                onChange={(e) => setSearchCliente(e.target.value)}
              />
              <button type="submit" className="buttonBuscar">
                Encontrar cliente <FaSearch style={{ marginLeft: 10 }} />
              </button>
            </div>
          </form>
          <section className="meus-imoveis mb-3">
            <div className="cod-md-2 line-gray" />

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Data Cadastro</th>
                    <th scope="col">Nível cliente</th>
                    <th scope="col">Status</th>
                    <th scope="col">Corretor</th>
                    <th scope="col" colSpan={2}>
                      Imóvel
                    </th>
                  </tr>
                </thead>
                {searchGetFilterCliente ? (
                  <>
                    {filter.length == 0 ? (
                      <div className='text-center'>
                      <p>Não encontramos nenhum resultado de busca solicitado</p>
                    </div>
                    ): (
                      <tbody>
                      {filter.length > 0 ? (
                        <>
                          {filter.map((cliente)=> (
                          <tr>
                            <td>{cliente.nomeCompleto}</td>
                            <td>{cliente.telefone}</td>
                            <td>{cliente.dtCadastro ? format(parseISO(cliente.dtCadastro), "dd/MM/yyyy"):null}</td>
                            <td>{cliente.nivelCliente === 3 ?(
                              'Ambos'
                            ): (
                              <>
                              {cliente.nivelCliente === 1 ? 'Comprador' : 'Vendedor'}
                              </>
                            )}</td>
                            <td>{cliente.codStatus !== 1 ? (
                              <span className="badge  bg-warning text-dark">{cliente.descStatus}</span>
                            ):(
                              <span className="badge  bg-success text-dark">{cliente.descStatus}</span>
                            )}</td>
                            <td className="td-button">
                              <button className="btn" data-bs-toggle="modal"
                              data-bs-target="#modalDashboardCliente">
                                <FaChevronRight />
                              </button>
                            </td>
                          </tr>
                          ))}
                        </>
                      ): (
                        
                          <div className="alert alert-warning" role="alert">
                            Nenhum cliente encontrado.
                          </div>
                        
                        
                      )}
                      </tbody>
                    )}
                  </>
                ): (
                  <tbody>
                  {clientes.length > 0 ? (
                    <>
                      {clientes.map((cliente)=> (
                      <tr>
                        <td>{cliente.nomeCompleto}</td>
                        <td>{cliente.telefone}</td>
                        <td>{cliente.dtCadastro ? format(parseISO(cliente.dtCadastro), "dd/MM/yyyy"):null}</td>
                        <td>{cliente.nivelCliente === 3 ?(
                          'Ambos'
                        ): (
                          <>
                          {cliente.nivelCliente === 1 ? 'Comprador' : 'Vendedor'}
                          </>
                        )}</td>
                        <td>{cliente.codStatus !== 1 ? (
                          <span className="badge  bg-warning text-dark">{cliente.descStatus}</span>
                        ):(
                          <span className="badge  bg-success text-dark">{cliente.descStatus}</span>
                        )}</td>
                        <td>{cliente.nomeUserCadastro !== null ? ('vazio') : (cliente.nomeUserCadastro)}</td>
                        <td className="td-button">
                          <button className="btn" data-bs-toggle="modal" onClick={()=> clienteImovel(cliente.codCliente)}
                          data-bs-target="#modalDashboardCliente">
                            <FiPlus />
                          </button>
                        </td>
                      </tr>
                      ))}
                    </>
                  ): (
                      <div className='m-4'>
                        Nenhum cliente encontrado.
                      </div>
                  )}
                  </tbody>
                )}
               
              </table>
            </div>
          </section>
          <div>
              {searchGetFilterCliente ? (
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
    <div
        className="modal fade"
        id="modalDashboardCliente"
        tabIndex={-1}
        aria-labelledby="modalTableClienteLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modalTableClienteLabel">
                Imoveis{" "}
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
              
                <div className="table-responsive">
                  <table className="table mb-0 ">
                    
                      <tbody className="text-center">
                      {imovelCliente.map((imovelC) => (
                        <>
                        {imovelC.imoveis.length ?
                        (
                          <>
                          {imovelC.imoveis.map((imovel)=> (
                            <tr key={imovel.codImovel}>
                              {imovel.imgsDoImovel.length > 0 ?(
                                <>
                                  <td><img className='img-thumbnail' src={imovel.imgsDoImovel[0]} alt="imóvel capa" /></td>
                                </>
                              ): (
                                <td>Sem imagens</td>
                              )}
                              <td>{imovel.endereco}</td>
                              <td>{imovel.descTipoImovel}</td>
                              <td>{statusImovel(imovel.codStatus)}</td>
                            </tr>
                          ))}
                        
                        </>
                        ):(
                          <div className="alert alert-warning" role="alert">
                            Nenhum imóvel registrado por esse cliente.
                          </div>
                        )}
                        </>
                      ))}
                      
                      </tbody>
                  </table>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    <Footer dark />
    </>
  )
}

export default AdmClientesUser