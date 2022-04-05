import { useState, FormEvent, useEffect } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import "../../../styles/cadastroVendedor.scss";
import StepperAnuncioImovel from "../../../components/StepperAnuncioImovel";
import "../../../styles/cadastroAnuncioImovel.scss";
import "../../../styles/anuncioimovel.scss";
import { useHistory } from "react-router-dom";
import api from "../../../services/api";
import Loader from "../../../components/Loader";
import { iDadosUsuario } from "../../../@types";
import Alert from "../../../components/Alert";

interface iConjunto {
  codConjunto: number;
  descConjunto: string;
  codTipoConjunto: number;
  descTipoConjunto: string;
  caracteristicas: iDataSelect[];
}

interface iDataSelect {
  value: number;
  label: string;
  checked: boolean;
}

interface iCaracteristicaCadastro {
  codCaracteristica: number;
  destaque: boolean;
}

export default function DetalhesDoImovel() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [checkedComprarImovel, setCheckedComprarImovel] = useState(false);
  const [conjuntos, setConjuntos] = useState<iConjunto[]>([]);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const [caracteristicasCadastro, setCaracteristicasCadastro] = useState<
    iCaracteristicaCadastro[]
  >([]);
  const [caracteristicasDestaqueCadastro, setCaracteristicasDestaqueCadastro] =
    useState<iCaracteristicaCadastro[]>([]);
  const [caracteristicasPDestaque, setCaracteristicasPDestaque] = useState<
    iDataSelect[]
  >([]);
  const [stateRender, setStateRender] = useState(false);
  const [fezScrolls, setFezScroll] = useState(false);
  const [caracteristicasSelecionadas, setCaracteristicasSelecionadas] =
    useState<number[]>([]);
  const codImovel = Number(localStorage.getItem("@appePlus/codImovel"));
  const tipoImovel = Number(localStorage.getItem("@appePlus/tipoImovel"));
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
    GetCaracteristicaImovel();
    if (!fezScrolls) {
      window.scrollTo(0, 0);
      setFezScroll(!fezScrolls);
    }
    if (conjuntos.length === 0) {
      GetConjuntos();
      GetCaracteristicasSelecionadas();
    }
  }, [stateRender]);

  async function GetCaracteristicaImovel() {
    await api
      .get("/caracteristicas/CaracteristicaImovel/busca-avancada", {
        params: {
          CodImovel: codImovel,
        },
      })
      .then((response) => {
        if (!caracteristicasPDestaque.length) {
          response.data.data.map((caracteristica: any) => {
            let itDt: iDataSelect = {
              value: caracteristica.codCaracteristica,
              label: caracteristica.descCaracteristicas,
              checked: caracteristica.destaque,
            };
            caracteristicasPDestaque.push(itDt);
            if (caracteristica.destaque) {
              let it: iCaracteristicaCadastro = {
                codCaracteristica: Number(caracteristica.value),
                destaque: true,
              };
              caracteristicasDestaqueCadastro.push(it);
            }
          });
        }
        if (!caracteristicasCadastro.length) {
          response.data.data.map((caracteristica: any) => {
            let it: iCaracteristicaCadastro = {
              codCaracteristica: Number(caracteristica.value),
              destaque: true,
            };
            caracteristicasCadastro.push(it);
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
    caracteristicasDestaqueCadastro.map((caracteristica) => {
      caracteristicasCadastro.map((caract) => {
        if (caract.codCaracteristica === caracteristica.codCaracteristica) {
          caract.destaque = caracteristica.destaque;
        }
      });
    });

    if (caracteristicasCadastro.length == 0) {
      setAlertErro(true);
      setMsgErro("Favor informar ao menos um detalhe.");
      window.scrollTo(0, 0);
      return;
    };
    
    api
      .post(
        `caracteristicas/caracteristicasImovel?codImovel=${codImovel}`,
        caracteristicasCadastro
      )
      .then((response) => {
        history.push("/cadastro/imovel/anuncioLaranja/diferenciaisImovel");
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoading(false);
      });
  }

  async function GetCaracteristicasSelecionadas() {
    if (codImovel != 0) {
      api
        .get(
          `/caracteristicas/CaracteristicaImovel/buscar?codImovel=${codImovel}`
        )
        .then((response) => {
          setCaracteristicasSelecionadas(response.data.data);
        })
        .catch((error) => {
          console.log("Ocorreu um erro");
        });
    }
  }

  async function GetConjuntos() {
    setLoading(true);
    await api
      .get(`/caracteristicas/buscar-conjuntos?CodTipoImovel=${tipoImovel}`)
      .then((response) => {
        setConjuntos(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoading(false);
      });
  }

  function handleCheckbox(
    event: any,
    caracteristica: iDataSelect,
    conjunto: iConjunto
  ) {
    if (event.target.checked) {
      let it: iCaracteristicaCadastro = {
        codCaracteristica: Number(caracteristica.value),
        destaque: false,
      };
      caracteristicasCadastro.push(it);
      if (conjunto.descTipoConjunto === "checkbox") {
        let itDt: iDataSelect = {
          value: caracteristica.value,
          label: caracteristica.label,
          checked: false,
        };
        caracteristicasPDestaque.push(itDt);
      }
      setStateRender(!stateRender);
    } else {
      let it: iCaracteristicaCadastro = {
        codCaracteristica: Number(caracteristica.value),
        destaque: false,
      };
      const index = caracteristicasCadastro.indexOf(it);
      caracteristicasCadastro.splice(index, 1);
      if (conjunto.descTipoConjunto === "checkbox") {
        let itDt: iDataSelect = {
          value: caracteristica.value,
          label: caracteristica.label,
          checked: false,
        };
        const indexdt = caracteristicasPDestaque.indexOf(itDt);
        caracteristicasPDestaque.splice(indexdt, 1);
      }
      setStateRender(!stateRender);
    }
  }

  function handleCheckboxDestaque(event: any, caracteristica: iDataSelect) {

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
            <div className="wrapper col-lg-12 mt-1">
              <ol className="c-stepper">
                <li className="c-stepper__item col-lg-12">
                  <div className="c-stepper__content col-lg-11">
                    <h2 className="c-stepper__title">Detalhes do seu imóvel</h2>
                    {alertErro && (
                      <Alert msg={msgErro} setAlertErro={setAlertErro} />
                    )}
                    {conjuntos.map((conjunto: iConjunto, index) => (
                      <div className="col-lg-10 row-gray" key={index}>
                        <div className="row mb-3 col-lg-12 mt-3">
                          <p>
                            <strong>{conjunto.descConjunto}</strong>
                          </p>
                        </div>
                        <div className="row mb-3 col-lg-12">
                          {conjunto.caracteristicas.map(
                            (caracteristica: iDataSelect) => (
                              <div className="col-lg-4 mb-1 inline-block">
                                <input
                                  className="form-check-input me-2"
                                  type={conjunto.descTipoConjunto}
                                  name={conjunto.descConjunto}
                                  value={caracteristica.value}
                                  id="flexRadioDefault2"
                                  onChange={(event) =>
                                    handleCheckbox(
                                      event,
                                      caracteristica,
                                      conjunto
                                    )
                                  }
                                  checked={
                                    caracteristicasSelecionadas.includes(
                                      caracteristica.value
                                    )
                                      ? caracteristicasSelecionadas.includes(
                                        caracteristica.value
                                      )
                                      : caracteristica.checked
                                  }
                                />
                                <p className="form-check-label inline-block ">
                                  {caracteristica.label}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </li>
                <li className="c-stepper__item col-lg-12">
                  <div className="c-stepper__content col-lg-11">
                    <h2 className="c-stepper__title mb-3">
                      Marque os 4 melhores detalhes do imóvel para destacar no
                      anúncio
                    </h2>
                    <div className="col-lg-10">
                      {caracteristicasPDestaque.length > 0
                        ? caracteristicasPDestaque.map(
                          (caracteristica: iDataSelect, index) => (
                            <div
                              className="col-lg-4 mb-1 inline-block"
                              key={index}
                            >
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                // disabled={
                                //   caracteristicasDestaqueCadastro.length >= 4
                                // }
                                name={caracteristica.label}
                                value={caracteristica.value}
                                checked={caracteristica.checked}
                                id="flexRadioDefault2"
                                onChange={(event) => {
                                  if (!(caracteristicasDestaqueCadastro.length >= 4)) {
                                    if (event.target.checked) {
                                      let it: iCaracteristicaCadastro = {
                                        codCaracteristica: Number(caracteristica.value),
                                        destaque: true,
                                      };
                                      caracteristicasDestaqueCadastro.push(it);
                                      caracteristica.checked = true;
                                      setStateRender(!stateRender);
                                    } else {
                                      let it: iCaracteristicaCadastro = {
                                        codCaracteristica: Number(caracteristica.value),
                                        destaque: true,
                                      };
                                      const index = caracteristicasDestaqueCadastro.indexOf(it);
                                      caracteristicasDestaqueCadastro.splice(index, 1);
                                      caracteristica.checked = false;
                                      setStateRender(!stateRender);
                                    }
                                  } else if (event.target.checked) {
                                    caracteristica.checked = false;
                                    alert("Você já selecionou 4 características");
                                    setStateRender(!stateRender);
                                  } else {
                                    let it: iCaracteristicaCadastro = {
                                      codCaracteristica: Number(caracteristica.value),
                                      destaque: true,
                                    };
                                    const index = caracteristicasDestaqueCadastro.indexOf(it);
                                    caracteristicasDestaqueCadastro.splice(index, 1);
                                    caracteristica.checked = false;
                                    setStateRender(!stateRender);
                                  }
                                }
                                }
                              />
                              <p className="form-check-label inline-block ">
                                {caracteristica.label}
                              </p>
                            </div>
                          )
                        )
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
            codImovel={codImovel}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
