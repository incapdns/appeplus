import { useState, FormEvent, useEffect } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import "../../../styles/cadastroVendedor.scss";
import SelecaoCorretor from "../../../components/Cards/SelecaoCorretor";
import StepperAnuncioImovel from "../../../components/StepperAnuncioImovel";
import "../../../styles/cadastroAnuncioImovel.scss";
import "../../../styles/anuncioimovel.scss";
import { useHistory } from "react-router-dom";
import api from "../../../services/api";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FiSave, FiTrash, FiPlus } from "react-icons/fi";
import { MdOutlineContentCopy } from "react-icons/md";
import { iDadosUsuario, tipoUsuario } from "../../../@types";
import Loader from "../../../components/Loader";

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
  imoveisNoAppePlus?: number,
}

interface iDatas {
  dia: string;
  horarioInicial: string;
  horarioFinal: string;
}
export default function EscolherCorretor() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [checkedComprarImovel, setCheckedComprarImovel] = useState(false);
  const codImovel = Number(localStorage.getItem("@appePlus/codImovel"));
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const [corretores, setCorretores] = useState<iCorretor[]>([]);
  let [corretorSelecionado, setCorretorSelecionado] = useState(0);
  let [temCorretorVendedor, setTemCorretorVendedor] = useState(false);
  let [corretorVendedor, setCorretorVendedor] = useState({} as iCorretor);
  console.log(
    "🚀 ~ file: EscolherCorretor.tsx ~ line 46 ~ EscolherCorretor ~ corretorVendedor",
    corretorVendedor
  );

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
  let [datas, setDatas] = useState<iDatas[]>([]);

  function checaUsuarioLogado() {
    // if (!usuario.token) {
    //   window.alert("Você precisa fazer login!");
    //   history.push("/");
    // }
  }

  useEffect(() => {
    checaUsuarioLogado();
    window.scrollTo(0, 0);
    GetCorretores();
    GetHorariosImovel();
    GetCorretorVenda();

    if (usuario.tipo === tipoUsuario.corretor) {
      setCorretorSelecionado(usuario.codCorretor);
    }
  }, []);

  async function GetCorretorVenda() {
    await api
      .get("imovel/selecao?codImovel=249")
      .then(async (response) => {
        if (response.data.data.codCorretorVendedor) {
          setCorretorVendedor(response.data.data.codCorretorVendedor);
          setTemCorretorVendedor(true);
          setCorretorSelecionado(response.data.data.codCorretorVendedor);
          await api
            .get(
              `Corretor/buscar?codCorretor=${response.data.data.codCorretorVendedor}`
            )
            .then((response) => {
              console.log(response.data.data[0]);
              setCorretorVendedor(response.data.data[0]);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function MontarDatas() {
    let datasMontadas: iDatas[] = [];
    if (checkSegunda) {
      if (checkSegndoHorarioSegunda) {
        datasMontadas.push(
          {
            dia: "segunda-feira",
            horarioInicial: horaInicialSegunda ,
            horarioFinal: horaFinalSegunda ,
          },
          {
            dia: "segunda-feira",
            horarioInicial: horaInicialSegunda2 ,
            horarioFinal: horaFinalSegunda2 ,
          }
        );
      } else {
        datasMontadas.push({
          dia: "segunda-feira",
          horarioInicial: horaInicialSegunda ,
          horarioFinal: horaFinalSegunda ,
        });
      }
    }
    if (checkTerca) {
      if (checkSegndoHorarioTerca) {
        datasMontadas.push(
          {
            dia: "terca-feira",
            horarioInicial: horaInicialTerca ,
            horarioFinal: horaFinalTerca ,
          },
          {
            dia: "terca-feira",
            horarioInicial: horaInicialTerca2 ,
            horarioFinal: horaFinalTerca2 ,
          }
        );
      } else {
        datasMontadas.push({
          dia: "terca-feira",
          horarioInicial: horaInicialTerca ,
          horarioFinal: horaFinalTerca ,
        });
      }
    }
    if (checkQuarta) {
      if (checkSegndoHorarioQuarta) {
        datasMontadas.push(
          {
            dia: "quarta-feira",
            horarioInicial: horaInicialQuarta ,
            horarioFinal: horaFinalQuarta ,
          },
          {
            dia: "quarta-feira",
            horarioInicial: horaInicialQuarta2 ,
            horarioFinal: horaFinalQuarta2 ,
          }
        );
      } else {
        datasMontadas.push({
          dia: "quarta-feira",
          horarioInicial: horaInicialQuarta ,
          horarioFinal: horaFinalQuarta ,
        });
      }
    }
    if (checkQuinta) {
      if (checkSegndoHorarioQuinta) {
        datasMontadas.push(
          {
            dia: "quinta-feira",
            horarioInicial: horaInicialQuinta ,
            horarioFinal: horaFinalQuinta ,
          },
          {
            dia: "quinta-feira",
            horarioInicial: horaInicialQuinta2 ,
            horarioFinal: horaFinalQuinta2 ,
          }
        );
      } else {
        datasMontadas.push({
          dia: "quinta-feira",
          horarioInicial: horaInicialQuinta ,
          horarioFinal: horaFinalQuinta ,
        });
      }
    }
    if (checkSexta) {
      if (checkSegndoHorarioSexta) {
        datasMontadas.push(
          {
            dia: "sexta-feira",
            horarioInicial: horaInicialSexta ,
            horarioFinal: horaFinalSexta ,
          },
          {
            dia: "sexta-feira",
            horarioInicial: horaInicialSexta2,
            horarioFinal: horaFinalSexta2 ,
          }
        );
      } else {
        datasMontadas.push({
          dia: "sexta-feira",
          horarioInicial: horaInicialSexta ,
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
            horarioFinal: horaFinalSabado ,
          },
          {
            dia: "sabado",
            horarioInicial: horaInicialSabado2 ,
            horarioFinal: horaFinalSabado2 ,
          }
        );
      } else {
        datasMontadas.push({
          dia: "sabado",
          horarioInicial: horaInicialSabado ,
          horarioFinal: horaFinalSabado ,
        });
      }
    }
    if (checkDomingo) {
      if (checkSegndoHorarioDomingo) {
        datasMontadas.push(
          {
            dia: "domingo",
            horarioInicial: horaInicialDomingo ,
            horarioFinal: horaFinalDomingo ,
          },
          {
            dia: "domingo",
            horarioInicial: horaInicialDomingo2 ,
            horarioFinal: horaFinalDomingo2 ,
          }
        );
      } else {
        datasMontadas.push({
          dia: "domingo",
          horarioInicial: horaInicialDomingo ,
          horarioFinal: horaFinalDomingo ,
        });
      }
    }
    setDatas(datasMontadas);
    datas = datasMontadas;

    salvarDatas();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    if (usuario.tipo === tipoUsuario.corretor) {
      corretorSelecionado = usuario.codCorretor;
      setCorretorSelecionado(usuario.codCorretor);
    }
    salvarCorretor();
  }

  async function salvarCorretor() {
    api
      .put(
        `/imovel/atualizarCorretor?codImovel=${codImovel}&codCorretorVendedor=${corretorSelecionado}`
      )
      .then((response) => {
        MontarDatas();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Ocorreu um erro");
      });
  }

  async function salvarDatas() {
    api
      .post(`/HorariosImovel/cadastrar?codImovel=${codImovel}`, datas)
      .then((response) => {
        history.push("/cadastro/imovel/anuncioAzul/documentosImovel");
        setLoading(false);
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
        setLoading(false);
      });
  }

  async function GetCorretores() {
    await api
      .get("Corretor/top-corretores-imovel", {
        params: {
          CodImovel: codImovel,
          QtdePagina: 6,
          Pagina: 1,
        },
      })
      .then((response) => {
        setCorretores(response.data.data);
        console.log(
          "🚀 ~ file: EscolherCorretor.tsx ~ line 333 ~ .then ~ response.data.data",
          response.data.data
        );
      })
      .catch((error) => {
        console.log("Ocorreu um erro");
      });
  }

  async function GetHorariosImovel() {
    await api
      .get("HorariosImovel/buscar", {
        params: {
          CodImovel: codImovel,
        },
      })
      .then((response) => {
        const horarios = response.data.data.horarios;
        console.log("Horarios ", response.data.data.horarios);

        horarios.map((horario: any) => {
           console.log("horario - > ", horario);

        //   if (horario.dia === "segunda-feira") {
        //     setCheckSegunda(true);
        //     if (horario.horarios.length > 1) {
        //       setCheckSegndoHorarioSegunda(true);
        //       setHoraInicialSegunda(horario.horarios[0].horarioInicial);
        //       setHoraFinalSegunda(horario.horarios[0].horarioFinal);
        //       setHoraInicialSegunda2(horario.horarios[1].horarioInicial);
        //       setHoraFinalSegunda2(horario.horarios[1].horarioFinal);
        //     } else {
        //       setHoraInicialSegunda(horario.horarios[0].horarioInicial);
        //       setHoraFinalSegunda(horario.horarios[0].horarioFinal);
        //     }
        //   } else if (horario.dia === "terca-feira") {
        //     setCheckTerca(true);
        //     if (horario.horarios.length > 1) {
        //       setCheckSegndoHorarioTerca(true);
        //       setHoraInicialTerca(horario.horarios[0].horarioInicial);
        //       setHoraFinalTerca(horario.horarios[0].horarioFinal);
        //       setHoraInicialTerca2(horario.horarios[1].horarioInicial);
        //       setHoraFinalTerca2(horario.horarios[1].horarioFinal);
        //     } else {
        //       setHoraInicialTerca(horario.horarios[0].horarioInicial);
        //       setHoraFinalTerca(horario.horarios[0].horarioFinal);
        //     }
        //   } else if (horario.dia === "quarta-feira") {
        //     setCheckQuarta(true);
        //     if (horario.horarios.length > 1) {
        //       setCheckSegndoHorarioQuarta(true);
        //       setHoraInicialQuarta(horario.horarios[0].horarioInicial);
        //       setHoraFinalQuarta(horario.horarios[0].horarioFinal);
        //       setHoraInicialQuarta2(horario.horarios[1].horarioInicial);
        //       setHoraFinalQuarta2(horario.horarios[1].horarioFinal);
        //     } else {
        //       setHoraInicialQuarta(horario.horarios[0].horarioInicial);
        //       setHoraFinalQuarta(horario.horarios[0].horarioFinal);
        //     }
        //   } else if (horario.dia === "quinta-feira") {
        //     setCheckQuinta(true);
        //     if (horario.horarios.length > 1) {
        //       setCheckSegndoHorarioQuinta(true);
        //       setHoraInicialQuinta(horario.horarios[0].horarioInicial);
        //       setHoraFinalQuinta(horario.horarios[0].horarioFinal);
        //       setHoraInicialQuinta2(horario.horarios[1].horarioInicial);
        //       setHoraFinalQuinta2(horario.horarios[1].horarioFinal);
        //     } else {
        //       setHoraInicialQuinta(horario.horarios[0].horarioInicial);
        //       setHoraFinalQuinta(horario.horarios[0].horarioFinal);
        //     }
        //   } else if (horario.dia === "sexta-feira") {
        //     setCheckSexta(true);
        //     if (horario.horarios.length > 1) {
        //       setCheckSegndoHorarioSexta(true);
        //       setHoraInicialSexta(horario.horarios[0].horarioInicial);
        //       setHoraFinalSexta(horario.horarios[0].horarioFinal);
        //       setHoraInicialSexta2(horario.horarios[1].horarioInicial);
        //       setHoraFinalSexta2(horario.horarios[1].horarioFinal);
        //     } else {
        //       setHoraInicialSexta(horario.horarios[0].horarioInicial);
        //       setHoraFinalSexta(horario.horarios[0].horarioFinal);
        //     }
        //   } else if (horario.dia === "sabado") {
        //     setCheckSabado(true);
        //     if (horario.horarios.length > 1) {
        //       setCheckSegndoHorarioSabado(true);
        //       setHoraInicialSabado(horario.horarios[0].horarioInicial);
        //       setHoraFinalSabado(horario.horarios[0].horarioFinal);
        //       setHoraInicialSabado2(horario.horarios[1].horarioInicial);
        //       setHoraFinalSabado2(horario.horarios[1].horarioFinal);
        //     } else {
        //       setHoraInicialSabado(horario.horarios[0].horarioInicial);
        //       setHoraFinalSabado(horario.horarios[0].horarioFinal);
        //     }
        //   } else if (horario.dia === "domingo") {
        //     setCheckDomingo(true);
        //     if (horario.horarios.length > 1) {
        //       setCheckSegndoHorarioDomingo(true);
        //       setHoraInicialDomingo(horario.horarios[0].horarioInicial);
        //       setHoraFinalDomingo(horario.horarios[0].horarioFinal);
        //       setHoraInicialDomingo2(horario.horarios[1].horarioInicial);
        //       setHoraFinalDomingo2(horario.horarios[1].horarioFinal);
        //     } else {
        //       setHoraInicialDomingo(horario.horarios[0].horarioInicial);
        //       setHoraFinalDomingo(horario.horarios[0].horarioFinal);
        //     }
        //   }
         });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Navbar type="dark" />
      <div className="container col-lg-12 mt-5" id="cadastro-vendedor">
        {loading ? (
          <div id="loading" className="divLoad">
            <Loader />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="row g-3 col-lg-12 mt-5 mb-5">
            <div className="wrapper col-lg-12 mt-5">
              <ol className="c-stepper">
                {usuario.tipo !== tipoUsuario.corretor && (
                  <li className="c-stepper__item col-lg-12">
                    <div className="c-stepper__content col-lg-11">
                      <h2 className="c-stepper__title">Escolha seu corretor</h2>
                      <div className="row mb-3 mt-3">
                        {/* <div className="col-10 col-lg-10 mb-1 mt-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Nome do corretor..."
                          />
                        </div> */}
                        <div className="col-10 col-lg-10 mt-3 mb-1">
                          <p className="inline-block">
                            Mostrando os melhores corretores para o seu imóvel
                          </p>
                        </div>
                      </div>

                      <div className="col-lg-12 mb-3">
                        {corretores ? (
                          corretores.length > 0 ? (
                            <div className="row mb-3 div-scroll col-lg-10">
                              {corretores.map((corretor: iCorretor) => (
                                <div
                                  className="col-lg-6 mb-1"
                                  onClick={() => {
                                    setCorretorSelecionado(
                                      corretor.codCorretor
                                    );
                                  }}
                                >
                                  <SelecaoCorretor
                                    img={corretor.img[0]}
                                    nomeSocial={corretor.nomeSocial}
                                    numeroCreci={corretor.numeroCreci}
                                    mediaAvaliacao={corretor.mediaAvaliacao}
                                    pontuacaoAtual={corretor.pontuacaoAtual}
                                    dtCadastro={corretor.dtCadastro}
                                    imoveisNoAppePlus={corretor.imoveisNoAppePlus}
                                    codCorretor={corretor.codCorretor}
                                    selecionado={
                                      corretorSelecionado ===
                                      corretor.codCorretor
                                    }
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
                    </div>
                  </li>
                )}
                <li className="c-stepper__item col-lg-12">
                  <div className="c-stepper__content col-lg-10">
                    <h2 className="c-stepper__title">
                      Quais os melhores horários para <br /> o seu imóvel
                      receber visita?
                    </h2>
                    <div className="table-responsive" style={{ maxWidth: 720 }}>
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
                                  onChange={() => setCheckQuarta(!checkQuarta)}
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
                                  onChange={() => setCheckQuinta(!checkQuinta)}
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
                                  onChange={() => setCheckSabado(!checkSabado)}
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
                  </div>
                </li>
              </ol>
            </div>

            <div className="col-lg-10 mt-0 pt-4 row-gray text-end">
              {checkSegunda ||
              checkTerca ||
              checkQuarta ||
              checkQuinta ||
              checkSexta ||
              checkSabado ||
              checkDomingo ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="buttonSalvar"
                >
                  Salvar e continuar
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
                  data-bs-target="#modalHorariosImovel"
                  disabled={loading}
                >
                  Salvar e continuar
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
          </form>
        )}
        <div className="div-card-stepper-contain col-lg-3">
          <StepperAnuncioImovel
            Localizacao={true}
            Sobre={true}
            Imagens={true}
            codImovel={codImovel}
          />
        </div>
      </div>
      <div
        className="modal fade"
        id="modalHorariosImovel"
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
                Olá. Para o sucesso da negociação deste imóvel, é imprescindível
                que você informe pelo menos um dia com uma disponibilidade de
                horário para visitas. Somente assim, possíveis compradores
                poderão agendar uma visita a este imóvel
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
