import { FormEvent, useEffect, useState } from 'react'

import { FaDollarSign, FaRedoAlt, FaSearch } from "react-icons/fa";
import { IoEllipsisHorizontal } from 'react-icons/io5';
import '../../../styles/pages/dashboard/corretor/listaagenda.scss';
import { useHistory } from 'react-router';
import { iDadosUsuario } from '../../../@types';
import NavbarDashCorretor from '../../../components/Navbar/NavbarDashCorretor';
import NavbarDashHeader from '../../../components/Navbar/NavbarDashHeader';
import api from '../../../services/api';
import { BsQuestionCircle } from 'react-icons/bs';
import Paginacao from '../../../components/Paginacao';
import Footer from '../../../components/Footer';
import { format, parseISO } from "date-fns";
import NavbarDash from '../../../components/Navbar/NavbarDash';

interface AgendaLista {
  clienteComprador: string,
  clienteVendedor: string,
  endereco: string,
  codAgenda: number,
  codStatus: number,
  confirmacaoComprador: boolean,
  confirmacaoCorretorCompra: boolean,
  confirmacaoCorretorVenda: boolean,
  confirmacaoVendedor: boolean,
  corretorComprador: string,
  corretorVendedor: string,
  dtFim: string,
  dtInicio: string,
  descStatusAgenda: string,
  jaAprovou: boolean
}


const ListaAgenda = () => {

  const history = useHistory();
  const [filter, setFilter] = useState<AgendaLista[]>([]);
  let [filterAgenda, setFilterAgenda] = useState<AgendaLista[]>([]);


  const [searchAgenda, setSearchAgenda] = useState('');
  const [pagina, setPagina] = useState(1);
  const [searchGetFilterAgenda, setSearchGetFilterAgenda] = useState(false);

  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@appePlus/usuario') || '{}'
  );
  const [listaAgenda, setListaAgenda] = useState<AgendaLista[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataAtual, setDataAtual] = useState("");
  const [AgendaConfirma, setAgendaConfirma] = useState(false);
  const [AgendaCancela, setAgendaCancela] = useState(false);




  function checaUsuarioLogado() {
    if (!usuario.codCorretor && !usuario.codUsuario && !usuario.codCliente) {
      window.alert("Você precisa fazer login!")
      history.push('/')
    }
  }
  async function GetAgenda() {
    var CodCorretor: any;
    var CodCliente: any;
    if (usuario.codCorretor !== null) {
      CodCorretor = usuario.codCorretor;
    } else {
      CodCorretor = null;
    }
    if (usuario.codCliente !== null) {
      CodCliente = usuario.codCliente;
    } else {
      CodCliente = null;
    }

    if (usuario.token) {
      setLoading(true);

      await api
        .get("/agenda/listar-eventos", {
          params: {
            CodCliente: CodCliente,
            CodCorretor: CodCorretor,
            Pagina: pagina,
            QtdePagina: 20
          },
        })
        .then((response) => {

          setListaAgenda(response.data.data);
          console.log('lista agenda', response.data.data)
          setLoading(false);
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
          setLoading(false);
        });
    }



  }
  async function getFilterAgenda() {
    var CodCorretor: any;
    var CodCliente: any;
    if (usuario.codCorretor !== null) {
      CodCorretor = usuario.codCorretor;
    }
    if (usuario.codCliente !== null) {
      CodCliente = usuario.codCliente;
    }
    if (usuario.token) {
      await api
        .get("/agenda/listar-eventos", {
          params: {
            CodCorretor: CodCorretor,
            CodCliente: CodCliente,
            Pagina: 1,
            QtdePagina: 999
          },
        }).then(response => {
          filterAgenda = response.data.data
          const filter = filterAgenda.filter(agenda => {
            return (
              agenda.endereco?.toString().toLocaleLowerCase().includes(searchAgenda.toString().toLowerCase()) ||
              agenda.descStatusAgenda?.toString().toLocaleLowerCase().includes(searchAgenda.toString().toLowerCase())

            )
          })
          setFilter(filter)
          console.log('filtro', filter)
        }).catch(error => {
          console.log(error)
        })
    }
  }
  const getHorario = (horario: string) => {
    const horarioFormate = horario.split('T');
    const horarioForm = horarioFormate[1];
    const hora = horarioForm.split(':', 2)
    const value = hora.join(':')
    return value
  }

  function handleAgenda(event: FormEvent) {
    event.preventDefault()
    if (searchAgenda === "") {
      GetAgenda();
      setSearchGetFilterAgenda(false)
    } else {
      getFilterAgenda();
      setSearchGetFilterAgenda(true)
    }
  }

  async function confirmarVisita(codImovel: number) {

    const codigoImovel = codImovel;
    if (usuario.codCorretor !== null) {
      await api.post(`/agenda/confirmar-visita?CodAgenda=${codigoImovel}&codCorretor=${usuario.codCorretor}&Status=true`).then(response => {
        setAgendaConfirma(true)
        window.location.reload()
      }).catch(error => {
        console.log(error)
      })

    }
    if (usuario.codCliente !== null) {
      await api.post(`/agenda/confirmar-visita?CodAgenda=${codigoImovel}&codCliente=${usuario.codCliente}&Status=true`).then(response => {
        setAgendaConfirma(true)
        window.location.reload()
      }).catch(error => {
        console.log(error)
      })
    }


  }
  async function cancelarVisita(codImovel: number) {
    const codigoImovel = codImovel;
    if (usuario.codCorretor !== null) {
      await api.post(`/agenda/confirmar-visita?CodAgenda=${codigoImovel}&codCorretor=${usuario.codCorretor}&Status=false`).then(response => {
        setAgendaCancela(true)
        window.location.reload()
      }).catch(error => {
        console.log(error)
      })

    }
    if (usuario.codCliente !== null) {
      await api.post(`/agenda/confirmar-visita?CodAgenda=${codigoImovel}&codCliente=${usuario.codCliente}&Status=false`).then(response => {
        setAgendaCancela(true)
        window.location.reload()
      }).catch(error => {
        console.log(error)
      })
    }

  }


  useEffect(() => {
    checaUsuarioLogado()
    GetAgenda();


  }, [pagina])


  return (
    <>
      <div className="wrapper-imoveis" id='lista-agenda'>
        {!!usuario.codCorretor ? <NavbarDashCorretor /> : <NavbarDash />}

        <div className="main-content">
          <NavbarDashHeader />
          <div className="container">
            <section className="my-4">
              <div className="row">
                <div className="col-lg-10">
                  <h2>Status de agendamento de visitas</h2>
                </div>
                {/* <div className="col-lg-2" >
                  <button className="buttonUpdate">Atualizar<FaRedoAlt size={14} style={{ marginLeft: 10 }} /></button>
                </div> */}
              </div>
            </section>
            <div className="meus-imoveis lista-agenda">
              <form onSubmit={handleAgenda}>
                <div className="filtro-corretor my-3 col-lg-12">
                  <input type="text" placeholder="Busque por endereço ou status" className="campo-filtro" value={searchAgenda} onChange={event => setSearchAgenda(event.target.value)} />
                  <button type="submit" className="buttonBuscar">Pesquisar <FaSearch style={{ marginLeft: 10 }} /></button>
                </div>
              </form>

              <div className="cod-md-2 line-gray"></div>
              <div className="lista-propostas">
                <div className="accordion" id="accordionPanelsStayOpenExample">
                  <div className="cabecalho-propostas">
                    <ul>
                      <li>Data da visita</li>
                      <li className='text-xl-start'>Horário da visita</li>
                      <li className='text-xl-start'>Endereço</li>
                      <li className='text-xl-start'>Status</li>

                    </ul>
                  </div>
                  {listaAgenda !== null ? (
                    <>
                      {searchGetFilterAgenda ? (
                        <>
                          {filter.length == 0 ? (
                            <div className='text-center'>
                              <p>Não encontramos nenhum resultado de busca solicitado</p>
                            </div>
                          ) : (
                            <>
                              {filter.map((agenda, index) => (
                                <div className="accordion-item px-1" key={index} >
                                  <div className="accordion-header" id={`panelsStayOpen-heading${index}`}>
                                    <div className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${index}`} aria-expanded="false" aria-controls={`panelsStayOpen-collapse${index}`}>
                                      <ul className="list-status">
                                        <li className="name-img">
                                          {agenda.dtInicio
                                            ? format(
                                              parseISO(agenda.dtInicio),
                                              "dd/MM/yyyy"
                                            )
                                            : null}
                                        </li>
                                        <li>
                                          {getHorario(agenda.dtInicio)} até {getHorario(agenda.dtFim)}
                                        </li>
                                        <li >
                                          {agenda.endereco}
                                        </li>
                                        <li>
                                          {agenda.descStatusAgenda}
                                        </li>

                                      </ul>
                                    </div>
                                  </div>
                                  <div id={`panelsStayOpen-collapse${index}`} className="accordion-collapse collapse " aria-labelledby={`panelsStayOpen-heading${index}`}>
                                    <div className="accordion-body">
                                      <div className="detalhes">
                                        <div className="row mt-4">
                                          <div className="col-lg-6">
                                            <p className='subTitle'>Detalhes do agendamento</p>
                                            <div className='table-responsive'>
                                              <table className="table table-borderless">
                                                <tbody>
                                                  <tr>
                                                    <td className='col-12'><strong>Cliente Comprador: </strong>{agenda.clienteComprador}</td>
                                                  </tr>
                                                  <tr>
                                                    <td className='col-12'><strong>Cliente Vendedor: </strong>{agenda.clienteVendedor} {agenda.confirmacaoVendedor}</td>

                                                  </tr>
                                                  <tr>
                                                    <td className='col-12'><strong>Corretor Vendedor: </strong>{agenda.corretorVendedor}</td>
                                                    <td>{agenda.confirmacaoCorretorVenda}</td>
                                                  </tr>
                                                  <tr>
                                                    <td className='col-12'><strong>Corretor Comprador: </strong> {agenda.corretorComprador}</td>
                                                    <td>{agenda.confirmacaoCorretorVenda}</td>
                                                  </tr>
                                                  <tr>
                                                    <td className='col-12'><strong>Status: </strong>{agenda.descStatusAgenda}</td>

                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                          <div className="col-lg-6">

                                            <p className='subTitle'>Status do Agendamento</p>
                                            <div className='table-responsive'>
                                              <table className="table table-borderless">
                                                <tbody>

                                                  <tr>
                                                    <td className='col-12'><strong>Confirmacao do Comprador: </strong>{agenda.confirmacaoComprador ? ('Aprovado') : ('Aguardando')}</td>
                                                  </tr>
                                                  <tr>
                                                    <td className='col-12'><strong>Confirmacao do Corretor comprador: </strong>{agenda.confirmacaoCorretorCompra ? ('Aprovado') : ('Aguardando')}</td>
                                                  </tr>
                                                  <tr>
                                                    <td className='col-12'><strong>Confirmacao do Corretor vendedor: </strong>{agenda.confirmacaoCorretorVenda ? ('Aprovado') : ('Aguardando')}</td>
                                                  </tr>
                                                  <tr>
                                                    <td className='col-12'><strong>Confirmacao do Vendedor: </strong>{agenda.confirmacaoVendedor ? ('Aprovado') : ('Aguardando')}</td>
                                                  </tr>
                                                  <tr>
                                                    <td className='col-12 float-td'>

                                                      {!agenda.jaAprovou == true && (
                                                        <button className='btn btn-primary m-1' onClick={() => confirmarVisita(agenda.codAgenda)}>Confirmar</button>
                                                      )}
                                                      <button className='btn btn-danger m-1 button-cancelar' onClick={() => cancelarVisita(agenda.codAgenda)}>Cancelar</button>
                                                    </td>

                                                  </tr>


                                                </tbody>
                                              </table>
                                              {AgendaConfirma && (
                                                <div className="alert alert-success" role="alert">
                                                  Seu agendamento foi confirmado !
                                                </div>
                                              )}
                                              {AgendaCancela && (
                                                <div className="alert alert-warning" role="alert">
                                                  Seu agendamento foi cancelado !
                                                </div>
                                              )}
                                            </div>
                                          </div>

                                        </div>

                                      </div>



                                    </div>
                                  </div>
                                </div>
                              ))}
                            </>
                          )}
                        </>

                      ) : (
                        <>
                          {listaAgenda.length > 0 ? (
                            <>
                              {listaAgenda.map((agenda, index) => (
                                <div className="accordion-item px-1" key={index} >
                                  <div className="accordion-header" id={`panelsStayOpen-heading${index}`}>
                                    <div className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${index}`} aria-expanded="false" aria-controls={`panelsStayOpen-collapse${index}`}>
                                      <ul className="list-status">
                                        <li className="name-img">
                                          {agenda.dtInicio
                                            ? format(
                                              parseISO(agenda.dtInicio),
                                              "dd/MM/yyyy"
                                            )
                                            : null}
                                        </li>
                                        <li>
                                          {getHorario(agenda.dtInicio)} até {getHorario(agenda.dtFim)}
                                        </li>
                                        <li >
                                          {agenda.endereco}
                                        </li>
                                        <li>
                                          {agenda.descStatusAgenda}
                                        </li>

                                      </ul>
                                    </div>
                                  </div>
                                  <div id={`panelsStayOpen-collapse${index}`} className="accordion-collapse collapse " aria-labelledby={`panelsStayOpen-heading${index}`}>
                                    <div className="accordion-body">
                                      <div className="detalhes">
                                        <div className="row mt-4">
                                          <div className="col-lg-6">
                                            <p className='subTitle'>Detalhes do agendamento</p>
                                            <div className='table-responsive'>
                                              <table className="table table-borderless">
                                                <tbody>
                                                  <tr>
                                                    <td className='col-12'><strong>Cliente Comprador: </strong>{agenda.clienteComprador}</td>
                                                  </tr>
                                                  <tr>
                                                    <td className='col-12'><strong>Cliente Vendedor: </strong>{agenda.clienteVendedor} {agenda.confirmacaoVendedor}</td>

                                                  </tr>
                                                  <tr>
                                                    <td className='col-12'><strong>Corretor Vendedor: </strong>{agenda.corretorVendedor}</td>
                                                    <td>{agenda.confirmacaoCorretorVenda}</td>
                                                  </tr>
                                                  <tr>
                                                    <td className='col-12'><strong>Corretor Comprador: </strong> {agenda.corretorComprador}</td>
                                                    <td>{agenda.confirmacaoCorretorVenda}</td>
                                                  </tr>
                                                  <tr>
                                                    <td className='col-12'><strong>Status: </strong>{agenda.descStatusAgenda}</td>

                                                  </tr>



                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                          <div className="col-lg-6">

                                            <p className='subTitle'>Status do Agendamento</p>
                                            <div className='table-responsive'>
                                              <table className="table table-borderless">
                                                <tbody>

                                                  <tr>
                                                    <td className='col-12'><strong>Confirmacao do Comprador: </strong>{agenda.confirmacaoComprador ? ('Aprovado') : ('Aguardando')}</td>
                                                  </tr>
                                                  <tr>
                                                    <td className='col-12'><strong>Confirmacao do Corretor comprador: </strong>{agenda.confirmacaoCorretorCompra ? ('Aprovado') : ('Aguardando')}</td>
                                                  </tr>
                                                  <tr>
                                                    <td className='col-12'><strong>Confirmacao do Corretor vendedor: </strong>{agenda.confirmacaoCorretorVenda ? ('Aprovado') : ('Aguardando')}</td>
                                                  </tr>
                                                  <tr>
                                                    <td className='col-12'><strong>Confirmacao do Vendedor: </strong>{agenda.confirmacaoVendedor ? ('Aprovado') : ('Aguardando')}</td>
                                                  </tr>
                                                  <tr>
                                                    <td className='col-12 float-td'>
                                                      {!agenda.jaAprovou == true && (
                                                        <button className='btn btn-primary m-1' onClick={() => confirmarVisita(agenda.codAgenda)}>Confirmar</button>
                                                      )}

                                                      <button className='btn btn-danger m-1 button-cancelar' onClick={() => cancelarVisita(agenda.codAgenda)}>Cancelar</button>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              {AgendaConfirma && (
                                                <div className="alert alert-success" role="alert">
                                                  Seu agendamento foi confirmado !
                                                </div>
                                              )}
                                              {AgendaCancela && (
                                                <div className="alert alert-warning" role="alert">
                                                  Seu agendamento foi cancelado !
                                                </div>
                                              )}

                                            </div>
                                          </div>

                                        </div>

                                      </div>



                                    </div>
                                  </div>
                                </div>
                              ))}
                            </>
                          ) : (
                            <div className='text-center'>
                              <p>No momento não temos agendamento</p>
                            </div>
                          )}

                        </>
                      )}
                    </>
                  ) : (
                    <div className='text-center'>
                      <p>No momento não temos agendamento</p>
                    </div>
                  )}



                </div>

              </div>
              <div className="px-4 d-flex justify-content-between align-items-center flex-wrap">
                <div className="status-page">

                </div>
                <div>
                  {listaAgenda.length > 20 &&
                    <Paginacao total={100} limit={5} paginaAtual={pagina} setPagina={setPagina} />
                  }

                </div>
              </div>
              <div className="cod-md-2 line-gray"></div>
              <div className="px-4 my-4">
                <p className="status-information"></p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {!!usuario.codCorretor ? <Footer dark /> : <Footer />}


    </>
  )
}

export default ListaAgenda
