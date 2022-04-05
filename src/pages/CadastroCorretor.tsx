import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import ModalProfileCadastro from '../components/Form/cadastro/ModalProfileCadastro';
import Navbar from '../components/Navbar';
import '../styles/cadastroCorretor.scss';
import { BsCheck2Circle } from 'react-icons/bs';
import { IoCloseCircleOutline } from 'react-icons/io5';
import {MdOutlineUpdate, MdOutlineBadge} from 'react-icons/md'
import LogoAppe from '../assets/internas/logo-appe.svg'
import OnlineImg from   '../assets/internas/online-gratuito.png'
import CorretorParceiro from '../assets/internas/corretor-parceiro1.png'
import {HiOutlineArrowSmRight} from 'react-icons/hi'
import {BsPlusLg,BsArrowDownCircleFill} from 'react-icons/bs'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import {AiOutlinePlusCircle} from "react-icons/ai"
import {FiUsers} from 'react-icons/fi'
import CienciaDados from '../assets/internas/infos/ciencia-dados.svg'
import EspacoCorretor from '../assets/internas/infos/espaco-corretor.svg'
import ProgramaPlus from '../assets/internas/infos/programa-plus.svg'
import ReconhecimentoCorretor from '../assets/internas/infos/reconhecimento-corretor.svg'
import ComissaoAtrativa from '../assets/internas/infos/comissao-atrativa.svg'
import CadaCliente from '../assets/internas/infos/cada-cliente.svg'
import SuporteExclusivo from '../assets/internas/infos/suporte-exclusivo.svg'
import AnaliseDocumentos from '../assets/internas/infos/analise-documentos.svg'
import AssessoriaEspecialista from '../assets/internas/infos/assessoria-especialista.svg'
import AperfeicoamentoConstante from '../assets/internas/infos/aperfeicoamento-constante.svg'
import BannerMobile from '../assets/internas/cadastro-corretor-mobile.png'
import SliderCard from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EmailImg from '../assets/internas/infos/email.svg'
import { iDadosUsuario } from '../@types';

const usuario: iDadosUsuario = JSON.parse(
  localStorage.getItem("@appePlus/usuario") || "{}"
);


const CadastroCorretor = () => {
  const [scrollBox, setScrollBox] = useState(true)
  const [noBorder, setNoBorder] = useState(false)
  let shadow = true;

  function scrollBoxInit2() {
    const anuncios = document.querySelector('.diferenciais-anuncios')
    const final = anuncios?.getBoundingClientRect().bottom;
    const numero = Number(final)
    const windowMetade = window.innerHeight * 0.7;
    const isSection = (numero - windowMetade) < 0;

    const banner = document.querySelector('.banner-corretor')
    const finalBanner = banner?.getBoundingClientRect().bottom;
    const num = Number(finalBanner)
    const windowMetade2 = window.innerHeight * 0.8;
    const isSection2 = (num - windowMetade2) < 0;

    if(isSection){
      setScrollBox(false)
    }

    if(isSection2){
      setNoBorder(false);
      shadow = false;
    }
    if (window.scrollY > 350) {
      setScrollBox(true);
      setNoBorder(true);
    }
  }
  
  useEffect(() => {
    window.addEventListener('scroll', scrollBoxInit2)
  }, [])
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    className: "slides",
    arrows: true,
    nextArrow: <SampleNextArrowIconsCard />,
    prevArrow: <SamplePrevArrowIconsCard />,
    
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          infinite: true,
          dots: false,
          autoplay: true,
          speed: 500,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          infinite: true,
          dots: false,
          autoplay: true,
          speed: 500,
        }
      }
    ]
  };
  function SampleNextArrowIconsCard(props: any) {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick} >
        <IoIosArrowForward style={{ ...style, display: "block", background: "transparent", color: '#0065DD', fontSize: '36px' }} />
      </div>
    );
  }
  function SamplePrevArrowIconsCard(props: any) {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick} >
        <IoIosArrowBack style={{ ...style, display: "block", background: "transparent", color: '#0065DD', fontSize: '36px' }} />
      </div>
    );
  }
  useEffect(()=>{
    window.scrollTo(0, 0)
  },[])
  return (
    <>
      <Navbar />
      <div className="wrapper-corretor mb-5" id="cadastroCorretor">
        <div className="banner-corretor" >
          <div className="content-area" id="formulario-cadastro">
            <div className="box-content">
              <div className="box-title-content">
              <br/>
                <p className="subTitle">Seja um parceiro Appê Plus </p>
                <h2>Chegamos BH! Sejam Bem-vindos. Torne-se agora um corretor Master! </h2>
                <p>Os 200 primeiros corretores que se cadastrarem, terão vantagens exclusivas. Não perca tempo!</p>
                <div className="btn-cadastrar">
                  <a href="https://www.instagram.com/p/CZPZgh8rEJC/?utm_medium=copy_link" target="_blank" rel="noopener noreferrer">Vantagens para corretores Appê Plus</a> 
                </div> 
              </div>
            </div>
            <div className="banner-mobile">
              <img src={BannerMobile} alt="" />
            </div>
            <div className="box-form-absolute"  >
              {usuario.token ? ('') : (<>{noBorder ? (<ModalProfileCadastro noBorder={false}/>) : (<ModalProfileCadastro noBorder={true}/>)}</>)}
              
              
            </div>
          </div>
        </div>
        <div className="teste">
          <section className="image-section">
            <div className="col-lg-6">
              <div className="image"></div>
            </div>

          </section>
          <section className="carreira-corretor">
            <div className="container">
              <div className="row">
                <div className="col-lg-9 mb-4">
                  <div className="position">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">O seu sucesso te aguarda no Appê Plus </h5>
                        <h2 className="card-subtitle mb-2 ">Torne-se um corretor parceiro e explore todas as oportunidades do mercado imobiliário </h2>
                        <p className="card-text">Desenvolvemos o Appê Plus com um grande propósito em mente: facilitar e acelerar as negociações conduzidas pelos corretores, permitindo a prestação de um serviço de intermediação imobiliária, de alta qualidade, eficiente para os clientes, e como resultado, mais negócios fechados, mais comissões.</p>
                        <p className="card-text">A nossa plataforma oferece um modelo inovador de negócios, que combina dados e estatísticas para gerar informações relevantes para os corretores parceiros, sobre o mercado, sobre o perfil ideal de cliente, que poderão assim criar uma rede única de clientes e proprietários, que terão a liberdade de escolher e trabalhar com os corretores que mais se encaixam ao seu perfil e as suas necessidades.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="destaques-vantagens " >
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="my-4">
                  <div className="card">
                    <div className="card-body">
                        <div className="row">
                          <div className="col-lg-5 col-sm-6">
                            <div className="card-online mt-1">
                              <div className="content-img">
                                <img src={OnlineImg} alt="imagem gratuito para todos" />
                              </div>
                              <div className="content-online">
                                <ul>
                                  <li>100% Online</li>
                                  <li><BsPlusLg fontSize={16} color={'#C93B14'}/></li>
                                  <li>100% Gratuito</li>
                                  <li><BsPlusLg  fontSize={16} color={'#C93B14'} /></li>
                                  <li>Para todos</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-7 col-sm-6">
                            <div className="card-voce mt-1">
                              <h2>Para você:</h2>
                              <ul>
                                <li>Simples</li>
                                <li>Eficiente</li>
                                <li>Lucrativo</li>
                              </ul>
                              <h2>Para seu cliente</h2>
                              <ul>
                                <li>Fácil</li>
                                <li>Transparente</li>
                                <li>Objetivo</li>
                              </ul>
                              <div className='button'>
                                <a href="#formulario-cadastro">Pode Entrar! <HiOutlineArrowSmRight fontSize={24}/></a> 
                              </div>
                            </div>
                          </div>
                        </div>
                       
                        
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="corretor-corretor mt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <h1>De corretor para corretor. </h1>
                <div className="line d-flex justify-content-between align-items-center flex-wrap">
                <p>Por que o Appê Plus é para você? Veja o que você só encontra aqui!</p>
                <div>
                  <a href="#formulario-cadastro">Ser parceiro Appê+ </a> 
                  
                </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
            <SliderCard {...settings}>
              <div className="card-corretor-para-corretor">
                <div className="card-body">
                  <div className="card-action">
                    <img src={CienciaDados} alt="imagem de icone ciência de dados" />
                  </div>
                  <h6 className="card-corretor-title">Ciência de dados e estatísticas:</h6>
                  <p className="card-text">Você corretor terá acesso a informações completas sobre os imóveis, mercado, interesses de clientes, que trarão recomendações para te auxiliar a encontrar o mach ideal entre imóveis e compradores.</p>
                </div>
              </div>
              <div className="card-corretor-para-corretor" >
                <div className="card-body">
                  <div className="card-action">
                    <img src={EspacoCorretor} alt="imagem de icone espaço corretor" />
                  </div>
                  <h6 className="card-corretor-title">Espaço do corretor:</h6>
                  <p className="card-text">CRM completo, funil de vendas, dashboard gerencial, gestão de agenda, relatório de comissões e pagamentos, acompanhamento da sua progressão e avaliações recebidas e muito mais.</p>
                </div>
              </div>
              <div className="card-corretor-para-corretor" >
                <div className="card-body">
                  <div className="card-action">
                    <img src={ProgramaPlus} alt="imagem de icone programa plus" />
                  </div>
                  <h6 className="card-corretor-title">Programa Indica Plus: </h6>
                  <p className="card-text">Exclusividade do mercado imobiliário. Você indica corretores para atuarem na plataforma e ganha comissões extras a cada negociação que os seus indicados realizarem pela plataforma. De corretor para corretor, todos ganham</p>
                </div>
              </div>
              <div className="card-corretor-para-corretor" >
                <div className="card-body">
                  <div className="card-action">
                    <img src={ReconhecimentoCorretor} alt="imagem de icone reconhecimento corretor" />
                  </div>
                  <h6 className="card-corretor-title">Reconhecimento do corretor:</h6>
                  <p className="card-text">Temos um exclusivo e inovador mecanismo, que dará aos corretores mais qualificados e preparados o reconhecimento que tanto merecem. Um sistema de avaliação bem completo que valorizará os corretores mais bem avaliados pelos clientes e que melhor performarem na plataforma. Tudo on line e transparente. </p>
                </div>
              </div>
              <div className="card-corretor-para-corretor" >
                <div className="card-body">
                  <div className="card-action">
                    <img src={ComissaoAtrativa} alt="imagem de icone comissao atrativa" />
                  </div>
                  <h6 className="card-corretor-title">Comissão atrativa:</h6>
                  <p className="card-text">Os corretores parceiros do Appê Plus, poderão receber uma comissão de até 80% da comissão paga pelos proprietários. </p>
                </div>
              </div>
              <div className="card-corretor-para-corretor" >
                <div className="card-body">
                  <div className="card-action">
                    <img src={CadaCliente} alt="imagem icone cada cliente" />
                  </div>
                  <h6 className="card-corretor-title">Cada cliente tem seu corretor</h6>
                  <p className="card-text">Valorizando o corretor de imóveis e o seu papel fundamental em qualquer negociação imobiliária, todos os clientes do Appê Plus, sejam compradores ou proprietários deverão escolher um corretor para lhe assessorar na busca e concretização de uma negociação, um atendimento completa nas duas direções.</p>
                </div>
              </div>
              <div className="card-corretor-para-corretor" >
                <div className="card-body">
                  <div className="card-action">
                    <img src={SuporteExclusivo} alt="imagem de suporte exclusivo" />
                  </div>
                  <h6 className="card-corretor-title">Suporte exclusivo:</h6>
                  <p className="card-text">Apoio jurídico e operacional da equipe Appê Plus para tornar ágil toda parte burocrática de formalização dos negócios</p>
                </div>
              </div>
              <div className="card-corretor-para-corretor" >
                <div className="card-body">
                  <div className="card-action">
                    <img src={AnaliseDocumentos} alt="imagem de icone análise de documentos " />
                  </div>
                  <h6 className="card-corretor-title">Análise de documentos:</h6>
                  <p className="card-text">Análise e validação de toda documentação de clientes e imóveis, feita por equipe especializada, certificando assim veracidade de anúncios e interessados, dando maior transparências e segurança nas negociações.</p>
                </div>
              </div>
              <div className="card-corretor-para-corretor" >
                <div className="card-body">
                  <div className="card-action">
                    <img src={AssessoriaEspecialista} alt="imagem de icone assessoria especialista" />
                  </div>
                  <h6 className="card-corretor-title">Assessoria de especialistas: </h6>
                  <p className="card-text">Para garantir a veracidade das documentações e te apoiarem nas transações comerciais;</p>
                </div>
              </div>
              <div className="card-corretor-para-corretor" >
                <div className="card-body">
                  <div className="card-action">
                    <img src={AperfeicoamentoConstante} alt="imagem de icone aperfeiçoamento constante" />
                  </div>
                  <h6 className="card-corretor-title">Aperfeiçoamento constante:</h6>
                  <p className="card-text">Em breve a plataforma vai oferecer cursos e treinamentos gratuitos visando uma maior capacitação e preparo cos corretores parceiros.</p>
                </div>
              </div>
             

            </SliderCard>
            </div>
            
          </div>
        </section>
        <section className="corretor-parceiro mt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <h2>O que é preciso para me tornar um Corretor Parceiro Appê Plus?</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 col-sm-6 col-12">
                <div className="list-corretor">
                  <p><BsCheck2Circle fontSize={24} color={`#0065DD`} /> Ter mais de 18 anos</p>
                </div>
                <div className="list-corretor">
                  <p><BsCheck2Circle fontSize={24} color={`#0065DD`} /> Ser um corretor profissional com CRECI ativo e válidos para as cidades de atuação do Appê Plus</p>
                </div>
                <div className="list-corretor">
                  <p><BsCheck2Circle fontSize={24} color={`#0065DD`} /> Ter sido convidado pelo Appê Plus ou indicado por outros corretores já cadastrados</p>
                </div>
                <div className="list-corretor">
                  <p><BsCheck2Circle fontSize={24} color={`#0065DD`} /> Estar de acordo com Termo de uso da Plataforma e com a Politica de corretores</p>
                </div>
                <div className="list-corretor">
                  <p><BsCheck2Circle fontSize={24} color={`#0065DD`} /> Ter muita vontade de aprender e de fazer muitos negócios</p>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                  <img src={CorretorParceiro} alt="Corretor parceiro" style={{width:'100%'}} />
              </div>
            </div>
          </div>
        </section>
        <section className="negocios-appe mt-3 ">
          <div className="container">
            <div className="row">
              <div className="col-lg-10">
                <h2>Conheça o passo a passo para começar a fazer negócios pelo Appê Plus</h2>
              </div>
              <div className="col-lg-12 mt-5">
                <ul className="progressbar">
                  <li>
                    <div className="bol">
                      <FiUsers/>
                    </div>
                    <div className="content">
                      <div className="accordion-item">
                        <p className="content-title" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                          Para começar crie sua conta <BsArrowDownCircleFill color={'#4BB7F1'}/>
                        </p>
                        <div id="collapseOne" className="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <p>Vamos precisar do seu nome, email e telefone. Só clicar aqui</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="bol">
                      <MdOutlineBadge/>
                    </div>
                    <div className="content">
                      <div className="accordion-item">
                        <p className="content-title" id="headingTwo" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Preencha todo o seu cadastro  <BsArrowDownCircleFill color={'#4BB7F1'}/>
                            
                        </p>
                        
                        <div id="collapseTwo" className="accordion-collapse collapse " aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <span >Veja abaixo o que precisamos:</span>
                            <p>Seus dados pessoais e seu endereço</p>
                            <p>Seu documento de identificação e seu comprovante de endereço</p>
                            <p>Que nos informe o token que recebeu para ser tornar parceiro</p>
                            <p>Conhecer melhor sobre seu perfil profissional e suas especialidades</p>
                            <p>Nos conte sobre sua área de atuação</p>
                            <p>Do número seu registro no CRECI</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="bol">
                      <MdOutlineUpdate />
                    </div>
                    <div className="content">
                      <div className="accordion-item">
                        <p className="content-title" id="headingthree" data-bs-toggle="collapse" data-bs-target="#collapsethree" aria-expanded="false" aria-controls="collapsethree">
                        Aguarde nossa verificação <BsArrowDownCircleFill color={'#4BB7F1'}/>
                        </p>
                        <div id="collapsethree" className="accordion-collapse collapse " aria-labelledby="headingthree" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <p>Nossa equipe irá verificar o seu cadastro para aprovação.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="active">
                    <div className="bol">
                      <FiUsers/>
                    </div>
                    <div className="content">
                      <div className="accordion-item">
                        <p className="content-title" id="headingfour" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                        Pronto! <BsArrowDownCircleFill color={'#4BB7F1'}/>
                        </p>
                        <div id="collapsefour" className="accordion-collapse collapse " aria-labelledby="headingfour" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <p>Após nossa equipe aprovar o seu cadastro, você ja pode começar a vender !</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>
        {/* <section className="newsletter">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 d-flex">
                <div className="email d-flex align-items-center">
                  <img src={EmailImg} alt="icone Email de envio" />
                </div>
                <div className="content-email">
                  <p className="title-newsletter">Inscreva-se na nossa newsletter</p>
                  <p>E fique por dentro de todas as novidades da Appê+</p>
                </div>
              </div>
              <div className="col-lg-6">
                <form className="form-inline d-flex flex-wrap mt-3">
                  <input className="form-control mr-sm-2" type="search" placeholder="Insira seu email aqui..." aria-label="Search"/>
                  <button className=" my-2 my-sm-0" type="submit">Inserir email</button>
                </form>
              </div>
            </div>
          </div>
        </section> */}
        

        {/* <section className="diferenciais-anuncios-corretor">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mt-5">
                <div className="my-4">
                  <h2>Na Appe+ você tem diferenciais no anúncio do seu imóvel</h2>
                </div>
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"><img src={LogoAppe} alt="" /></th>
                      <th scope="col">Outros</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="first-column">Lorem ipsum dolor sit amet, consectetur lorem</td>
                      <td><BsCheck2Circle fontSize={24} color={`#0065DD`} /></td>
                      <td><IoCloseCircleOutline fontSize={24} /></td>
                    </tr>
                    <tr>
                      <td className="first-column">Lorem ipsum dolor sit amet, consectetur lorem</td>
                      <td><BsCheck2Circle fontSize={24} color={`#0065DD`} /></td>
                      <td><IoCloseCircleOutline fontSize={24} /></td>
                    </tr>
                    <tr>
                      <td className="first-column">Lorem ipsum dolor sit amet, consectetur lorem</td>
                      <td><BsCheck2Circle fontSize={24} color={`#0065DD`} /></td>
                      <td><IoCloseCircleOutline fontSize={24} /></td>
                    </tr>
                    <tr>
                      <td className="first-column">Lorem ipsum dolor sit amet, consectetur lorem</td>
                      <td><BsCheck2Circle fontSize={24} color={`#0065DD`} /></td>
                      <td><IoCloseCircleOutline fontSize={24} /></td>
                    </tr>
                    <tr>
                      <td className="first-column">Lorem ipsum dolor sit amet, consectetur lorem</td>
                      <td><BsCheck2Circle fontSize={24} color={`#0065DD`} /></td>
                      <td><IoCloseCircleOutline fontSize={24} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section> */}
      </div>

      <Footer />
    </>
  )
}

export default CadastroCorretor
