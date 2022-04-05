import { useState, FormEvent, useEffect } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import "../../../styles/cadastroVendedor.scss";
import StepperAnuncioImovel from "../../../components/StepperAnuncioImovel";
import "../../../styles/cadastroAnuncioImovel.scss";
import "../../../styles/anuncioimovel.scss";
import { useHistory } from "react-router-dom";
import api from "../../../services/api";
import { valueTernary } from "react-select/dist/declarations/src/utils";
import Loader from "../../../components/Loader";
import { iDadosUsuario } from "../../../@types";
import Alert from "../../../components/Alert";

interface iConjunto {
  codConjunto: number;
  descConjunto: string;
  codTipoConjunto: number;
  descTipoConjunto: string;
  itens: iDataSelect[];
}

interface iDataSelect {
  value: number;
  label: string;
  checked: boolean;
}

interface iItensCadastro {
  codItem: number;
  destaque: boolean;
}

export default function DiferenciaisDoImovel() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [checkedComprarImovel, setCheckedComprarImovel] = useState(false);
  const [conjuntos, setConjuntos] = useState<iConjunto[]>([]);
  const [itensSelecionados, setItensSelecionados] = useState<number[]>([]);
  const [itensCadastro, setItensCadastro] = useState<iItensCadastro[]>([]);
  const [itensPDestaque, setItensPDestaque] = useState<iDataSelect[]>([]);
  const [itensDestaqueCadastro, setItensDestaqueCadastro] = useState<
    iItensCadastro[]
  >([]);
  const [stateRender, setStateRender] = useState(false);
  const [fezScrolls, setFezScroll] = useState(false);
  const codImovel = Number(localStorage.getItem("@appePlus/codImovel"));
  const tipoImovel = Number(localStorage.getItem("@appePlus/tipoImovel"));
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

  useEffect(() => {
    checaUsuarioLogado();
    GetItensImovel();
    if (!fezScrolls) {
      window.scrollTo(0, 0);
      setFezScroll(!fezScrolls);
    }
    if (conjuntos.length == 0) {
      GetConjuntos();
      GetItensSelecionados();
    }
  }, [stateRender]);

  async function GetItensImovel() {
    await api
      .get("item/itensImovel/busca-avancada", {
        params: {
          CodImovel: codImovel,
        },
      })
      .then((response) => {
        if (!itensPDestaque.length) {
          response.data.data.map((item: any) => {
            let itDt: iDataSelect = {
              value: item.codItem,
              label: item.descItem,
              checked: item.destaque,
            };
            itensPDestaque.push(itDt);
            if (item.destaque) {
              let it: iItensCadastro = {
                codItem: Number(item.value),
                destaque: false,
              };
              itensDestaqueCadastro.push(it);
            }

          });
        }
        if (!itensCadastro.length) {
          response.data.data.map((item: any) => {
            let it: iItensCadastro = {
              codItem: Number(item.value),
              destaque: false,
            };
            itensCadastro.push(it);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    itensDestaqueCadastro.map((item) => {
      itensCadastro.map((it) => {
        if (it.codItem == item.codItem) {
          it.destaque = item.destaque;
        }
      });
    });

    if (itensCadastro.length == 0) {
      setAlertErro(true);
      setMsgErro("Favor informar ao menos um diferencial.");
      window.scrollTo(0, 0);
      return;
    };
    
    api
      .post(`item/itensImovel?codImovel=${codImovel}`, itensCadastro)
      .then((response) => {
        history.push("/cadastro/imovel/anuncioBlack/pesquisa");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Ocorreu um erro");
      });
  }

  async function GetItensSelecionados() {
    if (codImovel != 0) {
      api
        .get(`/item/itensImovel/buscar?codImovel=${codImovel}`)
        .then((response) => {
          setItensSelecionados(response.data.data);
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
        });
    }
  }

  async function GetConjuntos() {
    setLoading(true);
    await api
      .get(`/item/buscar-conjuntos?CodTipoImovel=${tipoImovel}`)
      .then((response) => {
        setConjuntos(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoading(false);
      });
  }

  return (
    <>
      <Navbar type="dark" />
      <div className="container col-lg-12 mt-5 mb-5">
        {loading ? (
          <div id="loading" className="divLoad">
            <Loader />
          </div>
        ) : (
          <form className="row g-3 col-lg-12 mt-5">
            <div className="wrapper col-lg-12 mt-5">
              <ol className="c-stepper">
                <li className="c-stepper__item col-lg-12">
                  <div className="c-stepper__content col-lg-11">
                    <h2 className="c-stepper__title">
                      Diferenciais do seu imóvel
                    </h2>
                    {alertErro && (
                      <Alert msg={msgErro} setAlertErro={setAlertErro} />
                    )}
                    {conjuntos.map((conjunto: iConjunto) => (
                      <div className="col-lg-10 row-gray">
                        <div className="row mb-3 col-lg-12 mt-3">
                          <p>
                            <strong>{conjunto.descConjunto}</strong>
                          </p>
                        </div>
                        <div className="row mb-3 col-lg-12">
                          {conjunto.itens.map((item: iDataSelect) => (
                            <div className="col-lg-4 mb-1 inline-block">
                              <input
                                className="form-check-input me-2"
                                type={conjunto.descTipoConjunto}
                                name={conjunto.descConjunto}
                                value={item.value}
                                id="flexRadioDefault2"
                                onChange={(event) => {
                                  if (event.target.checked) {
                                    let it: iItensCadastro = {
                                      codItem: Number(item.value),
                                      destaque: false,
                                    };
                                    itensCadastro.push(it);
                                    if (
                                      conjunto.descTipoConjunto === "checkbox"
                                    ) {
                                      let itDt: iDataSelect = {
                                        value: item.value,
                                        label: item.label,
                                        checked: false,
                                      };
                                      itensPDestaque.push(itDt);
                                    }
                                    setStateRender(!stateRender);
                                  } else {
                                    let it: iItensCadastro = {
                                      codItem: Number(item.value),
                                      destaque: false,
                                    };
                                    const index = itensCadastro.indexOf(it);
                                    itensCadastro.splice(index, 1);
                                    if (
                                      conjunto.descTipoConjunto === "checkbox"
                                    ) {
                                      let itDt: iDataSelect = {
                                        value: item.value,
                                        label: item.label,
                                        checked: false,
                                      };
                                      const indexdt =
                                        itensPDestaque.indexOf(itDt);
                                      itensPDestaque.splice(index, 1);
                                    }
                                    setStateRender(!stateRender);
                                  }
                                }}
                                checked={
                                  itensSelecionados.includes(item.value)
                                    ? itensSelecionados.includes(item.value)
                                    : item.checked
                                }
                              />
                              <p className="form-check-label inline-block ">
                                {item.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </li>
                <li className="c-stepper__item col-lg-12">
                  <div className="c-stepper__content col-lg-11">
                    <h2 className="c-stepper__title mb-3">
                      Marque os 4 melhores diferenciais do imóvel para destacar
                      no anúncio.
                    </h2>
                    <div className="col-lg-10">
                      {itensPDestaque.length > 0
                        ? itensPDestaque.map((item: iDataSelect, index) => (
                          <div
                            className="col-lg-4 mb-1 inline-block"
                            key={index}
                          >
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              // disabled={itensDestaqueCadastro.length >= 4}
                              name={item.label}
                              value={item.value}
                              checked={item.checked}
                              id="flexRadioDefault2"
                              onChange={(event) => {
                                if (!(itensDestaqueCadastro.length >= 4)) {
                                  if (event.target.checked) {
                                    let it: iItensCadastro = {
                                      codItem: Number(item.value),
                                      destaque: true,
                                    };
                                    itensDestaqueCadastro.push(it);
                                    item.checked = true;
                                    setStateRender(!stateRender);
                                  } else {
                                    let it: iItensCadastro = {
                                      codItem: Number(item.value),
                                      destaque: true,
                                    };
                                    const index =
                                      itensDestaqueCadastro.indexOf(it);
                                    itensDestaqueCadastro.splice(index, 1);
                                    item.checked = false;
                                    setStateRender(!stateRender);
                                  }
                                } else if (event.target.checked) {
                                  item.checked = false;
                                  alert("Você já selecionou 4 itens");
                                  setStateRender(!stateRender);
                                } else {
                                  let it: iItensCadastro = {
                                    codItem: Number(item.value),
                                    destaque: true,
                                  };
                                  const index =
                                    itensDestaqueCadastro.indexOf(it);
                                  itensDestaqueCadastro.splice(index, 1);
                                  item.checked = false;
                                  setStateRender(!stateRender);
                                }
                              }}
                            />
                            <p className="form-check-label inline-block ">
                              {item.label}
                            </p>
                          </div>
                        ))
                        : ""}
                    </div>
                  </div>
                </li>
              </ol>
            </div>

            <div className="col-lg-10 mt-0 pt-4 row-gray text-end">
              <button className="buttonSalvar" onClick={handleSubmit}>
                Salvar e continuar
              </button>
            </div>
          </form>
        )}
        <div className="div-card-stepper-contain col-lg-3">
          <StepperAnuncioImovel
            Localizacao={true}
            Sobre={true}
            Imagens={true}
            Corretor={true}
            Documento={true}
            Diferenciais={true}
            codImovel={codImovel}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
