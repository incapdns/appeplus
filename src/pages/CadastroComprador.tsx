import {useState,useEffect} from 'react'
import Footer from '../components/Footer'
import ModalProfileCadastro from '../components/Form/cadastro/ModalProfileCadastro'
import Navbar from '../components/Navbar'
import '../styles/cadastroComprador.scss'
import BannerMobileComprador from '../assets/internas/banner-comprador-mobile.png'
import SearchBox from '../components/SearchBox'
import Imovel from "../components/Cards/Imovel";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Slider from "react-slick";
import { iBuscaImoveis } from '../@types'
import api from '../services/api'
import { MdOutlineBadge, MdOutlineUpdate, MdVerified } from 'react-icons/md'
import BuscarIcon from '../assets/internas/infos/encontrando-seu-corretor.svg'
import EstrelaIcon from '../assets/internas/infos/estrela.svg'
import CorretoresInfomadosIcon from '../assets/internas/infos/corretores-informados.svg'
import DesenvolvimentoIcon from '../assets/internas/infos/desenvolvimento-constante.svg'
import CliquesIcon from '../assets/internas/infos/clique.svg'
import Group from '../assets/internas/infos/Group.svg'
import { BsArrowDownCircleFill, BsCheck2Circle } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
import { RiEqualizerLine } from 'react-icons/ri'
import LogoAppe from '../assets/internas/logo-appe.svg'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { iDadosUsuario } from '../@types';

const usuario: iDadosUsuario = JSON.parse(
  localStorage.getItem("@appePlus/usuario") || "{}"
);


const CadastroComprador = () => {
  const [noBorder, setNoBorder] = useState(false)
  const [paraMorar, setParaMorar] = useState(true);
  const [colorButton, setColorButton] = useState(true)
  const [imoveis, setImoveis] = useState<iBuscaImoveis[]>([]);
  const qtdePagina = 12;
  const pagina = 1;

  async function GetImoveis() {
    await api.get('imovel/busca-avancada', {
      params: {
        qtdePagina,
        pagina,
      }
    })
      .then(response => {
        setImoveis(response.data.data.buscaAvancada);
      })
      .catch(error => { 
        console.log("Ocorreu um erro"); 
      });
  }



  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <IoIosArrowForward size={36} />
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <IoIosArrowBack size={36} />
      </div>
      
    );
    
  }
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
        <IoIosArrowForward style={{ ...style, display: "block", background: "transparent", color: '#FD4A19', fontSize: '36px' }} />
      </div>
    );
  }
  function SamplePrevArrowIconsCard(props: any) {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick} >
        <IoIosArrowBack style={{ ...style, display: "block", background: "transparent", color: '#FD4A19', fontSize: '36px' }} />
      </div>
    );
  }

  const settingsCard = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    className: "slides",
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        }
      }
    ]
  };
  useEffect(() => {
    
    GetImoveis();
  }, []);
  return (
    <>
      <Navbar/>
      <div className="wrapper-comprador">
        <div className="banner-comprador">
          <div className="content-area">
            <div className="box-content">
              <div className="box-title-content">
              <br/>
                <p className="subTitle">O imóvel ideal para você te espera aqui! </p>
                <h2>A melhor equipe de corretores, a melhor tecnologia</h2>
                <p>No Appê Plus, temos as melhores opções de imóveis, muita informação e você ainda escolhe o corretor especializado que vai te ajudar a achar o imóvel certo para você.</p>
              </div>
            </div>
            <div className="banner-mobile">
              <img src={BannerMobileComprador} alt="" />
            </div>
            <div className="box-form-absolute" >
              {usuario.token ? (''): (<>{noBorder ? (<ModalProfileCadastro noBorder={false}/>) : (<ModalProfileCadastro noBorder={true}/>)}</>)}
              
              
            </div>
          </div>
        </div>
        <section className="imobiliaria-digital py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <p>Nós somos a Appê Plus, a única imobiliária digital, de verdade, que vai transformar a experiência de compra do seu imóvel.</p>
                <h1 className='mb-3'>Veja o que você vai encontrar aqui:</h1>
                <p><strong>Imobiliária e tecnologia:</strong> experiência no mercado imobiliário e uma tecnologia inovadora, juntos para trazer eficiência para todo processo de compra e venda, sem deixar de valorizar o mais importante, as pessoas.</p>
                <p><strong>Inteligência de dados:</strong> Dados e estatísticas sobre, imóveis, mercado e região de interesse, ajudarão você e seu corretor a encontrarem mais rapidamente os imóveis mais interessantes e dentro dos seus objetivos de compra</p>
                <p><strong>Transparência e confiança:</strong> Garantimos a veracidade de todas informações. Proprietários, imóveis e corretores, são verificados, para poderem estar plataforma. Maior segurança para todos.</p>
                <p><strong>Tudo online:</strong> Busca de imóveis, agendamento de visitas, realização de propostas, envio de documentação, escolha do corretor, emissão de contrato de compra e venda, pagamentos, tudo simples, fácil, 100% digital.</p>
                <p><strong>Corretores profissionais, experientes e especializados:</strong> Você terá acesso aos corretores mais preparados, que irão lhe prestar um assessoramento completo, do início ao fim da jornada de compra do seu imóvel. Ele cuida de tudo para levar até você opções de imóveis que façam sentido. Chega de visitas improdutivas, ou corretores que sem preparo e que não entendem o que você de fato precisa. </p>
              </div>
            </div>
          </div>

        </section>
        <section className="imovel">
          <div className="container-fluid para-morar">
            <div className="container">
              <p className="sub-title">vamos começar</p>
              
              <h2>O primeiro passo para encontrar o seu imóvel está aqui</h2>
            </div>
          </div>
          <SearchBox
            paraMorar={paraMorar}
            setParaMorar={setParaMorar}
            colorButton={colorButton}
            setColorButton={setColorButton}
          />
                <div className="container-fluid" id="anuncio-plus">
        <div className="container">

          <div className="anuncio-plus">
            <div className="header">
              <div className="text-select">
                <p>Mostrando resultados para </p>
                <select className="form-select" >
                  <option value="bh">Belo Horizonte</option>
                </select>
              </div>
              <p className="muted">Abaixo estamos mostrando apenas os anúncios plus. <MdVerified /> <a href="#" className="btn btn-link">Entenda mais aqui</a></p>
            </div>
            <div className="lancamento-body row">

              <Slider {...settingsCard}>
                {imoveis.map(imovel => {
                  if (imovel.tipoCard !== 0) {
                    return (
                      <Imovel
                        key={imovel.codImovel}
                        codImovel={imovel.codImovel}
                        endereco={imovel.endereco}
                        bairro={imovel.bairro}
                        cidade={imovel.cidade}
                        uf={imovel.uf}
                        qtdeDormitorios={imovel.qtdeDormitorios}
                        qtdeSuites={imovel.qtdeSuites}
                        qtdeBanheiros={imovel.qtdeBanheiros}
                        qtdeVagasGaragem={imovel.qtdeVagasGaragem}
                        areaTotal={imovel.areaTotal}
                        valorVendaOriginal={imovel.valorVendaOriginal}
                        descImovel={imovel.descImovel}
                        descTipoImovel={imovel.descTipoImovel}
                        imgsDoImovel={imovel.imgsDoImovel}
                        codStatusAnuncio={imovel.codStatusAnuncio}
                      />
                    );
                  }
                })}
              </Slider>

            </div>
          </div>

        </div>
      </div>
        </section>
        <section className="corretor-comprador mt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <h1>Appê Plus, uma experiência inovadora na compra do seu novo imóvel</h1>
                <div className="line d-flex justify-content-between align-items-center">
                  <p>100% digital e com o apoio dos corretores mais confiáveis , experientes e especialistas do mercado.<br/>Saiba como funciona.</p>
                </div>
              </div>
            </div>
            <div className="row mt-5">
            <Slider {...settings}>
              <div className="card-corretor-para-corretor">
                <div className="card-body">
                  <div className="card-action">
                    <img src={BuscarIcon} alt="busque seu corretor " />
                  </div>
                  <h6 className="card-corretor-title">Encontrando seu corretor</h6>
                  <p className="card-text">Fazemos um match, combinando as informações relevantes sobre os imóveis que você procura, com o perfil ideal de corretor para atende-lo, considerando as suas características, região, mercado e avaliações positivas dos próprios clientes.</p>
                </div>
              </div>
              <div className="card-corretor-para-corretor" >
                <div className="card-body">
                  <div className="card-action">
                    <img src={EstrelaIcon} alt="imagem de sua decisão" />
                  </div>
                  <h6 className="card-corretor-title">Sua decisão, sua avaliação:</h6>
                  <p className="card-text">De maneira exclusiva, você é quem escolhe qual será o corretor que te auxiliará no seu processo de compra. E você terá possibilidade de avaliar a qualidade do serviço prestado e inclusive trocar de corretor se isto for o melhor para você</p>
                </div>
              </div>
              <div className="card-corretor-para-corretor" >
                <div className="card-body">
                  <div className="card-action">
                    <img src={CorretoresInfomadosIcon} alt="imagem de corretores informados icon" />
                  </div>
                  <h6 className="card-corretor-title">Corretores informados e certificados: </h6>
                  <p className="card-text">O corretor ao se cadastrar, informa suas especialidades, região de atuação, experiência de mercado e seu CRECI. Todas informações são checadas. Além disto, eles tem acesso informações de mercado que melhoram processo de busca .</p>
                </div>
              </div>
              <div className="card-corretor-para-corretor" >
                <div className="card-body">
                  <div className="card-action">
                    <img src={DesenvolvimentoIcon} alt="imagem de icone desenvolvimento constante" />
                  </div>
                  <h6 className="card-corretor-title">Desenvolvimento constante:</h6>
                  <p className="card-text">Oferecemos aos corretores parceiros cadastrados e ativos em na nossa plataforma, um constante programa de incentivo para que se aperfeiçoem e ofereçam a cada dia um serviço de maior qualidade.</p>
                </div>
              </div>
              <div className="card-corretor-para-corretor" >
                <div className="card-body">
                  <div className="card-action">
                    <img src={CliquesIcon} alt="imagem de icone clique" />
                  </div>
                  <h6 className="card-corretor-title">Seu imóvel novo está a cliques de distância</h6>
                  <p className="card-text">Com o Appê Plus, seu tão desejado imóvel novo, está a alguns cliques de chegar até você. Viva essa experiência, conheça nossos imóveis.</p>
                </div>
              </div>

            </Slider>
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
                      <MdOutlineBadge/>
                    </div>
                    <div className="content">
                      <div className="accordion-item">
                        <p className="content-title" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                          Preencha todo o seu cadastro <BsArrowDownCircleFill color={'#4BB7F1'}/>
                        </p>
                        <div id="collapseOne" className="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <span>Veja abaixo o que precisamos</span>
                            <p>Nos conta mais sobre o seu perfil</p>
                            <p>Fale sobre os motivos da sua compra</p>
                            <p>Detalhe o tipo de imóvel que está buscando</p>
                            <p>Informe as regiões de interesse</p>
                            <p>Indique quais características básicas seu novo imóvel deve possuir</p>
                            <p>Escolha o corretor que mais combina com você e com o imóvel que está buscando</p>
                            <p>Fale quais seriam os itens importantes que seu novo imóvel deve possuir</p>
                            <p>Conte para nós quais são os diferenciais de um imóvel que podem influenciar na sua decisão de compra</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="bol">
                      <AiOutlineSearch/>
                    </div>
                    <div className="content">
                      <div className="accordion-item">
                        <p className="content-title" id="headingTwo" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Pesquise seu imóvel  <BsArrowDownCircleFill color={'#4BB7F1'}/>
                            
                        </p>
                        
                        <div id="collapseTwo" className="accordion-collapse collapse " aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                           <p>comece a pesquisar os imóveis e deixar nosso corretor parceiro e a nossa plataforma, fazer o resto</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="bol">
                      <img src={Group} alt="icon clique" />
                    </div>
                    <div className="content">
                      <div className="accordion-item">
                        <p className="content-title" id="headingthree" data-bs-toggle="collapse" data-bs-target="#collapsethree" aria-expanded="false" aria-controls="collapsethree">
                        Navegue pela plataforma <BsArrowDownCircleFill color={'#4BB7F1'}/>
                        </p>
                        <div id="collapsethree" className="accordion-collapse collapse " aria-labelledby="headingthree" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <span>Veja as vantagens da Appê+</span>
                            <p><strong>Painel de imóveis:</strong> acompanhe seus favoritos, suas visitas, suas avaliações, suas propostas e muito mais.</p>
                            <p><strong>Seu Corretor:</strong> escolha o corretor que irá lhe dar todo suporte na busca e negociação do seu imóvel.</p>
                            <p><strong>Agendamento de visita:</strong> marque visitas aos imóveis que mais gostou de forma rápida, prática e 100% online</p>
                            <p><strong>Feche negócios:</strong> Envie propostas, negocie, assine contratos, e realize pagamentos, de forma segura e sem burocracia</p>
                            <p><strong>Avaliações:</strong> Avalie imóveis visitados, avalie corretores, avalie sua experiência com o appê Plus, para sermos cada vez melhor para você.</p>

                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="active">
                    <div className="bol">
                      <RiEqualizerLine/>
                    </div>
                    <div className="content">
                      <div className="accordion-item">
                        <p className="content-title" id="headingfour" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                        Pronto! <BsArrowDownCircleFill color={'#4BB7F1'}/>
                        </p>
                        <div id="collapsefour" className="accordion-collapse collapse " aria-labelledby="headingfour" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <p>Faça seu cadastro conseguiremos te ajudar a fechar o melhor negócio.</p>
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
        <section className='diferenciais-comprador py-5 '>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 my-4">
                <h2>Confira os diferenciais que nós da Appê Plus oferecemos a você que deseja comprar um novo imóvel</h2>
              </div>
            </div>
          </div>
              <div className="content-table mt-4">
                <div className="container">
                  <div className="row">
                    <div className="card card-table">
                      <div className="table-responsive">
                        <table className="table table-striped text-left">
                          <thead >
                            <tr>
                              <th scope="col" >Diferenciais da Appê Plus</th>
                              <th scope="col" ><img src={LogoAppe} alt="" /></th>
                              <th scope="col" ></th>
                              <th scope="col" ></th>
                              <th scope="col"  className='table-title'>Outros</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text">Anúncios de imóveis completos e detalhados</td>
                              <td className='text-center'><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                              <td></td>
                              <td></td>
                              <td><IoCloseCircleOutline fontSize={24} color={`#ADADAD`}/></td>
                            </tr>
                            <tr>
                              <td className="text">Proprietários e imóveis certificados </td>
                              <td  className='text-center'><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                              <td></td>
                              <td></td>
                              <td><IoCloseCircleOutline fontSize={24} color={`#ADADAD`}/></td>
                            </tr>
                            <tr>
                              <td className="text">Escolha do corretor com melhor perfil para te assessorar na compra do seu imóvel</td>
                              <td  className='text-center'><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                              <td></td>
                              <td></td>
                              <td><IoCloseCircleOutline fontSize={24} color={`#ADADAD`}/></td>
                            </tr>
                            <tr>
                              <td className="text">Corretores certificados e com CRECI ativo</td>
                              <td  className='text-center'><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                              <td></td>
                              <td></td>
                              <td><IoCloseCircleOutline fontSize={24} color={`#ADADAD`}/></td>
                            </tr>
                            <tr>
                              <td className="text">Corretores avaliados pelos usuários da plataforma</td>
                              <td  className='text-center'><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                              <td></td>
                              <td></td>
                              <td><IoCloseCircleOutline fontSize={24} color={`#ADADAD`}/></td>
                            </tr>
                            <tr>
                              <td className="text">imóveis avaliados por você a cada visita</td>
                              <td  className='text-center'><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                              <td></td>
                              <td></td>
                              <td><IoCloseCircleOutline fontSize={24} color={`#ADADAD`}/></td>
                            </tr>
                            <tr>
                              <td className="text">Proprietários que estão vendendo seu imóvel no Appê Plus também são atendidos por um corretor.</td>
                              <td  className='text-center'><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                              <td></td>
                              <td></td>
                              <td><IoCloseCircleOutline fontSize={24} color={`#ADADAD`}/></td>
                            </tr>
                            <tr>
                              <td className="text">Painel do comprador : seus imóveis favoritos, seus corretores , suas avaliações, agendamento de visitas, realização de propostas.</td>
                              <td  className='text-center'><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                              <td></td>
                              <td></td>
                              <td><IoCloseCircleOutline fontSize={24} color={`#ADADAD`}/></td>
                            </tr>
                            <tr>
                              <td className="text">Pagamento de sinal, entrada 100%digital e segura</td>
                              <td  className='text-center'><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                              <td></td>
                              <td></td>
                              <td><IoCloseCircleOutline fontSize={24} color={`#ADADAD`}/></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
              
            
         
        </section>
      </div>
      <Footer/>
    </>
  )
}

export default CadastroComprador
