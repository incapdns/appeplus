import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../styles/quemSomos.scss';
import { FaPlus } from 'react-icons/fa';
import Corretor from '../assets/internas/QuemSomos/corretor.png'
import Vendedor from '../assets/internas/QuemSomos/vendedor.png'
import Comprador from '../assets/internas/QuemSomos/comprador.png'
import Video from '../assets/internas/QuemSomos/video.png'
import IconeCasa from '../assets/internas/QuemSomos/icone-casa.svg'
import CabosPC from '../assets/internas/QuemSomos/fiosPC.svg'
import LapisPC from '../assets/internas/QuemSomos/lapisPC.svg'
import Premio from '../assets/internas/QuemSomos/premio.svg'
import Estrelas from '../assets/internas/QuemSomos/estrelas.svg'
import Perfil from '../assets/internas/QuemSomos/perfil.png'
import Rectangle from '../assets/internas/QuemSomos/Rectangle.png'
import CasaCelular from '../assets/internas/QuemSomos/Lauda-3.png'
import CasaMulher from '../assets/internas/QuemSomos/Lauda-2.png'
import Logo from '../assets/internas/QuemSomos/logo.png'
import Grafico from '../assets/internas/QuemSomos/grafico.svg'
import FilaSoma from '../assets/internas/QuemSomos/Sinais+.png'
import FilaSomaMenor from '../assets/internas/QuemSomos/Sinais+Menor.png'
import AspasSuperior from '../assets/internas/QuemSomos/aspas1.png'
import AspasInferior from '../assets/internas/QuemSomos/aspas2.png'
import { BsCheck2Circle, BsFillExclamationCircleFill, BsXCircle } from 'react-icons/bs'
import { FormEvent, useEffect, useState } from 'react';
import api from '../services/api'; 
import { Link, useHistory } from 'react-router-dom';
import BannerMobileQuemSomos from '../assets/internas/QuemSomos/cadastro-corretor-mobile-2.png'


export default function QuemSomos() {
    const history = useHistory();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [alertErro, setAlertErro] = useState(false);
    const [msgErro, setMsgErro] = useState('');
    const [preencheu, setPreencheu] = useState(false);

    useEffect(()=>{
        verificaCampos()
    }, [nome, email])

    function verificaCampos(){
        if (nome === '' || email === ''){
            return(
                setPreencheu(false)
            )
        }else{
            return(
                setPreencheu(true)
            )
        }
    }
    // async function handleSubmit(event: FormEvent) {
    //     event.preventDefault()
    //     if (nome === '' || email === '') {
    //         return (
    //             setAlertErro(true),
    //             setMsgErro('Preencha todos os campos')
    //         )
    //     } else {
    //         await api.post('https://api.rd.services/platform/conversions?api_key=spwDNwUtZVNVdDOVCXufHyyQBkkCEhjemEbX', {
    //             "event_type": "CONVERSION",
    //             "event_family": "CDP",
    //             "payload":
    //             {
    //                 "conversion_identifier": "Formulário Quem Somos",
    //                 "name": nome,
    //                 "email": email,
    //             }
    //         }).catch(error => 
    //             console.log("Ocorreu um erro"))
    //     }
    // }
    function limparCampos(){
        setNome("")
        setEmail("")
    }
    return (
        <>
        <script type="text/javascript" async src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/cd0486dc-ccbd-4613-bde9-aafef416fe10-loader.js" ></script>
            <Navbar />
            <div id="quemSomos" className="mb-5">
                <div className="col-lg-12 wrapper">
                    <div className="banner" >
                        <div className="content-area">
                            <div className="col-lg-12 box-content">
                                <div className="box-title">
                                    <div className="logo-banner"><img src={Logo} /></div>
                                    {/* <h1>De corretor para corretor.</h1> */}
                                    <h1>Somos o Appê Plus</h1>
                                    <h3>Imobiliária digital inovadora e surpreendente.</h3>
                                    <a href="#cadastro"><button className="orange-button-banner" >Cadastre-se agora</button></a>
                                </div>
                            </div>
                            <div className="banner-mobile">
                                <img src={BannerMobileQuemSomos} alt="Banner quem somos" />
                            </div>
                        </div>
                    </div>
                </div>
                <section className="appe-plus">
                    <div className="container">
                        <div>
                            <h1 style={{ marginBottom: 80 }}>A Appê Plus é para vocês. Corretores, proprietários e compradores. Podem entrar!</h1>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 vantagens-plus">
                                <p className="blue-text"><FaPlus color={`#FD4A19`} size={58} /> Eficiência </p>
                                <p className="blue-text"><FaPlus color={`#FD4A19`} size={58} /> Gestão </p>
                                <p className="blue-text"><FaPlus color={`#FD4A19`} size={58} /> Comissão </p>
                            </div>
                            <div className="col-lg-6 info-text-first">
                                <p>O Appê Plus chega trazendo consigo a união da experiência no mercado imobiliário com tecnologia, inteligência de dados, transparência, agilidade e, principalmente, a valorização da peça fundamental nas intermediações, o corretor de imóveis.</p>
                                <p>Desde o primeiro clique no Appê Plus até a concretização de um acordo, os usuários têm à disposição um time de especialistas atuando constantemente para entregar uma plataforma de alto desempenho, disponível, fácil de usar e que vai ajudar na realização da melhor negociação.</p>
                            </div>
                        </div>
                        <div className="row mais-sobre-appe">
                            <div className="info-text">
                                <img src={FilaSoma} className="imagem-fundo" />
                            </div>
                            <div className="col-lg-6 info-text-second">
                                <div className="mais-sobre-card">
                                    <p style={{ marginBottom: 10 }} ><FaPlus color={`#FD4A19`} size={14} /><strong style={{ marginLeft: 5 }}> Tempo </strong></p>
                                    <p style={{ marginBottom: 0 }}>Utilizando algoritmos para gerar o match ideal entre corretores, proprietários de imóveis e compradores,
                                        o Appê Plus chega para valorizar o que você tem de mais precioso hoje: o tempo. A nossa proposta é encurtar
                                        todos os caminhos e facilitar as decisões, deixando todos dentro da negociação seguros de que fizeram a melhor
                                        escolha.</p>
                                </div>

                                <div className="mais-sobre-card">
                                    <p style={{ marginBottom: 10 }} ><FaPlus color={`#FD4A19`} size={14} /><strong style={{ marginLeft: 5 }}> Informação </strong></p>
                                    <p style={{ marginBottom: 0 }}>A experiencia de cada usuário na sua jornada imobiliária, será considerada, gerando informações ricas e que tornarão melhor,
                                        a cada dia, a qualidade das soluções do Appê Plus.</p>
                                </div>

                                <div className="mais-sobre-card" >
                                    <p style={{ marginBottom: 10 }} ><FaPlus color={`#FD4A19`} size={14} /><strong style={{ marginLeft: 5 }}> Valorização </strong></p>
                                    <p style={{ marginBottom: 0 }} className="ajustar">Você corretor, terá seus diferenciais profissionais conhecidos por todos. Seu desempenho, qualidade de atendimento,
                                        conhecimento do mercado, assertividade na condução das negociações, entre outras qualidades serão valorizados. O Appê Plus
                                        vem para ser o melhor cartão de vistas para os melhores corretores.</p>
                                </div>
                            </div>
                            <div className="info-text">
                                <img src={CasaMulher} className="info-imagem" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pontos-positivos">
                    <div className="container">
                        <div>
                            <h1 style={{ marginBottom: 80, paddingTop: 50 }}>A Appê Plus é uma plataforma completa. <br/> Aqui você encontra tudo em um só lugar!</h1>
                        </div>
                        <div className="row">
                            <div className="col-lg-6  pontos-container" style={{ paddingRight: 30 }}>
                                <div className=" mb-5 pontos-card" >
                                    <div className="pontos-icones">
                                        <img src={IconeCasa} className="pontos-casa" />
                                        <img src={CabosPC} className="pontos-icon" />
                                    </div>
                                    <div className="col-lg-12 ">
                                        <p className="pontos-title">Inteligência de dados</p>
                                        <p className="pontos-text">A análise aprofundada e automatizada dos principais dados captados pela plataforma, permite mais facilidade na definição das melhores estratégias de compra e venda. É a tecnologia trabalhando a favor de todos. </p>
                                    </div>
                                </div>
                                <div className="mb-5 pontos-card" >
                                    <div className="pontos-icones">
                                        <img src={IconeCasa} className="pontos-casa2" />
                                        <img src={Premio} className="pontos-icon2" />
                                    </div>
                                    <div className="col-lg-12">
                                        <p className="pontos-title">Eficiência</p>
                                        <p className="pontos-text">Para transformar positivamente a experiencia humana e digital na jornada de compra e venda de imóveis. Sempre com a intermediação
                                            dos nossos corretores parceiros, a plataforma vai permitir a todos, encontrarem o mach ideal em nas negociações imobiliárias.</p>
                                    </div>
                                </div>

                            </div>

                            <div className="col-lg-6  pontos-container" style={{ paddingRight: 30 }}>
                                <div className="mb-5 pontos-card" >
                                    <div className="pontos-icones">
                                        <img src={IconeCasa} className="pontos-casa1" />
                                        <img src={Estrelas} className="pontos-icon1" />
                                    </div>
                                    <div className="col-lg-12">
                                        <p className="pontos-title">Facilidade</p>
                                        <p className="pontos-text">Para anunciar o seu imóvel, encontrar o corretor ideal e os clientes que são a cara do seu imóvel. Um ciclo completo: o seu imóvel
                                            encontra o melhor comprador, o comprador encontra o melhor imóvel e os dois têm a consultoria dos corretores mais bem preparados.</p>
                                    </div>
                                </div>
                                <div className="mb-5 pontos-card" >
                                    <div className="pontos-icones">
                                        <img src={IconeCasa} className="pontos-casa" />
                                        <img src={LapisPC} className="pontos-icon" />
                                    </div>
                                    <div className="col-lg-12">
                                        <p className="pontos-title">Personalização</p>
                                        <p className="pontos-text" style={{ paddingBottom: 18 }}>Proprietários e interessados em comprar imóveis, atendidos pelos corretores mais bem preparados,
                                            mais bem avaliados e especialistas em cada tipo de imóvel e região. Cada atendimento uma nova experiência em excelência.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12  pontos-container" style={{ paddingRight: 30 }}>
                                <div className="mb-5 pontos-card" >
                                    <div className="pontos-icones">
                                        <img src={IconeCasa} className="pontos-casa" />
                                        <img src={Grafico} className="pontos-icon" />
                                    </div>
                                    <div className="col-lg-12">
                                        <p className="pontos-title" >Custo benefício</p>
                                        <p className="pontos-text">Corretores parceiros, vão aumentar muito seus ganhos, com o melhor comissionamento do mercado.
                                            Para proprietários, haverá finalmente aquela sensação de pagar a comissão pela venda, tendo recebido um serviço de qualidade.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="passo-a-passo">
                    <div className="container">
                        <div>
                            <h1>Appê Plus, simples e prático para você corretor!</h1>
                            <p style={{ fontSize: 18 }}>Veja os 5 passos para uma transformação completa no seu processo de vendas.</p>
                        </div>
                        <div className="col-lg-12 topicos">
                            <div className="col-lg-2 unidade-topico">
                                <h1> 1.</h1>
                                <p>Acesse agora a página do corretor e seja um dos primeiros a se cadastrar.</p>
                                <img src={IconeCasa} className="topicos-icone" />
                            </div>
                            <div className="col-lg-2 unidade-topico">
                                <h1>2.</h1>
                                <p>Faça seu cadastro completo. Lembre-se: você precisa do CRECI e de um token compartilhado com você por um corretor já ativo. </p>
                                <img src={IconeCasa} className="topicos-icone" />
                            </div>
                            <div className="col-lg-2 unidade-topico">
                                <h1>3.</h1>
                                <p>A Equipe Appê Plus avalia e aprova seus dados.</p>
                                <img src={IconeCasa} className="topicos-icone" />
                            </div >
                            <div className="col-lg-2 unidade-topico">
                                <h1>4.</h1>
                                <p>Nós fazemos a transformação acontecer com ótimos anúncios e divulgações. </p>
                                <img src={IconeCasa} className="topicos-icone" />
                            </div>
                            <div className="col-lg-2 unidade-topico">
                                <h1>5.</h1>
                                <p>Pronto! O Appê Plus promove o match ideal entre você, seus clientes, imóveis e potenciais compradores.
</p>
                                <img src={IconeCasa} className="topicos-icone" />
                            </div>
                        </div>
                        <div className="info-text">
                            <img src={FilaSomaMenor} className="passos-imagem" />
                        </div>
                        <div className="row">
                        <div className='col-lg-12 d-flex align-items-center justify-content-center'>
                            <div className="orange-button">
                          
                                <Link to='/cadastro/corretor'>DÊ O PRIMEIRO PASSO AGORA</Link>
                            </div>
                            
                        </div>
                        </div>
                        
                    </div>
                </section>
                <section className="beneficios-corretor">
                    <div className="container">
                        <div>
                            <h1>Benefícios exclusivos para facilitar a rotina do corretor? O Appê Plus tem! Confira a abaixo e faça seu cadastro!</h1>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 ">
                                <img src={CasaCelular} className="beneficios-imagem" />
                            </div>
                            <div className="col-lg-6">
                                <p><strong style={{ textDecoration: 'underline', color: '#000000' }}>CRM completo:</strong>  Pronto! O Appê Plus promove o mach ideal entre você, seus clientes, imóveis e potenciais compradores.</p>
                                <p><strong style={{ textDecoration: 'underline', color: '#000000' }}>Dashboard em detalhes:</strong>  para acompanhar seus resultados, suas comissões, suas projeções de vendas, seus pagamentos e muito mais.</p>
                                <p><strong style={{ textDecoration: 'underline', color: '#000000' }}>Sistema de gamificação:</strong>  para valorizar todos os corretores parceiros, com maior engajamento e destaque.</p>
                                <p><strong style={{ textDecoration: 'underline', color: '#000000' }}>Inteligência de dados:</strong>  para combinar perfis e interesses de usuários e imóveis cadastrados e assim acelerar o mach ideal entre proprietários e compradores.</p>
                                <p><strong style={{ textDecoration: 'underline', color: '#000000' }}>Tudo isto e muito mais:</strong> e você não paga nada para utilizar. É 100% gratuito. Sem taxa de adesão, sem mensalidade, sem pegadinha!</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="metas-video">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 metas">
                                <p className="blue-meta"><FaPlus color={`#FD4A19`} size={58} /> Inovação </p>
                                <p className="blue-meta"><FaPlus color={`#FD4A19`} size={58} /> Inteligência </p>
                                <p className="blue-meta" style={{ marginBottom: 20 }}><FaPlus color={`#FD4A19`} size={58} /> Resultado </p>
                                <p className="texto-meta">Ainda que em um processo de venda ou compra de imóveis, corretores e clientes iniciem com papéis diferentes,
                                    ambos buscam o mesmo objetivo: fechar a melhor negociação de todas. Acreditamos que se soubermos combinar esses
                                    desejos e preferências, alcançaremos, de fato, a satisfação coletiva.</p>
                                <div className="orange-button-metas">
                                    <Link to="/cadastro/corretor"> COMECE AGORA SUA JORNADA NO APPÊ PLUS</Link>
                                </div>
                            </div>
                            <div className="col-lg-7 d-flex align-items-center justify-content-center">
                            <iframe width="560" className='video-you' height="315" src="https://www.youtube.com/embed/0-vArrhtAbE?controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                               
                            </div>
                        </div>
                    </div>
                </section>
                <section className="corretor-cliente">
                    <div className="container">
                        <div>
                            <h1>Somos uma imobiliária digital de verdade e única. Uma plataforma tecnológica inovadora e para todos.</h1>
                        </div>
                        <div className="row fila-cards" >
                            <div className="col-lg-4 card sou-corretor" >
                                <header className="title-card" ><strong>Para corretores </strong></header>
                                <img src={Corretor} className="img" alt="corretor" />
                                <p className="text-card">Encontre clientes ideais, seja valorizado, e transforme suas metas em resultados.
                                    Aqui na Appê Plus você estará presente em 100% das negociações.</p>
                            </div>
                            <div className="col-lg-4 card sou-comprador" >
                                <header className="title-card"><strong>Para quem quer comprar </strong></header>
                                <img src={Comprador} alt="comprador" style={{ width: '100%', margin: 0 }} />
                                <p className="text-card">Encontre o imóvel certo para você. Faça isso com comodidade, segurança, e o suporte do corretor ideal.</p>
                            </div>
                            <div className="col-lg-4 card sou-vendedor" >
                                <header className="title-card"><strong>Para quem quer vender </strong></header>
                                <img src={Vendedor} alt="vendedor" />
                                <p className="text-card">Com apoio total dos corretores parceiros, concretize com sucesso e rapidez a venda do seu imóvel, assegurando
                                    a melhor negociação sem precisar sair de casa.</p><br />
                            </div>
                        </div>
                        <div className="logo-img"><img src={Logo} /></div>
                    </div>
                </section>
                <section className="opinioes-appe">
                    <div className="container">
                        <div>
                            <h1 >Palavras sobre o Appe Plus</h1>
                        </div>
                        <div className="dois-cards">
                            <img src={AspasSuperior} className="aspas-top1" />
                            <img src={Rectangle} className="retangulo" />
                            <div className="col-lg-12 card opiniao">
                                <img src={Perfil} className="photo-card" />
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a sollicitudin sapien. Fusce pulvinar mattis
                                    sem ac mattis. Mauris a purus vitae mi convallis mattis id mattis arcu. Morbi vitae magna ac elit pulvinar
                                    vulputate.</p>
                                <p><strong>Ana Maria, Corretora</strong></p>
                            </div>
                            <img src={AspasInferior} className="aspas-bot1" />
                            <img src={AspasSuperior} className="aspas-top2" />
                            <img src={Rectangle} className="retangulo2" />
                            <div className="col-lg-12 card opiniao">
                                <img src={Perfil} className="photo-card" />
                                <p>Nullam mollis dictum tellus a sagittis. Sed scelerisque erat magna, quis rhoncus nunc mattis bibendum.
                                    Donec semper in sem eget ultrices. Pellentesque ut turpis a tellus fermentum rhoncus. Sed pharetra blandit turpis,
                                    ac luctus purus lobortis eget.  </p>
                                <p><strong>Ana Maria, Corretora</strong></p>
                            </div>
                            <img src={AspasInferior} className="aspas-bot2" />
                        </div>
                    </div>
                </section>
                <section className="cadastro-form" id="cadastro">
                    <div className="container">
                        <div className="title-form">
                            <h1 >De corretor para corretor! Aqui começa sua incrível <br /> jornada no Appê Plus </h1>
                            <p>Venha ser parceiro da imobiliária digital diferente de tudo que você já viu! </p>
                        </div>
                        <div className="col-lg-12 d-flex align-items-center justify-content-center">

                            
                            <div className="button-form">
                                <button type="button" className="orange-button m-0 w-100"  onClick={() => history.push('/cadastro/corretor')}>COMEÇAR AGORA MINHA JORNADA DE SUCESSO</button>
                            </div>

                        </div>
                    </div>
                    <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="modal-icon"><BsCheck2Circle size={80} color="#0065DD" /></div>
                                    <div className="modal-text">
                                        <h2>Enviado com sucesso</h2>
                                        <p>Já recebemos os seus dados e em breve você irá receber um e-mail com nossas atividades</p>
                                    </div>
                                    <div className="modal-button">
                                        <button type="button" className="orange-button" data-bs-dismiss="modal" onClick={limparCampos}>VOLTAR PARA O SITE</button>
                                        <p><BsFillExclamationCircleFill size={16} color="#7A7A7A" style={{ marginRight: 10 }} /> Não se preocupe, nós não enviaremos spans</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="modalErro" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="modal-icon"><BsXCircle size={80} color="#FD4A19" /></div>
                                    <div style={{color: '#000000'}}>
                                        <h2>Preencha todos os campos!</h2>
                                    </div>
                                    <div className="modal-button">
                                        <button type="button" className="orange-button" data-bs-dismiss="modal" >VOLTAR PARA O SITE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}