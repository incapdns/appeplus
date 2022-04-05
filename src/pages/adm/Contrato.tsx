import NavbarDashHeader from "../../components/Navbar/NavbarDashHeader";
import { RiCalendarTodoLine } from "react-icons/ri";
import { BsChevronLeft, BsWhatsapp } from "react-icons/bs";
import { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";
import { useHistory, useParams } from "react-router-dom";
import ImgDefault from "../../assets/Logo/HorizontalBlack.svg";
import { NavbarDashAdm } from "../../components/Navbar/NavbarDashAdm";
import { cepMask, cpfMask, phoneMask } from "../../utils/Masks";
import { format, parseISO } from "date-fns";
import "../../styles/pages/adm/detalheImovel.scss";
import {
  MdAccountCircle,
  MdBed,
  MdMailOutline,
  MdPhotoSizeSelectSmall,
} from "react-icons/md";
import { IoCarOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import Footer from "../../components/Footer";

interface iParamTypes {
  id: string;
}

interface iImgModal {
  url: string;
  title: string;
}

interface iContrato {
  contrato: {
    codContrato: number;
    codProposta: number;
    codImovel: number;
    codCorretorCompra: number;
    codCorretorVenda: number;
    valorVenda: number;
    obsCondicoesPagamento: string;
    codstatuscontrato: number;
    valorEntrada: number;
    valorFGTS: number;
    valorFinanciamento: number;
    codBancoFinanciamento: number;
    valorPrimeiraParcela: number;
    valorUltimaParcela: number;
    taxaJuros: number;
    qtdeMesesFinanciamento: number;
    dtCadastro: string;
  };
  corretorCompra: {
    codCorretor: number;
    codUsuario: number;
    nomeCompleto: string;
    dtNascimento: string;
    numeroCreci: string;
    rg: string;
    cpfcnpj: string;
    telefone: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    nomeSocial: string;
    cep: string;
    codOrigemCadastro: string;
    codCorretorIndicacao: string;
    tokenCadastro: string;
    dtCadastro: string;
    userCadastro: number;
    dtAtualizacao: string;
    userAtualizacao: number;
    dtExclusao: string;
    userExclusao: any;
    motivoExclusao: string;
    pontuacaoAtual: number;
    mediaAvaliacao: number;
    img: any[];
    codCorretorCompra: number;
    codCorretorVenda: number;
    descStatusImovel: string;
    codImovel: number;
    fotoCapaImovel: any;
  };
  corretorVenda: {
    codCorretor: number;
    codUsuario: number;
    nomeCompleto: string;
    dtNascimento: string;
    numeroCreci: string;
    rg: string;
    cpfcnpj: string;
    telefone: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: null;
    cidade: null;
    uf: null;
    nomeSocial: string;
    cep: string;
    codOrigemCadastro: string;
    codCorretorIndicacao: string;
    tokenCadastro: string;
    dtCadastro: string;
    userCadastro: number;
    dtAtualizacao: string;
    userAtualizacao: number;
    dtExclusao: string;
    userExclusao: any;
    motivoExclusao: string;
    pontuacaoAtual: number;
    mediaAvaliacao: number;
    img: any[];
    codCorretorCompra: number;
    codCorretorVenda: number;
    descStatusImovel: string;
    codImovel: number;
    fotoCapaImovel: any;
  };
  clienteComprador: any;
  clienteVendedor: {
    codCliente: number;
    nomeCompleto: string;
    telefone: string;
    email: string;
    dtNascimento: string;
    tipoCliente: any;
    codEstadoCivil: number;
    cpfcnpj: string;
    rg: string;
    genero: number;
    arquivosCliente: any;
  };
  imovel: {
    codImovel: number;
    codClienteVendedor: number;
    codCorretorVendedor: number;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    latitude: string;
    longitude: string;
    codStatus: number;
    codTipoImovel: number;
    qtdeDormitorios: number;
    qtdeSuites: number;
    qtdeBanheiros: number;
    qtdeVagasGaragem: number;
    qtdeVisualizacoes: number;
    areaTotal: number;
    areaPrivativa: number;
    valorVendaOriginal: number;
    valorVenda: number;
    codStatusAnuncio: number;
  };
  arquivoContrato: any;
}

export function AdmContrato() {
  const { id } = useParams<iParamTypes>();
  const history = useHistory();
  const [dados, setDados] = useState({} as iContrato);
  const [loading, setLoading] = useState(false);
  const [obs, setObs] = useState("");
  const [erro, setErro] = useState("");
  const [imgModal, setImgModal] = useState({
    url: "",
    title: "",
  } as iImgModal);

  useEffect(() => {
    GetContrato();
  }, []);

  async function GetContrato() {
    await api
      .get("contrato?codContrato=5", {
        params: {
          codCorretor: id,
        },
      })
      .then((response) => {
        setDados(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function AprovarCorretor(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await api
      .post(`contrato/aprovar/${id}`)
      .then((response) => {
        history.push("/adm/contratos");
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoading(false);
      });
  }

  async function RecusarCorretor(e: FormEvent) {
    e.preventDefault();
    if (obs === "") {
      setErro("Preencha a observação para recusar o corretor");
      return;
    }
    history.push("/adm/contratos");
    // await api;
    // .post(
    //   `Corretor/reprovar-corretor-semlog?CodCorretor=${dados.corretor.codCorretor}&motivo=${obs}`
    // )
    // .then((response) => {
    //   setLoading(false);
    //   history.push("/adm/contratos");
    // })
    // .catch((error) => {
    //   console.log("Ocorreu um erro");
    // });
  }

  function GoBack() {
    history.push("/adm/contratos");
  }
  return (
    <>
      <div className="wrapper-imoveis" id="adm-detalhe-imovel">
        <NavbarDashAdm />
        <div className="main-content">
          <NavbarDashHeader />
          <div className="container">
            <button className="btn btn-back" onClick={GoBack}>
              <BsChevronLeft /> Detalhe do contrato
            </button>

            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-lg-4">
                  {/* {dados?.imovel?.img.length ? (
                    <img
                      src={dados?.corretor?.img[0]}
                      className="card-img"
                      alt={dados?.corretor?.nomeCompleto}
                    />
                  ) : (
                    <div className="card-img default">
                      <img
                        src={ImgDefault}
                        alt={dados?.corretor?.nomeCompleto}
                      />
                    </div>
                  )} */}

                  <div className="card-img default">
                    <img src={ImgDefault} alt={dados?.imovel?.endereco} />
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="title">
                          <span>
                            {dados.imovel?.endereco}, {dados.imovel?.numero}
                          </span>
                        </div>
                        <p>{dados.imovel?.bairro}</p>
                        <span>
                          {dados.imovel?.cidade} - {dados.imovel?.uf}
                        </span>

                        <hr />

                        <div className="itens">
                          <div className="item">
                            <MdPhotoSizeSelectSmall size={18} color="#ADADAD" />
                            <span>{dados.imovel?.areaTotal} m²</span>
                          </div>
                          <div className="item">
                            <FaShower size={18} color="#ADADAD" />
                            <span>{dados.imovel?.qtdeBanheiros} Banheiros</span>
                          </div>
                          <div className="item">
                            <MdBed size={18} color="#ADADAD" />
                            <span>{dados.imovel?.qtdeDormitorios} Quartos</span>
                          </div>
                          <div className="item">
                            <IoCarOutline size={18} color="#ADADAD" />
                            <span>{dados.imovel?.qtdeVagasGaragem} Vagas</span>
                          </div>
                        </div>
                      </div>

                      <div className="col dados">
                        <span className="label">Data do contrato</span>
                        <div className="data">
                          <RiCalendarTodoLine size={23} />
                          <span>
                            {dados.contrato?.dtCadastro
                              ? format(
                                  parseISO(dados.contrato?.dtCadastro),
                                  "dd/MM/yyyy"
                                )
                              : null}
                          </span>
                        </div>

                        <div className="proprietario">
                          <div className="perfil">
                            <MdAccountCircle size={48} />
                            <div className="labels">
                              <span className="label">proprietario</span>
                              <p>{dados.clienteVendedor?.nomeCompleto}</p>
                            </div>
                          </div>

                          <div className="buttons">
                            {dados.clienteVendedor?.telefone && (
                              <a
                                className="btn btn-primary"
                                href={`https://wa.me/${dados.clienteVendedor?.telefone}`}
                              >
                                <BsWhatsapp />
                              </a>
                            )}

                            {/* <a className="btn btn-primary">
                              <FaPhoneAlt />
                            </a> */}
                            {dados.clienteVendedor?.email && (
                              <a
                                className="btn btn-primary"
                                href={`mailto:${dados.clienteVendedor?.email}`}
                              >
                                <MdMailOutline />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion" id="accordion-dados-imovel">
              <div className="accordion-item">
                <h2 className="accordion-header" id="heading-dados-imovel">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#dados-imovel"
                    aria-expanded="true"
                    aria-controls="dados-imovel"
                  >
                    Imóvel
                  </button>
                </h2>
                <div
                  id="dados-imovel"
                  className="accordion-collapse collapse show"
                  aria-labelledby="heading-dados-imovel"
                  data-bs-parent="#accordion-imovel"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col-lg-4">
                        <p>
                          <b>Área privativa: </b>
                          {dados.imovel?.areaPrivativa}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>Área total: </b>
                          {dados.imovel?.areaTotal}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>bairro:</b> {dados.imovel?.bairro}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <p>
                          <b>Cidade:</b> {dados.imovel?.cidade}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>Estado:</b> {dados.imovel?.uf}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>Endereço:</b> {dados.imovel?.endereco}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <p>
                          <b>Número:</b> {dados.imovel?.numero}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>complemento:</b> {dados.imovel?.complemento}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>CEP:</b> {dados.imovel?.cep}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <p>
                          <b>Quartos:</b> {dados.imovel?.qtdeDormitorios}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>Suítes:</b> {dados.imovel?.qtdeSuites}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>banheiros:</b> {dados.imovel?.qtdeBanheiros}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <p>
                          <b>Vagas:</b> {dados.imovel?.qtdeVagasGaragem}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>Valor venda original:</b>{" "}
                          {dados.imovel?.valorVendaOriginal}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>Valor venda: </b>
                          {dados.imovel?.valorVenda}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion" id="accordion-cliente-comprador">
              <div className="accordion-item">
                <h2 className="accordion-header" id="heading-cliente-comprador">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#cliente-comprador"
                    aria-expanded="true"
                    aria-controls="cliente-comprador"
                  >
                    Cliente comprador
                  </button>
                </h2>
                <div
                  id="cliente-comprador"
                  className="accordion-collapse collapse show"
                  aria-labelledby="heading-cliente-comprador"
                  data-bs-parent="#accordion-cliente-comprador"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col-lg-4">
                        <p>
                          <b>Nome:</b> {dados.clienteComprador?.nomeCompleto}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>CPF:</b> {dados.clienteComprador?.cpfcnpj}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>RG:</b> {dados.clienteComprador?.rg}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <p>
                          <b>Data de nascimento:</b>{" "}
                          {dados.clienteComprador?.dtNascimento}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>Telefone:</b> {dados.clienteComprador?.telefone}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>Email:</b> {dados.clienteComprador?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion" id="accordion-cliente-vendedor">
              <div className="accordion-item">
                <h2 className="accordion-header" id="heading-cliente-vendedor">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#cliente-vendedor"
                    aria-expanded="true"
                    aria-controls="cliente-vendedor"
                  >
                    Cliente vendedor
                  </button>
                </h2>
                <div
                  id="cliente-vendedor"
                  className="accordion-collapse collapse show"
                  aria-labelledby="heading-cliente-vendedor"
                  data-bs-parent="#accordion-cliente-vendedor"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col-lg-4">
                        <p>
                          <b>Nome:</b> {dados.clienteVendedor?.nomeCompleto}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>CPF:</b>{" "}
                          {dados.clienteVendedor?.cpfcnpj
                            ? cpfMask(dados.clienteVendedor?.cpfcnpj)
                            : null}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>RG:</b> {dados.clienteVendedor?.rg}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <p>
                          <b>Data de nascimento:</b>{" "}
                          {dados.clienteVendedor?.dtNascimento
                            ? format(
                                parseISO(dados.clienteVendedor?.dtNascimento),
                                "dd/MM/yyyy"
                              )
                            : null}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>Telefone:</b>{" "}
                          {dados.clienteVendedor?.telefone
                            ? phoneMask(dados.clienteVendedor?.telefone)
                            : null}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>Email:</b> {dados.clienteVendedor?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion" id="accordion-corretor-compra">
              <div className="accordion-item">
                <h2 className="accordion-header" id="heading-corretor-compra">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#corretor-compra"
                    aria-expanded="true"
                    aria-controls="corretor-compra"
                  >
                    Corretor da compra
                  </button>
                </h2>
                <div
                  id="corretor-compra"
                  className="accordion-collapse collapse show"
                  aria-labelledby="heading-corretor-compra"
                  data-bs-parent="#accordion-corretor-compra"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col-lg-4">
                        <p>
                          <b>Nome:</b> {dados.corretorCompra?.nomeCompleto}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>CPF:</b>{" "}
                          {dados.corretorCompra?.cpfcnpj
                            ? cpfMask(dados.corretorCompra?.cpfcnpj)
                            : null}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>RG:</b> {dados.corretorCompra?.rg}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <p>
                          <b>Data de nascimento:</b>{" "}
                          {dados.corretorCompra?.dtNascimento
                            ? format(
                                parseISO(dados.corretorCompra?.dtNascimento),
                                "dd/MM/yyyy"
                              )
                            : null}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>Telefone:</b>{" "}
                          {dados.corretorCompra?.telefone
                            ? phoneMask(dados.corretorCompra?.telefone)
                            : null}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>CRECI:</b> {dados.corretorCompra?.numeroCreci}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion" id="accordion-corretor-venda">
              <div className="accordion-item">
                <h2 className="accordion-header" id="heading-corretor-venda">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#corretor-venda"
                    aria-expanded="true"
                    aria-controls="corretor-venda"
                  >
                    Corretor da venda
                  </button>
                </h2>
                <div
                  id="corretor-venda"
                  className="accordion-collapse collapse show"
                  aria-labelledby="heading-corretor-venda"
                  data-bs-parent="#accordion-corretor-venda"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col-lg-4">
                        <p>
                          <b>Nome:</b> {dados.corretorVenda?.nomeCompleto}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>CPF:</b>{" "}
                          {dados.corretorVenda?.cpfcnpj
                            ? cpfMask(dados.corretorVenda?.cpfcnpj)
                            : null}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>RG:</b> {dados.corretorVenda?.rg}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <p>
                          <b>Data de nascimento:</b>{" "}
                          {dados.corretorVenda?.dtNascimento
                            ? format(
                                parseISO(dados.corretorVenda?.dtNascimento),
                                "dd/MM/yyyy"
                              )
                            : null}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>Telefone:</b>{" "}
                          {dados.corretorVenda?.telefone
                            ? phoneMask(dados.corretorVenda?.telefone)
                            : null}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>CRECI:</b> {dados.corretorVenda?.numeroCreci}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion" id="accordion-contrato">
              <div className="accordion-item">
                <h2 className="accordion-header" id="heading-contrato">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#contrato"
                    aria-expanded="true"
                    aria-controls="contrato"
                  >
                    Contrato
                  </button>
                </h2>
                <div
                  id="contrato"
                  className="accordion-collapse collapse show"
                  aria-labelledby="heading-contrato"
                  data-bs-parent="#accordion-contrato"
                >
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col-lg-4">
                        <p>
                          <b>Valor da venda:</b> R$ {dados.contrato?.valorVenda}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>Valor da entrada:</b> R${" "}
                          {dados.contrato?.valorEntrada}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>Valor da Financiado:</b>R${" "}
                          {dados.contrato?.valorFinanciamento}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <p>
                          <b>Meses financiamento:</b>{" "}
                          {dados.contrato?.qtdeMesesFinanciamento}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>Proposta N.:</b> {dados.contrato?.codProposta}
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <b>Observações:</b>{" "}
                          {dados.contrato?.obsCondicoesPagamento}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion" id="accordionImagens">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingImagens">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#imagens"
                    aria-expanded="true"
                    aria-controls="imagens"
                  >
                    Documentos
                  </button>
                </h2>
                <div
                  id="imagens"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingImagens"
                  data-bs-parent="#accordionImagens"
                >
                  <div className="accordion-body">
                    <form onSubmit={AprovarCorretor}>
                      {dados.arquivoContrato ? (
                        <div className="row row-cols-1 row-cols-md-4 g-4">
                          <div className="col">
                            <div className="card" style={{ width: 220 }}>
                              <img
                                data-bs-toggle="modal"
                                data-bs-target="#modalImg"
                                src={dados.arquivoContrato}
                                className="card-img-top"
                                alt={dados.imovel?.endereco}
                                onClick={() =>
                                  setImgModal({
                                    title: "Documento do contrato",
                                    url: dados.arquivoContrato,
                                  })
                                }
                              />
                              <div className="card-body">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id={dados.arquivoContrato}
                                    required
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={dados.arquivoContrato}
                                  >
                                    Documento
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="alert alert-warning" role="alert">
                          Nenhum documento enviado.
                        </div>
                      )}

                      <div className="mt-5">
                        <label htmlFor="observacoes" className="form-label">
                          Observações
                        </label>
                        {erro && (
                          <div
                            className="alert alert-danger alert-dismissible fade show erro"
                            role="alert"
                          >
                            {erro}
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="alert"
                              aria-label="Close"
                              onClick={() => setErro("")}
                            />
                          </div>
                        )}
                        <textarea
                          className="form-control observacoes"
                          id="observacoes"
                          rows={6}
                          onChange={(e) => setObs(e.target.value)}
                        />
                        <div className="mt-3">
                          <button
                            className="btn btn-outline-dark"
                            type="submit"
                            disabled={loading}
                          >
                            {loading && (
                              <div
                                className="spinner-border spinner-border-sm mx-2"
                                role="status"
                              />
                            )}
                            {loading ? "Validando" : "Validar"}
                          </button>
                          <button
                            className="btn"
                            disabled={loading}
                            type="button"
                            onClick={RecusarCorretor}
                          >
                            Recusar
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="modalImg"
        tabIndex={-1}
        aria-labelledby="modalImgLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-fullscreen-md-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalImgLabel">
                {imgModal.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <img src={imgModal.url} alt={imgModal.title} />
            </div>
          </div>
        </div>
      </div>
      <Footer dark />
    </>
  );
}
