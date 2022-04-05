import { useState, FormEvent, useEffect, useRef, useCallback } from "react";
import Footer from "../components/Footer";
import ProfileCadastroUserCorretor from "../components/Form/cadastro/ProfileCadastroCorretor";
import "../styles/components/Form/profileCheckedUser.scss";
import Navbar from "../components/Navbar";
import "../styles/cadastroVendedor.scss";
import { useHistory, useLocation } from "react-router-dom";
import { iDadosUsuario } from "../@types";
import "../styles/components/Form/profilePhotoUser.scss";
import "../styles/components/Form/profileCadastroUser.scss";
import ProfileCadastroUserFisica from "../components/Form/cadastro/ProfileCadastroUserFisica";
import ProfileCadastroUserJuridico from "../components/Form/cadastro/ProfileCadastroUserJuridico";
import { v4 as uuidv4 } from "uuid";
import filesize from "filesize";
import api from "../services/api";
import { dateNascMask, phoneMask, revertMask } from "../utils/Masks";
import ProfileCadastroUserComprador from "../components/Form/cadastro/ProfileCadastroComprador";
import { StepperCadastroCorretor } from "../components/StepperCadastroCorretor";
import Alert from "../components/Alert";

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
}

export interface IArquivos {
  codArquivoCliente?: number
  codArquivoCorretor?: number;
  codTipoArquivo?: number;
  nomeArquivo: string;
  url: string;
}

export interface IEstadoCivil {
  value?: number;
  label?: string;
}

export default function CadastroVendedor() {
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );

  var codCliente: any;

  if (window.location.pathname === '/cadastro/cliente/vendedor' ||
    window.location.pathname === '/cadastro/cliente/comprador') {
    codCliente = Number(localStorage.getItem('@appePlus/codClienteEdicao'));
  }
  if (window.location.pathname === '/cadastro/vendedor' ||
    window.location.pathname === '/cadastro/dadosComprador') {
    codCliente = usuario.codCliente;
  }


  const location: any = useLocation();
  const [checkedComprarImovel, setCheckedComprarImovel] = useState("");
  const history = useHistory();
  const [imgUser, setImgUser] = useState<any>({});
  const fileRef = useRef<HTMLInputElement>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dtnascimento, setDtNascimento] = useState("");
  const [select, setSelect] = useState("fisica");
  let [imgPerfil, setImgPerfil] = useState<IFile>();
  const [tipoCorretorCadastrando, setTipoCorretorCadastrando] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);
  const [uploadedFiles2, setUploadedFiles2] = useState<IFile[]>([]);
  const [imgUserEdit, setUserEdit] = useState("");
  const [userImageEdit, setUserImageEdit] = useState(false);
  const [teste, setTeste] = useState(false);
  let [verificaCampos, setVerificaCampos] = useState<boolean>();
  const [edicao, setEdicao] = useState(location?.state?.edicao);
  const [alertErro, setAlertErro] = useState(false);
  const [carregou, setCarregou] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  let [corretorCadastrando, setCorretorCadastrando] = useState(false);
  // let corretorCadastrando = false;

  function caminho() {
    if (window.location.pathname === "/cadastro/vendedor") {
      setCheckedComprarImovel("vendedor");
    } else if (window.location.pathname === "/cadastro/dadosCorretor") {
      setCheckedComprarImovel("corretor");
    } else if (window.location.pathname === "/cadastro/dadosComprador") {
      // corretorCadastrando = true; //somente para liberar inputs de nome email e telefone
      // setCorretorCadastrando(true);  //somente para liberar inputs de nome email e telefone
      setCheckedComprarImovel("comprador");
    } else if (window.location.pathname === "/cadastro/cliente/comprador") {
      corretorCadastrando = true;
      setCorretorCadastrando(true);
      // setUserImageEdit(false);
      setCheckedComprarImovel("comprador");
    } else if (window.location.pathname === "/cadastro/cliente/vendedor") {
      corretorCadastrando = true;
      setCorretorCadastrando(true);
      // setUserImageEdit(false);
      setCheckedComprarImovel("vendedor");
    }
  }

  // console.log(
  //   "🚀 ~ file: CadastroVendedor.tsx ~ line 88 ~ caminho ~ corretorCadastrando",
  //   corretorCadastrando
  // );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  function previewPhoto(event: FormEvent) {
    event.preventDefault();
    fileRef.current?.click();
  }

  const handleImgChange = useCallback(({ target }: any) => {
    setUserImageEdit(false);
    setImgUser({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
    const newUploadedFiles: IFile = {
      file: target.files[0],
      id: uuidv4(),
      name: target.files[0].name,
      readableSize: filesize(target.files[0].size),
      preview: URL.createObjectURL(target.files[0]),
      progress: 0,
      uploaded: false,
      error: false,
      url: "",
      codArquivo: "0",
      codTipoArquivo: "13",
    };
    imgPerfil = newUploadedFiles;

    setImgPerfil(newUploadedFiles);

    if (!userImageEdit) {
      setTeste(true);
    }
  }, []);

  function getDados() {
    if (!edicao) {
      console.log("edicao", edicao)
      setNome(usuario.nomeCompleto);
      setEmail(usuario.email);
      setTelefone(usuario.telefone);
    } else {
      console.log("edicao", edicao)
    }

  }

  async function GetDataNascimento() {
    if (usuario.codCorretor !== null) {
      await api
        .get(`Corretor/buscar?codCorretor=${usuario.codCorretor}`)
        .then((response) => {
          const res = response.data.data[0];
          if (res.dtNascimento) {
            const dtNascimentoReplace = res.dtNascimento
              ? res.dtNascimento.substring(
                0,
                (res.dtNascimento + " ").indexOf("T")
              )
              : null;
            setDtNascimento(dtNascimentoReplace);
          }
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
        });
    }

  }

  async function GetDadosPessoais() {
    if (usuario.codCorretor !== null) {
      await api
        .get(`Corretor/buscar?codCorretor=${usuario.codCorretor}`)
        .then((response) => {
          const res = response.data.data[0];
          res.nomeCompleto && setNome(res.nomeCompleto)
          res.email && setEmail(res.email)
          res.telefone && setTelefone(res.telefone)

          let newUploadedFiles: IFile;
          res.arquivos.map(async (arquivo: IArquivos) => {
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
                  id: String(arquivo.codArquivoCorretor),
                  name: arquivo.nomeArquivo,
                  readableSize: filesize(file.size),
                  preview: arquivo.url,
                  progress: 0,
                  uploaded: false,
                  error: false,
                  url: "",
                  codArquivo: String(arquivo.codArquivoCorretor),
                  codTipoArquivo: String(arquivo.codTipoArquivo),
                };

                if (
                  arquivo.codTipoArquivo !== 3 &&
                  arquivo.codTipoArquivo !== 6
                ) {
                  setUserImageEdit(true);
                  setImgPerfil(newUploadedFiles);
                }
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
  }
  async function GetDataNascimentoCliente() {
    if (!!codCliente) {
      await api
        .get(`cliente/recuperar-dados-cliente?codCliente=${codCliente}`)
        .then((response) => {
          console.log('GetDtNascimento ~ ', response);
          const res = response.data.data;
          if (res.dtNascimento) {
            const dtNascimentoReplace = res.dtNascimento
              ? res.dtNascimento.substring(
                0,
                (res.dtNascimento + " ").indexOf("T")
              )
              : null;
            setDtNascimento(dtNascimentoReplace);
          }
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
        });
    }
  }
  async function GetDadosClienteVendedor() {
    await api.get(`cliente/recuperar-dados-cliente?codCliente=${codCliente}`).then(response => {
      // console.log(response.data.data)
      const res = response.data.data;
      res.nomeCompleto && setNome(res.nomeCompleto)
      res.email && setEmail(res.email)
      res.telefone && setTelefone(res.telefone)

      let newUploadedFiles: IFile;
      res.arquivosCliente.map(async (arquivo: IArquivos) => {
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


            if (
              arquivo.codTipoArquivo !== 3 &&
              arquivo.codTipoArquivo !== 6
            ) {
              setUserImageEdit(true);
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

  async function GetDadosClienteComprador() {
    await api.get(`cliente/recuperar-dados-cliente?codCliente=${codCliente}`).then(response => {
      // console.log(response.data.data)
      const res = response.data.data;
      console.log(response.data.data)
      res.nomeCompleto && setNome(res.nomeCompleto)
      res.email && setEmail(res.email)
      res.telefone && setTelefone(res.telefone)

      let newUploadedFiles: IFile;
      res.arquivosCliente.map(async (arquivo: IArquivos) => {
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


            if (
              arquivo.codTipoArquivo !== 3 &&
              arquivo.codTipoArquivo !== 6
            ) {
              setUserImageEdit(true);
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

  function verificaInputsEmail() {
    if (corretorCadastrando) {
      if (email !== "") {
        api
          .get(`api/Usuario/validar-email-telefone?Email=${email}`)
          .then((response) => {
            verificaCampos = response.data.data;

            if (verificaCampos) {
              setAlertErro(true);
              setMsgErro(
                "O email informado, já está vinculado a outro usuário da plataforma"
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  function verificaInputsTel() {
    if (telefone !== "") {
      const tel = revertMask(telefone);
      if (checkedComprarImovel == "comprador" || checkedComprarImovel == "vendedor") {
        api
          .get(`/cliente/verificar-cpf-telefone?telefone=${tel}&codCliente=${usuario.codCliente}`)
          .then((response) => {
            if (response.data.data > 0) {
              setAlertErro(true);
              setMsgErro(
                "O número de telefone informado já está vinculado a outro usuário da plataforma."
              );
              setTelefone("");
              return;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log('Passou aqui 6');
        api
          .get(`/corretor/verificar-cpf-telefone?telefone=${tel}&codCorretor=${usuario.codCorretor}`)
          .then((response) => {
            if (response.data.data > 0) {
              setAlertErro(true);
              setMsgErro(
                "O número de telefone informado já está vinculado a outro usuário da plataforma."
              );
              setTelefone("");
              return;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }



  useEffect(() => {
    caminho();
    if (!carregou) {
      setCarregou(true);
    }
    if (corretorCadastrando) {
      GetDataNascimentoCliente()
    } else {
      getDados();
      GetDataNascimento();

    }
    window.scrollTo(0, 0);
  }, [imgPerfil, email, nome, telefone, corretorCadastrando]);

  useEffect(() => {
    if (!!codCliente && window.location.pathname === "/cadastro/cliente/vendedor") {
      GetDadosClienteVendedor()

    }
    if (!!codCliente && window.location.pathname === "/cadastro/cliente/comprador") {
      GetDadosClienteComprador()

    }
    if (window.location.pathname === "/cadastro/dadosCorretor") {
      GetDadosPessoais();
    }
    if (window.location.pathname === "/cadastro/dadosComprador") {
      GetDadosClienteComprador();
      GetDataNascimentoCliente();
    }
    if (window.location.pathname === "/cadastro/vendedor") {
      GetDadosClienteVendedor();
      GetDataNascimentoCliente();
    }



  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-lg-9">
            <div className="row">
              <div className="col-md-12 my-5">
                <h1 className="title">Dados de perfil</h1>
              </div>
            </div>
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <div className="box-user-photo  d-flex flex-column align-items-center">
                  <div className="profile mb-2">
                    <button className="uploadBtn" onClick={previewPhoto}>
                      {userImageEdit ? (
                        <img src={imgPerfil?.preview} alt="user" id="photo" />
                      ) : (
                        <>
                          {imgUser.preview ? (
                            <img src={imgUser.preview} alt="user" id="photo" />
                          ) : (
                            <img
                              src="/assets/image-user.jpg"
                              alt="user"
                              id="photo"
                            />
                          )}
                        </>
                      )}

                      <p>Upload</p>
                    </button>
                    <input
                      type="file"
                      id="file"
                      ref={fileRef}
                      onChange={handleImgChange}
                    />
                  </div>
                  <p>
                    Insira uma foto para seu perfil:
                    <span style={{ color: "#FF715B" }}>*</span>
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col">
                    <p>Dados para contato</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 col-lg-6 mb-1">
                    <span>Nome:</span>
                    <input
                      type="text"
                      className="form-control"
                      value={nome}
                      onChange={(event) => {
                        setNome(event.target.value);
                      }}

                      placeholder="Nome"
                    />
                  </div>
                  <div className=" col-12 col-lg-6 mb-1">
                    <span>E-mail:</span>
                    <input
                      type="text"
                      className="form-control"
                      value={email}
                      onBlur={verificaInputsEmail}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      disabled={!corretorCadastrando}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className=" col-12 col-lg-6 mb-1 p-lg-0 p-xl-1 ">
                    <span>Telefone:</span>
                    <input
                      type="text"
                      className="form-control"
                      onBlur={verificaInputsTel}
                      maxLength={15}
                      value={phoneMask(telefone)}
                      onChange={(event) => {
                        setTelefone(event.target.value);
                      }}
                      placeholder="Telefone Celular"
                    />
                  </div>
                  <div className=" col-12 col-lg-6 mb-1 p-lg-0 p-xl-1">
                    <span>Data de nascimento:</span>
                    <input
                      type="date"
                      className="form-control"
                      max="2999-12-31"
                      value={dtnascimento}
                      onChange={(event) => {
                        setDtNascimento(event.target.value);
                      }}
                      placeholder="Data de nascimento"
                    />
                  </div>
                </div>
              </div>
              {alertErro && (
                <div className="mt-3 mb-0">
                  <Alert msg={msgErro} setAlertErro={setAlertErro} />
                </div>
              )}
              <div className="d-flex align-items-center flex-wrap box-checked-row py-4">
                {checkedComprarImovel == "vendedor" && (
                  <div className={`checked-box d-flex align-items-center `}>
                    <div
                      className={`box-input-checked d-flex align-items-center justify-content-around mr-1 `}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        value="vendedor"
                        checked={
                          checkedComprarImovel == "vendedor" ? true : false
                        }
                        name="flexRadioDefault"
                      />
                    </div>
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Quero vender meu Imóvel
                    </label>
                  </div>
                )}
                {checkedComprarImovel == "corretor" && (
                  <div className="checked-box d-flex align-items-center">
                    <div className="box-input-checked d-flex align-items-center justify-content-around mr-1">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        value="corretor"
                        checked={
                          checkedComprarImovel == "corretor" ? true : false
                        }
                      />
                    </div>
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Quero ser corretor
                    </label>
                  </div>
                )}
                {checkedComprarImovel == "comprador" && (
                  <div className="checked-box d-flex align-items-center">
                    <div className="box-input-checked d-flex align-items-center justify-content-around mr-1">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        value="corretor"
                        checked={
                          checkedComprarImovel == "comprador" ? true : false
                        }
                      />
                    </div>
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Quero comprar um imóvel
                    </label>
                  </div>
                )}
              </div>

              {checkedComprarImovel == "vendedor" ? (
                <div>
                  <div className="row-gray"></div>
                  <div className="col-lg-8 col-12 my-5 d-flex align-items-center flex-wrap ">
                    <h1 className="title">Dados de cadastro para</h1>
                    <select
                      className="form-select-title"
                      value={select}
                      onChange={({ target }) => setSelect(target.value)}
                    >
                      <option value="fisica">Pessoa física</option>
                    </select>
                  </div>
                  {select === "fisica" ? (
                    <ProfileCadastroUserFisica
                      verificaCampos={verificaCampos}
                      corretorCadastrando={corretorCadastrando}
                      formFile={imgPerfil}
                      teste={teste}
                      nomeSocial={nome}
                      dtNascimento={dtnascimento}
                      email={email}
                      telefone={telefone}
                      edicao={edicao}
                    />
                  ) : (
                    <ProfileCadastroUserJuridico />
                  )}
                </div>
              ) : (
                ""
              )}
              {checkedComprarImovel == "corretor" && (
                <ProfileCadastroUserCorretor
                  formFile={imgPerfil}
                  teste={teste}
                  nomeSocial={nome}
                  dtNascimento={dtnascimento}
                  telefone={telefone}
                />
              )}
              {checkedComprarImovel == "comprador" && (
                <ProfileCadastroUserComprador
                  corretorCadastrando={corretorCadastrando}
                  formFile={imgPerfil}
                  nomeSocial={nome}
                  dtNascimento={dtnascimento}
                  email={email}
                  telefone={telefone}
                  edicao={edicao}
                />
              )}
            </form>
          </div>
          <div className="col-lg-3 mt-5">
            {checkedComprarImovel == "corretor" && (
              <StepperCadastroCorretor
                dadosPessoais
                uploadDocumento
                uploadComprovante
                editar={edicao}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
