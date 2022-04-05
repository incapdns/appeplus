import "../../../styles/pages/dashboard/corretor/clientes.scss";
import NavbarDashHeader from "../../../components/Navbar/NavbarDashHeader";
import { MdOutlineAccountCircle, MdSearch } from "react-icons/md";
import { BsPlusLg, BsPlusSquare } from "react-icons/bs";
import { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import api from "../../../services/api";
import Loading from "../../../components/Loading";
import { cpfMask, phoneMask } from "../../../utils/Masks";
import { useHistory } from "react-router";
import NavbarDashCorretor from "../../../components/Navbar/NavbarDashCorretor";
import { DataAtual } from "../../../utils/DataAtual";
import { format, parseISO } from "date-fns";
import { iDadosUsuario } from "../../../@types";
import Footer from "../../../components/Footer";

interface iCliente {
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
  nivelCliente:number;
  dtCadastro: string;
  codStatus: number;
  descStatus: string;
  arquivosCliente: [
    {
      codArquivoCliente: number;
      codTipoArquivo: number;
      url: string;
    }
  ];
}

export function DashboardClientes() {
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const [clientes, setClientes] = useState<iCliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [dadosCliente, setDadosCliente] = useState({} as iCliente);
  console.log(
    "🚀 ~ file: Clientes.tsx ~ line 47 ~ DashboardClientes ~ dadosCliente",
    dadosCliente
  );
  const [dataAtual, setDataAtual] = useState("");
  const [nome, setNome] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const history = useHistory();
  const CodCorretor = usuario.codCorretor;
  // const CodCorretor = 102;
  const QtdePagina = 40;
  const Pagina = 1;

  function checaUsuarioLogado() {
    console.log(usuario);
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  useEffect(() => {
    checaUsuarioLogado();
    GetClientes();
  }, []);

  async function GetClientes() {
    setLoading(true);
    clientes.length = 0;

    await api
      .get("cliente/corretor-filtro", {
        params: {
          CodCorretor,
          QtdePagina,
          Pagina,
          NomeCliente: nome,
          CpfCnpj: cpf,
          Rg: rg,
        },
      })
      .then((response) => {
        if (!response.data.success) {
          clientes.length = 0;
          setLoading(false);
          return;
        }
        setClientes(response.data.data);
        console.log(
          "🚀 ~ file: Clientes.tsx ~ line 200 ~ .then ~ response.data.data",
          response.data.data
        );

        const DataAtualizacao = DataAtual();
        setDataAtual(String(DataAtualizacao));

        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoading(false);
      });
  }
  function nivelCliente(codNivel:number){
    switch(codNivel){
      case 1 :
        return <span>Comprador</span>;
        break;
      case 2:
        return <span>Vendedor</span>;
        break;
      case 3:
        return <span>Ambos</span>;
        break;
      
    }
  }

  function editarClienteVendedor(codClienteEdicao:any, codNivel:any){
    localStorage.setItem("@appePlus/codNivelClienteEdicao", String(codNivel));
    localStorage.setItem("@appePlus/codClienteEdicao", String(codClienteEdicao));
    localStorage.setItem("@appePlus/urlEdicao", String(window.location.pathname));
    history.push("/cadastro/cliente/vendedor");
  }
  function editarClienteComprador(codClienteEdicao:any, codNivel:any){
    localStorage.setItem("@appePlus/codNivelClienteEdicao", String(codNivel));
    localStorage.setItem("@appePlus/codClienteEdicao", String(codClienteEdicao));
    localStorage.setItem("@appePlus/urlEdicao", String(window.location.pathname));
    history.push("/cadastro/cliente/comprador");
  }

  function AdicionarClienteVendedor(codClienteEdicao:any, codNivel:any){
    localStorage.setItem("@appePlus/codNivelClienteEdicao", String(codNivel));
    localStorage.setItem("@appePlus/codClienteEdicao", String(codClienteEdicao));
    localStorage.setItem("@appePlus/urlEdicao", String(window.location.pathname));
    history.push("/cadastro/cliente/vendedor");
  }
  function AdicionarClienteComprador(codClienteEdicao:any,codNivel:any){
    localStorage.setItem("@appePlus/codNivelClienteEdicao", String(codNivel));
    localStorage.setItem("@appePlus/codClienteEdicao", String(codClienteEdicao));
    localStorage.setItem("@appePlus/urlEdicao", String(window.location.pathname));
    history.push("/cadastro/cliente/comprador");
  }

  function criarVendedor(){
    localStorage.removeItem("@appePlus/codClienteEdicao");
    history.push("/cadastro/cliente/vendedor")
  }
  function criarComprador(){
    localStorage.removeItem("@appePlus/codClienteEdicao");
    history.push("/cadastro/cliente/comprador")
  }

  return (
    <>
      
      <div className="wrapper-imoveis pb-5" id="dashboard-clientes">
        <NavbarDashCorretor />
        <div className="main-content">
          <NavbarDashHeader />
          <div className="container">
            <div className="row mb-3">
              <div className="col" style={{ textAlign: 'justify' }}>
                <h2>Clientes</h2>
              </div>
              <div className="col">
                <div className="col d-flex justify-content-end">
                  <div className="content-button">
                    <button
                      type="button"
                      className="buttonCompartilhar"
                      onClick={criarComprador}
                    >
                      <BsPlusSquare fontSize={20} />
                      <span>Novo Comprador</span>
                    </button>
                  </div>

                  <div className="content-button">
                    <button
                      type="button"
                      className="buttonCompartilhar"
                      onClick={criarVendedor}
                    >
                      <BsPlusSquare fontSize={20} />
                      <span>Novo Vendedor</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col" style={{ textAlign: 'justify' }}>
                <p>Olá corretor.</p>
                <p>Para cadastrar novos clientes, é necessário que você tenha algumas informações do seu cliente,
                  como: Nome completo, data de nascimento, e-mail válido, telefone celular. Além disto será necessário informar o estado civil do seu cliente,
                  informar os número de CPF e RG dele e fazer o up load destes documentos.</p>
                <p>Após você completar o cadastro, seu cliente vai receber um e-mail, para que ele confirme que está ciente de que você é o corretor
                  dele e que está realizando este cadastro. Após o cliente confirmar, será então possível que você inclua um imóvel deste cliente,
                  para ser anunciado na plataforma.</p>
                <p>É importante você deixar o seu cliente ciente deste processo.</p>
                <p>Qualquer dúvida entre em contato conosco, pelo contato@appeplus.com </p>
              </div>
            <div className="body ">
              <div className="row mb-3">
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
              </div>

              {loading ? (
                <Loading />
              ) : (
                <>
                  {clientes.length ? (
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Data cadastro</th>
                            <th scope="col">Tipo cliente</th>
                            <th scope="col">Status</th>
                            <th scope="col" className="center">
                              Ações
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {clientes.map((cliente) => {
                            return (
                              <tr key={cliente.codCliente}>
                                <td>
                                  {cliente.arquivosCliente.length ? (
                                    <img
                                      src={cliente.arquivosCliente[0].url}
                                      alt={cliente.nomeCompleto}
                                      className="img-thumbnail"
                                    />
                                  ) : (
                                    <MdOutlineAccountCircle size={48} />
                                  )}
                                  {cliente.nomeCompleto}
                                </td>
                                <td>{cliente.email}</td>
                                <td>
                                  {cliente.telefone
                                    ? phoneMask(cliente.telefone)
                                    : null}
                                </td>
                                <td>
                                  {cliente.dtCadastro
                                    ? format(
                                      parseISO(cliente.dtCadastro),
                                      "dd/MM/yyyy"
                                    )
                                    : null}
                                </td>
                                <td>{nivelCliente(cliente.nivelCliente)}</td> 
                                <td className="status">{cliente.descStatus}</td>
                                
                                <td className="center">
                                  <button
                                    className="btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalDashboard"
                                    onClick={() => setDadosCliente(cliente)}
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
                      Nenhum cliente encontrado.
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
                Dados do cliente
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
                    {dadosCliente.hasOwnProperty("arquivosCliente") &&
                      !!dadosCliente.arquivosCliente.length ? (
                      <img
                        src={dadosCliente.arquivosCliente[0].url}
                        alt={dadosCliente.nomeCompleto}
                        className="img-thumbnail"
                      />
                    ) : (
                      <MdOutlineAccountCircle size={48} />
                    )}
                    {dadosCliente?.nomeCompleto}
                  </h2>

                  <hr />

                  <div className="title d-flex justify-content-end align-items-center mb-4">
                    <div className="actions d-flex justify-content-center align-items-center">
                      {dadosCliente.nivelCliente === 1 && (
                        <>
                          <button className="btn m-1" data-bs-dismiss="modal" onClick={() => editarClienteComprador(dadosCliente.codCliente, dadosCliente.nivelCliente)}>
                            Editar Comprador
                            <BiEditAlt size={16} />
                          </button>
                          <button className="btn m-1" data-bs-dismiss="modal" onClick={() => AdicionarClienteVendedor(dadosCliente.codCliente, dadosCliente.nivelCliente)}>
                          adiciona-lo como Vendedor
                          <BiEditAlt size={16} />
                        </button>
                        </>
                          
                      )}
                      {dadosCliente.nivelCliente === 2 && (
                        <>
                          <button className="btn m-1" data-bs-dismiss="modal" onClick={() => editarClienteVendedor(dadosCliente.codCliente, dadosCliente.nivelCliente)}>
                            Editar Vendedor
                            <BiEditAlt size={16} />
                          </button>

                          <button className="btn m-1" data-bs-dismiss="modal" onClick={() => AdicionarClienteComprador(dadosCliente.codCliente, dadosCliente.nivelCliente)}>
                          adiciona-lo como Comprador
                            <BiEditAlt size={16} />
                          </button>
                        </>
                        
                      )}

                      {dadosCliente.nivelCliente === 3 && (
                        <>
                          <button className="btn m-1" data-bs-dismiss="modal" onClick={() => editarClienteComprador(dadosCliente.codCliente, dadosCliente.nivelCliente)}>
                            Editar Comprador
                            <BiEditAlt size={16} />
                          </button>
                          <button className="btn m-1" data-bs-dismiss="modal" onClick={() => editarClienteVendedor(dadosCliente.codCliente, dadosCliente.nivelCliente)}>
                          Editar Vendedor
                          <BiEditAlt size={16} />
                        </button>
                        </>
                        
                      )}
                      
                      
                      
                    </div>
                  </div>

                  <div className="row dados-pessoais">
                    <div className="col">
                      <div className="mb-3">
                        <span>RG:</span> {dadosCliente?.rg}
                      </div>
                      <div className="mb-3">
                        <span>Endereço:</span>{" "}
                        {/* {dadosCliente.endereco ? (
                            `${dadosCliente.endereco}, ${dadosCliente.numero}`
                          ) : (
                            <span>- Não informado -</span>
                          )} */}
                      </div>
                      <div className="mb-3">
                        <span>Email:</span> {dadosCliente?.email}
                      </div>
                      <div className="mb-3">
                        <span>Status:</span> {dadosCliente?.descStatus}
                      </div>
                    </div>

                    <div className="col">
                      <div className="mb-3">
                        <span>CPF:</span>{" "}
                        {dadosCliente?.cpfcnpj
                          ? cpfMask(dadosCliente?.cpfcnpj)
                          : null}
                      </div>
                      <div className="mb-3">
                        <span>Cidade/UF:</span>{" "}
                        {/* {dadosCliente.cidade ? (
                            `${dadosCliente.cidade} - ${dadosCliente.uf}`
                          ) : (
                            <span>- Não informado -</span>
                          )} */}
                      </div>

                      <div className="mb-3">
                        <span>Telefone:</span>{" "}
                        {dadosCliente?.telefone
                          ? phoneMask(dadosCliente?.telefone)
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
      <Footer dark />
    </>
  );
}
