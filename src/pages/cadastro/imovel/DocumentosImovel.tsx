import { useState, FormEvent, useCallback, useRef, useEffect } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import "../../../styles/cadastroVendedor.scss";
import SelecaoCorretor from "../../../components/Cards/SelecaoCorretor";
import StepperAnuncioImovel from "../../../components/StepperAnuncioImovel";
import "../../../styles/cadastroAnuncioImovel.scss";
import "../../../styles/anuncioimovel.scss";
import {
  Container,
  FileInfo,
  Preview,
  DropContainer,
  UploadMessage,
} from "../../../styles/components/Form/vender-arquivos";
import Slider from "react-slick";
import { v4 as uuidv4 } from "uuid";
import filesize from "filesize";
import { useDropzone } from "react-dropzone";
import { useHistory } from "react-router-dom";
import Loader from "../../../components/Loader";
import { iDadosUsuario, tipoUsuario } from "../../../@types";
import axios from "axios";
import { RiArrowRightCircleFill, RiArrowLeftCircleFill } from "react-icons/ri";
import api from "../../../services/api";
import Alert from "../../../components/Alert";
import minify from "../../../utils/minify";
import parse from "../../../utils/parse";

export interface IFile {
  id: string;
  name: string;
  readableSize: string;
  uploaded?: boolean;
  preview: string;
  file: File | Blob | string;
  progress?: number;
  error?: boolean;
  url: string;
  codArquivo: string;
  codTipoArquivo: string;
}

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
  const [checkedComprarImovel, setCheckedComprarImovel] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);
  const [uploadedFiles2, setUploadedFiles2] = useState<IFile[]>([]);
  const [tipoArquivo, setTipoArquivo] = useState<iDataSelect[]>([]);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const [matricula, setMatricula] = useState("");
  const [iptu, setIptu] = useState("");
  const codImovel = Number(localStorage.getItem("@appePlus/codImovel"));
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );

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

        let newUploadedFiles: IFile;
        response.data.data.urlMatricula.map(async (arquivo: IArquivosDocumento) => {
          let count = 0;
          let file: File;

          var xhr = new XMLHttpRequest();
		  xhr.responseType = "blob";
          xhr.open("GET", arquivo.url, true);
          xhr.setRequestHeader("Accept", "*/*");
          xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
          xhr.onload = function (e) {
            if (this.status == 200) {
              file = new File([this.response], arquivo.nomeArquivo, {type: "image/png"});
              newUploadedFiles = {
                file,
                id: String(arquivo.codArquivoImovel),
                name: arquivo.nomeArquivo,
                readableSize: filesize(file.size),
                preview: arquivo.url,
                progress: 0,
                uploaded: false,
                error: false,
                url: "",
                codArquivo: String(arquivo.codArquivoImovel),
                codTipoArquivo: String(arquivo.codTipoArquivo),
              };
              setUploadedFiles((state) => state.concat(newUploadedFiles));
              count = count + 1;
            }
          };
          xhr.send();
        });

        response.data.data.urlIptu.map(async (arquivo: IArquivosDocumento) => {
          let count = 0;
          let file: File;
          var xhr = new XMLHttpRequest();
		  xhr.responseType = "blob";
          xhr.open("GET", arquivo.url, true);
          xhr.setRequestHeader("Accept", "*/*");
          xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
          xhr.onload = function (e) {
            if (this.status == 200) {
              file = new File([this.response], arquivo.nomeArquivo, {type: "image/png"});
              newUploadedFiles = {
                file,
                id: String(arquivo.codArquivoImovel),
                name: arquivo.nomeArquivo,
                readableSize: filesize(file.size),
                preview: arquivo.url,
                progress: 0,
                uploaded: false,
                error: false,
                url: "",
                codArquivo: String(arquivo.codArquivoImovel),
                codTipoArquivo: String(arquivo.codTipoArquivo),
              };
              setUploadedFiles2((state) => state.concat(newUploadedFiles));
              count = count + 1;
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
    
    console.log( uploadedFiles.length, uploadedFiles2.length, iptu, matricula)
    if (uploadedFiles?.length == 0 || uploadedFiles2?.length == 0 || iptu == null || matricula == null) {
      setAlertErro(true);
      setMsgErro("Favor preencher todas as informações obrigatórias.");
    } else {
      setLoading(true);
      await api
        .patch(
          `informacoesImovel/iptu-matricula?codImovel=${codImovel}`, {
          iptu: iptu,
          matricula: matricula
        }
        )
        .then((response) => {
          CadastrarArquivos();
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
          setAlertErro(true);
          setLoading(false);
          setMsgErro("Ocorreu um erro ao tentar cadastrar as informações");
        });
    }
  }

  async function CadastrarArquivos() {
    const formData = new FormData();

    uploadedFiles.forEach((data, index) => {
      formData.append(
        `FormFile`,
        data.file,
        parse(data.name) +
        `|${data.codArquivo}|${12}`
      );
    });

    uploadedFiles2.forEach((data, index) => {
      formData.append(
        `FormFile`,
        data.file,
        parse(data.name) +
        `|${data.codArquivo}|${11}`
      );
    });

    api
      .post(`arquivoImovel/cadastrar?codImovel=${codImovel}`, formData)
      .then((response) => {
        if (usuario.tipo === tipoUsuario.corretor) {
          EnviarAprovacaoImovelCliente();
        } else {
          history.push("/cadastro/imovel/anuncioLaranja/detalhesImovel");
          setLoading(false);
        }
      })
      .catch((error) => {
        setAlertErro(true);
        setLoading(false);
        setMsgErro("Favor informar ao menos uma Imagem.");
      });
  }


  async function EnviarAprovacaoImovelCliente() {
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

  function UploadArquivos() {
    const handleUpload = useCallback((files: File[]) => {
      
      files.map((file: File) => {
        if (!file.name.toLowerCase().includes('.jpg') && !file.name.toLowerCase().includes('.png') && !file.name.toLowerCase().includes('.jpeg')) {
          setAlertErro(true);
          setMsgErro('Extensão de arquivo não suportada');
          return;
        } 
      })

      const newUploadedFiles: IFile[] = files.map((file: File) => ({
        file,
        id: uuidv4(),
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: "",
        codArquivo: "0",
        codTipoArquivo: "0",
      }));
      
      Promise.all(
        newUploadedFiles.map(
          upload => minify(upload.file as File)
          .then(res => upload.file = res)
        )
      ).then(() => {
        setUploadedFiles((state) => state.concat(newUploadedFiles))
      })
    }, []);
    const onDrop = useCallback(
      (files) => {
        handleUpload(files);
      },
      [handleUpload]
    );

    const { getRootProps, getInputProps, isDragActive, isDragReject } =
      useDropzone({
        accept: ["image/jpeg", "image/pjpeg", "image/png", "image/gif"],
        onDrop,
      });

    const renderDragMessage = useCallback(() => {
      if (!isDragActive) {
        return <UploadMessage>Para upload arraste seus documento para cá ou clique</UploadMessage>;
      }

      if (isDragReject) {
        return (
          <UploadMessage type="error">
            Tipo de arquivo não suportado
          </UploadMessage>
        );
      }

      return (
        <UploadMessage type="success">Solte os documentos aqui</UploadMessage>
      );
    }, [isDragActive, isDragReject]);

    return (
      <DropContainer
        {...getRootProps()}
        style={{
          width: "100%",
          height: `200px`,
          backgroundColor: `#FAFAFA`,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input {...getInputProps()} />
        {renderDragMessage()}
      </DropContainer>
    );
  }

  const deletePreviewPhotoJuridica = (id: any) => {
    const newArray = uploadedFiles.filter((file) => file.id !== id);
    setUploadedFiles(newArray);
  };

  const FileListArquivos = () => {
    return (
      <Container>
        <Slider {...settings}>
          {uploadedFiles.map((uploadedFile: IFile) => (
            <li key={uploadedFile.id}>
              <FileInfo>
                <Preview src={uploadedFile.preview} />
                <div>
                  <p style={{ margin: `0`, width:'100px', height:'20px', textOverflow:'ellipsis', overflow:'hidden', direction:'ltr' }}>{uploadedFile.name}</p>
                  <span style={{ color: `#000` }}>
                    {uploadedFile.readableSize}{" "}
                    {!!uploadedFile.preview && (
                      <button
                        className="btnExcluir"
                        onClick={() => {
                          deletePreviewPhotoJuridica(uploadedFile.id);
                        }}
                      >
                        x
                      </button>
                    )}
                  </span>
                </div>
              </FileInfo>
            </li>
          ))}
        </Slider>
      </Container>
    );
  };

  function UploadArquivos2() {
    const handleUpload = useCallback((files: File[]) => {

      files.map((file: File) => {
        if (!file.name.toLowerCase().includes('.jpg') && !file.name.toLowerCase().includes('.png') && !file.name.toLowerCase().includes('.jpeg')) {
          setAlertErro(true);
          setMsgErro('Extensão de arquivo não suportada');
          return;
        } 
      })

      const newuploadedFiles2: IFile[] = files.map((file: File) => ({
        file,
        id: uuidv4(),
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: "",
        codArquivo: "0",
        codTipoArquivo: "0",
      }));
  
      setUploadedFiles2((state) => state.concat(newuploadedFiles2));
    }, []);
    const onDrop = useCallback(
      (files) => {
        handleUpload(files);
      },
      [handleUpload]
    );

    const { getRootProps, getInputProps, isDragActive, isDragReject } =
      useDropzone({
        accept: ["image/jpeg", "image/pjpeg", "image/png", "image/gif"],
        onDrop,
      });

    const renderDragMessage = useCallback(() => {
      if (!isDragActive) {
        return <UploadMessage>Para upload arraste seus documento para cá ou clique</UploadMessage>;
      }

      if (isDragReject) {
        return (
          <UploadMessage type="error">
            Tipo de arquivo não suportado
          </UploadMessage>
        );
      }

      return (
        <UploadMessage type="success">Solte os documentos aqui</UploadMessage>
      );
    }, [isDragActive, isDragReject]);

    return (
      <DropContainer
        {...getRootProps()}
        style={{
          width: "100%",
          height: `200px`,
          backgroundColor: `#FAFAFA`,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input {...getInputProps()} />
        {renderDragMessage()}
      </DropContainer>
    );
  }

  const deletePreviewPhotoJuridica2 = (id: any) => {
    const newArray = uploadedFiles2.filter((file) => file.id !== id);
    setUploadedFiles2(newArray);
  };

  const FileListArquivos2 = () => {
    return (
      <Container>
        <Slider {...settings}>
          {uploadedFiles2.map((uploadedFile: IFile) => (
            <li key={uploadedFile.id}>
              <FileInfo>
                <Preview src={uploadedFile.preview} />
                <div>
                  <p style={{ margin: `0`, width:'100px', height:'20px', textOverflow:'ellipsis', overflow:'hidden', direction:'ltr' }}>{uploadedFile.name}</p>
                  <span style={{ color: `#000` }}>
                    {uploadedFile.readableSize}{" "}
                    {!!uploadedFile.preview && (
                      <button
                        className="btnExcluir"
                        onClick={() => {
                          deletePreviewPhotoJuridica2(uploadedFile.id);
                        }}
                      >
                        x
                      </button>
                    )}
                  </span>
                </div>
              </FileInfo>
            </li>
          ))}
        </Slider>
      </Container>
    );
  };

  return (
    <>
      <Navbar dark={true} />

      <div className="container mt-5 mb-5">
        {loading ? (
          <div id="loading" className="divLoad">
            <Loader />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="row">
              <div className="col-md-12 my-5">
                <h1 className="title">Documentos do seu imóvel</h1>
              </div>
            </div>
            <div className="row mb-3 col-lg-10 row-gray"></div>
            <div className="row mb-3 ">
              <div className="col-10 col-lg-10 mb-1 mt-4">
                <p className="inline-block">Matrícula</p>
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
              </div>
              <div className="col-lg-12 msg-upload">
                <span>Só serão aceitas imagens com as seguintes extensões: *jpg,*jpeg e *png.</span>
              </div>
              <div className="row mb-3">
                <div className="col-md-3">
                  <UploadArquivos></UploadArquivos>
                </div>
                <div className="col-md-7">
                  <FileListArquivos></FileListArquivos>
                </div>
              </div>
            </div>
            <div className="row mb-3 col-lg-10 row-gray"></div>
            <div className="row mb-3">
              <div className="col-10 col-lg-10 mb-1 mt-4">
                <p className="inline-block">IPTU</p>
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
              </div>
              <div className="col-lg-12 msg-upload">
                <span>Só serão aceitas imagens com as seguintes extensões: *jpg,*jpeg e *png.</span>
              </div>
              <div className="row mb-3">
                <div className="col-md-3">
                  <UploadArquivos2></UploadArquivos2>
                </div>
                <div className="col-md-7">
                  <FileListArquivos2></FileListArquivos2>
                </div>
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
              <button className="buttonSalvar" onClick={handleSubmit}>
                Salvar e continuar
              </button>
            </div>
            {alertErro && (
                <Alert msg={msgErro} setAlertErro={setAlertErro} />
              )}
          </form>
        )}
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
