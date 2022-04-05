import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import { NavbarDashDark } from "../../components/Navbar/NavbarDashDark";
import NavbarDashHeader from "../../components/Navbar/NavbarDashHeader";
import ImovelPropostaGerar from "../../assets/internas/imovel-proposta-gerar.png";
import "../../styles/pages/dashboard/propostaImovel.scss";

import { BsArrowCounterclockwise } from "react-icons/bs";
import {
  AiOutlineClose,
  AiOutlineCheck,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import api from "../../services/api";
import { iDadosUsuario, iPropostaRecuperar } from "../../@types";
import { cepMask, moeda } from "../../utils/Masks";
import { useHistory } from "react-router-dom";

const PropostaImovel = () => {
  const history = useHistory();
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const [propostaImovel, setPropostaImovel] = useState<iPropostaRecuperar>();
  const [motivoRecusa, setMotivoRecusa] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");

  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  async function getPropostaImovel() {
    const codProposta = localStorage.getItem("CodigoProposta");
    await api
      .get(`Proposta/recuperar-proposta?codProposta=${codProposta}`)
      .then((response) => {
        setPropostaImovel(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
  function criarContraProposta(codProposta: any) {
    const codigoProposta = codProposta;
    localStorage.setItem("CodigoProposta", codigoProposta);
    history.push("/dashboard/contra-proposta");
  }

  async function AceitarProposta(codProposta: any, userAceita: any) {
    const codigoProposta = Number(codProposta);
    const usuarioAceita = Number(userAceita);
    const date: any = new Date();
    await api
      .put(`/Proposta/aceitar-proposta`, {
        codProposta: codigoProposta,
        dtAceite: date,
        userAceite: usuarioAceita,
      })
      .then((response) => {
        localStorage.removeItem("CodigoProposta");
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setError(
          "Não foi possivel efetuar a requisição, tente novamente mais tarde"
        );
        setLoading(false);
        setAlertErro(true);
      });
  }

  async function recusarProposta(codProposta: any, userRecusa: any) {
    const codigoProposta = codProposta;
    const userCodRecusa = userRecusa;
    const date: any = new Date();

    await api
      .put(`/Proposta/recusar-proposta`, {
        codProposta: codigoProposta,
        dtRecusa: date,
        userRecusa: userCodRecusa,
        motivoRecusa: motivoRecusa,
      })
      .then((response) => {
        localStorage.removeItem("CodigoProposta");
        history.push("/dashboard/lista-propostas");
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setError(
          "Não foi possivel efetuar a requisição, tente novamente mais tarde"
        );
        setLoading(false);
        setAlertErro(true);
      });
  }
  useEffect(() => {
    checaUsuarioLogado();
    getPropostaImovel();
  }, []);

  return (
    <>
      <div className="wrapper-imoveis" id="proposta-imovel">
        <NavbarDashDark />
        <div className="main-content">
          <NavbarDashHeader />
          <div className="container">
            <section className="my-4">
              <div className="row">
                <div className="col-lg-10">
                  <h2>Geração proposta</h2>
                </div>
              </div>
            </section>
            <div className="meus-imoveis">
              <div className="content-proposta ">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="content-img ">
                      <img
                        src={ImovelPropostaGerar}
                        className="img-proposta"
                        alt="imovel de proposta"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="preco">
                      <p className="subTitle">Valor da proposta</p>
                      <h1>
                        R$
                        {moeda(
                          propostaImovel?.imovel.valorVendaOriginal
                        )}
                      </h1>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="pagamento">
                      <p className="subTitle">Forma de pagamento</p>
                      <div className="row">
                        <div className="col-6">
                          <p>Forma:</p>
                          <p>pagamento em:</p>
                        </div>
                        <div className="col-6">
                          <p>{propostaImovel?.obsCondicoesPagamento}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <p className="subTitle">Dados do comprador</p>
                  </div>
                  <div className="col-lg-12">
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <th className="col-1">Nome</th>
                            <td>{propostaImovel?.comprador.nomeCompleto}</td>
                          </tr>
                          <tr>
                            <th className="col-1">RG:</th>
                            {propostaImovel?.comprador.rg === null ? (
                              <td>38.888.888-1</td>
                            ) : (
                              <td>{propostaImovel?.comprador.rg}</td>
                            )}
                          </tr>
                          <tr>
                            <th className="col-1">CPF:</th>
                            {propostaImovel?.comprador.cpfcnpj === null ? (
                              <td>430.666.666-00</td>
                            ) : (
                              <td>{propostaImovel?.comprador.cpfcnpj}</td>
                            )}
                          </tr>
                          <tr>
                            <th className="col-1">Endereço</th>
                            <td>
                              Av Salvador Jesus da Pátria, 526. Ap 55 - São
                              Paulo, SP - Cep 0000 - 000
                            </td>
                          </tr>
                          <tr>
                            <th className="col-1">E-mail</th>
                            <td>{propostaImovel?.comprador.email}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <p className="subTitle">Dados do Proprietário</p>
                  </div>
                  <div className="col-lg-12">
                    <div className="table-responsive">
                      <table className="table table-borderless  table-proprietario">
                        <tbody>
                          <tr>
                            <th className="col-1">Nome</th>
                            <td>{propostaImovel?.vendedor.nomeCompleto}</td>
                          </tr>
                          <tr>
                            <th className="col-1">RG:</th>
                            {propostaImovel?.vendedor.rg === null ? (
                              <td>38.888.888-1</td>
                            ) : (
                              <td>{propostaImovel?.vendedor.rg}</td>
                            )}
                          </tr>
                          <tr>
                            <th className="col-1">CPF:</th>
                            {propostaImovel?.vendedor.cpfcnpj === null ? (
                              <td>430.666.666-00</td>
                            ) : (
                              <td>{propostaImovel?.vendedor.cpfcnpj}</td>
                            )}
                          </tr>
                          <tr>
                            <th className="col-1">Endereço</th>
                            <td>
                              Av Salvador Jesus da Pátria, 526. Ap 55 - São
                              Paulo, SP - Cep 0000 - 000
                            </td>
                          </tr>
                          <tr>
                            <th className="col-1">E-mail</th>
                            <td>{propostaImovel?.vendedor.email}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <p className="subTitle">Dados do imóvel</p>
                  </div>
                  <div className="col-lg-12">
                    <div className="table-responsive">
                      <table className="table table-borderless  table-imovel">
                        <tbody>
                          <tr>
                            <th className="col-1">Matricula</th>
                            <td>56789-10</td>
                          </tr>
                          <tr>
                            <th className="col-1">Cartório</th>
                            <td>Cartório 22º</td>
                          </tr>
                          <tr>
                            <th className="col-1">Descrição</th>
                            <td>{propostaImovel?.imovel.descComplementar}</td>
                          </tr>
                          <tr>
                            <th className="col-1">Endereço</th>
                            <td>
                              {propostaImovel?.imovel.endereco},{" "}
                              {propostaImovel?.imovel.numero}. Ap{" "}
                              {propostaImovel?.imovel.complemento} -{" "}
                              {propostaImovel?.imovel.cidade},{" "}
                              {propostaImovel?.imovel.uf} - Cep{" "}
                              {cepMask(String(propostaImovel?.imovel.cep))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4  ">
                  <button
                    className="button-voltar m-2"
                    data-bs-toggle="modal"
                    data-bs-target="#modalCancelamentoProposta"
                  >
                    <AiOutlineClose fontSize={24} />
                    Cancelar negociação
                  </button>
                </div>
                <div className="col-lg-8 d-flex justify-content-end align-items-center">
                  <button
                    className="button-contra-proposta m-2"
                    onClick={() =>
                      criarContraProposta(propostaImovel?.codProposta)
                    }
                  >
                    Fazer contra proposta{" "}
                    <BsArrowCounterclockwise fontSize={24} />
                  </button>
                  <button
                    className="button-continuar m-2"
                    data-bs-toggle="modal"
                    data-bs-target="#modalAceitarProposta"
                    onClick={() =>
                      AceitarProposta(
                        propostaImovel?.codProposta,
                        propostaImovel?.userAceite
                      )
                    }
                  >
                    Aceitar proposta <AiOutlineCheck fontSize={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div
        className="modal fade"
        id="modalCancelamentoProposta"
        tabIndex={-1}
        aria-labelledby="modalCancelamentoPropostaLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modalCancelamentoPropostaLabel">
                Cancelamento de Proposta
              </h4>
            </div>
            <div className="modal-body">
              <p>Qual é o motivo do cancelamento ?</p>
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  value={motivoRecusa}
                  onChange={(e) => setMotivoRecusa(e.target.value)}
                  rows={5}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              {motivoRecusa.length == 0 ? (
                <button
                  type="button"
                  className="btn btn-primary buttonCancelar"
                  disabled
                  data-bs-dismiss="modal"
                  onClick={() =>
                    recusarProposta(
                      propostaImovel?.codProposta,
                      propostaImovel?.userRecusa
                    )
                  }
                >
                  Cancelar proposta{" "}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary buttonCancelar"
                  data-bs-dismiss="modal"
                  onClick={() =>
                    recusarProposta(
                      propostaImovel?.codProposta,
                      propostaImovel?.userRecusa
                    )
                  }
                >
                  Cancelar proposta{" "}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="modalAceitarProposta"
        tabIndex={-1}
        aria-labelledby="modalAceitarPropostaLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modalAceitarPropostaLabel">
                Proposta
              </h4>
            </div>
            <div className="modal-body">
              {alertErro ? (
                <div className=" fade show mt-3 mb-0">
                  <p>{error}</p>
                </div>
              ) : (
                <h2>
                  Sua proposta foi aceita com sucesso.
                  <AiOutlineCheckCircle color={"#3BC14A"} fontSize={40} />
                </h2>
              )}
            </div>
            <div className="modal-footer">
              {alertErro ? (
                <button
                  type="button"
                  className="btn btn-primary buttonAceitar"
                  data-bs-dismiss="modal"
                >
                  Fechar
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary buttonAceitar"
                  data-bs-dismiss="modal"
                  onClick={() => history.push("/dashboard/lista-propostas")}
                >
                  Voltar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropostaImovel;
