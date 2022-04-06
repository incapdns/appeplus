import { FormEvent, useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import "../../../styles/pages/cadastro/interesse/interesse.scss";
import { iDadosUsuario, iDataSelect } from "../../../@types";
import { useHistory } from "react-router-dom";
import api from "../../../services/api";
import { IoChevronForwardOutline } from "react-icons/io5";
import "rc-slider/assets/index.css";
import { StepperCadastroInteresse } from "../../../components/StepperCadastroInteresse";
import { IoMdCheckmark } from "react-icons/io";
import Alert from "../../../components/Alert";

interface iItens {
  codConjunto: number;
  descConjunto: string;
  codTipoConjunto: number;
  descTipoConjunto: string;
  itens: iDataSelect[];
}
interface iInteresse{
  capitalDisponivel: number
  codBairro: number
  codCidade: number
  codCliente: number
  codInteresse: number
  codTipoImovel: number
  codUF: number
  codVeiculoCaptacao: number
  dtIntencaoCompra: string
  qtdeBanheiros: number
  qtdeDormitorios: number
  qtdeSuites: number
  qtdeVagasGaragem: number
}

interface iCaracteristicas {
  codConjunto: number;
  descConjunto: string;
  codTipoConjunto: number;
  descTipoConjunto: string;
  caracteristicas: iDataSelect[];
}

interface iItensSelecionados {
  codItem: number;
  codInteresse?: number;
  codCaracteristica?: number;
  codConjunto?:number;
}

export default function CadastroDetalhes() {
  const history = useHistory();
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const [loading, setLoading] = useState(false);
  const [itens, setItens] = useState<iItens[]>([]);
  const [caracteristicas, setCaracteristicas] = useState<iCaracteristicas[]>(
    []
  );
  let [getInteresseCod, setGetInteresseCod] = useState<iInteresse[]>([])
  let [codInteresse, setCodInteresse] = useState<number>();
  const [itensSelecionados, setItensSelecionados] = useState<
    iItensSelecionados[]
  >([]);
  const [caracteristicasSelecionadas, setCaracteristicasSelecionadas] =
    useState<iItensSelecionados[]>([]);
    const [alertErro, setAlertErro] = useState(false);
    const [msgErro, setMsgErro] = useState("");
    const [salvaItens, setSalvaItens]= useState(false)
    const [salvaCaracteristicas, setSalvaCaracteristicas]= useState(false)
    let [itensGet, setItensGet] = useState<number[]>([]);
    let [caracteristicasGet, setCaracteristicasGet] =
    useState<number[]>([]);
    const [stateRender, setStaterender] = useState(false);


  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  useEffect(() => {
    checaUsuarioLogado();
    // window.scrollTo(0, 0);
    GetItens();
    GetCaracteristicas();
    getInteresse()
    console.log(CodTipoImovel)
  }, []);

  useEffect(() => {

  }, [stateRender]);

  const CodTipoImovel = localStorage.getItem("@appePlus/codTipoImovel") 

  async function getInteresse(){
    await api.get(`interesse-cliente/buscar-interesses-cliente/codCliente?codCliente=${usuario.codCliente}`).then(response =>{
      getInteresseCod = response.data.data;
      setGetInteresseCod(response.data.data);
      GetItensBd();
      GetCaracteristicasBd();
    }).catch(error =>{
      console.log(error)
    })
  }

  async function GetItens() {
    await api
      .get(`item/buscar-conjuntos?CodTipoImovel=${CodTipoImovel}`)
      .then((response) => {
        setItens(response.data.data);
        
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function GetItensBd() {
    await api
      .get(`interesse-cliente/buscar-itens/${getInteresseCod[0].codInteresse}`)
      .then((response) => {
        setItensGet(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function GetCaracteristicasBd() {
    await api
      .get(`interesse-cliente/buscar-caracteristicas/${getInteresseCod[0].codInteresse}`)
      .then((response) => {
        setCaracteristicasGet(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function GetCaracteristicas() {
    await api
      .get(`caracteristicas/buscar-conjuntos?CodTipoImovel=${CodTipoImovel}`)
      .then((response) => {
        setCaracteristicas(response.data.data);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }


  async function salvarItens(){
    
    const  params = itensSelecionados.map((item) => (
      {
        codInteresse: getInteresseCod[0].codInteresse,
        codItem: item.codItem,
        codCliente: usuario.codCliente,
        codConjunto: item.codConjunto
      }
    ))
    console.log("parametro", params)
    await  api.post(`interesse-cliente/salvar-itens`, params ).then(response => {
      if(response.data.success){
        history.push("/");
      }
    }).catch(error =>{
      console.log(error)
    })
  }
  async function salvarCaracteristicas(){
    const  params = caracteristicasSelecionadas.map((caracteristica) => (
        {
          codInteresse: getInteresseCod[0].codInteresse,
          codCaracteristica: caracteristica.codItem,
          codCliente: usuario.codCliente,
          codConjunto: caracteristica.codConjunto
        }
    ))

    console.log("parametro", params)
    await api.post(`interesse-cliente/salvar-caracteristicas`,
      params
    ).then(response => {
      if(response.data.success){
        history.push("/");
      }
    }).catch(error =>{
      console.log(error)
    })
    
  }
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if(itensSelecionados.length !== 0 && caracteristicasSelecionadas.length !== 0){
      salvarItens();
      salvarCaracteristicas();
      
    }else{
      setAlertErro(true)
      setMsgErro('Nos informe pelo menos um detalhe do seu imóvel e uma caracteristica.')
    }
      
  }

  return (
    <>
      <Navbar type="dark" />
      <div className="container" id="interesse">
        <div className="row">
          <div className="col-lg-9">
            <form onSubmit={handleSubmit}>
              <div className="wrapper">
                <ol className="c-stepper">
                  <li className="c-stepper__item">
                    <div className="c-stepper__content">
                      <h2 className="c-stepper__title">
                        Detalhes do seu imóvel
                      </h2>

                      {itens.map((detalhe) => {
                        return (
                          <div className="mb-5" key={detalhe.codConjunto}>
                            <strong>{detalhe.descConjunto}</strong>
                            <div className="row">
                              {detalhe.itens.map((item) => {
                                return (
                                  <div
                                    className={`form-check ${
                                      detalhe.descTipoConjunto === "radio"
                                        ? "col-lg-4"
                                        : "col-lg-6"
                                    }`}
                                    key={item.value}
                                  >
                                    <input
                                      className="form-check-input"
                                      type={detalhe.descTipoConjunto}
                                      value={item.value}
                                      name={String(detalhe.codConjunto)}
                                      id={String(
                                        "i" + detalhe.codConjunto + item.value
                                      )}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setItensSelecionados([
                                            ...itensSelecionados,
                                            {
                                              codItem: item.value
                                                ? item.value
                                                : 0,
                                              codInteresse: getInteresseCod[0].codInteresse,
                                              codConjunto:detalhe.codConjunto
                                            },
                                          ]);
                                          setItensGet([...itensGet, Number(item.value)])
                                          setStaterender(!stateRender);
                                        } else {
                                          let it: iItensSelecionados = {
                                            codItem: Number(item.value),
                                            codInteresse: getInteresseCod[0].codInteresse,
                                            codConjunto:detalhe.codConjunto
                                          };
                                          const index =
                                            itensSelecionados.indexOf(it);
                                          itensSelecionados.splice(index, 1);
                                          const indexget = itensGet.indexOf(Number(item.value));
                                          itensGet.splice(indexget,1);
                                          setStaterender(!stateRender);
                                        }
                                      }}
                                      checked={
                                        itensGet.includes(Number(item.value))
                                          ? itensGet.includes(Number(item.value))
                                          : false
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={String(
                                        "i" + detalhe.codConjunto + item.value
                                      )}
                                    >
                                      {item.label}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </li>

                  <li className="c-stepper__item">
                    <div className="c-stepper__content">
                      <h2 className="c-stepper__title">
                        Características do seu imóvel
                      </h2>

                      {caracteristicas.map((detalhe) => {
                        return (
                          <div className="mb-5" key={detalhe.codConjunto}>
                            <div className="row">
                              <div className="col mb-3">
                                <strong>{detalhe.descConjunto}</strong>
                              </div>
                            </div>

                            <div className="row">
                              {detalhe.caracteristicas.map((item) => {
                                return (
                                  <div
                                    className={`form-check ${
                                      detalhe.descTipoConjunto === "radio"
                                        ? "col-lg-4"
                                        : "col-lg-6"
                                    }`}
                                    key={item.value}
                                  >
                                    <input
                                      className="form-check-input"
                                      type={detalhe.descTipoConjunto}
                                      value={item.value}
                                      name={String(detalhe.codConjunto)}
                                      id={String(
                                        "c" + detalhe.codConjunto + item.value
                                      )}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setCaracteristicasSelecionadas([
                                            ...caracteristicasSelecionadas,
                                            {
                                              codItem: item.value
                                                ? item.value
                                                : 0,
                                              codInteresse: getInteresseCod[0].codInteresse,
                                              codConjunto:detalhe.codConjunto
                                            },
                                          ]);
                                          setCaracteristicasGet([...caracteristicasGet, Number(item.value)])
                                          setStaterender(!stateRender);
                                        } else {
                                          let it: iItensSelecionados = {
                                            codItem: Number(item.value),
                                            codInteresse: 0,
                                          };
                                          const index =
                                            caracteristicasSelecionadas.indexOf(
                                              it
                                            );
                                          caracteristicasSelecionadas.splice(
                                            index,
                                            1
                                          );
                                          const indexget = caracteristicasGet.indexOf(Number(item.value));
                                          caracteristicasGet.splice(indexget,1);
                                          setStaterender(!stateRender);
                                        }
                                      }}
                                      checked={
                                        caracteristicasGet.includes(Number(item.value))
                                          ? caracteristicasGet.includes(Number(item.value))
                                          : false
                                      }
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={String(
                                        "c" + detalhe.codConjunto + item.value
                                      )}
                                    >
                                      {item.label}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </li>
                </ol>
              </div>
            </form>

            <hr />

            <div className="action-button d-flex justify-content-end mb-3">
              <button
                type="submit"
                className="btn btn-success btn-lg"
                disabled={loading}
                onClick={handleSubmit}
              >
                Concluir
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                    style={{ marginLeft: "0.5rem" }}
                  />
                ) : (
                  <IoMdCheckmark />
                )}
              </button>
            </div>
            
                {alertErro && (
                <Alert msg={msgErro} setAlertErro={setAlertErro} />
              )}
          </div>
          <div className="col-lg-3">
            <StepperCadastroInteresse
              tipoImovel
              localPreferencia
              sobreImovel
              escolhaCorretor
            />
          </div>
        </div>
      </div>
      <Footer dark />
    </>
  );
}
