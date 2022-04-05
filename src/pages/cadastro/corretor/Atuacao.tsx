import { FormEvent, useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import { iDadosUsuario, iDataSelect } from "../../../@types";
import api from "../../../services/api";
import Navbar from "../../../components/Navbar";
import { StepperCadastroCorretor } from "../../../components/StepperCadastroCorretor";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import customTheme from "../../../themes/ReactSelect";
import { FiSave, FiTrash, FiPlus } from "react-icons/fi";
import { MdApartment, MdPark } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { useHistory } from "react-router";

import "../../../styles/pages/cadastro/corretor/geral.scss";
import "rc-slider/assets/index.css";
import { useLocation } from "react-router-dom";

import Alert from "../../../components/Alert";

import SelecionarCidades, { Cidade } from "./SelecionarCidades";

interface iDatas {
  dia: string;
  horarioInicial: string;
  horarioFinal: string;
}

export default function Atuacao(): JSX.Element {
  const history = useHistory();

  const [cidades, setCidades] = useState<Cidade[]>([])

  const [initCities, setInitCities] = useState<Cidade[]>([])

  const location: any = useLocation();
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const codCorretor = usuario.codCorretor;
  const [loading, setLoading] = useState(false);
  const [especialidade, setEspecialidade] = useState("");
  const [loadingTipos, setLoadingTipos] = useState(false);
  const [tipos, setTipos] = useState<iDataSelect[]>([]);
  const [tiposSelecionado, setTiposSelecioado] = useState<iDataSelect[]>([]);
  const [tiposApi, setTiposApi] = useState<iDataSelect[]>([]);

  // Datas
  // Segunda
  const [checkSegunda, setCheckSegunda] = useState(true);
  const [horaInicialSegunda, setHoraInicialSegunda] = useState("08:00:00");
  const [horaFinalSegunda, setHoraFinalSegunda] = useState("18:00:00");
  const [checkSegndoHorarioSegunda, setCheckSegndoHorarioSegunda] =
    useState(false);
  const [horaInicialSegunda2, setHoraInicialSegunda2] = useState("");
  const [horaFinalSegunda2, setHoraFinalSegunda2] = useState("");
  // Terca
  const [checkTerca, setCheckTerca] = useState(true);
  const [horaInicialTerca, setHoraInicialTerca] = useState("08:00:00");
  const [horaFinalTerca, setHoraFinalTerca] = useState("18:00:00");
  const [checkSegndoHorarioTerca, setCheckSegndoHorarioTerca] = useState(false);
  const [horaInicialTerca2, setHoraInicialTerca2] = useState("");
  const [horaFinalTerca2, setHoraFinalTerca2] = useState("");
  // Quarta
  const [checkQuarta, setCheckQuarta] = useState(true);
  const [horaInicialQuarta, setHoraInicialQuarta] = useState("08:00:00");
  const [horaFinalQuarta, setHoraFinalQuarta] = useState("18:00:00");
  const [checkSegndoHorarioQuarta, setCheckSegndoHorarioQuarta] =
    useState(false);
  const [horaInicialQuarta2, setHoraInicialQuarta2] = useState("");
  const [horaFinalQuarta2, setHoraFinalQuarta2] = useState("");
  // Quinta
  const [checkQuinta, setCheckQuinta] = useState(true);
  const [horaInicialQuinta, setHoraInicialQuinta] = useState("08:00:00");
  const [horaFinalQuinta, setHoraFinalQuinta] = useState("18:00:00");
  const [checkSegndoHorarioQuinta, setCheckSegndoHorarioQuinta] =
    useState(false);
  const [horaInicialQuinta2, setHoraInicialQuinta2] = useState("");
  const [horaFinalQuinta2, setHoraFinalQuinta2] = useState("");
  // Sexta
  const [checkSexta, setCheckSexta] = useState(true);
  const [horaInicialSexta, setHoraInicialSexta] = useState("08:00:00");
  const [horaFinalSexta, setHoraFinalSexta] = useState("18:00:00");
  const [checkSegndoHorarioSexta, setCheckSegndoHorarioSexta] = useState(false);
  const [horaInicialSexta2, setHoraInicialSexta2] = useState("");
  const [horaFinalSexta2, setHoraFinalSexta2] = useState("");
  // Sabado
  const [checkSabado, setCheckSabado] = useState(true);
  const [horaInicialSabado, setHoraInicialSabado] = useState("08:00:00");
  const [horaFinalSabado, setHoraFinalSabado] = useState("14:00:00");
  const [checkSegndoHorarioSabado, setCheckSegndoHorarioSabado] =
    useState(false);
  const [horaInicialSabado2, setHoraInicialSabado2] = useState("");
  const [horaFinalSabado2, setHoraFinalSabado2] = useState("");
  // Domingo
  const [checkDomingo, setCheckDomingo] = useState(false);
  const [horaInicialDomingo, setHoraInicialDomingo] = useState("");
  const [horaFinalDomingo, setHoraFinalDomingo] = useState("");
  const [checkSegndoHorarioDomingo, setCheckSegndoHorarioDomingo] =
    useState(false);
  const [horaInicialDomingo2, setHoraInicialDomingo2] = useState("");
  const [horaFinalDomingo2, setHoraFinalDomingo2] = useState("");
  const [datas, setDatas] = useState<iDatas[]>([]);
  let data: any = [];
  let especialidadesMontadas: any = [];

  const [edicao, setEdicao] = useState(location?.state?.edicao);
  const [alertErro, setAlertErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");

  function checaUsuarioLogado() {
    if (!usuario.token) {
      window.alert("Você precisa fazer login!");
      history.push("/");
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    checaUsuarioLogado();
    GetEspecialidade();
    GetHorarios();
  }, []);

  const valorInicial = "0";
  const valorFinal = "999999";

  async function GetHorarios() {
    await api
      .get(`HorariosCorretor/buscar?codCorretor=${usuario.codCorretor}`)
      .then((response) => {
        const horarios = response.data.data.horarios;
        console.log("Horarios ", horarios);

        horarios.map((horario: any) => {
          // console.log("horario - > ", horario);

          if (horario.dia === "segunda-feira") {
            setCheckSegunda(true);
            if (horario.horarios.length > 1) {
              setCheckSegndoHorarioSegunda(true);
              setHoraInicialSegunda(horario.horarios[0].horarioInicial);
              setHoraFinalSegunda(horario.horarios[0].horarioFinal);
              setHoraInicialSegunda2(horario.horarios[1].horarioInicial);
              setHoraFinalSegunda2(horario.horarios[1].horarioFinal);
            } else {
              setHoraInicialSegunda(horario.horarios[0].horarioInicial);
              setHoraFinalSegunda(horario.horarios[0].horarioFinal);
            }
          } else if (horario.dia === "terca-feira") {
            setCheckTerca(true);
            if (horario.horarios.length > 1) {
              setCheckSegndoHorarioTerca(true);
              setHoraInicialTerca(horario.horarios[0].horarioInicial);
              setHoraFinalTerca(horario.horarios[0].horarioFinal);
              setHoraInicialTerca2(horario.horarios[1].horarioInicial);
              setHoraFinalTerca2(horario.horarios[1].horarioFinal);
            } else {
              setHoraInicialTerca(horario.horarios[0].horarioInicial);
              setHoraFinalTerca(horario.horarios[0].horarioFinal);
            }
          } else if (horario.dia === "quarta-feira") {
            setCheckQuarta(true);
            if (horario.horarios.length > 1) {
              setCheckSegndoHorarioQuarta(true);
              setHoraInicialQuarta(horario.horarios[0].horarioInicial);
              setHoraFinalQuarta(horario.horarios[0].horarioFinal);
              setHoraInicialQuarta2(horario.horarios[1].horarioInicial);
              setHoraFinalQuarta2(horario.horarios[1].horarioFinal);
            } else {
              setHoraInicialQuarta(horario.horarios[0].horarioInicial);
              setHoraFinalQuarta(horario.horarios[0].horarioFinal);
            }
          } else if (horario.dia === "quinta-feira") {
            setCheckQuinta(true);
            if (horario.horarios.length > 1) {
              setCheckSegndoHorarioQuinta(true);
              setHoraInicialQuinta(horario.horarios[0].horarioInicial);
              setHoraFinalQuinta(horario.horarios[0].horarioFinal);
              setHoraInicialQuinta2(horario.horarios[1].horarioInicial);
              setHoraFinalQuinta2(horario.horarios[1].horarioFinal);
            } else {
              setHoraInicialQuinta(horario.horarios[0].horarioInicial);
              setHoraFinalQuinta(horario.horarios[0].horarioFinal);
            }
          } else if (horario.dia === "sexta-feira") {
            setCheckSexta(true);
            if (horario.horarios.length > 1) {
              setCheckSegndoHorarioSexta(true);
              setHoraInicialSexta(horario.horarios[0].horarioInicial);
              setHoraFinalSexta(horario.horarios[0].horarioFinal);
              setHoraInicialSexta2(horario.horarios[1].horarioInicial);
              setHoraFinalSexta2(horario.horarios[1].horarioFinal);
            } else {
              setHoraInicialSexta(horario.horarios[0].horarioInicial);
              setHoraFinalSexta(horario.horarios[0].horarioFinal);
            }
          } else if (horario.dia === "sabado") {
            setCheckSabado(true);
            if (horario.horarios.length > 1) {
              setCheckSegndoHorarioSabado(true);
              setHoraInicialSabado(horario.horarios[0].horarioInicial);
              setHoraFinalSabado(horario.horarios[0].horarioFinal);
              setHoraInicialSabado2(horario.horarios[1].horarioInicial);
              setHoraFinalSabado2(horario.horarios[1].horarioFinal);
            } else {
              setHoraInicialSabado(horario.horarios[0].horarioInicial);
              setHoraFinalSabado(horario.horarios[0].horarioFinal);
            }
          } else if (horario.dia === "domingo") {
            setCheckDomingo(true);
            if (horario.horarios.length > 1) {
              setCheckSegndoHorarioDomingo(true);
              setHoraInicialDomingo(horario.horarios[0].horarioInicial);
              setHoraFinalDomingo(horario.horarios[0].horarioFinal);
              setHoraInicialDomingo2(horario.horarios[1].horarioInicial);
              setHoraFinalDomingo2(horario.horarios[1].horarioFinal);
            } else {
              setHoraInicialDomingo(horario.horarios[0].horarioInicial);
              setHoraFinalDomingo(horario.horarios[0].horarioFinal);
            }
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function GetEspecialidade() {
    await api
      .get(`especialidade-corretor/listar?CodCorretor=${usuario.codCorretor}`)
      .then((response) => {
        console.log(response.data);
        const res = response.data.data;
        // Suas Especialidades
        switch (res[0].codFinalidade) {
          case 1:
            console.log("Para Morar");
            setEspecialidade("para morar");
            GetTipos(1);
            setTiposApi(res[0].tipos);
            break;
          case 2:
            console.log("Para Trabalhar");
            setEspecialidade("para trabalhar");
            GetTipos(2);
            setTiposApi(res[0].tipos);
            break;
          case 3:
            console.log("Para Construir");
            setEspecialidade("para construir");
            GetTipos(3);
            setTiposApi(res[0].tipos);
            break;
          default:
            setEspecialidade("");
        }

        let result = res.map((local: any) => {
          return {
            value: local.codCidade, 
            label: local.descCidade,
            districts: local.bairros
          }
        })

        setInitCities(result)

        setCidades(result)

        if(res.length > 0)
          setTiposSelecioado(res[0].tipos)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function MontarEspecialidades(event: FormEvent) {
    event.preventDefault();
    if(especialidade !== ''){
      if(tiposSelecionado.length > 0){

        let valid = cidades.filter(city => (city as any)?.value > 0);

        console.log("MontarEspecialidades");
        valid.forEach(city => {
          especialidadesMontadas.push({
            codCidade: city.value,
            bairros: city.districts,
            tiposImovel: tiposSelecionado,
            valorInicial,
            valorFinal,
          });
        })

        let semBairro = valid.filter(city => city.districts.length == 0).length > 0;

        if(semBairro){
          setMsgErro('É necessario preencher os bairros de atuacao!');
          setAlertErro(true)
        } else if(valid.length > 0){
          MontarDatas();
        } else {
          setMsgErro('Informe a cidade e bairro para atuação.');
          setAlertErro(true)
        }
        
      } else {
        setMsgErro('É necessário escolher ao menos um tipo de imóvel!');
        setAlertErro(true)
      }
      
    } else {
      setMsgErro('É necessário escolher uma especialidade!');
      setAlertErro(true)
    }
    
  }

  function MontarDatas() {
    console.log("MontarDatas");
    let datasMontadas: iDatas[] = [];
    if (checkSegunda) {
      if (checkSegndoHorarioSegunda) {
        datasMontadas.push(
          {
            dia: "segunda-feira",
            horarioInicial: horaInicialSegunda,
            horarioFinal: horaFinalSegunda,
          },
          {
            dia: "segunda-feira",
            horarioInicial: horaInicialSegunda2,
            horarioFinal: horaFinalSegunda2,
          }
        );
      } else {
        datasMontadas.push({
          dia: "segunda-feira",
          horarioInicial: horaInicialSegunda,
          horarioFinal: horaFinalSegunda,
        });
      }
    }
    if (checkTerca) {
      if (checkSegndoHorarioTerca) {
        datasMontadas.push(
          {
            dia: "terca-feira",
            horarioInicial: horaInicialTerca,
            horarioFinal: horaFinalTerca,
          },
          {
            dia: "terca-feira",
            horarioInicial: horaInicialTerca2,
            horarioFinal: horaFinalTerca2,
          }
        );
      } else {
        datasMontadas.push({
          dia: "terca-feira",
          horarioInicial: horaInicialTerca,
          horarioFinal: horaFinalTerca,
        });
      }
    }
    if (checkQuarta) {
      if (checkSegndoHorarioQuarta) {
        datasMontadas.push(
          {
            dia: "quarta-feira",
            horarioInicial: horaInicialQuarta,
            horarioFinal: horaFinalQuarta,
          },
          {
            dia: "quarta-feira",
            horarioInicial: horaInicialQuarta2,
            horarioFinal: horaFinalQuarta2,
          }
        );
      } else {
        datasMontadas.push({
          dia: "quarta-feira",
          horarioInicial: horaInicialQuarta,
          horarioFinal: horaFinalQuarta,
        });
      }
    }
    if (checkQuinta) {
      if (checkSegndoHorarioQuinta) {
        datasMontadas.push(
          {
            dia: "quinta-feira",
            horarioInicial: horaInicialQuinta,
            horarioFinal: horaFinalQuinta,
          },
          {
            dia: "quinta-feira",
            horarioInicial: horaInicialQuinta2,
            horarioFinal: horaFinalQuinta2,
          }
        );
      } else {
        datasMontadas.push({
          dia: "quinta-feira",
          horarioInicial: horaInicialQuinta,
          horarioFinal: horaFinalQuinta,
        });
      }
    }
    if (checkSexta) {
      if (checkSegndoHorarioSexta) {
        datasMontadas.push(
          {
            dia: "sexta-feira",
            horarioInicial: horaInicialSexta,
            horarioFinal: horaFinalSexta,
          },
          {
            dia: "sexta-feira",
            horarioInicial: horaInicialSexta2,
            horarioFinal: horaFinalSexta2,
          }
        );
      } else {
        datasMontadas.push({
          dia: "sexta-feira",
          horarioInicial: horaInicialSexta,
          horarioFinal: horaFinalSexta,
        });
      }
    }
    if (checkSabado) {
      if (checkSegndoHorarioSabado) {
        datasMontadas.push(
          {
            dia: "sabado",
            horarioInicial: horaInicialSabado,
            horarioFinal: horaFinalSabado,
          },
          {
            dia: "sabado",
            horarioInicial: horaInicialSabado2,
            horarioFinal: horaFinalSabado2,
          }
        );
      } else {
        datasMontadas.push({
          dia: "sabado",
          horarioInicial: horaInicialSabado,
          horarioFinal: horaFinalSabado,
        });
      }
    }
    if (checkDomingo) {
      if (checkSegndoHorarioDomingo) {
        datasMontadas.push(
          {
            dia: "domingo",
            horarioInicial: horaInicialDomingo,
            horarioFinal: horaFinalDomingo,
          },
          {
            dia: "domingo",
            horarioInicial: horaInicialDomingo2,
            horarioFinal: horaFinalDomingo2,
          }
        );
      } else {
        datasMontadas.push({
          dia: "domingo",
          horarioInicial: horaInicialDomingo,
          horarioFinal: horaFinalDomingo,
        });
      }
    }
    setDatas(datasMontadas);
    data = datasMontadas;
    Salvar();
  }

  async function Salvar() {
    setLoading(true);
    console.log("especialidadesMontadas", especialidadesMontadas);
    console.log("datas", data);
    // Criar especialidade corretor
    api
      .post(
        `especialidade-corretor/criar-especialidades?codCorretor=${codCorretor}`,
        especialidadesMontadas
      )
      .then((response) => {
        // Data e horário
        console.log(response.data);
        console.log("Criar especialidade corretor");
        api
          .post(`HorariosCorretor/cadastrar?codCorretor=${codCorretor}`, data)
          .then((response) => {
            console.log("Data e horário");
            console.log(response.data);
            AtualizarStatusCadastro();
          })
          .catch((error) => {
            console.log("Ocorreu um erro");
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoading(false);
      });
  }

  async function GetTipos(CodFinalidade: number) {
    // 1	Para Morar
    // 2	Para Trabalhar
    // 3	Para Construir
    setLoadingTipos(true);
    await api
      .get("imovel/tipos", {
        params: {
          CodFinalidade,
        },
      })
      .then((response) => {
        setTipos(response.data.data);
        setLoadingTipos(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoadingTipos(false);
      });
  }

  async function AtualizarStatusCadastro() {
    await api
      .patch(
        `Corretor/atualizar-status-cadastro?CodCorretor=${codCorretor}&StatusCadastro=3`
      )
      .then((response) => {
        if(response.data.success){
          history.push("/cadastro/corretor/dados-bancarios");
        }
        
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  const animatedComponents = makeAnimated();
  return (
    <>
      <Navbar type="dark" />
      <div className="container" id="corretorAtuacao">
        <div className="row">
          <div className="col-lg-9">
            <form onSubmit={MontarEspecialidades}>
              <div className="wrapper">
                <ol className="c-stepper">
                  <li className="c-stepper__item">
                    <div className="c-stepper__content">
                      <h2 className="c-stepper__title">Sua especialidade</h2>

                      <div className="mb-5">
                        <p>
                          Qual segmento de imóvel você é mais especialista ou
                          prefere trabalhar?
                          <span>*</span>
                        </p>

                        <div className="btn-especialidades d-flex justify-content-around align-items-center flex-wrap">
                          <button
                            type="button"
                            className={`btn ${
                              especialidade === "para morar" ? "active" : ""
                            }`}
                            onClick={() => {
                              setEspecialidade("para morar");
                              GetTipos(1);
                            }}
                          >
                            <BiHomeAlt size={48} />
                            Para morar
                          </button>
                          <button
                            type="button"
                            className={`btn ${
                              especialidade === "para trabalhar" ? "active" : ""
                            }`}
                            onClick={() => {
                              setEspecialidade("para trabalhar");
                              GetTipos(2);
                            }}
                          >
                            <MdApartment size={48} />
                            Para trabalhar
                          </button>
                          <button
                            type="button"
                            className={`btn ${
                              especialidade === "para construir" ? "active" : ""
                            }`}
                            onClick={() => {
                              setEspecialidade("para construir");
                              GetTipos(3);
                            }}
                          >
                            <MdPark size={48} />
                            Para construir
                          </button>
                        </div>
                      </div>

                      <div style={{ maxWidth: 700 }}>
                        <p>
                          Tipo de imóvel<span>*</span>
                        </p>
                        {tiposApi.length ? (
                          <Select
                            classNamePrefix="select-multi"
                            options={tipos}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            placeholder="Escolha um ou mais tipos de imóveis"
                            noOptionsMessage={() =>
                              especialidade === ""
                                ? "Escolha uma especialidade acima"
                                : "Nenhum tipo de imóvel encontrado"
                            }
                            theme={customTheme}
                            isLoading={loadingTipos}
                            onChange={(value: any) => {
                              setTiposSelecioado(value);
                            }}
                            defaultValue={tiposApi}
                          />
                        ) : null}
                        {!tiposApi.length ? (
                          <Select
                            classNamePrefix="select-multi"
                            options={tipos}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            placeholder="Escolha um ou mais tipos de imóveis"
                            noOptionsMessage={() =>
                              especialidade === ""
                                ? "Escolha uma especialidade acima"
                                : "Nenhum tipo de imóvel encontrado"
                            }
                            theme={customTheme}
                            isLoading={loadingTipos}
                            onChange={(value: any) => {
                              setTiposSelecioado(value);
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </li>
                  <li className="c-stepper__item">
                    <div className="c-stepper__content">
                      <h2 className="c-stepper__title">Local de atuação</h2>
                      
                      <SelecionarCidades
                        Max={Infinity}
                        InitCities={initCities}
                        OnChange={cities => {
                          setCidades(cities)
                        }}
                      />
                    </div>
                  </li>
                  <li className="c-stepper__item">
                    <div className="c-stepper__content c-table">
                      <h2 className="c-stepper__title">
                        Data e horário de atuação
                      </h2>

                      <p className="mb-4">
                        Para facilitar seu cadastro, já deixamos seu horário de
                        atuação preenchido, considerando o horário comercial.
                        Caso necessário, faça os ajustes que sejam melhor para
                        você.
                      </p>

                      <div
                        className="table-responsive"
                        style={{ maxWidth: 720 }}
                      >
                        <table className="table">
                          <tbody>
                            <tr>
                              <td className="days">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="Segunda"
                                    onChange={() =>
                                      setCheckSegunda(!checkSegunda)
                                    }
                                    checked={checkSegunda}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="Segunda"
                                  >
                                    SEG
                                  </label>
                                </div>
                              </td>
                              <td className="times">
                                <div className="box-times">
                                  <div>
                                    <input
                                      type="time"
                                      id="horaInicial"
                                      className="form-control"
                                      required={checkSegunda}
                                      aria-describedby="horaInicial"
                                      value={horaInicialSegunda}
                                      onChange={(e) =>
                                        setHoraInicialSegunda(e.target.value)
                                      }
                                      disabled={!checkSegunda}
                                    />
                                  </div>
                                  <div className="divider">
                                    <span className="form-text">-</span>
                                  </div>
                                  <div>
                                    <input
                                      type="time"
                                      id="horaFinal"
                                      required={checkSegunda}
                                      className="form-control"
                                      aria-describedby="horaFinal"
                                      value={horaFinalSegunda}
                                      onChange={(e) =>
                                        setHoraFinalSegunda(e.target.value)
                                      }
                                      disabled={!checkSegunda}
                                    />
                                  </div>
                                </div>
                                {checkSegndoHorarioSegunda && (
                                  <div className="box-times">
                                    <div>
                                      <input
                                        type="time"
                                        id="horaInicial"
                                        className="form-control"
                                        aria-describedby="horaInicial"
                                        required={checkSegndoHorarioSegunda}
                                        value={horaInicialSegunda2}
                                        onChange={(e) =>
                                          setHoraInicialSegunda2(e.target.value)
                                        }
                                        disabled={!checkSegunda}
                                      />
                                    </div>
                                    <div className="divider">
                                      <span className="form-text">-</span>
                                    </div>
                                    <div>
                                      <input
                                        type="time"
                                        id="horaFinal"
                                        className="form-control"
                                        aria-describedby="horaFinal"
                                        required={checkSegndoHorarioSegunda}
                                        value={horaFinalSegunda2}
                                        onChange={(e) =>
                                          setHoraFinalSegunda2(e.target.value)
                                        }
                                        disabled={!checkSegunda}
                                      />
                                    </div>
                                    <div>
                                      <button
                                        type="button"
                                        className="btn btn-trash"
                                        onClick={() => {
                                          setCheckSegndoHorarioSegunda(false);
                                          setHoraInicialSegunda2("");
                                          setHoraFinalSegunda2("");
                                        }}
                                        disabled={!checkSegunda}
                                      >
                                        <FiTrash />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </td>
                              <td className="actions">
                                <button
                                  type="button"
                                  className="btn btn-outline-gray"
                                  onClick={() => {
                                    setCheckSegndoHorarioSegunda(true);
                                  }}
                                  disabled={
                                    checkSegndoHorarioSegunda || !checkSegunda
                                  }
                                >
                                  <FiPlus />
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td className="days">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="Terca"
                                    onChange={() => setCheckTerca(!checkTerca)}
                                    checked={checkTerca}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="Terca"
                                  >
                                    TER
                                  </label>
                                </div>
                              </td>
                              <td className="times">
                                <div className="box-times">
                                  <div>
                                    <input
                                      type="time"
                                      id="horaInicial"
                                      className="form-control"
                                      aria-describedby="horaInicial"
                                      required={checkTerca}
                                      value={horaInicialTerca}
                                      onChange={(e) =>
                                        setHoraInicialTerca(e.target.value)
                                      }
                                      disabled={!checkTerca}
                                    />
                                  </div>
                                  <div className="divider">
                                    <span className="form-text">-</span>
                                  </div>
                                  <div>
                                    <input
                                      type="time"
                                      id="horaFinal"
                                      className="form-control"
                                      aria-describedby="horaFinal"
                                      required={checkTerca}
                                      value={horaFinalTerca}
                                      onChange={(e) =>
                                        setHoraFinalTerca(e.target.value)
                                      }
                                      disabled={!checkTerca}
                                    />
                                  </div>
                                </div>
                                {checkSegndoHorarioTerca && (
                                  <div className="box-times">
                                    <div>
                                      <input
                                        type="time"
                                        id="horaInicial"
                                        className="form-control"
                                        aria-describedby="horaInicial"
                                        required={checkSegndoHorarioTerca}
                                        value={horaInicialTerca2}
                                        onChange={(e) =>
                                          setHoraInicialTerca2(e.target.value)
                                        }
                                        disabled={!checkTerca}
                                      />
                                    </div>
                                    <div className="divider">
                                      <span className="form-text">-</span>
                                    </div>
                                    <div>
                                      <input
                                        type="time"
                                        id="horaFinal"
                                        className="form-control"
                                        aria-describedby="horaFinal"
                                        required={checkSegndoHorarioTerca}
                                        value={horaFinalTerca2}
                                        onChange={(e) =>
                                          setHoraFinalTerca2(e.target.value)
                                        }
                                        disabled={!checkTerca}
                                      />
                                    </div>
                                    <div>
                                      <button
                                        type="button"
                                        className="btn btn-trash"
                                        onClick={() => {
                                          setCheckSegndoHorarioTerca(false);
                                          setHoraInicialTerca2("");
                                          setHoraFinalTerca2("");
                                        }}
                                        disabled={!checkTerca}
                                      >
                                        <FiTrash />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </td>
                              <td className="actions">
                                <button
                                  type="button"
                                  className="btn btn-outline-gray"
                                  onClick={() => {
                                    setCheckSegndoHorarioTerca(true);
                                  }}
                                  disabled={
                                    checkSegndoHorarioTerca || !checkTerca
                                  }
                                >
                                  <FiPlus />
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td className="days">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="Quarta"
                                    onChange={() =>
                                      setCheckQuarta(!checkQuarta)
                                    }
                                    checked={checkQuarta}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="Quarta"
                                  >
                                    QUA
                                  </label>
                                </div>
                              </td>
                              <td className="times">
                                <div className="box-times">
                                  <div>
                                    <input
                                      type="time"
                                      id="horaInicial"
                                      className="form-control"
                                      aria-describedby="horaInicial"
                                      required={checkQuarta}
                                      value={horaInicialQuarta}
                                      onChange={(e) =>
                                        setHoraInicialQuarta(e.target.value)
                                      }
                                      disabled={!checkQuarta}
                                    />
                                  </div>
                                  <div className="divider">
                                    <span className="form-text">-</span>
                                  </div>
                                  <div>
                                    <input
                                      type="time"
                                      id="horaFinal"
                                      className="form-control"
                                      aria-describedby="horaFinal"
                                      required={checkQuarta}
                                      value={horaFinalQuarta}
                                      onChange={(e) =>
                                        setHoraFinalQuarta(e.target.value)
                                      }
                                      disabled={!checkQuarta}
                                    />
                                  </div>
                                </div>
                                {checkSegndoHorarioQuarta && (
                                  <div className="box-times">
                                    <div>
                                      <input
                                        type="time"
                                        id="horaInicial"
                                        className="form-control"
                                        aria-describedby="horaInicial"
                                        required={checkSegndoHorarioQuarta}
                                        value={horaInicialQuarta2}
                                        onChange={(e) =>
                                          setHoraInicialQuarta2(e.target.value)
                                        }
                                        disabled={!checkQuarta}
                                      />
                                    </div>
                                    <div className="divider">
                                      <span className="form-text">-</span>
                                    </div>
                                    <div>
                                      <input
                                        type="time"
                                        id="horaFinal"
                                        className="form-control"
                                        aria-describedby="horaFinal"
                                        required={checkSegndoHorarioQuarta}
                                        value={horaFinalQuarta2}
                                        onChange={(e) =>
                                          setHoraFinalQuarta2(e.target.value)
                                        }
                                        disabled={!checkQuarta}
                                      />
                                    </div>
                                    <div>
                                      <button
                                        type="button"
                                        className="btn btn-trash"
                                        onClick={() => {
                                          setCheckSegndoHorarioQuarta(false);
                                          setHoraInicialQuarta2("");
                                          setHoraFinalQuarta2("");
                                        }}
                                        disabled={!checkQuarta}
                                      >
                                        <FiTrash />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </td>
                              <td className="actions">
                                <button
                                  type="button"
                                  className="btn btn-outline-gray"
                                  onClick={() => {
                                    setCheckSegndoHorarioQuarta(true);
                                  }}
                                  disabled={
                                    checkSegndoHorarioQuarta || !checkQuarta
                                  }
                                >
                                  <FiPlus />
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td className="days">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="Quinta"
                                    onChange={() =>
                                      setCheckQuinta(!checkQuinta)
                                    }
                                    checked={checkQuinta}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="Quinta"
                                  >
                                    QUI
                                  </label>
                                </div>
                              </td>
                              <td className="times">
                                <div className="box-times">
                                  <div>
                                    <input
                                      type="time"
                                      id="horaInicial"
                                      className="form-control"
                                      aria-describedby="horaInicial"
                                      required={checkQuinta}
                                      value={horaInicialQuinta}
                                      onChange={(e) =>
                                        setHoraInicialQuinta(e.target.value)
                                      }
                                      disabled={!checkQuinta}
                                    />
                                  </div>
                                  <div className="divider">
                                    <span className="form-text">-</span>
                                  </div>
                                  <div>
                                    <input
                                      type="time"
                                      id="horaFinal"
                                      className="form-control"
                                      aria-describedby="horaFinal"
                                      required={checkQuinta}
                                      value={horaFinalQuinta}
                                      onChange={(e) =>
                                        setHoraFinalQuinta(e.target.value)
                                      }
                                      disabled={!checkQuinta}
                                    />
                                  </div>
                                </div>
                                {checkSegndoHorarioQuinta && (
                                  <div className="box-times">
                                    <div>
                                      <input
                                        type="time"
                                        id="horaInicial"
                                        className="form-control"
                                        aria-describedby="horaInicial"
                                        required={checkSegndoHorarioQuinta}
                                        value={horaInicialQuinta2}
                                        onChange={(e) =>
                                          setHoraInicialQuinta2(e.target.value)
                                        }
                                        disabled={!checkQuinta}
                                      />
                                    </div>
                                    <div className="divider">
                                      <span className="form-text">-</span>
                                    </div>
                                    <div>
                                      <input
                                        type="time"
                                        id="horaFinal"
                                        className="form-control"
                                        aria-describedby="horaFinal"
                                        required={checkSegndoHorarioQuinta}
                                        value={horaFinalQuinta2}
                                        onChange={(e) =>
                                          setHoraFinalQuinta2(e.target.value)
                                        }
                                        disabled={!checkQuinta}
                                      />
                                    </div>
                                    <div>
                                      <button
                                        type="button"
                                        className="btn btn-trash"
                                        onClick={() => {
                                          setCheckSegndoHorarioQuinta(false);
                                          setHoraInicialQuinta2("");
                                          setHoraFinalQuinta2("");
                                        }}
                                        disabled={!checkQuinta}
                                      >
                                        <FiTrash />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </td>
                              <td className="actions">
                                <button
                                  type="button"
                                  className="btn btn-outline-gray"
                                  onClick={() => {
                                    setCheckSegndoHorarioQuinta(true);
                                  }}
                                  disabled={
                                    checkSegndoHorarioQuinta || !checkQuinta
                                  }
                                >
                                  <FiPlus />
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td className="days">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="Sexta"
                                    onChange={() => setCheckSexta(!checkSexta)}
                                    checked={checkSexta}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="Sexta"
                                  >
                                    SEX
                                  </label>
                                </div>
                              </td>
                              <td className="times">
                                <div className="box-times">
                                  <div>
                                    <input
                                      type="time"
                                      id="horaInicial"
                                      className="form-control"
                                      aria-describedby="horaInicial"
                                      required={checkSexta}
                                      value={horaInicialSexta}
                                      onChange={(e) =>
                                        setHoraInicialSexta(e.target.value)
                                      }
                                      disabled={!checkSexta}
                                    />
                                  </div>
                                  <div className="divider">
                                    <span className="form-text">-</span>
                                  </div>
                                  <div>
                                    <input
                                      type="time"
                                      id="horaFinal"
                                      className="form-control"
                                      aria-describedby="horaFinal"
                                      required={checkSexta}
                                      value={horaFinalSexta}
                                      onChange={(e) =>
                                        setHoraFinalSexta(e.target.value)
                                      }
                                      disabled={!checkSexta}
                                    />
                                  </div>
                                </div>
                                {checkSegndoHorarioSexta && (
                                  <div className="box-times">
                                    <div>
                                      <input
                                        type="time"
                                        id="horaInicial"
                                        className="form-control"
                                        aria-describedby="horaInicial"
                                        required={checkSegndoHorarioSexta}
                                        value={horaInicialSexta2}
                                        onChange={(e) =>
                                          setHoraInicialSexta2(e.target.value)
                                        }
                                        disabled={!checkSexta}
                                      />
                                    </div>
                                    <div className="divider">
                                      <span className="form-text">-</span>
                                    </div>
                                    <div>
                                      <input
                                        type="time"
                                        id="horaFinal"
                                        className="form-control"
                                        aria-describedby="horaFinal"
                                        required={checkSegndoHorarioSexta}
                                        value={horaFinalSexta2}
                                        onChange={(e) =>
                                          setHoraFinalSexta2(e.target.value)
                                        }
                                        disabled={!checkSexta}
                                      />
                                    </div>
                                    <div>
                                      <button
                                        type="button"
                                        className="btn btn-trash"
                                        onClick={() => {
                                          setCheckSegndoHorarioSexta(false);
                                          setHoraInicialSexta2("");
                                          setHoraFinalSexta2("");
                                        }}
                                        disabled={!checkSexta}
                                      >
                                        <FiTrash />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </td>
                              <td className="actions">
                                <button
                                  type="button"
                                  className="btn btn-outline-gray"
                                  onClick={() => {
                                    setCheckSegndoHorarioSexta(true);
                                  }}
                                  disabled={
                                    checkSegndoHorarioSexta || !checkSexta
                                  }
                                >
                                  <FiPlus />
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td className="days">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="Sabado"
                                    onChange={() =>
                                      setCheckSabado(!checkSabado)
                                    }
                                    checked={checkSabado}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="Sabado"
                                  >
                                    SAB
                                  </label>
                                </div>
                              </td>
                              <td className="times">
                                <div className="box-times">
                                  <div>
                                    <input
                                      type="time"
                                      id="horaInicial"
                                      className="form-control"
                                      aria-describedby="horaInicial"
                                      required={checkSabado}
                                      value={horaInicialSabado}
                                      onChange={(e) =>
                                        setHoraInicialSabado(e.target.value)
                                      }
                                      disabled={!checkSabado}
                                    />
                                  </div>
                                  <div className="divider">
                                    <span className="form-text">-</span>
                                  </div>
                                  <div>
                                    <input
                                      type="time"
                                      id="horaFinal"
                                      className="form-control"
                                      aria-describedby="horaFinal"
                                      required={checkSabado}
                                      value={horaFinalSabado}
                                      onChange={(e) =>
                                        setHoraFinalSabado(e.target.value)
                                      }
                                      disabled={!checkSabado}
                                    />
                                  </div>
                                </div>
                                {checkSegndoHorarioSabado && (
                                  <div className="box-times">
                                    <div>
                                      <input
                                        type="time"
                                        id="horaInicial"
                                        className="form-control"
                                        aria-describedby="horaInicial"
                                        required={checkSegndoHorarioSabado}
                                        value={horaInicialSabado2}
                                        onChange={(e) =>
                                          setHoraInicialSabado2(e.target.value)
                                        }
                                        disabled={!checkSabado}
                                      />
                                    </div>
                                    <div className="divider">
                                      <span className="form-text">-</span>
                                    </div>
                                    <div>
                                      <input
                                        type="time"
                                        id="horaFinal"
                                        className="form-control"
                                        aria-describedby="horaFinal"
                                        required={checkSegndoHorarioSabado}
                                        value={horaFinalSabado2}
                                        onChange={(e) =>
                                          setHoraFinalSabado2(e.target.value)
                                        }
                                        disabled={!checkSabado}
                                      />
                                    </div>
                                    <div>
                                      <button
                                        type="button"
                                        className="btn btn-trash"
                                        onClick={() => {
                                          setCheckSegndoHorarioSabado(false);
                                          setHoraInicialSabado2("");
                                          setHoraFinalSabado2("");
                                        }}
                                        disabled={!checkSabado}
                                      >
                                        <FiTrash />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </td>
                              <td className="actions">
                                <button
                                  type="button"
                                  className="btn btn-outline-gray"
                                  onClick={() => {
                                    setCheckSegndoHorarioSabado(true);
                                  }}
                                  disabled={
                                    checkSegndoHorarioSabado || !checkSabado
                                  }
                                >
                                  <FiPlus />
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td className="days">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="Domingo"
                                    onChange={() =>
                                      setCheckDomingo(!checkDomingo)
                                    }
                                    checked={checkDomingo}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="Domingo"
                                  >
                                    DOM
                                  </label>
                                </div>
                              </td>
                              <td className="times">
                                <div className="box-times">
                                  <div>
                                    <input
                                      type="time"
                                      id="horaInicial"
                                      className="form-control"
                                      aria-describedby="horaInicial"
                                      required={checkDomingo}
                                      value={horaInicialDomingo}
                                      onChange={(e) =>
                                        setHoraInicialDomingo(e.target.value)
                                      }
                                      disabled={!checkDomingo}
                                    />
                                  </div>
                                  <div className="divider">
                                    <span className="form-text">-</span>
                                  </div>
                                  <div>
                                    <input
                                      type="time"
                                      id="horaFinal"
                                      className="form-control"
                                      aria-describedby="horaFinal"
                                      required={checkDomingo}
                                      value={horaFinalDomingo}
                                      onChange={(e) =>
                                        setHoraFinalDomingo(e.target.value)
                                      }
                                      disabled={!checkDomingo}
                                    />
                                  </div>
                                </div>
                                {checkSegndoHorarioDomingo && (
                                  <div className="box-times">
                                    <div>
                                      <input
                                        type="time"
                                        id="horaInicial"
                                        className="form-control"
                                        aria-describedby="horaInicial"
                                        required={checkSegndoHorarioDomingo}
                                        value={horaInicialDomingo2}
                                        onChange={(e) =>
                                          setHoraInicialDomingo2(e.target.value)
                                        }
                                        disabled={!checkDomingo}
                                      />
                                    </div>
                                    <div className="divider">
                                      <span className="form-text">-</span>
                                    </div>
                                    <div>
                                      <input
                                        type="time"
                                        id="horaFinal"
                                        className="form-control"
                                        aria-describedby="horaFinal"
                                        required={checkSegndoHorarioDomingo}
                                        value={horaFinalDomingo2}
                                        onChange={(e) =>
                                          setHoraFinalDomingo2(e.target.value)
                                        }
                                        disabled={!checkDomingo}
                                      />
                                    </div>
                                    <div>
                                      <button
                                        type="button"
                                        className="btn btn-trash"
                                        onClick={() => {
                                          setCheckSegndoHorarioDomingo(false);
                                          setHoraInicialDomingo2("");
                                          setHoraFinalDomingo2("");
                                        }}
                                        disabled={!checkDomingo}
                                      >
                                        <FiTrash />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </td>
                              <td className="actions">
                                <button
                                  type="button"
                                  className="btn btn-outline-gray"
                                  onClick={() => {
                                    setCheckSegndoHorarioDomingo(true);
                                  }}
                                  disabled={
                                    checkSegndoHorarioDomingo || !checkDomingo
                                  }
                                >
                                  <FiPlus />
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-lg-6"></div>
                    </div>
                  </li>
                </ol>
              </div>

              <hr />

              <div className="action-button d-flex justify-content-end mb-3">
                {checkSegunda ||
                checkTerca ||
                checkQuarta ||
                checkQuinta ||
                checkSexta ||
                checkSabado ||
                checkDomingo ? (
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    // onClick={MontarEspecialidades}
                    disabled={loading}
                  >
                    {edicao ? "Salvar edição" : "Salvar"} e continuar
                    {loading ? (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                        style={{ marginLeft: "0.5rem" }}
                      />
                    ) : (
                      <FiSave />
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    data-bs-toggle="modal"
                    data-bs-target="#modalHorarios"
                    disabled={loading}
                  >
                    {edicao ? "Salvar edição" : "Salvar"} e continuar
                    {loading ? (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                        style={{ marginLeft: "0.5rem" }}
                      />
                    ) : (
                      <FiSave />
                    )}
                  </button>
                )}
              </div>
              {alertErro && (
                <div className="mt-3 mb-0">
                  <Alert msg={msgErro} setAlertErro={setAlertErro} />
                </div>
					    )}
            </form>

          </div>

          <div className="col-lg-3">
            <StepperCadastroCorretor
              dadosPessoais
              uploadDocumento
              uploadComprovante
              sobreVoce
              informacoesExtras
              editar={edicao}
            />
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="modalHorarios"
        tabIndex={-1}
        aria-labelledby="modalHorariosLabelImovel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="m-0">Atenção!</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Você não indicou nenhum dia e horário de disponibilidade de
                atuação. Sem esta informação, você não poderá atender aos
                clientes da plataforma. Recomendamos que complete estes dados,
                para poder atender seus clientes e gerar oportunidades para
                você.
              </p>
              <p>Deseja continuar assim mesmo?</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary btn-lg"
                onClick={MontarEspecialidades}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Sim
              </button>
              <button
                className="btn btn-primary btn-lg"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer dark />
    </>
  );
}
