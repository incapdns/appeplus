import { iCardImoveisPesquisados, iDadosUsuario } from "../../@types";
import {
  MdVerified,
  MdSingleBed,
  MdPhotoSizeSelectSmall,
  MdFavoriteBorder,
  MdDirectionsCarFilled,
} from "react-icons/md";
import { moeda } from "../../utils/Masks";
import ImgDefault from "../../assets/Logo/HorizontalBlack.svg";
import Gafisa from "../../assets/Home/gafisa.png";
import { RiArrowRightCircleFill, RiArrowLeftCircleFill } from "react-icons/ri";

import "../../styles/components/Cards/imovelcardanuncio.scss";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";

const usuario: iDadosUsuario = JSON.parse(
  localStorage.getItem('@appePlus/usuario') || '{}'
);



function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <RiArrowRightCircleFill size={22} />
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
      <RiArrowLeftCircleFill size={22} />
    </div>
  );
}

export function CardImovelPesquisado(props: iCardImoveisPesquisados) {
  const history = useHistory();
  const settingsCard = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    className: "slides-card",
  };

  const [imovelFavorito, setImovelFavorito] = useState(false);

  function PaginaDoImovel() {
    history.push(`/imovel/${props.codImovel}`);
  }

  function enviarProposta(codImovel: any) {
    const codigoImovel = codImovel;
    localStorage.setItem('PropostaImovel', codigoImovel)
    history.push('/cadastro/proposta');

  }

  //  async function desfavoritarImovel(){
  //   await api.post(`historico-visualizacao/favorito`,{
  //     codCliente: String(usuario.codCliente),
  //     codImovel: String(props.codImovel),
  //     favorito: false
  //   }).then(response => {
  //     if(response.data.success){
  //       window.location.reload();
  //     }
  //   }).catch(error => {
  //     console.log(error)
  //   })
  //   }

  async function GetImovelFavorito() {
    if (usuario.codCliente !== null) {
      await api.get('imovel/favorito', {
        params: {
          CodImovel: Number(props.codImovel),
          CodCliente: usuario.codCliente
        }
      })
        .then(response => {
          let favorito = response.data.data.favorito
          setImovelFavorito(favorito)
        })
        .catch(error => {
          console.log("Ocorreu um erro");
          setImovelFavorito(false);
        })
    }
  }

  async function adicionarFavorito() {
    if (usuario.token) {
      if (!imovelFavorito) {
        await api.post('historico-visualizacao/favorito', {
          codCliente: Number(usuario.codCliente),
          codImovel: Number(props.codImovel),
          favorito: true
        }).then(response => {
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
          codCliente: Number(usuario.codCliente),
          codImovel: Number(props.codImovel),
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

  useEffect(()=>{
    GetImovelFavorito()
  },[])



  return (
    <div
      className="card"
      id="ImovelCardAnuncio"
      style={{
        display: "flex",
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: "auto",
        marginBottom: "auto",
      }}
    >
      {props.imgsDoImovel?.length ? (
        <Slider {...settingsCard}>
          {props.imgsDoImovel.map((img) => {
            return (
              <div key={img}>
                <img
                  src={img}
                  className="card-img-top"
                  alt={`${props.endereco}, ${props.bairro}, ${props.cidade}`}
                />
              </div>
            );
          })}
        </Slider>
      ) : (
        <div className="card-img-top default">
          <img
            src={ImgDefault}
            className="deafult"
            alt={`${props.endereco}, ${props.bairro}, ${props.cidade}`}
          />
        </div>
      )}
      <button className={`${imovelFavorito ? 'button-favorite-active' : 'button-favorite'}`} onClick={!imovelFavorito ? adicionarFavorito : removerFavorito}>
        <MdFavoriteBorder />
      </button>
      <div className="card-body card-imovel-pesquisado">
        <div className="tipo">
          <p className="card-type">{props.descTipoImovel}</p>
          {/* {props.codStatusAnuncio !== 0 && (
            <div className="box-icon">
              {props.codStatusAnuncio === 1 && <MdVerified className="icon simples" />}
              {props.codStatusAnuncio === 2 && <MdVerified className="icon azul" />}
              {props.codStatusAnuncio === 3 && <MdVerified className="icon laranja" />}
              {props.codStatusAnuncio === 4 && <MdVerified className="icon black" />}
            </div>
          )} */}
          {/* <MdVerified className="icon simples" /> */}
        </div>

        <h5 className="card-title">{props.endereco}</h5>
        <p className="card-bairro">
          {props.bairro} - {props.cidade}
        </p>
        <div className="icons">
          <div className="box-icon">
            <MdPhotoSizeSelectSmall className="icon" />
            {props.areaTotal} m²
          </div>
          <div className="box-icon">
            <MdSingleBed className="icon" />
            {props.qtdeDormitorios} quartos
          </div>
          <div className="box-icon">
            <MdDirectionsCarFilled className="icon" />
            {props.qtdeVagasGaragem} vagas
          </div>
        </div>
        <p className="card-preco">
          R$ {moeda(props.valorVendaOriginal)}
        </p>
      </div>
      <div className="card-footer">
        <button className="btn btn-outline-dark" type="button" onClick={() => enviarProposta(props.codImovel)}>
          Enviar proposta
        </button>
        <button className="btn btn-link" type="button" onClick={PaginaDoImovel}>
          Consultar
        </button>
      </div>
    </div>
  );
}
