import { FormEvent, useEffect, useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { MdApartment, MdPark } from "react-icons/md";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import Select from "react-select";
import "../../../styles/pages/cadastro/interesse/interesse.scss";
import { iDadosUsuario, iDataSelect } from "../../../@types";
import makeAnimated from "react-select/animated";
import customTheme from "../../../themes/ReactSelect";
import { useHistory } from "react-router-dom";
import api from "../../../services/api";
import { IoChevronForwardOutline } from "react-icons/io5";
// import Slider, { SliderTooltip } from "rc-slider";
import Slider from "@mui/material/Slider";
import "rc-slider/assets/index.css";
import { areaComPonto, moeda } from "../../../utils/Masks";
import { StepperCadastroInteresse } from "../../../components/StepperCadastroInteresse";
import Alert from "../../../components/Alert";
import React from "react";


// const { Handle } = Slider;

// const handle = (props: any) => {
//   const { value, dragging, index, ...restProps } = props;
//   return (
//     <SliderTooltip
//       prefixCls="rc-slider-tooltip"
//       overlay={`${areaComPonto(String(value))} m²`}
//       visible={dragging}
//       placement="top"
//       key={index}
//     >
//       <Handle value={value} {...restProps} />
//     </SliderTooltip>
//   );
// };

export function CadastroInteresse() {
  const history = useHistory();
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const codCorretor = Number(localStorage.getItem("@appePlus/codCorretor"));
  const [loading, setLoading] = useState(false);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");

  // Geral
  const [finalidade, setFinalidade] = useState(1);
  const [loadingTipos, setLoadingTipos] = useState(false);
  const [tipos, setTipos] = useState<iDataSelect[]>([]);
  const [tiposSelecionado, setTiposSelecionado] = useState<iDataSelect[]>([]);
  const [tiposSelecao, setTiposSelecao] = useState('');
  // Cidades
  const [numeroCidades, setNumeroCidades] = useState(1);
  const [loadingCidades, setLoadingCidades] = useState(false);
  const [cidades, setCidades] = useState<iDataSelect[]>([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState({} as iDataSelect);
  const [cidades2, setCidades2] = useState<iDataSelect[]>([]);
  const [cidadeSelecionada2, setCidadeSelecionada2] = useState(
    {} as iDataSelect
  );
  const [cidades3, setCidades3] = useState<iDataSelect[]>([]);
  const [cidadeSelecionada3, setCidadeSelecionada3] = useState(
    {} as iDataSelect
  );
  // Bairros
  const [loadingBairros, setLoadingBairros] = useState(false);
  const [bairros, setBairros] = useState<iDataSelect[]>([]);
  const [bairroSelecionado, setBairroSelecionado] = useState<iDataSelect[]>([]);
  const [bairros2, setBairros2] = useState<iDataSelect[]>([]);
  const [bairroSelecionado2, setBairroSelecionado2] = useState<iDataSelect[]>(
    []
  );
  const [bairros3, setBairros3] = useState<iDataSelect[]>([]);
  const [bairroSelecionado3, setBairroSelecionado3] = useState<iDataSelect[]>(
    []
  );
  // Para Morar
  const [suites, setSuites] = useState(0);
  const [quartos, setQuartos] = useState(0);
  const [banheiros, setBanheiros] = useState(0);
  const [vagas, setVagas] = useState(0);
  // Para Trabalhar
  const [area, setArea] = useState(0);
  const [loadingtela, setLoadingtela] = useState(false);
  const [valores, setValores] = React.useState<number[]>([100000, 5000000]);

  function valuetext(value: number) {
    return `R$ ${moeda(value)}`;
  }

  const codVeiculoCaptacao = Number(localStorage.getItem(
    "@appePlus/codVeiculoCaptacao"
  ))

  const codCliente = usuario?.codCliente;

  // localStorage.setItem('@appePlus/codVeiculoCaptacao', comoConheceu);
  //       localStorage.setItem('@appePlus/valorMin', valorMin);
  //       localStorage.setItem('@appePlus/valorMax', valorMax);

  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  useEffect(() => {
    checaUsuarioLogado();
    window.scrollTo(0, 0);
    GetInteresse();
    GetTipos(String(finalidade));
    GetCidades();
  }, []);

  function SetAreaImovel(value: any) {
    setArea(value);
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValores(newValue as number[]);
  };

  const handleChangeArea = (event: Event, newValue: number | number[]) => {
    setArea(newValue as number);
  };

  const ParamsParaMorar = {
    qtdeDormitorios: quartos,
    qtdeSuites: suites,
    qtdeBanheiros: banheiros,
    qtdeVagasGaragem: vagas,
  };

  const ParamsParaTrabalhar = {
    qtdeBanheiros: banheiros,
    qtdeVagasGaragem: vagas,
  };

  const Params = {
    tipoImovel: [Number(tiposSelecao)],
    ...(finalidade === 1 ? ParamsParaMorar : ParamsParaTrabalhar),
    codCliente,
    codVeiculoCaptacao,
    capitalDisponivel: valores[0],
    capitalDisponivelMax: valores[1],
    area,
    localidades: [
      {
        codCidade: cidadeSelecionada.value,
        codBairro: bairroSelecionado.map((b) => b.value),
      },
      {
        codCidade: cidadeSelecionada2.value,
        codBairro: bairroSelecionado2.map((b) => b.value),
      },
      {
        codCidade: cidadeSelecionada3.value,
        codBairro: bairroSelecionado3.map((b) => b.value),
      },
    ],
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log("🚀 ~ file ~ line 153 ~ index.tsx ~ comprador ~ params", Params)

    if (finalidade == 1) {
      if (tiposSelecao == '' || cidadeSelecionada.value == undefined || bairroSelecionado.length == 0 ||
        suites == 0 || banheiros == 0 || quartos == 0 || vagas == 0
      ) {
        setAlertErro(true);
        setMsgErro(
          "É necessário o preenchimento de todos os campos."
        );

      } else {

        setLoading(true);
        const tipo = tiposSelecao;
        const tipoImovel = String(tipo)
        localStorage.setItem("@appePlus/codTipoImovel", tipoImovel);

        api
          .post("interesse-cliente/salvar-interesses", Params)
          .then((response) => {
            setLoading(false);
            // history.push('/cadastro/interesse/detalhes');
            history.push("/cadastro/cliente/escolhaCorretor");
          })
          .catch((error) => {
            console.log("Ocorreu um erro");
            setLoading(false);

          });
      }
    }
    if (finalidade == 2) {
      if (tiposSelecao == '' || cidadeSelecionada.value == undefined || bairroSelecionado.length == 0 ||
        banheiros == 0 || vagas == 0 || area == 0
      ) {
        setAlertErro(true);
        setMsgErro(
          "É necessário o preenchimento de todos os campos."
        );

      } else {

        setLoading(true);
        const tipo = tiposSelecao;
        const tipoImovel = String(tipo)
        localStorage.setItem("@appePlus/codTipoImovel", tipoImovel);

        api
          .post("interesse-cliente/salvar-interesses", Params)
          .then((response) => {
            setLoading(false);
            // history.push('/cadastro/interesse/detalhes');
            history.push("/cadastro/cliente/escolhaCorretor");
          })
          .catch((error) => {
            console.log("Ocorreu um erro");
            setLoading(false);

          });
      }
    }
    if (finalidade == 3) {
      if (tiposSelecao == '' || cidadeSelecionada.value == undefined || bairroSelecionado.length == 0
      ) {
        setAlertErro(true);
        setMsgErro(
          "É necessário o preenchimento de todos os campos."
        );

      } else {
        setLoading(true);
        const tipo = tiposSelecao;
        const tipoImovel = String(tipo)
        localStorage.setItem("@appePlus/codTipoImovel", tipoImovel);


        api
          .post("interesse-cliente/salvar-interesses", Params)
          .then((response) => {
            setLoading(false);
            // history.push('/cadastro/interesse/detalhes');
            history.push("/cadastro/cliente/escolhaCorretor");
          })
          .catch((error) => {
            console.log("Ocorreu um erro");
            setLoading(false);

          });
      }
    }


  }

  async function GetTipos(finalidade: string) {
    setLoadingTipos(true);
    await api
      .get(
        `Finalidade-Tipo-Imovel/buscar/autoComplete?codFinalidade=${finalidade}`
      )
      .then((response) => {
        setTipos(response.data.data);
        setLoadingTipos(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoadingTipos(false);
      });
  }

  async function GetInteresse() {
    setLoadingtela(true);
    await api
      .get(
        `interesse-cliente/buscar-interesse/${usuario.codCliente}`
      )
      .then((response) => {
        console.log(response.data.data);
        setQuartos(Number(response.data.data.qtdeDormitorios));
        setSuites(Number(response.data.data.qtdeSuites));
        setBanheiros(Number(response.data.data.qtdeBanheiros));
        setVagas(Number(response.data.data.qtdeVagasGaragem));
        setArea(Number(response.data.data.area));
        setFinalidade(Number(response.data.data.codFinalidade));
        GetTipos(response.data.data.codFinalidade);
        setTiposSelecao(String(response.data.data.codTipoImovel));
        setValores([Number(response.data.data.capitalDisponivel), Number(response.data.data.capitalDisponivelMax)])
        let count = 0;
        response.data.data.localidades.map((localidade: any) => {
          switch (count) {
            case 0: {
              setCidadeSelecionada(localidade.cidade);
              setBairroSelecionado(localidade.bairros);
              break;
            }
            case 1: {
              setCidadeSelecionada2(localidade.cidade);
              setBairroSelecionado2(localidade.bairros);
              break;
            }
            case 2: {
              setCidadeSelecionada3(localidade.cidade);
              setBairroSelecionado3(localidade.bairros);
              break;
            }
          }
          count++;
        });
        setNumeroCidades(count);
        setLoadingtela(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoadingtela(false);
      });
  }

  async function GetCidades() {
    setLoadingCidades(true);
    await api
      .get("cidade/buscar/autoComplete")
      .then((response) => {
        setCidades(response.data.data);
        setLoadingCidades(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoadingCidades(false);
      });
  }

  async function GetBairros(cidade: any, index: number) {
    setLoadingBairros(true);

    await api
      .get(`bairro/buscar/autoComplete/${cidade.value}`)
      .then((response) => {
        index === 0 && setBairros(response.data.data);
        index === 1 && setBairros2(response.data.data);
        index === 2 && setBairros3(response.data.data);
        setLoadingBairros(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoadingBairros(false);
      });
  }

  const animatedComponents = makeAnimated();
  const areaMin = 10;
  const areaMax = 10000;

  return (
    <>
      <Navbar type="dark" />
      {loadingtela ? ('') : (
        <div className="container" id="interesse">
          <div className="row">
            <div className="col-lg-9">
              <form onSubmit={handleSubmit}>
                <div className="wrapper">
                  <ol className="c-stepper">
                    <li className="c-stepper__item">
                      <div className="c-stepper__content">
                        <h2 className="c-stepper__title">Tipo de imóvel</h2>

                        <div className="mb-5">
                          <p>
                            Escolha o tipo de imóvel que procura:<span>*</span>
                          </p>
                          {/* Não tem endpoint para essa informação ainda */}

                          <div className="btn-especialidades">
                            <button
                              className={`btn ${finalidade === 1 ? "active" : ""
                                }`}
                              onClick={() => {
                                setFinalidade(1);
                                GetTipos(String(1));
                                setTiposSelecao('');
                              }}
                              type="button"
                            >
                              <BiHomeAlt size={48} />
                              Para morar
                            </button>
                            <button
                              className={`btn ${finalidade === 2 ? "active" : ""
                                }`}
                              onClick={() => {
                                setFinalidade(2);
                                GetTipos(String(2));
                                setTiposSelecao('');
                              }}
                              type="button"
                            >
                              <MdApartment size={48} />
                              Para trabalhar
                            </button>
                            <button
                              className={`btn ${finalidade === 3 ? "active" : ""
                                }`}
                              onClick={() => {
                                setFinalidade(3);
                                GetTipos(String(3));
                                setTiposSelecao('');
                              }}
                              type="button"
                            >
                              <MdPark size={48} />
                              Para construir
                            </button>
                          </div>
                        </div>
                        {tipos.length ? (
                          <div style={{ maxWidth: 700 }}>
                            <p>
                              Tipo de imóvel<span>*</span>
                            </p>
                            <div className="form-group">
                              <select className="form-control select-tipos" value={tiposSelecao} onChange={({ target }) => setTiposSelecao(target.value)}>
                                <option value="" disabled>Selecione</option>
                                {tipos.map((tipo) => (
                                  <option value={tipo.value}>{tipo.label}</option>
                                ))}
                              </select>
                            </div>
                            {/* <Select
                            classNamePrefix="select-multi"
                            options={tipos}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            placeholder="Escolha um ou mais tipos de imóveis"
                            noOptionsMessage={() =>
                              "Nenhum tipo de imóvel encontrado"
                            }
                            theme={customTheme}
                            isLoading={loadingTipos}
                            
                            onChange={(value: any) => {
                              setTiposSelecioado(value);
                            }}
                          /> */}
                          </div>
                        ) : null}
                        <div className="mt-5 col-lg-9 valores-slider">
                          <p style={{ marginBottom: 45 }}>
                            Qual valor deseja investir na compra do imóvel?
                            <span style={{ color: "#FF715B" }}>*</span>
                          </p>
                          <div className="mx-5 valor">
                            <Slider
                              getAriaLabel={() => "Price range"}
                              value={valores}
                              onChange={handleChange}
                              min={100000}
                              max={5000000}
                              valueLabelDisplay="auto"
                              valueLabelFormat={valuetext}
                              step={5000}
                            />
                            <div className="d-flex justify-content-between">
                              <span>R$ {moeda(valores[0])}</span>
                              <span>R$ {moeda(valores[1])}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </li>

                    <li className="c-stepper__item">
                      <div className="c-stepper__content">
                        <h2 className="c-stepper__title">Local de preferência</h2>

                        {Array.from({ length: numeroCidades }).map((_, index) => (
                          <div
                            className="card mb-3"
                            style={{ maxWidth: 720 }}
                            key={index}
                          >
                            <div className="card-body">
                              <div className="mb-3">
                                <label
                                  htmlFor="inputCidade"
                                  className="form-label label-nome"
                                >
                                  Informe as cidades que deseja procurar
                                  <span>*</span>
                                </label>
                                <Select
                                  options={cidades}
                                  components={animatedComponents}
                                  value={index === 0 ? cidadeSelecionada : index === 1 ? cidadeSelecionada2 : index === 2 ? cidadeSelecionada3 : cidadeSelecionada}
                                  placeholder="Escolha uma cidade"
                                  noOptionsMessage={() =>
                                    "Nenhuma cidade encontrada"
                                  }
                                  theme={customTheme}
                                  isLoading={loadingCidades}
                                  onChange={(value: any) => {
                                    index === 0 && setCidadeSelecionada(value);
                                    index === 1 && setCidadeSelecionada2(value);
                                    index === 2 && setCidadeSelecionada3(value);
                                    GetBairros(value, index);
                                  }}
                                />
                              </div>

                              <div className="mb-3">
                                <p>
                                  Quais regiões ou bairros prioritários de atuação?
                                  <span>*</span>
                                </p>
                                <Select
                                  classNamePrefix="select-multi"
                                  options={
                                    index === 0
                                      ? bairros
                                      : index === 1
                                        ? bairros2
                                        : bairros3
                                  }
                                  closeMenuOnSelect={false}
                                  components={animatedComponents}
                                  isMulti
                                  placeholder="Escolha um ou mais bairros de atuação"
                                  noOptionsMessage={() =>
                                    "Nenhum bairro encontrado"
                                  }
                                  theme={customTheme}
                                  value={index === 0 ? bairroSelecionado : index === 1 ? bairroSelecionado2 : index === 2 ? bairroSelecionado3 : bairroSelecionado}
                                  onChange={(value: any) => {
                                    index === 0 && setBairroSelecionado(value);
                                    index === 1 && setBairroSelecionado2(value);
                                    index === 2 && setBairroSelecionado3(value);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                        {numeroCidades < 3 && (
                          <button
                            type="button"
                            className="btn btn-primary mb-4"
                            onClick={() => {
                              setNumeroCidades(numeroCidades + 1);
                            }}
                          >
                            Adicionar mais cidade
                          </button>
                        )}
                      </div>
                    </li>
                    {/* Para morar */}
                    {finalidade === 1 && (
                      <li className="c-stepper__item">
                        <div className="c-stepper__content">
                          <h2 className="c-stepper__title">Características básicas do imóvel procurado</h2>

                          <div className="row options mt-4">
                            <div className="col label">
                              <p>
                                Número de Suítes<span>*</span>
                              </p>
                            </div>
                            <div className="col buttons">
                              <button
                                type="button"
                                onClick={() => setSuites(1)}
                                className={`btn ${suites === 1 && "active"}`}
                              >
                                1
                              </button>
                              <button
                                type="button"
                                onClick={() => setSuites(2)}
                                className={`btn ${suites === 2 && "active"}`}
                              >
                                2
                              </button>
                              <button
                                type="button"
                                onClick={() => setSuites(3)}
                                className={`btn ${suites === 3 && "active"}`}
                              >
                                3
                              </button>
                              <button
                                type="button"
                                onClick={() => setSuites(4)}
                                className={`btn ${suites === 4 && "active"}`}
                              >
                                4
                              </button>
                              <button
                                type="button"
                                onClick={() => setSuites(5)}
                                className={`btn ${suites === 5 && "active"}`}
                              >
                                +5
                              </button>
                            </div>
                          </div>
                          <div className="row options">
                            <div className="col label">
                              <p>
                                Número de Quartos<span>*</span>
                              </p>
                            </div>
                            <div className="col buttons">
                              <button
                                type="button"
                                onClick={() => setQuartos(1)}
                                className={`btn ${quartos === 1 && "active"}`}
                              >
                                1
                              </button>
                              <button
                                type="button"
                                onClick={() => setQuartos(2)}
                                className={`btn ${quartos === 2 && "active"}`}
                              >
                                2
                              </button>
                              <button
                                type="button"
                                onClick={() => setQuartos(3)}
                                className={`btn ${quartos === 3 && "active"}`}
                              >
                                3
                              </button>
                              <button
                                type="button"
                                onClick={() => setQuartos(4)}
                                className={`btn ${quartos === 4 && "active"}`}
                              >
                                4
                              </button>
                              <button
                                type="button"
                                onClick={() => setQuartos(5)}
                                className={`btn ${quartos === 5 && "active"}`}
                              >
                                +5
                              </button>
                            </div>
                          </div>
                          <div className="row options">
                            <div className="col label">
                              <p>
                                Número de Banheiros<span>*</span>
                              </p>
                            </div>
                            <div className="col buttons">
                              <button
                                type="button"
                                onClick={() => setBanheiros(1)}
                                className={`btn ${banheiros === 1 && "active"}`}
                              >
                                1
                              </button>
                              <button
                                type="button"
                                onClick={() => setBanheiros(2)}
                                className={`btn ${banheiros === 2 && "active"}`}
                              >
                                2
                              </button>
                              <button
                                type="button"
                                onClick={() => setBanheiros(3)}
                                className={`btn ${banheiros === 3 && "active"}`}
                              >
                                3
                              </button>
                              <button
                                type="button"
                                onClick={() => setBanheiros(4)}
                                className={`btn ${banheiros === 4 && "active"}`}
                              >
                                4
                              </button>
                              <button
                                type="button"
                                onClick={() => setBanheiros(5)}
                                className={`btn ${banheiros === 5 && "active"}`}
                              >
                                +5
                              </button>
                            </div>
                          </div>
                          <div className="row options">
                            <div className="col label">
                              <p>
                                Número de vagas<span>*</span>
                              </p>
                            </div>
                            <div className="col buttons">
                              <button
                                type="button"
                                onClick={() => setVagas(1)}
                                className={`btn ${vagas === 1 && "active"}`}
                              >
                                1
                              </button>
                              <button
                                type="button"
                                onClick={() => setVagas(2)}
                                className={`btn ${vagas === 2 && "active"}`}
                              >
                                2
                              </button>
                              <button
                                type="button"
                                onClick={() => setVagas(3)}
                                className={`btn ${vagas === 3 && "active"}`}
                              >
                                3
                              </button>
                              <button
                                type="button"
                                onClick={() => setVagas(4)}
                                className={`btn ${vagas === 4 && "active"}`}
                              >
                                4
                              </button>
                              <button
                                type="button"
                                onClick={() => setVagas(5)}
                                className={`btn ${vagas === 5 && "active"}`}
                              >
                                +5
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                    {/* Para trabalhar */}
                    {finalidade === 2 && (
                      <li className="c-stepper__item">
                        <div className="c-stepper__content">
                          <h2 className="c-stepper__title">Características básicas do imóvel procurado</h2>

                          <div className="row options">
                            <div className="col label">
                              <p>
                                Número de Banheiros<span>*</span>
                              </p>
                            </div>
                            <div className="col buttons">
                              <button
                                type="button"
                                onClick={() => setBanheiros(1)}
                                className={`btn ${banheiros === 1 && "active"}`}
                              >
                                1
                              </button>
                              <button
                                type="button"
                                onClick={() => setBanheiros(2)}
                                className={`btn ${banheiros === 2 && "active"}`}
                              >
                                2
                              </button>
                              <button
                                type="button"
                                onClick={() => setBanheiros(3)}
                                className={`btn ${banheiros === 3 && "active"}`}
                              >
                                3
                              </button>
                              <button
                                type="button"
                                onClick={() => setBanheiros(4)}
                                className={`btn ${banheiros === 4 && "active"}`}
                              >
                                4
                              </button>
                              <button
                                type="button"
                                onClick={() => setBanheiros(5)}
                                className={`btn ${banheiros === 5 && "active"}`}
                              >
                                +5
                              </button>
                            </div>
                          </div>
                          <div className="row options">
                            <div className="col label">
                              <p>
                                Número de vagas<span>*</span>
                              </p>
                            </div>
                            <div className="col buttons">
                              <button
                                type="button"
                                onClick={() => setVagas(1)}
                                className={`btn ${vagas === 1 && "active"}`}
                              >
                                1
                              </button>
                              <button
                                type="button"
                                onClick={() => setVagas(2)}
                                className={`btn ${vagas === 2 && "active"}`}
                              >
                                2
                              </button>
                              <button
                                type="button"
                                onClick={() => setVagas(3)}
                                className={`btn ${vagas === 3 && "active"}`}
                              >
                                3
                              </button>
                              <button
                                type="button"
                                onClick={() => setVagas(4)}
                                className={`btn ${vagas === 4 && "active"}`}
                              >
                                4
                              </button>
                              <button
                                type="button"
                                onClick={() => setVagas(5)}
                                className={`btn ${vagas === 5 && "active"}`}
                              >
                                +5
                              </button>
                            </div>
                          </div>

                        </div>
                      </li>
                    )}
                    <li className="c-stepper__item">
                      <div className="c-stepper__content">
                        <h2 className="c-stepper__title">Área (m²)</h2>
                        <div className="col-lg-12 valores-slider">
                          <div className="mx-3 mt-5 valor">
                            <Slider
                              getAriaLabel={() => "Area range"}
                              value={area}
                              onChange={handleChangeArea}
                              min={areaMin}
                              max={areaMax}
                              valueLabelDisplay="on"
                              step={1}
                            />
                            <div className="d-flex justify-content-between">
                              <span>{areaMin + " m²"} </span>
                              <span>{areaMax + " m²"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>
              </form>

              <hr />

              <div className="action-button d-flex justify-content-end mb-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  Salvar minhas preferências e seguir
                  {loading ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                      style={{ marginLeft: "0.5rem" }}
                    />
                  ) : (
                    <IoChevronForwardOutline />
                  )}
                </button>
              </div>
              {alertErro && (
                <div className="mt-3 mb-0">
                  <Alert msg={msgErro} setAlertErro={setAlertErro} />
                </div>
              )}
            </div>
            <div className="col-lg-3">
              <StepperCadastroInteresse />
            </div>
          </div>
        </div>
      )}
      <Footer dark />
    </>
  );
}
