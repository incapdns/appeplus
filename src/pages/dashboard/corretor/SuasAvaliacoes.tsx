import { ProgressBar } from "react-bootstrap";
import NavbarDashCorretor from "../../../components/Navbar/NavbarDashCorretor";
import NavbarDashHeader from "../../../components/Navbar/NavbarDashHeader";
import { FaRedoAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import "../../../styles/pages/dashboard/corretor/suasAvaliacoes.scss";
import Footer from "../../../components/Footer";
import { iDadosUsuario } from "../../../@types";
import { useHistory } from "react-router";

export default function SuasAvaliacoes() {
  const [notaGeral, setNotaGeral] = useState(0);
  const [notaAssertividade, setNotaAssertividade] = useState(0);
  const [notaAtendimento, setNotaAtendimento] = useState(0);
  const [notaConhecimento, setNotaConhecimento] = useState(0);
  const [notaPontualidade, setNotaPontualidade] = useState(0);
  const usuario: iDadosUsuario = JSON.parse(
    localStorage.getItem("@appePlus/usuario") || "{}"
  );
  const history = useHistory();

  function checaUsuarioLogado() {
    if (!usuario.token || usuario.codStatus !== 1) {
      window.alert("Você precisar estar logado e aprovado para acessar este menu!");
      history.push("/");
    }
  }
  useEffect(() => {
    checaUsuarioLogado();
  }, []);

  return (
    <>
      <div id="suas-avaliacoes" className="wrapper-imoveis">
        <NavbarDashCorretor />
        <div className="main-content">
          <NavbarDashHeader />
          <div className="container">
            <section className="my-4 head">
              <div className="col-lg-10">
                <h2>Suas avaliações</h2>
                <p>Olá corretor, aqui em breve você visualizará todas as avaliações recebidas por você no atendimento aos seus clientes. Esta é mais uma exclusividade Appê Plus, para valorizar o trabalho dos melhores profissionais a dar aos clientes a liberdade de trabalhar com os melhores.</p>
              </div>
            </section>
            <section className="avaliacoes">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="d-flex titulo-card">
                      <div>
                        <h4>Status geral</h4>
                      </div>
                      <div className="">
                        <button className="atualizar">
                          Atualizar
                          <FaRedoAlt size={12} style={{ marginLeft: 10 }} />
                        </button>
                      </div>
                    </div>
                    <div className="row progresso-geral">
                      <div className="col-lg-9 col-12 barra-geral">
                        <ProgressBar
                          now={notaGeral}
                          max={5}
                          min={0}
                          variant={
                            notaGeral < 3
                              ? "danger"
                              : notaGeral < 4
                              ? "warning"
                              : "success"
                          }
                        />
                        <div className="d-flex justify-content-between mt-1">
                          <div style={{ fontSize: 12 }}>0.0</div>
                          <div style={{ fontSize: 12 }}>5.0</div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-12 nota-geral">
                        <p>Sua nota é: </p>
                        <p className="nota-valor">{notaGeral}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12">
                  <div className="card">
                    <div className="d-flex titulo-card">
                      <div>
                        <h4>Assertividade</h4>
                      </div>
                      <div className="">
                        <button className="atualizar">
                          Atualizar
                          <FaRedoAlt size={12} style={{ marginLeft: 10 }} />
                        </button>
                      </div>
                    </div>
                    <div className="row progresso">
                      <div className="col-sm-7 col-xs-12 barra">
                        <ProgressBar
                          now={notaAssertividade}
                          max={5}
                          min={0}
                          variant={
                            notaAssertividade < 3
                              ? "danger"
                              : notaAssertividade < 4
                              ? "warning"
                              : "success"
                          }
                        />
                        <div className="d-flex justify-content-between mt-1">
                          <div style={{ fontSize: 12 }}>0.0</div>
                          <div style={{ fontSize: 12 }}>5.0</div>
                        </div>
                      </div>
                      <div className="col-sm-5 col-xs-12 nota">
                        <p>Sua nota é: </p>
                        <p className="nota-valor">{notaAssertividade}</p>
                      </div>
                    </div>
                    <div className="total">
                      <p>Total de avaliações:</p>
                      <p className="total-valor">0</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12">
                  <div className="card">
                    <div className="d-flex titulo-card">
                      <div>
                        <h4>Atendimento</h4>
                      </div>
                      <div className="">
                        <button className="atualizar">
                          Atualizar
                          <FaRedoAlt size={12} style={{ marginLeft: 10 }} />
                        </button>
                      </div>
                    </div>
                    <div className="row progresso">
                      <div className="col-sm-7 col-xs-12 barra">
                        <ProgressBar
                          now={notaAtendimento}
                          max={5}
                          min={0}
                          variant={
                            notaAtendimento < 3
                              ? "danger"
                              : notaAtendimento < 4
                              ? "warning"
                              : "success"
                          }
                        />
                        <div className="d-flex justify-content-between mt-1">
                          <div style={{ fontSize: 12 }}>0.0</div>
                          <div style={{ fontSize: 12 }}>5.0</div>
                        </div>
                      </div>
                      <div className="col-sm-5 col-xs-12 nota">
                        <p>Sua nota é: </p>
                        <p className="nota-valor">{notaAtendimento}</p>
                      </div>
                    </div>
                    <div className="total">
                      <p>Total de avaliações:</p>
                      <p className="total-valor">0</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12">
                  <div className="card">
                    <div className="d-flex titulo-card">
                      <div>
                        <h4>Conhecimento de mercado</h4>
                      </div>
                      <div className="">
                        <button className="atualizar">
                          Atualizar
                          <FaRedoAlt size={12} style={{ marginLeft: 10 }} />
                        </button>
                      </div>
                    </div>
                    <div className="row progresso">
                      <div className="col-sm-7 col-xs-12 barra">
                        <ProgressBar
                          now={notaConhecimento}
                          max={5}
                          min={0}
                          variant={
                            notaConhecimento < 3
                              ? "danger"
                              : notaConhecimento < 4
                              ? "warning"
                              : "success"
                          }
                        />
                        <div className="d-flex justify-content-between mt-1">
                          <div style={{ fontSize: 12 }}>0.0</div>
                          <div style={{ fontSize: 12 }}>5.0</div>
                        </div>
                      </div>
                      <div className="col-sm-5 col-xs-12 nota">
                        <p>Sua nota é: </p>
                        <p className="nota-valor">{notaConhecimento}</p>
                      </div>
                    </div>
                    <div className="total">
                      <p>Total de avaliações:</p>
                      <p className="total-valor">0</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12">
                  <div className="card">
                    <div className="d-flex titulo-card">
                      <div>
                        <h4>Pontualidade</h4>
                      </div>
                      <div className="">
                        <button className="atualizar">
                          Atualizar
                          <FaRedoAlt size={12} style={{ marginLeft: 10 }} />
                        </button>
                      </div>
                    </div>
                    <div className="row progresso">
                      <div className="col-sm-7 col-xs-12 barra">
                        <ProgressBar
                          now={notaPontualidade}
                          max={5}
                          min={0}
                          variant={
                            notaPontualidade < 3
                              ? "danger"
                              : notaPontualidade < 4
                              ? "warning"
                              : "success"
                          }
                        />
                        <div className="d-flex justify-content-between mt-1">
                          <div style={{ fontSize: 12 }}>0.0</div>
                          <div style={{ fontSize: 12 }}>5.0</div>
                        </div>
                      </div>
                      <div className="col-sm-5 col-xs-12 nota">
                        <p>Sua nota é: </p>
                        <p className="nota-valor">{notaPontualidade}</p>
                      </div>
                    </div>
                    <div className="total">
                      <p>Total de avaliações:</p>
                      <p className="total-valor">0</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer dark />
    </>
  );
}
