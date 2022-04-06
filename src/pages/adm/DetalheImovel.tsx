import NavbarDashHeader from "../../components/Navbar/NavbarDashHeader";
import {
  MdAccountCircle,
  MdBed,
  MdFavorite,
  MdMailOutline,
  MdPhotoSizeSelectSmall,
  MdVerified,
} from "react-icons/md";
import { FaShower } from "react-icons/fa";
import { IoCarOutline } from "react-icons/io5";
import { RiCalendarTodoLine } from "react-icons/ri";
import { BsChevronLeft, BsWhatsapp } from "react-icons/bs";
import { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";
import { useHistory, useParams } from "react-router-dom";
import ImgDefault from "../../assets/Logo/HorizontalBlack.svg";
import { NavbarDashAdm } from "../../components/Navbar/NavbarDashAdm";
import "../../styles/pages/adm/detalheImovel.scss";
import Footer from "../../components/Footer";
import { format, parseISO } from "date-fns";
import { cpfMask, moeda, phoneMask } from "../../utils/Masks";

interface iParamTypes {
  id: string;
}
interface iImgModal {
  url: string;
  title: string;
}
interface iImovel {
  arquivosImovel?: any[];
  arquivosProprietario?: string[];
  imgsImovel?: any[];
  infosImovel?: {
    codInformacoesImovel?: number;
    codImovel?: number;
    qtdeDormitorios?: number;
    qtdeSuites?: number;
    qtdeBanheiros?: number;
    qtdeVagasGaragem?: number;
    qtdeSalas?: number;
    qtdeVarandas?: number;
    fachada?: number;
    imovelOcupado?: boolean;
    valorIptu?: number;
    valorCondominio?: number;
    areaTotal?: number;
    areaPrivativa?: number;
    situacaoVagas?: any;
    pavimentos?: number;
    totalUnidades?: number;
    unidadeAndar?: number;
    descCompletaPredio?: any;
    descCompletaImovel?: any;
    areaCoberta?: number;
    areaDescoberta?: number;
  };
  infoProprietario?: {
    codCliente?: number;
    nomeCompleto?: string;
    telefone?: string;
    email?: string;
    dtNascimento?: string;
    tipoCliente?: string;
    codEstadoCivil?: any;
    cpfcnpj?: any;
    rg?: any;
    genero?: any;
    dtCadastro?: string;
    codStatus?: number;
    descStatus?: any;
    arquivosCliente?: [
      {
        codArquivoCliente?: number;
        codTipoArquivo?: number;
        url?: string;
      }
    ];
  };
  imovel?: {
    codImovel?: number;
    codClienteVendedor?: number;
    codCorretorVendedor?: number;
    endereco?: string;
    numero?: string;
    complemento?: string;
    descTipoImovel?: string
    dtCadastro?: string
    bairro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
    latitude?: string;
    longitude?: string;
    codStatus?: number;
    codTipoImovel?: number;
    qtdeDormitorios?: number;
    qtdeSuites?: number;
    qtdeBanheiros?: number;
    qtdeVagasGaragem?: number;
    qtdeVisualizacoes?: number;
    areaTotal?: number;
    areaPrivativa?: number;
    valorVendaOriginal?: number;
    valorVenda?: number;
    codStatusAnuncio?: number;
  };
  infoCorretor?: {
    arquivos?: [
      string
    ]
    bairro?: string
    cep?: string
    cidade?: string
    codCorretor?: number
    codCorretorCompra?: number
    codCorretorIndicacao?: number
    codCorretorVenda?: number
    codImovel?: number
    codOrigemCadastro?: string
    codUsuario?: number
    complemento?: string
    cpfcnpj?: string
    descStatusImovel?: string
    dtAtualizacao?: string
    dtCadastro?: string
    dtExclusao?: string
    dtNascimento?: string
    email?: string
    endereco?: string
    fotoCapaImovel?: string
    img?: [
      string
    ]
    mediaAvaliacao?: number
    motivoExclusao?: string
    nomeCompleto?: string
    nomeSocial?: string
    numero?: string
    numeroCreci?: string
    pontuacaoAtual?: number
    rg?: string
    telefone?: string
    tokenCadastro?: string
    uf?: string
    userAtualizacao?: number
    userCadastro?: number
    userExclusao?: number
  }
}
interface iFilterDoc {
  codArquivoCliente: number,
  codTipoArquivo: number,
  url: string
}

export default function AdmDetalheImovel() {
  const { id } = useParams<iParamTypes>();
  const history = useHistory();
  const [imovel, setImovel] = useState({} as iImovel);
  const [docImg, setDocImg] = useState<iFilterDoc[]>([])
  const [loading, setLoading] = useState(false);
  const [obs, setObs] = useState("");
  const [erro, setErro] = useState("");
  const [imgModal, setImgModal] = useState({
    url: "",
    title: "",
  } as iImgModal);

  useEffect(() => {
    GetImovel();

  }, []);

  async function GetImovel() {
    await api
      .get("imovel", {
        params: {
          codImovel: id,
        },
      })
      .then((response) => {
        console.log(
          "🚀 ~ file: DetalheImovel.tsx ~ line 132 ~ .then ~ response.data.data",
          response.data.data
        );
        setImovel(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function AprovarImovel(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await api
      .patch(
        `imovel/aprovar-anuncio?codImovel=${imovel.imovel?.codImovel}&codExibicao=1`
      )
      .then((response) => {
        history.push("/adm/imoveis");
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoading(false);
      });
  }

  async function RecusarImovel(e: FormEvent) {
    e.preventDefault();
    if (obs === "") {
      setErro("Preencha a observação para recusar o imóvel");
      return;
    }
    await api
      .post(
        `imovel/reprovar?codImovel=${imovel.imovel?.codImovel}&motivo=${obs}`
      )
      .then((response) => {
        setLoading(false);
        history.push("/adm/imoveis");
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  function GoBack() {
    history.push("/adm/imoveis");
  }

  return (
    <>
      <div className="wrapper-imoveis" id="adm-detalhe-imovel">
        <NavbarDashAdm />
        <div className="main-content">
          <NavbarDashHeader />
          <div className="container">
            <button className="btn btn-back" onClick={GoBack}>
              <BsChevronLeft /> Detalhe do imóvel
            </button>

            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-lg-4">
                  {imovel?.imgsImovel ? (

                    <img
                      src={imovel?.imgsImovel[0]}
                      className="card-img"
                      alt={`${imovel.imovel?.endereco}, ${imovel.imovel?.bairro}, ${imovel.imovel?.cidade}`}
                    />

                  ) : (
                    <div className="card-img default">
                      <img
                        src={ImgDefault}
                        alt={`${imovel.imovel?.endereco}, ${imovel.imovel?.bairro}, ${imovel.imovel?.cidade}`}
                      />
                    </div>
                  )}
                </div>
                <div className="col-lg-8">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-6">
                      <div className="title">
                          <h2>
                            R$  {moeda(imovel.imovel?.valorVendaOriginal)}
                          </h2>
                        </div>
                        <div className="title">
                          <span>
                            {imovel.imovel?.endereco}, {imovel.imovel?.numero}
                          </span>
                        </div>
                        <span>
                          {imovel.imovel?.descTipoImovel}
                        </span>

                        <br />
                        <span>{imovel.imovel?.bairro} - {imovel.imovel?.cidade}</span>
                        <div className="icons">
                          {/* <button className="btn"> */}
                          {imovel.imovel?.codStatusAnuncio === 4 && (<MdVerified size={24} color="#2e2e2e" />)}
                          {imovel.imovel?.codStatusAnuncio === 3 && (<MdVerified size={24} color="#FD4A19" />)}
                          {imovel.imovel?.codStatusAnuncio === 2 && (<MdVerified size={24} color="#0065DD" />)}
                          {imovel.imovel?.codStatusAnuncio === 1 && (<MdVerified size={24} color="#C7C7C7" />)}
                          {/* </button> */}
                          {/* <button className="btn"> */}
                          {/* <MdFavorite size={24} color="#FF0000" /> */}
                          {/* </button> */}
                        </div>

                        <hr />

                        <div className="itens">
                          <div className="item">
                            <MdPhotoSizeSelectSmall size={18} color="#ADADAD" />
                            <span>{imovel.infosImovel?.areaTotal} m²</span>
                          </div>
                          <div className="item">
                            <FaShower size={18} color="#ADADAD" />
                            <span>
                              {imovel.infosImovel?.qtdeBanheiros} Banheiros
                            </span>
                          </div>
                          <div className="item">
                            <MdBed size={18} color="#ADADAD" />
                            <span>
                              {imovel.infosImovel?.qtdeDormitorios} Quartos
                            </span>
                          </div>
                          <div className="item">
                            <IoCarOutline size={18} color="#ADADAD" />
                            <span>
                              {imovel.infosImovel?.qtdeVagasGaragem} Vagas
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="col dados">
                        <span className="label">Data de entrada</span>
                        <div className="data">
                          <RiCalendarTodoLine size={23} />
                          <span> {imovel.imovel?.dtCadastro
                            ? format(
                              parseISO(imovel.imovel?.dtCadastro),
                              "dd/MM/yyyy"
                            )
                            : null} </span>
                        </div>

                        <div className="proprietario">
                          <div className="perfil">
                            <MdAccountCircle size={48} />
                            <div className="labels">
                              <span className="label">proprietario</span>
                              <p>{imovel.infoProprietario?.nomeCompleto}</p>
                            </div>
                          </div>

                          <div className="buttons">
                            {imovel.infoProprietario?.telefone && (
                              <a
                                className="btn btn-primary"
                                href={`https://wa.me/${imovel.infoProprietario?.telefone}`}
                              >
                                <BsWhatsapp />
                              </a>
                            )}

                            {/* <a className="btn btn-primary">
                              <FaPhoneAlt />
                            </a> */}
                            {imovel.infoProprietario?.email && (
                              <a
                                className="btn btn-primary"
                                href={`mailto:${imovel.infoProprietario?.email}`}
                              >
                                <MdMailOutline />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion" id="accordionTipoLocalizacao">
              <div className="accordion-item">
                <h2 className="accordion-header" id="heading">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#tipo"
                    aria-expanded="true"
                    aria-controls="tipo"
                  >
                    Tipo e localização do seu imóvel
                  </button>
                </h2>
                <div
                  id="tipo"
                  className="accordion-collapse collapse show"
                  aria-labelledby="heading"
                  data-bs-parent="#accordionTipoLocalizacao"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col-lg-6">
                        {imovel.imovel?.descTipoImovel}<br />
                        {imovel.imovel?.endereco}, {imovel.imovel?.numero}. <br />
                        {imovel.imovel?.bairro} - {imovel.imovel?.cidade}
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <strong>Corretor:</strong>{" "}
                          {imovel.infoCorretor?.nomeCompleto}
                        </div>
                        <div className="mb-3">
                          <strong>Data de cadastro:</strong>{" "}
                          {imovel.infoCorretor?.dtCadastro
                            ? format(
                              parseISO(imovel.infoCorretor?.dtCadastro),
                              "dd/MM/yyyy"
                            )
                            : null}
                        </div>
                        <div className="mb-3">
                          <strong>Creci:</strong>{" "}
                          {imovel.infoCorretor?.numeroCreci}
                        </div>
                        <div className="mb-3">
                          <strong>email:</strong>{" "}
                          {imovel.infoCorretor?.email}
                        </div>
                        <div className="mb-3">
                          <strong>telefone:</strong>{" "}
                          {imovel.infoCorretor?.telefone}
                        </div>

                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
            <div className="accordion" id="accordionDadosProprietario">
              <div className="accordion-item">
                <h2 className="accordion-header" id="heading">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#proprietario"
                    aria-expanded="true"
                    aria-controls="proprietario"
                  >
                    Dados do proprietário
                  </button>
                </h2>
                <div
                  id="proprietario"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingproprietario"
                  data-bs-parent="#accordionDadosProprietario"
                >
                  <div className="accordion-body">
                    {/* <div className="mb-3">
                      <img
                        src={imovel.infoProprietario?.arquivosCliente[0].url}
                        alt={imovel.infoProprietario?.nomeCompleto}
                        className="img-thumbnail img-fluid"
                      />
                    </div> */}
                    <div className="row">
                      <div className="col">
                        <div className="mb-3">
                          <strong>Nome:</strong>{" "}
                          {imovel.infoProprietario?.nomeCompleto}
                        </div>
                        <div className="mb-3">
                          <strong>RG:</strong>{" "}
                          {imovel.infoProprietario?.rg}
                        </div>
                        <div className="mb-3">
                          <strong>email:</strong>{" "}
                          {imovel.infoProprietario?.email}
                        </div>
                        <div className="mb-3">
                          <strong>Data nascimento:</strong>{" "}
                          {imovel.infoProprietario?.dtNascimento
                            ? format(
                              parseISO(imovel.infoProprietario?.dtNascimento),
                              "dd/MM/yyyy"
                            )
                            : null}
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <strong>CPF:</strong>{" "}
                          {imovel.infoProprietario?.cpfcnpj
                            ? cpfMask(imovel.infoProprietario?.cpfcnpj)
                            : "Não informado"}
                        </div>
                        <div className="mb-3">
                          <strong>Telefone:</strong>{" "}
                          {imovel.infoProprietario?.telefone
                            ? phoneMask(imovel.infoProprietario?.telefone)
                            : "Não informado"}
                        </div>
                        <div className="mb-3">
                          <strong>Data cadastro:</strong>{" "}
                          {imovel.infoProprietario?.dtCadastro
                            ? format(
                              parseISO(imovel.infoProprietario?.dtCadastro),
                              "dd/MM/yyyy"
                            )
                            : null}
                        </div>
                      </div>
                    </div>
                    <hr />
                    <h2>Imagens do proprietário</h2>

                    {imovel.infoProprietario?.arquivosCliente?.length ? (
                      <div className="row row-cols-1 row-cols-md-4 g-4">
                        {imovel.infoProprietario?.arquivosCliente.map(
                          (img, index) => (
                            <div className="col" key={img.codTipoArquivo}>
                              <img
                                data-bs-toggle="modal"
                                data-bs-target="#modalImg"
                                src={img.url}
                                className="card-img-top img-thumbnail img-fluid"
                                alt={`${imovel.infoProprietario?.nomeCompleto
                                  } -  Imagem proprietário ${index + 1}`}
                                onClick={() =>
                                  setImgModal({
                                    title: `${imovel.infoProprietario?.nomeCompleto
                                      } - Imagem proprietário ${index + 1}`,
                                    url: `${img.url}`,
                                  })
                                }
                              />
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="alert alert-warning" role="alert">
                        Nenhuma imagem enviada.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="accordion" id="accordionSobre">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingSobre">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sobre"
                    aria-expanded="true"
                    aria-controls="sobre"
                  >
                    Sobre o imóvel
                  </button>
                </h2>
                <div
                  id="sobre"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSobre"
                  data-bs-parent="#accordionSobre"
                >
                  <div className="accordion-body">
                    {imovel.infosImovel?.descricao}
                  </div>
                </div>
              </div>
            </div> */}
            <div className="accordion" id="accordionImagens">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingImagens">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#imagens"
                    aria-expanded="true"
                    aria-controls="imagens"
                  >
                    Imagens e documentos
                  </button>
                </h2>
                <div
                  id="imagens"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingImagens"
                  data-bs-parent="#accordionImagens"
                >
                  <div className="accordion-body">
                    <h2>Imagens</h2>
                    <form onSubmit={AprovarImovel}>
                      {imovel?.imgsImovel ? (
                        <div className="row row-cols-1 row-cols-md-4 g-4">
                          {imovel.imgsImovel?.map((img, index) => (
                            <div className="col" key={index}>
                              <div
                                className="card"
                                style={{ width: 220 }}
                              >
                                <img
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalImg"
                                  src={img}
                                  className="card-img-top"
                                  alt={`${imovel.imovel?.endereco}, ${imovel.imovel?.bairro
                                    }, ${imovel.imovel?.cidade} - ${index + 1}`}
                                  onClick={() =>
                                    setImgModal({
                                      title: `${imovel.imovel?.endereco}, ${imovel.imovel?.bairro
                                        }, ${imovel.imovel?.cidade} - Imagem ${index + 1
                                        }`,
                                      url: img,
                                    })
                                  }
                                />
                                <div className="card-body">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id={img}
                                      required
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={img}
                                    >
                                      Imagem {index + 1}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="alert alert-warning" role="alert">
                          Nenhuma imagem cadastrada neste imóvel.
                        </div>
                      )}

                      <hr />
                      <h2>Documentos</h2>

                      {imovel?.arquivosImovel ? (
                        <div className="row row-cols-1 row-cols-md-4 g-4">
                          {imovel.arquivosImovel.map((img: any, index: any) => (
                            <div className="col">

                              <div
                                className="card"
                                style={{ width: 220 }}
                                key={index}
                              >
                                <img
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalImg"
                                  src={img}
                                  className="card-img-top"
                                  alt={`${imovel.imovel?.endereco}, ${imovel.imovel?.bairro
                                    }, ${imovel.imovel?.cidade} -  ${index + 1
                                    }`}
                                  onClick={() =>
                                    setImgModal({
                                      title: `${imovel.imovel?.endereco}, ${imovel.imovel?.bairro
                                        }, ${imovel.imovel?.cidade} - Documento ${index + 1
                                        }`,
                                      url: img,
                                    })
                                  }
                                />
                                <div className="card-body">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id={img}
                                      required
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={img}
                                    >
                                      Documento {index + 1}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="alert alert-warning" role="alert">
                          Nenhum documento enviado neste imóvel.
                        </div>
                      )}

                      <div className="mt-5">
                        <label htmlFor="observacoes" className="form-label">
                          Observações
                        </label>
                        {erro && (
                          <div
                            className="alert alert-danger alert-dismissible fade show erro"
                            role="alert"
                          >
                            {erro}
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="alert"
                              aria-label="Close"
                              onClick={() => setErro("")}
                            />
                          </div>
                        )}
                        <textarea
                          className="form-control observacoes"
                          id="observacoes"
                          rows={6}
                          onChange={(e) => setObs(e.target.value)}
                        />
                        <div className="mt-3">
                          <button
                            className="btn btn-outline-dark"
                            type="submit"
                            disabled={loading}
                          >
                            {loading && (
                              <div
                                className="spinner-border spinner-border-sm mx-2"
                                role="status"
                              />
                            )}
                            {loading ? "Validando" : "Validar"}
                          </button>
                          <button
                            className="btn"
                            disabled={loading}
                            type="button"
                            onClick={RecusarImovel}
                          >
                            Recusar
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="accordion" id="accordionDocs">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingDocs">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#docs"
                    aria-expanded="true"
                    aria-controls="docs"
                  >
                    Documentos
                  </button>
                </h2>
                <div
                  id="docs"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingDocs"
                  data-bs-parent="#accordionDocs"
                >
                  <div className="accordion-body">
                    {imovel?.imgsImovel?.length > 0 ? (
                      <div className="row row-cols-1 row-cols-md-4 g-4">
                        {imovel.imgsImovel.map((img, index) => (
                          <div className="col">
                            <div
                              className="card"
                              style={{ width: 220 }}
                              key={index}
                            >
                              <img
                                src="https://data2.unhcr.org/images/documents/big_aa2c81585e808b644ef70587136c23601d33a2e9.jpg"
                                className="card-img-top"
                                alt={`${imovel.imovel?.endereco}, ${imovel.imovel?.bairro}, ${imovel.imovel?.cidade} - Documento ${index}`}
                              />
                              <div className="card-body">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id={img}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={img}
                                  >
                                    Documento {index + 1}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="mt-5">
                          <label htmlFor="observacoes" className="form-label">
                            Observações
                          </label>
                          <textarea
                            className="form-control observacoes"
                            id="observacoes"
                            rows={6}
                          />
                          <div className="mt-3">
                            <button className="btn btn-outline-dark">
                              Validar
                            </button>
                            <button className="btn">Recusar</button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="alert alert-warning" role="alert">
                        Nenhuma imagem cadastrada neste imóvel.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="accordion" id="accordionDetalhes">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingDetalhes">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#detalhes"
                    aria-expanded="true"
                    aria-controls="detalhes"
                  >
                    Detalhes
                  </button>
                </h2>
                <div
                  id="detalhes"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingDetalhes"
                  data-bs-parent="#accordionDetalhes"
                >
                  <div className="accordion-body">
                    <strong>Detalhes</strong>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="accordion" id="accordionCaracteristicas">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingCaracteristicas">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#caracteristicas"
                    aria-expanded="true"
                    aria-controls="caracteristicas"
                  >
                    Características
                  </button>
                </h2>
                <div
                  id="caracteristicas"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingCaracteristicas"
                  data-bs-parent="#accordionCaracteristicas"
                >
                  <div className="accordion-body">
                    <strong>Características</strong>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="modalImg"
        tabIndex={-1}
        aria-labelledby="modalImgLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-fullscreen-md-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalImgLabel">
                {imgModal.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body d-flex justify-content-center ">
              <img src={imgModal.url} alt={imgModal.title} />
            </div>
          </div>
        </div>
      </div>
      <Footer dark />
    </>
  );
}
