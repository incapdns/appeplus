import "../../../styles/pages/dashboard/corretor/clientes.scss";
import NavbarDashHeader from "../../../components/Navbar/NavbarDashHeader";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BsPlusLg, BsPlusSquare } from "react-icons/bs";
import { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import api from "../../../services/api";
import Loading from "../../../components/Loading";
import { cepMask, moeda } from "../../../utils/Masks";
import { useHistory } from "react-router";
import NavbarDashCorretor from "../../../components/Navbar/NavbarDashCorretor";
import { DataAtual } from "../../../utils/DataAtual";
import { format, parseISO } from "date-fns";
import { iDadosUsuario } from "../../../@types";
import Footer from "../../../components/Footer";
interface iClienteCorretor {
  arquivosCliente: null;
  codCliente: number;
  codEstadoCivil: number;
  cpfcnpj: string;
  dtNascimento: string;
  email: null;
  genero: number;
  nomeCompleto: string;
  rg: string;
  telefone: string;
  tipoCliente: null;
}

interface iImovel {
  codImovel: number;
  codClienteVendedor: number;
  codCorretor: number;
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
  areaTotal: number;
  areaPrivativa: number;
  valorVendaOriginal: number;
  valorVenda: number;
  dtVenda: string;
  dtCadastro: string;
  userCadastro: number;
  dtAtualizacao: string;
  userAtualizacao: number;
  dtExclusao: string;
  userExclusao: number;
  valorCondominio: number;
  valorIPTU: number;
  descImovel: any;
  codExibicao: number;
  descStatus: string;
  descTipoImovel: string;
  nomeProprietario: string;
  favorito: boolean;
  codStatusAnuncio: number;
  imgsDoImovel: string[];
}

export function DashboardImoveis() {
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const [imoveis, setImoveis] = useState<iImovel[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [dadosImovel, setDadosImovel] = useState({} as iImovel);

  const [clientes, setClientes] = useState<iClienteCorretor[]>([]);

  const [dataAtual, setDataAtual] = useState("");
  const history = useHistory();
  const CodCorretor = usuario.codCorretor;
  // const CodCorretor = 102;
  const QtdePagina = 40;
  const Pagina = 1;

  useEffect(() => {
    GetImoveis();
  }, []);

  async function GetImoveis() {
    if (usuario.token) {
      setLoading(true);
      imoveis.length = 0;


      await api
        .get("imovel/listar-imoveis", {
          params: {
            CodCorretorVendedor: CodCorretor,
            Pagina: 1,
            QtdePagina:999
          },
        })
        .then((response) => {
          
          if (!response.data.success) {
            imoveis.length = 0;
            setLoading(false);
            return;
          }
          setImoveis(response.data.data);
          console.log('imovel busca', response.data.data)

          const DataAtualizacao = DataAtual();
          setDataAtual(String(DataAtualizacao));

          setLoading(false);
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
          setLoading(false);
        });
    }

  }

  async function GetClienteCorretor() {
    if (usuario.token) {
      await api
        .get(
          `/cliente/recuperar-clientes-corretor?codCorretor=${usuario.codCorretor}&qtdePagina=99&pagina=1`
        )
        .then((response) => {
          console.log(response.data.data);
          let arr = response.data.data as any[];
          setClientes(arr.filter(cliente => cliente.nivelCliente == 2));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function clienteAction(codCliente: any) {
    localStorage.setItem("@appePlus/codCliente", String(codCliente));
    localStorage.setItem("@appePlus/codImovel", String(""));
    history.push("/cadastro/imovel/anuncioSimples");
  }

  function editarImovel(codClienteEdicao:any , codImovelEdicao:any){
    localStorage.setItem("@appePlus/codCliente", String(codClienteEdicao));
    localStorage.setItem("@appePlus/codImovel", String(codImovelEdicao));
    history.push("/cadastro/imovel/anuncioSimples");
  }

  return (
    <>
    <div className="wrapper-imoveis pb-5" id="dashboard-clientes">
      <NavbarDashCorretor />
      <div className="main-content" >
        <NavbarDashHeader />
        <div className="container">
          <div className="row mb-3">
            <div className="col" style={{ textAlign: 'justify'}}>
              <h2>Imóveis</h2>
            </div>
            <div className="col-6 col-lg-3">
              <div className="content-button">
                <button
                  type="button"
                  className="buttonCompartilhar"
                  data-bs-toggle="modal"
                  data-bs-target="#modalTableCliente"
                  onClick={GetClienteCorretor}
                >
                  <span>
                    <BsPlusSquare fontSize={20} />
                    Novo Imóvel
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="col" style={{ textAlign: 'justify'}}>
              <p> Olá corretor. </p>
              <p> Para cadastrar novos imóveis é preciso primeiro que você cadastre clientes e que eles já estejam ativos na plataforma. </p>
              <p> Para cadastrar de maneira completa um novo imóvel, garantindo assim uma melhor visibilidade para possíveis compradores,
                você precisa trazer o máximo de detalhes possíveis sobre o imóvel e ainda informar: Endereço completo do imóvel, valores de IPTU,
                condomínio e o valor pretendido de venda. Será imprescindível ainda, possuir boas fotos do imóvel e apresentar os documentos recentes de
                Registro e IPTU do imóvel.</p>
              <p> Após a conclusão do cadastro, seu cliente vai receber uma notificação por email, indicado se está de acordo com  publicação do anúncio e
                venda do imóvel pelo Appê Plus,  conforme os termos previstos pela plataforma. Em uma última etapa, nossa equipe validará todos os dados do imóvel,
                antes do anúncio ser publicado.</p>
              <p> No Appê Plus, são publicados apenas imóveis verificados, garantido assim a todos usuários, segurança e transparência.</p>
              <p> É importante você deixar o seu cliente ciente deste processo. </p>
              <p> Qualquer dúvida entre em contato conosco, pelo contato@appeplus.com</p>
            </div>
          <div className="body">
            {/* <div className="row mb-3">
              <div className="col-lg-4">
                <div className="mb-3">
                  <div className="form-control-icon">
                    <input
                      type="text"
                      className="form-control"
                      value={nome}
                      placeholder="Busque por nome"
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="mb-3">
                  <div className="form-control-icon">
                    <input
                      type="text"
                      className="form-control"
                      value={rg}
                      placeholder="Busque por RG"
                      onChange={(e) => setRg(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="mb-3">
                  <div className="form-control-icon">
                    <input
                      type="text"
                      className="form-control"
                      value={cpf}
                      placeholder="Busque por CPF"
                      onChange={(e) => setCpf(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-2">
                <div className="mb-3 d-grid">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={GetClientes}
                  >
                    Buscar <MdSearch />
                  </button>
                </div>
              </div>
            </div> */}

            {loading ? (
              <Loading />
            ) : (
              <>
                {imoveis.length ? (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Endereço</th>
                          <th scope="col">Cidade-UF</th>
                          <th scope="col">Proprietário</th>
                          <th scope="col">Data cadastro</th>
                          <th scope="col">Status</th>
                          <th scope="col" className="center">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {imoveis.map((imovel) => {
                          return (
                            <tr key={imovel.codImovel}>
                              <td>
                                {imovel.imgsDoImovel.length ? (
                                  <img
                                    src={imovel.imgsDoImovel[0]}
                                    alt={imovel.endereco}
                                    className="img-thumbnail"
                                  />
                                ) : (
                                  <MdOutlineAccountCircle size={48} />
                                )}
                                {imovel.endereco}, {imovel.numero}
                              </td>
                              <td>
                                {imovel.cidade}-{imovel.uf}
                              </td>
                              <td>{imovel.nomeProprietario}</td>
                              <td>
                                {imovel.dtCadastro
                                  ? format(
                                    parseISO(imovel.dtCadastro),
                                    "dd/MM/yyyy"
                                  )
                                  : null}
                              </td>
                              <td className="status">{imovel.descStatus}</td>
                              <td className="center">
                                <button
                                  className="btn"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalDashboard"
                                  onClick={() => setDadosImovel(imovel)}
                                >
                                  <BsPlusLg size={18} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="alert alert-warning" role="alert">
                    Nenhum imóvel encontrado.
                  </div>
                )}

                <div className="footer">
                  {dataAtual ? `Última atualização em ${dataAtual}` : null}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="modalDashboard"
        tabIndex={-1}
        aria-labelledby="modalDashboardLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalDashboardLabel">
                Dados do imóvel
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {loadingModal ? (
                <Loading />
              ) : (
                <>
                  <h2>
                    {dadosImovel?.imgsDoImovel?.length ? (
                      <img
                        src={dadosImovel?.imgsDoImovel[0]}
                        alt={dadosImovel?.endereco}
                        className="img-thumbnail"
                      />
                    ) : (
                      <MdOutlineAccountCircle size={48} />
                    )}
                    {dadosImovel?.endereco}, {dadosImovel?.numero}
                  </h2>

                  <hr />

                  <div className="title d-flex justify-content-end align-items-center mb-4">
                    <div className="actions d-flex justify-content-center align-items-center">
                      <button className="btn" data-bs-dismiss="modal" aria-label="Close" onClick={() => editarImovel(dadosImovel?.codClienteVendedor, dadosImovel?.codImovel)}>
                        Editar
                        <BiEditAlt size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="row dados-pessoais">
                    <div className="col">
                      <div className="mb-3">
                        <span>Proprietário: </span>
                        {dadosImovel?.nomeProprietario}
                      </div>
                      <div className="mb-3">
                        <span>Endereço: </span>
                        {dadosImovel.endereco ? (
                          `${dadosImovel.endereco}, ${dadosImovel.numero}`
                        ) : (
                          <span>- Não informado -</span>
                        )}
                      </div>
                      <div className="mb-3">
                        <span>CEP: </span>
                        {dadosImovel?.cep ? cepMask(dadosImovel?.cep) : null}
                      </div>
                      <div className="mb-3">
                        <span>Status:</span> {dadosImovel?.descStatus}
                      </div>
                    </div>

                    <div className="col">
                      <div className="mb-3">
                        <span>Data de cadastro: </span>
                        {dadosImovel?.dtCadastro
                          ? format(
                            parseISO(dadosImovel?.dtCadastro),
                            "dd/MM/yyyy"
                          )
                          : null}
                      </div>
                      <div className="mb-3">
                        <span>Cidade/UF: </span>
                        {dadosImovel.cidade ? (
                          `${dadosImovel.cidade} - ${dadosImovel.uf}`
                        ) : (
                          <span>- Não informado -</span>
                        )}
                      </div>
                      <div className="mb-3">
                        <span>Valor: </span>
                        R$
                        {dadosImovel?.valorVendaOriginal
                          ? moeda(dadosImovel?.valorVendaOriginal)
                          : null}
                      </div>
                    </div>
                  </div>

                  <hr />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="modalTableCliente"
        tabIndex={-1}
        aria-labelledby="modalTableClienteLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modalTableClienteLabel">
                Clientes{" "}
              </h4>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                X
              </button>
            </div>
            <div className="modal-body">
              {clientes.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-proposta ">
                    <tbody className="text-center">
                      <tr key="header">
                        <td className="cpf">
                          <span>Documento</span>
                        </td>
                        <td className="proprietario">
                          <span>Nome</span>
                        </td>
                        <td className="button">
                          <span>Ação</span>
                        </td>
                      </tr>
                      {clientes.map((cliente) => (
                        <tr key={cliente.codCliente}>
                          <td className="cpf">{cliente.cpfcnpj}</td>
                          <td className="proprietario">
                            {cliente.nomeCompleto}
                          </td>
                          <td className="button">
                            <button
                              className="button-selecionar"
                              data-bs-dismiss="modal"
                              onClick={() => clienteAction(cliente.codCliente)}
                            >
                              selecionar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center">
                  Desculpe no momento não temos informações.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer dark />
     
    </>
  );
}
