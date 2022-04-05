import '../../styles/pages/dashboard/historicoImoveis.scss';
import { FaPencilAlt, FaWhatsappSquare, FaPhoneAlt, FaRegEnvelope, FaSearch, FaRegCommentAlt, FaRegTimesCircle, FaPlus } from "react-icons/fa";
import Corretor from '../../assets/internas/corretor.png'
import Paginacao from '../../components/Paginacao';
import { FormEvent, useEffect, useState } from 'react';
import { HiOutlineDownload } from "react-icons/hi";
import api from '../../services/api';
import { EmailShareButton, WhatsappShareButton } from "react-share";
import { phoneMask } from '../../utils/Masks';
import Alert from '../../components/Alert';
import { useHistory } from 'react-router-dom';

interface iHistorico {
    codHistoricoCliente: number,
    codCliente: number,
    codTipoHistoricoCliente: number,
    descHistoricoCliente: string,
    dtHistorico: string,
    proposta: number,
    compromisso: number,
    dtCorreta: string,
}
interface iCliente {
    codCliente: number,
    email: string,
    nomeCompleto: string,
    telefone: string,
    arquivosCliente: string[],
}
export interface iTipoHistorico {
    codTipoHistoricoCliente?: number;
    descTipoHistoricoCliente?: string;
}

export function HistoricoClientes() {
    const [pagina, setPagina] = useState(1);
    const [historico, setHistorico] = useState<iHistorico[]>([])
    const [cliente, setCliente] = useState<iCliente>()
    var data = ""
    var dia = ""
    var mes = ""
    var ano = ""
    const shareUrl = window.location.href;
    const codCliente = Number(localStorage.getItem('@appePlus/codCliente'));

    const [clienteFiltroVisita, setClienteFiltroVisita] = useState<iHistorico[]>([])
    const [clienteFiltroContatos, setClienteFiltroContatos] = useState<iHistorico[]>([])
    const [clienteFiltroPropostas, setClienteFiltroPorpostas] = useState<iHistorico[]>([])
    const [visita, setVisita] = useState(false)
    const [contatos, setContatos] = useState(false)
    const [propostas, setPropostas] = useState(false)
    const [semFiltro, setSemFiltro] = useState(true)

    const [tipoHistorico, setTipoHistorico] = useState(0);
    const [tiposDeHistorico, setTiposDeHistorico] = useState<iTipoHistorico[]>([]);
    const [descHistorico, setDescHistorico] = useState("");
    const [dataHistorico, setDataHistorico] = useState("");
    const [alertErro, setAlertErro] = useState(false);
    const [msgErro, setMsgErro] = useState('');
    const history = useHistory();
    const [naoEncontrou, setNaoEncontrou] = useState(false)

    const [naoEncontrouVisita, setNaoEncontrouVisita] = useState(false)
    const [naoEncontrouContato, setNaoEncontrouContato] = useState(false)
    const [naoEncontrouProposta, setNaoEncontrouProposta] = useState(false)

    const botaoVisita = document.querySelector('#botaoVisita');
    const botaoContatos = document.querySelector('#botaoContatos');
    const botaoPropostas = document.querySelector('#botaoPropostas');

    function checaUsuarioLogado() {
        if (!codCliente) {
            window.alert("Você precisa fazer login!")
            history.push('/')
        }
    }

    useEffect(() => {
        checaUsuarioLogado()
        accordionActiveClass();
        getHistoricoCliente();
        GetTipoHistorico();
    }, [])

    function limparCampos() {
        setDataHistorico("");
        setDescHistorico("");
        setTipoHistorico(0);
        setAlertErro(false);
    }

    async function GetTipoHistorico() {
        await api.get('/tipo-historico-cliente')
            .then(response => {
                setTiposDeHistorico(response.data.data);
            })
            .catch(error => {
                console.log("Ocorreu um erro");
            })
    }

    async function getHistoricoCliente() {
        await api.get(`HistoricoCliente/buscar-por-cliente?codCliente=${codCliente}`)
            .then(response => {
                if (response.data.data === null) {
                    setNaoEncontrou(true)
                    setSemFiltro(false)
                } else {
                    setCliente(response.data.data.cliente);
                    dataCorrecao(response.data.data.historicos);
                    setSemFiltro(true)
                    setNaoEncontrou(false)
                }
            })
            .catch(error => {
                console.log("Ocorreu um erro");
            })
    }
    async function getHistoricoClienteFiltroVisitas() {
        setNaoEncontrouProposta(false)
        setNaoEncontrouContato(false)
        if (!visita && !naoEncontrouVisita) {
            await api.get(`HistoricoCliente/buscar-por-cliente?codCliente=${codCliente}&codTipo=1`)
                .then(response => {
                    if (response.data.data === null) {
                        setNaoEncontrou(true)
                        setSemFiltro(false)
                        setContatos(false)
                        setPropostas(false)
                        setVisita(false)
                        botaoVisita?.classList.add('ativo')
                        botaoContatos?.classList.remove('ativo')
                        botaoPropostas?.classList.remove('ativo')
                        setNaoEncontrouVisita(true)
                    } else {
                        dataCorrecao(response.data.data.historicos);
                        setVisita(true)
                        setSemFiltro(false)
                        setContatos(false)
                        setPropostas(false)
                        setNaoEncontrou(false)
                        botaoVisita?.classList.add('ativo')
                        botaoContatos?.classList.remove('ativo')
                        botaoPropostas?.classList.remove('ativo')
                    }
                })
                .catch(error => {
                    console.log("Ocorreu um erro");
                })
        } else {
            setVisita(false)
            setSemFiltro(true)
            setNaoEncontrou(false)
            botaoVisita?.classList.remove('ativo')
            setNaoEncontrouVisita(false)
        }
    }
    async function getHistoricoClienteFiltroContatos() {
        setNaoEncontrouVisita(false)
        setNaoEncontrouProposta(false)
        if (!contatos && !naoEncontrouContato) {
            await api.get(`HistoricoCliente/buscar-por-cliente?codCliente=${codCliente}&codTipo=2`)
                .then(response => {
                    if (response.data.data === null) {
                        setNaoEncontrou(true)
                        setContatos(false)
                        setSemFiltro(false)
                        setPropostas(false)
                        setVisita(false)
                        botaoContatos?.classList.add('ativo')
                        botaoVisita?.classList.remove('ativo')
                        botaoPropostas?.classList.remove('ativo')
                        setNaoEncontrouContato(true)
                    } else {
                        dataCorrecao(response.data.data.historicos);
                        setVisita(false)
                        setSemFiltro(false)
                        setContatos(true)
                        setPropostas(false)
                        setNaoEncontrou(false)
                        botaoContatos?.classList.add('ativo')
                        botaoVisita?.classList.remove('ativo')
                        botaoPropostas?.classList.remove('ativo')
                    }
                })
                .catch(error => {
                    console.log("Ocorreu um erro");
                })
        } else {
            setContatos(false)
            setSemFiltro(true)
            setNaoEncontrou(false)
            setNaoEncontrouContato(false)
            botaoContatos?.classList.remove('ativo')
        }
    }
    async function getHistoricoClienteFiltroPropostas() {
        setNaoEncontrouContato(false)
        setNaoEncontrouVisita(false)
        if (!propostas && !naoEncontrouProposta) {
            await api.get(`HistoricoCliente/buscar-por-cliente?codCliente=${codCliente}&codTipo=3&codTipo=4`)
                .then(response => {
                    if (response.data.data === null) {
                        setNaoEncontrou(true)
                        setSemFiltro(false)
                        setContatos(false)
                        setVisita(false)
                        setPropostas(false)
                        botaoPropostas?.classList.add('ativo')
                        botaoContatos?.classList.remove('ativo')
                        botaoVisita?.classList.remove('ativo')
                        setNaoEncontrouProposta(true)
                    } else {
                        dataCorrecao(response.data.data.historicos);
                        setVisita(false)
                        setSemFiltro(false)
                        setContatos(false)
                        setPropostas(true)
                        setNaoEncontrou(false)
                        botaoPropostas?.classList.add('ativo')
                        botaoContatos?.classList.remove('ativo')
                        botaoVisita?.classList.remove('ativo')
                    }
                })
                .catch(error => {
                    console.log("Ocorreu um erro");
                })
        } else {
            setPropostas(false)
            setSemFiltro(true)
            setNaoEncontrou(false)
            setNaoEncontrouProposta(false)
            botaoPropostas?.classList.remove('ativo')
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        if (dataHistorico === '' || descHistorico === '' || tipoHistorico === 0) {
            return (
                setAlertErro(true),
                setMsgErro('Preencha todos os campos')
            )
        } else {
            await api.post('HistoricoCliente/cadastrar', {
                "codCliente": 104,
                "codTipoHistoricoCliente": tipoHistorico,
                "descHistoricoCliente": descHistorico,
                "dtHistorico": dataHistorico,
            }).then(
                response => {
                    limparCampos();
                    getHistoricoCliente();
                    history.push('/dashboard/historico');
                }).catch(error => 
                    console.log("Ocorreu um erro"))
        }
    }

    function dataCorrecao(hist: iHistorico[]) {
        hist.map((dt) => {
            data = dt.dtHistorico;
            dia = data.substring(8, 10)
            mes = data.substring(5, 7)
            ano = data.substring(0, 4)
            dt.dtCorreta = dia + "." + mes + "." + ano
        })
        setHistorico(hist)
        setClienteFiltroVisita(hist)
        setClienteFiltroContatos(hist)
        setClienteFiltroPorpostas(hist)
    }
    // dataAtual
    const novaData = new Date();
    const diaAtual = String(novaData.getDate()).padStart(2, '0');
    const mesAtual = String(novaData.getMonth() + 1).padStart(2, '0');
    const anoAtual = novaData.getFullYear();
    const horaAtual = String(novaData.getHours());
    const minutosAtual = String(novaData.getMinutes());
    const dataAtual = diaAtual + '/' + mesAtual + '/' + anoAtual + " às " + horaAtual + ":" + minutosAtual;

    function accordionActiveClass() {
        const accordion = document.querySelectorAll(".accordion-button")
        const li = document.querySelectorAll(".lista")

        accordion.forEach((button, index) => {
            button.addEventListener('click', () => {
                tabButton(index)
            })
        })
        function tabButton(index: any) {
            li.forEach((teste) => {
                teste.classList.remove('ativo')
            })
            li[index].classList.add('ativo')

        }
    }

    return (
        <div id="historico">
            <section className="corretor">
                <div className="row info-corretor">
                    <div className="col-lg-2 imagem-corretor">
                        <img src={Corretor} />
                    </div>
                    <div className="col-lg-5 info-pessoal">
                        <p style={{ fontSize: 12, color: "#ADADAD", marginBottom: 5 }}>Dados para contato: <FaPencilAlt color="#4BB7F1" /></p>
                        <p style={{ fontSize: 20 }}><strong>{cliente?.nomeCompleto}</strong></p>
                        <div className="card ">
                            <div className="col-lg-12 cel-email">
                                <div className="col-lg-6 col-6"><p>{phoneMask(cliente?.telefone || '')}</p></div>
                                <div className="col-lg-6 col-6"><p>{cliente?.email}</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 mais-contatos-corretor">
                        <p className="last-update">Última atualização em</p>
                        <p>{dataAtual}</p>
                        <div className="card py-2">
                            <div className="info">
                                <div className="contatos">
                                    <div><p className="mt-3">Contatos: </p></div>
                                    <div className="contatos-icones">
                                        <div><WhatsappShareButton
                                            url={shareUrl}
                                            title={`AppePlus - Histórico do cliente ${cliente?.codCliente}`}
                                        >
                                            <FaWhatsappSquare color={`#3BC14A`} size={48} />
                                        </WhatsappShareButton></div>
                                        <div className="icon-box"><FaPhoneAlt size={16} color={'#ADADAD'} /></div>

                                        {cliente?.email ? (
                                            <div className="icon-box"><EmailShareButton
                                                url={shareUrl}
                                                subject={`AppePlus - Histórico do cliente ${cliente?.codCliente}`}
                                                body={`Imóvel compartilhado do AppePlus.`} >
                                                <FaRegEnvelope size={18} color={'#ADADAD'} />
                                            </EmailShareButton></div>
                                        ) : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="historico-imovel" style={{ paddingLeft: 10 }}>
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
                            <div><button type="button" id="botaoVisita" onClick={getHistoricoClienteFiltroVisitas}>Visitas a imóveis</button></div>
                            <div><button type="button" id="botaoContatos" onClick={getHistoricoClienteFiltroContatos}>Contatos realizados</button></div>
                            <div><button type="button" id="botaoPropostas" onClick={getHistoricoClienteFiltroPropostas}>Propostas </button></div>
                        </div>
                        <div className="filtro-mais"><button type='button' className='buttonMais' title='Adicionar histórico' data-bs-toggle="modal" data-bs-target="#exampleModalCenter"> <FaPlus /> </button></div>
                    </div>
                    <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className='modal-title'><h2>Cadastre um histórico</h2></div>
                                    <div className="col-12 modal-text">
                                        <div className='row'>
                                            <div className='col-lg-5 col-12 modal-campo'>
                                                <p>Informe uma data:</p>
                                                <input type="date" className="form-control" value={dataHistorico} onChange={event => { setDataHistorico(event.target.value) }} />
                                            </div>
                                            <div className='col-lg-7 col-12 modal-campo'>
                                                <p>Selecione o tipo de histórico:</p>
                                                <select className="form-select" aria-label="Selecione o tipo de histórico" defaultValue="0"
                                                    onChange={(e) => setTipoHistorico(Number(e.target.value))} value={tipoHistorico}>
                                                    <option value="0" disabled>Selecionar</option>
                                                    {tiposDeHistorico.map((tipo) => {
                                                        return (
                                                            <option value={tipo.codTipoHistoricoCliente}>
                                                                {tipo.descTipoHistoricoCliente}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div className='modal-campo'>
                                                <p>Escreva uma descrição:</p>
                                                <input type="text" className="form-control" value={descHistorico} onChange={event => setDescHistorico(event.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    {alertErro && (
                                        <Alert msg={msgErro} setAlertErro={setAlertErro} />
                                    )}
                                    <div className="modal-button">
                                        {(dataHistorico === '' || descHistorico === '' || tipoHistorico === 0) ? (
                                            <button type="button" className="buttonMais" onClick={handleSubmit} >ADICIONAR HISTÓRICO</button>
                                        ) : (
                                            <button type="button" className="buttonMais" data-bs-dismiss="modal" onClick={handleSubmit}>ADICIONAR HISTÓRICO</button>
                                        )}

                                        <button type="button" className="buttonVoltar" data-bs-dismiss="modal" onClick={limparCampos}>VOLTAR PARA O SITE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 historico-lista">
                        <div className="row">
                            <div className="col-md-12 ">
                                {semFiltro &&
                                    (historico.map((hist, index) => {
                                        return (
                                            <ul className="timeline" key={hist.codHistoricoCliente}>
                                                <div className="accordion" id="accordionExample">
                                                    <div className="accordion-item">
                                                        <div className="accordion-header" id={`heading${index}`}>
                                                            <li className="lista">
                                                                <div className="data">{hist.dtCorreta}</div>
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`} onClick={accordionActiveClass}>
                                                                    {hist.codTipoHistoricoCliente == 1 &&
                                                                        <div><p><FaSearch color="#FD4A19" style={{ marginRight: 10 }} /> Visita realizada</p></div>
                                                                    }
                                                                    {hist.codTipoHistoricoCliente == 2 &&
                                                                        <div><p><FaPhoneAlt color="#FFB30F" style={{ marginRight: 10 }} /> Contato realizado</p></div>
                                                                    }
                                                                    {hist.codTipoHistoricoCliente == 3 &&
                                                                        <div><p><HiOutlineDownload color="#0065DD" style={{ marginRight: 10 }} /> Proposta recebida</p></div>
                                                                    }
                                                                    {hist.codTipoHistoricoCliente == 4 &&
                                                                        <div><p><FaRegTimesCircle color="red" style={{ marginRight: 10 }} /> Proposta reprovada</p></div>
                                                                    }
                                                                </button>
                                                            </li>
                                                        </div>
                                                        <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                                                            <div className="accordion-body conteudo">
                                                                <p>{hist.descHistoricoCliente}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ul>
                                        )
                                    }))}
                                {visita &&
                                    (clienteFiltroVisita.map((hist, index) => {
                                        return (
                                            <ul className="timeline" key={hist.codHistoricoCliente}>
                                                <div className="accordion" id="accordionExample">
                                                    <div className="accordion-item">
                                                        <div className="accordion-header" id={`heading${index}`}>
                                                            <li className="lista">
                                                                <div className="data">{hist.dtCorreta}</div>
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`} onClick={accordionActiveClass}>
                                                                    {hist.codTipoHistoricoCliente == 1 &&
                                                                        <div><p><FaSearch color="#FD4A19" style={{ marginRight: 10 }} /> Visita realizada</p></div>
                                                                    }
                                                                    {hist.codTipoHistoricoCliente == 2 &&
                                                                        <div><p><FaPhoneAlt color="#FFB30F" style={{ marginRight: 10 }} /> Contato realizado</p></div>
                                                                    }
                                                                    {hist.codTipoHistoricoCliente == 3 &&
                                                                        <div><p><HiOutlineDownload color="#0065DD" style={{ marginRight: 10 }} /> Proposta recebida</p></div>
                                                                    }
                                                                    {hist.codTipoHistoricoCliente == 4 &&
                                                                        <div><p><FaRegTimesCircle color="red" style={{ marginRight: 10 }} /> Proposta reprovada</p></div>
                                                                    }
                                                                </button>
                                                            </li>
                                                        </div>
                                                        <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                                                            <div className="accordion-body conteudo">
                                                                <p>{hist.descHistoricoCliente}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ul>
                                        )
                                    }))}
                                {contatos &&
                                    (clienteFiltroContatos.map((hist, index) => {
                                        return (
                                            <ul className="timeline" key={hist.codHistoricoCliente}>
                                                <div className="accordion" id="accordionExample">
                                                    <div className="accordion-item">
                                                        <div className="accordion-header" id={`heading${index}`}>
                                                            <li className="lista">
                                                                <div className="data">{hist.dtCorreta}</div>
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`} onClick={accordionActiveClass}>
                                                                    {hist.codTipoHistoricoCliente == 1 &&
                                                                        <div><p><FaSearch color="#FD4A19" style={{ marginRight: 10 }} /> Visita realizada</p></div>
                                                                    }
                                                                    {hist.codTipoHistoricoCliente == 2 &&
                                                                        <div><p><FaPhoneAlt color="#FFB30F" style={{ marginRight: 10 }} /> Contato realizado</p></div>
                                                                    }
                                                                    {hist.codTipoHistoricoCliente == 3 &&
                                                                        <div><p><HiOutlineDownload color="#0065DD" style={{ marginRight: 10 }} /> Proposta recebida</p></div>
                                                                    }
                                                                    {hist.codTipoHistoricoCliente == 4 &&
                                                                        <div><p><FaRegTimesCircle color="red" style={{ marginRight: 10 }} /> Proposta reprovada</p></div>
                                                                    }
                                                                </button>
                                                            </li>
                                                        </div>
                                                        <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                                                            <div className="accordion-body conteudo">
                                                                <p>{hist.descHistoricoCliente}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ul>
                                        )
                                    }))}
                                {propostas &&
                                    (clienteFiltroPropostas.map((hist, index) => {
                                        return (
                                            <ul className="timeline" key={hist.codHistoricoCliente}>
                                                <div className="accordion" id="accordionExample">
                                                    <div className="accordion-item">
                                                        <div className="accordion-header" id={`heading${index}`}>
                                                            <li className="lista">
                                                                <div className="data">{hist.dtCorreta}</div>
                                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`} onClick={accordionActiveClass}>
                                                                    {hist.codTipoHistoricoCliente == 1 &&
                                                                        <div><p><FaSearch color="#FD4A19" style={{ marginRight: 10 }} /> Visita realizada</p></div>
                                                                    }
                                                                    {hist.codTipoHistoricoCliente == 2 &&
                                                                        <div><p><FaPhoneAlt color="#FFB30F" style={{ marginRight: 10 }} /> Contato realizado</p></div>
                                                                    }
                                                                    {hist.codTipoHistoricoCliente == 3 &&
                                                                        <div><p><HiOutlineDownload color="#0065DD" style={{ marginRight: 10 }} /> Proposta recebida</p></div>
                                                                    }
                                                                    {hist.codTipoHistoricoCliente == 4 &&
                                                                        <div><p><FaRegTimesCircle color="red" style={{ marginRight: 10 }} /> Proposta reprovada</p></div>
                                                                    }
                                                                </button>
                                                            </li>
                                                        </div>
                                                        <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                                                            <div className="accordion-body conteudo">
                                                                <p>{hist.descHistoricoCliente}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ul>
                                        )
                                    }))}
                                {naoEncontrou &&
                                    <div>
                                        <p>Não existe histórico deste tipo.</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="d-block">
                        <div className="paginas">
                            <div className="status-page">
                                <p>Mostrando transações <span>de 1 a 24</span></p>
                            </div>
                            <div>
                                {historico.length >= 5 ? (
                                    <Paginacao total={100} limit={5} paginaAtual={pagina} setPagina={setPagina} />
                                ) : ('')}
                            </div>
                        </div>
                        <div className="mx-4 line-gray"></div>
                        <div className="px-4 my-4">
                            <p className="status-information">Monstrando transações já creditadas. Última atualização em {dataAtual}</p>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    )
}