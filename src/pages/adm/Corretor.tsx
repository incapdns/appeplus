import Slider from "react-slick";
import NavbarDashHeader from "../../components/Navbar/NavbarDashHeader";
import { RiCalendarTodoLine } from "react-icons/ri";
import { BsChevronLeft, BsWhatsapp } from "react-icons/bs";
import { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";
import { useHistory, useParams } from "react-router-dom";
import ImgDefault from "../../assets/Logo/HorizontalBlack.svg";
import { NavbarDashAdm } from "../../components/Navbar/NavbarDashAdm";
import { cepMask, cpfMask, phoneMask } from "../../utils/Masks";
import { format, parseISO } from "date-fns";
import "../../styles/pages/adm/detalheImovel.scss";
import Footer from "../../components/Footer";

interface iParamTypes {
  id: string;
}

interface iImgModal {
  url: string;
  title: string;
}

interface iCorretor {
  horarios: [
    {
      dia: string,
      horarios: [
        {
          horarioInicial: string,
          horarioFinal: string
        }
      ]
    }
  ],
  contas: [
    {
      agencia: number,
      codBanco: number,
      contaCorrente: number,
      descBanco: string,
      descContaBancaria: string
    }
  ],
  regioesAtuadas: [
    {
      codCidade: number,
      cidade: string,
      especialidades: [
        {
          codTipoImovel: number,
          descTipoImovel: string
        }
      ],
      bairros: [
        {
          codBairro: number,
          bairro: string
        }
      ]
    }
  ]
  corretor: {
    bairro: string;
    cep: string;
    cidade: string;
    codCorretor: number;
    codCorretorCompra: number;
    codCorretorIndicacao: any;
    codCorretorVenda: number;
    codImovel: number;
    codOrigemCadastro: any;
    codUsuario: number;
    complemento: string;
    cpfcnpj: string;
    descStatusImovel: any;
    dtAtualizacao: string;
    dtCadastro: string;
    dtExclusao: any;
    dtNascimento: string;
    email:string;
    endereco: string;
    fotoCapaImovel: any;
    img: any[];
    mediaAvaliacao: number;
    motivoExclusao: any;
    nomeCompleto: string;
    nomeSocial: string;
    numero: string;
    numeroCreci: string;
    pontuacaoAtual: number;
    rg: string;
    telefone: string;
    tokenCadastro: any;
    uf: any;
    userAtualizacao: number;
    userCadastro: number;
    userExclusao: any;
  };
  arquivosCorretor: any[];
}

export function AdmCorretor() {
  const [checkedDocs, setcheckedDocs] = useState(false);

  const [checkedDoc, setcheckedDoc] = useState(false);
  const { id } = useParams<iParamTypes>();
  const history = useHistory();
  const [dados, setDados] = useState({} as iCorretor);
  const [loading, setLoading] = useState(false);
  const [obs, setObs] = useState("");
  const [erro, setErro] = useState("");
  const [imgModal, setImgModal] = useState({
    url: "",
    title: "",
  } as iImgModal);

  useEffect(() => {
    GetCorretor();
  }, []);

  async function GetCorretor() {
    await api
      .get("/Corretor/info-corretor", {
        params: {
          codCorretor: id,
        },
      })
      .then((response) => {
        setDados(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function AprovarCorretor(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await api
      .post(
        `Corretor/aprovar-corretor-semlog?CodCorretor=${dados.corretor.codCorretor}`
      )
      .then((response) => {
        console.log(response);
        history.push("/adm/corretores");
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoading(false);
      });
  }

  async function RecusarCorretor(e: FormEvent) {
    e.preventDefault();
    if (obs === "") {
      setErro("Preencha a observação para recusar o corretor");
      return;
    }
    await api
      .post(
        `Corretor/reprovar-corretor-semlog?CodCorretor=${dados.corretor.codCorretor}&motivo=${obs}`
      )
      .then((response) => {
        setLoading(false);

        history.push("/adm/corretores");
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    initialSlide: 0,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  function GoBack() {
    history.push("/adm/corretores");
  }
  return (
    <>
      <div className="wrapper-imoveis" id="adm-detalhe-imovel">
        <NavbarDashAdm />
        <div className="main-content">
          <NavbarDashHeader />
          <div className="container">
            <button className="btn btn-back" onClick={GoBack}>
              <BsChevronLeft /> Detalhe do corretor
            </button>

            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-lg-4">
                  {dados?.corretor?.img.length ? (
                    <img
                      src={dados?.corretor?.img[0]}
                      className="card-img"
                      alt={dados?.corretor?.nomeCompleto}
                    />
                  ) : (
                    <div className="card-img default">
                      <img
                        src={ImgDefault}
                        alt={dados?.corretor?.nomeCompleto}
                      />
                    </div>
                  )}
                </div>
                <div className="col-lg-8">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="title">
                          <span>{dados.corretor?.nomeCompleto}</span>
                        </div>
                        <p>
                         Creci: {dados.corretor?.numeroCreci}
                        </p>
                        <p>
                          {dados.corretor?.endereco}, {dados.corretor?.numero}
                        </p>
                        <p>{dados.corretor?.bairro}</p>

                        <p>
                          CEP:{" "}
                          {dados.corretor?.cep
                            ? cepMask(dados.corretor?.cep)
                            : null}
                        </p>
                        <p>
                          CPF:{" "}
                          {dados.corretor?.cpfcnpj
                            ? cpfMask(dados.corretor?.cpfcnpj)
                            : null}
                        </p>
                        <p>RG: {dados.corretor?.rg}</p>
                        <p>Email: {dados.corretor?.email}</p>
                        <p>Data de nascimento: {dados.corretor?.dtNascimento
                          ? format(
                          parseISO(dados.corretor?.dtNascimento),
                          "dd/MM/yyyy"
                          )
                        : null}  
                        
                        </p>
                      </div>

                      <div className="col dados">
                        <span className="label">Data do cadastro</span>
                        <div className="data">
                          <RiCalendarTodoLine size={23} />
                          <span>
                            {dados.corretor?.dtCadastro
                              ? format(
                                  parseISO(dados.corretor?.dtCadastro),
                                  "dd/MM/yyyy"
                                )
                              : null}
                          </span>
                        </div>

                        <div className="proprietario">
                          <div className="perfil">
                            <p>
                              Telefone:
                              {dados.corretor?.telefone
                                ? phoneMask(dados.corretor?.telefone)
                                : null}
                            </p>
                          </div>

                          <div className="buttons">
                            {dados.corretor?.telefone && (
                              <a
                                className="btn btn-primary"
                                href={`https://wa.me/${dados.corretor?.telefone}`}
                                target={"_blank"}
                              >
                                <BsWhatsapp />
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
            <div className="accordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="heading">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#locaisAtuacao"
                    aria-expanded="true"
                    aria-controls="proprietario"
                  >
                    Locais de atuação
                  </button>
                </h2>
                <div
                  id="locaisAtuacao"
                  className="accordion-collapse collapse show"
                  aria-labelledby="heading"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <Slider {...settings}>
                        {dados?.regioesAtuadas?.map((regiao, idx) => 
                          <div data-bs-target="#idslider" data-bs-slide-to={idx}>
                            <h6 className="slide-item">{regiao.cidade}</h6>
                          </div>
                        )}
                      </Slider>
                      
                        <div className="carousel slide" data-bs-ride="carousel" data-bs-interval="false" id="idslider">
                          <div className="carousel-inner">
                            <br/>
                            {dados?.regioesAtuadas?.map((regiao, idx) => 
                            <div className={`carousel-item ${idx == 0 ? "active" : ""}`}>
                              <div className="row">
                                <div className="col-12">
                                  <div className="mb-3">
                                    <strong>Cidade: </strong>{regiao.cidade}
                                  </div>
                                  <div className="mb-3">
                                    <strong>Especialidades: </strong>
                                    {
                                      regiao.especialidades.map(
                                        especialidade => especialidade.descTipoImovel
                                      ).join(", ")
                                    }
                                  </div>
                                  <div className="mb-3">
                                    <strong>Bairros: </strong>
                                    {
                                      regiao.bairros.map(
                                        bairro => bairro.bairro
                                      ).join(", ")
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                            )}
                          </div>
                        </div>
                      <br/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="heading">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#horarios"
                    aria-expanded="true"
                    aria-controls="proprietario"
                  >
                    Horarios
                  </button>
                </h2>
                <div
                  id="horarios"
                  className="accordion-collapse collapse show"
                  aria-labelledby="heading"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col-12 col-md-8 mb-3">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Dia</th>
                              <th scope="col">Horarios</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dados?.horarios?.map((info, idx) => 
                              (
                                <tr>
                                  <th scope="row">{idx + 1}</th>
                                  <td>{info.dia}</td>
                                  <td>{
                                    info.horarios.map(horario => 
                                      (
                                      <b style={{
                                            background: "#005bff",
                                            color: "white",
                                            marginRight: "8px",
                                            borderRadius: "5px",
                                            padding: "2px 3px 1px 3px",
                                          }}>
                                        {horario.horarioInicial + " - " + horario.horarioFinal}
                                      </b>
                                      )
                                    )
                                  }</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                        <br/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="heading">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#Bancos"
                    aria-expanded="true"
                    aria-controls="proprietario"
                  >
                    Bancos
                  </button>
                </h2>
                <div
                  id="Bancos"
                  className="accordion-collapse collapse show"
                  aria-labelledby="heading"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col-12 mb-3">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Cod Banco</th>
                              <th scope="col">Banco</th>
                              <th scope="col">Agencia</th>
                              <th scope="col">Conta Corrente</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dados?.contas?.map((info, idx) => 
                              (
                                <tr>
                                  <th scope="row">{idx + 1}</th>
                                  <td>{info.codBanco}</td>
                                  <td>{info.descBanco}</td>
                                  <td>{info.agencia}</td>
                                  <td>{info.contaCorrente}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                        <br/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                    <form onSubmit={AprovarCorretor}>
                      {dados.corretor?.img.length ? (
                        <div className="row row-cols-1 row-cols-md-4 g-4">
                          {dados.corretor?.img.map((img, index) => (
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
                                  alt={`${
                                    dados.corretor?.nomeCompleto
                                  } - Imagem ${index + 1}`}
                                  onClick={() =>
                                    setImgModal({
                                      title: `${
                                        dados.corretor?.nomeCompleto
                                      } - Imagem ${index + 1}`,
                                      url: img,
                                    })
                                  }
                                />
                                <div className="card-body">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
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
                          Nenhuma imagem cadastrada.
                        </div>
                      )}

                      <hr />
                      <h2>Documentos</h2>

                      {dados.arquivosCorretor?.length ? (
                        <div className="row row-cols-1 row-cols-md-4 g-4">
                          {dados.arquivosCorretor.map((img, index) => (
                            <div className="col">
                              <div
                                className="card"
                                style={{ width: 220 }}
                                key={index}
                              >
                                <img
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalImg"
                                  src={img.urlArquivo}
                                  className="card-img-top"
                                  alt={`${
                                    dados.corretor?.nomeCompleto
                                  } - Documento ${index + 1}`}
                                  onClick={() =>
                                    setImgModal({
                                      title: `${
                                        dados.corretor?.nomeCompleto
                                      } - Documento ${index + 1}`,
                                      url: img.urlArquivo,
                                    })
                                  }
                                />

                                <div className="card-body">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
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
                          Nenhum documento enviado.
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
                            onClick={RecusarCorretor}
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
            <div className="modal-body">
              <img src={imgModal.url} alt={imgModal.title} />
            </div>
          </div>
        </div>
      </div>
      <Footer dark />
    </>
  );
}
