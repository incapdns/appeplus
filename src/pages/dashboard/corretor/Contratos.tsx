import { FormEvent, useEffect, useState } from "react";
import NavbarDashHeader from "../../../components/Navbar/NavbarDashHeader";
import { FaSearch } from "react-icons/fa";
import Footer from "../../../components/Footer";
import { BsCheck2, BsDownload, BsX } from "react-icons/bs";
import api from "../../../services/api";
import { iDadosUsuario } from "../../../@types";
import NavbarDashCorretor from "../../../components/Navbar/NavbarDashCorretor";
import "../../../styles/pages/dashboard/corretor/contratos.scss";
import { useHistory } from "react-router";

interface iStatusContrato {
  codStatusContrato: number;
  descStatusContrato: string;
}
interface iCliente {
  arquivosCliente: any;
  codCliente: number;
  codEstadoCivil: number;
  cpfcnpj: any;
  dtNascimento: string;
  email: string;
  genero: number;
  nomeCompleto: string;
  rg: any;
  telefone: string;
  tipoCliente: any;
}

interface iContrato {
  codBancoFinanciamento: number;
  codContrato: number;
  codCorretorCompra: number;
  codCorretorVenda: number;
  codImovel: number;
  codProposta: number;
  codstatuscontrato: number;
  obsCondicoesPagamento: string;
  qtdeMesesFinanciamento: number;
  taxaJuros: number;
  valorEntrada: number;
  valorFGTS: number;
  valorFinanciamento: number;
  valorPrimeiraParcela: number;
  valorUltimaParcela: number;
  valorVenda: number;
}

interface iImovel {
  areaPrivativa: number;
  areaTotal: number;
  bairro: string;
  cep: string;
  cidade: string;
  codClienteVendedor: number;
  codCorretorVendedor: number;
  codImovel: number;
  codStatus: number;
  codStatusAnuncio: number;
  codTipoImovel: number;
  complemento: string;
  endereco: string;
  latitude: string;
  longitude: string;
  numero: string;
  qtdeBanheiros: number;
  qtdeDormitorios: number;
  qtdeSuites: number;
  qtdeVagasGaragem: number;
  qtdeVisualizacoes: number;
  uf: string;
  valorVenda: number;
  valorVendaOriginal: number;
}

interface iContratosApi {
  cliente: iCliente;
  contrato: iContrato;
  imovel: iImovel;
}

export default function Contratos() {
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const [contratos, setContratos] = useState<iContratosApi[]>([]);
  const [statusContratos, setStatusContratos] = useState<iStatusContrato[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [valor, setValor] = useState("");
  const [codContrato, setCodContrato] = useState<any>();
  const [motivoCancelamento, setMotivoCancelamento] = useState("");
  const [codStatusContrato, setCodStatusContrato] = useState(0);
  const [file, setFile] = useState<any>();
  const handleUploadFile = (e: any) => setFile(e.target.files[0]);
  const CodCorretor = usuario.codCorretor;
  const codMotivoCancelamento = 0;
  const history = useHistory();

  function checaUsuarioLogado() {
    if (!usuario.token || usuario.codStatus !== 1) {
      window.alert("Você precisar estar logado e aprovado para acessar este menu!");
      history.push("/");
    }
  }

  useEffect(() => {
    checaUsuarioLogado();
    getContratos();
    getStatusContratos();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const data = new FormData();
    data.append("FormFile", file);
    await api
      .post("arquivoContrato", {
        codContrato,
        isArquivo: true,
        FormFile: [data],
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function CancelarContrato() {
    await api
      .patch("contrato/cancelar", {
        codContrato,
        codMotivoCancelamento,
        motivoCancelamento,
        codStatusContrato,
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function getContratos() {
    await api
      .get("contrato/busca-avancada", {
        params: {
          CodCorretor,
        },
      })
      .then((response) => {
        setContratos(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function getBuscaContratos(event: FormEvent) {
    event.preventDefault();
    await api
      .get("contrato/busca-avancada", {
        params: {
          CodCorretor,
          Endereco: search,
          ValorVenda: valor ? Number(valor) : null,
          CodStatusContrato: status ? Number(status) : null,
        },
      })
      .then((response) => {
        setContratos(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function getStatusContratos() {
    await api
      .get("status-contrato")
      .then((response) => {
        setStatusContratos(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  return (
    <>
      <div className="wrapper-imoveis" id="contratos-corretor">
        <NavbarDashCorretor />
        <div className="main-content">
          <NavbarDashHeader />
          <div className="container">
            <section className="my-4">
              <div className="row">
                <div className="col-lg-8">
                  <h2>Contratos</h2>
                </div>
              </div>
            </section>
            <section className="meus-imoveis">
              <form onSubmit={getBuscaContratos}>
                <div className="filtro-corretor my-3 col-lg-12">
                  <input
                    type="text"
                    placeholder=" Busque por endereço"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="campo-filtro"
                  />
                  <button type="submit" className="buttonBuscar">
                    Encontrar Contrato <FaSearch style={{ marginLeft: 10 }} />
                  </button>
                </div>
              </form>
              <div className="row mx-2 my-4">
                <div className="col-lg-3 mb-3 mb-lg-0">
                  <select
                    className="form-select campo-select"
                    aria-label="Valor do imóvel"
                    defaultValue=""
                    onChange={(e) => setValor(e.target.value)}
                  >
                    <option value="">Valor do contrato</option>
                    <option value="250000">R$ 150 mil a 250 mil</option>
                    <option value="450000">R$ 350 mil a 450 mil</option>
                    <option value="650000">R$ 450 mil a 650 mil</option>
                    <option value="1000000">R$ 650 mil a 1 milhão</option>
                    <option value="2000000">mais de R$ 1 milhão</option>
                  </select>
                </div>
                <div className="col-lg-3 mb-3 mb-lg-0">
                  <select
                    className="form-select campo-select"
                    aria-label="Status da proposta"
                    defaultValue=""
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Status do contrato</option>
                    {statusContratos.map((status) => (
                      <option
                        key={status.codStatusContrato}
                        value={status.codStatusContrato}
                      >
                        {status.descStatusContrato}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="cod-md-2 line-gray" />

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Imóvel</th>
                      <th scope="col">Status do contrato</th>
                      <th scope="col">Proprietário</th>
                      <th scope="col">Data de criação</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contratos.map((contrato, index) => (
                      <tr key={index}>
                        <td>
                          {contrato.imovel.endereco}, {contrato.imovel.numero}
                        </td>
                        <td>{contrato.contrato.codstatuscontrato}</td>
                        <td>{contrato.cliente.nomeCompleto}</td>
                        <td>não informado</td>
                        <td>
                          <button
                            className="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#modalArquivo"
                            onClick={() =>
                              setCodContrato(contrato.contrato.codContrato)
                            }
                          >
                            <BsCheck2 />
                          </button>
                          <button
                            className="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#modalCancelamento"
                            onClick={() => {
                              setCodContrato(contrato.contrato.codContrato);
                              setCodStatusContrato(
                                contrato.contrato.codstatuscontrato
                              );
                            }}
                          >
                            <BsX />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>

        <div
          className="modal fade"
          id="modalArquivo"
          tabIndex={-1}
          aria-labelledby="modalArquivo"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalArquivo">
                  Arquivo
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <p>
                    Baixe e preecha o aqruivo a seguir depois envie o arquivo
                    preenchido no formulario abaixo.
                  </p>
                  <hr className="my-4" />
                  <p>
                    <span className="badge bg-warning">1</span> Baixe o arquivo
                    aqui e preencha em seu computador:
                  </p>
                  <button className="btn btn-danger text-light">
                    <BsDownload />
                    baixe o arquivo aqui
                  </button>
                  <hr className="my-4" />
                  <p>
                    <span className="badge bg-warning">2</span> Após preencher,
                    anexe o arquivo aqui e envie no botão abaixo:
                  </p>
                  <input type="file" onChange={handleUploadFile} />
                  {/* <hr /> */}
                  <div className="d-grid gap-2 mt-4">
                    <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#modalArquivo"
                    >
                      Enviar arquivo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="modalCancelamento"
          tabIndex={-1}
          aria-labelledby="modalCancelamentoLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalCancelamentoLabel">
                  Cancelar contrato
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="motivoCancelamento" className="form-label">
                    Motivo do cancelamento
                  </label>
                  <textarea
                    className="form-control"
                    id="motivoCancelamento"
                    rows={3}
                    onChange={(e) => setMotivoCancelamento(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={CancelarContrato}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer dark />
    </>
  );
}
