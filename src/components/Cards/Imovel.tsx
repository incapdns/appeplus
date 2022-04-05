import { iDadosUsuario, iImoveis } from "../../@types";
import {
  MdVerified,
  MdSingleBed,
  MdPhotoSizeSelectSmall,
  MdFavoriteBorder,
} from "react-icons/md";
import { RiArrowRightCircleFill, RiArrowLeftCircleFill } from "react-icons/ri";
import { moeda } from "../../utils/Masks";
import ImgDefault from "../../assets/Logo/HorizontalBlack.svg";
import Gafisa from "../../assets/Home/gafisa.png";

import "../../styles/components/Cards/imovel.scss";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";
import LogoBlack from "../../assets/Logo/HorizontalBlack.svg";
import api from "../../services/api";
import { useEffect, useState } from "react";
interface iImovelCard extends iImoveis {
  lancamento?: boolean;
}

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
const usuario: iDadosUsuario = JSON.parse(
  localStorage.getItem('@appePlus/usuario') || '{}'
);

export default function CardImovel(props: iImovelCard) {
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

  function GoToPage() {
    history.push(`/imovel/${props.codImovel}`);
  }
  async function GetImovelFavorito() {
    if(usuario.codCliente){
      await api.get('imovel/favorito', {
        params: {
          CodImovel: Number(props.codImovel),
          CodCliente: usuario.codCliente
        }
      })
        .then(response => {
          
          if (response.data.data.favorito == true) {
            console.log(response.data.data.favorito)
            setImovelFavorito(true);
          }else{
            console.log(response.data.data.favorito)
            setImovelFavorito(false)
          }
        })
        .catch(error => {
          console.log("Ocorreu um erro");
          setImovelFavorito(false);
        })
    }
   
  }
  
async function adicionarFavorito() {
  if (usuario.token) {
    if(!imovelFavorito){
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
    if(imovelFavorito){
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
    <div className="card" id="cardImovel">
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

      {usuario.token && (
        <button className={`${imovelFavorito ? 'button-favorite-active ':' button-favorite'}`} onClick={!imovelFavorito ?adicionarFavorito : removerFavorito}>
        <MdFavoriteBorder />
      </button>
      )}
      <div className="card-body" onClick={GoToPage}>
        {props.lancamento && (
          <img
            src={LogoBlack}
            alt="AppePlus"
            className="img-fluid logo-parceiro"
          />
        )}
        <p className="card-type">{props.descTipoImovel}</p>
        <h5 className="card-title">{props.endereco}</h5>
        <p className="card-bairro">{props.bairro}</p>
        <div className="icons">
          <div className="box-icon">
            <MdPhotoSizeSelectSmall className="icon" />
            {props.areaTotal} m²
          </div>
          <div className="box-icon">
            <MdSingleBed className="icon" />
            {props.qtdeDormitorios} quartos
          </div>
          {props.codStatusAnuncio !== 0 && (
            <div className="box-icon">
              {props.codStatusAnuncio === 1 && (
                <MdVerified className="icon simples" />
              )}
              {props.codStatusAnuncio === 2 && (
                <MdVerified className="icon azul" />
              )}
              {props.codStatusAnuncio === 3 && (
                <MdVerified className="icon laranja" />
              )}
              {props.codStatusAnuncio === 4 && (
                <MdVerified className="icon black" />
              )}
              certificado
            </div>
          )}
        </div>
        <p className="card-preco">
          R$ {moeda(props.valorVendaOriginal)}
        </p>
      </div>
    </div>
  );
}
