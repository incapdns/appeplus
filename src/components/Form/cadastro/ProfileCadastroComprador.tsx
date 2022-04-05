import { useState, useCallback, useRef, FormEvent, useEffect } from "react";
import "../../../styles/components/Form/profileCadastroUserComprador.scss";
import Alert from "../../Alert";
import { useHistory } from "react-router-dom";
import api from "../../../services/api";
import { iDadosUsuario, iDataSelect } from "../../../@types";
import { FaSearch, FaRegSave } from "react-icons/fa";
import * as React from "react";
import Slider from "@mui/material/Slider";
import { cpfMask, revertMask, moeda } from "../../../utils/Masks";
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
export interface IArquivo {
  formFile: IFile | undefined;
  nomeSocial: string;
  dtNascimento: string;
  email: string;
  telefone: string;
  corretorCadastrando: boolean;
  edicao?: boolean
}

export interface IConheceu {
  value?: number;
  label?: string;
}

const ProfileCadastroUserComprador = (props: IArquivo) => {
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  var codNivel:any;
  var codCliente: any;


  if (props.corretorCadastrando && window.location.pathname === '/cadastro/cliente/comprador') {
    codCliente = Number(localStorage.getItem('@appePlus/codClienteEdicao'));
    codNivel = localStorage.getItem('@appePlus/codNivelClienteEdicao');

  } else {
    codCliente = usuario.codCliente;
  }



  const history = useHistory();
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const insertFocus = useRef<HTMLInputElement>(null);
  const [imgPerfil, setImgPerfil] = useState<IFile>();

  const [comoNosConheceu, setComoNosConheceu] = useState<IConheceu[]>([]);
  const [filhos, setFilhos] = useState(false);
  const [motivo, setMotivo] = useState(0);
  const [motivos, setMotivos] = useState<iDataSelect[]>([]);
  const [comoConheceu, setComoConheceu] = useState("");
  const [genero, setGenero] = useState(0);
  const [estadoCivil, setEstadoCivil] = useState(0);
  const [estadosCivis, setEstadosCivis] = useState<iDataSelect[]>([]);
  const [sair, setSair] = useState(false);
  const [carregou, setCarregou] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    GetComoConheceu();
    GetEstadoCivil();
    GetMotivos();
    GetDadosCliente()
    if (!carregou) {
      setCarregou(true);
    }
  }, [carregou]);

  useEffect(() => {
    setImgPerfil(props.formFile);
  }, [imgPerfil]);

  async function GetComoConheceu() {
    await api
      .get("origemCadastro/buscar/autoComplete")
      .then((response) => {
        setComoNosConheceu(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function GetEstadoCivil() {
    await api
      .get("EstadoCivil/buscar")
      .then((response) => {
        setEstadosCivis(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function GetMotivos() {
    await api
      .get("motivoCompra/buscar/autoComplete")
      .then((response) => {
        setMotivos(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  function salvarSair(event: FormEvent) {
    setSair(true);
    handleSubmit(event);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (
      comoConheceu === "" ||
      motivo === 0 ||
      genero === 0 ||
      estadoCivil === 0 ||
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
    
    if (codCliente && window.location.pathname === '/cadastro/dadosComprador') {
      SalvarCliente();
    }

    if (props.corretorCadastrando && codCliente && window.location.pathname === '/cadastro/cliente/comprador') {
      SalvarCliente();
    } else if (props.corretorCadastrando) {
      SalvarClienteByCorretor();
    }
  }

  async function SalvarClienteByCorretor() {
    setLoading(true)
    var codigoNivel;
    if (usuario.codCorretor && window.location.pathname === "/cadastro/cliente/comprador") {
      codigoNivel = 1
    }

    console.log(props);

    await api
      .post("cliente/cliente-bycorretor", {
        codCorretor: usuario.codCorretor,
        telefone: revertMask(props.telefone),
        email: props.email,
        nomeCompleto: props.nomeSocial,
        DtNascimento: props.dtNascimento,
        nivelCliente: codigoNivel,
        codEstadoCivil: estadoCivil,
        Filhos: filhos,
        codMotivoCompra: motivo,
        Genero: genero,
        codVeiculoCaptacao: Number(comoConheceu),
      })
      .then((response) => {
        localStorage.setItem("@appePlus/codCliente", response.data.data);
        CadastrarImgPerfil(Number(response.data.data));
        // setLoading(false)
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setAlertErro(true);
        if (error.response?.status === 400) {
          setMsgErro(
            error.response.data.message
              ? error.response.data.message
              : "Houve um erro ao tentar efetuar o seu cadastro. Tente novamente mais tarde."
          );
        } else {
          setMsgErro(
            "Não foi possivel cadastrar o cliente, verifique as informações e tente novamente."
          );
          setLoading(false)
        }
      });
  }

  async function SalvarCliente() {
    setLoading(true)
    let codigoNivel = usuario.nivel;
    if (codigoNivel === 2) {
      codigoNivel = 3
    } else if (codigoNivel == null && codNivel == null) {
      codigoNivel = 1
    }else if (codigoNivel == null && codNivel == 1) {
      codigoNivel = 1
    }else if (codigoNivel == null && codNivel == 2) {
      codigoNivel = 3
    }else if (codigoNivel == null && codNivel == 3) {
      codigoNivel = 3
    }
    await api
      .post("cliente/atualizar-dados-cliente", {
        dtNascimento: props.dtNascimento,
        codCliente: codCliente,
        codEstadoCivil: estadoCivil,
        filhos: filhos,
        nivelCliente: codigoNivel,
        codMotivoCompra: motivo,
        genero: genero,
        telefone: revertMask(props.telefone),
        email: props.email,
        nomeCompleto: props.nomeSocial,
        codVeiculoCaptacao: Number(comoConheceu),
      })
      .then((response) => {
        console.log(response.data.data)
        localStorage.removeItem('@appePlus/codNivelClienteEdicao');
        // setLoading(false)
        CadastrarImgPerfil(codCliente);
      })
      .catch((error) => {
        console.log("Ocorreu um erro ");
        if (error.response?.status === 400) {
          setAlertErro(true);
          setMsgErro(
            error.response.data.message
              ? error.response.data.message
              : "Houve um erro ao tentar efetuar o seu cadastro. Tente novamente mais tarde."
          );
        }
      });
  }

  async function CadastrarImgPerfil(codCliente: number) {
    const formData = new FormData();

    if (imgPerfil?.file) {
      formData.append(
        `FormFile`,
        imgPerfil?.file,
        parse(imgPerfil?.name) + `|${imgPerfil?.codArquivo}|13`
      );
    } else if (props?.formFile) {
      formData.append(
        `FormFile`,
        props?.formFile?.file,
        parse(props.formFile?.name) + `|${props.formFile?.codArquivo}|13`
      );
    }
    api
      .post(`/arquivoCliente/cadastrar?codCliente=${codCliente}`, formData)
      .then((response) => {
        if (props.corretorCadastrando && codCliente && window.location.pathname === '/cadastro/cliente/comprador') {
          setLoading(false)
          history.push("/dashboard/corretor/clientes");
        } else if (props.edicao && codCliente && window.location.pathname === '/cadastro/dadosComprador') {
          setLoading(false)
          history.push("/cadastro/interesse");
        } else {
          if (sair) {
            history.push("/");
          } else {
            history.push("/cadastro/interesse");
          }
        }
      })
      .catch((error) => {
        setAlertErro(true);
        console.log(error);
        setMsgErro("Favor informar ao menos uma Imagem.");
        window.scrollTo(0, 0);
      });
  }

  async function GetDadosCliente() {
    await api.get(`cliente/recuperar-dados-cliente?codCliente=${codCliente}`).then(response => {
      console.log(response.data.data)
      const res = response.data.data;
      res.codEstadoCivil && setEstadoCivil(Number(res.codEstadoCivil));
      res.genero && setGenero(Number(res.genero));
      res.codVeiculoCaptacao && setComoConheceu(res.codVeiculoCaptacao);
      res.codMotivoCompra && setMotivo(res.codMotivoCompra);
    }).catch(error => {
      console.log(error)
    })
  }



  return (
    <div id="cadastro-comprador">
      <div className="row-gray" />
      {alertErro && <Alert msg={msgErro} setAlertErro={setAlertErro} />}
      <div className="col-lg-8 col-12 my-5 d-flex align-items-center flex-wrap ">
        <h1 className="title">Dados pessoais</h1>
      </div>

      <div className="col-lg-9 mb-5">
        <p>
          Como nos conheceu?<span style={{ color: "#FF715B" }}>*</span>
        </p>
        <div className="row">
          <div className="col-12 col-lg-4">
            <select
              className="form-select"
              value={comoConheceu}
              onChange={(e) => setComoConheceu(e.target.value)}
              aria-label="Default select example"
            >
              <option value="" disabled>
                Como conheceu
              </option>
              {comoNosConheceu.map((conheceu) => {
                return <option value={conheceu.value}>{conheceu.label}</option>;
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="col-lg-9 col-12 mb-5">
        <p>
          Insira seu gênero e estado civil atualizados:
          <span style={{ color: "#FF715B" }}>*</span>
        </p>
        <div className="row">
          <div className="col-12 col-lg-4">
            <select
              className="form-select"
              value={genero}
              onChange={({ target }) => setGenero(Number(target.value))}
              aria-label="Default select example"
            >
              <option value="0" disabled>
                Gênero
              </option>
              <option value="1">Masculino</option>
              <option value="2">Feminino</option>
            </select>
          </div>
          <div className="col-12 col-lg-4">
            <select
              className="form-select"
              value={estadoCivil}
              onChange={(e) => {
                setEstadoCivil(Number(e.target.value));
              }}
              aria-label="Default select example"
            >
              <option value="0" disabled>
                Estado Civil
              </option>
              {estadosCivis.map((estados) => {
                return <option value={estados.value}>{estados.label}</option>;
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="col-lg-9 col-12 mb-5">
        <p>
          Você tem filhos?<span style={{ color: "#FF715B" }}>*</span>
        </p>
        <div className="d-flex">
          <div className={`checked-box d-flex align-items-center `}>
            <div
              className={`box-input-checked d-flex align-items-center justify-content-around mr-1 `}
            >
              <input
                className="form-check-input"
                type="radio"
                value="true"
                name="flexRadio"
                id="flexRadioDefault1"
                checked={filhos == true ? true : false}
                onClick={() => setFilhos(true)}
              />
            </div>
            <label
              className="form-check-label filhos"
              htmlFor="flexRadioDefault1"
            >
              Sim
            </label>
          </div>
          <div className={`checked-box d-flex align-items-center `}>
            <div
              className={`box-input-checked d-flex align-items-center justify-content-around mr-1 `}
            >
              <input
                className="form-check-input"
                type="radio"
                value="false"
                name="flexRadio"
                id="flexRadioDefault2"
                checked={filhos == false ? true : false}
                onClick={() => setFilhos(false)}
              />
            </div>
            <label
              className="form-check-label filhos"
              htmlFor="flexRadioDefault2"
            >
              Não
            </label>
          </div>
        </div>
      </div>

      <div className="col-lg-6 col-12 mb-4">
        <p style={{ marginBottom: 20 }}>
          {" "}
          Conte um pouco mais sobre porque está buscando este novo móvel:{" "}
          <span style={{ color: "#FF715B" }}>*</span>
        </p>
        <div className="d-flex col-lg-12">
          <div className="col-lg-12">
            <div className="form-check col-lg-12 lista-motivos">
              {motivos.map((motivos) => {
                return (
                  <div className="col-lg-6 col-12 inline-block">
                    <input
                      className="form-check-input"
                      type="radio"
                      value={motivos.value}
                      checked={motivos.value == motivo}
                      id="flexCheckDefault3"
                      name="radio"
                      onChange={(e) => {
                        setMotivo(Number(e.target.value));
                      }}
                    />
                    <label
                      className="form-check-label motivos"
                      htmlFor="flexCheckDefault"
                    >
                      {motivos.label}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12 mt-0 pt-4 text-lg-end text-md-end text-center botoes">
        {/* <button className="buttonSave" onClick={salvarSair}>
          Salvar dados e sair
          <FaRegSave size={18} style={{ marginLeft: 10 }} />
        </button> */}
        <button
          className="buttonSearch text-lg-end text-md-end text-center"
          onClick={handleSubmit}
        >
          {props.corretorCadastrando
            ? (
              <>
                {loading ? (<>Salvando <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /></>):(<>Salvar cliente</> )}
              </>
            )
            : (
              <>
                {props.edicao ? (
                  <>  {loading ? (<>Salvando <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /></>)
                    : (<>Salvar e continuar</>)}</>
                ): (<>  {loading ? (<>Salvando <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /></>)
                : (<>Buscar meu imóvel <FaSearch style={{ marginLeft: 10 }} /></>)}</>)}
              </>

            )}


          
        </button>
      </div>
    </div>
  );
};

export default ProfileCadastroUserComprador;
