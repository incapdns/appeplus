import { useState, useCallback, FormEvent, useEffect, useMemo } from "react";
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
import { iDadosUsuario } from "../../../@types";
import { IArquivos } from "./ProfileCadastroCorretor";
import minify from "../../../utils/minify";
import parse from "../../../utils/parse";
import Upload, { IFile } from "../../UploadArquivos/Upload";
import { FiSave } from "react-icons/fi";
import { Upload as UploadCore } from "../../UploadArquivos/core/Upload";

interface iStep {
  setStep: (value: number) => void;
  codImovel: string;
  step: number;
  idImovel?: number | unknown;
}

export interface IArquivo {
  formFile: any | undefined;
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
  var codCliente: any;

  if (props.corretorCadastrando && window.location.pathname === '/cadastro/cliente/vendedor') {
    codCliente = Number(localStorage.getItem('@appePlus/codClienteEdicao'));
  } else {
    codCliente = usuario.codCliente;
  }

  const history = useHistory();
  const [sexo, setSexo] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const [imgPerfil, setImgPerfil] = useState<any>();
  const [tipoArquivo, setTipoArquivo] = useState<iDataSelect[]>([]);
  const [carregou, setCarregou] = useState(false);
  const [loading, setLoading] = useState(false);

  let [upload, setUpload] = useState<UploadCore>()

  const onDone = useCallback(() => {
    if (props.corretorCadastrando) {
      console.log('corretor editando')
      localStorage.removeItem('@appePlus/codClienteEdicao')
      history.push("/dashboard/corretor/clientes");
    } else if (props.edicao && !!codCliente && window.location.pathname === '/cadastro/cliente/vendedor') {
      console.log('corretor  editando cliente')
      history.push("/dashboard/meus-imoveis");
    } else if (props.edicao && !!codCliente && window.location.pathname === '/cadastro/vendedor') {
      console.log('cliente editando')
      history.push("/dashboard/meus-imoveis");
    } else {
      history.push("/cadastro/imovel/anuncioSimples");
    }
  }, [])

  const format = useCallback((data: IFile) => {
    return parse(data.name) + `|0|${data.meta.type}`
  }, [])

  const meta = useMemo(() => {
    return {type: 3}
  }, [])

  function handleCpf() {
    if (!validaCpf(cpf) && cpf.length === 11) {
      setMsgErro("CPF inválido !");
      setAlertErro(true);
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
      res.arquivosCliente.map(async (arquivo: any) => {
        let file: File;

        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.open("GET", arquivo.url, true);
        xhr.setRequestHeader("Accept", "*/*");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.onload = function (e) {
          if (this.status == 200) {
            file = new File([this.response], arquivo.nomeArquivo, { type: "image/png" });

            if (arquivo.codTipoArquivo == 3) {
              let meta = {type: arquivo.codTipoArquivo}

              const content: IFile = { file, meta, name: arquivo.nomeArquivo, id: String(arquivo.codArquivoCliente), progress: 100, preview: URL.createObjectURL(file) }

              upload!.initFiles([content])
            }
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

    // if (!carregou) {
    //   setCarregou(true);
    // }


  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (
      !upload!.files.length ||
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
        if(!response.data.success){
          setAlertErro(true);
          setMsgErro(
            response.data.message
              ? response.data.message
              : "Houve um erro ao tentar efetuar o seu cadastro. Tente novamente mais tarde."
          );
        } else {
          localStorage.setItem("@appePlus/codCliente", response.data.data);
          CadastrarImgPerfil(Number(response.data.data));
          setLoading(false);
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
    } else if (codigoNivel == null) {
      codigoNivel = 2
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
        CadastrarImgPerfil(codCliente);
      })
      .catch((error) => {
        console.log({abc: error})
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

    if (props.teste && props?.formFile) {
      formData.append(`FormFile`, props.formFile.file, parse(props.formFile.name) + `|0|13`);
      api
        .post(`/arquivoCliente/cadastrar?codCliente=${codCliente}`, formData)
    }
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
      <div className="col-md-7">
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
        <Upload 
          start={loading} 
          upload={`/arquivoCliente/cadastrar?codCliente=${codCliente}`}
          remove={'/arquivoCliente?codArquivo=:id'}
          format={format}
          meta={meta}
          onDone={onDone}
          onAfterInit={core => {
            upload = core;
            setUpload(core)
          }}
          />
      </div>
      <div className="col-lg-12 mt-0 pt-4 row-gray text-end">
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
    </>
  );
};

export default ProfileCadastroUserFisica;