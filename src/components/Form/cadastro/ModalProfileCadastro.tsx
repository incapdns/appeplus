import sha256 from "crypto-js/sha256";
import { useEffect, useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import "../../../styles/components/Form/modalProfileCadastro.scss";
import { AiOutlineGoogle } from "react-icons/ai";
import {
  BsArrowRight,
  BsFillEyeFill,
  BsFillEyeSlashFill,
} from "react-icons/bs";
import { phoneMask, revertMask } from "../../../utils/Masks";
import Alert from "../../Alert";
import api from "../../../services/api";
import { GoogleLogin } from "react-google-login";
interface shadow {
  noBorder: boolean;
}
const ModalProfileCadastro = (props: shadow) => {
  const history = useHistory();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [cadGoogle, setCadGoogle] = useState(false);
  const [corretor, setCorretor] = useState(true);
  const [aceito, setAceito] = useState(false);
  const [comprador, setComprador] = useState(false);


  function verificaUrl() {
    if (window.location.pathname == "/cadastro/corretor") {
      setCorretor(true);

    } else {
      setCorretor(false);
    }
  }

  useEffect(() => {

    verificaUrl()

  }, []);

  const responseGoogleSucess = (response: any) => {
    setEmail(response.Vs.Gt);
    setNome(response.Vs.Pe);
    setCadGoogle(true);
    setSenha(response.Vs.TS);
    setConfirmarSenha(response.Vs.TS);
  };

  const responseGoogleError = (response: any) => {
    setAlertErro(true);
    setMsgErro(
      "Houve um erro ao tentar efetuar o seu cadastro com o Google. Tente novamente mais tarde."
    );
    setCadGoogle(false);
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    if (
      nome === "" ||
      email === "" ||
      senha === "" ||
      confirmarSenha === "" ||
      telefone === ""
    ) {
      setLoading(false);
      return setAlertErro(true), setMsgErro("Preencha todos os campos");
    }
    if (senha === confirmarSenha) {
      if (
        window.location.pathname.toLocaleLowerCase() == "/cadastro/corretor" ||
        window.location.pathname.toLocaleLowerCase() == "/"
      ) {
        if (aceito) {
          await api
            .post("Corretor/salvar", {
              usuario: {
                email,
                senha: sha256(senha).toString(),
              },
              telefone: revertMask(telefone),
              nomeCompleto: nome,
            })
            .then(response => {
              localStorage.setItem(
                "@appePlus/usuario",
                JSON.stringify(response.data.data)
              );
              history.push("/cadastro/dadosCorretor");
              setLoading(false);
            })
            .catch(error => {
              setLoading(false);
              setAlertErro(true);
              setMsgErro(
                error?.response?.data?.message
                  ? error.response.data.message
                  : "Houve um erro ao tentar efetuar o seu cadastro. Tente novamente mais tarde."
              );
            });
        } else {
          setLoading(false);
          setAlertErro(true);
          setMsgErro(
            "É necessário aceitar os termos de uso."
          );
        }

      } else {
        var urlComprador: boolean;
        if (window.location.pathname === "/cadastro/comprador") {
          urlComprador = true
        } else {
          urlComprador = false
        }
        let nivel = urlComprador ? 1 : 2;


        await api
          .post("cliente/salvar", {
            usuario: {
              email,
              senha: sha256(senha).toString(),
            },
            telefone: revertMask(telefone),
            nomeCompleto: nome,
            nivel: nivel
          })
          .then((response) => {
            console.log(response.data.data);
            console.log(
              "🚀 ~ file: ModalProfileCadastro.tsx ~ line 122 ~ .then ~ response.data.data",
              response.data.data
            );
            localStorage.setItem(
              "@appePlus/usuario",
              JSON.stringify(response.data.data)
            );

            if (urlComprador) {
              history.push("/cadastro/dadosComprador");
            } else {
              history.push("/cadastro/vendedor");
            }
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.log("Ocorreu um erro");
            setAlertErro(true);
            setMsgErro(
              error?.response?.data?.message
                ? error.response.data.message
                : "Houve um erro ao tentar efetuar o seu cadastro. Tente novamente mais tarde."
            );
          });
      }
    } else {
      setLoading(false);
      setAlertErro(true);
      setMsgErro(
        "Houve um erro ao tentar se cadastrar. Divergência de senhas."
      );
    }
  }

  return (
    <div
      className={props.noBorder ? `box-modal-no-shadow` : `box-modal-cadastro`}
    >
      {/* <div className="d-grid r-linha">
        <GoogleLogin
          clientId={
            "1067749589313-6eltbgbhmdteon48tj37l1tj1r2bebq4.apps.googleusercontent.com"
          }
          onSuccess={responseGoogleSucess}
          onFailure={responseGoogleError}
        >
          <span>Login com o Google</span>
        </GoogleLogin>
      </div> */}
      {alertErro && <Alert msg={msgErro} setAlertErro={setAlertErro} />}
      <form onSubmit={handleSubmit}>
        <p>Novo por aqui? Cadastre-se!</p>
        <div className="form-row">
          <div className="col-12 mb-2">
            <input
              type="text"
              className="form-control"
              id="inputNome"
              required
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              placeholder="Nome"
            />
          </div>
          <div className="col-12 mb-2">
            <input
              type="email"
              className="form-control"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="col-12 mb-2">
            <input
              type="text"
              value={phoneMask(telefone)}
              maxLength={15}
              required
              onChange={(event) => {
                setTelefone(revertMask(event.target.value));
              }}
              className="form-control"
              placeholder="Telefone celular"
            />
          </div>
          <p>Digite uma senha abaixo:</p>
          <div className="col-12 mb-2">
            <div className="input-group">
              <input
                type={verSenha ? "text" : "password"}
                required
                className="form-control"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                placeholder="*****"
              />
              <span
                className="input-group-text"
                id="verSenha"
                onClick={() => setVerSenha(!verSenha)}
              >
                {verSenha ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
              </span>
            </div>
          </div>
          <p>Confirmar senha:</p>
          <div className="col-12 mb-2">
            <div className="input-group">
              <input
                type={verConfirmarSenha ? "text" : "password"}
                required
                className="form-control"
                value={confirmarSenha}
                onChange={(event) => setConfirmarSenha(event.target.value)}
                placeholder="*****"
              />
              <span
                className="input-group-text"
                id="verSenha"
                onClick={() => setVerConfirmarSenha(!verConfirmarSenha)}
              >
                {verConfirmarSenha ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
              </span>
            </div>
          </div>

          <div className="col-12 mb-2" style={{ display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <input
                required
                className="form-check-input"
                type="checkbox"
                checked={aceito}
                onChange={({ target }) => setAceito(target.checked)}
                name="flexRadioDefault"
              />
            </div>
            {corretor ? (
              <div>
                <p>
                  Declaro que estou de acordo com os{" "}
                  <a
                    href="/termos-uso"
                    aria-label="Link para termos de uso"
                    target="_blank"
                  >
                    Termos de Uso
                  </a>{" "}
                  , ciente dos{" "}
                  <a
                    href="/termos-uso-corretor"
                    aria-label="Link para Termos e condições de uso do Corretor"
                    target="_blank"
                  >
                    Termos e condições de uso do Corretor
                  </a>{" "}
                  e{" "}
                  <a
                    href="/politica-privacidade"
                    aria-label="Link para política de privacidade"
                    target="_blank"
                  >
                    Política de Privacidade
                  </a>
                </p>
              </div>
            ) : (
              <div>
                <p>
                  Declaro que estou de acordo com os{" "}
                  {/* <a
                    href="/termos-uso-corretor"
                    aria-label="Link para termos e condições"
                    target="_blank"
                  >
                    Termos de Uso do Corretor
                  </a>{" "}
                  e com os{" "} */}
                  <a
                    href="/termos-uso"
                    aria-label="Link para termos e condições"
                    target="_blank"
                  >
                    Termos de Uso da plataforma
                  </a>{" "}
                  e ciente da{" "}
                  <a
                    href="/politica-privacidade"
                    aria-label="Link para política de privacidade"
                    target="_blank"
                  >
                    Política de Privacidade
                  </a>
                </p>
              </div>
            )}
          </div>


        </div>
        <button
          type="submit"
          className="btn-salvar-cadastrar"
          disabled={loading}
        >
          {loading ? (
            <>
              Salvando
              <div
                className="spinner-border spinner-border-sm mx-1"
                role="status"
              />
            </>
          ) : (
            <>
              Salvar e continuar
              <BsArrowRight size={24} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ModalProfileCadastro;
