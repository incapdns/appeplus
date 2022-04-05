import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import { NavbarDashDark } from "../../components/Navbar/NavbarDashDark";
import NavbarDashHeader from "../../components/Navbar/NavbarDashHeader";
import ImovelPropostaContra from "../../assets/internas/imovel-contra-proposta.png";
import { FaDollarSign } from "react-icons/fa";
import "../../styles/pages/dashboard/propostaImovel.scss";
import { useHistory } from "react-router-dom";

import { BsArrowCounterclockwise } from "react-icons/bs";
import {
  AiOutlineClose,
  AiOutlineCheck,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import api from "../../services/api";
import { iDadosUsuario, iPropostaRecuperar } from "../../@types";
import { cepMask, moeda, moedaFloat } from "../../utils/Masks";

const ContraProposta = () => {
  const history = useHistory();
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const [propostaImovel, setPropostaImovel] = useState<iPropostaRecuperar>();
  const [valor, setValor] = useState("");
  const [motivoRecusa, setMotivoRecusa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoPagamento, setTipoPagamento] = useState("");
  const [formPagamento, setFormPagamento] = useState("");
  const [valorEntrada, setValorEntrada] = useState("");
  const [valorFinanciado, setValorFinanciado] = useState("");
  const [bemPagamento, setBemPagamento] = useState(false);
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
    const codigoProposta = Number(codProposta);
    await api
      .get(`Proposta/recuperar-proposta?codProposta=${codigoProposta}`)
      .then((response) => {
        setPropostaImovel(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
  async function enviarContraProposta(codProposta: any, userCadastro: any) {
    const codigoProposta = Number(codProposta);
    const date = new Date();
    const usuarioCadastro = Number(userCadastro);
    const valores = Number(parseFloat(moedaFloat(String(valor))));
    const valorFinance = Number(
      parseFloat(moedaFloat(String(valorFinanciado)))
    );
    const valorEntra = Number(parseFloat(moedaFloat(String(valorEntrada))));

    if (
      codigoProposta === null ||
      date === null ||
      usuarioCadastro === null ||
      valores === null ||
      descricao === ""
    ) {
      setError(
        "Não foi possivel efetuar a requisição, preencha todos os campos!"
      );
      setLoading(false);
      setAlertErro(true);
    } else {
      await api.put('/Proposta/renegociar-proposta', {
        codProposta: codigoProposta,
        dtCadastro: date,
        userCadastro: usuarioCadastro,
        valor: valores,
        obsCondicoesPagamento: descricao,
      }).then(response => {
        console.log(response.data)
        setLoading(false);
        setAlertErro(false)
        localStorage.removeItem('CodigoProposta')
      }).catch(error => {
        console.log(error)
        setError('Não foi possivel efetuar a requisição, tente novamente mais tarde');
        setLoading(false);
        setAlertErro(true)
      })
    }
  }
  async function recusarProposta(codProposta: any, userRecusa: any) {
    const codigoProposta = codProposta;
    const userCodRecusa = userRecusa;
    const date: any = new Date();
    await api.put(`/Proposta/recusar-proposta`, {
      codProposta: codigoProposta,
      dtRecusa: date,
      userRecusa: userCodRecusa,
      motivoRecusa: motivoRecusa


    }).then(response => {
      console.log(response.data)
      localStorage.removeItem('CodigoProposta')
      history.push('/dashboard/lista-propostas')
    }).catch(error => {
      console.log(error)
      setError('Não foi possivel efetuar a requisição, tente novamente mais tarde');
      setLoading(false);
      setAlertErro(true)
    })
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
              <div className="row">
                <div className="col-lg-7">
                  <div className="content-proposta ">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="content-img ">
                          <img
                            src={ImovelPropostaContra}
                            className="img-proposta"
                            alt="imovel de proposta"
                          />
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-lg-12">
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
                          <div className="col-lg-12">
                            <div className="pagamento">
                              <p className="Title">Forma de pagamento</p>
                              <div className="row">
                                <div className="col-6">
                                  <p>Forma:</p>
                                  <p>pagamento em:</p>
                                </div>
                                <div className="col-6">
                                  <p className="subTitle">
                                    {propostaImovel?.obsCondicoesPagamento}
                                  </p>
                                </div>
                              </div>
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
                                <td>
                                  {propostaImovel?.comprador.nomeCompleto}
                                </td>
                              </tr>
                              <tr>
                                <th className="col-1">Nacionalidade:</th>
                                <td>Brasileiro</td>
                              </tr>
                              <tr>
                                <th className="col-1">Profissão</th>
                                <td>Designer Gráfico</td>
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
                                <th className="col-1">Nacionalidade:</th>
                                <td>Brasileiro</td>
                              </tr>
                              <tr>
                                <th className="col-1">Profissão</th>
                                <td>Designer Gráfico</td>
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
                                <td>
                                  {propostaImovel?.imovel.descComplementar}
                                </td>
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
                </div>
                <div className="col-lg-5">
                  <div className="content-contraproposta">
                    <div className="row">
                      <div className="col-lg-12 mb-4">
                        <h4>Configure sua contraproposta</h4>
                        <p className="resume-contra-proposta">
                          Siga a ordem conforme ditado pelos campos abaixo para
                          fazer sua contra proposta
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <form>
                        <div className="form-row align-items-center">
                          <div className="col-12 mt-3">
                            <label className="sr-only mb-2">valor</label>
                            <div className="input-group mb-2">
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  <FaDollarSign />
                                </div>
                              </div>
                              <input
                                type="text"
                                value={moeda(valor)}
                                onChange={(e) => setValor(moeda(e.target.value))}
                                className="form-control"
                                id="inlineFormInputGroup"
                                placeholder="R$ 1320.000.00"
                              />
                            </div>
                          </div>
                          <div className="col-12  mt-3">
                            <label className="sr-only mb-2">
                              pagamento em{" "}
                            </label>
                            <div className="input-group mb-2">
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  <FaDollarSign />
                                </div>
                              </div>
                              <select
                                id="inputState"
                                value={tipoPagamento}
                                onChange={(e) =>
                                  setTipoPagamento(e.target.value)
                                }
                                className="form-control"
                              >
                                <option value="dinheiro">Dinheiro</option>
                                <option value="debito">Debito</option>
                                <option value="credito">credito</option>
                              </select>
                            </div>
                          </div>
                          <div className="cod-md-2 my-4 line-gray mb-4"></div>
                        </div>
                        <div className="col-12  mt-3">
                          <label className="sr-only mb-2">Forma </label>
                          <div className="input-group mb-2">
                            <select
                              id="inputState"
                              value={formPagamento}
                              onChange={(e) => setFormPagamento(e.target.value)}
                              className="form-control form-control-text-area"
                            >
                              <option value="avista">A vísta</option>
                              <option value="entradafinanaciamento">
                                Entrada + financiamento
                              </option>
                              <option value="credito">credito</option>
                            </select>
                          </div>
                        </div>
                        {/* <div className="col-12 mt-3">
                        <label className="sr-only mb-2">Valor de Entrada</label>
                        <div className="input-group mb-2">
                          <div className="input-group-prepend">
                            <div className="input-group-text"><FaDollarSign /></div>
                          </div>
                          <input type="text" className="form-control" value={moeda(valorEntrada)} onChange={e => setValorEntrada(e.target.value)}  id="inlineFormInputGroup" placeholder="R$ 500.000"/>
                        </div>
                      </div>
                      <div className="col-12 mt-3">
                        <label className="sr-only mb-2">Valor financiado</label>
                        <div className="input-group mb-2">
                          <div className="input-group-prepend">
                            <div className="input-group-text"><FaDollarSign /></div>
                          </div>
                          <input type="text" className="form-control" value={moeda(valorFinanciado)} onChange={e => setValorFinanciado(e.target.value)} id="inlineFormInputGroup" placeholder="R$ 820.000"/>
                        </div>
                      </div> */}
                        <div className="cod-md-2 my-4 line-gray mb-4"></div>
                        <div
                          className={`checked-box d-flex align-items-center `}
                        >
                          <div
                            className={`box-input-checked d-flex align-items-center justify-content-around mr-1  ${
                              bemPagamento && "activeSelect"
                            }`}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={bemPagamento}
                              onChange={({ target }) =>
                                setBemPagamento(target.checked)
                              }
                              name="flexRadioDefault"
                            />
                          </div>
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            Aceitar bem como forma de pagamento
                          </label>
                        </div>
                        <div className="form-group mt-5">
                          <label>Comentários gerais</label>
                          <textarea
                            className="form-control mt-2 form-control-text-area"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            id="exampleFormControlTextarea1"
                            placeholder="Comentários"
                            rows={15}
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6  ">
                  <button
                    className="button-voltar m-2"
                    data-bs-toggle="modal"
                    data-bs-target="#modalCancelamentoProposta"
                  >
                    <AiOutlineClose fontSize={24} />
                    Cancelar
                  </button>
                </div>
                <div className="col-lg-6 d-flex justify-content-end align-items-end">
                  <button
                    className="button-continuar m-2"
                    data-bs-toggle="modal"
                    data-bs-target="#modalContraProposta"
                    onClick={() =>
                      enviarContraProposta(
                        propostaImovel?.codProposta,
                        propostaImovel?.userCadastro
                      )
                    }
                  >
                    Finalizar contraproposta <AiOutlineCheck fontSize={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        id="modalContraProposta"
        tabIndex={-1}
        aria-labelledby="modalContraPropostaLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modalContraPropostaLabel">
                Proposta
              </h4>
            </div>
            <div className="modal-body">
              {alertErro ? (
                <div className=" fade show mt-3 mb-0">
                  <p>{error}</p>
                </div>
              ) : (
                <h3>
                  Sua Contraproposta foi enviada com sucesso.
                  <AiOutlineCheckCircle color={"#3BC14A"} fontSize={40} />
                </h3>
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
      <Footer />
    </>
  );
};

export default ContraProposta;
