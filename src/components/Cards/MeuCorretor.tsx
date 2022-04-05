import '../../styles/components/Cards/meuCorretor.scss';
import ImgCorretor from '../../assets/internas/corretor-card-selecao.png';
import Imovel from '../../assets/Home/casa.jpg';
import { MdFavoriteBorder, MdNorthEast } from "react-icons/md";
import { FaWhatsappSquare, FaPhoneAlt, FaRegEnvelope, FaCheckCircle, FaPlusSquare, FaRegClock } from "react-icons/fa"
import { useState } from 'react';
import Slider from 'react-slick';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { EmailShareButton, WhatsappShareButton } from 'react-share';
import { moeda } from '../../utils/Masks';
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

interface iImoveis {
    codImovel: number,
    codClienteVendedor: number,
    codCorretorVendedor: number,
    endereco: string,
    numero: number,
    complemento: string,
    bairro: string,
    cidade: string,
    uf: string,
    cep: number,
    latitude: number,
    longitude: number,
    qtdeVisualizacoes: number,
    codStatus: number,
    descStatus: string,
    codTipoImovel: number,
    valorVendaOriginal: number,
    valorVenda: number,
    dtVenda: string,
    dtCadastro: string,
    userCadastro: number,
    dtAtualizacao: string,
    userAtualizacao: number,
    dtExclusao: string,
    userExclusao: number,
    motivoExclusao: string,
    codMotivoExclusao: number,
    codStatusAnuncio: number,
    urlCapaImovel: string,
    codCorretorCompra: number,
}
interface iCorretores {
    codCorretor?: number,
    codUsuario?: number,
    nomeCompleto?: string,
    nomeSocial?: string,
    numeroCreci?: number,
    dtCadastro?: string,
    pontuacaoAtual?: number,
    mediaAvaliacao?: number,
    img?: string,
    endereco?: string,
    numero?: number,
    valorVendaOriginal?: number,
    valorVenda?: number,
    telefone?: number,
    dtAtualizacao?: string,
    imoveis?: iImoveis[],
}
export default function CardMeuCorretor(props: iCorretores) {
    const shareUrl = window.location.href;
    const history = useHistory();
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

      const settingsCard = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        className: "slides-card-meus-corretores",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ],
      };

      
    

    const [liked, setLiked] = useState(false);

    return (
        <div className="card  p-2" id="meuCorretor">
            <div className="row g-0 col-lg-12">
                <div className="col-lg-2 col-md-6 col-12 d-flex align-items-center" style={{overflow:'hidden', height:'215px'}}>
                    <img
                        src={props.img ? props.img : ImgCorretor}
                        className="img-fluid rounded-start card-img"
                        alt="Corretor"
                    />
                    {/* <button className="button-favorite">
                        <MdFavoriteBorder />
                    </button> */}
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                    <div className="card-body">
                        <label className="mb-3" style={{ color: "#ADADAD" }}>Corretor</label>
                        <p ><strong>{props.nomeSocial}</strong></p>
                        <div className="avaliacao">
                        </div>
                        <label ><strong>{props.numeroCreci}</strong></label>
                        <div className="cod-md-2 row-gray mb-3 mt-3"></div>
                        <label className="mb-2">Avaliação: &nbsp;<strong>{props.mediaAvaliacao}</strong></label>
                        <label className="mb-2">Imoveis no Appe+: &nbsp;<strong>{props.pontuacaoAtual}</strong></label>
                        <br/>
                        {/* <label >Corretor desde: &nbsp;<strong>{props.dtCadastro}</strong></label> */}
                    </div>
                </div>
                <div className="col-lg-6 col-md-10 info-imovel mr-2">
                    <div className="box-imoveis">
                        <p>Imóveis comigo:</p>
                    </div>
                    <Slider {...settingsCard}>{props.imoveis?.map((imovel) =>
                    (
                        <div key={imovel.codImovel}>
                            <div className="status-imovel" onClick={()=>  history.push(`/imovel/${imovel.codImovel}`)}>
                                <div className="endereco-imovel px-4 mt-3">
                                    <div className="d-flex">
                                        <p ><img src={imovel.urlCapaImovel ? imovel.urlCapaImovel : Imovel} className="imovel-mini" alt="Imovel" /></p>
                                        <p><strong>{imovel.endereco}, {imovel.numero}</strong></p>
                                    </div>
                                    {imovel.descStatus == "Vendido" ?
                                        <p style={{ color: "#ADADAD" }}><FaCheckCircle color={`#3BC14A`} /> {imovel.descStatus}  </p> :
                                        <p style={{ color: "#ADADAD" }}><FaRegClock color={`#FFB30F`} /> {imovel.descStatus}  </p>
                                    }
                                </div>
                                <div className="cod-md-2 row-gray mb-2 mx-4"></div>
                                <div className="valores-imovel">
                                    <div>
                                        <p className="valores-title" style={{ color: "#ADADAD" }}>Valor Original</p>
                                        <p className="valores-real" style={{ color: "#ADADAD" }}>R${imovel.valorVendaOriginal}</p>
                                    </div>
                                    <div>
                                        <p className="valores-title">Valor Negociado <MdNorthEast color={`#3BC14A`} /> </p>
                                        <p className="valores-real">R${imovel.valorVenda ? imovel.valorVenda : imovel.valorVendaOriginal }</p>
                                    </div>
                                    <div>
                                        <p className="valores-title">Atualizado em:</p>
                                        <p className="valores-title data-update" >{imovel.dtAtualizacao ? (
                                            <>
                                            {imovel.dtAtualizacao
                                                ? format(parseISO(imovel.dtAtualizacao), "dd/MM/yyyy")
                                            : null}
                                            </>
                                            
                                        ) : (
                                            <>
                                            {imovel.dtCadastro
                                                ? format(parseISO(imovel.dtCadastro), "dd/MM/yyyy")
                                            : null}
                                            </>
                                        ) }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    )}

                    </Slider>
                </div>
                <div className="col-lg-1 col-md-2 contato-corretor ml-2">
                    <p>Contato</p>
                    <div className="contato-icons">
                        <div>
                            <WhatsappShareButton
                                url={shareUrl}
                                title={`Gostaria de iniciar uma conversa.`}
                            >
                                <FaWhatsappSquare color={`#3BC14A`} size={48} />
                            </WhatsappShareButton>
                        </div>
                        {/* <div className="icon-box"><FaPhoneAlt size={16} /></div> */}
                        <div className="icon-box">
                            <EmailShareButton
                                url={shareUrl}
                                subject={`AppePlus - Entrar em contato`}
                                body={`Gostaria de entrar em contato.`} >
                                <FaRegEnvelope size={18} />
                            </EmailShareButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}