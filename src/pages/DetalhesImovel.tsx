import { FormEvent, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import FsLightbox from 'fslightbox-react';
import { iDadosUsuario, iFinanciamento, iImoveisSimilares, iImovel, iCorretor, iDiasDisponiveis, iConjuntoCaracteristica, iConjuntoItens } from "../@types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";

import MapComponent from "../components/Google/GoogleMaps";
import { MdArrowForwardIos, MdArrowBackIosNew, MdOutlineWatchLater, MdFastfood, MdSchool } from 'react-icons/md'
import '../styles/pages/DetalhesImovel.scss';
import Quarto from '../assets/internas/infos/quarto.svg';
import Metragem from '../assets/internas/infos/metragem.svg';
import Corretor from '../assets/internas/corretor.png'
import Suites from '../assets/internas/infos/suite.svg';
import Garagem from '../assets/internas/infos/carro.svg';
import Sol from '../assets/internas/infos/sol.svg';
import LogoSimples from '../assets/internas/logo-simplificado.svg';
import { BsArrowRight, BsCheck2Circle, BsHouse, BsShare, BsArrowRightCircleFill, BsArrowLeftCircleFill, BsFillCalendarCheckFill } from 'react-icons/bs';
import { BiBuildingHouse } from 'react-icons/bi';
import { BiCart, BiBus, BiHealth, BiFootball } from 'react-icons/bi'
import { FiMapPin, FiSearch } from 'react-icons/fi';
import { FaHospitalAlt } from 'react-icons/fa'

import { IoFastFoodOutline, IoSchool } from 'react-icons/io5';
import { MdKeyboardArrowDown, MdContentCopy, MdFavoriteBorder, MdVerified } from 'react-icons/md'
import { IoEyeSharp } from 'react-icons/io5'
import SliderFinanciamento, { SliderTooltip } from 'rc-slider';
import { cepMask, moeda, moedaFloat, revertMask, dateNascMask } from '../utils/Masks';

import 'rc-slider/assets/index.css';
import { EmailShareButton, FacebookShareButton, TwitterShareButton, WhatsappShareButton, EmailIcon, FacebookIcon, TwitterIcon, WhatsappIcon, } from "react-share";
import Loading from "../components/Loading";
import SelecaoCorretor from "../components/Cards/SelecaoCorretor";
import ModalFinanciamento from "../components/Cards/FinanciamentoImovel";
import Alert from "../components/Alert";

interface iParamTypes {
  id: string
}


const DetalhesImovel = (props: any) => {
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem('@appePlus/usuario') || '{}'
  );

  const { id } = useParams<iParamTypes>();
  const history = useHistory();
  const [imovel, setImovel] = useState({} as iImovel);
  const [itensDoImovel, setItensDoImovel] = useState({} as iImovel)
  const [corretores, setCorretores] = useState<iCorretor[]>([]);

  const [qntdImg, setQntdImg] = useState(0);
  const [imoveisSimilares, setImoveisSimilares] = useState<iImoveisSimilares[]>([]);
  const [financiamentos, setFinanciamentos] = useState<iFinanciamento[]>([]);
  const [toggler, setToggler] = useState(false);
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [valorEntrada, setValorEntrada] = useState('');
  const [qtdParcelas, setQtdParcelas] = useState(360);
  const [dtAniversario, setDtAniversario] = useState('');
  const [rendaMensal, setRendaMensal] = useState('');
  const [anuncio, setAnuncio] = useState(4);
  const [loading, setLoading] = useState(false);
  const [erroSimulador, setErroSimulador] = useState(false);
  let [imovelFavorito, setImovelFavorito] = useState(false);
  const [linkClicado, setLinkClicado] = useState(false)
  const [diasDisponiveisVisita, setDiasDisponiveisVisita] = useState<iDiasDisponiveis[]>([]);
  const [horasDisponiveisVisita, setHorasDisponiveisVisita] = useState([]);
  const [podeAgendarVisita, setPodeAgendarVisita] = useState(false);
  const [agendouComSucesso, setAgendouComSucesso] = useState(false);
  const [renderDom, setRenderDom] = useState(false);
  const [loadingCorretor, setLoadingCorretor] = useState(false);
  const [topCorretores, setTopCorretores] = useState<iCorretor[]>([]);
  const [historicoCorretores, setHistoricoCorretores] = useState<iCorretor[]>([]);
  const [diaEscolhido, setDiaEscolhido] = useState('');
  const [horaEscolhida, setHoraEscolhida] = useState('');
  const [corretorImovel, setCorretorImovel] = useState(false)
  const [topCorretorImovel, setTopCorretorImovel] = useState(false)
  const [getTopCorretor, setGetTopCorretor] = useState(false)
  const [getTopCorretorCodigo, setGetTopCorretorCodigo] = useState('')
  const [getTopCorretorCodigoNumber, setGetTopCorretorCodigoNumber] = useState<number>()
  const [historicoCorretorImovel, setHistoricoCorretorImovel] = useState(false)
  const [getHistoricoCorretor, setGetHistoricoCorretor] = useState(false)
  const [getHistoricoCorretorCodigo, setGetHistoricoCorretorCodigo] = useState('')
  const [getHistoricoCorretorCodigoNumber, setGetHistoricoCorretorCodigoNumber] = useState<number>()
  const [termos, setTermos] = useState(false);
  const [contentTermos, setContentTermos] = useState(false)
  const [getCorretorImovel, setGetCorretorImovel] = useState(false)
  const [corretorSelecionado, setCorretorSelecionado] = useState(0);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  // let [msgAgenda, setMsgAgenda] = useState('');
  let [codCorretor, setCodCorretor] = useState<number>()


  const shareUrl = window.location.href;

  function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setLinkClicado(true)
    setTimeout(() => {
      setLinkClicado(false)
    }, 1000)
  }
  async function GetImovel() {
    api.get(`imovel/selecao?codImovel=${id}`)
      .then(async response => {
        setImovel(response.data.data);
        setLatitude(Number(response.data.data.latitude));
        setLongitude(Number(response.data.data.longitude));
        setAnuncio(response.data.data.codStatusAnuncio);

        if (response.data.data.imgsDoImovel.length >= 3) {
          setQntdImg(3);
        } else {
          setQntdImg(response.data.data.imgsDoImovel.length)
        }
        await api.get('imovel/busca-similaridade', {
          params: {
            Qtdepagina: 4,
            Pagina: 1,
            CodImovel: response.data.data.codImovel
          }
        })
          .then(responseSimilar => {
            setImoveisSimilares(responseSimilar.data.data.buscaAvancada)
          })
          .catch(errorSimilar => {
            console.log("Ocorreu um erro");
          })
      })
      .catch(error => {
        console.log("Ocorreu um erro");
      })
  }

  async function GetCorretorImovel() {
    corretores.pop();
    setAgendouComSucesso(false);
    setLoadingCorretor(true);
    await api.get(`Corretor/buscar?codCorretor=${imovel?.codCorretorVendedor}`)
      .then(response => {
        corretores.push(response.data.data[0])

      })
      .catch(error => {
        console.log("Ocorreu um erro");

        setLoadingCorretor(false);
      })
    setLoadingCorretor(false);
    await api.get('Corretor/top-corretores-imovel', {
      params: {
        CodImovel: imovel?.codImovel,
        QtdePagina: 3,
        Pagina: 1
      }
    })
      .then(response => {
        // console.log('topcorretores',response.data.data)
        if (response.data.data !== null) {
          setTopCorretores(response.data.data)
        }

        // response.data.data.map((corretor: any) => corretores.push(corretor));
      })
      .catch(error => {
        console.log("Ocorreu um erro");
      })


    await api.get('Corretor/historico-cliente-corretor', {
      params: {
        codCliente: usuario.codCliente,
        qtdePagina: 5,
        pagina: 1
      }
    })
      .then(response => {
        setHistoricoCorretores(response.data.data)
        // response.data.data.map((corretor: any) => corretores.push(corretor));
      })
      .catch(error => {
        console.log("Ocorreu um erro");
      })
    setLoadingCorretor(false);
  }

  async function AgendarVisitaDiasDisponiveis(codCorretor: number) {
    if (usuario.token) {
      setLoadingHorarios(true);
      console.log('corretor', codCorretor);
      await api.get(`agenda/corretores/dias-disponiveis?codImovel=${id}&codCliente=${usuario.codCliente}&codCorretorComprador=${codCorretor}`)
        .then(response => {
          console.log('datas', response.data.data)
          if (response.data.success) {
            setDiasDisponiveisVisita(response.data.data.disponibilidade);
            setHorasDisponiveisVisita(response.data.data.disponibilidade.horariosDisponiveis)
            setPodeAgendarVisita(true);
          } else {
            setPodeAgendarVisita(false);
          }
          setLoadingHorarios(false);
        })
        .catch(error => {
          console.log("Ocorreu um erro");
          setLoadingHorarios(false);
        })
    }
  }

  async function AgendarVisita(event: FormEvent) {
    if (usuario.token) {
      event.preventDefault();
      setLoading(true);
      console.log('imovel.codCorretorVendedor', imovel?.codCorretorVendedor)
      console.log('corretorSelecionado', corretorSelecionado)
      const [day, month, year] = diaEscolhido.split('/');
      const [hora, minuto, segundo] = horaEscolhida.split(':');
      if (getCorretorImovel) {
        setCodCorretor(Number(getCorretorImovel))
      } else if (getTopCorretor) {
        setCodCorretor(Number(getTopCorretorCodigo))
      } else if (getHistoricoCorretor) {
        setCodCorretor(Number(getHistoricoCorretorCodigo))
      }

      api.post('agenda', {
        codCorretorVendedor: imovel?.codCorretorVendedor,
        codCorretorComprador: corretorSelecionado,
        codClienteVendedor: imovel?.codClienteVendedor,
        codClienteComprador: usuario.codCliente,
        dtInicio: `${year}-${month.length > 1 ? month : `0${month}`}-${day.length > 1 ? day : `0${day}`}T${hora.length > 1 ? hora : `0${hora}`}:${minuto}:${segundo}`,
        codImovel: imovel?.codImovel,
      }).then(response => {
        console.log(response.data)
        setLoading(false);
        setAgendouComSucesso(true)
      }).catch(error => {
        setAlertErro(true);
        setMsgErro(error.response?.data.message);
        console.log("Ocorreu um erro")
        console.log(error.response)
        setLoading(false)
        setAgendouComSucesso(false)
      })
    }

  }

  async function SimularFinanciamento(event: FormEvent) {
    event.preventDefault();
    const valorEntradaNumero = Number(valorEntrada)
    const valorFinanciar = imovel?.valorVendaOriginal - valorEntradaNumero

    let max = (imovel.valorVendaOriginal * 80) / 100

    // if(valorFinanciar > max){
    //   setMsgErro("O valor financiado não pode ultrapassar " + moeda(max))
    //   setErroSimulador(true)
    // } else {
    setLoading(true);
    setErroSimulador(false);
    console.log({
      dtAniversario,
      qtdParcelas: String(qtdParcelas),
      valorParaFinanciar: Number(parseFloat(moedaFloat(String(valorFinanciar)))),
      rendaMensal: Number(parseFloat(moedaFloat(String(rendaMensal)))),
      valorDoImovel: Number(parseFloat(moedaFloat(String(imovel?.valorVendaOriginal)))),
      estadoSigla: imovel?.uf
    })
    await api.post('simulador-financeiro/financiamento', {
      dtAniversario,
      qtdParcelas: String(qtdParcelas),
      valorParaFinanciar: Number(parseFloat(moedaFloat(String(valorFinanciar)))),
      rendaMensal: Number(parseFloat(moedaFloat(String(rendaMensal)))),
      valorDoImovel: Number(parseFloat(moedaFloat(String(imovel?.valorVendaOriginal)))),
      estadoSigla: imovel?.uf


    }).then(response => {
      setFinanciamentos(response.data.data)
      console.log(response.data.data)
      setLoading(false);
    }).catch(error => {
      setMsgErro("Houve um erro ao simular seu financiamento. Tente novamente mais tarde.")
      setLoading(false);
      setErroSimulador(true);
    })
    // }
  }

  async function GetImovelFavorito() {
    if (usuario.codCliente !== null) {
      await api.get('imovel/favorito', {
        params: {
          CodImovel: Number(id),
          CodCliente: usuario.codCliente
        }
      })
        .then(response => {
          let favorito = response.data.data.favorito
          console.log("favorito", response.data.data)

          setImovelFavorito(favorito)

          PostImovelVisitadoHackFavorito(favorito)
        })
        .catch(error => {
          console.log("Ocorreu um erro favorito");
          setImovelFavorito(false);
        })
    }
  }

  async function PostImovelVisitadoHackFavorito(favorito: boolean) {
    if (usuario.token) {
      await api.post('historico-visualizacao/imovel-visitado', {
        "codImovel": Number(id),
        "codCliente": usuario.codCliente,
        'favorito': favorito
      }).then(response => {
        console.log(response.data)
      })
        .catch(error => {
          console.log("Ocorreu um erro");
        })
    }
  }

  async function adicionarFavorito() {
    if (usuario.token) {
      if (!imovelFavorito) {
        await api.post('historico-visualizacao/favorito', {
          codCliente: usuario.codCliente,
          codImovel: Number(id),
          favorito: true
        }).then(response => {
          console.log(response.data)
          setImovelFavorito(true)
        }).catch(error => {
          console.log("Ocorreu um erro");
        })
      }
    } else {
      history.push('/home');
    }

  }
  async function removerFavorito() {
    if (usuario.token) {
      if (imovelFavorito) {
        await api.post('historico-visualizacao/favorito', {
          codCliente: usuario.codCliente,
          codImovel: Number(id),
          favorito: false
        }).then(response => {
          setImovelFavorito(false)
        }).catch(error => {
          console.log("Ocorreu um erro");
        })
      }

    } else {
      history.push('/home');
    }

  }

  async function ImovelVisualizado() {
    if (usuario.token) {
      api.put(`imovel/marcar-qtdVisualizacoes?codImovel=${id}`,)

        .catch(error => {
          console.log("Ocorreu um erro");
        })
    }
  }

  function selecaoTopCorretor(codCorretor: any) {
    setGetTopCorretorCodigo(codCorretor);
    const codNumber = Number(getTopCorretorCodigo)
    setGetTopCorretorCodigoNumber(codNumber)
    setGetTopCorretor(true)
    setTopCorretorImovel(true)
    setCorretorImovel(false)
    setGetHistoricoCorretor(false)
    setHistoricoCorretorImovel(false)
    setGetCorretorImovel(false)
    setCorretorSelecionado(codCorretor);
    console.log('selecaoTopCorretor', codCorretor);
    AgendarVisitaDiasDisponiveis(Number(codCorretor));
    topCorretores.filter((topCorretor) => {
      const card = document.querySelector(`.selecaoCorretor${topCorretor.codCorretor}`)
      if (topCorretor.codCorretor === codCorretor) {
        card?.classList.add('card-corretor-selecionado')
        card?.classList.remove('card-corretor')
        corretores.filter((corretor) => {
          if (corretor.codCorretor !== topCorretor.codCorretor) {
            const cardCorretor = document.querySelector(`.selecaoCorretor${corretor.codCorretor}`)
            cardCorretor?.classList.remove('card-corretor-selecionado')
            cardCorretor?.classList.add('card-corretor')
          }
        })
      } else {
        card?.classList.remove('card-corretor-selecionado')
        card?.classList.add('card-corretor')
      }
    })
  }

  function selecaoHistoricoCorretor(codCorretor: any) {
    setGetHistoricoCorretorCodigo(codCorretor)
    const codNumber = Number(getHistoricoCorretorCodigo);
    setGetHistoricoCorretorCodigoNumber(codNumber);
    setGetHistoricoCorretor(true)
    setHistoricoCorretorImovel(true)
    setTopCorretorImovel(false)
    setGetTopCorretor(false)
    setCorretorImovel(false)
    setGetCorretorImovel(false)
    setCorretorSelecionado(codCorretor);
    console.log('selecaoHistoricoCorretor', codCorretor);
    AgendarVisitaDiasDisponiveis(codCorretor);
    historicoCorretores.filter((hCorretor) => {
      if (hCorretor.codCorretor === codCorretor) {
        const card = document.querySelector(`.selecaoCorretor${hCorretor.codCorretor}`)
        if (hCorretor.codCorretor === codCorretor) {
          card?.classList.add('card-corretor-selecionado')
          card?.classList.remove('card-corretor')
        } else {
          card?.classList.remove('card-corretor-selecionado')
          card?.classList.add('card-corretor')
        }
      }
    })



  }


  function selecaoCorretorImovel(codC: any) {
    setGetCorretorImovel(true)
    setCorretorImovel(!corretorImovel)
    setGetTopCorretor(false)
    setTopCorretorImovel(false)
    setGetHistoricoCorretor(false)
    setHistoricoCorretorImovel(false)
    let codigo = codC
    codCorretor = codigo
    setCorretorSelecionado(Number(codCorretor));
    console.log('selecaoCorretorImovel', codCorretor);
    AgendarVisitaDiasDisponiveis(Number(codCorretor));
    corretores.filter((corretor) => {
      const card = document.querySelector(`.selecaoCorretor${corretor.codCorretor}`)
      if (corretor.codCorretor === codC) {
        card?.classList.toggle('card-corretor-selecionado')
        topCorretores.filter((topCorretor) => {
          if (corretor.codCorretor !== topCorretor.codCorretor) {
            const cardTopCorretor = document.querySelector(`.selecaoCorretor${topCorretor.codCorretor}`)
            cardTopCorretor?.classList.remove('card-corretor-selecionado')
            cardTopCorretor?.classList.add('card-corretor')
          }
        })
      }
    })
  }

  useEffect(() => {
    GetImovel();
    GetImovelFavorito();
    ImovelVisualizado();
  }, [id, corretorSelecionado])


  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display: "block", background: "transparent", color: '#fff', fontSize: '48px' }} onClick={onClick} >
        <MdArrowForwardIos />
      </div>
    );
  }
  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display: "block", background: "transparent", color: '#fff', fontSize: '48px' }} onClick={onClick} >
        <MdArrowBackIosNew />
      </div>
    );
  }
  function SampleNextArrowIcons(props: any) {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick} >
        <BsArrowRightCircleFill style={{ ...style, display: "block", background: "transparent", color: '#FD4A19', fontSize: '36px' }} />
      </div>
    );
  }
  function SamplePrevArrowIcons(props: any) {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick} >
        <BsArrowLeftCircleFill style={{ ...style, display: "block", background: "transparent", color: '#FD4A19', fontSize: '36px' }} />
      </div>
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    className: "slides",
    arrows: true,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          infinite: true,
          dots: true,
          autoplay: true,
          speed: 500,
        }
      }
    ]
  };

  const settingsIcons = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: true,

    nextArrow: <SampleNextArrowIcons />,
    prevArrow: <SamplePrevArrowIcons />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          infinite: true,
          dots: true,
          autoplay: true,
          speed: 500,
        }
      }
    ]
  };
  const settingsModal = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          infinite: true,
          dots: true,
          autoplay: true,
          speed: 500,
        }
      }
    ]
  }


  return (
    <>
      <Navbar />
      <div className="container-fluid" id="imovel">
        <div>
          {(imovel?.imgsDoImovel && imovel?.imgsDoImovel?.length)
            ? (
              imovel?.imgsDoImovel?.length === 1
                ? (
                  <div className="col d-flex justify-content-center align-content-center">
                    <img
                      src={imovel?.imgsDoImovel[0]}
                      className="img-fluid rounded single-image" width='auto' height='400px'
                      alt={`${imovel?.endereco}, ${imovel?.bairro}, ${imovel?.cidade}`}
                      onClick={() => setToggler(!toggler)}
                    />
                  </div>
                )
                : (
                  <Slider {...settings}>
                    {imovel?.imgsDoImovel?.map((img, index) => {
                      return (
                        <div key={index}  >
                          <img
                            src={img}
                            className="card-img-top" width='100%'
                            alt={`${imovel?.endereco}, ${imovel?.bairro}, ${imovel?.cidade}`}
                            onClick={() => setToggler(!toggler)}
                          />
                        </div>
                      );
                    })}

                  </Slider>
                )

            )
            : (
              <div className="col d-flex justify-content-center align-content-center">
                <img
                  src="/assets/img-default.png"
                  className="img-fluid rounded img-imovel-default"
                  alt={`${imovel?.endereco}, ${imovel?.bairro}, ${imovel?.cidade}`}
                />
              </div>
            )
          }
          <FsLightbox
            toggler={toggler}
            sources={imovel?.imgsDoImovel}
            type="image"
          />

        </div>

      </div>
      <div className="container" id="description-imovel">
        <div className="row wrapper">
          <div className="col-lg-8 col-12 mt-3">
            <section className="description-anuncio">
              <span>{imovel?.descTipoImovel}</span>
              <h1 className="title">{imovel?.endereco}
                {anuncio === 4 && <span> <MdVerified color={'#2E2E2E'} /></span>}
                {anuncio === 3 && <span> <MdVerified color={'#FD4A19'} /></span>}
                {anuncio === 2 && <span> <MdVerified color={'#0065DD'} /></span>}
              </h1>
              <p className="sub-title">{imovel?.bairro}, {imovel?.cidade}</p>
            </section>
            {anuncio === 4 &&
              <section className="anuncio-plus">
                <p className="sub-title-anuncio">Este é um anúncio Plus <span> <MdVerified color={'#fff'} /></span></p>
                <p>Este é o mais completo tipo de anúncio publicado pelo Appê Plus. Significa que o proprietário fez um cadastro bem completo do imóvel, com a maior riqueza possível de detalhes, que vão lhe permitir saber muito sobre o imóvel e se ele está dentro do que está buscando. Boa sorte!</p>
              </section>
            }
            {anuncio === 3 &&
              <section className="anuncio-laranja">
                <p className="sub-title-anuncio">Este é um anúncio Laranja <span> <MdVerified color={'#fff'} /></span></p>
                <p>Este é um dos tipos de anúncios mais completo publicados pelo Appê Plus. Significa que o proprietário se empenhou para fazer um cadastro  bem bacana do imóvel o que traz um nível de detalhes, que irão te ajudar a conhecer bem o imóvel e se ele está dentro do que está buscando. Boa sorte!</p>
              </section>
            }
            {anuncio === 2 &&
              <section className="anuncio-azul">
                <p className="sub-title-anuncio">Este é um anúncio azul<span> <MdVerified color={'#fff'} /></span></p>
                <p>Este é um tipo de anúncio feito pelos proprietários, que traz algumas informações das características do imóvel.
                  Já é possível você ter uma ideia se o imóvel te atende ou não. Caso queira conhecer mais o imóvel, não deixe de falar com seu corretor e agendar uma visita. Boa sorte!
                </p>
              </section>
            }
            {anuncio === 1 &&
              <section className="anuncio-simples">
                <p className="sub-title-anuncio">Este é um anúncio Simples</p>
                <p>Este é o tipo de anúncio mais simples feito pelos proprietários, pois não temos todas as informações sobre o imóvel,  não sendo possível certificarmos as informações que foram passadas. Você já pode analisar alguns dados e ver imagens do imóvel,  mas ainda não é possível visitá-lo.  Se gostou, marque-o como seu favorito e acompanhe as atualizações.<br />
                  Boa sorte!

                </p>
              </section>
            }

            <section className="infos">
              <div className="row">
                <div className="col text-center">
                  <img src={Metragem} alt="metragem do apartamento" />
                  <p>{imovel?.areaTotal} m²</p>
                </div>
                {imovel?.codFinalidade == 1 ? (
                  <div className="col text-center">
                    <img src={Suites} alt="quantidade suites" />
                    <p>{imovel?.qtdeSuites} {imovel?.qtdeSuites > 1 ? 'suítes' : 'suíte'}</p>
                  </div>) : ('')}
                {imovel?.codFinalidade == 1 ? (
                  <div className="col text-center">
                    <img src={Quarto} alt="quantidade quarto" />
                    <p>{imovel?.qtdeDormitorios} {imovel?.qtdeDormitorios > 1 ? 'quartos' : 'quarto'}</p>
                  </div>) : ('')}
                <div className="col text-center">
                  <img src={Garagem} alt="quantidade de vagas de garagem" />
                  <p>{imovel?.qtdeVagasGaragem} {imovel?.qtdeVagasGaragem > 1 ? 'vagas' : 'vaga'}</p>
                </div>
              </div>
            </section>

            {anuncio !== 1 &&
              <section className="itens-imovel-plus">
                <div className="row">
                  <div className="col-lg-12">
                    <h4 className="sub-title">Detalhes do imóvel</h4>
                  </div>
                  <div className="mx-5">
                    {imovel?.conjuntoCaracteristicas ? (
                      imovel?.conjuntoCaracteristicas.length ? (
                        imovel?.conjuntoCaracteristicas.map((conjunto: iConjuntoCaracteristica, index) => (
                          <div className="col-lg-10 row-gray">
                            <div className="row col-lg-12 mt-3" key={index}>
                              <p>
                                <p style={{ fontWeight: "bold" }}><BiBuildingHouse fontSize={22} color={`#0065DD`} /> {conjunto.descConjunto}</p>
                              </p>
                            </div>
                            <div className="row col-lg-12 mx-3">
                              {conjunto.caracteristicas.map((caracteristicas, index) => (
                                <div className="col-lg-6" key={index}>
                                  <p style={{ fontSize: 16 }}><BsCheck2Circle fontSize={18} color={`#0065DD`} /> {caracteristicas.label}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : 'teste1'
                    ) : 'teste2'}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 text-center my-3">
                    {/* <button>Ver mais itens <MdKeyboardArrowDown fontSize={24}/></button> */}
                  </div>
                </div>
              </section>
            }

            {anuncio >= 3 ? (
              <section className="infos-destaques-descricao row-gray">
                <div className="d-flex justify-content-center align-items-top flex-wrap inline-block col-lg-12">
                  {imovel?.itemsDestaque ? (
                    imovel?.itemsDestaque.length ? (
                      imovel?.itemsDestaque.map((item, index) => {
                        return (
                          <div className="d-flex flex-column justify-content-center align-items-center inline-block col-lg-3 " style={{ textAlign: "center" }} key={index}>
                            <img style={{ color: `#0065DD` }} src={(item.icone ? item.icone : LogoSimples)} alt={item.descItem} />
                            <p>{item.descItem}</p>
                          </div>
                        )
                      })
                    ) : null
                  ) : null}
                </div>
              </section>
            ) : ('')}



            <section className="description">
              <div className="row">
                <div className="col-lg-12">
                  <h4 className="sub-title">Descrição do imóvel</h4>
                  <div className="mx-3">
                    <p style={{ textAlign: "justify" }}>{imovel?.descComplementar}</p>
                  </div>
                </div>
              </div>
            </section>


            <section className="itens-imovel">
              <div className="row">
                <div className="col-lg-12 col-12 ">
                  <h4 className="sub-title">Diferenciais do imóvel</h4>
                </div>
                <div className="mx-5">
                  {imovel?.conjuntoItens ? (
                    imovel?.conjuntoItens.length ? (
                      imovel?.conjuntoItens.map((conjunto: iConjuntoItens, index) => (
                        <div className="col-lg-10 row-gray">
                          <div className="row col-lg-12 mt-3">
                            <p>
                              <p style={{ fontWeight: "bold" }}><BiBuildingHouse fontSize={22} color={`#0065DD`} key={index} /> {conjunto.descConjunto}</p>
                            </p>
                          </div>
                          <div className="row col-lg-12 mx-3">
                            {conjunto.itens.map((itens, index) => (
                              <div className="col-lg-6" key={index}>
                                <p style={{ fontSize: 16 }}><BsCheck2Circle fontSize={18} color={`#0065DD`} /> {itens.label}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : 'teste1'
                  ) : 'teste2'}
                </div>
              </div>
              {/* 
              <div className="row">
                <div className="col-lg-12 text-center my-3">
                   <button>Ver mais itens <MdKeyboardArrowDown fontSize={24}/></button> 
                </div>
              </div> */}
            </section>

            {anuncio >= 3 ? (
              <section className="infos-destaques-descricao row-gray">
                <div className="d-flex justify-content-center align-items-top flex-wrap inline-block col-lg-12">
                  {imovel?.caracteristicasDestaque ? (
                    imovel?.caracteristicasDestaque.length ? (
                      imovel?.caracteristicasDestaque.map((caracteristica, index) => {
                        return (
                          <div className="d-flex flex-column justify-content-center align-items-center col-lg-3 inline-block" style={{ textAlign: "center" }} key={index}>
                            <img src={(caracteristica.icone ? caracteristica.icone : LogoSimples)} alt={caracteristica.descCaracteristicas} />
                            <p>{caracteristica.descCaracteristicas}</p>
                          </div>
                        )
                      })
                    ) : null
                  ) : null}
                </div>
              </section>
            ) : ('')}
            {/* {anuncio !== 1 &&
              <section className="itens-imovel-plus-especial">
                <div className="row">
                  <div className="col-lg-12">
                    <p className="sub-title">Detalhes que fazem este imóvel especial</p>
                  </div>
                  <div className="col-lg-6">
                    <p><BsCheck2Circle fontSize={22} color={`#0065DD`} /> Rua arborizada</p>
                  </div>
                  <div className="col-lg-6">
                    <p><BsCheck2Circle fontSize={22} color={`#0065DD`} /> Vista panorâmica</p>
                  </div>
                </div>
              </section>
            } */}

            <section className="mapa">
              <div className="row">

                <div className="col-lg-12 my-4">
                  <p>Estabelecimentos proximos</p>
                </div>
                {anuncio !== 1 &&
                  <>
                    {imovel?.estabelecimentosImovel ? (
                      imovel?.estabelecimentosImovel.length ? (
                        <div className="card-carrousel">
                          <Slider {...settingsIcons}>
                            {imovel?.estabelecimentosImovel.map((estabelecimento, index) => (
                              <div className="card-i p-4 " key={index}>

                                {estabelecimento.descEstabelecimentoImovel === 'Compras' &&
                                  <div className="card-icons d-flex flex-column justify-content-center align-items-center " style={{ border: '1px solid #FD4A19' }}>
                                    <BiCart fontSize={36} />
                                    <span>{estabelecimento.descEstabelecimentoImovel}</span>
                                    <div className="qtdlugares" style={{ border: '1px solid #FD4A19' }}><span>+{estabelecimento.qtdEstabelecimentos}</span></div>
                                  </div>
                                }
                                {estabelecimento.descEstabelecimentoImovel === 'Transporte' &&
                                  <div className="card-icons d-flex flex-column justify-content-center align-items-center " style={{ border: '1px solid #0065DD' }}>
                                    <BiBus fontSize={36} />
                                    <span>{estabelecimento.descEstabelecimentoImovel}</span>
                                    <div className="qtdlugares" style={{ border: '1px solid #0065DD' }}><span>+{estabelecimento.qtdEstabelecimentos}</span></div>
                                  </div>
                                }
                                {estabelecimento.descEstabelecimentoImovel === 'Saúde' &&
                                  <div className="card-icons d-flex flex-column justify-content-center align-items-center " style={{ border: '1px solid #C7C7C7' }}>
                                    <FaHospitalAlt fontSize={36} />
                                    <span>{estabelecimento.descEstabelecimentoImovel}</span>
                                    <div className="qtdlugares" style={{ border: '1px solid #C7C7C7' }}><span>+{estabelecimento.qtdEstabelecimentos}</span></div>
                                  </div>
                                }
                                {estabelecimento.descEstabelecimentoImovel === 'Alimentação' &&
                                  <div className="card-icons d-flex flex-column justify-content-center align-items-center " style={{ border: '1px solid #FFB30F' }}>
                                    <MdFastfood fontSize={36} />
                                    <span>{estabelecimento.descEstabelecimentoImovel}</span>
                                    <div className="qtdlugares" style={{ border: '1px solid #FFB30F' }}><span>+{estabelecimento.qtdEstabelecimentos}</span></div>
                                  </div>
                                }
                                {estabelecimento.descEstabelecimentoImovel === 'Lazer' &&
                                  <div className="card-icons d-flex flex-column justify-content-center align-items-center " style={{ border: '1px solid #FD4A19' }}>

                                    <BiFootball fontSize={36} />
                                    <span>{estabelecimento.descEstabelecimentoImovel}</span>
                                    <div className="qtdlugares" style={{ border: '1px solid #FD4A19' }}><span>+{estabelecimento.qtdEstabelecimentos}</span></div>
                                  </div>
                                }
                                {estabelecimento.descEstabelecimentoImovel === 'Educação' &&
                                  <div className="card-icons d-flex flex-column justify-content-center align-items-center " style={{ border: '1px solid #0065DD' }}>
                                    <MdSchool fontSize={36} />
                                    <span>{estabelecimento.descEstabelecimentoImovel}</span>
                                    <div className="qtdlugares" style={{ border: '1px solid #0065DD' }}><span>+{estabelecimento.qtdEstabelecimentos}</span></div>
                                  </div>
                                }

                              </div>
                            ))}
                          </Slider>
                        </div>
                      ) : null
                    ) : null}
                  </>
                }

                <div className="card-mapa">
                  <MapComponent
                    lat={latitude}
                    lng={longitude}
                  ></MapComponent>


                </div>
              </div>
            </section>
            {imovel?.bairrosProximos ? (
              imovel?.bairrosProximos.length ? (
                <section className="bairros-proximos mt-5 mb-5">
                  <div className="row">
                    <div className="col-md-12">
                      <p className="sub-title">Bairros próximos</p>
                    </div>
                    <div className="d-flex justify-content-around align-items-center flex-wrap">
                      {imovel?.bairrosProximos.map((bairro, index) => {
                        return (
                          <div className="bairros" key={index}>
                            <FiMapPin fontSize={24} />
                            <p>{bairro.label}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </section>
              ) : null
            ) : null}
          </div>
          <div className="col-lg-4 position-relative">
            <div className="card-detalhes">
              <div className="share d-flex justify-content-between align-items-center">
                <div className="links">
                  {linkClicado ? (
                    <button type="button" className="copy" onClick={copyLink} style={{ color: "#0065DD" }}>Copiar link <MdContentCopy fontSize={24} /></button>
                  ) : (
                    <button type="button" className="copy" onClick={copyLink} >Copiar link <MdContentCopy fontSize={24} /></button>
                  )}

                  <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModalShere"><BsShare fontSize={24} /></button>
                </div>
                {usuario.token && (
                  <button className={`compartilhar ${imovelFavorito ? 'ativo' : 'inativo'}`} onClick={!imovelFavorito ? adicionarFavorito : removerFavorito}>
                    <MdFavoriteBorder fontSize={20} />

                  </button>
                )}

              </div>
              {imovel?.qtdeVisualizacoes ? (
                <div className="visualizacao d-flex align-items-center justify-content-around">
                  <IoEyeSharp color={`#0065DD`} fontSize={24} /><p><span>{imovel?.qtdeVisualizacoes}</span> {imovel?.qtdeVisualizacoes > 1 ? ' pessoas' : ' pessoa'} estão vendo este imóvel</p>
                </div>
              ) : null}

              <div className="valor">
                <h2 className="m-0">R$ {imovel?.valorVendaOriginal && moeda(imovel?.valorVendaOriginal)}</h2>
              </div>
              <div className="valores row">
                {(imovel?.valorIptu) ?
                  (
                    <div className="col">
                      <p>IPTU</p>
                      <h4>R$ {moeda(imovel?.valorIptu)}</h4>
                    </div>
                  ) : null}
                {(imovel?.valorCondominio) ? (
                  <div className="col">
                    <p>Condomínio</p>
                    <h4>R$ {moeda(imovel?.valorCondominio)}</h4>
                  </div>
                ) : null}
              </div>


              <div className="financiamento">
                <form onSubmit={SimularFinanciamento}>
                  <div className="row mt-1">
                    <div className="col-7 d-flex ">
                      <p className="m-auto">Valor de entrada:</p>
                    </div>
                    <div className="col-5 ">
                      <input type="text" value={valorEntrada} placeholder="0" onChange={event => setValorEntrada(event.target.value)} className="form-control" />
                    </div>
                    <div className="col-12 mt-3">
                      <label >{Math.trunc((Number(valorEntrada) / (imovel?.valorVendaOriginal / 100))) + "%"}</label>
                      <input type="range" className="form-range" min={0} max={imovel?.valorVendaOriginal} value={valorEntrada} onChange={changeEvent => setValorEntrada(changeEvent.target.value)} />
                    </div>

                  </div>
                  <div className="row mt-4">
                    <div className="col-7 d-flex ">
                      <p className="m-auto">Nº de parcelas mensais:</p>
                    </div>
                    <div className="col-5">
                      <input type="text" className="form-control" value={qtdParcelas} onChange={event => setQtdParcelas(Number(event.target.value))} />
                    </div>
                    <div className="col-12 mt-3">
                      <input type="range" className="form-range" min="0" max="360" step="1" value={qtdParcelas} onChange={changeEvent => setQtdParcelas(Number(changeEvent.target.value))} />
                    </div>
                    <div className="col-lg-6 mt-6">
                      <div className="mb-3">
                        <label htmlFor="inputDataNascimento" className="form-label">Data de nascimento:</label>
                        <input
                          required
                          maxLength={10}
                          type="text"
                          className="form-control"
                          id="inputDataNascimento"
                          value={dateNascMask(dtAniversario)}
                          onChange={event => setDtAniversario(event.target.value)}

                        />
                      </div>
                    </div>

                    <div className="col-lg-6 mt-6">
                      <div className="mb-3">
                        <label htmlFor="inputRenda" className="form-label">Renda mensal: (R$)</label>
                        <input
                          required
                          type="text"
                          className="form-control"
                          id="inputRenda"
                          value={moeda(rendaMensal)}
                          onChange={event => setRendaMensal(event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-grid my-3">
                    {(rendaMensal && dtAniversario !== "") ? (
                      <>
                        <button className="simular-financiamento" data-bs-toggle="modal"
                          data-bs-target="#modalSimulador">Simular Financiamento</button>

                      </>
                    ) : (
                      <>
                        <button className="simular-financiamento">Simular Financiamento</button>
                      </>
                    )}



                  </div>
                </form>
              </div>
              <hr />
              <div className="visita">
                {anuncio === 1 ? (
                  <div className="content-visita">
                    <div className="content-title d-flex justify-content-between align-items-center">
                      <span><MdOutlineWatchLater fontSize={24} /></span><p>Este é um anúncio ainda está em construção</p>
                    </div>
                    <div className="content-atencao">
                      <p>Mas peraí! Você ainda pode favoritar o anúncio e ser o primeiro a saber quando esse anúncio ficar disponível</p>
                      <div className="text-center">
                        <button type="submit">Avise-me quando disponível</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {imovel?.codClienteVendedor === usuario.codCliente ? (
                      <div className="text-center">
                        <p>Esse imóvel foi cadastrado por você !</p>
                      </div>

                    ) : (
                      <>
                        {usuario.token ? (
                          <div className="text-center">
                            <button className="button-agenda" data-bs-toggle="modal"
                              data-bs-target="#modalCorretor" onClick={GetCorretorImovel}>Quero Visitar <BsFillCalendarCheckFill /></button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <button className="button-agenda" data-bs-toggle="modal"
                              data-bs-target="#modalLoginImovel" >Quero Visitar <BsFillCalendarCheckFill /></button>
                          </div>
                        )}

                      </>
                    )}
                  </>

                )}

              </div>

            </div>
          </div>
        </div>
      </div>
      <section className="corretor-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="destaque-corretor-footer">
                <img src={Corretor} alt="corretor-footer" />
                <div className="content-title">
                  <h4>Por que escolher um corretor?</h4>
                </div>
                <div className="content">
                  <div className="content-text">
                    <p>Porque no Appê Plus, valorizamos a importância do corretor na intermediação imobiliária. São profissionais preparados e qualificados para ajudar proprietários e compradores, a chegarem a uma melhor negociação que atenda às suas necessidades e você ainda pode escolher o corretor que mais se encaixa ao seu perfil. Aproveite e tenha uma experiência Plus!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="modal fade" id="modalSimulador" tabIndex={-1} aria-labelledby="modalSimuladorLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modalSimuladorLabel">Simulação de financiamento</h4>
              <button type="button" className="close" data-bs-dismiss="modal" >X</button>
            </div>
            <div className="modal-body">
              {loading
                ? <Loading />
                : erroSimulador
                  ? <p>{msgErro}</p>
                  : <ModalFinanciamento financiamentos={financiamentos} valorEntrada={valorEntrada} valorImovel={imovel?.valorVendaOriginal} qtdParcelas={qtdParcelas} />
              }
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModalShere" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Compartilhe com seus amigos:</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body d-flex justify-content-around align-items-center ">
              <FacebookShareButton
                url={shareUrl}
                quote={`Imóvel compartilhado do AppePlus:\n ${imovel?.descTipoImovel} ${imovel?.endereco}, ${imovel?.cidade}, ${imovel?.bairro}.`}
              >
                <FacebookIcon size={42} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={shareUrl}
                title={`Imóvel compartilhado do AppePlus:${imovel?.descTipoImovel} ${imovel?.endereco}, ${imovel?.cidade}, ${imovel?.bairro}.`}
              >
                <TwitterIcon size={42} round />
              </TwitterShareButton>

              <EmailShareButton
                url={shareUrl}
                subject={`AppePlus - ${imovel?.descTipoImovel} ${imovel?.endereco}, ${imovel?.cidade}, ${imovel?.bairro}`}
                body={`Imóvel compartilhado do AppePlus.\n ${imovel?.descTipoImovel} ${imovel?.endereco}, ${imovel?.cidade}, ${imovel?.bairro}.\n`} >
                <EmailIcon size={42} round />
              </EmailShareButton>

              <WhatsappShareButton
                url={shareUrl}
                title={`Imóvel compartilhado do AppePlus:\n${imovel?.descTipoImovel} ${imovel?.endereco}, ${imovel?.cidade}, ${imovel?.bairro}.`}
              >
                <WhatsappIcon size={42} round />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade bd-example-modal-lg" id="modalCorretor" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog modal-fullscreen-sm-down modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel">Agendamento</h4>
              <button type="button" className="close" data-bs-dismiss="modal" >X</button>
            </div>
            <div className="modal-body">
              <div className="filter-corretor">
                <p>Escolha seu corretor</p>
                <label>Para sua melhor experiência,  na busca pelo seu imóvel ideal, você conta com um dos nossos corretores parceiros para te acompanhar na visita e ajudar em todo seu processo de Compra. Você manter o corretor que escolheu ao fazer seu cadastro, escolher o mesmo corretor que captou o imóvel ou ainda escolher um novo corretor, entre aqueles mais especializados neste tipo de imóvel</label>
                <div className="row">
                  <div className="col-lg-8 mx-auto">
                    <form className="form-inline">
                      {/* <div className="input-group">
                        <div className="input-group-prepend">
                          <button className="input-group-text" id="basic-addon1"><FiSearch fontSize={24} color={'#adadad'} /></button>
                        </div>
                        <input type="text" className="form-control" placeholder="Busque por nome, Creci ou tipo de corretor" aria-label="Username" aria-describedby="basic-addon1" />
                      </div> */}
                    </form>
                  </div>
                </div>
              </div>
              <div className="content-corretor-modal">
                <p className="title-corretor">Corretor do imóvel</p>
                <div className="row">
                  <div className="col-lg-6">
                    {
                      loadingCorretor ?
                        <Loading />
                        : (
                          corretores.map((corretor, index) => {
                            return (
                              <div onClick={() => selecaoCorretorImovel(corretor.codCorretor)} key={index}>
                                <SelecaoCorretor

                                  codCorretor={corretor.codCorretor}
                                  codUsuario={corretor.codUsuario}
                                  nomeCompleto={corretor.nomeCompleto}
                                  numeroCreci={corretor.numeroCreci}
                                  dtCadastro={corretor.dtCadastro}
                                  pontuacaoAtual={corretor.pontuacaoAtual}
                                  mediaAvaliacao={corretor.mediaAvaliacao}
                                  imoveisNoAppePlus={corretor.imoveisNoAppePlus}
                                  img={corretor.img ? corretor.img[0] : ''}
                                  corretorImovel={corretorImovel}
                                  nomeSocial={corretor.nomeSocial}
                                  selecionado={(corretor.codCorretor == corretorSelecionado)}
                                />

                              </div>

                            )

                          })
                        )
                    }


                  </div>
                </div>
                {corretorImovel &&
                  <div className="row mt-3">
                    <div className="col-6">
                      <p>Escolha a sua data:</p>
                      {loadingHorarios ? (<Loading />) : (
                        <select className="form-select form-select-sm" required onChange={event => setDiaEscolhido(event.target.value)} aria-label=".form-select-sm example">
                          <option value="">Data da visita</option>
                          {diasDisponiveisVisita.map((dia, index) => {
                            return (
                              <option key={index} value={dia.diaDisponivel}>
                                {dia.diaDisponivel}
                              </option>
                            )
                          })}

                        </select>
                      )}
                    </div>
                    <div className="col-6">
                      <p>Escolha o melhor horário</p>
                      {loadingHorarios ? (<Loading />) : (
                        <select className="form-select form-select-sm" onChange={event => setHoraEscolhida(event.target.value)} aria-label=".form-select-sm example">
                          <option value="">Horario da visita</option>
                          {diasDisponiveisVisita.map(horario =>
                            horario.diaDisponivel === diaEscolhido && horario.horariosDisponiveis.map((hora, index) => {
                              return (
                                <option key={index} value={hora}>{hora}</option>
                              )
                            })
                          )}

                        </select>)}

                    </div>
                  </div>
                }


                {!!topCorretores.length && (<><hr /><p className="title-corretor">Os melhores corretores na região do imóvel</p></>)}
                <div className="row">
                  {topCorretores.length > 1 ? (
                    <div className="col-lg-12">
                      {
                        loadingCorretor ?
                          <Loading />
                          : (
                            <>
                              <Slider {...settingsModal} >
                                {topCorretores.map((topCorretor, index) => {
                                  return (
                                    <div onClick={() => selecaoTopCorretor(topCorretor.codCorretor)}>
                                      <SelecaoCorretor
                                        key={index}
                                        codCorretor={topCorretor.codCorretor}
                                        codUsuario={topCorretor.codUsuario}
                                        nomeCompleto={topCorretor.nomeCompleto}
                                        numeroCreci={topCorretor.numeroCreci}
                                        dtCadastro={topCorretor.dtCadastro}
                                        pontuacaoAtual={topCorretor.pontuacaoAtual}
                                        mediaAvaliacao={topCorretor.mediaAvaliacao}
                                        imoveisNoAppePlus={topCorretor.imoveisNoAppePlus}
                                        img={topCorretor.img[0]}
                                        topCorretorImovel={topCorretor.codCorretor == getTopCorretorCodigoNumber && topCorretorImovel}
                                        nomeSocial={topCorretor.nomeSocial}
                                        selecionado={(topCorretor.codCorretor == corretorSelecionado)}
                                      />
                                    </div>
                                  )
                                })}
                              </Slider>
                            </>
                          )
                      }
                    </div>
                  ) : (
                    <div className="col-lg-6">
                      {/* <Slider  {...settingsModal}>
                          <div onClick={selecaoTopCorretor}>
                            <SelecaoCorretor
                            topCorretorImovel={topCorretorImovel}
                            />
                          </div>
                          <div onClick={selecaoTopCorretor}>
                            <SelecaoCorretor
                            topCorretorImovel={topCorretorImovel}
                            />
                          </div>
                          <div onClick={selecaoTopCorretor}>
                            <SelecaoCorretor
                            topCorretorImovel={topCorretorImovel}
                            />
                          </div>
                        </Slider> */}
                      {topCorretores.map((topCorretor, index) => {
                        return (
                          <div onClick={() => selecaoTopCorretor(topCorretor.codCorretor)} key={index}>
                            <SelecaoCorretor

                              codCorretor={topCorretor.codCorretor}
                              codUsuario={topCorretor.codUsuario}
                              nomeCompleto={topCorretor.nomeCompleto}
                              numeroCreci={topCorretor.numeroCreci}
                              dtCadastro={topCorretor.dtCadastro}
                              pontuacaoAtual={topCorretor.pontuacaoAtual}
                              mediaAvaliacao={topCorretor.mediaAvaliacao}
                              imoveisNoAppePlus={topCorretor.imoveisNoAppePlus}
                              img={topCorretor.img[0]}
                              topCorretorImovel={topCorretor.codCorretor == getTopCorretorCodigoNumber && topCorretorImovel}
                              nomeSocial={topCorretor.nomeSocial}
                              selecionado={(topCorretor.codCorretor == corretorSelecionado)}
                            />
                          </div>
                        )
                      })}

                    </div>
                  )}
                </div>
                {getTopCorretor &&
                  <div className="row mt-3">
                    <div className="col-6">
                      <p>Escolha a sua data:</p>
                      {loadingHorarios ? (<Loading />) : (
                        <select className="form-select form-select-sm" required onChange={event => setDiaEscolhido(event.target.value)} aria-label=".form-select-sm example">
                          <option value="">Data da visita</option>
                          {diasDisponiveisVisita.map((dia, index) => {
                            return (
                              <option key={index} value={dia.diaDisponivel}>
                                {dia.diaDisponivel}
                              </option>
                            )
                          })}

                        </select>
                      )}
                    </div>
                    <div className="col-6">
                      <p>Escolha o melhor horário</p>
                      {loadingHorarios ? (<Loading />) : (
                        <select className="form-select form-select-sm" onChange={event => setHoraEscolhida(event.target.value)} aria-label=".form-select-sm example">
                          <option value="">Horario da visita</option>
                          {diasDisponiveisVisita.map(horario =>
                            horario.diaDisponivel === diaEscolhido && horario.horariosDisponiveis.map((hora, index) => {
                              return (
                                <option key={index} value={hora}>{hora}</option>
                              )
                            })
                          )}

                        </select>
                      )}
                    </div>
                  </div>
                }
                <hr />
                <p className="title-corretor">Corretores com os quais você já teve contato</p>
                <div className="row">
                  {historicoCorretores === null ? (
                    <div className="col-lg-12">
                      <p>Você ainda não entrou em contato com nenhum corretor</p>
                    </div>
                  ) : (
                    <>
                      <div className="col-lg-12">
                        {
                          loadingCorretor ?
                            <Loading />
                            : (
                              <Slider {...settingsModal} >
                                {historicoCorretores.map((hCorretor, index) => {
                                  return (
                                    <div onClick={() => selecaoHistoricoCorretor(hCorretor.codCorretor)} key={index}>
                                      <SelecaoCorretor

                                        codCorretor={hCorretor.codCorretor}
                                        codUsuario={hCorretor.codUsuario}
                                        nomeCompleto={hCorretor.nomeCompleto}
                                        numeroCreci={hCorretor.numeroCreci}
                                        dtCadastro={hCorretor.dtCadastro}
                                        pontuacaoAtual={hCorretor.pontuacaoAtual}
                                        mediaAvaliacao={hCorretor.mediaAvaliacao}
                                        imoveisNoAppePlus={hCorretor.imoveisNoAppePlus}
                                        img={hCorretor.img[0]}
                                        historicoCorretorImovel={hCorretor.codCorretor == getHistoricoCorretorCodigoNumber && historicoCorretorImovel}
                                        nomeSocial={hCorretor.nomeSocial}

                                      />
                                    </div>
                                  )
                                })}
                              </Slider>
                            )
                        }
                      </div>
                      {getHistoricoCorretor &&
                        <div className="row mt-3">
                          <div className="col-6">
                            <p>Escolha a sua data:</p>
                            {loadingHorarios ? (<Loading />) : (
                              <select className="form-select form-select-sm" required onChange={event => setDiaEscolhido(event.target.value)} aria-label=".form-select-sm example">
                                <option value="">Data da visita</option>
                                {diasDisponiveisVisita.map((dia, index) => {
                                  return (
                                    <option key={index} value={dia.diaDisponivel}>
                                      {dia.diaDisponivel}
                                    </option>
                                  )
                                })}

                              </select>
                            )}
                          </div>
                          <div className="col-6">
                            <p>Escolha o melhor horário</p>
                            {loadingHorarios ? (<Loading />) : (
                              <select className="form-select form-select-sm" onChange={event => setHoraEscolhida(event.target.value)} aria-label=".form-select-sm example">
                                <option value="">Horario da visita</option>
                                {diasDisponiveisVisita.map(horario =>
                                  horario.diaDisponivel === diaEscolhido && horario.horariosDisponiveis.map((hora, index) => {
                                    return (
                                      <option key={index} value={hora}>{hora}</option>
                                    )
                                  })
                                )}
                              </select>
                            )}
                          </div>
                        </div>
                      }
                    </>
                  )}
                </div>
                {/* <p className="termos">Para fazer o agendamento é necessário aceitar os termos clicando <button className="button-termos" onClick={() => setContentTermos(true)} >aqui!</button></p>
                {contentTermos &&
                  <div className="content-corretor-termos">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor lacus est, at bibendum elit imperdiet ac. Vivamus non neque nec magna ultricies posuere in a nunc. Donec euismod nunc nec dolor tempor, eu tincidunt erat varius. Vestibulum ut mauris non diam aliquet sagittis. Vestibulum efficitur ante sed auctor rhoncus. Vestibulum sit amet sem et enim consectetur fermentum. Sed ac tellus sit amet purus hendrerit feugiat a nec nunc. Pellentesque ex magna, sollicitudin id fermentum a, facilisis at leo. Aliquam vulputate hendrerit elit, quis fermentum metus rutrum vitae. Aliquam sit amet rhoncus felis. Suspendisse consectetur vel leo a tincidunt. Nulla ac nunc et nisl semper fringilla ut ut nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam sed efficitur nisl. Aliquam dapibus, nunc consequat viverra semper, justo elit accumsan nunc, quis gravida nisl sem vitae ante. Aenean rhoncus bibendum elit, viverra faucibus lacus aliquet sed.
                      Aliquam dapibus condimentum tortor. Quisque eget eros eget tortor tincidunt mattis non sed nunc. Phasellus eget feugiat nisi. Ut pharetra leo cursus, suscipit eros nec, posuere lacus. Praesent nibh neque, maximus tristique gravida lobortis, commodo id ex. Nulla in dolor nec risus imperdiet laoreet eget ut urna. Proin volutpat volutpat tincidunt. Duis euismod congue lacus, id pharetra augue luctus sit amet. Sed convallis eu felis et euismod.
                      Mauris in dui nec purus sollicitudin sagittis. Praesent luctus turpis et neque tincidunt scelerisque. Aenean id pharetra sem. Cras egestas nisi bibendum magna congue, ac dignissim erat bibendum. Nullam rhoncus nunc ex, nec fermentum purus aliquam at. Nam tempor blandit elit eget mattis. Proin facilisis risus vitae tellus tristique, ut porta odio lacinia. Nulla facilisi. Vivamus efficitur velit non feugiat fermentum.
                      Nam eget dictum est. Donec quam quam, convallis quis auctor ultrices, scelerisque mollis sem. Aenean ut nibh id lectus aliquet aliquam. Nulla molestie placerat nunc. Donec dui quam, cursus eu lectus et, euismod aliquam elit. Phasellus a luctus velit, id tincidunt est. In eu velit sem. Proin dolor leo, feugiat sit amet vulputate fringilla, cursus euismod felis.
                      Suspendisse porttitor lacus tortor. Vestibulum ac leo in odio pretium accumsan. Praesent venenatis augue sed mi viverra cursus. Duis at est ac velit posuere pulvinar. Vestibulum ac aliquam sem. Integer suscipit tellus ac lorem iaculis porttitor. Donec posuere nulla et iaculis posuere. Phasellus vel condimentum leo, a sodales ex.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor lacus est, at bibendum elit imperdiet ac. Vivamus non neque nec magna ultricies posuere in a nunc. Donec euismod nunc nec dolor tempor, eu tincidunt erat varius. Vestibulum ut mauris non diam aliquet sagittis. Vestibulum efficitur ante sed auctor rhoncus. Vestibulum sit amet sem et enim consectetur fermentum. Sed ac tellus sit amet purus hendrerit feugiat a nec nunc. Pellentesque ex magna, sollicitudin id fermentum a, facilisis at leo. Aliquam vulputate hendrerit elit, quis fermentum metus rutrum vitae. Aliquam sit amet rhoncus felis. Suspendisse consectetur vel leo a tincidunt. Nulla ac nunc et nisl semper fringilla ut ut nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam sed efficitur nisl. Aliquam dapibus, nunc consequat viverra semper, justo elit accumsan nunc, quis gravida nisl sem vitae ante. Aenean rhoncus bibendum elit, viverra faucibus lacus aliquet sed.
                      Aliquam dapibus condimentum tortor. Quisque eget eros eget tortor tincidunt mattis non sed nunc. Phasellus eget feugiat nisi. Ut pharetra leo cursus, suscipit eros nec, posuere lacus. Praesent nibh neque, maximus tristique gravida lobortis, commodo id ex. Nulla in dolor nec risus imperdiet laoreet eget ut urna. Proin volutpat volutpat tincidunt. Duis euismod congue lacus, id pharetra augue luctus sit amet. Sed convallis eu felis et euismod.
                      Mauris in dui nec purus sollicitudin sagittis. Praesent luctus turpis et neque tincidunt scelerisque. Aenean id pharetra sem. Cras egestas nisi bibendum magna congue, ac dignissim erat bibendum. Nullam rhoncus nunc ex, nec fermentum purus aliquam at. Nam tempor blandit elit eget mattis. Proin facilisis risus vitae tellus tristique, ut porta odio lacinia. Nulla facilisi. Vivamus efficitur velit non feugiat fermentum.
                      Nam eget dictum est. Donec quam quam, convallis quis auctor ultrices, scelerisque mollis sem. Aenean ut nibh id lectus aliquet aliquam. Nulla molestie placerat nunc. Donec dui quam, cursus eu lectus et, euismod aliquam elit. Phasellus a luctus velit, id tincidunt est. In eu velit sem. Proin dolor leo, feugiat sit amet vulputate fringilla, cursus euismod felis.
                      Suspendisse porttitor lacus tortor. Vestibulum ac leo in odio pretium accumsan. Praesent venenatis augue sed mi viverra cursus. Duis at est ac velit posuere pulvinar. Vestibulum ac aliquam sem. Integer suscipit tellus ac lorem iaculis porttitor. Donec posuere nulla et iaculis posuere. Phasellus vel condimentum leo, a sodales ex.
                    </p>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" onChange={() => setTermos(true)} id="flexRadioDefault1" />
                      <label className="form-check-label" >
                        Sim, Aceito os termos
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" onChange={() => setTermos(false)} id="flexRadioDefault2" />
                      <label className="form-check-label" >
                        Não, aceito os termos
                      </label>
                    </div>
                  </div>
                } */}
              </div>


            </div>

            <div>

            </div>
            {alertErro && (
              <Alert msg={msgErro} setAlertErro={setAlertErro} />
            )}
            <div className="modal-footer">
              {
                agendouComSucesso ? (
                  <button type="button" disabled className="btn btn-primary" onClick={AgendarVisita}> Agendamento confirmado </button>
                ) : (
                  <>
                    {loading ? (
                      <button type="button" className="btn btn-primary" onClick={AgendarVisita}> Agendando <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> </button>
                    ) : (
                      <button type="button" className="btn btn-primary" onClick={AgendarVisita}> Agendar </button>
                    )}
                  </>

                )
              }

            </div>
          </div>
        </div>
      </div>
      <div className="modal fade bd-example-modal-lg" id="modalLoginImovel" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog " role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Agendamento</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h2>Ops! Parece que você não esta logado.</h2>
              <p>Para efetuar o agendamento é preciso fazer o <button className="cadastro-button" onClick={() => history.push('/cadastro/anuncio')} data-bs-dismiss="modal" >cadastro</button>, ou se já possui realizar o login.</p>
            </div>
            <div className="modal-footer text-center">
              <button type="button" className="btn btn-primary login-imovel" data-bs-toggle="modal" data-bs-target="#modalLogin"> Login</button>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DetalhesImovel
