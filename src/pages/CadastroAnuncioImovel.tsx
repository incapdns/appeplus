import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import ModalProfileCadastro from '../components/Form/cadastro/ModalProfileCadastro';
import Navbar from '../components/Navbar';
import '../styles/cadastroAnuncioImovel.scss';
import {BsArrowRight,BsCheck2Circle,BsCheck2} from 'react-icons/bs';
import {IoCloseCircleOutline} from 'react-icons/io5';
import {IoCubeOutline, IoDiamondOutline} from 'react-icons/io5'
import {RiSettings2Line} from 'react-icons/ri'
import LogoAppe from '../assets/internas/logo-appe.svg'
import BannerMobileAnuncio from '../assets/internas/banner-anuncio-mobile.jpg'
import { iDadosUsuario } from '../@types';

const usuario: iDadosUsuario = JSON.parse(
  localStorage.getItem("@appePlus/usuario") || "{}"
);



const CadastroAnuncioImovel = () => {
  const [scrollBox, setScrollBox] = useState(true)

  
  function scrollBoxInit(){

    const anuncios = document.querySelector('.diferenciais-anuncios')
    const final = anuncios?.getBoundingClientRect().bottom;
    const numero = Number(final)
    const windowMetade = window.innerHeight * 0.7;
    const isSection = (numero - windowMetade) < 0;


    if (window.scrollY > 350) {

      setScrollBox(true)
    }
    if (isSection) {
      setScrollBox(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', scrollBoxInit)
  }, [])
  return (
    <>
      <Navbar />
      <div id="cadastroAnuncioImovel" className="mb-5">
      <div className="wrapper">
        <div className="banner">
          <div className="content-area">
            <div className="box-content">
              <div className="box-title-content mt-5">
                <br/>
                <p>O sucesso na venda do seu imóvel, começou</p>
                <h2>Aqui seu imóvel único, encontra os melhores compradores</h2>
                <p>Tecnologia, transparência, agilidade na venda e os corretores mais bem preparados, que você mesmo avalia. Só aqui no Appê Plus! </p>
                {/* <button className="btn-cadastrar">
                  Cadastrar meu imóvel  <BsArrowRight fontSize={24}/>
                </button> */}
              </div>
            </div>
            <div className="banner-mobile">
              <img src={BannerMobileAnuncio} alt="" />
            </div>
            <div className="box-form-absolute">
              {usuario.token ? ('') : (<ModalProfileCadastro noBorder={false} />)}
              
            </div>
          </div>
      </div>
      <section className="venda-imovel">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-4">
              <div className="my-4">
                <h2>Nós somos a Appê Plus, a imobiliária digital que vai transformar a experiência de venda do seu imóvel. </h2>
              </div>
              <div className="my-4">
                <h4>Veja o que o que você vai encontrar aqui:</h4>
              </div>
              <ul>
                <li>
                  <p>
                   <strong>Imobiliária e tecnologia:</strong> experiência no mercado imobiliário e uma tecnologia inovadora, juntos para trazer eficiência para todo processo de compra e venda, sem deixar de valorizar o mais importante, as pessoas. 
                  </p>
                </li>
                <li>
                  <p>
                   <strong>Inteligência de dados:</strong> Dados e estatísticas sobre clientes, imóveis, mercado e região de venda, ajudarão você e seu corretor a encontrarem potenciais compradores mais rapidamente;
                  </p>
                </li>
                <li>
                  <p>
                   <strong>Transparência e confiança:</strong> Garantimos a veracidade de todas informações. Clientes, imóveis e corretores, são verificados, para poderem estar plataforma. Maior segurança para todos. 
                  </p>
                </li>
                <li>
                  <p>
                   <strong>Tudo on line:</strong> cadastro do seu imóvel, envio de documentação e imagens, escolha do corretor, agendamento de visitas, envio de proposta, emissão de contrato de compra e venda, pagamentos, tudo simples, fácil, 100% digital.
                  </p> 
                </li>
                <li>
                  <p>
                   <strong>Corretores profissionais, experientes e especializados:</strong> Você terá acesso aos corretores mais preparados, que irão lhe prestar um assessoramento completo, do início ao fim da jornada de venda do seu imóvel. Ele cuida de tudo para levar até você clientes e propostas que façam sentido. Chega de visitas improdutivas, curiosos ou propostas descabidas.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="passo-passo">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mt-5">
              <div className="my-4">
                  <h2>Conheça o passo a passo para anunciar seu imóvel no Appê Plus. É gratuito!</h2>
              </div>
              <div className="box-description-title">
                <p>Crie sua conta. Vamos precisar do seu nome, e-mail e telefone</p>
              </div>
              <div className="box-description mx-auto">
                <p><BsCheck2Circle fontSize={24} color={`#0065DD`}/> Complete os dados pessoais e nos envie seus documentos</p>
                <p><BsCheck2Circle  fontSize={24} color={`#0065DD`}/> Informe o tipo e a localização do seu imóvel</p>
                <p><BsCheck2Circle  fontSize={24} color={`#0065DD`}/> Fale sobre o seu imóvel</p>
              </div>
              
              <div className="box-description mx-auto">
                <p><BsCheck2Circle fontSize={24} color={`#0065DD`}/> Nos envie fotos que estarão no seu anúncio </p>
                <p><BsCheck2Circle fontSize={24} color={`#0065DD`}/> Escolha o corretor que mais combina com você e com seu imóvel</p>
              </div>
              <div className="box-description mx-auto">
                <p><BsCheck2Circle fontSize={24} color={`#0065DD`}/> Detalhe ao máximo o que torna seu imóvel único</p>
                <p><BsCheck2Circle fontSize={24} color={`#0065DD`}/> Pesquisa rápida para te conhecer melhor e assim manter uma melhoria constante da plataforma.</p>
              </div>
              <div className="box-description-title-success">
                <p> Pronto. Agora é só aguardar o seu anuncio ser aprovado e começar a receber visitas</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="destaques-anuncio">
        <div className="container">
          <div className="row">
            <div className="col-lg-12  mt-5">
              <div className="my-4">
                <h2>Anúncios com mais destaque e sem custo algum? Somente aqui na Appê Plus.</h2>
              </div>
              <div className="cards d-flex justify-content-around align-items-center">
                <div className="card  card-azul">
                  <div className="card-body p-0">
                    <IoCubeOutline fontSize={48} color={`#0065DD`}/>
                    <p className="title-anuncio-azul">Anúncios Azul</p>
                    <ul>
                      <li><BsCheck2Circle fontSize={16} color={`#0065DD`}/> Pode receber contato e visita</li>
                      <li><BsCheck2Circle fontSize={16} color={`#0065DD`}/> Sem detalhes do imóvel</li>
                      <li><BsCheck2Circle fontSize={16} color={`#0065DD`}/> Média Relevância de exibição</li>
                    </ul>
                  </div>
                </div>
                <div className="card  card-plus">
                  <div className="card-body p-0">
                    <IoDiamondOutline fontSize={48} color={`#ffffff`}/>
                    <p className="title-anuncio-plus">Anúncios Plus</p>
                    <ul>
                      <li><BsCheck2Circle fontSize={16}/> Pode receber contato e visita</li>
                      <li><BsCheck2Circle fontSize={16}/> Detalhes completos do imóvel</li>
                      <li><BsCheck2Circle fontSize={16}/> Máxima relevância de exibição</li>
                      <li><BsCheck2Circle fontSize={16}/> Destaque exclusivo na página principal</li>
                    </ul>
                  </div>
                </div>
                <div className="card  card-laranja">
                  <div className="card-body p-0">
                    <RiSettings2Line fontSize={48} color={`#FD4A19`}/>
                    <p className="title-anuncio-laranja">Anúncios Laranja</p>
                    <ul>
                      <li><BsCheck2Circle fontSize={16} color={`#FD4A19`}/> Pode receber contato e visita</li>
                      <li><BsCheck2Circle fontSize={16} color={`#FD4A19`}/> Detalhes completos do imóvel</li>
                      <li><BsCheck2Circle fontSize={16} color={`#FD4A19`}/> Alta relevância de exibição</li>
                    </ul>
                  </div>
                </div>
                
                

              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="diferenciais-anuncios">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mt-5">
              <div className="my-4">
                <h2>Confira os diferencias que nós da Appê Plus, oferecemos a você proprietário:</h2>
              </div>
              <table className="table text-center">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"><img src={LogoAppe} alt="" /></th>
                    <th scope="col">Outros</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
                    <td className="text">Comissão de apenas 5% para proprietários </td>
                    <td><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                    <td><IoCloseCircleOutline fontSize={24}/></td>
                  </tr> */}
                  <tr>
                    <td className="text">Anúncios gratuitos e muito mais completos</td>
                    <td><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                    <td><IoCloseCircleOutline fontSize={24}/></td>
                  </tr>
                  <tr>
                    <td className="text">Escolha o corretor com melhor perfil te assessorar na venda do seu imóvel</td>
                    <td><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                    <td><IoCloseCircleOutline fontSize={24}/></td>
                  </tr>
                  <tr>
                    <td className="text">Corretores certificados e com CRECI ativo</td>
                    <td><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                    <td><IoCloseCircleOutline fontSize={24}/></td>
                  </tr>
                  <tr>
                    <td className="text">Corretores avaliados pelos usuários da plataforma</td>
                    <td><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                    <td><IoCloseCircleOutline fontSize={24}/></td>
                  </tr>
                  <tr>
                    <td className="text">Seu imóvel avaliado por aqueles que te visitaram</td>
                    <td><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                    <td><IoCloseCircleOutline fontSize={24}/></td>
                  </tr>
                  <tr>
                    <td className="text">Os interessados no seu imóvel, também são atendidos por um corretor.</td>
                    <td><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                    <td><IoCloseCircleOutline fontSize={24}/></td>
                  </tr>
                  <tr>
                    <td className="text">Gestão do seu imóvel pela plataforma: visitas, propostas, número de visualizações, de marcações como favorito,etc.</td>
                    <td><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                    <td><IoCloseCircleOutline fontSize={24}/></td>
                  </tr>
                  <tr>
                    <td className="text">Recebimento de sinal, entrada e pagamento de comissão 100% digital e segura</td>
                    <td><BsCheck2Circle fontSize={24} color={`#0065DD`}/></td>
                    <td><IoCloseCircleOutline fontSize={24}/></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </div>
        </section>
      </div>
      </div>

      <Footer />
    </>
  )
}

export default CadastroAnuncioImovel
