import { FormEvent, useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { FaSlidersH, FaAngleRight, FaArrowLeft } from "react-icons/fa";
import ProgressoLateralComprador from "../../../components/Cards/ProgressoLateralComprador";
import api from "../../../services/api";
import { iDadosUsuario, iDataSelect } from "../../../@types";
import SelecaoCorretor from "../../../components/Cards/SelecaoCorretor";
import "../../../styles/pages/cadastro/comprador/escolhaCorretor.scss";
import { StepperCadastroInteresse } from "../../../components/StepperCadastroInteresse";
import { useHistory } from "react-router-dom";
import Alert from "../../../components/Alert";

export interface iCorretor {
  codCorretor: number;
  codUsuario: number;
  nomeCompleto: string;
  numeroCreci: string;
  dtCadastro?: string;
  pontuacaoAtual?: number;
  mediaAvaliacao: number;
  img: string[];
  selecionado: boolean;
  nomeSocial: string;
  imoveisNoAppePlus?: number;
}


export default function EscolhaCorretor() {
  const history = useHistory();
  const [nome, setNome] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("Belo Horizonte");
  const [cidades, setCidades] = useState<iDataSelect[]>([]);
  const [corretores, setCorretores] = useState<iCorretor[]>([]);
  let [corretorSelecionado, setCorretorSelecionado] = useState(0);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );

  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  const filter = corretores.filter((corretor) => {
    return corretor?.nomeSocial
      ?.toString()
      .toLowerCase()
      .includes(nome.toString().toLowerCase());
  });

  useEffect(() => {
    checaUsuarioLogado();
    GetCidades();
    buscaCorretores();
  }, [cidadeSelecionada]);

  async function GetCidades() {
    await api
      .get("cidade/buscar/autoComplete")
      .then((response) => {
        setCidades(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function buscaCorretores() {
    await api
      .get(
        `Corretor/top-corretores?DescCidade=${cidadeSelecionada}&QtdePagina=6&Pagina=1`
      )
      .then((Response) => {
        setCorretores(Response.data.data);
      });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    if(corretorSelecionado == 0){
      setAlertErro(true)
      setMsgErro('Você precisa selecionar um corretor.')
    }else{
      api.post(`prospeccao/cadastrar-prospeccao?codUsuarioCliente=${usuario.codUsuario}&codUsuario=${usuario.codUsuario}`, {
        codCorretorCompra: corretorSelecionado
      }).then(response => {
        console.log(response.data.data)
        history.push("/cadastro/interesse/detalhes");
      }).catch(error =>{
        console.log(error)
      })
    }
    
    
  }

  return (
    <>
      <Navbar type="dark" />
      <div className="container mb-5" id="escolha-corretor">
        <div className="row">
          <div className="col-lg-9 ">
            <div className="my-5">
              <h2>Escolha seu corretor</h2>
            </div>
            <div className="d-flex mb-3">
              <div className="col-lg-11 col-md-11 col-9 mb-1">
                <input
                  type="text"
                  className="form-control"
                  value={nome}
                  onChange={(event) => {
                    setNome(event.target.value);
                  }}
                  placeholder="Nome do corretor..."
                />
              </div>
              <div
                className="mb-1"
                style={{
                  backgroundColor: "#ADADAD",
                  borderRadius: 5,
                  height: 38,
                }}
              >
                <FaSlidersH style={{ marginInline: 20, marginTop: 10 }} />
              </div>
            </div>
            <div className="mb-4">
              <span>Mostrando resultados para</span>
              <select
                className="form-select-title"
                style={{ fontSize: 16 }}
                value={cidadeSelecionada}
                onChange={({ target }) => setCidadeSelecionada(target.value)}
              >
                {cidades.map((city) => (
                  <option
                    key={city.value}
                    style={{ fontSize: 16 }}
                    value={city.label}
                  >
                    {city.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-lg-12 mb-3">
              {filter ? (
                filter.length > 0 ? (
                  <div className="row mb-3 div-scroll col-lg-12">
                    {filter.map((corretor: iCorretor) => (
                      <div
                        className="col-lg-6 mb-1"
                        onClick={() => {
                          setCorretorSelecionado(corretor.codCorretor);
                        }}
                      >
                        <SelecaoCorretor
                          img={corretor.img[0]}
                          nomeSocial={corretor.nomeSocial}
                          numeroCreci={corretor.numeroCreci}
                          mediaAvaliacao={corretor.mediaAvaliacao}
                          pontuacaoAtual={corretor.pontuacaoAtual}
                          dtCadastro={corretor.dtCadastro}
                          codCorretor={corretor.codCorretor}
                          imoveisNoAppePlus={corretor.imoveisNoAppePlus}
                          selecionado={corretorSelecionado == corretor.codCorretor}
                        ></SelecaoCorretor>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>

            <div className="botoes">
              <div className="col-lg-6 mt-0 pt-4 row-gray text-lg-start text-center">
                <button className="buttonBack" onClick={()=> history.push('/cadastro/interesse')}>
                  <FaArrowLeft size={18} style={{ marginRight: 5 }} /> Voltar
                </button>
              </div>
              <div className="col-lg-6 mt-0 pt-4 text-lg-end text-center">
                <button className="buttonSalvar" onClick={handleSubmit}>
                  Salvar preferências e continuar{" "}
                  <FaAngleRight size={18} style={{ marginLeft: 5 }} />
                </button>
              </div>
            </div>
            {alertErro && (
                <Alert msg={msgErro} setAlertErro={setAlertErro} />
              )}
          </div>
          <div className="col-lg-3 mt-5 card-progresso">
            {/* <ProgressoLateralComprador /> */}
            <StepperCadastroInteresse tipoImovel localPreferencia sobreImovel />
          </div>
        </div>
      </div>
      <Footer dark />
    </>
  );
}
