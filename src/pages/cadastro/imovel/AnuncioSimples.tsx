import { useState, FormEvent, useCallback, useRef, useEffect } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import "../../../styles/anuncioimovel.scss";
import { BiHomeAlt } from "react-icons/bi";
import { ImOffice } from "react-icons/im";
import { FaTree } from "react-icons/fa";
import {
  moeda,
  moedaFloat,
  dateNascMask,
  cepMask,
  revertMask
} from "../../../utils/Masks";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import filesize from "filesize";
import { useDropzone } from "react-dropzone";
import api from "../../../services/api";
import {
  Container,
  FileInfo,
  Preview,
  DropContainer,
  UploadMessage,
} from "../../../styles/components/Form/vender-arquivos";
import StepperAnuncioImovel from "../../../components/StepperAnuncioImovel";
import { useHistory } from "react-router-dom";
import { iDadosUsuario, tipoUsuario } from "../../../@types";
import Loader from "../../../components/Loader";
import Alert from "../../../components/Alert";
import {
  RiArrowRightCircleFill,
  RiArrowLeftCircleFill,
  RiContactsBookLine,
} from "react-icons/ri";
import Geocode from "react-geocode";
import { MdOutlineDataUsage } from "react-icons/md";
import minify from "../../../utils/minify";
import parse from '../../../utils/parse'


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
  codArquivoImovel?: number;
  codTipoArquivo?: number;
  nomeArquivo: string;
  url: string;
}

interface iDataSelect {
  value?: number;
  label?: string;
}

export default function AnuncioSimples() {
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

  const [paraMorar, setParaMorar] = useState(true);
  const [paraTrabalhar, setParaTrabalhar] = useState(false);
  const [paraConstruir, setParaConstruir] = useState(false);
  let [finalidade, setFinalidade] = useState(1);
  const [tipoImovel, setTipoImovel] = useState(0);
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [uf, setUf] = useState("");
  let [corretorSelecionado, setCorretorSelecionado] = useState(0);
  const [numero, setNumero] = useState("");
  const [boolNumero, setBoolNumero] = useState(false);
  const [complemento, setComplemento] = useState("");
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const insertFocus = useRef<HTMLInputElement>(null);
  const [nSuites, setNSuites] = useState(0);
  const [nQuartos, setNQuartos] = useState(0);
  const [nBanheiros, setNBanheiros] = useState(0);
  const [nVagas, setNVagas] = useState(0);
  const [area, setArea] = useState(0);
  const [valor, setValor] = useState("");
  const [pavimentos, setPavimentos] = useState(0);
  const [unidadeAndar, setUnidadeAndar] = useState(0);
  const [totalUnidades, setTotalUnidades] = useState(0);
  const [valorIptu, setValorIptu] = useState("");
  const [valorCondominio, setValorCondominio] = useState("");
  const [imovelOcupado, setImovelOcupado] = useState(false);
  const [bemPartePagamento, setBemPartePagamento] = useState(false);
  const [descComplementar, setDescComplementar] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);
  const [stepLocalizacao, setStepLocalizacao] = useState(true);
  const [stepSobre, setStepSobre] = useState(false);
  const [stepImagens, setStepImagens] = useState(false);
  const [scrollBox, setScrollBox] = useState(true);
  const [tipos, setTipos] = useState<iDataSelect[]>([]);
  const [tipoArquivo, setTipoArquivo] = useState<iDataSelect[]>([]);
  const [arquivos, setArquivos] = useState<IArquivos[]>([]);
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  Geocode.setApiKey("AIzaSyAaN_-TgWVG8wcNwPLtFv8af2iJ-zIZfKU");
  let codCliente = Number(localStorage.getItem("@appePlus/codCliente"));
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
    GetAnuncioSimples();
    GetTipos();
    if (usuario.codCliente !== 0 && usuario.codCliente) {
      localStorage.setItem("@appePlus/codCliente", String(usuario.codCliente));
      codCliente = usuario.codCliente;
    }
    console.log(codCliente);
  }, []);

  function click_finalidade(fin: number) {

    switch (fin) {
      case 1:
        return () => {
          setParaMorar(true);
          setParaTrabalhar(false);
          setParaConstruir(false);
          setFinalidade(fin);
          finalidade = fin;
          GetTipos();
        };
      case 2:
        return () => {
          setParaMorar(false);
          setParaTrabalhar(true);
          setParaConstruir(false);
          setFinalidade(fin);
          finalidade = fin;
          GetTipos();
        };
      case 3:
        return () => {
          setParaMorar(false);
          setParaTrabalhar(false);
          setParaConstruir(true);
          setFinalidade(fin);
          finalidade = fin;
          GetTipos();
        };
    }
  }

  function complete_localizacao() {
    setStepLocalizacao(true);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(uploadedFiles);

    setAlertErro(false);

    if (uploadedFiles.length == 0){
      setAlertErro(true);
      setMsgErro("Favor informar as imagens do seu imóvel.");
      window.scrollTo(0, 0);
      return;
    }

    if (tipoImovel === 0 || cep === '' || endereco === '' || numero === '' || uf === '' || cidade === '' || bairro === '' || valor === ''
      || area === 0 || valorIptu === '') {

      setAlertErro(true);
      setMsgErro("Você precisa preencher todos os campos obrigatórios. (*)");
      window.scrollTo(0, 0);
      return;
    }

    setLoading(true);

    api
      .post("imovel/anuncio-simples", {
        codImovel: codImovel,
        tipoELocalizacao: {
          codClienteVendedor: codCliente === 0 ? 104 : codCliente,
          codTipoImovel: tipoImovel,
          cep: cep,
          endereco: endereco,
          numero: numero,
          complemento: complemento,
          uf: uf,
          cidade: cidade,
          bairro: bairro,
          valorVendaOriginal: moedaFloat(String(valor)),
          dtCadastro: Date.now,
          userCadastro: 0,
          latitude: String(latitude),
          longitude: String(longitude),
        },
        sobreSeuImovelModel: {
          qtdeSuites: nSuites,
          qtdeDormitorios: nQuartos,
          qtdeBanheiros: nBanheiros,
          qtdeVagasGaragem: nVagas,
          areaTotal: area,
          pavimentos: pavimentos,
          unidadeAndar: unidadeAndar,
          totalUnidades: totalUnidades,
          valorIptu: moedaFloat(String(valorIptu)),
          valorCondominio: moedaFloat(String(valorCondominio)),
          imovelOcupado: imovelOcupado,
          bemPartePagamento: bemPartePagamento,
          descComplementar: descComplementar,
        },
      })
      .then((response) => {
        localStorage.setItem("@appePlus/codImovel", response.data.data);
        localStorage.setItem("@appePlus/tipoImovel", String(tipoImovel));
        CadastrarArquivos(response.data.data);
        if (usuario.tipo === tipoUsuario.corretor) {
          corretorSelecionado = usuario.codCorretor;
          setCorretorSelecionado(usuario.codCorretor);
          salvarCorretor();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("Ocorreu um erro");
      });
  }

  async function salvarCorretor() {
    api
      .put(
        `/imovel/atualizarCorretor?codImovel=${codImovel}&codCorretorVendedor=${corretorSelecionado}`
      )
      .then((response) => {
      })
      .catch((error) => {
        console.log("🚀 ~ Error ~ line 318 ~ AnuncioSimples.tsx ~ CorretorCadastrando ~ ", error);
      });
  }

  async function CadastrarArquivos(codimovel: number) {
    const formData = new FormData();
    uploadedFiles.forEach((data, index) => {
      formData.append(
        `FormFile`,
        data.file,
        parse(data.name) + `|${data.codArquivo}|${"1"}`
      );
    });
    api
      .post(`arquivoImovel/cadastrar?codImovel=${codimovel}`, formData)
      .then((response) => {
        history.push("/cadastro/imovel/anuncioAzul/corretor");
        setLoading(false);
      })
      .catch((error) => {
        setAlertErro(true);
        setLoading(false);
        setMsgErro("Favor informar ao menos uma Imagem.");
      });
  }

  async function handleCep() {
    if (cep.length === 7 || cep.length === 8) {
      await axios
        .get<any>(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          if (response.data.erro) {
            setMsgErro("CEP  inválido");
            setAlertErro(true);
          }
          setEndereco(response.data.logradouro);
          setCidade(response.data.localidade);
          setBairro(response.data.bairro);
          setUf(response.data.uf);
          setBoolNumero(true);
          insertFocus.current?.focus();
          Geocode.fromAddress(
            response.data.logradouro + " " + response.data.localidade
          ).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setLatitude(lat);
              setLongitude(lng);
            },
            (error) => {
              console.error("Ocorreu um erro");
            }
          );
        });
    }
  }

  async function GetAnuncioSimples() {
    if (codImovel != 0) {
      setLoading(true);
      setUploadedFiles([]);
      await api
        .get(`/imovel/recuperar-anuncio-simples?CodImovel=${codImovel}`)
        .then((response) => {
          console.log(
            "🚀 ~ file: AnuncioSimples.tsx ~ line 355 ~ .then ~ response",
            response.data.data
          );
          setCep(response.data.data.cep);
          setEndereco(response.data.data.endereco);
          setNumero(response.data.data.numero);
          setComplemento(response.data.data.complemento);
          setUf(response.data.data.uf);
          setCidade(response.data.data.cidade);
          setBairro(response.data.data.bairro);
          setValor(response.data.data.valorVendaOriginal);
          setLatitude(response.data.data.latitude);
          setLongitude(response.data.data.longitude);
          setNSuites(response.data.data.qtdeSuites);
          setNQuartos(response.data.data.qtdeDormitorios);
          setNBanheiros(response.data.data.qtdeBanheiros);
          setNVagas(response.data.data.qtdeVagasGaragem);
          setArea(response.data.data.areaTotal);
          setPavimentos(response.data.data.pavimentos);
          setUnidadeAndar(response.data.data.unidadeAndar);
          setTotalUnidades(response.data.data.totalUnidades);
          setValorIptu(response.data.data.valorIptu);
          setValorCondominio(response.data.data.valorCondominio);
          setImovelOcupado(response.data.data.imovelOcupado);
          setBemPartePagamento(response.data.data.bemPartePagamento);
          setDescComplementar(response.data.data.descComplementar);
          setArquivos(response.data.data.imagensImovel);
          setTipoImovel(response.data.data.codTipoImovel);
          setFinalidade(response.data.data.codFinalidade);
          finalidade = response.data.data.codFinalidade;
          if (finalidade == 1) {
            setParaMorar(true);
            setParaTrabalhar(false);
            setParaConstruir(false);
            GetTipos();
          } else if (finalidade == 2) {
            setParaMorar(false);
            setParaTrabalhar(true);
            setParaConstruir(false);
            GetTipos();
          } else if (finalidade == 3) {
            setParaMorar(false);
            setParaTrabalhar(false);
            setParaConstruir(true);
            GetTipos();
          }
          localStorage.setItem("@appePlus/tipoImovel", String(response.data.data.codTipoImovel));
          let newUploadedFiles: IFile;
          response.data.data.imagensImovel.map(async (arquivo: IArquivos) => {
            let count = 0;
            let file: File;
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.open("GET", arquivo.url, true);
            xhr.setRequestHeader("Accept", "*/*");
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.onload = function (e) {
              if (this.status == 200) {
                file = new File([this.response], arquivo.nomeArquivo, { type: "image/png" });
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
          setLoading(false);
        })
        .catch((error) => {
          console.log("Ocorreu um erro", error);
          setLoading(false);
        });
    }
  }

  async function GetTipos() {
    await api
      .get(
        `Finalidade-Tipo-Imovel/buscar/autoComplete?codFinalidade=${finalidade}`
      )
      .then((response) => {
        setTipos(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

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

  function UploadArquivos() {
    const handleUpload = useCallback((files: File[]) => {

      files.map((file: File) => {
        if (
          !file.name.toLowerCase().includes(".jpg") &&
          !file.name.toLowerCase().includes(".png") &&
          !file.name.toLowerCase().includes(".jpeg")
        ) {
          setAlertErro(true);
          setMsgErro("Extensão de arquivo não suportada");
          return;
        }
      });

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
      }))

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
        return (
          <UploadMessage className="mx-1">
            Coloque aqui <br />
            as melhores imagens do seu imovel
          </UploadMessage>
        );
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
                  <p style={{ margin: `0`, width: '100px', height: '20px', textOverflow: 'ellipsis', overflow: 'hidden', direction: 'ltr' }} >{uploadedFile.name}</p>
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

  return (
    <>
      <Navbar type="dark" />
      <div className="mt-5"></div>
      <div className="container mt-5 col-lg-12 mb-5">
        {loading ? (
          <div id="loading" className="divLoad">
            <Loader />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="row g-3 col-lg-9">
            <div className="wrapper">
              <ol className="c-stepper">
                <li className="c-stepper__item">
                  <div className="c-stepper__content">
                    <h2 className="c-stepper__title">
                      Tipo e Localização do seu Imóvel
                    </h2>
                    {alertErro && (
                      <Alert msg={msgErro} setAlertErro={setAlertErro} />
                    )}
                    <div className="inline-block mt-3">
                      <p className="inline-block"> Seu imóvel foi feito...</p>{" "}
                      <p className="warning inline-block">*</p>
                    </div>
                    <div className="col-lg-12 inline-block">
                      <div className="col-2 inline-block mx-2">
                        <button
                          type="button"
                          className={
                            paraMorar
                              ? "big-button-selected"
                              : "bnt big-button-unselected"
                          }
                          onClick={click_finalidade(1)}
                        >
                          <BiHomeAlt
                            className={
                              paraMorar
                                ? "big-button-icon-selected"
                                : "big-button-icon-unselected"
                            }
                          />
                          <span
                            className={
                              paraMorar
                                ? "big-button-text-selected"
                                : "big-button-text-unselected"
                            }
                          >
                            Para
                            <br />
                            Morar
                          </span>
                        </button>
                      </div>
                      <div className="col-2 inline-block mx-2">
                        <button
                          type="button"
                          className={
                            paraTrabalhar
                              ? "big-button-selected"
                              : "bnt big-button-unselected"
                          }
                          onClick={click_finalidade(2)}
                        >
                          <ImOffice
                            className={
                              paraTrabalhar
                                ? "big-button-icon-selected"
                                : "big-button-icon-unselected"
                            }
                          />
                          <span
                            className={
                              paraTrabalhar
                                ? "big-button-text-selected"
                                : "big-button-text-unselected"
                            }
                          >
                            Para
                            <br />
                            Trabalhar
                          </span>
                        </button>
                      </div>
                      <div className="col-2 inline-block mx-2">
                        <button
                          type="button"
                          className={
                            paraConstruir
                              ? "big-button-selected"
                              : "bnt big-button-unselected"
                          }
                          onClick={click_finalidade(3)}
                        >
                          <FaTree
                            className={
                              paraConstruir
                                ? "big-button-icon-selected"
                                : "big-button-icon-unselected"
                            }
                          />
                          <span
                            className={
                              paraConstruir
                                ? "big-button-text-selected"
                                : "big-button-text-unselected"
                            }
                          >
                            Para
                            <br />
                            Construir
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-8 col-10 my-5 d-flex align-items-center flex-wrap">
                      <h4>Seu imovel é um(a): </h4>
                      <select
                        className="form-select-h4"
                        data-widht="fit"
                        value={tipoImovel}
                        onChange={({ target }) =>
                          setTipoImovel(Number(target.value))
                        }
                      >
                        <option value={0}></option>
                        {tipos.map((x) => (
                          <option value={x.value}>{x.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="inline-block">
                      <p className="inline-block">
                        {" "}
                        Localização do seu imóvel{" "}
                      </p>{" "}
                      <p className="warning inline-block">*</p>
                    </div>
                    <div className="col-lg-12">
                      <div className="row mb-3">
                        <div className="col-12 col-lg-3 mb-1">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="no"
                            id="inputCep"
                            maxLength={9}
                            value={cepMask(cep)}
                            onChange={(event) => {
                              setCep(revertMask(event.target.value));
                            }}
                            onBlur={handleCep}
                            required
                            placeholder="CEP"
                          />
                        </div>
                        <div className="col-12 col-lg-7 mb-1">
                          <input
                            type="text"
                            className="form-control"
                            value={endereco}
                            disabled
                            onChange={(event) =>
                              setEndereco(event.target.value)
                            }
                            placeholder="Endereço sem número"
                          />
                        </div>
                        <div className="col-12 col-lg-2 mb-1">
                          <input
                            type="text"
                            className="form-control"
                            required
                            disabled={boolNumero ? false : true}
                            ref={insertFocus}
                            value={numero}
                            onChange={(event) => setNumero(event.target.value)}
                            placeholder="numero"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="row mb-3">
                        <div className="col-10 col-lg-4 mb-1">
                          <input
                            type="text"
                            className="form-control"
                            disabled={boolNumero ? false : true}
                            placeholder="Complemento"
                            onChange={(event) =>
                              setComplemento(event.target.value)
                            }
                          />
                        </div>
                        <div className="col-10 col-lg-2 mb-1">
                          <input
                            type="text"
                            className="form-control"
                            disabled
                            value={uf}
                            onChange={(event) => setUf(event.target.value)}
                            placeholder="Estado"
                          />
                        </div>
                        <div className="col-10 col-lg-3 mb-1">
                          <input
                            type="text"
                            className="form-control"
                            disabled
                            value={cidade}
                            onChange={(event) => setCidade(event.target.value)}
                            placeholder="cidade"
                          />
                        </div>
                        <div className="col-10 col-lg-3 mb-1">
                          <input
                            type="text"
                            className="form-control"
                            disabled
                            value={bairro}
                            onChange={(event) => setBairro(event.target.value)}
                            placeholder="bairro"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="c-stepper__item">
                  <div className="c-stepper__content col-lg-12">
                    <h2 className="c-stepper__title">Sobre seu imóvel</h2>
                    <div className="col-lg-11">
                      {paraMorar ? (
                        <div className="row row-gray">
                          <div className="row mb-3 mt-3">
                            <div className="col-10 col-lg-7 mb-1 mt-2">
                              <p className="inline-block">Número de Suítes</p>{" "}
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nSuites === 1
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nSuites === 1 ? setNSuites(0) : setNSuites(1)
                                }
                              >
                                <span
                                  className={
                                    nSuites === 1
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  1
                                </span>
                              </button>
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nSuites === 2
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nSuites === 2 ? setNSuites(0) : setNSuites(2)
                                }
                              >
                                <span
                                  className={
                                    nSuites === 2
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  2
                                </span>
                              </button>
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nSuites === 3
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nSuites === 3 ? setNSuites(0) : setNSuites(3)
                                }
                              >
                                <span
                                  className={
                                    nSuites === 3
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  3
                                </span>
                              </button>
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nSuites === 4
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nSuites === 4 ? setNSuites(0) : setNSuites(4)
                                }
                              >
                                <span
                                  className={
                                    nSuites === 4
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  4
                                </span>
                              </button>
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nSuites >= 5
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nSuites === 5 ? setNSuites(0) : setNSuites(5)
                                }
                              >
                                <span
                                  className={
                                    nSuites >= 5
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  +5
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {paraMorar ? (
                        <div className="row row-gray">
                          <div className="row mb-3 mt-3">
                            <div className="col-10 col-lg-7 mb-1 mt-2">
                              <p className="inline-block">Número de Quartos</p>{" "}
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nQuartos === 1
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nQuartos === 1
                                    ? setNQuartos(0)
                                    : setNQuartos(1)
                                }
                              >
                                <span
                                  className={
                                    nQuartos === 1
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  1
                                </span>
                              </button>
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nQuartos === 2
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nQuartos === 2
                                    ? setNQuartos(0)
                                    : setNQuartos(2)
                                }
                              >
                                <span
                                  className={
                                    nQuartos === 2
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  2
                                </span>
                              </button>
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nQuartos === 3
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nQuartos === 3
                                    ? setNQuartos(0)
                                    : setNQuartos(3)
                                }
                              >
                                <span
                                  className={
                                    nQuartos === 3
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  3
                                </span>
                              </button>
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nQuartos === 4
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nQuartos === 4
                                    ? setNQuartos(0)
                                    : setNQuartos(4)
                                }
                              >
                                <span
                                  className={
                                    nQuartos === 4
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  4
                                </span>
                              </button>
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nQuartos >= 5
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nQuartos === 5
                                    ? setNQuartos(0)
                                    : setNQuartos(5)
                                }
                              >
                                <span
                                  className={
                                    nQuartos >= 5
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  +5
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {paraMorar || paraTrabalhar ? (
                        <div className="row row-gray">
                          <div className="row mb-3 mt-3">
                            <div className="col-10 col-lg-7 mb-1 mt-2">
                              <p className="inline-block">
                                Número de Banheiros
                              </p>{" "}
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nBanheiros === 1
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nBanheiros === 1
                                    ? setNBanheiros(0)
                                    : setNBanheiros(1)
                                }
                              >
                                <span
                                  className={
                                    nBanheiros === 1
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  1
                                </span>
                              </button>
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nBanheiros === 2
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nBanheiros === 2
                                    ? setNBanheiros(0)
                                    : setNBanheiros(2)
                                }
                              >
                                <span
                                  className={
                                    nBanheiros === 2
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  2
                                </span>
                              </button>
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nBanheiros === 3
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nBanheiros === 3
                                    ? setNBanheiros(0)
                                    : setNBanheiros(3)
                                }
                              >
                                <span
                                  className={
                                    nBanheiros === 3
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  3
                                </span>
                              </button>
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nBanheiros === 4
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nBanheiros === 4
                                    ? setNBanheiros(0)
                                    : setNBanheiros(4)
                                }
                              >
                                <span
                                  className={
                                    nBanheiros === 4
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  4
                                </span>
                              </button>
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nBanheiros >= 5
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nBanheiros === 5
                                    ? setNBanheiros(0)
                                    : setNBanheiros(5)
                                }
                              >
                                <span
                                  className={
                                    nBanheiros >= 5
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  +5
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {paraMorar || paraTrabalhar ? (
                        <div className="row row-gray">
                          <div className="row mb-1 mt-3">
                            <div className="col-10 col-lg-7 mb-1 mt-2">
                              <p className="inline-block">Número de Vagas</p>{" "}
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nVagas === 1
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nVagas === 1 ? setNVagas(0) : setNVagas(1)
                                }
                              >
                                <span
                                  className={
                                    nVagas === 1
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  1
                                </span>
                              </button>
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nVagas === 2
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nVagas === 2 ? setNVagas(0) : setNVagas(2)
                                }
                              >
                                <span
                                  className={
                                    nVagas === 2
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  2
                                </span>
                              </button>
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nVagas === 3
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nVagas === 3 ? setNVagas(0) : setNVagas(3)
                                }
                              >
                                <span
                                  className={
                                    nVagas === 3
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  3
                                </span>
                              </button>
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nVagas === 4
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nVagas === 4 ? setNVagas(0) : setNVagas(4)
                                }
                              >
                                <span
                                  className={
                                    nVagas === 4
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  4
                                </span>
                              </button>
                            </div>
                            <div className="col-10 col-lg-1 mb-1">
                              <button
                                type="button"
                                className={
                                  nVagas >= 5
                                    ? "circular-button-selected inline-block"
                                    : "circular-button-unselected inline-block"
                                }
                                onClick={() =>
                                  nVagas === 5 ? setNVagas(0) : setNVagas(5)
                                }
                              >
                                <span
                                  className={
                                    nVagas >= 5
                                      ? "circular-button-text-selected"
                                      : "circular-button-text-unselected"
                                  }
                                >
                                  +5
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-lg-11 row-gray">
                      <div className="row mt-5">
                        <div className="col-10 col-lg-10 mb-1">
                          <p className="inline-block">Área (m²)</p>{" "}
                          <p className="warning inline-block">*</p>
                        </div>
                        <div className="col-10 col-lg-2 mb-1">
                          <input
                            type="text"
                            className="form-control"
                            value={area}
                            onChange={(event) =>
                              setArea(Number(event.target.value))
                            }
                            placeholder="Metragem"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 mb-1">
                          <input
                            type="range"
                            className="form-range"
                            min="0"
                            max="1000"
                            step="1"
                            value={area}
                            onChange={(changeEvent) =>
                              setArea(Number(changeEvent.target.value))
                            }
                          />
                          <div className="label-area">
                            {" "}
                            <p className="inline-block">1000 (m²)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {paraMorar || paraTrabalhar ? (
                      <div className="col-lg-11 row-gray mb-3">
                        <div className="row mt-5">
                          <div className="col-10 col-lg-10 mb-1">
                            <p className="inline-block">Unidades e andares</p>{" "}
                            <p className="warning inline-block">*</p>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-10 col-lg-4 mb-1">
                            <label>Nº de andares</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Nº de andares"
                              value={pavimentos === 0 ? "" : pavimentos}
                              onChange={(event) =>
                                setPavimentos(Number(event.target.value))
                              }
                            />
                          </div>
                          <div className="col-10 col-lg-4 mb-1">
                            <label>Unidades por Andar</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Unidades por Andar"
                              value={unidadeAndar === 0 ? "" : unidadeAndar}
                              onChange={(event) =>
                                setUnidadeAndar(Number(event.target.value))
                              }
                            />
                          </div>
                          <div className="col-10 col-lg-4 mb-1">
                            <label>Total de unidades</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Total de unidades"
                              value={totalUnidades === 0 ? "" : totalUnidades}
                              onChange={(event) =>
                                setTotalUnidades(Number(event.target.value))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="col-lg-11 row-gray">
                      <div className="row mt-5">
                        <div className="col-10 col-lg-10 mb-1">
                          <p className="inline-block">Valores e pagamentos</p>{" "}
                          <p className="warning inline-block">*</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-10 col-lg-4 mb-1">
                          <label>IPTU Mensal (R$)</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="IPTU Mensal (R$)"
                            value={valorIptu ? moeda(valorIptu) : ""}
                            onChange={event =>
                              setValorIptu(moeda(event.target.value))
                            }
                          />
                        </div>
                        <div className="col-10 col-lg-4 mb-1">
                          <label>Condomínio (R$)</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Condomínio (R$)"
                            value={
                              valorCondominio === "0"
                                ? ""
                                : moeda(valorCondominio)
                            }
                            onChange={event =>
                              setValorCondominio(moeda(event.target.value))
                            }
                          />
                        </div>
                        <div className="col-10 col-lg-4 mb-1">
                          <label>Valor Pretendido</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Valor Pretendido"
                            value={valor === "0" ? "" : moeda(valor)}
                            onChange={(event) =>
                              setValor(moeda(event.target.value))
                            }
                          />
                        </div>
                      </div>
                      <div className="d-flex align-items-center box-checked-row ">
                        <div
                          className={`checked-box d-flex align-items-center ${bemPartePagamento ? "activeSelect" : ""
                            }`}
                        >
                          <div
                            className={`box-input-checked d-flex align-items-center justify-content-around mr-1 ${bemPartePagamento ? "activeSelect" : ""
                              }`}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={bemPartePagamento}
                              onChange={({ target }) =>
                                setBemPartePagamento(target.checked)
                              }
                            />
                          </div>
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            Eu aceito bem como parte do pagamento
                          </label>
                        </div>
                        <div
                          className={`checked-box d-flex align-items-center ${imovelOcupado ? "activeSelect" : ""
                            }`}
                        >
                          <div
                            className={`box-input-checked d-flex align-items-center justify-content-around mr-1 ${imovelOcupado ? "activeSelect" : ""
                              }`}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={imovelOcupado}
                              onChange={({ target }) =>
                                setImovelOcupado(target.checked)
                              }
                              name="imovelOcupado"
                            />
                          </div>
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            Imóvel está ocupado
                          </label>
                        </div>
                      </div>
                      <div className="row mt-5 mb-3">
                        <div className="col-10 col-lg-10 mb-1">
                          <p className="inline-block">
                            Gostaria de acrescentar mais alguma descrição?
                          </p>
                        </div>
                        <div className="col-10 col-lg-12 mb-1">
                          <textarea
                            className="text-area"
                            placeholder="Descrição complementar"
                            rows={3}
                            value={descComplementar}
                            onChange={(event) =>
                              setDescComplementar(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="c-stepper__item">
                  <div className="c-stepper__content col-lg-12">
                    <h2 className="c-stepper__title">Imagens</h2>
                    <div className="col-lg-12 msg-upload">
                      <span>
                        Só serão aceitas imagens com as seguintes extensões:
                        *jpg,*jpeg e *png.
                      </span>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-3">
                        <UploadArquivos></UploadArquivos>
                      </div>
                      <div className="col-md-9">
                        <FileListArquivos></FileListArquivos>
                      </div>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
            <div className="col-lg-12 mt-0 pt-4 row-gray text-end">
              <button className="buttonSalvar" onClick={handleSubmit}>
                Salvar e continuar
              </button>
            </div>
          </form>
        )}
        <div className="div-card-stepper-contain col-lg-3">
          <StepperAnuncioImovel codImovel={codImovel} />
        </div>
      </div>
      <Footer />
    </>
  );
}
