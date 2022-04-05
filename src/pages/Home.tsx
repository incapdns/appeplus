import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { MdVerified } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import '../styles/pages/home.scss';

import QueroVender from '../assets/Home/queroVender.png';
import QueroSerCorretor from '../assets/Home/queroSerCorretor.png';
import Imovel from "../components/Cards/Imovel";
import SearchBox from "../components/SearchBox";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import api from "../services/api";
import { iBuscaImoveis, iDataSelect, tipoUsuario } from "../@types";
import { useHistory } from "react-router-dom";
import Select, { components } from 'react-select';
import customTheme from "../themes/ReactSelect";

export default function Home() {
  const history = useHistory();
  const [paraMorar, setParaMorar] = useState(true);
  const [imoveis, setImoveis] = useState<iBuscaImoveis[]>([]);
  let [lancamentos, setLancamentos] = useState<iBuscaImoveis[]>([]);
  const [valor, setValor] = useState({} as iDataSelect);
  const [loadingCidades, setLoadingCidades] = useState(false);
  const [cidades, setCidades] = useState<iDataSelect[]>([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');

  const qtdePagina = 12;
  const pagina = 1;

  const styleSelect = {
    control: (base: any) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none"
    })
  };

  useEffect(() => {
    GetLancamentos();
    GetImoveis();
    GetCidades();
  }, [ paraMorar,cidadeSelecionada]);





  


  async function GetCidades() {
    setLoadingCidades(true);
    await api.get('cidade/buscar/comImovel')
      .then(response => {
        setCidades(response.data.data);
        // console.log('cidades', response.data.data)
        setLoadingCidades(false);
      })
      .catch(error => {
        console.log("Ocorreu um erro");
        setLoadingCidades(false);
      })
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

  const settingsCard = {
    dots: false,
    infinite: true,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    className: "slides",
    autoplay: true,
    autoplaySpeed: 20000,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0
      }
    }]
  };

  async function GetImoveis() {
    const finalidade = (paraMorar ? 1 : 2);
    console.log({
      Finalidade: finalidade,
      Cidade:cidadeSelecionada
    })
    
    await api.get(`imovel/busca-avancada?Finalidade=${finalidade}&Cidade=${cidadeSelecionada}&qtdePagina=999&pagina=1`)
      .then(response => {
        setImoveis(response.data?.data?.buscaAvancada);
       console.log(response.data?.data?.buscaAvancada);
      })
      .catch(error => { 
        console.log("Ocorreu um erro", error); 
      });
  }

  async function GetLancamentos() {
    const finalidade = (paraMorar ? 1 : 2);
    await api.get('imovel/lancamentos', {
      params: {
        QtdePagina: qtdePagina,
        Pagina: pagina,
        Finalidade: finalidade,
      }
    })
      .then(response => {
        // console.log(response.data.data);
        setLancamentos(response.data.data);
        lancamentos = response.data.data;
      })
      .catch(error => {
        console.log("Ocorreu um erro");
      });
  }

  function handleClickValores(value: number) {
    const valores = String(value)
    const params = `${valores !== '' ? `ate=${valores}` : ''}`;

    history.push({
      pathname: '/imoveis',
      search: params,
      state: { detail: 'response.data' }
    });
  }

  function handleAcimaMilhao(){
    const params = 'valor=6';

    history.push({
      pathname: '/imoveis',
      search: params,
      state: { detail: 'response.data' }
    });
  }

  function handleClickImoveis(value:number) {
    let tipoImovel  = String(value);

    const params = `${tipoImovel !== '' ? `tipo=${tipoImovel}` : ''}`;

    history.push({
      pathname: '/imoveis',
      search: params,
      state: { detail: 'response.data' }
    });
  }

  return (
    <>
      <script type="text/javascript" async src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/cd0486dc-ccbd-4613-bde9-aafef416fe10-loader.js" ></script>
      <Navbar />
      <div className={`container-fluid ${paraMorar ? 'para-morar' : 'para-trabalhar'}`} id="jumbotron" >
        <div className="container">
          <p className="subtitle">Os melhores imóveis estão aqui</p>
          <hr />
          {paraMorar ? (
            <h1>Agora é fácil encontrar seu lar</h1>
          ) : (
            <h1>Agora é fácil encontrar sua segunda casa</h1>
          )}

        </div>

      </div>

      <SearchBox
        paraMorar={paraMorar}
        setParaMorar={setParaMorar}
      />

      <div className="container-fluid" id="anuncio-plus">
        <div className="container">

          <div className="anuncio-plus">
            <div className="header">
              <div className="text-select">
                <p>Mostrando resultados para </p>
                <select className="form-select" value={cidadeSelecionada}  onChange={(e) => setCidadeSelecionada(e.target.value)} >
                  {cidades.map((cidade)=>(
                    <option key={cidade.value}>{cidade.label}</option>
                  ))}
                  
                </select>
              </div>
              <p className="muted">Abaixo estamos mostrando apenas os anúncios plus. <MdVerified /> <a href="/cadastro/Anuncio" className="btn btn-link">Entenda mais aqui</a></p>
            </div>
            {imoveis ? (
              <>
               {imoveis.length !== 0 ?(
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
            ) : (
              <div className="lancamento-body row">
                <p>Nenhum imóvel encontrado</p>
              </div>
            )}
              </>
            ): (
              <div className="lancamento-body row">
                <p>Nenhum imóvel encontrado</p>
              </div>
            )}
           
            
          </div>

        </div>
      </div>

      <div className={`container ${paraMorar ? 'preco-para-morar' : 'preco-para-trabalhar'}`} id="filtro">
        <h4>Imóveis de todos os preços e tamanhos</h4>
        <div className="row">

          <div className="col-lg-3 mb-3 mb-lg-0 p300" onClick={() => handleClickValores(300000)} >
            <div className="title">
              <h4>Até 300 mil</h4>
            </div>
          </div>
          <div className="col-lg-3 mb-3 mb-lg-0 p400" onClick={()=> handleClickValores(500000)}>
            <div className="title">
              <h4>Até 500 mil</h4>
            </div>
          </div>
          <div className="col-lg-3 mb-3 mb-lg-0 p500" onClick={()=> handleClickValores(1000000)}>
            <div className="title">
              <h4>Até 1 milhão</h4>
            </div>
          </div>
          <div className="col-lg-3 mb-3 mb-lg-0 p750" onClick={()=> handleAcimaMilhao()}>
            <div className="title">
              <h4>Acima de 1 milhão</h4>
            </div>
          </div>

        </div>
      </div>

      <div className={`container ${paraMorar ? 'tipo-para-morar' : 'tipo-para-trabalhar'}`} id="filtro">
        <h4>Imóveis de todos os tipos também</h4>
        <div className="row">

          <div className="col-lg-3 mb-3 mb-lg-0 item-1" onClick={() => paraMorar ? handleClickImoveis(1) : handleClickImoveis(12)} >
            <div className="title">
              <h4>{paraMorar ? 'Casas' : 'Conj. Comercial/Salas'}</h4>
            </div>
          </div>
          <div className="col-lg-3 mb-3 mb-lg-0 item-2" onClick={() => paraMorar ? handleClickImoveis(7) : handleClickImoveis(8)}>
            <div className="title">
              <h4>{paraMorar ? 'Casas de Condomínio' : 'Andares completos'}</h4>
            </div>
          </div>
          <div className="col-lg-3 mb-3 mb-lg-0 item-3" onClick={() => paraMorar ? handleClickImoveis(2) : handleClickImoveis(20)}>
            <div className="title">
              <h4>{paraMorar ? 'Apartamentos' : 'Pontos comerciais'}</h4>
            </div>
          </div>
          <div className="col-lg-3 mb-3 mb-lg-0 item-4" onClick={() => paraMorar ? handleClickImoveis(3) : handleClickImoveis(15)}>
            <div className="title">
              <h4>{paraMorar ? 'Coberturas' : 'Galpões/Despositos'}</h4>
            </div>
          </div>

        </div>
      </div>

      <div className={`container-fluid ${paraMorar ? 'para-morar' : 'para-trabalhar'}`} id="beneficios">
        <div className="container">
          <div className="header">
            <p>Com a Appe+ você pode mais</p>
            <h2>Benefícios para você, seja na venda ou na corretagem</h2>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <img src={QueroVender} alt="Quero vender" className="img-fluid" />
              <div className="body">
                <h2>Quero vender</h2>
                <div className="divider vender" />
                <p className="text-vender">Para você que quer vender seu imóvel, no Appê Plus, você anuncia seu imóvel gratuitamente, faz tudo 100% on line e conta com os corretores mais bem preparados do mercado.</p>
              </div>
            </div>
            <div className="col-lg-6">
              <img src={QueroSerCorretor} alt="Quero ser corretor" className="img-fluid" />
              <div className="body">
                <h2>Quero ser corretor</h2>
                <div className="divider corretor" />
                <p className="text-corretor">Faça parte da revolução no mercado imobiliário. Seja um parceiro Appê Plus e conte com CRM completo, mais oportunidades, mais vendas e mais comissões. Uma plataforma tecnológica pensada de corretor para corretor.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* {lancamentos ? (
        <>
          <div className="container" id="divider">
            <hr />
          </div>
          <div className="container-fluid" id="lancamentos">
            <div className="container">

              <div className="lancamento">
                <div className="header">
                  <h2>Lançamentos exclusivos</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut non viverra placerat nisl risus in. Pellentesque mattis tincidunt sed nulla nibh nam fermentum. Ac consequat posuere varius enim. Massa libero, egestas a venenatis gravida. Nibh pellentesque.</p>
                </div>
                <div className="lancamento-body row">

                  <Slider {...settingsCard}>
                    {lancamentos.map(lancamento => {
                      return (
                        <Imovel lancamento
                          key={lancamento.codImovel}
                          codImovel={lancamento.codImovel}
                          endereco={lancamento.endereco}
                          bairro={lancamento.bairro}
                          cidade={lancamento.cidade}
                          uf={lancamento.uf}
                          qtdeDormitorios={lancamento.qtdeDormitorios}
                          qtdeSuites={lancamento.qtdeSuites}
                          qtdeBanheiros={lancamento.qtdeBanheiros}
                          qtdeVagasGaragem={lancamento.qtdeVagasGaragem}
                          areaTotal={lancamento.areaTotal}
                          valorVendaOriginal={lancamento.valorVendaOriginal}
                          descImovel={lancamento.descImovel}
                          descTipoImovel={lancamento.descTipoImovel}
                          imgsDoImovel={lancamento.imgsDoImovel}
                          codStatusAnuncio={lancamento.codStatusAnuncio}
                        />
                      );
                    })}
                  </Slider>

                </div>
              </div>

            </div>
          </div>
        </>
      ) : null} */}

      <Footer />
    </>
  );
}