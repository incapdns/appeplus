import { iImoveis } from '../../@types';
import {
  MdVerified,
  MdSingleBed,
  MdPhotoSizeSelectSmall,
  MdFavoriteBorder
} from "react-icons/md";
import { moeda } from '../../utils/Masks';
import ImgDefault from '../../assets/Logo/HorizontalBlack.svg';
import Gafisa from '../../assets/Home/gafisa.png';
import {
  RiArrowRightCircleFill,
  RiArrowLeftCircleFill
} from "react-icons/ri";

import '../../styles/components/Cards/imovelcardanuncio.scss';
import Slider from 'react-slick';
import { useHistory } from 'react-router-dom';
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

export default function ImovelCardAnuncio(props: iImovelCard) {
  const history = useHistory();
  const settingsCard = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    className: "slides-card"
  };

  function GoToPage() {
    // history.push(`/imovel/${props.codImovel}`,'_blank');
    const win = window.open(`/imovel/${props?.codImovel}`, "_blank");
    win?.focus();
  }

  return (
    <div className="card" id="ImovelCardAnuncio" style={{ display: "flex", marginRight: "auto", marginLeft: "auto", marginTop: "auto", marginBottom: "auto" }}>
      {props.imgsDoImovel?.length
        ? (
          <Slider {...settingsCard}>
            {props?.imgsDoImovel.map(img => {
              return (
                <div key={img}>
                  <img
                    src={img}
                    className="card-img-top"
                    alt={`${props?.endereco}, ${props?.bairro}, ${props?.cidade}`}
                  />
                </div>
              )
            })}
          </Slider>
        )
        : (
          <div className="card-img-top default">
            <img
              src={ImgDefault}
              className="deafult"
              alt={`${props?.endereco}, ${props?.bairro}, ${props?.cidade}`}
            />
          </div>
        )
      }

      <div className="card-body" onClick={GoToPage}>
        {props?.lancamento && <img src={Gafisa} alt="Gafisa" className="img-fluid logo-parceiro" />}
        <p className="card-type">{props?.descTipoImovel}</p>
        <h5 className="card-title">{props?.endereco}</h5>
        <p className="card-bairro">{props?.bairro}</p>
        <div className="icons">
          <div className="box-icon">
            <MdPhotoSizeSelectSmall className="icon" />
            {props?.areaTotal} m²
          </div>
          <div className="box-icon">
            <MdSingleBed className="icon" />
            {props?.qtdeDormitorios} quartos
          </div>
          {props?.codStatusAnuncio !== 0 && (
            <div className="box-icon">
              {props?.codStatusAnuncio === 1 && <MdVerified className="icon simples" />}
              {props?.codStatusAnuncio === 2 && <MdVerified className="icon azul" />}
              {props?.codStatusAnuncio === 3 && <MdVerified className="icon laranja" />}
              {props?.codStatusAnuncio === 4 && <MdVerified className="icon black" />}
              certificado
            </div>
          )}

        </div>
        <p className="card-preco">R$ {moeda(props?.valorVendaOriginal)}</p>
      </div>
    </div>

  );
}