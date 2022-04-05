import React, { FormEvent, useEffect, useState } from "react";
import { NavbarDashDark } from "../../components/Navbar/NavbarDashDark";
import NavbarDashHeader from "../../components/Navbar/NavbarDashHeader";
import { FaSearch } from "react-icons/fa";
import { IoOptions } from "react-icons/io5";
import "../../styles/pages/dashboard/meusImoveis.scss";
import "../../styles/pages/dashboard/listaPropostas.scss";
import Footer from "../../components/Footer";
import ImovelProposta from "../../assets/internas/imovel-user.png";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { iDadosUsuario } from "../../@types";

interface iListaProspeccao {
  codProspeccao: number;
  codImovel: number;
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
    descCompletaPredio: string;
    descCompletaImovel: string;
    valorIptu: number;
    valorCondominio: number;
    descComplementar: string;
    descStatus: string;
    descTipoImovel: string;
    descCaracteristica: [string];
    codCaracteristica: [number];
    descItem: [string];
    codItem: [number];
    items: [
      {
        codImovel: number;
        codItemImovel: number;
        codItem: number;
        descItem: string;
        destaque: number;
      }
    ];
    caracteristicas: [
      {
        codImovel: number;
        codCaracteristicaImovel: number;
        codCaracteristica: number;
        descCaracteristica: string;
        destaque: number;
      }
    ];
    descExibicao: [string];
    imgsDoImovel: [string];
    estabelecimentosImovel: [
      {
        codEstabelecimentoImovel: number;
        descEstabelecimentoImovel: string;
        qtdEstabelecimentos: number;
      }
    ];
    bairrosProximos: [
      {
        value: number;
        label: string;
      }
    ];
  };
  codProposta: number;
  codImovelProspeccao: number;
  dtCadastro: string;
  userCadastro: number;
  dtAtualizacao: string;
  userAtualizacao: number;
  dtConclusao: string;
  userConclusao: number;
  dtCancelamento: string;
  userCancelamento: number;
  codMotivoCancelamento: number;
  motivoCancelamento: string;
  valor: number;
  obsCondicoesPagamento: string;
  codStatusProposta: number;
  codTermmometroProposta: number;
  dtValidade: string;
  observacoes: string;
  numProposta: number;
  codPropostaPai: number;
  codAditivo: number;
  dtAceite: string;
  userAceite: number;
  dtRecusa: string;
  userRecusa: number;
  motivoRecusa: string;
  desTipoImovel: string;
  descStatusProposta: string;
  descTipoImovel: string;
  endereco: string;
  codVendedor: number;
  vendedor: {
    codCliente: number;
    nomeCompleto: string;
    telefone: string;
    email: string;
    dtNascimento: string;
    tipoCliente: string;
    codEstadoCivil: number;
    cpfcnpj: string;
    rg: string;
    genero: number;
    arquivosCliente: [
      {
        codArquivoCliente: number;
        codTipoArquivo: number;
        url: string;
      }
    ];
  };
  codComprador: number;
  comprador: {
    codCliente: number;
    nomeCompleto: string;
    telefone: string;
    email: string;
    dtNascimento: string;
    tipoCliente: string;
    codEstadoCivil: number;
    cpfcnpj: string;
    rg: string;
    genero: number;
    arquivosCliente: [
      {
        codArquivoCliente: number;
        codTipoArquivo: number;
        url: string;
      }
    ];
  };
}

const ListaPropostas = () => {
  const history = useHistory();
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );

  const [prospeccao, setProspeccao] = useState<iListaProspeccao[]>([]);
  let [filterProposta, setFilterImovel] = useState<iListaProspeccao[]>([]);
  const [filter, setFilter] = useState<iListaProspeccao[]>([]);
  const [searchGetFilterProposta, setSearchGetFilterProposta] = useState(false);
  const [searchProposta, setSearchProposta] = useState("");

  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  async function getFilterProposta() {
    await api
      .get(`/Proposta/listar-por-prospeccao?CodCorretor=2`)
      .then((response) => {
        filterProposta = response.data.data;

        setSearchGetFilterProposta(true);
        const filter = filterProposta.filter((proposta) => {
          return (
            proposta?.imovel.endereco
              ?.toString()
              .toLowerCase()
              .includes(searchProposta.toString().toLowerCase()) ||
            proposta?.comprador.nomeCompleto
              ?.toString()
              .toLowerCase()
              .includes(searchProposta.toString().toLowerCase()) ||
            proposta?.vendedor.nomeCompleto
              ?.toString()
              .toLowerCase()
              .includes(searchProposta.toString().toLowerCase()) ||
            proposta?.valor
              ?.toString()
              .toLowerCase()
              .includes(searchProposta.toString().toLowerCase())
          );
        });

        setFilter(filter);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }
  function handleProposta(event: FormEvent) {
    event.preventDefault();

    if (searchProposta === "") {
      getPropostas();
      setSearchGetFilterProposta(false);
    } else {
      getFilterProposta();
    }
  }

  async function getPropostas() {
    if (usuario.token) {
      await api
        .get(`/Proposta/listar-por-prospeccao?CodCorretor=2`)
        .then((response) => {
          setProspeccao(response.data.data);
        });
    }
  }
  function getCodProposta(codProposta: any) {
    const codigoProposta = codProposta;
    localStorage.setItem("CodigoProposta", codigoProposta);
    buttonActiveClass();
  }

  function buttonActiveClass() {
    let buttonActive = document.querySelectorAll(".button-selecionar");
    buttonActive.forEach((button, index) => {
      button.addEventListener("click", () => {
        tabButton(index);
      });
    });
    function tabButton(index: any) {
      buttonActive.forEach((button) => {
        button.classList.remove("ativo");
        button.innerHTML = "selecionar";
      });
      buttonActive[index].classList.add("ativo");
      buttonActive[index].innerHTML = "selecionado";
    }
  }

  useEffect(() => {
    getPropostas();
    checaUsuarioLogado();
  }, []);

  return (
    <>
      <div className="wrapper-imoveis" id="dashboard-lista-propostas">
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

            <section className="meus-imoveis">
              <div className="m-3">
                <h4>
                  Escolha alguma das propostas abaixo para começar a criar
                  contato
                </h4>
                <p>
                  Você só vera as negociações em andamento com você nesse
                  momento{" "}
                </p>
              </div>
              <form onSubmit={handleProposta}>
                <div className="filtro-corretor my-3 col-lg-12">
                  <input
                    type="text"
                    value={searchProposta}
                    onChange={(event) => setSearchProposta(event.target.value)}
                    placeholder="Busque por nome das partes ou endereço do imóvel"
                    className="campo-filtro"
                  />
                  <button type="submit" className="buttonBuscar">
                    Encontrar proposta <FaSearch style={{ marginLeft: 10 }} />
                  </button>
                </div>
              </form>
              <div className="row mx-2 my-4">
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-4 mb-3 mb-lg-0">
                      <select
                        className="form-select campo-select"
                        aria-label="Valor do imóvel"
                        defaultValue="1"
                      >
                        <option value="1">Proprietário</option>
                        <option value="2">lorem</option>
                        <option value="3">lorem</option>
                        <option value="4">lorem</option>
                        <option value="5">lorem</option>
                        <option value="6">lorem</option>
                      </select>
                    </div>
                    <div className="col-lg-4 mb-3 mb-lg-0">
                      <select
                        className="form-select campo-select"
                        aria-label="Status da proposta"
                        defaultValue=""
                      >
                        <option value="">Comprador</option>
                        <option value="1">lorem</option>
                        <option value="2">lorem</option>
                        <option value="3">lorem</option>
                      </select>
                    </div>
                    <div className="col-lg-4 mb-3 mb-lg-0">
                      <select
                        className="form-select campo-select"
                        aria-label="Status da proposta"
                        defaultValue=""
                      >
                        <option value="">Valor da proposta</option>
                        <option value="1">lorem</option>
                        <option value="2">lorem</option>
                        <option value="3">lorem</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 d-flex justify-content-lg-end">
                  <button type="button" className="buttonMais">
                    <IoOptions style={{ marginRight: 10 }} size={22} />
                    Mais filtros
                  </button>
                </div>
              </div>
              <div className="cod-md-2 line-gray"></div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="table-responsive">
                    <table className="table table-proposta ">
                      <tbody>
                        {searchGetFilterProposta ? (
                          <>
                            {filter.map((prospFilter) => (
                              <tr key={prospFilter.codProposta}>
                                <td className="name-img">
                                  <img
                                    src={ImovelProposta}
                                    className="img-vendedor"
                                    alt="imagem de perfil imovel corretor"
                                  />
                                  {prospFilter.endereco}
                                </td>
                                <td className="valor-proposta">
                                  {prospFilter.valor}
                                </td>
                                <td className="proprietario">
                                  <span>Proprietario:</span>{" "}
                                  {prospFilter.vendedor.nomeCompleto}
                                </td>
                                <td className="comprador">
                                  <span>Comprador:</span>{" "}
                                  {prospFilter.comprador.nomeCompleto}
                                </td>
                                <td className="button">
                                  <button
                                    className="button-selecionar"
                                    onClick={() =>
                                      getCodProposta(prospFilter.codProposta)
                                    }
                                  >
                                    selecionar
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <>
                            {prospeccao.map((prosp) => (
                              <tr key={prosp.codProposta}>
                                <td className="name-img">
                                  <img
                                    src={ImovelProposta}
                                    className="img-vendedor"
                                    alt="imagem de perfil imovel corretor"
                                  />
                                  {prosp.endereco}
                                </td>
                                <td className="valor-proposta">
                                  {prosp.valor}
                                </td>
                                <td className="proprietario">
                                  <span>Proprietario:</span>{" "}
                                  {prosp.vendedor.nomeCompleto}
                                </td>
                                <td className="comprador">
                                  <span>Comprador:</span>{" "}
                                  {prosp.comprador.nomeCompleto}
                                </td>
                                <td className="button">
                                  <button
                                    className="button-selecionar"
                                    onClick={() =>
                                      getCodProposta(prosp.codProposta)
                                    }
                                  >
                                    selecionar
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-lg-12 my-3 px-4 d-flex justify-content-between align-items-center ">
                  <button className="button-voltar">
                    <BiLeftArrowAlt fontSize={24} />
                    Voltar para etapa anterior
                  </button>
                  <button
                    className="button-continuar"
                    onClick={() => history.push("/dashboard/proposta-imovel")}
                  >
                    Continuar <BiRightArrowAlt fontSize={24} />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListaPropostas;
