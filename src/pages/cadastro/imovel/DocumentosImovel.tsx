import { useState, FormEvent, useCallback, useRef, useEffect, useMemo } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import "../../../styles/cadastroVendedor.scss";
import StepperAnuncioImovel from "../../../components/StepperAnuncioImovel";
import "../../../styles/cadastroAnuncioImovel.scss";
import "../../../styles/anuncioimovel.scss";
import { useHistory } from "react-router-dom";
import Loader from "../../../components/Loader";
import { iDadosUsuario, tipoUsuario } from "../../../@types";
import { RiArrowRightCircleFill, RiArrowLeftCircleFill } from "react-icons/ri";
import api from "../../../services/api";
import Alert from "../../../components/Alert";
import parse from "../../../utils/parse";
import Upload, { IFile } from "../../../components/UploadArquivos/Upload";
import { FiSave } from "react-icons/fi";
import { Upload as UploadCore } from "../../../components/UploadArquivos/core/Upload";

export interface IArquivos {
  codArquivo?: number;
  codTipoArquivo?: number;
  arquivoNome: string;
  formFile: File | Blob | string;
}

interface iDataSelect {
  value?: number;
  label?: string;
}


interface IArquivosDocumento {
  codArquivoImovel?: number;
  codTipoArquivo?: number;
  nomeArquivo: string;
  url: string;
}

interface IDocumentos {
  matricula: string;
  iptu?: string;
  urlMatricula: IArquivosDocumento;
  urlIptu: IArquivosDocumento;
}

export default function DocumentosImovel() {
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

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [startUpload, setStartUpload] = useState(false);
  const [tipoArquivo, setTipoArquivo] = useState<iDataSelect[]>([]);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const [matricula, setMatricula] = useState("");
  const [iptu, setIptu] = useState("");
  const codImovel = Number(localStorage.getItem("@appePlus/codImovel"));
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );

  let [uploads, setUploads] = useState<UploadCore[]>([])

  const initUpload = (index: number) => {
    return (core: UploadCore) => {
      uploads[index] = core
      
      setUploads(prev => {
        prev[index] = core
        return prev
      })
    }
  }

  const getUpload = (index: number) => {
    return uploads[index]
  }

  const [done, setDone] = useState<boolean[]>([])

  const onDone = () => {
    setDone(prev => prev.concat(true))
  }

  useEffect(() => {
    let errors1 = getUpload(0)?.getErrors() ?? []
    let errors2 = getUpload(1)?.getErrors() ?? []

    let errors = errors1.concat(errors2)

    if(done.length >= 2 && !errors.length){
      if (usuario.tipo === tipoUsuario.corretor) {
        EnviarAprovacaoImovelCliente();
      } else {
        history.push("/cadastro/imovel/anuncioLaranja/detalhesImovel")
      }
    }
  }, [done])

  const format = (data: any) => {
    return parse(data.name) + `|0|${data.meta.type}`
  }

  const meta1 = useMemo(() => {
    return {type: 12}
  }, [])

  const meta2 = useMemo(() => {
    return {type:  11}
  }, [])

  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  useEffect(() => {
    checaUsuarioLogado();
    window.scrollTo(0, 0);
    GetTipoArquivo();
    GetDocumentos();
  }, []);

  async function GetTipoArquivo() {
    await api
      .get(`tipoArquivo/buscar/autoComplete`)
      .then((response) => {
        setTipoArquivo(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function GetDocumentos() {
    await api
      .get(`informacoesImovel/iptu-matricula/${codImovel}`)
      .then((response) => {
        console.log(response.data.data);
        setIptu(response.data.data.iptu);
        setMatricula(response.data.data.matricula);

        response.data.data.urlMatricula.map(async (arquivo: IArquivosDocumento) => {
          let file: File;

          var xhr = new XMLHttpRequest();
		      xhr.responseType = "blob";
          xhr.open("GET", arquivo.url, true);
          xhr.setRequestHeader("Accept", "*/*");
          xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
          xhr.onload = function (e) {
            if (this.status == 200) {
              file = new File([this.response], arquivo.nomeArquivo, { type: "image/png" });

              const { name } = file

              let meta = {type: arquivo.codTipoArquivo}

              const content: IFile = { file, meta, name, id: String(arquivo.codArquivoImovel), progress: 100, preview: URL.createObjectURL(file) }

              getUpload(0).initFiles([content])
            }
          };
          xhr.send();
        });

        response.data.data.urlIptu.map(async (arquivo: IArquivosDocumento) => {
          let file: File;
          var xhr = new XMLHttpRequest();
		      xhr.responseType = "blob";
          xhr.open("GET", arquivo.url, true);
          xhr.setRequestHeader("Accept", "*/*");
          xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
          xhr.onload = function (e) {
            if (this.status == 200) {
              file = new File([this.response], arquivo.nomeArquivo, { type: "image/png" });

              let meta = {type: arquivo.codTipoArquivo}

              const content: IFile = { file, meta, name: arquivo.nomeArquivo, id: String(arquivo.codArquivoImovel), progress: 100, preview: URL.createObjectURL(file) }
              
              getUpload(1).initFiles([content])
            }
          };
          xhr.send();
        });
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    let upload1 = getUpload(0)
    let upload2 = getUpload(1)

    let errors1 = upload1.getErrors() ?? []
    let errors2 = upload2?.getErrors() ?? []

    console.log({upload1, upload2})

    if(errors1.length)
      upload1!.slideTo(errors1[0])
    else if(errors2.length)
      upload2?.slideTo(errors2[0])
    else if (upload1!.files.length == 0 || upload2!.files.length == 0 || iptu == null || matricula == null) {
      setAlertErro(true);
      setMsgErro("Favor preencher todas as informações obrigatórias.");
    } else {
      setLoading(true)

      upload1!.start()
      upload2!.start()
        
      await api
        .patch(
          `informacoesImovel/iptu-matricula?codImovel=${codImovel}`, {
          iptu: iptu,
          matricula: matricula
        }
        ).catch((error) => {
          console.log("Ocorreu um erro");
          setAlertErro(true);
          setMsgErro("Ocorreu um erro ao tentar cadastrar as informações");
        });
    }
  }

  async function EnviarAprovacaoImovelCliente() {
    setLoading(true)
    await api
      .get(`imovel/relacionar-imovel/${codImovel}/${usuario.codCorretor}`)
      .then((response) => {
        history.push("/cadastro/imovel/anuncioLaranja/detalhesImovel");
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoading(false);
      });
  }

  return (
    <>
      <Navbar dark={true} />

      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-lg-9">
            <form onSubmit={event => event.preventDefault()}>
              <div className="row">
                <div className="col-md-12 my-5">
                  <h1 className="title">Documentos do seu imóvel</h1>
                </div>
              </div>
              <div className="row mb-3 col-lg-10 row-gray"></div>
              <div className="row mb-3 ">
                <div className="col-10 col-lg-10 mb-1 mt-4">
                  <p className="inline-block">Matrícula</p>
                  <span style={{ color: "#FF715B" }}> *</span>
                </div>
                <div className="col-10 col-lg-3 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={matricula}
                    onChange={(event) =>
                      setMatricula(event.target.value)
                    }
                    placeholder="No. da Matricula"
                  />
                </div>
                <div className="col-10 col-lg-10 mb-1">
                  <p className="inline-block">Foto da matrícula</p>
                  <span style={{ color: "#FF715B" }}> *</span>
                </div>
                <div className="col-lg-12 msg-upload">
                  <span>Só serão aceitas imagens com as seguintes extensões: *jpg,*jpeg e *png.</span>
                </div>
                <br/>
                <div className="row mb-3">
                  <Upload 
                    start={startUpload} 
                    upload={`/arquivoImovel/cadastrar?codImovel=${codImovel}`}
                    remove={'/arquivoImovel?codArquivo=:id'}
                    format={format}
                    meta={meta1}
                    onDone={onDone}
                    onAfterInit={initUpload(0)}
                    />
                </div>
              </div>
              <div className="row mb-3 col-lg-10 row-gray"></div>
              <div className="row mb-3">
                <div className="col-10 col-lg-10 mb-1 mt-4">
                  <p className="inline-block">IPTU</p>
                  <span style={{ color: "#FF715B" }}> *</span>
                </div>
                <div className="col-10 col-lg-3 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={iptu}
                    onChange={(event) =>
                      setIptu(event.target.value)
                    }
                    placeholder="No. da Matricula"
                  />
                </div>
                <div className="col-10 col-lg-10 mb-1">
                  <p className="inline-block">Foto da Guia de IPTU</p>
                  <span style={{ color: "#FF715B" }}> *</span>
                </div>
                <div className="col-lg-12 msg-upload">
                  <span>Só serão aceitas imagens com as seguintes extensões: *jpg,*jpeg e *png.</span>
                </div>
                <br/>
                <div className="row mb-3">
                  <Upload 
                    start={startUpload} 
                    upload={`/arquivoImovel/cadastrar?codImovel=${codImovel}`}
                    remove={'/arquivoImovel?codArquivo=:id'}
                    format={format}
                    meta={meta2}
                    onDone={onDone}
                    onAfterInit={initUpload(1)}
                    />
                </div>
                {/* <div>
                  <button
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#modalTableCliente"
                  >
                    <p>Assinar termo de condições de venda</p>
                  </button>
                </div> */}
              </div>

              <div className="col-lg-10 mt-0 pt-4 row-gray text-end">
                <div
                  className="buttonSalvar"
                  onClick={handleSubmit}
                  style={{float: 'right'}}
                  {...{disabled: loading}}
                >
                  <a style={{marginRight: '10px'}}>{!loading ? "Salvar edição" : "Salvar"} e continuar</a>
                  {loading ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                      style={{ marginLeft: "0.5rem" }}
                    />
                  ) : (
                    <FiSave />
                  )}
                </div>
              </div>
              {alertErro && (
                  <Alert msg={msgErro} setAlertErro={setAlertErro} />
                )}
            </form>
          </div>
        </div>
        <div className="div-card-stepper-contain">
          <StepperAnuncioImovel
            Localizacao={true}
            Sobre={true}
            Imagens={true}
            Corretor={true}
            codImovel={codImovel}
          />
        </div>
      </div>
      <Footer />

      <div
        className="modal fade"
        id="modalTableCliente"
        tabIndex={-1}
        aria-labelledby="modalTableClienteLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modalTableClienteLabel">
                Termo de Venda de Imovel
              </h4>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                X
              </button>
            </div>
            <div className="modal-body">
              <div className="table-responsive">

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}