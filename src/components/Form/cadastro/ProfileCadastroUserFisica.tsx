import { useState, useCallback, FormEvent, useEffect } from "react";
import "../../../styles/components/Form/profileCadastroUser.scss";
import { v4 as uuidv4 } from "uuid";
import filesize from "filesize";
import { useDropzone } from "react-dropzone";
import {
  Container,
  FileInfo,
  Preview,
  DropContainer,
  UploadMessage,
} from "../../../styles/components/Form/vender-arquivos";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import validaCpf from "../../../utils/validaCpf";
import { cpfMask, revertMask } from "../../../utils/Masks";
import Alert from "../../Alert";
import { useHistory } from "react-router-dom";
import { RiArrowRightCircleFill, RiArrowLeftCircleFill } from "react-icons/ri";
import api from "../../../services/api";
import { iDadosUsuario, tipoUsuario } from "../../../@types";
import { IArquivos } from "./ProfileCadastroCorretor";
import minify from "../../../utils/minify";
import parse from "../../../utils/parse";

interface iStep {
  setStep: (value: number) => void;
  codImovel: string;
  step: number;
  idImovel?: number | unknown;
}
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

export interface IArquivo {
  formFile: IFile | undefined;
  nomeSocial: string;
  dtNascimento: string;
  email: string;
  telefone: string;
  corretorCadastrando: boolean;
  verificaCampos?: boolean;
  teste: boolean;
  edicao?: boolean;
}

interface iDataSelect {
  value?: number;
  label?: string;
}

const ProfileCadastroUserFisica = (props: IArquivo) => {
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
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  var codNivel: any;
  var codCliente: any;

  if (props.corretorCadastrando && window.location.pathname === '/cadastro/cliente/vendedor') {
    codCliente = Number(localStorage.getItem('@appePlus/codClienteEdicao'));
    codNivel = localStorage.getItem('@appePlus/codNivelClienteEdicao');
  } else {
    codCliente = usuario.codCliente;
  }

  const history = useHistory();
  const [sexo, setSexo] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const [imgPerfil, setImgPerfil] = useState<IFile>();
  const [tipoArquivo, setTipoArquivo] = useState<iDataSelect[]>([]);
  const [carregou, setCarregou] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleCpf() {
    if (!validaCpf(cpf) && cpf.length === 11) {
      setMsgErro("CPF inválido !");
      setAlertErro(true);
      return;
    }

    if (usuario.tipo == tipoUsuario.corretor && cpf == usuario.cPFCNPJ) {
      setAlertErro(true);
      setMsgErro(
        "Você não pode cadastrar seu proprio CPF."
      );
      setCpf("");
      return;
    } else {
      api
        .get(`/cliente/verificar-cpf-telefone?cpf=${cpf}`)
        .then((response) => {
          if (response.data.data > 0) {
            setAlertErro(true);
            setMsgErro(
              "O número de CPF informado já está vinculado a outro usuário da plataforma."
            );
            setCpf("");
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async function GetDadosCliente() {
    await api.get(`cliente/recuperar-dados-cliente?codCliente=${codCliente}`).then(response => {
      console.log(response.data.data)
      const res = response.data.data;

      res.cpfcnpj && setCpf(res.cpfcnpj)
      res.rg && setRg(res.rg)
      res.codEstadoCivil && setEstadoCivil(String(res.codEstadoCivil))
      res.genero && setSexo(String(res.genero))
      let newUploadedFiles: IFile;
      res.arquivosCliente.map(async (arquivo: any) => {
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
              id: String(arquivo.codArquivoCliente),
              name: arquivo.nomeArquivo,
              readableSize: filesize(file.size),
              preview: arquivo.url,
              progress: 0,
              uploaded: false,
              error: false,
              url: "",
              codArquivo: String(arquivo.codArquivoCliente),
              codTipoArquivo: String(arquivo.codTipoArquivo),
            };


            if (arquivo.codTipoArquivo == 3) {
              setUploadedFiles((state) => state.concat(newUploadedFiles));

            } else {
              setImgPerfil(newUploadedFiles);
            }

            count = count + 1;
          }
        };
        xhr.send();
      });
    }).catch(error => {
      console.log(error)
    })
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

  useEffect(() => {
    window.scrollTo(0, 0);
    GetTipoArquivo();
    if (!!codCliente) {
      GetDadosCliente();
    }
  }, []);



  function UploadArquivos() {

    const handleUpload = useCallback(
      (files: File[]) => {
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
          codTipoArquivo: "0",
          codArquivo: "0"
        }));

        Promise.all(
          newUploadedFiles.map(
            upload => minify(upload.file as File)
              .then(res => upload.file = res)
          )
        ).then(() => {
          setUploadedFiles((state) => state.concat(newUploadedFiles))
        })
      },
      []
    );

    const onDrop = useCallback(
      (files) => {
        handleUpload(files);
      },
      [handleUpload]
    );

    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragReject,
    } = useDropzone({
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

      return <UploadMessage type="success">Solte os documentos aqui</UploadMessage>;
    }, [isDragActive, isDragReject]);

    return (
      <DropContainer {...getRootProps()} style={{ width: "100%", height: `200px`, backgroundColor: `#FAFAFA`, display: "flex", justifyContent: "center" }}>
        <input {...getInputProps()} />
        {renderDragMessage()}
      </DropContainer>
    );
  }
  const deletePreviewPhotoFisica = (id: any) => {
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
                  <p style={{ margin: `0`, width: '100px', height: '20px', textOverflow: 'ellipsis', overflow: 'hidden', direction: 'ltr' }}>{uploadedFile.name}</p>
                  <span style={{ color: `#000` }}>
                    {uploadedFile.readableSize}{" "}
                    {!!uploadedFile.preview && (
                      <button
                        className="btnExcluir"
                        onClick={() =>
                          deletePreviewPhotoFisica(uploadedFile.id)
                        }
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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (
      rg === "" ||
      cpf === "" ||
      estadoCivil === "" ||
      sexo === "" ||
      props.nomeSocial === "" ||
      props.telefone === "" ||
      props.email === "" ||
      props.dtNascimento === ""
    ) {
      setAlertErro(true);
      setMsgErro("Você precisa preencher todos os campos obrigatórios. (*)");
      window.scrollTo(0, 0);
      return;
    }

    // if (!(props?.formFile || imgPerfil?.file)) {
    //   setAlertErro(true);
    //   setMsgErro("Favor informar imagem de perfil.");
    //   window.scrollTo(0, 0);
    //   return;
    // }


    if (props.corretorCadastrando) {
      if (codCliente && window.location.pathname === "/cadastro/cliente/vendedor") {
        console.log('corretor editando cliente')
        SalvarCliente();
      } else {
        console.log('corretor criando cliente')
        SalvarClienteByCorretor();
      }
    } else {
      SalvarCliente();
    }
  }

  async function SalvarClienteByCorretor() {
    setLoading(true);
    await api
      .post("cliente/cliente-bycorretor", {
        codCorretor: usuario.codCorretor,
        telefone: revertMask(props.telefone),
        email: props.email,
        nomeCompleto: props.nomeSocial,
        DtNascimento: props.dtNascimento,
        nivelCliente: 2,
        cpfcnpj: cpf,
        codEstadoCivil: Number(estadoCivil),
        rg: rg,
        Genero: Number(sexo),
      })
      .then((response) => {
        if (!response.data.success) {
          setAlertErro(true);
          setMsgErro(
            response.data.message
              ? response.data.message
              : "Houve um erro ao tentar efetuar o seu cadastro. Tente novamente mais tarde."
          );
        } else {
          localStorage.setItem("@appePlus/codCliente", response.data.data);
          CadastrarImgPerfil(Number(response.data.data));
          // setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setAlertErro(true);
        console.log(error.response);
        setMsgErro(
          error.response.data.message
            ? error.response.data.message
            : "Houve um erro ao tentar efetuar o seu cadastro. Tente novamente mais tarde."
        );
        setLoading(false);
        if (error.response?.status === 400) {
          setAlertErro(true);
          setMsgErro(
            error.response.data.message
              ? error.response.data.message
              : "Verifique se todos os campos foram preenchidos corretamente."
          );
          setLoading(false);
        }
      });
  }

  async function SalvarCliente() {
    setLoading(true);
    let codigoNivel = usuario.nivel;
    if (usuario.nivel === 1) {
      codigoNivel = 3
    } else if (codigoNivel == null && codNivel == null) {
      codigoNivel = 2
    }
    else if (codigoNivel == null && codNivel == 1) {
      codigoNivel = 3
    }
    else if (codigoNivel == null && codNivel == 2) {
      codigoNivel = 2
    }
    else if (codigoNivel == null && codNivel == 3) {
      codigoNivel = 3
    }
    
    await api
      .post("cliente/atualizar-dados-cliente", {
        codCliente: codCliente,
        dtNascimento: props.dtNascimento,
        cpfcnpj: cpf,
        codEstadoCivil: Number(estadoCivil),
        nivelCliente: codigoNivel,
        rg: rg,
        telefone: revertMask(props.telefone),
        email: props.email,
        nomeCompleto: props.nomeSocial,
        genero: Number(sexo),
      })
      .then((response) => {

        // console.log(response.data)
        CadastrarImgPerfil(codCliente);
        // setLoading(false);
        localStorage.removeItem('@appePlus/codNivelClienteEdicao');
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        if (error.response?.status === 400) {
          setAlertErro(true);
          setMsgErro(
            error.response.data.message
              ? error.response.data.message
              : "Houve um erro ao tentar efetuar o seu cadastro. Tente novamente mais tarde."
          );
          setLoading(false);
        }
      });


  }


  async function CadastrarImgPerfil(codCliente: number) {

    const formData = new FormData();

    let promises: any[] = []

    if (props.teste && props?.formFile) {
      promises.push(minify(props.formFile.file as File).then(result => {
        formData.append(`FormFile`, result, parse(props.formFile?.name as string) + `|0|13`);
      }))
    } else if (imgPerfil?.file) {
      promises.push(minify(imgPerfil.file as File).then(result => {
        formData.append(
          `FormFile`,
          result,
          parse(imgPerfil?.name) + `|${imgPerfil?.codArquivo}|13`
        );
      }))
    }

    uploadedFiles.forEach((data, index) => {
      promises.push(minify(data.file as File).then(result => {
        formData.append(
          `FormFile`,
          result,
          parse(data.name) + `|${data.codArquivo}|${"3"}`
        );
      }));
    });


    Promise.all(promises).then(() => {
      api
        .post(`/arquivoCliente/cadastrar?codCliente=${codCliente}`, formData)
        .then((response) => {
          if (props.corretorCadastrando) {
            console.log('corretor editando')
            setLoading(false);
            localStorage.removeItem('@appePlus/codClienteEdicao')
            history.push("/dashboard/corretor/clientes");
          } else if (props.edicao && !!codCliente && window.location.pathname === '/cadastro/cliente/vendedor') {
            console.log('corretor  editando cliente')
            setLoading(false);
            history.push("/dashboard/meus-imoveis");
          } else if (props.edicao && !!codCliente && window.location.pathname === '/cadastro/vendedor') {
            console.log('cliente editando')
            setLoading(false);
            history.push("/dashboard/meus-imoveis");
          } else {
            setLoading(false);
            history.push("/cadastro/imovel/anuncioSimples");
          }
        })
        .catch((error) => {
          setAlertErro(true);
          setMsgErro("Favor informar ao menos uma Imagem.");
          window.scrollTo(0, 0);
        });
    })
  }



  // async function CadastrarArquivos(){
  //   const formData = new FormData();
  //   uploadedFiles.map((data, index) => {
  //     formData.append(
  //       `FormFile`,
  //       data.file,
  //       data.name +
  //         `|${data.codArquivo}|${
  //           data.codTipoArquivo == "0" ? "1" : data.codTipoArquivo
  //         }`
  //     );
  //   });
  // }

  return (
    <>
      <div className="col-md-6">
        {alertErro && <Alert msg={msgErro} setAlertErro={setAlertErro} />}
        <p>Insira seu sexo e estado civil atualizados:</p>
        <div className="row">
          <div className="col-6 col-lg-4">
            <select
              className="form-select"
              value={sexo}
              onChange={({ target }) => setSexo(target.value)}
              aria-label="Default select example"
            >
              <option value="" disabled>
                Gênero
              </option>
              <option value="1">Masculino</option>
              <option value="2">Feminino</option>
            </select>
          </div>
          <div className="col-6 col-lg-4">
            <select
              className="form-select"
              value={estadoCivil}
              onChange={({ target }) => setEstadoCivil(target.value)}
              aria-label="Default select example"
            >
              <option value="" disabled>
                Estado civil
              </option>
              <option value="1">Solteiro</option>
              <option value="2">Casado</option>
              <option value="3">Divorciado</option>
              <option value="4">Viúvo</option>
            </select>
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="row mb-3">
          <div className="col-12 col-lg-12 mb-1 mt-5">
            <p>
              Informe os números de seus documentos{" "}
              {/* <span style={{ color: "#FF715B" }}>*</span> */}
            </p>
          </div>
          <div className="col-12 col-lg-3 mb-1">
            <input
              type="text"
              className="form-control"
              value={cpfMask(cpf)}
              maxLength={14}
              onChange={(event) => {
                setCpf(revertMask(event.target.value));
              }}
              required
              placeholder="CPF"
              onBlur={handleCpf}
            />
          </div>
          <div className="col-12 col-lg-3 mb-1">
            <input
              type="text"
              className="form-control"
              value={rg}
              maxLength={14}
              onChange={(event) => {
                setRg(event.target.value);
              }}
              required
              placeholder="RG"
            />
          </div>
        </div>
      </div>
      <div className="col-lg-12 mt-5 ">
        <p>
          Faça o Upload de um documento com foto{" "}
          {/* <span style={{ color: "#FF715B" }}>*</span> */}
        </p>
      </div>
      <div className="col-lg-12 msg-upload">
        <span>
          Ao realizar o upload do seus documento, certifique-se de enviar a
          frente e o verso do documento, garantido a possibilidade de
          averiguarmos foto, as numerações de CPF e RG, bem como a data e
          emissão e validade do documento
        </span>
      </div>
      <div className="col-lg-12 msg-upload">
        <span>
          Só serão aceitas imagens com as seguintes extensões: *jpg,*jpeg e
          *png.
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
      <div className="col-lg-12 mt-0 pt-4 row-gray text-end">
        <button className="buttonSalvar" onClick={handleSubmit}>
          {loading ? (
            <>
              Salvando{" "}
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            </>
          ) : (
            <>Salvar e continuar</>
          )}
        </button>
      </div>
    </>
  );
};

export default ProfileCadastroUserFisica;
