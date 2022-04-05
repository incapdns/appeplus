import { useState, useEffect } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { FiInstagram, FiSave, FiYoutube } from "react-icons/fi";
import {
  TiSocialFacebookCircular,
  TiSocialLinkedinCircular,
} from "react-icons/ti";
import { iBancos, iDadosUsuario } from "../../../@types";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { StepperCadastroCorretor } from "../../../components/StepperCadastroCorretor";
import api from "../../../services/api";
import Alert from "../../../components/Alert";
import { useHistory, useLocation } from "react-router-dom";
import "../../../styles/pages/cadastro/corretor/geral.scss";

interface iDadosBancarios {
  agencia: number;
  codBanco: number;
  codContaBancaria: number;
  codCorretor: number;
  contaCorrente: number;
  cpfCorretor: any;
  cpfcnpj: any;
  descContaBancaria: string;
  nomeCliente: any;
  nomeCorretor: any;
  numeroCreciCorretor: any;
  saldoInicial: number;
}

const DadosBancarios = () => {
  const location: any = useLocation();
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const history = useHistory();
  const [bancos, setBancos] = useState<iBancos[]>([]);
  const [dadosBancarios, setDadosBancarios] = useState<iDadosBancarios[]>([]);
  const [bancoSelect, setBancoSelect] = useState("");
  const [tipoConta, setTipoConta] = useState("");
  const [agencia, setAgencia] = useState("");
  const [contaNumero, setContaNumero] = useState("");
  const [CodContaBancaria, setCodContaBancaria] = useState(0);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const [error, setError] = useState("");
  const [edicao, setEdicao] = useState(location?.state?.edicao);
  const [loading, setLoading] = useState(false)

  const codigoBanco = Number(bancoSelect);
  const numberAgencia = agencia
    ? Number(agencia.toString().replace(/\D/g, ""))
    : null;
  const numberConta = contaNumero
    ? Number(contaNumero.toString().replace(/\D/g, ""))
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    checaUsuarioLogado();
    getBancos();
    GetContaBancaria();
  }, []);

  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  console.log("edicao -> ", edicao);

  async function GetContaBancaria() {
    await api
      .get(`conta-bancaria?CodCorretor=${usuario.codCorretor}`)
      .then((response) => {
        console.log(response.data.data);
        setEdicao(response.data.data != null);
        setDadosBancarios(response.data.data);
        setAgencia(response?.data?.data?.agencia);
        setContaNumero(response.data.data.contaCorrente);
        setBancoSelect(response.data.data.codBanco);
        setTipoConta(response.data.data.descContaBancaria);
        setCodContaBancaria(response.data.data.codContaBancaria);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function AtualizarStatusCorretor() {

    await api
      .patch(
        `Corretor/alterar-status-corretor/${usuario.codCorretor}?CodStatusCorretor=3`
      )
      .then((response) => {
        AtualizarStatusCadastro();
      })
      .catch((error) => {

        console.log(error);
      });
  }

  async function AtualizarStatusCadastro() {
    await api
      .patch(`Corretor/atualizar-status-cadastro?CodCorretor=${usuario.codCorretor}&StatusCadastro=4`)
      .then((response) => {
        history.push("/cadastro/corretor/sucesso");
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function AtualizarContaBancaria() {
    console.log("AtualizarContaBancaria");
    
    if (numberAgencia == null || numberConta == null || codigoBanco == null || tipoConta == null) {
      AtualizarStatusCorretor();
    } else {
      setLoading(true)
      await api
        .put(`conta-bancaria?CodContaBancaria=${CodContaBancaria}`, {
          Agencia: numberAgencia,
          ContaCorrente: numberConta,
          DescContaBancaria: tipoConta,
          CodBanco: codigoBanco,
        })
        .then((response) => {
          setLoading(false)
          AtualizarStatusCorretor();
        })
        .catch((error) => {
          setLoading(false)
          console.log(error);
        });
    }
  }

  async function getBancos() {
    if (usuario.token) {
      await api
        .get(`/banco`)
        .then((response) => {
          setBancos(response.data.data);
          console.log("getBancos: ", response.data.data);
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
        });
    }
  }

  async function dadosBanco() {
    
    if (usuario.token) {
      if (!bancoSelect || !tipoConta || !agencia || !contaNumero) {
        setAlertErro(true);
        AtualizarStatusCorretor();
      } else {
        setLoading(true)
        await api
          .post(`/conta-bancaria`, {
            codCorretor: usuario.codCorretor,
            descContaBancaria: tipoConta,
            codBanco: codigoBanco,
            agencia: numberAgencia,
            contaCorrente: numberConta,
          })
          .then((response) => {
            console.log(response.data.data);
            setLoading(false)
            history.push("/cadastro/corretor/sucesso");
          })
          .catch((error) => {
            console.log("Ocorreu um erro");
            setLoading(false)
            setAlertErro(true);
            setMsgErro("Ops! Tente novamente mais tarde.");
          });
      }
    }
  }

  return (
    <>
      <Navbar type="dark" />
      <div className="container" id="dadosBancarios">
        <div className="row">
          <div className="col-lg-9">
            <div className="wrapper">
              <ol className="c-stepper">
                <li className="c-stepper__item">
                  <div className="c-stepper__content">
                    <h2 className=" c-stepper__title">Dados Bancários</h2>
                    <div className="mb-5" style={{ maxWidth: 700 }}>
                      <p>
                        Informe qual é seu banco atualmente<span>*</span>
                      </p>
                      <div className="row">
                        <div className="col-lg-8 mb-3 mb-lg-0">
                          <select
                            className="form-select"
                            value={bancoSelect}
                            onChange={({ target }) =>
                              setBancoSelect(target.value)
                            }
                            aria-label="Banco"
                            defaultValue="0"
                          >
                            <option value="0">Banco</option>

                            {bancos.map((banco: iBancos) => (
                              <option
                                key={banco.codBanco}
                                value={`${banco.codBanco}`}
                              >
                                {banco.descBanco + " (" + banco.numBanco + ")" }
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-lg-6">
                          <div className="d-flex align-items-center flex-wrap box-checked-row py-4">
                            <div
                              className={`checked-box d-flex align-items-center `}
                            >
                              <div
                                className={`box-input-checked d-flex align-items-center justify-content-around mr-1 `}
                              >
                                <input
                                  className="form-check-input"
                                  onChange={({ target }) =>
                                    setTipoConta(target.value)
                                  }
                                  type="radio"
                                  checked={tipoConta === "conta-corrente"}
                                  value="conta-corrente"
                                  name="flexRadioDefault"
                                />
                              </div>
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                              >
                                Conta Corrente
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="d-flex align-items-center flex-wrap box-checked-row py-4">
                            <div
                              className={`checked-box d-flex align-items-center `}
                            >
                              <div
                                className={`box-input-checked d-flex align-items-center justify-content-around mr-1 `}
                              >
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  checked={tipoConta === "conta-poupanca"}
                                  onChange={({ target }) =>
                                    setTipoConta(target.value)
                                  }
                                  value="conta-poupanca"
                                  name="flexRadioDefault"
                                />
                              </div>
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                              >
                                Conta Poupança
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-5" style={{ maxWidth: 512 }}>
                            <label
                              htmlFor="inputAgencia"
                              className="form-label label-agencia"
                            >
                              Agência:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={agencia}
                              onChange={(event) =>
                                setAgencia(event.target.value)
                              }
                              id="inputAgencia"
                              required
                              placeholder="Agência"
                              aria-describedby="nome"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-5" style={{ maxWidth: 512 }}>
                            <label
                              htmlFor="inputConta"
                              className="form-label label-conta"
                            >
                              Conta:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={contaNumero}
                              onChange={(event) =>
                                setContaNumero(event.target.value)
                              }
                              id="inputConta"
                              required
                              placeholder="Conta"
                              aria-describedby="nome"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <p>Olá corretor(a). Caso não possua neste momento, os seus dados bancários para nos informar, não há nenhum problema. É muito importante no entanto, que você nos informe estes dados no futuro, pois somente assim, conseguiremos realizar o pagamentos das comissões que você fizer jus, como parceiro(a) do Appe Plus.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="c-stepper__item"></li>
              </ol>
            </div>
            <hr />
            <div className="action-button d-flex justify-content-end mb-3">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={edicao ? AtualizarContaBancaria : dadosBanco}
              >
                {loading ?
                  (<>{edicao ? (<>Salvando edição</>) : (<>Salvando <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                  /></>)}</>)
                  : (<>{edicao ? "Salvar edição" : "Salvar"} e continuar <FiSave /></>)}
              </button>
            </div>
            {alertErro && (
              <div className="mt-3 mb-0">
                <Alert msg={msgErro} setAlertErro={setAlertErro} />
              </div>
            )}
          </div>

          <div className="col-lg-3">
            <StepperCadastroCorretor
              dadosPessoais
              uploadDocumento
              uploadComprovante
              sobreVoce
              informacoesExtras
              suasEspecialidades
              localDeAtuacao
              dataHoraAtuacao
              editar={edicao}
            />
          </div>
        </div>
      </div>

      <Footer dark />
    </>
  );
};

export default DadosBancarios;
