import { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import "../../../styles/cadastroProposta.scss";
import { BiEditAlt } from "react-icons/bi";
import PropostaImovelImg from "../../../assets/internas/imovel-proposta.png";
import Quarto from "../../../assets/internas/infos/quarto.svg";
import Metragem from "../../../assets/internas/infos/metragem.svg";
import Suites from "../../../assets/internas/infos/suite.svg";
import Garagem from "../../../assets/internas/infos/carro.svg";
import { MdVerified } from "react-icons/md";
import { RiCalendarTodoLine } from "react-icons/ri";
import { HiPhone } from "react-icons/hi";
import { BsWhatsapp } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import ImgCorretor from "../../../assets/internas/corretor-card-selecao.png";
import api from "../../../services/api";
import {
  iCorretores,
  iDadosUsuario,
  iPropostaCriar,
  iFinanciamento,
} from "../../../@types";
import {
  dateNascMask,
  moeda,
  moedaFloat,
  phoneMask
} from "../../../utils/Masks";
import { AiOutlineCheck } from "react-icons/ai";
import Loading from "../../../components/Loading";
import { format, parseISO } from "date-fns";



const CadastroProposta = () => {

  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );

  const [criarProposta, setCriarProposta] = useState<iPropostaCriar>();
  const [dtAniversario, setDtAniversario] = useState("");
  const [rendaMensal, setRendaMensal] = useState("");
  const [qtdParcelas, setQtdParcelas] = useState(360);
  const [valorEntrada, setValorEntrada] = useState("");
  const [valorPorcentagemEntrada, setValorPorcentagemEntrada] =
    useState<number>();
  const [loading, setLoading] = useState(false);
  const [erroSimulador, setErroSimulador] = useState(false);
  const [financiamentos, setFinanciamentos] = useState<iFinanciamento[]>([]);
  const history = useHistory();

  const codImovel = Number(localStorage.getItem('PropostaImovel'))

  function checaUsuarioLogado() {
    console.log('CadastroProposta.tsx ~ usuario', usuario);
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  async function getProposta() {
    if (usuario.token) {
      await api
        .get(`Proposta/informacoes-proposta?codImovel=${codImovel}`)
        .then((response) => {
          setCriarProposta(response.data.data);
          console.log(response.data)
          const valorTotal = Number(
            response.data.data.imovel.valorVendaOriginal
          );
          const porcentagem = 20;
          const resultado = (valorTotal * porcentagem) / 100;
          setValorPorcentagemEntrada(resultado);
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
        });
    }
  }

  async function SimuladorFinanciamentoProposta(event: FormEvent) {
    event.preventDefault();
    const valorEntradaNumero = Number(valorPorcentagemEntrada);
    const valorFinanciar =
      Number(criarProposta?.imovel.valorVendaOriginal) - valorEntradaNumero;
    setLoading(true);
    setErroSimulador(false);
    await api
      .post("simulador-financeiro/financiamento", {
        dtAniversario,
        qtdParcelas: String(qtdParcelas),
        valorParaFinanciar: Number(
          parseFloat(moedaFloat(String(valorFinanciar)))
        ),
        rendaMensal: Number(parseFloat(moedaFloat(String(rendaMensal)))),
        valorDoImovel: Number(
          parseFloat(
            moedaFloat(String(criarProposta?.imovel.valorVendaOriginal))
          )
        ),
        estadoSigla: criarProposta?.imovel.uf,
      })
      .then((response) => {
        setFinanciamentos(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoading(false);
        setErroSimulador(true);
      });
  }
  function criarPropostaManual(codImovel: any) {
    const codigoImovel = codImovel;
    localStorage.setItem("CodImovel", codigoImovel);
    history.push("/cadastro/detalhes-proposta");
  }

  useEffect(() => {
    checaUsuarioLogado();
    getProposta();
   
  }, []);

  return (
    <>
      <Navbar />

      <div className="" id="proposta-cadastro">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Fazer proposta</h2>
            </div>
            <p>
              Nesta seção voçê consegue fazer propostas personalizadas ou
              rápidas para o proprietário. Sua proposta passará pelo nosso
              corretor que te ajudará a conseguir o seu imóvel dos sonhos!
            </p>
          </div>
          <div className="row-gray my-3"></div>
        </div>
        <section className="perfil">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 my-4">
                <h4>Perfil:</h4>
              </div>
              <div className="card">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="box-user-photo  d-flex flex-column align-items-center">
                      <div className="profile mb-2">
                        <button className="uploadBtn">
                          {criarProposta?.corretor.img && (
                            <>
                              {criarProposta?.corretor.img.map((imgCorretor, index) => (
                                <img src={imgCorretor} key={index} alt="user" id="photo" title={criarProposta.corretor.nomeCompleto} />
                              ))}
                            </>

                          )}

                        </button>
                        <input type="file" id="file" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="content">
                      <span>
                        Dados para contato:{" "}
                        <BiEditAlt color={"#4BB7F1"} fontSize={20} />
                      </span>
                      <h4>{criarProposta?.cliente.nomeCompleto}</h4>
                      <span>
                        {phoneMask(String(criarProposta?.cliente.telefone))} |{" "}
                        {criarProposta?.cliente.email}
                      </span>

                      <p className="description-resume">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Iure accusantium, rerum voluptatibus a dignissimos
                        dolores odit reprehenderit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 my-4">
                <h4>Imóvel selecionado</h4>
              </div>
              <div className="col-lg-3">
                <div className="content-img">
                  {criarProposta?.imovel.imgsDoImovel.length ? (
                    <img src={criarProposta?.imovel.imgsDoImovel[0]} alt="foto do imóvel" />
                  ) : (
                    <img
                      src={PropostaImovelImg}
                      alt="foto do imóvel"
                    />
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="content-information-imovel">
                  <span>Apartamento</span>
                  <h4>
                    {criarProposta?.imovel.endereco}
                    <span>
                      {" "}
                      <MdVerified color={"#2E2E2E"} fontSize={22} />
                    </span>
                  </h4>
                  <p>{criarProposta?.imovel.bairro}</p>
                  <div className="icons">
                    <div className="row">
                      <div className="col text-center">
                        <img src={Metragem} alt="numero do andar" />
                        <p>{criarProposta?.imovel.areaTotal}m²</p>
                      </div>
                      <div className="col text-center">
                        <img src={Suites} alt="Portaria 24 horaS" />
                        <p>
                          {" "}
                          {criarProposta?.imovel.qtdeSuites}{" "}
                          {Number(criarProposta?.imovel.qtdeSuites) > 1
                            ? "suítes"
                            : "suíte"}
                        </p>
                      </div>
                      <div className="col text-center">
                        <img src={Quarto} alt="Piscina aquecida" />
                        <p>
                          {criarProposta?.imovel.qtdeDormitorios}{" "}
                          {Number(criarProposta?.imovel.qtdeDormitorios) > 1
                            ? "quartos"
                            : "quarto"}
                        </p>
                      </div>
                      <div className="col text-center">
                        <img src={Garagem} alt="area gourmet" />
                        <p>
                          {criarProposta?.imovel.qtdeVagasGaragem}{" "}
                          {Number(criarProposta?.imovel.qtdeVagasGaragem) > 1
                            ? "vagas"
                            : "vaga"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="agendamento-imovel">
                  <span>visita feita em:</span>
                  <p>
                    <RiCalendarTodoLine /> {criarProposta?.corretor.dtAtualizacao && (
                          <>
                          {criarProposta?.corretor.dtAtualizacao
                              ? format(parseISO(criarProposta?.corretor.dtAtualizacao), "dd/MM/yyyy")
                          : null}
                          </>)}
                  </p>
                  <div className="content-comprador">
                    <div className="content-information d-flex justify-content-start align-items-center">
                      {criarProposta?.cliente.arquivosCliente.map((imgCliente: any, index) => (
                        <img
                          src={imgCliente.url}
                          key={index}
                          className="img-comprador"
                          alt="imagem do cliente comprador"
                        />
                      ))}

                      <div className="content-name-comprador">
                        <span>Seu Corretor</span>
                        <p>{criarProposta?.corretor.nomeSocial}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="links  d-flex justify-content-around align-items-center">
                      <div>
                        <span>cadastrado desde:<br/>{criarProposta?.corretor.dtCadastro && (
                          <>
                          {criarProposta?.corretor.dtCadastro
                              ? format(parseISO(criarProposta?.corretor.dtCadastro), "dd/MM/yyyy")
                          : null}
                          </>)}
                        </span>
                      </div>
                      <div className="links  d-flex justify-content-around align-items-center">
                        <div className="link whatsapp">
                          <a
                            className=""
                            href={`https://wa.me/${criarProposta?.corretor.telefone}`}
                            target="_blank" rel="noreferrer">
                            <BsWhatsapp fontSize={24} color={"#fff"} />
                          </a>

                        </div>
                        <div className="link phone">
                          <a
                            className=""
                            href={`tel:+55${criarProposta?.corretor.telefone}`}
                            target="_blank" rel="noreferrer">
                            <HiPhone fontSize={24} color={"#ADADAD"} />
                          </a>

                        </div>
                        <div className="link email">
                          <a
                            className=""
                            href={`mailto:${criarProposta?.corretor.email}`}
                            target="_blank" rel="noreferrer">
                            <MdOutlineEmail fontSize={24} color={"#ADADAD"} />
                          </a>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="credito py-5">
          <div className="container">
            <div className="card">
              <form onSubmit={SimuladorFinanciamentoProposta}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="content-imovel">
                      <div className="preco-imovel">
                        <p>Valor do imóvel</p>
                        <h1>
                          R${" "}
                          {moeda(
                            String(criarProposta?.imovel.valorVendaOriginal)
                          )}
                        </h1>
                        <h4>Valores do imóvel</h4>
                      </div>
                      <div className="entrada">
                        <div className="row">
                          <div className="col-4">
                            <p className="form-label">Valor de entrada</p>
                          </div>
                          <div className="col-4">
                            <div className="d-flex justify-content-evenly">
                              <input
                                type="range"
                                className="form-range"
                                min="0"
                                max="25"
                                disabled
                                id="customRange2"
                                style={{ width: "50%" }}
                              />
                              <span>
                                20% <AiOutlineCheck color={"#3BC14A"} />
                              </span>
                            </div>
                          </div>
                          <div className="col-4 text-end">
                            <p className="font-bold">
                              R$ {moeda(valorPorcentagemEntrada)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="parcela">
                        <div className="row">
                          <div className="col-4">
                            <p className="form-label">Tempo Parcelado</p>
                          </div>
                          <div className="col-4">
                            <div className="d-flex justify-content-evenly">
                              <input
                                type="range"
                                className="form-range"
                                min="0"
                                max="25"
                                disabled
                                id="customRange2"
                                style={{ width: "50%" }}
                              />
                              <span>
                                360x
                                <AiOutlineCheck color={"#3BC14A"} />
                              </span>
                            </div>
                          </div>
                          <div className="col-4 text-end">
                            <p className="font-bold">30 Anos </p>
                          </div>
                        </div>
                      </div>
                      <div className="row-gray my-3"></div>
                      <div className="iptu px-2">
                        <div className="row">
                          <div className="col-6">
                            <p>IPTU</p>
                          </div>
                          <div className="col-6 text-end">
                            <p className="font-bold">
                              R$
                              {moeda(
                                String(criarProposta?.imovel.valorIptu)
                              )}
                            </p>
                          </div>
                          <div className="col-6">
                            <p>Condomínio</p>
                          </div>
                          <div className="col-6 text-end">
                            <p className="font-bold">
                              R$
                              {moeda(
                                String(criarProposta?.imovel.valorCondominio)
                              )}
                            </p>
                          </div>
                          <div className="col-6">
                            <p>Seguro incêndio</p>
                          </div>
                          <div className="col-6 text-end">
                            <p className="font-bold">R$16,24</p>
                          </div>
                        </div>
                      </div>
                      <div className="financiamento">
                        <div className="row">
                          <div className="row-gray my-2"></div>
                          <div className="col-12">
                            <div className="row">
                              <div className="col-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="inputDataNascimento"
                                    className="form-label"
                                  >
                                    Data de nascimento:
                                  </label>
                                  <input
                                    required
                                    maxLength={10}
                                    type="text"
                                    className="form-control"
                                    id="inputDataNascimento"
                                    value={dateNascMask(dtAniversario)}
                                    onChange={(event) =>
                                      setDtAniversario(event.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="inputRenda"
                                    className="form-label"
                                  >
                                    Renda mensal: (R$)
                                  </label>
                                  <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="inputRenda"
                                    value={moeda(rendaMensal)}
                                    onChange={(event) =>
                                      setRendaMensal(moeda(event.target.value))
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-12 mt-2">
                              {rendaMensal && dtAniversario !== "" ? (
                                <button
                                  className="button-financiamento"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalSimuladorProposta"
                                >
                                  Refazer financiamento
                                </button>
                              ) : (
                                <button className="button-financiamento">
                                  Refazer financiamento
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="analise">
                      <div className="row">
                        <div className="col-lg-12 my-2">
                          <h4>Informação importante</h4>
                        </div>
                        <div className="col-lg-12">
                          <div className="content">
                            <p>
                              Estes dados são apenas uma simulação, que tem como base informações obtidas junto a algumas instituições financeiras e que podem a todo momento alterar suas condições de financiamento.Nosso objetivo é dar aos nossos clientes, uma noção de como será seu fluxo de pagamentos, de acordo com a forma de pagamento desejada, mas recomendamos que procure sua instituição de confiança para ter as informações o mais corretas e atualizadas possível.<br/>
                              Equipe Appê Plus

                            </p>
                          </div>
                        </div>
                        <div className="row-gray my-3"></div>
                        <div className="col-lg-12  my-2">
                          <h4>Como proceder agora?</h4>
                        </div>
                        <div className="col-lg-12 mt-2">
                          <p>
                            Agora que você conferiu todos os seus dados e os
                            dados do imóveis, basta escolher como você quer
                            prosseguir com a proposta, você pode:
                          </p>
                          <p>
                            <strong>Realizar uma proposta expressa</strong> na
                            qual você concorda com os valores já dispostos ao
                            lado
                          </p>
                          <p>
                            <strong>Realizar uma proposta manual</strong> na
                            qual você pode alterar valores e fazer apontamentos
                            sobre a negociação
                          </p>
                        </div>
                        <div className="col-lg-12 d-flex justify-content-end flex-wrap">
                          <button
                            className="proposta-manual"
                            onClick={() =>
                              criarPropostaManual(
                                criarProposta?.imovel.codImovel
                              )
                            }
                          >
                            Proposta manual
                          </button>
                          <button className="proposta-expressa">
                            Proposta expressa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <div
        className="modal fade"
        id="modalSimuladorProposta"
        tabIndex={-1}
        aria-labelledby="modalSimuladorLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modalSimuladorLabel">
                Simulação de financiamento
              </h4>
              <button type="button" className="close" data-bs-dismiss="modal">
                X
              </button>
            </div>
            <div className="modal-body">
              {loading ? (
                <Loading />
              ) : erroSimulador ? (
                <p>
                  Houve um erro ao simular seu financiamento. Tente novamente
                  mais tarde.
                </p>
              ) : (
                financiamentos.map((financiamento) => {
                  return (
                    <div className="card mb-3" key={financiamento.banco}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <div className="card-body">
                            <h4>{financiamento.banco}</h4>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card-body">
                            <div className="mb-3">
                              <h6 className="card-title">Valor Financiado</h6>
                              <p className="card-text">
                                R${" "}
                                {moeda(
                                  financiamento.valorDesejado
                                )}
                              </p>
                            </div>

                            <div className="mb-3">
                              <h6 className="card-title">Primeira Parcela</h6>
                              <p className="card-text">
                                R${" "}
                                {moeda(
                                  financiamento.primeiraParcela
                                )}
                              </p>
                            </div>

                            <div className="mb-3">
                              <h6 className="card-title">Última Parcela</h6>
                              <p className="card-text">
                                R${" "}
                                {moeda(
                                  financiamento.ultimaParcela
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card-body">
                            <div className="mb-3">
                              <h6 className="card-title">
                                Juros (Percentual a.a.)
                              </h6>
                              <p className="card-text">
                                {financiamento.jurosPercentualAoAno} %
                              </p>
                            </div>

                            <div className="mb-3">
                              <h6 className="card-title">Observaçõesa</h6>
                              <p className="card-text">
                                {financiamento.observacao}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CadastroProposta;
