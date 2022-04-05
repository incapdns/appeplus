import { FormEvent, useEffect, useState } from 'react'
import NavbarDash from '../../components/Navbar/NavbarDash'
import NavbarDashHeader from '../../components/Navbar/NavbarDashHeader'
import { FaDollarSign, FaRedoAlt, FaSearch } from "react-icons/fa";
import { NavbarDashDark } from '../../components/Navbar/NavbarDashDark';
import Historico from '../../components/Cards/Historico';
import { BsCheckCircleFill, BsQuestionCircle } from 'react-icons/bs';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import '../../styles/pages/dashboard/transacoes.scss';
import Updates from '../../components/Cards/Updates';
import { AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';
import { RiArrowDownSLine } from 'react-icons/ri';
import Footer from '../../components/Footer';
import { useHistory } from 'react-router';
import { iBancos, iDadosUsuario } from '../../@types';
import NavbarDashCorretor from '../../components/Navbar/NavbarDashCorretor';
import api from '../../services/api';
import { moeda } from '../../utils/Masks';
import { BiTime } from 'react-icons/bi';
import Paginacao from '../../components/Paginacao';

interface iFinanceiroTransacao {
      dtLancamento: string,
      dtEmissao: string,
      dtVencimento: string,
      dtPagamento: string,
      valorOriginal: number,
      valor: number,
      tipoLancamento: string,
      numDocumento: string,
      codContaBancaria: number,
      status: string,
      contaBancaria: {
        codContaBancaria: number,
        descContaBancaria: string,
        codBanco: number,
        agencia: number,
        contaCorrente: number,
        saldoInicial: number,
        nomeCorretor: string,
        cpfCorretor: string,
        numeroCreciCorretor: string,
        nomeCliente: string,
        cpfcnpj: string
      }
}

const Transacoes = () => {
  const [updates, setUpdates] = useState(true)
  const [transacoes, setTransacoes] = useState<iFinanceiroTransacao[]>([])
  const [filter, setFilter] = useState<iFinanceiroTransacao[]>([]);
  let [filterProposta, setFilterProposta] = useState<iFinanceiroTransacao[]>([]);
  const [bancos, setBancos] = useState<iBancos[]>([])
  const [nomeBanco, setNomeBanco]= useState('')
  const [codigoBanco, setCodigoBanco] = useState<number>()
  const [searchProposta, setSearchProposta] = useState('');
  const [pagina, setPagina] = useState(1);
  const [searchGetFilterProposta, setSearchGetFilterProposta] = useState(false);
  
  const history = useHistory();
   
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@appePlus/usuario') || '{}'
  );

  function checaUsuarioLogado() {
    if (!usuario.codCorretor && !usuario.codUsuario && !usuario.codCliente) {
      window.alert("Você precisa fazer login!")
      history.push('/')
    }
  }
  async function getDetalhesPropostas() {
    if(usuario.token){
      await api.get(`/financeiro?CodCorretor=5&QtdePagina=5&Pagina=${pagina}`).then(response =>{
        setTransacoes(response.data.data)
      })
    }
    
    setUpdates(false)
  }
  async function getFilterDetalhesPropostas(){
    if(usuario.token){
      await api.get(`/financeiro?CodCorretor=5&QtdePagina=999&Pagina=1`).then(response =>{
        filterProposta = response.data.data
        const filter = filterProposta.filter(proposta =>{
          return(
            proposta.valor?.toString().toLocaleLowerCase().includes(searchProposta.toString().toLowerCase()) ||
            proposta.status?.toString().toLocaleLowerCase().includes(searchProposta.toString().toLowerCase()) ||
            proposta.tipoLancamento?.toString().toLocaleLowerCase().includes(searchProposta.toString().toLowerCase())
          )
        })
        setFilter(filter)
        console.log('filtro',filter)
      }).catch(error =>{
        console.log(error)
      })
    }
  }
  async function getBancos(){
    if(usuario.token){
      await api.get(`/banco`).then(response =>{
        setBancos(response.data.data)
        console.log(response.data.data)
      }).catch(error =>{
        console.log(error)
      })
    }
  }
  function informacoesConta(codBanco:number){
   bancos.filter(banco => {
     if(banco.codBanco === codBanco) return setNomeBanco(banco.descBanco) 
   })
 
  }
  
  const formataData = (date:string) => {
     const dataFormate = date.split('T', 1);
     const newDate = dataFormate[0];
     const d = newDate.split('-');
     const data =  `${d[2]}.${d[1]}.${d[0]}`;
    return data
  }
  
  function handleProposta(event:FormEvent){
    event.preventDefault()
    if(searchProposta === ""){
      getDetalhesPropostas()
      setSearchGetFilterProposta(false)
    }else{
      getFilterDetalhesPropostas();
      setSearchGetFilterProposta(true)
    }
  }


  useEffect(() => {
    checaUsuarioLogado()
    getDetalhesPropostas();
    getBancos();
    
  }, [pagina])

  
  return (
    <>
      <div className="wrapper-imoveis" id='transacoes'>
        <NavbarDashCorretor />
        <div className="main-content">
          <NavbarDashHeader />
          <div className="container">
            <section className="my-4">
              <div className="row">
                <div className="col-lg-10">
                  <h2>Últimas transações</h2>
                </div>
                <div className="col-lg-2" >
                  <button className="buttonUpdate">Atualizar<FaRedoAlt size={14} style={{ marginLeft: 10 }} /></button>
                </div>
              </div>
            </section>
            <div className="meus-imoveis">
              <form onSubmit={handleProposta}>
                <div className="filtro-corretor my-3 col-lg-12">
                  <input type="text" placeholder="Busque por nome, Valor ou tipo de transação" className="campo-filtro" value={searchProposta} onChange={event => setSearchProposta(event.target.value)} />
                  <button type="submit" className="buttonBuscar">Encontrar transação <FaSearch style={{ marginLeft: 10 }} /></button>
                </div>
              </form>
              {/* <div className="row mx-2 blue-filter col-lg-12">
                <div className="col-lg-6  my-2 d-flex first-filter">
                  <p>Tipo de transação</p>
                  <select className="caixa-select" >
                    <option value="historico">venda indireta</option>
                    <option value="maiorValor">venda direta </option>
                    <option value="menorValor">parcelado</option>
                  </select>

                </div>
                <div className="col-lg-6  my-2 d-flex second-filter" >
                  <p>Ordenar por: </p>
                  <select className="caixa-select" >
                    <option value="historico">Histórico</option>
                    <option value="maiorValor">Maior valor</option>
                    <option value="menorValor">Menor valor</option>
                  </select>
                </div>
              </div> */}
              <div className="cod-md-2 line-gray"></div>
              <div className="lista-propostas">
                <div className="accordion"  id="accordionPanelsStayOpenExample">
                  <div className="cabecalho-propostas">
                    <ul>
                      <li>Valor</li>
                      <li>Referência</li>
                      <li>Data</li>
                      <li>Status da transação</li>
                      <li>mais sobre</li>
                    </ul>
                  </div>
                  {transacoes !== null ? (
                    <>
                    {searchGetFilterProposta ? (
                      <>
                        {filter.length == 0 ? (
                          <div className='text-center'>
                            <p>Não encontramos nenhum resultado de busca solicitado</p>
                          </div>
                        ): (
                          <>
                            {filter.map((transacao, index)=>(
                          <div className="accordion-item" onClick={() => informacoesConta(transacao.contaBancaria.codBanco)} key={index} >
                            <div className="accordion-header" id={`panelsStayOpen-heading${index}`}>
                              <div className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${index}`} aria-expanded="false" aria-controls={`panelsStayOpen-collapse${index}`}>
                                <ul className="list-status">
                                  <li className="name-img">
                                    <FaDollarSign color={'#4BB7F1'} /> {moeda(transacao.valor)}
                                  </li>
                                  <li  >
                                    {transacao.tipoLancamento}
                                  </li>
                                  <li >
                                    {formataData(transacao.dtEmissao)}
                                  </li>
                                  {transacao.status === 'Quitado' && (
                                    <li className='valor-aprovado'>
                                      <BsCheckCircleFill color={'#3BC14A'} /> {transacao.status}
                                    </li>
                                  )}
                                  {transacao.status === 'AVencer' && (
                                    <li className='valor-aguardo'>
                                      <BiTime color={'#FFB30F'} /> {transacao.status}
                                    </li>
                                  )}
                                  {transacao.status === 'Vencida ' && (
                                    <li className='valor-saida'>
                                      <AiOutlineCloseCircle color={'#FD4A19'} /> {transacao.status}
                                    </li>
                                  )}
                                    
                                  
                                  <li>
                                    <RiArrowDownSLine fontSize={24} />
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div id={`panelsStayOpen-collapse${index}`} className="accordion-collapse collapse " aria-labelledby={`panelsStayOpen-heading${index}`}>
                              <div className="accordion-body">
                                <div className="card-header p-0 d-flex justify-content-lg-between justify-content-center align-items-center flex-wrap">
                                  <div className="action">
                                    {/* <button onClick={() => setUpdates(true)} className={`${updates && ('active')}`}>Updates</button> */}
                                    <button onClick={getDetalhesPropostas} className={`${!updates && ('active')}`}>Detalhes</button>
                                  </div>
                                  <div className="information">
                                    <button className="mx-3"><BsQuestionCircle fontSize={24} color={'#4BB7F1'} /></button>
                                    <button><IoEllipsisHorizontal fontSize={24} color={'#4BB7F1'} /></button>
                                  </div>
                                </div>
                                  <div className="detalhes">
                                    <div className="row mt-4">
                                      {/* <div className="col-lg-6">
                                        <p className='subTitle'>Detalhamento da transação</p>
                                        <div className='table-responsive'>
                                          <table className="table table-borderless">
                                            <tbody>
                                              <tr>
                                                <td className='col-6'>Comissão nível 1</td>
                                                <td>R$ 853,00</td>
                                              </tr>
                                              <tr>
                                                <td className='col-6 taxa'>Nossa taxa</td>
                                                <td>R$ 16,54</td>
                                              </tr>
                                              <tr>
                                                <td className='col-6'>Valor final</td>
                                                <td>R$ 853,00</td>
                                              </tr>
                                              <tr className='resultado-valor'>
                                                <td className='col-6'>Você recebeu</td>
                                                <td>R$ 850,00</td>
                                              </tr>
                                              <tr className='resultado-transacao'>
                                                <td className='col-6' >Nº de transações </td>
                                                <td>AP+ 1546513513515na</td>
                                              </tr>

                                            </tbody>
                                          </table>
                                        </div>
                                      </div> */}
                                      <div className="col-lg-12">
                                        <p className='subTitle'>Detalhamento da conta</p>
                                      </div>
                                      <div className="col-lg-6">
                                        <div className='table-responsive'>
                                          <table className="table table-borderless">
                                            <tbody>
                                              <tr>
                                                <td className='col-6'>Nome do banco </td>
                                                <td>{nomeBanco}</td>
                                              </tr>
                                              <tr>
                                                <td className='col-6'>Conta</td>
                                                <td>{transacao.contaBancaria.descContaBancaria}</td>
                                              </tr>
                                              <tr>
                                                <td className='col-6'>Tipo de conta</td>
                                                <td>{transacao.contaBancaria.descContaBancaria}</td>
                                              </tr>
                                              <tr>
                                                <td className='col-6'>Conta</td>
                                                <td>{transacao.contaBancaria.codContaBancaria}</td>
                                              </tr>
                                              <tr>
                                                <td className='col-6'>Agência</td>
                                                <td>{transacao.contaBancaria.contaCorrente}</td>
                                              </tr>
                                              <tr>
                                                <td className='col-6'>Telefone do destinatário</td>
                                                <td>1 9 9999-9999</td>
                                              </tr>
                                              <tr>
                                                <td className='col-6'>CPF:</td>
                                                <td>{transacao.contaBancaria.cpfcnpj}</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                {/* {updates ? (
                                  <div className="historico">
                                    <Updates />
                                  </div>
                                ) : (
                                  
                                )} */}


                              </div>
                            </div>
                          </div>
                            ))}
                          </>
                        ) }
                      </>
                      
                    ):(
                      <>
                        {transacoes.map((transacao, index)=>(
                      <div className="accordion-item" onClick={() => informacoesConta(transacao.contaBancaria.codBanco)} key={index} >
                        <div className="accordion-header" id={`panelsStayOpen-heading${index}`}>
                          <div className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${index}`} aria-expanded="false" aria-controls={`panelsStayOpen-collapse${index}`}>
                            <ul className="list-status">
                              <li className="name-img">
                                <FaDollarSign color={'#4BB7F1'} /> {moeda(transacao.valor)}
                              </li>
                              <li  >
                                {transacao.tipoLancamento}
                              </li>
                              <li >
                                {formataData(transacao.dtEmissao)}
                              </li>
                              {transacao.status === 'Quitado' && (
                                <li className='valor-aprovado'>
                                  <BsCheckCircleFill color={'#3BC14A'} /> {transacao.status}
                                </li>
                              )}
                              {transacao.status === 'AVencer' && (
                                <li className='valor-aguardo'>
                                  <BiTime color={'#FFB30F'} /> {transacao.status}
                                </li>
                              )}
                              {transacao.status === 'Vencida ' && (
                                <li className='valor-saida'>
                                  <AiOutlineCloseCircle color={'#FD4A19'} /> {transacao.status}
                                </li>
                              )}
                                
                              
                              <li>
                                <RiArrowDownSLine fontSize={24} />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div id={`panelsStayOpen-collapse${index}`} className="accordion-collapse collapse " aria-labelledby={`panelsStayOpen-heading${index}`}>
                          <div className="accordion-body">
                            <div className="card-header p-0 d-flex justify-content-lg-between justify-content-center align-items-center flex-wrap">
                              <div className="action">
                                {/* <button onClick={() => setUpdates(true)} className={`${updates && ('active')}`}>Updates</button> */}
                                <button onClick={getDetalhesPropostas} className={`${!updates && ('active')}`}>Detalhes</button>
                              </div>
                              <div className="information">
                                <button className="mx-3"><BsQuestionCircle fontSize={24} color={'#4BB7F1'} /></button>
                                <button><IoEllipsisHorizontal fontSize={24} color={'#4BB7F1'} /></button>
                              </div>
                            </div>
                              <div className="detalhes">
                                <div className="row mt-4">
                                  {/* <div className="col-lg-6">
                                    <p className='subTitle'>Detalhamento da transação</p>
                                    <div className='table-responsive'>
                                      <table className="table table-borderless">
                                        <tbody>
                                          <tr>
                                            <td className='col-6'>Comissão nível 1</td>
                                            <td>R$ 853,00</td>
                                          </tr>
                                          <tr>
                                            <td className='col-6 taxa'>Nossa taxa</td>
                                            <td>R$ 16,54</td>
                                          </tr>
                                          <tr>
                                            <td className='col-6'>Valor final</td>
                                            <td>R$ 853,00</td>
                                          </tr>
                                          <tr className='resultado-valor'>
                                            <td className='col-6'>Você recebeu</td>
                                            <td>R$ 850,00</td>
                                          </tr>
                                          <tr className='resultado-transacao'>
                                            <td className='col-6' >Nº de transações </td>
                                            <td>AP+ 1546513513515na</td>
                                          </tr>

                                        </tbody>
                                      </table>
                                    </div>
                                  </div> */}
                                  <div className="col-lg-12">
                                    <p className='subTitle'>Detalhamento da conta</p>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className='table-responsive'>
                                      <table className="table table-borderless">
                                        <tbody>
                                          <tr>
                                            <td className='col-6'>Nome do banco </td>
                                            <td>{nomeBanco}</td>
                                          </tr>
                                          <tr>
                                            <td className='col-6'>Conta</td>
                                            <td>{transacao.contaBancaria.descContaBancaria}</td>
                                          </tr>
                                          <tr>
                                            <td className='col-6'>Tipo de conta</td>
                                            <td>{transacao.contaBancaria.descContaBancaria}</td>
                                          </tr>
                                          <tr>
                                            <td className='col-6'>Conta</td>
                                            <td>{transacao.contaBancaria.codContaBancaria}</td>
                                          </tr>
                                          <tr>
                                            <td className='col-6'>Agência</td>
                                            <td>{transacao.contaBancaria.contaCorrente}</td>
                                          </tr>
                                          <tr>
                                            <td className='col-6'>Telefone do destinatário</td>
                                            <td>1 9 9999-9999</td>
                                          </tr>
                                          <tr>
                                            <td className='col-6'>CPF:</td>
                                            <td>{transacao.contaBancaria.cpfcnpj}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            {/* {updates ? (
                              <div className="historico">
                                <Updates />
                              </div>
                            ) : (
                              
                            )} */}


                          </div>
                        </div>
                      </div>
                        ))}
                      </>
                    )}
                    </>
                  ): (
                    <div className='text-center'>
                     <p>No momento não temos propostas registradas!</p>
                   </div>
                  )}
                  
                 
                  
                </div>

              </div>
              <div className="px-4 d-flex justify-content-between align-items-center flex-wrap">
                <div className="status-page">
                  <p>Mostrando transações <span>de 1 a 24</span></p>
                </div>
                <div>
                  <Paginacao total={100} limit={5} paginaAtual={pagina} setPagina={setPagina} />
                </div>
              </div>
              <div className="cod-md-2 line-gray"></div>
              <div className="px-4 my-4">
                <p className="status-information">Monstrando transações já creditadas. Última atualização em 07.11.2021 às 17:38</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer dark />

    </>
  )
}

export default Transacoes
